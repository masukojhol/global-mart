/**
 * NOTIFICATION CONTEXT
 * ====================
 * Manages notifications state including order updates, promotions, etc.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { useOrders, ORDER_STATUS } from './OrderContext';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

// Notification types
export const NOTIFICATION_TYPES = {
  ORDER_PLACED: 'order_placed',
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_PROCESSING: 'order_processing',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  PROMO: 'promo',
  SYSTEM: 'system',
};

// Generate notifications from order status
const getNotificationFromStatus = (status) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return { type: NOTIFICATION_TYPES.ORDER_PLACED, icon: '🛒', color: '#2196F3' };
    case ORDER_STATUS.CONFIRMED:
      return { type: NOTIFICATION_TYPES.ORDER_CONFIRMED, icon: '✅', color: '#4CAF50' };
    case ORDER_STATUS.PROCESSING:
      return { type: NOTIFICATION_TYPES.ORDER_PROCESSING, icon: '📦', color: '#FF9800' };
    case ORDER_STATUS.SHIPPED:
      return { type: NOTIFICATION_TYPES.ORDER_SHIPPED, icon: '🚚', color: '#2196F3' };
    case ORDER_STATUS.OUT_FOR_DELIVERY:
      return { type: NOTIFICATION_TYPES.ORDER_SHIPPED, icon: '🏃', color: '#9C27B0' };
    case ORDER_STATUS.DELIVERED:
      return { type: NOTIFICATION_TYPES.ORDER_DELIVERED, icon: '🎉', color: '#4CAF50' };
    case ORDER_STATUS.CANCELLED:
      return { type: NOTIFICATION_TYPES.ORDER_CANCELLED, icon: '❌', color: '#F44336' };
    default:
      return { type: NOTIFICATION_TYPES.SYSTEM, icon: '📢', color: '#607D8B' };
  }
};

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Generate notifications from user orders
  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      const orderNotifications = [];

      userOrders.forEach(order => {
        // Create notification for each status in history
        if (order.statusHistory) {
          order.statusHistory.forEach((historyItem, index) => {
            const notifInfo = getNotificationFromStatus(historyItem.status);
            orderNotifications.push({
              id: `${order.id}-${index}`,
              orderId: order.id,
              type: notifInfo.type,
              icon: notifInfo.icon,
              color: notifInfo.color,
              title: getNotificationTitle(historyItem.status, order.id),
              message: historyItem.message || getNotificationMessage(historyItem.status),
              timestamp: new Date(historyItem.timestamp),
              read: index < order.statusHistory.length - 1, // Only latest is unread
              actionLabel: 'Track Order',
              actionType: 'track',
            });
          });
        }
      });

      // Add some promo notifications
      const promoNotifications = [
        {
          id: 'promo-1',
          type: NOTIFICATION_TYPES.PROMO,
          icon: '🎁',
          color: '#E91E63',
          title: 'Flash Sale!',
          message: 'Get 20% off on all Nepali products today only!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: true,
          actionLabel: 'Shop Now',
          actionType: 'shop',
        },
        {
          id: 'promo-2',
          type: NOTIFICATION_TYPES.PROMO,
          icon: '🚀',
          color: '#00BCD4',
          title: 'Free Rocket Delivery',
          message: 'Orders over ₩50,000 get free rocket delivery this week!',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: true,
          actionLabel: 'Learn More',
          actionType: 'shop',
        },
      ];

      // Combine and sort by timestamp (newest first)
      const allNotifications = [...orderNotifications, ...promoNotifications]
        .sort((a, b) => b.timestamp - a.timestamp);

      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter(n => !n.read).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user, getUserOrders]);

  const getNotificationTitle = (status, orderId) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return `Order ${orderId} Placed`;
      case ORDER_STATUS.CONFIRMED:
        return `Order ${orderId} Confirmed`;
      case ORDER_STATUS.PROCESSING:
        return `Order ${orderId} Processing`;
      case ORDER_STATUS.SHIPPED:
        return `Order ${orderId} Shipped`;
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return `Order ${orderId} Out for Delivery`;
      case ORDER_STATUS.DELIVERED:
        return `Order ${orderId} Delivered`;
      case ORDER_STATUS.CANCELLED:
        return `Order ${orderId} Cancelled`;
      default:
        return `Order ${orderId} Update`;
    }
  };

  const getNotificationMessage = (status) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return 'Your order has been placed successfully.';
      case ORDER_STATUS.CONFIRMED:
        return 'Your order has been confirmed and is being prepared.';
      case ORDER_STATUS.PROCESSING:
        return 'Your order is being packed and prepared for shipping.';
      case ORDER_STATUS.SHIPPED:
        return 'Your order has been shipped and is on its way!';
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return 'Your order is out for delivery. It will arrive soon!';
      case ORDER_STATUS.DELIVERED:
        return 'Your order has been delivered. Enjoy!';
      case ORDER_STATUS.CANCELLED:
        return 'Your order has been cancelled.';
      default:
        return 'Your order status has been updated.';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      read: false,
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotification,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export default NotificationContext;
