/**
 * BUTTON COMPONENT
 * ================
 * Generic button component using design tokens.
 * All styling comes from tokens - change tokens to change all buttons.
 *
 * Usage:
 * <Button>Default Primary</Button>
 * <Button variant="accent">Buy Now</Button>
 * <Button variant="outline">Cancel</Button>
 * <Button size="lg" fullWidth>Checkout</Button>
 */

import { tokens } from '../../styles/tokens';
import { theme } from '../../styles/theme';

const { colors, typography, borderRadius, shadows, transitions, components } = tokens;

// =============================================================================
// BUTTON VARIANTS - Define color schemes here
// =============================================================================

const variants = {
  primary: {
    background: colors.primary,
    color: colors.white,
    border: 'none',
    hoverBackground: colors.primaryLight,
  },
  accent: {
    background: colors.accent,
    color: colors.white,
    border: 'none',
    hoverBackground: colors.accentLight,
  },
  sale: {
    background: colors.sale,
    color: colors.white,
    border: 'none',
    hoverBackground: '#D32F2F',
  },
  outline: {
    background: 'transparent',
    color: colors.primary,
    border: `1.5px solid ${colors.primary}`,
    hoverBackground: colors.backgroundSoft,
  },
  ghost: {
    background: colors.backgroundSoft,
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`,
    hoverBackground: colors.border,
  },
  link: {
    background: 'transparent',
    color: colors.primary,
    border: 'none',
    hoverBackground: 'transparent',
    textDecoration: 'underline',
  },
  danger: {
    background: colors.error,
    color: colors.white,
    border: 'none',
    hoverBackground: '#B71C1C',
  },
  disabled: {
    background: '#E5E7EB',
    color: colors.textMuted,
    border: 'none',
    cursor: 'not-allowed',
  },
};

// =============================================================================
// BUTTON SIZES - Define padding/font sizes here
// =============================================================================

const sizes = {
  sm: {
    padding: `${components.button.padding.sm.y}px ${components.button.padding.sm.x}px`,
    fontSize: components.button.fontSize.sm,
    minHeight: 36,
  },
  md: {
    padding: `${components.button.padding.md.y}px ${components.button.padding.md.x}px`,
    fontSize: components.button.fontSize.md,
    minHeight: 44,
  },
  lg: {
    padding: `${components.button.padding.lg.y}px ${components.button.padding.lg.x}px`,
    fontSize: components.button.fontSize.lg,
    minHeight: 48,
  },
  icon: {
    padding: '10px',
    fontSize: 18,
    minHeight: 44,
    minWidth: 44,
  },
};

// =============================================================================
// BUTTON COMPONENT
// =============================================================================

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  style,
  className,
  ...props
}) {
  const variantStyles = disabled ? variants.disabled : (variants[variant] || variants.primary);
  const sizeStyles = sizes[size] || sizes.md;

  const buttonStyle = {
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    // Size
    width: fullWidth ? '100%' : 'auto',
    minHeight: sizeStyles.minHeight,
    minWidth: size === 'icon' ? sizeStyles.minWidth : 'auto',
    padding: sizeStyles.padding,

    // Typography
    fontFamily: typography.fontFamily.body,
    fontSize: sizeStyles.fontSize,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: 1,
    textDecoration: variantStyles.textDecoration || 'none',
    // IMPORTANT: Sentence-case, not uppercase
    textTransform: 'none',
    letterSpacing: 0,

    // Colors
    background: variantStyles.background,
    color: variantStyles.color,
    border: variantStyles.border,

    // Shape
    borderRadius: borderRadius.default,

    // Interaction
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: transitions.hover,

    // Prevent text selection
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',

    // Custom styles override
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      e.currentTarget.style.background = variantStyles.hoverBackground;
      if (!variantStyles.border || variantStyles.border === 'none') {
        e.currentTarget.style.boxShadow = shadows.sm;
      }
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = variantStyles.background;
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={buttonStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && <span style={{ display: 'flex' }}>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span style={{ display: 'flex' }}>{rightIcon}</span>}
    </button>
  );
}

// =============================================================================
// LOADING SPINNER
// =============================================================================

function LoadingSpinner() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
}

// =============================================================================
// ICON BUTTON
// =============================================================================

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  ariaLabel,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size="icon"
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
}

// =============================================================================
// BUTTON GROUP
// =============================================================================

export function ButtonGroup({ children, spacing = 8, direction = 'row' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: spacing,
      }}
    >
      {children}
    </div>
  );
}

export default Button;
