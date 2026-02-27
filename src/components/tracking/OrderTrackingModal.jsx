/**
 * ORDER TRACKING MODAL COMPONENT
 * ==============================
 * Order tracking using GoFresh design tokens.
 */

import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useOrders, ORDER_STATUS, STATUS_LABELS } from '../../contexts/OrderContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, formatDateTime } from '../../utils/helpers';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

export function OrderTrackingModal({ isOpen, onClose, initialOrderId = null }) {
  const { getOrderById, getOrderByTracking } = useOrders();
  const { t } = useLanguage();
  const [searchValue, setSearchValue] = useState(initialOrderId || '');
  const [order, setOrder] = useState(initialOrderId ? getOrderById(initialOrderId) : null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    let found = getOrderById(searchValue);
    if (!found) {
      found = getOrderByTracking(searchValue);
    }

    if (found) {
      setOrder(found);
    } else {
      setError(t('tracking.notFound'));
      setOrder(null);
    }
  };

  const getStatusIndex = (status) => {
    const statuses = [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.PROCESSING,
      ORDER_STATUS.SHIPPED,
      ORDER_STATUS.OUT_FOR_DELIVERY,
      ORDER_STATUS.DELIVERED,
    ];
    return statuses.indexOf(status);
  };

  const renderOrderDetails = () => {
    if (!order) return null;

    const currentIndex = getStatusIndex(order.status);
    const isCancelled = order.status === ORDER_STATUS.CANCELLED;

    const trackingSteps = [
      { status: ORDER_STATUS.CONFIRMED, icon: '✓', label: t('tracking.orderConfirmed') },
      { status: ORDER_STATUS.PROCESSING, icon: '📦', label: t('tracking.orderProcessing') },
      { status: ORDER_STATUS.SHIPPED, icon: '🚚', label: t('tracking.orderShipped') },
      { status: ORDER_STATUS.OUT_FOR_DELIVERY, icon: '🏃', label: t('tracking.orderOutForDelivery') },
      { status: ORDER_STATUS.DELIVERED, icon: '🎉', label: t('tracking.orderDelivered') },
    ];

    return (
      <div>
        {/* Order Header */}
        <div style={{
          background: isCancelled ? colors.errorLight : colors.backgroundSoft,
          padding: spacing[4],
          marginBottom: spacing[6],
          borderRadius: borderRadius.default,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
            <div>
              <p style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                margin: `0 0 ${spacing[1]}px`,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
              }}>
                {t('tracking.orderId')}
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
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                margin: `0 0 ${spacing[1]}px`,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
              }}>
                {t('tracking.status')}
              </p>
              <span style={{
                display: 'inline-block',
                padding: `${spacing[1]}px ${spacing[3]}px`,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                background: isCancelled
                  ? colors.error
                  : order.status === ORDER_STATUS.DELIVERED
                  ? colors.success
                  : colors.primary,
                color: colors.white,
                borderRadius: borderRadius.default,
              }}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>

          {order.isRocket && !isCancelled && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              marginTop: spacing[2],
            }}>
              <span style={{
                background: colors.primary,
                color: colors.white,
                padding: `2px ${spacing[2]}px`,
                fontSize: 10,
                fontWeight: typography.fontWeight.semibold,
                borderRadius: borderRadius.default,
              }}>
                🚀 ROCKET
              </span>
              <span style={{ fontSize: typography.fontSize.xs, color: colors.textSecondary }}>
                Expected by: <strong>{order.estimatedDelivery}</strong>
              </span>
            </div>
          )}

          <div style={{ marginTop: spacing[3] }}>
            <p style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
              margin: '0 0 2px',
            }}>
              {t('tracking.trackingNumber')}
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
        </div>

        {/* Tracking Timeline */}
        {!isCancelled && (
          <div style={{ marginBottom: spacing[6] }}>
            <h4 style={{
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.semibold,
              color: colors.textSecondary,
              margin: `0 0 ${spacing[4]}px`,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.wide,
            }}>
              {t('tracking.trackingProgress')}
            </h4>

            <div style={{ position: 'relative', paddingLeft: 30 }}>
              {trackingSteps.map((step, index) => {
                const stepIndex = getStatusIndex(step.status);
                const isCompleted = currentIndex >= stepIndex;
                const isCurrent = currentIndex === stepIndex;
                const historyEntry = order.statusHistory.find(h => h.status === step.status);

                return (
                  <div
                    key={step.status}
                    style={{
                      position: 'relative',
                      paddingBottom: index < trackingSteps.length - 1 ? spacing[6] : 0,
                    }}
                  >
                    {/* Vertical Line */}
                    {index < trackingSteps.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: -22,
                        top: 28,
                        bottom: 0,
                        width: 2,
                        background: isCompleted ? colors.success : colors.border,
                      }} />
                    )}

                    {/* Icon */}
                    <div style={{
                      position: 'absolute',
                      left: -30,
                      top: 0,
                      width: 24,
                      height: 24,
                      borderRadius: borderRadius.circle,
                      background: isCompleted ? colors.success : colors.border,
                      color: isCompleted ? colors.white : colors.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      border: isCurrent ? `2px solid ${colors.primary}` : 'none',
                    }}>
                      {isCompleted ? '✓' : step.icon}
                    </div>

                    {/* Content */}
                    <div>
                      <p style={{
                        fontSize: typography.fontSize.base,
                        fontWeight: isCompleted ? typography.fontWeight.semibold : typography.fontWeight.regular,
                        color: isCompleted ? colors.text : colors.textMuted,
                        margin: `0 0 ${spacing[1]}px`,
                      }}>
                        {step.label}
                      </p>
                      {historyEntry && (
                        <>
                          <p style={{
                            fontSize: typography.fontSize.xs,
                            color: colors.textMuted,
                            margin: '0 0 2px',
                          }}>
                            {formatDateTime(historyEntry.timestamp)}
                          </p>
                          <p style={{
                            fontSize: typography.fontSize.xs,
                            color: colors.textSecondary,
                            margin: 0,
                          }}>
                            {historyEntry.message}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div style={{ marginBottom: spacing[6] }}>
          <h4 style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.textSecondary,
            margin: `0 0 ${spacing[3]}px`,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wide,
          }}>
            {t('tracking.orderItems')} ({order.items.length})
          </h4>

          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: spacing[3],
                padding: `${spacing[3]}px 0`,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: borderRadius.default }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: typography.fontSize.xs, margin: 0, fontWeight: typography.fontWeight.medium, color: colors.text }}>
                  {item.flag} {item.name}
                </p>
                <p style={{ fontSize: typography.fontSize.xs, color: colors.textMuted, margin: `${spacing[1]}px 0 0` }}>
                  Qty: {item.quantity} × ₩{formatKRW(item.price)}
                </p>
              </div>
              <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, fontFamily: typography.fontFamily.mono }}>
                ₩{formatKRW(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: spacing[6] }}>
          <h4 style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.textSecondary,
            margin: `0 0 ${spacing[2]}px`,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wide,
          }}>
            {t('tracking.shippingAddress')}
          </h4>
          <p style={{ fontSize: typography.fontSize.sm, margin: 0, lineHeight: typography.lineHeight.relaxed, color: colors.text }}>
            {order.shippingAddress.name}<br />
            {order.shippingAddress.phone}<br />
            {order.shippingAddress.address} {order.shippingAddress.addressDetail}<br />
            {order.shippingAddress.city} {order.shippingAddress.postalCode}
          </p>
        </div>

        {/* Order Total */}
        <div style={{
          background: colors.backgroundSoft,
          padding: spacing[4],
          borderRadius: borderRadius.default,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
            <span style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>{t('common.subtotal')}</span>
            <span style={{ fontSize: typography.fontSize.sm, fontFamily: typography.fontFamily.mono }}>₩{formatKRW(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
            <span style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>{t('common.shipping')}</span>
            <span style={{ fontSize: typography.fontSize.sm, color: order.shippingFee === 0 ? colors.success : colors.text, fontFamily: typography.fontFamily.mono }}>
              {order.shippingFee === 0 ? t('common.free') : `₩${formatKRW(order.shippingFee)}`}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: spacing[3],
            borderTop: `1px solid ${colors.border}`,
          }}>
            <span style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>{t('checkout.totalPaid')}</span>
            <span style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, fontFamily: typography.fontFamily.mono, color: colors.primary }}>
              ₩{formatKRW(order.total)}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            setOrder(null);
            setSearchValue('');
          }}
          style={{ marginTop: spacing[5] }}
        >
          {t('tracking.trackAnother')}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('tracking.title')}
      size="md"
    >
      {!order ? (
        <div>
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.textSecondary,
            marginTop: 0,
            marginBottom: spacing[5],
          }}>
            {t('tracking.description')}
          </p>

          {error && (
            <div style={{
              background: colors.errorLight,
              border: `1px solid ${colors.error}`,
              padding: `${spacing[3]}px ${spacing[4]}px`,
              marginBottom: spacing[5],
              fontSize: typography.fontSize.sm,
              color: colors.error,
              borderRadius: borderRadius.default,
            }}>
              {error}
            </div>
          )}

          <Input
            label={t('tracking.orderIdOrTracking')}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('tracking.placeholder')}
          />

          <Button fullWidth onClick={handleSearch}>
            {t('tracking.trackOrder')}
          </Button>

          <div style={{
            marginTop: spacing[6],
            padding: spacing[4],
            background: colors.backgroundSoft,
            fontSize: typography.fontSize.xs,
            color: colors.textSecondary,
            borderRadius: borderRadius.default,
          }}>
            <p style={{ margin: `0 0 ${spacing[2]}px`, fontWeight: typography.fontWeight.semibold }}>{t('tracking.whereToFind')}</p>
            <ul style={{ margin: 0, paddingLeft: spacing[4] }}>
              <li>{t('tracking.findTip1')}</li>
              <li>{t('tracking.findTip2')}</li>
              <li>{t('tracking.findTip3')}</li>
            </ul>
          </div>
        </div>
      ) : (
        renderOrderDetails()
      )}
    </Modal>
  );
}

export default OrderTrackingModal;
