import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage } from '../utils/helpers';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = storage.get('globalmart_cart', []);
    setItems(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set('globalmart_cart', items);
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      // Add new item
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        originalPrice: product.originalPrice || product.price,
        img: product.img,
        flag: product.flag,
        category: product.categoryLabel || product.category,
        quantity,
        rocket: product.rocket || false,
      }];
    });
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  // Calculated values
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const hasRocketItems = items.some(item => item.rocket);
    const shippingFee = subtotal >= 30000 ? 0 : 3000;
    const total = subtotal + shippingFee;

    return {
      subtotal,
      itemCount,
      hasRocketItems,
      shippingFee,
      total,
      freeShippingThreshold: 30000,
      amountToFreeShipping: Math.max(0, 30000 - subtotal),
    };
  }, [items]);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      ...totals,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
