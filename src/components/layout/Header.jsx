/**
 * HEADER COMPONENT
 * ================
 * Header with navigation using GoFresh design tokens.
 */

import { tokens } from '../../styles/tokens';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { CATEGORIES } from '../../data/products';
import { CountBadge } from '../common/Badge';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

const { colors, typography, borderRadius, shadows, spacing, transitions } = tokens;

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
  const { t } = useLanguage();

  return (
    <>
      {/* Header */}
      <header style={{
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? `${spacing[4]}px ${spacing[4]}px` : `0 ${spacing[6]}px`,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? spacing[4] : spacing[6],
          minHeight: isMobile ? 'auto' : 64,
        }}>
          {/* Top row for mobile: Logo + Cart */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexShrink: 0 }}>
              <span style={{
                fontSize: isMobile ? 22 : 26,
                fontWeight: typography.fontWeight.regular,
                letterSpacing: -1,
                fontFamily: typography.fontFamily.heading,
                color: colors.primary,
              }}>Go</span>
              <span style={{
                fontSize: isMobile ? 22 : 26,
                fontWeight: typography.fontWeight.bold,
                letterSpacing: -1,
                fontFamily: typography.fontFamily.heading,
                color: colors.primary,
              }}>Fresh</span>
              <span style={{
                fontSize: 10,
                fontWeight: typography.fontWeight.semibold,
                color: colors.accent,
                marginLeft: 6,
                fontFamily: typography.fontFamily.body,
                letterSpacing: 0.5,
              }}>MARKET</span>
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
                    color: colors.text,
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
                    color: colors.text,
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
                    }}>
                      <CountBadge count={itemCount} />
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
              border: `2px solid ${colors.primary}`,
              borderRadius: borderRadius.default,
              overflow: 'hidden',
              height: 44,
            }}>
              <input
                type="text"
                placeholder={t('header.searchGroceries')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: `0 ${spacing[4]}px`,
                  fontSize: typography.fontSize.base,
                  fontFamily: typography.fontFamily.body,
                  background: colors.background,
                }}
              />
              <button style={{
                width: 52,
                background: colors.primary,
                border: 'none',
                color: colors.white,
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: transitions.hover,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Desktop Nav Actions */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: spacing[4], flexShrink: 0 }}>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="1.5">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.textSecondary,
                  fontFamily: typography.fontFamily.body,
                }}>{t('nav.track')}</span>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.textSecondary,
                  fontFamily: typography.fontFamily.body,
                }}>
                  {isAuthenticated ? user?.name?.split(' ')[0] : t('nav.account')}
                </span>
                {isAuthenticated && (
                  <span style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    background: colors.success,
                    borderRadius: borderRadius.circle,
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
                    fontSize: typography.fontSize.xs,
                    color: colors.textMuted,
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  {t('nav.signOut')}
                </button>
              )}

              {/* Language Switcher */}
              <LanguageSwitcher variant="toggle" showLabel={false} />

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.textSecondary,
                  fontFamily: typography.fontFamily.body,
                }}>{t('nav.cart')}</span>
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -8,
                  }}>
                    <CountBadge count={itemCount} />
                  </span>
                )}
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Category Bar */}
      <div style={{
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? `0 ${spacing[3]}px` : `0 ${spacing[6]}px`,
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
                padding: isMobile ? `${spacing[4]}px ${spacing[3]}px` : `${spacing[4]}px ${spacing[5]}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
                borderBottom: activeCategory === i ? `2px solid ${colors.primary}` : '2px solid transparent',
                transition: transitions.hover,
                position: 'relative',
                fontFamily: typography.fontFamily.body,
              }}
            >
              <span style={{
                fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.md,
                fontWeight: typography.fontWeight.medium,
                // Sentence case per design spec
                textTransform: 'none',
                color: cat.badge === 'SALE' ? colors.sale : (activeCategory === i ? colors.primary : colors.textSecondary),
              }}>
                {cat.label}
              </span>
              {cat.badge && (
                <span style={{
                  background: cat.badge === 'HOT' ? colors.accent : colors.sale,
                  color: colors.white,
                  fontSize: 8,
                  fontWeight: typography.fontWeight.bold,
                  padding: '2px 5px',
                  borderRadius: borderRadius.default,
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
          padding: `${spacing[3]}px ${spacing[4]}px`,
          background: colors.background,
          borderBottom: `1px solid ${colors.border}`,
        }}>
          <div style={{
            display: 'flex',
            border: `2px solid ${colors.primary}`,
            borderRadius: borderRadius.default,
            overflow: 'hidden',
            height: 42,
          }}>
            <input
              type="text"
              placeholder={t('header.searchGroceries')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: `0 ${spacing[4]}px`,
                fontSize: typography.fontSize.base,
                fontFamily: typography.fontFamily.body,
                background: colors.background,
              }}
            />
            <button style={{
              width: 48,
              background: colors.primary,
              border: 'none',
              color: colors.white,
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
