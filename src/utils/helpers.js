// Utility helper functions

// Format Korean Won
export const formatKRW = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

// Convert KRW to USD (approximate)
export const toUSD = (krw) => {
  const rate = 1350; // Approximate exchange rate
  return (krw / rate).toFixed(2);
};

// Format price with currency symbol
export const formatPrice = (price, showUSD = true) => {
  const krw = `₩${formatKRW(price)}`;
  if (showUSD) {
    return `${krw} (≈$${toUSD(price)})`;
  }
  return krw;
};

// Generate order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GM-${timestamp}-${random}`;
};

// Generate tracking number
export const generateTrackingNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TRK';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone (Korean format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/-/g, ''));
};

// Validate password (min 8 chars, 1 letter, 1 number)
export const isValidPassword = (password) => {
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
};

// Format date
export const formatDate = (date, locale = 'en-US') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date with time
export const formatDateTime = (date, locale = 'en-US') => {
  return new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate estimated delivery date
export const getEstimatedDelivery = (isRocket = false) => {
  const now = new Date();
  const delivery = new Date(now);

  if (isRocket) {
    // Rocket delivery: next day by 7 AM if ordered before midnight
    delivery.setDate(delivery.getDate() + 1);
  } else {
    // Standard delivery: 2-3 business days
    delivery.setDate(delivery.getDate() + 3);
  }

  return formatDate(delivery);
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};
