import { createContext, useContext, useState, useEffect } from 'react';
import { storage, generateOrderId, generateTrackingNumber, getEstimatedDelivery } from '../utils/helpers';

const OrderContext = createContext(null);

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Order Placed',
  [ORDER_STATUS.CONFIRMED]: 'Order Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

// Dummy products for order history
const DUMMY_PRODUCTS = [
  {
    id: 5,
    name: "Nepali Gundruk (Dried Leafy Greens)",
    price: 15000,
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=533&fit=crop",
    flag: "🇳🇵",
    rocket: true,
  },
  {
    id: 6,
    name: "Himalayan Pink Salt (Premium 1kg)",
    price: 18000,
    img: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&h=533&fit=crop",
    flag: "🇳🇵",
    rocket: true,
  },
  {
    id: 7,
    name: "MDH Garam Masala Bundle (5 Pack)",
    price: 25000,
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=533&fit=crop",
    flag: "🇮🇳",
    rocket: true,
  },
  {
    id: 8,
    name: "Indian Ghee (Amul Premium 1L)",
    price: 28000,
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=533&fit=crop",
    flag: "🇮🇳",
    rocket: true,
  },
  {
    id: 9,
    name: "Shan Nihari Masala Pack",
    price: 12000,
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=533&fit=crop",
    flag: "🇵🇰",
    rocket: true,
  },
  {
    id: 11,
    name: "Korean Kimchi (Premium 1kg)",
    price: 22000,
    img: "https://images.unsplash.com/photo-1583224874284-0a3d38c1c0c3?w=400&h=533&fit=crop",
    flag: "🇰🇷",
    rocket: false,
  },
  {
    id: 12,
    name: "Korean Ramen Variety Box (20pk)",
    price: 32000,
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=533&fit=crop",
    flag: "🇰🇷",
    rocket: false,
  },
];

// Generate dummy orders for demo
const generateDummyOrders = (userId) => {
  const now = new Date();

  return [
    // Order 1: Delivered (3 days ago)
    {
      id: 'GM-DM001',
      trackingNumber: 'TRK202602240001',
      userId,
      items: [
        { ...DUMMY_PRODUCTS[0], quantity: 2 },
        { ...DUMMY_PRODUCTS[1], quantity: 1 },
        { ...DUMMY_PRODUCTS[2], quantity: 1 },
      ],
      shippingAddress: {
        name: 'Demo User',
        phone: '010-1234-5678',
        address: '123 Gangnam-daero, Gangnam-gu',
        addressDetail: 'Apt 501',
        city: 'Seoul',
        postalCode: '06001',
      },
      paymentMethod: 'card',
      subtotal: 73000,
      shippingFee: 0,
      total: 73000,
      status: ORDER_STATUS.DELIVERED,
      isRocket: true,
      estimatedDelivery: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        { status: ORDER_STATUS.PENDING, timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), message: 'Order placed successfully' },
        { status: ORDER_STATUS.CONFIRMED, timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 + 60000).toISOString(), message: 'Payment confirmed' },
        { status: ORDER_STATUS.PROCESSING, timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 + 3600000).toISOString(), message: 'Your order is being prepared' },
        { status: ORDER_STATUS.SHIPPED, timestamp: new Date(now.getTime() - 3.5 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order has been shipped' },
        { status: ORDER_STATUS.OUT_FOR_DELIVERY, timestamp: new Date(now.getTime() - 3.2 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order is out for delivery' },
        { status: ORDER_STATUS.DELIVERED, timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order has been delivered' },
      ],
    },
    // Order 2: Out for Delivery (today)
    {
      id: 'GM-DM002',
      trackingNumber: 'TRK202602270002',
      userId,
      items: [
        { ...DUMMY_PRODUCTS[3], quantity: 1 },
        { ...DUMMY_PRODUCTS[4], quantity: 3 },
      ],
      shippingAddress: {
        name: 'Demo User',
        phone: '010-1234-5678',
        address: '123 Gangnam-daero, Gangnam-gu',
        addressDetail: 'Apt 501',
        city: 'Seoul',
        postalCode: '06001',
      },
      paymentMethod: 'kakaopay',
      subtotal: 64000,
      shippingFee: 0,
      total: 64000,
      status: ORDER_STATUS.OUT_FOR_DELIVERY,
      isRocket: true,
      estimatedDelivery: 'Today by 7AM',
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        { status: ORDER_STATUS.PENDING, timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), message: 'Order placed successfully' },
        { status: ORDER_STATUS.CONFIRMED, timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 60000).toISOString(), message: 'Payment confirmed via KakaoPay' },
        { status: ORDER_STATUS.PROCESSING, timestamp: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString(), message: 'Your order is being prepared' },
        { status: ORDER_STATUS.SHIPPED, timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(), message: 'Your order has been shipped from Seoul warehouse' },
        { status: ORDER_STATUS.OUT_FOR_DELIVERY, timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), message: 'Your order is out for delivery - Driver: Kim (010-9999-0001)' },
      ],
    },
    // Order 3: Shipped (yesterday)
    {
      id: 'GM-DM003',
      trackingNumber: 'TRK202602260003',
      userId,
      items: [
        { ...DUMMY_PRODUCTS[5], quantity: 2 },
        { ...DUMMY_PRODUCTS[6], quantity: 1 },
      ],
      shippingAddress: {
        name: 'Demo User',
        phone: '010-1234-5678',
        address: '456 Hongdae-ro, Mapo-gu',
        addressDetail: 'Building B, 3F',
        city: 'Seoul',
        postalCode: '04066',
      },
      paymentMethod: 'naverpay',
      subtotal: 76000,
      shippingFee: 3000,
      total: 79000,
      status: ORDER_STATUS.SHIPPED,
      isRocket: false,
      estimatedDelivery: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        { status: ORDER_STATUS.PENDING, timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), message: 'Order placed successfully' },
        { status: ORDER_STATUS.CONFIRMED, timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 60000).toISOString(), message: 'Payment confirmed via NaverPay' },
        { status: ORDER_STATUS.PROCESSING, timestamp: new Date(now.getTime() - 1.5 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order is being prepared at Busan warehouse' },
        { status: ORDER_STATUS.SHIPPED, timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), message: 'Your order has been shipped via CJ Logistics' },
      ],
    },
    // Order 4: Delivered (1 week ago)
    {
      id: 'GM-DM004',
      trackingNumber: 'TRK202602200004',
      userId,
      items: [
        { ...DUMMY_PRODUCTS[2], quantity: 2 },
        { ...DUMMY_PRODUCTS[5], quantity: 1 },
        { ...DUMMY_PRODUCTS[0], quantity: 1 },
        { ...DUMMY_PRODUCTS[6], quantity: 1 },
        { ...DUMMY_PRODUCTS[1], quantity: 2 },
      ],
      shippingAddress: {
        name: 'Demo User',
        phone: '010-1234-5678',
        address: '123 Gangnam-daero, Gangnam-gu',
        addressDetail: 'Apt 501',
        city: 'Seoul',
        postalCode: '06001',
      },
      paymentMethod: 'card',
      subtotal: 140000,
      shippingFee: 0,
      total: 140000,
      status: ORDER_STATUS.DELIVERED,
      isRocket: true,
      estimatedDelivery: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        { status: ORDER_STATUS.PENDING, timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), message: 'Order placed successfully' },
        { status: ORDER_STATUS.CONFIRMED, timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 60000).toISOString(), message: 'Payment confirmed' },
        { status: ORDER_STATUS.PROCESSING, timestamp: new Date(now.getTime() - 6.8 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order is being prepared' },
        { status: ORDER_STATUS.SHIPPED, timestamp: new Date(now.getTime() - 6.5 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order has been shipped' },
        { status: ORDER_STATUS.OUT_FOR_DELIVERY, timestamp: new Date(now.getTime() - 6.2 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order is out for delivery' },
        { status: ORDER_STATUS.DELIVERED, timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(), message: 'Your order has been delivered' },
      ],
    },
    // Order 5: Cancelled
    {
      id: 'GM-DM005',
      trackingNumber: 'TRK202602150005',
      userId,
      items: [
        { ...DUMMY_PRODUCTS[4], quantity: 5 },
      ],
      shippingAddress: {
        name: 'Demo User',
        phone: '010-1234-5678',
        address: '123 Gangnam-daero, Gangnam-gu',
        addressDetail: 'Apt 501',
        city: 'Seoul',
        postalCode: '06001',
      },
      paymentMethod: 'bank_transfer',
      subtotal: 60000,
      shippingFee: 0,
      total: 60000,
      status: ORDER_STATUS.CANCELLED,
      isRocket: true,
      estimatedDelivery: '-',
      createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        { status: ORDER_STATUS.PENDING, timestamp: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(), message: 'Order placed successfully' },
        { status: ORDER_STATUS.CANCELLED, timestamp: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString(), message: 'Order cancelled by customer - Reason: Changed mind' },
      ],
    },
  ];
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage on mount
    const savedOrders = storage.get('globalmart_orders', []);
    setOrders(savedOrders);
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    storage.set('globalmart_orders', orders);
  }, [orders]);

  // Initialize dummy orders for a user (call this when user logs in)
  const initializeDummyOrders = (userId) => {
    // Check if user already has orders
    const existingOrders = orders.filter(o => o.userId === userId);
    if (existingOrders.length === 0) {
      // Add dummy orders for demo purposes
      const dummyOrders = generateDummyOrders(userId);
      setOrders(prev => [...dummyOrders, ...prev]);
    }
  };

  const createOrder = (cartItems, shippingAddress, paymentMethod, totals, userId) => {
    const hasRocket = cartItems.some(item => item.rocket);

    const newOrder = {
      id: generateOrderId(),
      trackingNumber: generateTrackingNumber(),
      userId,
      items: cartItems,
      shippingAddress,
      paymentMethod,
      subtotal: totals.subtotal,
      shippingFee: totals.shippingFee,
      total: totals.total,
      status: ORDER_STATUS.CONFIRMED,
      isRocket: hasRocket,
      estimatedDelivery: getEstimatedDelivery(hasRocket),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: ORDER_STATUS.PENDING,
          timestamp: new Date().toISOString(),
          message: 'Order placed successfully',
        },
        {
          status: ORDER_STATUS.CONFIRMED,
          timestamp: new Date().toISOString(),
          message: 'Payment confirmed',
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);

    // Simulate order progression (for demo purposes)
    simulateOrderProgress(newOrder.id, hasRocket);

    return newOrder;
  };

  const simulateOrderProgress = (orderId, isRocket) => {
    const delays = isRocket
      ? [5000, 10000, 15000, 20000] // Faster for rocket delivery (5s, 10s, 15s, 20s)
      : [10000, 30000, 60000, 90000]; // Regular delivery

    const statuses = [
      { status: ORDER_STATUS.PROCESSING, message: 'Your order is being prepared' },
      { status: ORDER_STATUS.SHIPPED, message: 'Your order has been shipped' },
      { status: ORDER_STATUS.OUT_FOR_DELIVERY, message: 'Your order is out for delivery' },
      { status: ORDER_STATUS.DELIVERED, message: 'Your order has been delivered' },
    ];

    statuses.forEach((update, index) => {
      setTimeout(() => {
        updateOrderStatus(orderId, update.status, update.message);
      }, delays[index]);
    });
  };

  const updateOrderStatus = (orderId, status, message = '') => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId && order.status !== ORDER_STATUS.DELIVERED) {
          return {
            ...order,
            status,
            updatedAt: new Date().toISOString(),
            statusHistory: [
              ...order.statusHistory,
              {
                status,
                timestamp: new Date().toISOString(),
                message,
              },
            ],
          };
        }
        return order;
      })
    );
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getOrderByTracking = (trackingNumber) => {
    return orders.find(order => order.trackingNumber === trackingNumber);
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, ORDER_STATUS.CANCELLED, 'Order cancelled by customer');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrderById,
      getOrderByTracking,
      getUserOrders,
      cancelOrder,
      updateOrderStatus,
      initializeDummyOrders,
      ORDER_STATUS,
      STATUS_LABELS,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

export default OrderContext;
