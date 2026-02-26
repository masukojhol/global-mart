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

      {/* Top Header */}
      <header style={{
        background: '#fff',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isDesktop ? 32 : 8 }}>
            <span style={{
              fontSize: isDesktop ? 28 : 24,
              fontWeight: 700,
              fontFamily: theme.fonts.primary,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              GlobalMart
            </span>

            {/* Desktop Navigation Links */}
            {isDesktop && (
              <div style={{ display: 'flex', gap: 24 }}>
                {['Home', 'Categories', 'Flash Deals', 'Trending', 'Contact'].map((link) => (
                  <button
                    key={link}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      color: link === 'Home' ? '#667eea' : '#333',
                      cursor: 'pointer',
                      padding: '8px 0',
                      position: 'relative',
                    }}
                  >
                    {link}
                    {link === 'Home' && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: '#667eea',
                        borderRadius: 1,
                      }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Right Actions */}
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#333',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Sign In
              </button>
              <button
                onClick={openCart}
                style={{
                  background: '#667eea',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Cart ({cartCount})
              </button>
            </div>
          )}

          {!isDesktop && (
            <button
              onClick={() => setShowTrackingModal(true)}
              style={{
                background: 'none',
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#ff4757',
                color: '#fff',
                fontSize: 10,
                fontWeight: 600,
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                3
              </span>
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f8f8f8',
          borderRadius: 25,
          padding: '10px 16px',
          border: '1.5px solid #e0e0e0',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search on GlobalMart!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              marginLeft: 10,
              fontSize: 15,
              outline: 'none',
              fontFamily: theme.fonts.body,
            }}
          />
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="#666"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </button>
        </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '0 0 20px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero Banner */}
        <div style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          color: '#fff',
          padding: isMobile ? '28px 20px' : '50px 40px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: isDesktop ? 0 : 0,
        }}>
          <span style={{
            position: 'absolute',
            right: isDesktop ? 100 : isMobile ? -20 : 40,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: isDesktop ? 200 : isMobile ? 100 : 140,
            opacity: 0.15,
          }}>
            🛍️
          </span>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: isDesktop ? 600 : 500 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 4,
              marginBottom: 14,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
              🇳🇵 🇮🇳 🇵🇰 🇰🇷 Taste of Home
            </div>
            <h1 style={{
              fontSize: isDesktop ? 42 : isMobile ? 26 : 36,
              fontWeight: 300,
              lineHeight: 1.2,
              margin: 0,
              fontFamily: theme.fonts.primary,
            }}>
              Your Home Products<br />
              <span style={{ fontWeight: 600 }}>Delivered in Korea</span>
            </h1>
            <p style={{
              fontSize: isDesktop ? 16 : isMobile ? 13 : 15,
              opacity: 0.9,
              marginTop: 12,
              marginBottom: 20,
              lineHeight: 1.5,
            }}>
              Authentic products from Nepal, India, Pakistan & Korea. Fast delivery, multilingual support.
            </p>
            <button style={{
              background: '#fff',
              color: '#667eea',
              border: 'none',
              padding: '12px 28px',
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 25,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              Shop Now
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '24px 32px' : '20px 16px',
          borderRadius: isDesktop ? 12 : 0,
          margin: isDesktop ? '12px 16px' : 0,
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#ff4757',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 16,
          }}>
            🕐 Time to buy it again!
          </div>

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

        {/* Info Banner */}
        <div style={{
          margin: isDesktop ? '12px 16px' : '12px 16px',
          background: '#e8f4fd',
          borderRadius: 8,
          padding: isDesktop ? '18px 24px' : '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            ℹ️
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: '#333' }}>
              Free delivery on orders over ₩30,000
            </p>
            <p style={{ fontSize: 11, color: '#666', margin: '2px 0 0' }}>
              All international cards accepted
            </p>
          </div>
        </div>

        {/* Don't Miss Out Section */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '24px 0' : '20px 0',
          marginTop: 12,
          borderRadius: isDesktop ? 12 : 0,
          margin: isDesktop ? '12px 16px' : '12px 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isDesktop ? '0 32px' : '0 16px',
            marginBottom: isDesktop ? 20 : 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: isDesktop ? 24 : 20 }}>🔔</span>
              <span style={{ fontSize: isDesktop ? 20 : 17, fontWeight: 600, color: '#333' }}>
                Don't miss out on these!
              </span>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              See more ›
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

        {/* Flash Deals Section */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '24px 32px' : '20px 16px',
          marginTop: 12,
          borderRadius: isDesktop ? 12 : 0,
          margin: isDesktop ? '12px 16px' : '12px 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isDesktop ? 20 : 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: isDesktop ? 24 : 20 }}>⚡</span>
              <span style={{ fontSize: isDesktop ? 20 : 17, fontWeight: 600, color: '#333' }}>
                Flash Deals
              </span>
              <CountdownTimer />
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}>
              View All ›
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

        {/* Popular Products Section */}
        <div style={{
          background: '#fff',
          padding: isDesktop ? '24px 32px' : '20px 16px',
          marginTop: 12,
          borderRadius: isDesktop ? 12 : 0,
          margin: isDesktop ? '12px 16px' : '12px 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isDesktop ? 20 : 14,
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: isDesktop ? 24 : 20 }}>🌍</span>
              <span style={{ fontSize: isDesktop ? 20 : 17, fontWeight: 600, color: '#333' }}>
                Popular with Expats in Korea
              </span>
            </div>
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
                    background: activeFilter === f ? '#667eea' : '#fff',
                    color: activeFilter === f ? '#fff' : '#333',
                    border: activeFilter === f ? 'none' : '1px solid #ddd',
                    padding: isDesktop ? '8px 16px' : '6px 12px',
                    fontSize: isDesktop ? 13 : 11,
                    fontWeight: 500,
                    borderRadius: 20,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
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
            padding: isDesktop ? '14px 40px' : '14px',
            background: '#f8f8f8',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            color: '#333',
            cursor: 'pointer',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            margin: isDesktop ? '20px auto 0' : '16px 0 0',
          }}>
            View All Products ›
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
