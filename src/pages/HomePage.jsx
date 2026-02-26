import { useState, useEffect } from 'react';
import { theme, cssVariables } from '../styles/theme';
import { useWindowSize } from '../hooks/useWindowSize';
import { FLASH_DEALS, PRODUCTS, CATEGORIES } from '../data/products';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/product/ProductCard';
import { CartDrawer } from '../components/cart/CartDrawer';
import { AuthModal } from '../components/auth/AuthModal';
import { CheckoutModal } from '../components/checkout/CheckoutModal';
import { OrderTrackingModal } from '../components/tracking/OrderTrackingModal';
import { OrderSuccessModal } from '../components/tracking/OrderSuccessModal';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

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
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            background: theme.colors.uiSale,
            color: '#fff',
            fontFamily: theme.fonts.mono,
            fontSize: 13,
            fontWeight: 500,
            padding: '4px 8px',
            borderRadius: 0,
            minWidth: 28,
            textAlign: 'center',
          }}>{v}</span>
          {i < 2 && <span style={{ fontWeight: 500, fontSize: 14, color: theme.colors.textSecondary }}>:</span>}
        </span>
      ))}
    </div>
  );
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('All');

  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const { isMobile, isTablet, getGridColumns } = useWindowSize();
  const { openCart, isOpen: isCartOpen } = useCart();
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

  // Filter products based on active filter
  const filteredProducts = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.categoryLabel === activeFilter.replace(/🇳🇵|🇮🇳|🇵🇰|🇰🇷/g, '').trim());

  const filterButtons = ['All', '🇳🇵 Nepal', '🇮🇳 India', '🇵🇰 Pakistan', '🇰🇷 Korea'];

  return (
    <div style={{
      ...cssVariables,
      fontFamily: theme.fonts.body,
      background: theme.colors.surfaceCream,
      minHeight: '100vh',
      color: theme.colors.textPrimary,
    }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Libre+Franklin:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Keyframes for loading spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Top Promo Banner */}
      {showBanner && (
        <div style={{
          background: theme.colors.brandBlue,
          color: '#FFFFFF',
          textAlign: 'center',
          padding: isMobile ? '10px 40px 10px 16px' : '12px 16px',
          fontSize: isMobile ? 12 : 13,
          fontWeight: 400,
          letterSpacing: 0.3,
          position: 'relative',
          fontFamily: theme.fonts.body,
        }}>
          🌍 <strong>Taste of Home in Korea</strong> — Nepal 🇳🇵 India 🇮🇳 Pakistan 🇵🇰 & More | <span style={{ fontWeight: 600 }}>Free delivery over ₩30,000</span>
          <button
            onClick={() => setShowBanner(false)}
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 18,
              padding: 4,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenCart={openCart}
        onOpenTracking={() => {
          setTrackingOrderId(null);
          setShowTrackingModal(true);
        }}
      />

      {/* Main Content */}
      <main style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: isMobile ? '20px 16px 60px' : '32px 24px 80px',
      }}>
        {/* Value Props Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 8 : 16,
          marginBottom: isMobile ? 24 : 40,
        }}>
          {[
            { icon: '🏠', title: 'Taste of Home', desc: 'Authentic products' },
            { icon: '🚀', title: 'Fast Delivery', desc: 'Next day in Korea' },
            { icon: '💳', title: 'All Cards OK', desc: "Int'l cards accepted" },
            { icon: '🗣️', title: 'Multi-Language', desc: 'EN, NE, HI, UR, KO' },
          ].map((item) => (
            <div key={item.title} style={{
              background: '#fff',
              border: `1px solid ${theme.colors.borderLight}`,
              padding: isMobile ? 12 : '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ fontSize: isMobile ? 24 : 28 }}>{item.icon}</span>
              <div>
                <p style={{
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 600,
                  margin: 0,
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.primary,
                }}>{item.title}</p>
                <p style={{
                  fontSize: isMobile ? 10 : 11,
                  color: theme.colors.textMuted,
                  margin: '2px 0 0',
                  fontFamily: theme.fonts.body,
                }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.brandBlue} 0%, #0A3299 100%)`,
          color: '#fff',
          borderRadius: 0,
          padding: isMobile ? '32px 20px' : isTablet ? '48px 36px' : '56px 56px',
          marginBottom: isMobile ? 28 : 48,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          position: 'relative',
          overflow: 'hidden',
          gap: isMobile ? 20 : 0,
        }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: isMobile ? '100%' : 480 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 0,
              marginBottom: isMobile ? 14 : 20,
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontFamily: theme.fonts.primary,
            }}>
              <span>🇳🇵 🇮🇳 🇵🇰 🇰🇷</span>
              <span>Taste of Home</span>
            </div>
            <h1 style={{
              fontSize: isMobile ? 28 : isTablet ? 36 : 44,
              fontWeight: 300,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: -1,
              fontFamily: theme.fonts.accent,
            }}>
              Your Home Products<br />
              <span style={{ fontWeight: 500 }}>Delivered in Korea</span>
            </h1>
            <p style={{
              fontSize: isMobile ? 13 : 15,
              color: 'rgba(255,255,255,0.8)',
              marginTop: 14,
              marginBottom: isMobile ? 20 : 28,
              lineHeight: 1.6,
              fontFamily: theme.fonts.body,
              maxWidth: 380,
            }}>
              Authentic products from Nepal, India, Pakistan & Korea. Fast delivery, multilingual support, all payment methods accepted.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{
                background: '#FFFFFF',
                color: theme.colors.brandBlue,
                border: 'none',
                padding: isMobile ? '12px 24px' : '14px 32px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 0,
                cursor: 'pointer',
                letterSpacing: 1,
                textTransform: 'uppercase',
                fontFamily: theme.fonts.primary,
                transition: 'all 0.2s',
              }}>
                Shop Now
              </button>
              <button style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.5)',
                padding: isMobile ? '10px 20px' : '12px 28px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 0,
                cursor: 'pointer',
                letterSpacing: 1,
                textTransform: 'uppercase',
                fontFamily: theme.fonts.primary,
              }}>
                How It Works
              </button>
            </div>
          </div>
          <div style={{
            fontSize: isMobile ? 80 : 140,
            position: isMobile ? 'relative' : 'absolute',
            right: isMobile ? 0 : 40,
            opacity: isMobile ? 0.3 : 0.15,
            alignSelf: isMobile ? 'flex-end' : 'center',
          }}>
            🛍️
          </div>
        </div>

        {/* Flash Deals Section */}
        <section style={{ marginBottom: isMobile ? 36 : 56 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMobile ? 16 : 24,
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16 }}>
              <h2 style={{
                fontSize: isMobile ? 20 : 26,
                fontWeight: 300,
                margin: 0,
                letterSpacing: -0.5,
                fontFamily: theme.fonts.primary,
                color: theme.colors.textPrimary,
              }}>
                Flash Deals
              </h2>
              <CountdownTimer />
            </div>
            <button style={{
              background: 'none',
              border: `1.5px solid ${theme.colors.brandPrimary}`,
              padding: isMobile ? '8px 16px' : '10px 20px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 0,
              cursor: 'pointer',
              color: theme.colors.brandPrimary,
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: theme.fonts.primary,
            }}>
              View All
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: isMobile ? 10 : 20,
          }}>
            {FLASH_DEALS.map((deal) => (
              <ProductCard
                key={deal.id}
                product={deal}
                isDeal
                onLike={toggleLike}
                isLiked={likedProducts.has(deal.id)}
              />
            ))}
          </div>
        </section>

        {/* Why GlobalMart Section */}
        <div style={{
          background: '#FFFFFF',
          border: `1px solid ${theme.colors.borderLight}`,
          borderRadius: 0,
          padding: isMobile ? 20 : '28px 36px',
          marginBottom: isMobile ? 32 : 56,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 16 : 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              background: theme.colors.brandBlue,
              padding: '14px 18px',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 24 }}>🏠</span>
            </div>
            <div>
              <h3 style={{
                fontSize: isMobile ? 15 : 17,
                fontWeight: 500,
                margin: 0,
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.primary,
              }}>
                Why Expats Choose GlobalMart
              </h3>
              <p style={{
                fontSize: isMobile ? 12 : 13,
                color: theme.colors.textSecondary,
                margin: '4px 0 0',
                fontFamily: theme.fonts.body,
              }}>
                Authentic home products • Multilingual • All payment methods • Fast Korea delivery
              </p>
            </div>
          </div>
          <button style={{
            background: theme.colors.brandPrimary,
            color: '#fff',
            border: 'none',
            padding: isMobile ? '12px 24px' : '14px 28px',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 0,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontFamily: theme.fonts.primary,
            width: isMobile ? '100%' : 'auto',
          }}>
            Learn More
          </button>
        </div>

        {/* Products Grid */}
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMobile ? 16 : 24,
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <h2 style={{
              fontSize: isMobile ? 20 : 26,
              fontWeight: 300,
              margin: 0,
              letterSpacing: -0.5,
              fontFamily: theme.fonts.primary,
              color: theme.colors.textPrimary,
            }}>
              Popular with Expats
            </h2>
            <div style={{
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
            }}>
              {filterButtons.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    background: activeFilter === f ? theme.colors.brandPrimary : 'transparent',
                    color: activeFilter === f ? '#fff' : theme.colors.textPrimary,
                    border: activeFilter === f ? 'none' : `1.5px solid ${theme.colors.borderMedium}`,
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: 0,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontFamily: theme.fonts.primary,
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
            gap: isMobile ? 10 : 20,
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLike={toggleLike}
                isLiked={likedProducts.has(product.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

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
    </div>
  );
}

export default HomePage;
