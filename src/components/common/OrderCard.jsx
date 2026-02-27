/**
 * ORDER CARD COMPONENT
 * ====================
 * Coupang-style order card with product items and action buttons.
 *
 * Usage:
 * <OrderCard
 *   order={order}
 *   onTrack={() => handleTrack(order.id)}
 *   onReorder={() => handleReorder(order)}
 * />
 */

import { useState } from 'react';
import { tokens } from '../../styles/tokens';
import { Badge } from './Badge';
import { Button } from './Button';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// =============================================================================
// ORDER GROUP HEADER (Date header like "Ordered on February 24, 2026")
// =============================================================================

export function OrderGroupHeader({ date, onViewDetails, t }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${spacing[4]}px 0`,
      borderBottom: `1px solid ${colors.border}`,
    }}>
      <h3 style={{
        margin: 0,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text,
      }}>
        {t?.('orders.orderedOn') || 'Ordered on'} {formattedDate}
      </h3>
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          style={{
            background: 'none',
            border: 'none',
            color: colors.primary,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1],
          }}
        >
          {t?.('orders.viewDetails') || 'View Order Details'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}

// =============================================================================
// ORDER STATUS HEADER
// =============================================================================

export function OrderStatusHeader({ status, expectedDate, t }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'delivered':
        return { label: t?.('orders.deliveryCompleted') || 'Delivery completed', color: colors.success };
      case 'shipped':
        return { label: t?.('orders.shipped') || 'Shipped', color: colors.primary };
      case 'processing':
        return { label: t?.('orders.processing') || 'Processing', color: colors.accent };
      case 'confirmed':
        return { label: t?.('orders.confirmed') || 'Order confirmed', color: colors.info };
      case 'cancelled':
        return { label: t?.('orders.cancelled') || 'Cancelled', color: colors.error };
      default:
        return { label: t?.('orders.pending') || 'Pending', color: colors.textSecondary };
    }
  };

  const config = getStatusConfig();
  const formattedDate = expectedDate ? new Date(expectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }) : null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      padding: `${spacing[3]}px ${spacing[4]}px`,
      background: colors.backgroundSoft,
      borderBottom: `1px solid ${colors.border}`,
    }}>
      <span style={{
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        color: config.color,
      }}>
        {config.label}
      </span>
      {formattedDate && (
        <>
          <span style={{ color: colors.textMuted }}>•</span>
          <span style={{
            fontSize: typography.fontSize.sm,
            color: colors.success,
          }}>
            {t?.('orders.arrivesOn') || 'Arrives on'} {formattedDate}
          </span>
        </>
      )}
      {/* More options button */}
      <button style={{
        marginLeft: 'auto',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: spacing[1],
        color: colors.textMuted,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
    </div>
  );
}

// =============================================================================
// ORDER ITEM ROW
// =============================================================================

export function OrderItemRow({
  item,
  onAddToCart,
  isRocket = false,
  t,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing[4],
        padding: `${spacing[4]}px`,
        background: isHovered ? colors.backgroundSoft : 'transparent',
        transition: transitions.hover,
        borderBottom: `1px solid ${colors.border}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <img
        src={item.img}
        alt={item.name}
        style={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: borderRadius.default,
          border: `1px solid ${colors.border}`,
          flexShrink: 0,
        }}
      />

      {/* Product Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2], marginBottom: spacing[1] }}>
          {isRocket && (
            <Badge variant="primary" size="sm" style={{ flexShrink: 0 }}>
              🚀 {t?.('product.rocketDelivery') || 'Rocket'}
            </Badge>
          )}
        </div>
        <p style={{
          margin: 0,
          fontSize: typography.fontSize.sm,
          color: colors.text,
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {item.name}
        </p>
        <p style={{
          margin: `${spacing[2]}px 0 0`,
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
        }}>
          <span style={{ fontWeight: typography.fontWeight.semibold, color: colors.text }}>
            ₩{item.price?.toLocaleString()}
          </span>
          <span style={{ margin: `0 ${spacing[2]}px`, color: colors.border }}>·</span>
          {item.quantity} {t?.('common.pieces') || 'piece'}
        </p>
      </div>

      {/* Add to Cart Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddToCart?.(item)}
        style={{ flexShrink: 0 }}
      >
        {t?.('orders.addToCart') || 'Put in a shopping cart'}
      </Button>
    </div>
  );
}

// =============================================================================
// ORDER ACTION BUTTONS
// =============================================================================

export function OrderActions({ onTrack, onExchange, onReview, t }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
      padding: spacing[3],
      borderLeft: `1px solid ${colors.border}`,
      minWidth: 160,
    }}>
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={onTrack}
      >
        {t?.('orders.deliveryTracking') || 'delivery tracking'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={onExchange}
      >
        {t?.('orders.exchangeReturn') || 'Exchange/Return Request'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={onReview}
      >
        {t?.('orders.writeReview') || 'Write a review'}
      </Button>
    </div>
  );
}

// =============================================================================
// COMPLETE ORDER CARD (Combines all above)
// =============================================================================

export function OrderCard({
  order,
  onTrack,
  onAddToCart,
  onExchange,
  onReview,
  onViewDetails,
  showActions = true,
  t,
}) {
  return (
    <div style={{
      background: colors.background,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.default,
      overflow: 'hidden',
      marginBottom: spacing[4],
    }}>
      {/* Status Header */}
      <OrderStatusHeader
        status={order.status}
        expectedDate={order.expectedDelivery}
        t={t}
      />

      {/* Content: Items + Actions */}
      <div style={{ display: 'flex' }}>
        {/* Items List */}
        <div style={{ flex: 1 }}>
          {order.items?.map((item, index) => (
            <OrderItemRow
              key={item.id || index}
              item={item}
              onAddToCart={onAddToCart}
              isRocket={order.isRocket || item.isRocket}
              t={t}
            />
          ))}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <OrderActions
            onTrack={() => onTrack?.(order.id)}
            onExchange={() => onExchange?.(order)}
            onReview={() => onReview?.(order)}
            t={t}
          />
        )}
      </div>
    </div>
  );
}

export default OrderCard;
