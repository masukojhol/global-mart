import { useCart } from '../../contexts/CartContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { theme } from '../../styles/theme';
import { formatKRW, toUSD } from '../../utils/helpers';
import { Button } from '../common/Button';

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
          background: theme.colors.brandWhite,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${theme.colors.borderLight}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 400,
            fontFamily: theme.fonts.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            Shopping Cart
            <span style={{
              background: theme.colors.brandPrimary,
              color: theme.colors.brandWhite,
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 10,
            }}>
              {itemCount}
            </span>
          </h2>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              color: theme.colors.textSecondary,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 && (
          <div style={{
            padding: '12px 24px',
            background: theme.colors.surfaceLight,
            borderBottom: `1px solid ${theme.colors.borderLight}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: 12,
              color: theme.colors.textSecondary,
              marginBottom: 6,
            }}>
              Add <strong>₩{formatKRW(amountToFreeShipping)}</strong> more for FREE delivery!
            </p>
            <div style={{
              height: 4,
              background: theme.colors.borderLight,
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${Math.min((subtotal / 30000) * 100, 100)}%`,
                height: '100%',
                background: theme.colors.brandBlue,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        )}

        {amountToFreeShipping <= 0 && (
          <div style={{
            padding: '12px 24px',
            background: '#E8F5E9',
            borderBottom: `1px solid ${theme.colors.borderLight}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: 12,
              color: theme.colors.uiSuccess,
              fontWeight: 500,
            }}>
              🎉 You qualify for FREE delivery!
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px',
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 500,
                color: theme.colors.textPrimary,
                margin: '0 0 8px',
                fontFamily: theme.fonts.primary,
              }}>
                Your cart is empty
              </h3>
              <p style={{
                fontSize: 13,
                color: theme.colors.textSecondary,
                margin: 0,
              }}>
                Add items to get started
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: 14,
                    paddingBottom: 16,
                    borderBottom: `1px solid ${theme.colors.borderLight}`,
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: 80,
                    height: 80,
                    flexShrink: 0,
                    background: theme.colors.surfaceLight,
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
                      fontSize: 9,
                      color: theme.colors.textMuted,
                      margin: '0 0 2px',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}>
                      {item.flag} {item.category}
                    </p>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 400,
                      margin: '0 0 6px',
                      color: theme.colors.textPrimary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 600,
                      margin: '0 0 8px',
                      fontFamily: theme.fonts.mono,
                    }}>
                      ₩{formatKRW(item.price)}
                      <span style={{
                        fontSize: 11,
                        color: theme.colors.textMuted,
                        fontWeight: 400,
                        marginLeft: 6,
                      }}>
                        ≈${toUSD(item.price)}
                      </span>
                    </p>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${theme.colors.borderMedium}`,
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
                            color: theme.colors.textSecondary,
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          width: 32,
                          textAlign: 'center',
                          fontSize: 13,
                          fontWeight: 500,
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
                            color: theme.colors.textSecondary,
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
                          fontSize: 11,
                          color: theme.colors.textMuted,
                          textDecoration: 'underline',
                          padding: 0,
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    {item.rocket && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: theme.colors.brandBlue,
                        color: '#fff',
                        padding: '2px 6px',
                        fontSize: 9,
                        fontWeight: 600,
                        marginTop: 8,
                      }}>
                        🚀 Rocket
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
            padding: '20px 24px',
            borderTop: `1px solid ${theme.colors.borderLight}`,
            background: theme.colors.surfaceCream,
          }}>
            {/* Summary */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 13, color: theme.colors.textSecondary }}>
                  Subtotal
                </span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  ₩{formatKRW(subtotal)}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 13, color: theme.colors.textSecondary }}>
                  Shipping
                </span>
                <span style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: shippingFee === 0 ? theme.colors.uiSuccess : 'inherit',
                }}>
                  {shippingFee === 0 ? 'FREE' : `₩${formatKRW(shippingFee)}`}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 12,
                borderTop: `1px solid ${theme.colors.borderLight}`,
              }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  Total
                </span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: theme.fonts.mono,
                  }}>
                    ₩{formatKRW(total)}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: 11,
                    color: theme.colors.textMuted,
                  }}>
                    ≈${toUSD(total)}
                  </span>
                </div>
              </div>
            </div>

            {hasRocketItems && (
              <p style={{
                fontSize: 11,
                color: theme.colors.brandBlue,
                margin: '0 0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
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
              Proceed to Checkout
            </Button>

            <button
              onClick={closeCart}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 12,
                background: 'none',
                border: 'none',
                fontSize: 12,
                color: theme.colors.textSecondary,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
