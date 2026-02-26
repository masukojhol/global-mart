import { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { useWindowSize } from '../hooks/useWindowSize';
import { FLASH_DEALS, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ProductDetailModal } from '../components/product/ProductDetailModal';
import { CartDrawer } from '../components/cart/CartDrawer';
import { AuthModal } from '../components/auth/AuthModal';
import { CheckoutModal } from '../components/checkout/CheckoutModal';
import { OrderTrackingModal } from '../components/tracking/OrderTrackingModal';
import { OrderSuccessModal } from '../components/tracking/OrderSuccessModal';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatKRW } from '../utils/helpers';

// Category Icons Data
const CATEGORIES = [
  { id: 1, icon: '🏠', label: 'Home Products', badge: null },
  { id: 2, icon: '🚀', label: 'Rocket Delivery', badge: 'FAST' },
  { id: 3, icon: '🌶️', label: 'Spices', badge: null },
  { id: 4, icon: '🍚', label: 'Rice & Grains', badge: null },
  { id: 5, icon: '🎁', label: 'Flash Sales', badge: '8HRS' },
  { id: 6, icon: '🇳🇵', label: 'Nepal', badge: null },
  { id: 7, icon: '🇮🇳', label: 'India', badge: null },
  { id: 8, icon: '🇵🇰', label: 'Pakistan', badge: null },
  { id: 9, icon: '🍜', label: 'Instant Food', badge: null },
  { id: 10, icon: '🍪', label: 'Snacks', badge: 'NEW' },
];

// Banner data with online images - M&S Style Clean Design
const BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    title: 'Your Home,',
    highlight: 'Delivered in Korea',
    subtitle: 'International Foods & More',
    description: 'Authentic products from Nepal, India, Pakistan & more. Free delivery on orders over ₩30,000.',
    cta: 'Shop Now',
    bgColor: '#f8f5f2',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?w=800&h=600&fit=crop',
    title: 'Fresh',
    highlight: 'Grocery Deals',
    subtitle: 'Weekly Offers',
    description: 'Up to 40% off on fresh vegetables, fruits and daily essentials.',
    cta: 'View Deals',
    bgColor: '#f5f8f5',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop',
    title: 'Authentic',
    highlight: 'Asian Spices',
    subtitle: 'Direct Import',
    description: 'Premium quality spices and ingredients from South Asia.',
    cta: 'Explore',
    bgColor: '#fdf8f3',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop',
    title: 'Free Delivery',
    highlight: 'Orders ₩30,000+',
    subtitle: 'Limited Time Offer',
    description: 'Fast shipping across Korea. Same day delivery available in Seoul.',
    cta: 'Order Now',
    bgColor: '#f5f5f8',
  },
];

function HeroBannerCarousel({ isMobile, isDesktop }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % BANNERS.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + BANNERS.length) % BANNERS.length);

  const banner = BANNERS[currentSlide];

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: banner.bgColor,
      transition: 'background 0.5s ease',
      margin: isMobile ? '8px' : isDesktop ? '16px' : '12px',
      borderRadius: 16,
    }}>
      {/* Main Container - Split Layout */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        minHeight: isMobile ? 'auto' : isDesktop ? 380 : 320,
      }}>
        {/* Text Content Side */}
        <div style={{
          flex: isMobile ? 'none' : '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '32px 24px 40px' : isDesktop ? '48px 60px' : '36px 32px',
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            maxWidth: isDesktop ? 420 : 360,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            <p style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 12,
              color: '#666',
            }}>
              {banner.subtitle}
            </p>
            <h1 style={{
              fontSize: isDesktop ? 44 : isMobile ? 30 : 36,
              fontWeight: 300,
              lineHeight: 1.1,
              margin: 0,
              fontFamily: theme.fonts.primary,
              letterSpacing: -0.5,
              color: '#000',
            }}>
              {banner.title}<br />
              <span style={{ fontWeight: 700 }}>{banner.highlight}</span>
            </h1>
            <p style={{
              fontSize: 14,
              color: '#555',
              marginTop: 16,
              marginBottom: 24,
              lineHeight: 1.6,
              fontWeight: 400,
            }}>
              {banner.description}
            </p>
            <button style={{
              background: '#000',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: theme.fonts.body,
              transition: 'all 0.3s ease',
              borderRadius: 25,
            }}>
              {banner.cta}
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div style={{
          flex: isMobile ? 'none' : '1.2',
          position: 'relative',
          minHeight: isMobile ? 200 : 'auto',
          overflow: 'hidden',
          margin: isMobile ? '12px 12px 0 12px' : isDesktop ? '16px 16px 16px 0' : '12px 12px 12px 0',
          borderRadius: 12,
        }}>
          <img
            src={banner.image}
            alt={banner.highlight}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              position: isMobile ? 'relative' : 'absolute',
              inset: isMobile ? 'auto' : 0,
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.5s ease',
              borderRadius: 12,
            }}
          />
        </div>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      {isDesktop && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#fff',
              border: '1px solid #ddd',
              width: 40,
              height: 40,
              borderRadius: '50%',
              cursor: 'pointer',
              color: '#000',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#fff',
              border: '1px solid #ddd',
              width: 40,
              height: 40,
              borderRadius: '50%',
              cursor: 'pointer',
              color: '#000',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
          >
            ›
          </button>
        </>
      )}

      {/* Dot Indicators */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 12 : 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        zIndex: 10,
      }}>
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentSlide === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: currentSlide === index ? '#000' : '#ccc',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ h: 5, m: 32, s: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginLeft: 8 }}>
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{
            background: '#ff4757',
            color: '#fff',
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            fontWeight: 500,
            padding: '4px 6px',
            borderRadius: 4,
          }}>{v}</span>
          {i < 2 && <span style={{ fontWeight: 500, fontSize: 12, color: '#999' }}>:</span>}
        </span>
      ))}
    </div>
  );
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [activeTab, setActiveTab] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');

  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);

  const { isMobile, width } = useWindowSize();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const { openCart, items: cartItems } = useCart();
  const { isAuthenticated } = useAuth();

  const toggleLike = (id) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowCheckoutModal(true);
    }
  };

  const handleOrderSuccess = (order) => {
    setLastOrder(order);
    setShowSuccessModal(true);
  };

  const handleTrackOrder = (orderId) => {
    setTrackingOrderId(orderId);
    setShowTrackingModal(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filterButtons = ['All', '🇳🇵 Nepal', '🇮🇳 India', '🇵🇰 Pakistan', '🇰🇷 Korea'];

  const filteredProducts = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.origin === activeFilter.replace(/🇳🇵|🇮🇳|🇵🇰|🇰🇷/g, '').trim());

  // Responsive grid columns
  const getGridColumns = () => {
    if (isDesktop) return 'repeat(4, 1fr)';
    if (isTablet) return 'repeat(3, 1fr)';
    return 'repeat(2, 1fr)';
  };

  return (
    <div style={{
      fontFamily: theme.fonts.body,
      background: '#f5f5f5',
      minHeight: '100vh',
      paddingBottom: isDesktop ? 40 : 70,
    }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Libre+Franklin:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Top Header - M&S Style Black & White */}
      <header style={{
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #e5e5e5',
      }}>
        {/* Top bar with account links */}
        {isDesktop && (
          <div style={{
            background: '#f5f5f5',
            padding: '8px 0',
            borderBottom: '1px solid #e5e5e5',
          }}>
            <div style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 20px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 24,
            }}>
              {['Store Finder', 'Help', 'Track Order'].map((link) => (
                <button
                  key={link}
                  onClick={link === 'Track Order' ? () => setShowTrackingModal(true) : undefined}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 12,
                    color: '#333',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main header */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isDesktop ? '16px 20px' : '12px 16px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Logo + Nav container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
              {/* Logo */}
              <span style={{
                fontSize: isDesktop ? 28 : 22,
                fontWeight: 300,
                fontFamily: theme.fonts.primary,
                color: '#000',
                letterSpacing: -1,
              }}>
                <span style={{ fontWeight: 700 }}>Global</span>Mart
              </span>

              {/* Desktop Navigation Links */}
              {isDesktop && (
                <nav style={{ display: 'flex', gap: 28 }}>
                  {['Home', 'Categories', 'Flash Deals', 'Trending', 'Contact'].map((link) => (
                    <button
                      key={link}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#000',
                        cursor: 'pointer',
                        padding: '4px 0',
                        fontFamily: theme.fonts.body,
                      }}
                    >
                      {link}
                    </button>
                  ))}
                </nav>
              )}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isDesktop ? 20 : 12 }}>
              {/* Account */}
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {isDesktop && <span style={{ fontSize: 13, color: '#000' }}>Sign In</span>}
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                style={{
                  background: '#000',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span style={{ fontSize: 13, color: '#fff' }}>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isDesktop ? '0 20px 16px' : '0 16px 12px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f5f5f5',
            padding: '12px 16px',
            border: 'none',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search GlobalMart"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                marginLeft: 12,
                fontSize: 14,
                outline: 'none',
                fontFamily: theme.fonts.body,
                color: '#333',
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '0 0 20px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero Banner Carousel - M&S Style */}
        <HeroBannerCarousel isMobile={isMobile} isDesktop={isDesktop} />

        {/* Category Grid - M&S Style */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '32px 32px' : '24px 16px',
          margin: isDesktop ? '12px 16px' : 0,
        }}>
          <h2 style={{
            fontSize: isDesktop ? 24 : 20,
            fontWeight: 300,
            color: '#000',
            margin: '0 0 20px 0',
            fontFamily: theme.fonts.primary,
            letterSpacing: -0.5,
          }}>
            <span style={{ fontWeight: 600 }}>Shop by</span> Category
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(10, 1fr)' : 'repeat(5, 1fr)',
            gap: isDesktop ? '20px 16px' : '16px 8px',
          }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: 0,
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => isDesktop && (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => isDesktop && (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  width: isDesktop ? 64 : 52,
                  height: isDesktop ? 64 : 52,
                  borderRadius: 16,
                  background: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isDesktop ? 32 : 26,
                  position: 'relative',
                  transition: 'box-shadow 0.2s ease',
                }}>
                  {cat.icon}
                  {cat.badge && (
                    <span style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      background: cat.badge === 'NEW' ? '#00d68f' : cat.badge === 'FAST' ? '#667eea' : '#ff4757',
                      color: '#fff',
                      fontSize: 8,
                      fontWeight: 700,
                      padding: '2px 5px',
                      borderRadius: 4,
                    }}>
                      {cat.badge}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: isDesktop ? 12 : 11,
                  color: '#333',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  fontWeight: 500,
                }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner - M&S Style */}
        <div style={{
          margin: isDesktop ? '12px 16px' : '12px 16px',
          background: '#f5f5f5',
          padding: isDesktop ? '20px 32px' : '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🚚', text: 'Free Delivery Over ₩30,000' },
            { icon: '💳', text: 'International Cards Accepted' },
            { icon: '🌍', text: 'Worldwide Shipping' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 12, color: '#000', fontWeight: 400, letterSpacing: 0.3 }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Don't Miss Out Section - M&S Style */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '32px 0' : '24px 0',
          marginTop: 12,
          margin: isDesktop ? '12px 16px' : '12px 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isDesktop ? '0 32px' : '0 16px',
            marginBottom: isDesktop ? 24 : 16,
          }}>
            <h2 style={{
              fontSize: isDesktop ? 24 : 20,
              fontWeight: 300,
              color: '#000',
              margin: 0,
              fontFamily: theme.fonts.primary,
              letterSpacing: -0.5,
            }}>
              <span style={{ fontWeight: 600 }}>Trending</span> Now
            </h2>
            <button style={{
              background: 'none',
              border: '1px solid #000',
              color: '#000',
              fontSize: 12,
              fontWeight: 400,
              cursor: 'pointer',
              padding: '8px 16px',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              View All
            </button>
          </div>

          {/* Horizontal Scroll Products */}
          <div style={{
            display: 'flex',
            gap: isDesktop ? 20 : 12,
            overflowX: 'auto',
            paddingLeft: isDesktop ? 32 : 16,
            paddingRight: isDesktop ? 32 : 16,
            paddingBottom: 8,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}>
            {FLASH_DEALS.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                style={{
                  minWidth: isDesktop ? 200 : 140,
                  maxWidth: isDesktop ? 200 : 140,
                  background: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  scrollSnapAlign: 'start',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (isDesktop) {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDesktop) {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{
                  aspectRatio: '1/1',
                  background: '#f8f8f8',
                  position: 'relative',
                }}>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {product.discount && (
                    <span style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      background: '#ff4757',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '3px 6px',
                      borderRadius: 4,
                    }}>
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div style={{ padding: 10 }}>
                  <p style={{
                    fontSize: 12,
                    color: '#333',
                    margin: 0,
                    lineHeight: 1.3,
                    height: 32,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: product.discount ? '#ff4757' : '#333',
                    margin: '6px 0 0',
                  }}>
                    ₩{formatKRW(product.salePrice || product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Deals Section - M&S Style */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '32px 32px' : '24px 16px',
          marginTop: 12,
          margin: isDesktop ? '12px 16px' : '12px 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isDesktop ? 24 : 16,
          }}>
            <div>
              <h2 style={{
                fontSize: isDesktop ? 24 : 20,
                fontWeight: 300,
                color: '#000',
                margin: 0,
                fontFamily: theme.fonts.primary,
                letterSpacing: -0.5,
              }}>
                <span style={{ fontWeight: 600 }}>Flash</span> Deals
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 12, color: '#666' }}>Ends in</span>
                <CountdownTimer />
              </div>
            </div>
            <button style={{
              background: 'none',
              border: '1px solid #000',
              color: '#000',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '8px 16px',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              View All
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: isDesktop ? 20 : 10,
          }}>
            {FLASH_DEALS.slice(0, isDesktop ? 8 : 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isDeal
                onLike={toggleLike}
                isLiked={likedProducts.has(product.id)}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>

        {/* Popular Products Section - M&S Style */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '32px 32px' : '24px 16px',
          marginTop: 12,
          margin: isDesktop ? '12px 16px' : '12px 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: isDesktop ? 24 : 16,
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <h2 style={{
              fontSize: isDesktop ? 24 : 20,
              fontWeight: 300,
              color: '#000',
              margin: 0,
              fontFamily: theme.fonts.primary,
              letterSpacing: -0.5,
            }}>
              <span style={{ fontWeight: 600 }}>Shop by</span> Origin
            </h2>
            <div style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
            }}>
              {filterButtons.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    background: activeFilter === f ? '#000' : '#fff',
                    color: activeFilter === f ? '#fff' : '#000',
                    border: '1px solid #000',
                    padding: isDesktop ? '8px 16px' : '6px 12px',
                    fontSize: isDesktop ? 12 : 11,
                    fontWeight: 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: isDesktop ? 20 : 10,
          }}>
            {filteredProducts.slice(0, isDesktop ? 8 : 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLike={toggleLike}
                isLiked={likedProducts.has(product.id)}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>

          <button style={{
            width: isDesktop ? 'auto' : '100%',
            padding: '14px 32px',
            background: '#000',
            border: 'none',
            fontSize: 12,
            fontWeight: 500,
            color: '#fff',
            cursor: 'pointer',
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            margin: isDesktop ? '24px auto 0' : '20px 0 0',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            View All Products
          </button>
        </div>
      </main>

      {/* Bottom Tab Navigation - Hide on desktop */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #eee',
        display: isDesktop ? 'none' : 'flex',
        justifyContent: 'space-around',
        padding: '8px 0 12px',
        zIndex: 1000,
      }}>
        {[
          { id: 'home', icon: '🏠', label: 'Home', active: true },
          { id: 'categories', icon: '📦', label: 'Categories', active: false },
          { id: 'search', icon: '🔍', label: 'Search', active: false },
          { id: 'profile', icon: '👤', label: 'Profile', active: false },
          { id: 'cart', icon: '🛒', label: 'Cart', badge: cartCount, active: false },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'cart') openCart();
              else if (tab.id === 'profile') {
                if (isAuthenticated) setShowTrackingModal(true);
                else setShowAuthModal(true);
              }
              else setActiveTab(tab.id);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '4px 12px',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            {tab.badge > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 8,
                background: '#ff4757',
                color: '#fff',
                fontSize: 10,
                fontWeight: 600,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
              }}>
                {tab.badge}
              </span>
            )}
            <span style={{
              fontSize: 10,
              color: tab.active ? '#667eea' : '#999',
              fontWeight: tab.active ? 600 : 400,
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Modals & Drawers */}
      <CartDrawer onCheckout={handleCheckout} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={showTrackingModal}
        onClose={() => {
          setShowTrackingModal(false);
          setTrackingOrderId(null);
        }}
        initialOrderId={trackingOrderId}
      />

      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        order={lastOrder}
        onTrackOrder={handleTrackOrder}
      />

      <ProductDetailModal
        isOpen={showProductDetail}
        onClose={() => {
          setShowProductDetail(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onProductClick={handleProductClick}
      />
    </div>
  );
}

export default HomePage;
