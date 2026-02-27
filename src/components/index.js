/**
 * COMPONENTS INDEX
 * ================
 * Central export for all components.
 *
 * Usage:
 * import { Button, ProductCard, Header } from './components';
 */

// Common/Generic Components (from design system)
export * from './common';

// Layout Components
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';

// Product Components
export { ProductCard, ProgressBar, RocketBadge } from './product/ProductCard';
export { ProductDetailModal } from './product/ProductDetailModal';

// Cart Components
export { CartDrawer } from './cart/CartDrawer';

// Auth Components
export { AuthModal } from './auth/AuthModal';

// Checkout Components
export { CheckoutModal } from './checkout/CheckoutModal';

// Tracking Components
export { OrderSuccessModal } from './tracking/OrderSuccessModal';
export { OrderTrackingModal } from './tracking/OrderTrackingModal';
