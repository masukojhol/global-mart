import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useOrders, ORDER_STATUS, STATUS_LABELS } from '../../contexts/OrderContext';
import { theme } from '../../styles/theme';
import { formatKRW, formatDateTime } from '../../utils/helpers';

export function OrderTrackingModal({ isOpen, onClose, initialOrderId = null }) {
  const { getOrderById, getOrderByTracking } = useOrders();
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
      setError('Order not found. Please check your order ID or tracking number.');
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
      { status: ORDER_STATUS.CONFIRMED, icon: '✓', label: 'Order Confirmed' },
      { status: ORDER_STATUS.PROCESSING, icon: '📦', label: 'Processing' },
      { status: ORDER_STATUS.SHIPPED, icon: '🚚', label: 'Shipped' },
      { status: ORDER_STATUS.OUT_FOR_DELIVERY, icon: '🏃', label: 'Out for Delivery' },
      { status: ORDER_STATUS.DELIVERED, icon: '🎉', label: 'Delivered' },
    ];

    return (
      <div>
        {/* Order Header */}
        <div style={{
          background: isCancelled ? '#FFEBEE' : theme.colors.surfaceLight,
          padding: 16,
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <p style={{
                fontSize: 11,
                color: theme.colors.textMuted,
                margin: '0 0 4px',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Order ID
              </p>
              <p style={{
                fontSize: 16,
                fontWeight: 600,
                margin: 0,
                fontFamily: theme.fonts.mono,
              }}>
                {order.id}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: 11,
                color: theme.colors.textMuted,
                margin: '0 0 4px',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                Status
              </p>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 600,
                background: isCancelled
                  ? theme.colors.uiError
                  : order.status === ORDER_STATUS.DELIVERED
                  ? theme.colors.uiSuccess
                  : theme.colors.brandBlue,
                color: '#fff',
              }}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>

          {order.isRocket && !isCancelled && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 8,
            }}>
              <span style={{
                background: theme.colors.brandBlue,
                color: '#fff',
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 600,
              }}>
                🚀 ROCKET
              </span>
              <span style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                Expected by: <strong>{order.estimatedDelivery}</strong>
              </span>
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <p style={{
              fontSize: 11,
              color: theme.colors.textMuted,
              margin: '0 0 2px',
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
        </div>

        {/* Tracking Timeline */}
        {!isCancelled && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={{
              fontSize: 12,
              fontWeight: 600,
              color: theme.colors.textSecondary,
              margin: '0 0 16px',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              Tracking Progress
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
                      paddingBottom: index < trackingSteps.length - 1 ? 24 : 0,
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
                        background: isCompleted ? theme.colors.uiSuccess : theme.colors.borderLight,
                      }} />
                    )}

                    {/* Icon */}
                    <div style={{
                      position: 'absolute',
                      left: -30,
                      top: 0,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: isCompleted ? theme.colors.uiSuccess : theme.colors.borderLight,
                      color: isCompleted ? '#fff' : theme.colors.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      border: isCurrent ? `2px solid ${theme.colors.brandBlue}` : 'none',
                    }}>
                      {isCompleted ? '✓' : step.icon}
                    </div>

                    {/* Content */}
                    <div>
                      <p style={{
                        fontSize: 14,
                        fontWeight: isCompleted ? 600 : 400,
                        color: isCompleted ? theme.colors.textPrimary : theme.colors.textMuted,
                        margin: '0 0 4px',
                      }}>
                        {step.label}
                      </p>
                      {historyEntry && (
                        <>
                          <p style={{
                            fontSize: 11,
                            color: theme.colors.textMuted,
                            margin: '0 0 2px',
                          }}>
                            {formatDateTime(historyEntry.timestamp)}
                          </p>
                          <p style={{
                            fontSize: 12,
                            color: theme.colors.textSecondary,
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
        <div style={{ marginBottom: 24 }}>
          <h4 style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            margin: '0 0 12px',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Order Items ({order.items.length})
          </h4>

          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: 12,
                padding: '12px 0',
                borderBottom: `1px solid ${theme.colors.borderLight}`,
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ width: 60, height: 60, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, margin: 0, fontWeight: 500 }}>
                  {item.flag} {item.name}
                </p>
                <p style={{ fontSize: 11, color: theme.colors.textMuted, margin: '4px 0 0' }}>
                  Qty: {item.quantity} × ₩{formatKRW(item.price)}
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                ₩{formatKRW(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            margin: '0 0 8px',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Shipping Address
          </h4>
          <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            {order.shippingAddress.name}<br />
            {order.shippingAddress.phone}<br />
            {order.shippingAddress.address} {order.shippingAddress.addressDetail}<br />
            {order.shippingAddress.city} {order.shippingAddress.postalCode}
          </p>
        </div>

        {/* Order Total */}
        <div style={{
          background: theme.colors.surfaceLight,
          padding: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13 }}>Subtotal</span>
            <span style={{ fontSize: 13 }}>₩{formatKRW(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13 }}>Shipping</span>
            <span style={{ fontSize: 13, color: order.shippingFee === 0 ? theme.colors.uiSuccess : 'inherit' }}>
              {order.shippingFee === 0 ? 'FREE' : `₩${formatKRW(order.shippingFee)}`}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: `1px solid ${theme.colors.borderMedium}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Total Paid</span>
            <span style={{ fontSize: 17, fontWeight: 700, fontFamily: theme.fonts.mono }}>
              ₩{formatKRW(order.total)}
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            setOrder(null);
            setSearchValue('');
          }}
          style={{ marginTop: 20 }}
        >
          Track Another Order
        </Button>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Track Your Order"
      size="md"
    >
      {!order ? (
        <div>
          <p style={{
            fontSize: 14,
            color: theme.colors.textSecondary,
            marginTop: 0,
            marginBottom: 20,
          }}>
            Enter your order ID or tracking number to check your order status.
          </p>

          {error && (
            <div style={{
              background: '#FEE',
              border: `1px solid ${theme.colors.uiError}`,
              padding: '12px 14px',
              marginBottom: 20,
              fontSize: 13,
              color: theme.colors.uiError,
            }}>
              {error}
            </div>
          )}

          <Input
            label="Order ID or Tracking Number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="e.g., GM-XXXXX or TRKXXXXXXXXXX"
          />

          <Button fullWidth onClick={handleSearch}>
            Track Order
          </Button>

          <div style={{
            marginTop: 24,
            padding: 16,
            background: theme.colors.surfaceLight,
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Where to find your order ID?</p>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              <li>Check your order confirmation email</li>
              <li>Go to "My Orders" in your account</li>
              <li>It starts with "GM-" (e.g., GM-ABC123)</li>
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
