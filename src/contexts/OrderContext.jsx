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
