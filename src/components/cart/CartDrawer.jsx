/**
 * CART DRAWER COMPONENT
 * =====================
 * Shopping cart drawer using GoFresh design tokens.
 */

import { useCart } from '../../contexts/CartContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { tokens } from '../../styles/tokens';
import { formatKRW, toUSD } from '../../utils/helpers';
import { Button } from '../common/Button';
import { Badge, CountBadge } from '../common/Badge';

const { colors, typography, borderRadius, shadows, spacing, transitions } = tokens;

export function CartDrawer({ onCheckout }) {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    itemCount,
    amountToFreeShipping,
    hasRocketItems,
  } = useCart();

  const { isMobile } = useWindowSize();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: isMobile ? '100%' : 420,
          height: '100%',
          background: colors.background,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: shadows.drawer,
        }}
      >
        {/* Header */}
        <div style={{
          padding: `${spacing[5]}px ${spacing[6]}px`,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.heading,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[3],
            color: colors.text,
          }}>
            Shopping cart
            <CountBadge count={itemCount} color={colors.primary} />
          </h2>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              color: colors.textSecondary,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 && (
          <div style={{
            padding: `${spacing[3]}px ${spacing[6]}px`,
            background: colors.backgroundSoft,
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: typography.fontSize.sm,
              color: colors.textSecondary,
              marginBottom: spacing[2],
            }}>
              Add <strong style={{ color: colors.primary }}>₩{formatKRW(amountToFreeShipping)}</strong> more for FREE delivery!
            </p>
            <div style={{
              height: 4,
              background: colors.border,
              borderRadius: borderRadius.default,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${Math.min((subtotal / 30000) * 100, 100)}%`,
                height: '100%',
                background: colors.primary,
                borderRadius: borderRadius.default,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        )}

        {amountToFreeShipping <= 0 && (
          <div style={{
            padding: `${spacing[3]}px ${spacing[6]}px`,
            background: `${colors.success}15`,
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: typography.fontSize.sm,
              color: colors.success,
              fontWeight: typography.fontWeight.medium,
            }}>
              🎉 You qualify for FREE delivery!
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: `${spacing[4]}px ${spacing[6]}px`,
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: `${spacing[12]}px ${spacing[5]}px`,
            }}>
              <div style={{ fontSize: 48, marginBottom: spacing[4] }}>🛒</div>
              <h3 style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.medium,
                color: colors.text,
                margin: `0 0 ${spacing[2]}px`,
                fontFamily: typography.fontFamily.heading,
              }}>
                Your cart is empty
              </h3>
              <p style={{
                fontSize: typography.fontSize.md,
                color: colors.textSecondary,
                margin: 0,
              }}>
                Add items to get started
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: spacing[4],
                    paddingBottom: spacing[4],
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: 80,
                    height: 80,
                    flexShrink: 0,
                    background: colors.backgroundSoft,
                    borderRadius: borderRadius.default,
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.textMuted,
                      margin: `0 0 2px`,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}>
                      {item.flag} {item.category}
                    </p>
                    <p style={{
                      fontSize: typography.fontSize.md,
                      fontWeight: typography.fontWeight.medium,
                      margin: `0 0 ${spacing[2]}px`,
                      color: colors.text,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.semibold,
                      margin: `0 0 ${spacing[2]}px`,
                      fontFamily: typography.fontFamily.mono,
                      color: colors.text,
                    }}>
                      ₩{formatKRW(item.price)}
                      <span style={{
                        fontSize: typography.fontSize.xs,
                        color: colors.textMuted,
                        fontWeight: typography.fontWeight.regular,
                        marginLeft: spacing[2],
                      }}>
                        ≈${toUSD(item.price)}
                      </span>
                    </p>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[3],
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${colors.border}`,
                        borderRadius: borderRadius.default,
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: 28,
                            height: 28,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 14,
                            color: colors.textSecondary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          width: 32,
                          textAlign: 'center',
                          fontSize: typography.fontSize.md,
                          fontWeight: typography.fontWeight.medium,
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: 28,
                            height: 28,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 14,
                            color: colors.textSecondary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
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
                        Remove
                      </button>
                    </div>

                    {item.rocket && (
                      <div style={{ marginTop: spacing[2] }}>
                        <Badge variant="primary" size="sm">🚀 Rocket</Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: `${spacing[5]}px ${spacing[6]}px`,
            borderTop: `1px solid ${colors.border}`,
            background: colors.backgroundSoft,
          }}>
            {/* Summary */}
            <div style={{ marginBottom: spacing[4] }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: spacing[2],
              }}>
                <span style={{ fontSize: typography.fontSize.md, color: colors.textSecondary }}>
                  Subtotal
                </span>
                <span style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium }}>
                  ₩{formatKRW(subtotal)}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: spacing[2],
              }}>
                <span style={{ fontSize: typography.fontSize.md, color: colors.textSecondary }}>
                  Shipping
                </span>
                <span style={{
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.medium,
                  color: shippingFee === 0 ? colors.success : colors.text,
                }}>
                  {shippingFee === 0 ? 'FREE' : `₩${formatKRW(shippingFee)}`}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: spacing[3],
                borderTop: `1px solid ${colors.border}`,
              }}>
                <span style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
                  Total
                </span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 18,
                    fontWeight: typography.fontWeight.bold,
                    fontFamily: typography.fontFamily.mono,
                    color: colors.primary,
                  }}>
                    ₩{formatKRW(total)}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: typography.fontSize.xs,
                    color: colors.textMuted,
                  }}>
                    ≈${toUSD(total)}
                  </span>
                </div>
              </div>
            </div>

            {hasRocketItems && (
              <p style={{
                fontSize: typography.fontSize.xs,
                color: colors.primary,
                margin: `0 0 ${spacing[3]}px`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing[1],
              }}>
                🚀 Rocket items - Delivery by 7AM tomorrow!
              </p>
            )}

            <Button
              fullWidth
              onClick={() => {
                closeCart();
                onCheckout();
              }}
            >
              Proceed to checkout
            </Button>

            <button
              onClick={closeCart}
              style={{
                display: 'block',
                width: '100%',
                marginTop: spacing[3],
                background: 'none',
                border: 'none',
                fontSize: typography.fontSize.sm,
                color: colors.textSecondary,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
