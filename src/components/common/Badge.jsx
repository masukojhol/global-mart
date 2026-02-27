/**
 * BADGE COMPONENT
 * ===============
 * Generic badge component for labels, tags, and status indicators.
 * All styling comes from design tokens.
 *
 * Usage:
 * <Badge>Default</Badge>
 * <Badge variant="sale">-20%</Badge>
 * <Badge variant="new">New</Badge>
 * <Badge variant="organic">Organic</Badge>
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, components } = tokens;

// =============================================================================
// BADGE VARIANTS - Product/E-commerce specific
// =============================================================================

const variants = {
  // Primary brand badge
  primary: {
    background: colors.primary,
    color: colors.white,
  },
  // Sale/Discount badge
  sale: {
    background: colors.sale,
    color: colors.white,
  },
  // New product badge
  new: {
    background: colors.accent,
    color: colors.white,
  },
  // Organic/Fresh badge
  organic: {
    background: colors.primary,
    color: colors.white,
  },
  // Bestseller badge
  bestseller: {
    background: colors.loyalty,
    color: colors.white,
  },
  // Info badge (subtle)
  info: {
    background: colors.backgroundSoft,
    color: colors.primary,
  },
  // Outline badge
  outline: {
    background: 'transparent',
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
  },
  // Success badge
  success: {
    background: colors.success,
    color: colors.white,
  },
  // Warning badge
  warning: {
    background: colors.warning,
    color: colors.white,
  },
  // Error badge
  error: {
    background: colors.error,
    color: colors.white,
  },
  // Loyalty/Gold badge
  loyalty: {
    background: colors.loyalty,
    color: colors.white,
  },
  // Subtle/Muted badge
  subtle: {
    background: colors.backgroundSoft,
    color: colors.textSecondary,
  },
};

// =============================================================================
// BADGE SIZES
// =============================================================================

const sizes = {
  sm: {
    padding: '2px 6px',
    fontSize: 9,
  },
  md: {
    padding: `${components.badge.padding.y}px ${components.badge.padding.x}px`,
    fontSize: components.badge.fontSize,
  },
  lg: {
    padding: '6px 12px',
    fontSize: 13,
  },
};

// =============================================================================
// BADGE COMPONENT
// =============================================================================

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  icon,
  style,
  className,
  ...props
}) {
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  const badgeStyle = {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,

    // Size
    padding: sizeStyles.padding,

    // Typography
    fontFamily: typography.fontFamily.body,
    fontSize: sizeStyles.fontSize,
    fontWeight: components.badge.fontWeight,
    letterSpacing: components.badge.letterSpacing,
    lineHeight: 1.2,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',

    // Colors
    background: variantStyles.background,
    color: variantStyles.color,
    border: variantStyles.border || 'none',

    // Shape
    borderRadius: pill ? borderRadius.pill : borderRadius.default,

    // Custom styles
    ...style,
  };

  return (
    <span style={badgeStyle} className={className} {...props}>
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      {children}
    </span>
  );
}

// =============================================================================
// DISCOUNT BADGE (Specialized for showing percentage off)
// =============================================================================

export function DiscountBadge({ percent, style, ...props }) {
  return (
    <Badge variant="sale" style={style} {...props}>
      -{percent}%
    </Badge>
  );
}

// =============================================================================
// STATUS BADGE (For order status, etc.)
// =============================================================================

const statusVariants = {
  pending: 'warning',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
};

export function StatusBadge({ status, style, ...props }) {
  const variant = statusVariants[status?.toLowerCase()] || 'subtle';
  return (
    <Badge variant={variant} style={style} {...props}>
      {status}
    </Badge>
  );
}

// =============================================================================
// COUNT BADGE (For cart count, notifications, etc.)
// =============================================================================

export function CountBadge({
  count,
  max = 99,
  color = colors.accent,
  style,
  ...props
}) {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 18,
        height: 18,
        padding: '0 5px',
        background: color,
        color: colors.white,
        fontSize: 10,
        fontWeight: typography.fontWeight.semibold,
        fontFamily: typography.fontFamily.body,
        borderRadius: borderRadius.circle,
        ...style,
      }}
      {...props}
    >
      {displayCount}
    </span>
  );
}

// =============================================================================
// DOT INDICATOR
// =============================================================================

export function Dot({
  color = colors.success,
  size = 8,
  pulse = false,
  style,
  ...props
}) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: color,
        borderRadius: borderRadius.circle,
        animation: pulse ? 'pulse 2s ease-in-out infinite' : 'none',
        ...style,
      }}
      {...props}
    />
  );
}

export default Badge;
