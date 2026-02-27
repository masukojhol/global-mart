/**
 * CARD COMPONENT
 * ==============
 * Generic card component using design tokens.
 * Provides consistent styling for all card-like containers.
 *
 * Usage:
 * <Card>Content here</Card>
 * <Card variant="elevated" hoverable>Hover me</Card>
 * <Card padding="compact">Compact content</Card>
 */

import { useState } from 'react';
import { tokens } from '../../styles/tokens';

const { colors, borderRadius, shadows, transitions, spacing } = tokens;

// =============================================================================
// CARD VARIANTS
// =============================================================================

const variants = {
  default: {
    background: colors.backgroundCard,
    border: `1px solid ${colors.border}`,
    shadow: 'none',
  },
  elevated: {
    background: colors.backgroundCard,
    border: 'none',
    shadow: shadows.sm,
  },
  outlined: {
    background: 'transparent',
    border: `1px solid ${colors.border}`,
    shadow: 'none',
  },
  filled: {
    background: colors.backgroundSoft,
    border: 'none',
    shadow: 'none',
  },
  ghost: {
    background: 'transparent',
    border: 'none',
    shadow: 'none',
  },
};

// =============================================================================
// PADDING SIZES
// =============================================================================

const paddingSizes = {
  none: 0,
  compact: spacing[3],  // 12px
  default: spacing[4],  // 16px
  relaxed: spacing[6],  // 24px
};

// =============================================================================
// CARD COMPONENT
// =============================================================================

export function Card({
  children,
  variant = 'default',
  padding = 'default',
  hoverable = false,
  clickable = false,
  onClick,
  style,
  className,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = variants[variant] || variants.default;
  const paddingValue = paddingSizes[padding] ?? paddingSizes.default;

  const cardStyle = {
    // Layout
    padding: paddingValue,
    overflow: 'hidden',

    // Shape
    borderRadius: borderRadius.default,

    // Colors
    background: variantStyles.background,
    border: variantStyles.border,

    // Shadow - elevate on hover if hoverable
    boxShadow: isHovered && hoverable ? shadows.cardHover : variantStyles.shadow,

    // Transform on hover
    transform: isHovered && hoverable ? 'translateY(-2px)' : 'none',

    // Transitions
    transition: `box-shadow ${transitions.cardHover}, transform ${transitions.cardHover}`,

    // Clickable styles
    cursor: clickable || onClick ? 'pointer' : 'default',

    // Custom styles
    ...style,
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
}

// =============================================================================
// CARD HEADER
// =============================================================================

export function CardHeader({ children, style, ...props }) {
  return (
    <div
      style={{
        marginBottom: spacing[3],
        paddingBottom: spacing[3],
        borderBottom: `1px solid ${colors.border}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// =============================================================================
// CARD BODY
// =============================================================================

export function CardBody({ children, style, ...props }) {
  return (
    <div style={{ ...style }} {...props}>
      {children}
    </div>
  );
}

// =============================================================================
// CARD FOOTER
// =============================================================================

export function CardFooter({ children, style, ...props }) {
  return (
    <div
      style={{
        marginTop: spacing[3],
        paddingTop: spacing[3],
        borderTop: `1px solid ${colors.border}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// =============================================================================
// CARD IMAGE
// =============================================================================

export function CardImage({
  src,
  alt,
  aspectRatio = '1/1',
  objectFit = 'cover',
  placeholder,
  style,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        aspectRatio,
        background: colors.backgroundSoft,
        overflow: 'hidden',
        position: 'relative',
        marginLeft: -paddingSizes.default,
        marginRight: -paddingSizes.default,
        marginTop: -paddingSizes.default,
        marginBottom: spacing[3],
        ...style,
      }}
    >
      {!loaded && !error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            color: colors.textMuted,
          }}
        >
          {placeholder || '🖼️'}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
        {...props}
      />
    </div>
  );
}

export default Card;
