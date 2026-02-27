/**
 * ORDER SUCCESS MODAL COMPONENT
 * =============================
 * Order confirmation using GoFresh design tokens.
 */

import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';
import { formatKRW } from '../../utils/helpers';

const { colors, typography, borderRadius, spacing } = tokens;

export function OrderSuccessModal({ isOpen, onClose, order, onTrackOrder }) {
  const { t } = useLanguage();

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('orderSuccess.title')}
      size="sm"
      showClose={false}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 80,
          height: 80,
          background: colors.successLight,
          borderRadius: borderRadius.circle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `0 auto ${spacing[5]}px`,
          fontSize: 40,
        }}>
          🎉
        </div>

        <h3 style={{
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.regular,
          margin: `0 0 ${spacing[2]}px`,
          fontFamily: typography.fontFamily.heading,
          color: colors.text,
        }}>
          {t('orderSuccess.thankYou')}
        </h3>

        <p style={{
          fontSize: typography.fontSize.base,
          color: colors.textSecondary,
          margin: `0 0 ${spacing[6]}px`,
        }}>
          {t('orderSuccess.confirmationMessage')}
        </p>

        {/* Order Info */}
        <div style={{
          background: colors.backgroundSoft,
          padding: spacing[5],
          marginBottom: spacing[5],
          textAlign: 'left',
          borderRadius: borderRadius.default,
        }}>
          <div style={{ marginBottom: spacing[4] }}>
            <p style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
              margin: `0 0 ${spacing[1]}px`,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.wide,
            }}>
              {t('orderSuccess.orderNumber')}
            </p>
            <p style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              margin: 0,
              fontFamily: typography.fontFamily.mono,
              color: colors.text,
            }}>
              {order.id}
            </p>
          </div>

          <div style={{ marginBottom: spacing[4] }}>
            <p style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
              margin: `0 0 ${spacing[1]}px`,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.wide,
            }}>
              {t('orderSuccess.trackingNumber')}
            </p>
            <p style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              margin: 0,
              fontFamily: typography.fontFamily.mono,
              color: colors.text,
            }}>
              {order.trackingNumber}
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: spacing[4],
            borderTop: `1px solid ${colors.border}`,
          }}>
            <span style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>{t('common.total')}</span>
            <span style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.bold,
              fontFamily: typography.fontFamily.mono,
              color: colors.primary,
            }}>
              ₩{formatKRW(order.total)}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        {order.isRocket && (
          <div style={{
            background: `${colors.primary}15`,
            padding: `${spacing[4]}px ${spacing[4]}px`,
            marginBottom: spacing[5],
            display: 'flex',
            alignItems: 'center',
            gap: spacing[3],
            justifyContent: 'center',
            borderRadius: borderRadius.default,
          }}>
            <span style={{ fontSize: 20 }}>🚀</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                color: colors.primary,
                margin: 0,
              }}>
                {t('orderSuccess.rocketDelivery')}
              </p>
              <p style={{
                fontSize: typography.fontSize.xs,
                color: colors.textSecondary,
                margin: '2px 0 0',
              }}>
                {t('orderSuccess.expectedBy')} {order.estimatedDelivery}
              </p>
            </div>
          </div>
        )}

        <Button fullWidth onClick={() => {
          onClose();
          onTrackOrder(order.id);
        }}>
          {t('orderSuccess.trackOrder')}
        </Button>

        <button
          onClick={onClose}
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
          {t('orderSuccess.continueShopping')}
        </button>
      </div>
    </Modal>
  );
}

export default OrderSuccessModal;
