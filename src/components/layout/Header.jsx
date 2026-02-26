import { theme } from '../../styles/theme';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { CATEGORIES } from '../../data/products';

export function Header({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onOpenAuth,
  onOpenCart,
  onOpenTracking,
}) {
  const { isMobile } = useWindowSize();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      {/* Header */}
      <header style={{
        background: theme.colors.brandWhite,
        borderBottom: `1px solid ${theme.colors.borderLight}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '14px 16px' : '0 24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? 14 : 24,
          minHeight: isMobile ? 'auto' : 64,
        }}>
          {/* Top row for mobile: Logo + Cart */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexShrink: 0 }}>
              <span style={{
                fontSize: isMobile ? 22 : 26,
                fontWeight: 300,
                letterSpacing: -1,
                fontFamily: theme.fonts.accent,
                color: theme.colors.brandPrimary,
              }}>Global</span>
              <span style={{
                fontSize: isMobile ? 22 : 26,
                fontWeight: 500,
                letterSpacing: -1,
                fontFamily: theme.fonts.accent,
                color: theme.colors.brandPrimary,
              }}>Mart</span>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: theme.colors.brandBlue,
                marginLeft: 6,
                fontFamily: theme.fonts.primary,
                letterSpacing: 0.5,
              }}>KOREA</span>
            </div>

            {/* Mobile Nav Actions */}
            {isMobile && (
              <nav style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <button
                  onClick={onOpenTracking}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    padding: 0,
                    color: theme.colors.textPrimary,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </button>
                <button
                  onClick={onOpenCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    padding: 0,
                    position: 'relative',
                    color: theme.colors.textPrimary,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  {itemCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: -6,
                      right: -8,
                      background: theme.colors.uiSale,
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 600,
                      borderRadius: 10,
                      padding: '2px 5px',
                      minWidth: 14,
                      textAlign: 'center',
                    }}>
                      {itemCount}
                    </span>
                  )}
                </button>
              </nav>
            )}
          </div>

          {/* Search - Desktop */}
          {!isMobile && (
            <div style={{
              flex: 1,
              maxWidth: 520,
              display: 'flex',
              border: `2px solid ${theme.colors.brandBlue}`,
              borderRadius: 0,
              overflow: 'hidden',
              height: 44,
            }}>
              <input
                type="text"
                placeholder="Search Nepali, Indian, Pakistani, Korean products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '0 16px',
                  fontSize: 14,
                  fontFamily: theme.fonts.body,
                  background: '#fff',
                }}
              />
              <button style={{
                width: 52,
                background: theme.colors.brandBlue,
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Desktop Nav Actions */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              {/* Track Order */}
              <button
                onClick={onOpenTracking}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textPrimary} strokeWidth="1.5">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.primary,
                  letterSpacing: 0.5,
                }}>Track</span>
              </button>

              {/* Account */}
              <button
                onClick={() => isAuthenticated ? null : onOpenAuth()}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: 0,
                  position: 'relative',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textPrimary} strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.primary,
                  letterSpacing: 0.5,
                }}>
                  {isAuthenticated ? user?.name?.split(' ')[0] : 'Account'}
                </span>
                {isAuthenticated && (
                  <span style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    background: theme.colors.uiSuccess,
                    borderRadius: '50%',
                  }} />
                )}
              </button>

              {/* Logout button (if authenticated) */}
              {isAuthenticated && (
                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 11,
                    color: theme.colors.textMuted,
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  Logout
                </button>
              )}

              {/* Cart */}
              <button
                onClick={onOpenCart}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: 0,
                  position: 'relative',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textPrimary} strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.primary,
                  letterSpacing: 0.5,
                }}>Cart</span>
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -8,
                    background: theme.colors.uiSale,
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 600,
                    borderRadius: 10,
                    padding: '2px 5px',
                    minWidth: 14,
                    textAlign: 'center',
                  }}>
                    {itemCount}
                  </span>
                )}
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Category Bar */}
      <div style={{
        background: theme.colors.brandWhite,
        borderBottom: `1px solid ${theme.colors.borderLight}`,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '0 12px' : '0 24px',
          display: 'flex',
          gap: 0,
          justifyContent: isMobile ? 'flex-start' : 'center',
        }}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === i ? null : i)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: isMobile ? '14px 10px' : '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
                borderBottom: activeCategory === i ? '2px solid #000' : '2px solid transparent',
                transition: 'all 0.2s',
                position: 'relative',
                fontFamily: theme.fonts.primary,
              }}
            >
              <span style={{
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                color: cat.badge === 'SALE' ? theme.colors.uiSale : (activeCategory === i ? '#000' : theme.colors.textSecondary),
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}>
                {cat.label}
              </span>
              {cat.badge && (
                <span style={{
                  background: cat.badge === 'HOT' ? '#FF6B35' : theme.colors.uiSale,
                  color: '#fff',
                  fontSize: 8,
                  fontWeight: 700,
                  padding: '2px 5px',
                  borderRadius: 0,
                  letterSpacing: 0.5,
                }}>
                  {cat.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div style={{
          padding: '12px 16px',
          background: theme.colors.brandWhite,
          borderBottom: `1px solid ${theme.colors.borderLight}`,
        }}>
          <div style={{
            display: 'flex',
            border: `2px solid ${theme.colors.brandBlue}`,
            borderRadius: 0,
            overflow: 'hidden',
            height: 42,
          }}>
            <input
              type="text"
              placeholder="Search products from home..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '0 14px',
                fontSize: 14,
                fontFamily: theme.fonts.body,
                background: '#fff',
              }}
            />
            <button style={{
              width: 48,
              background: theme.colors.brandBlue,
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
