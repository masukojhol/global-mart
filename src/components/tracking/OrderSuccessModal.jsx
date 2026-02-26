import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { theme } from '../../styles/theme';
import { formatKRW } from '../../utils/helpers';

export function OrderSuccessModal({ isOpen, onClose, order, onTrackOrder }) {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Placed!"
      size="sm"
      showClose={false}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 80,
          height: 80,
          background: '#E8F5E9',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 40,
        }}>
          🎉
        </div>

        <h3 style={{
          fontSize: 22,
          fontWeight: 400,
          margin: '0 0 8px',
          fontFamily: theme.fonts.primary,
          color: theme.colors.textPrimary,
        }}>
          Thank You for Your Order!
        </h3>

        <p style={{
          fontSize: 14,
          color: theme.colors.textSecondary,
          margin: '0 0 24px',
        }}>
          Your order has been confirmed and is being prepared.
        </p>

        {/* Order Info */}
        <div style={{
          background: theme.colors.surfaceLight,
          padding: 20,
          marginBottom: 20,
          textAlign: 'left',
        }}>
          <div style={{ marginBottom: 16 }}>
            <p style={{
              fontSize: 11,
              color: theme.colors.textMuted,
              margin: '0 0 4px',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              Order Number
            </p>
            <p style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              fontFamily: theme.fonts.mono,
            }}>
              {order.id}
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{
              fontSize: 11,
              color: theme.colors.textMuted,
              margin: '0 0 4px',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              Tracking Number
            </p>
            <p style={{
              fontSize: 14,
              fontWeight: 500,
              margin: 0,
              fontFamily: theme.fonts.mono,
            }}>
              {order.trackingNumber}
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 16,
            borderTop: `1px solid ${theme.colors.borderLight}`,
          }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Total</span>
            <span style={{
              fontSize: 16,
              fontWeight: 700,
              fontFamily: theme.fonts.mono,
            }}>
              ₩{formatKRW(order.total)}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        {order.isRocket && (
          <div style={{
            background: '#E3F2FD',
            padding: '14px 16px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 20 }}>🚀</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.colors.brandBlue,
                margin: 0,
              }}>
                Rocket Delivery
              </p>
              <p style={{
                fontSize: 11,
                color: theme.colors.textSecondary,
                margin: '2px 0 0',
              }}>
                Expected by {order.estimatedDelivery}
              </p>
            </div>
          </div>
        )}

        <Button fullWidth onClick={() => {
          onClose();
          onTrackOrder(order.id);
        }}>
          Track Order
        </Button>

        <button
          onClick={onClose}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 12,
            background: 'none',
            border: 'none',
            fontSize: 13,
            color: theme.colors.textSecondary,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Continue Shopping
        </button>
      </div>
    </Modal>
  );
}

export default OrderSuccessModal;
