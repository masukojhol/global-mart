/**
 * PRODUCT CARD COMPONENT
 * ======================
 * Product card using GoFresh design tokens.
 */

import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, toUSD } from '../../utils/helpers';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';

const { colors, typography, borderRadius, shadows, spacing, transitions } = tokens;

// =============================================================================
// PROGRESS BAR
// =============================================================================

export function ProgressBar({ percent }) {
  return (
    <div style={{
      width: '100%',
      height: 4,
      background: colors.border,
      borderRadius: borderRadius.default,
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${percent}%`,
        height: '100%',
        borderRadius: borderRadius.default,
        background: percent > 80 ? colors.sale : colors.primary,
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}

// =============================================================================
// ROCKET BADGE
// =============================================================================

export function RocketBadge({ small = false }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: colors.primary,
      color: colors.white,
      padding: small ? '2px 6px' : '4px 8px',
      borderRadius: borderRadius.default,
      fontSize: small ? 9 : 10,
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: 0.3,
    }}>
      <span>🚀</span>
      <span>Rocket</span>
    </div>
  );
}

// =============================================================================
// PRODUCT CARD
// =============================================================================

export function ProductCard({ product, isDeal = false, onLike, isLiked, onClick }) {
  const { addItem, openCart } = useCart();
  const { isMobile } = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);

  const price = product.salePrice || product.price;
  const originalPrice = product.originalPrice;
  const discount = product.discount;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(product.id);
  };

  // Determine badge variant
  const getBadgeVariant = (tag) => {
    if (tag === 'New' || tag === 'Trending') return 'new';
    if (tag === 'Organic') return 'organic';
    if (tag === 'Bestseller') return 'bestseller';
    return 'info';
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: colors.backgroundCard,
        borderRadius: borderRadius.default,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        cursor: 'pointer',
        boxShadow: isHovered ? shadows.cardHover : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        transition: `box-shadow ${transitions.cardHover}, transform ${transitions.cardHover}`,
      }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.backgroundSoft,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />

        {/* Discount Badge */}
        {discount && (
          <div style={{
            position: 'absolute',
            top: isMobile ? 6 : 8,
            left: isMobile ? 6 : 8,
          }}>
            <Badge variant="sale" size="sm">-{discount}%</Badge>
          </div>
        )}

        {/* Tag Badge */}
        {product.tag && !discount && (
          <div style={{
            position: 'absolute',
            top: isMobile ? 6 : 8,
            left: isMobile ? 6 : 8,
          }}>
            <Badge variant={getBadgeVariant(product.tag)} size="sm">
              {product.tag}
            </Badge>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={handleLike}
          style={{
            position: 'absolute',
            top: isMobile ? 6 : 8,
            right: isMobile ? 6 : 8,
            background: colors.white,
            border: 'none',
            width: isMobile ? 30 : 34,
            height: isMobile ? 30 : 34,
            borderRadius: borderRadius.circle,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: shadows.sm,
            transition: transitions.hover,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isLiked ? colors.sale : 'none'}
            stroke={isLiked ? colors.sale : colors.text}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Rocket Badge */}
        {product.rocket && (
          <div style={{ position: 'absolute', bottom: isMobile ? 6 : 8, left: isMobile ? 6 : 8 }}>
            <RocketBadge small />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? spacing[3] : spacing[4] }}>
        {/* Category */}
        <span style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
          color: colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wider,
          fontFamily: typography.fontFamily.body,
        }}>
          {product.flag} {product.categoryLabel || product.category}
        </span>

        {/* Name */}
        <p style={{
          fontSize: isMobile ? typography.fontSize.sm : typography.fontSize.base,
          fontWeight: typography.fontWeight.semibold,
          margin: '4px 0 8px',
          lineHeight: typography.lineHeight.normal,
          color: colors.text,
          fontFamily: typography.fontFamily.body,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          minHeight: isMobile ? 32 : 36,
        }}>
          {product.name}
        </p>

        {/* Price */}
        <div style={{ marginBottom: 6 }}>
          <span style={{
            fontSize: isMobile ? 15 : typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
            color: isDeal ? colors.sale : colors.text,
            fontFamily: typography.fontFamily.mono,
          }}>
            ₩{formatKRW(price)}
          </span>
          <span style={{
            fontSize: typography.fontSize.xs,
            color: colors.textMuted,
            marginLeft: 6,
          }}>
            ≈${toUSD(price)}
          </span>
        </div>

        {/* Original Price */}
        {originalPrice && (
          <span style={{
            fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
            color: colors.textMuted,
            textDecoration: 'line-through',
            fontFamily: typography.fontFamily.mono,
          }}>
            ₩{formatKRW(originalPrice)}
          </span>
        )}

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '8px 0' }}>
          <StarRating rating={product.rating} size="compact" />
          <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>
            ({formatKRW(product.reviews)})
          </span>
        </div>

        {/* Progress Bar (for deals) */}
        {isDeal && product.sold && (
          <>
            <ProgressBar percent={product.sold} />
            <p style={{
              fontSize: typography.fontSize.xs,
              color: product.sold > 85 ? colors.sale : colors.textSecondary,
              fontWeight: product.sold > 85 ? typography.fontWeight.semibold : typography.fontWeight.regular,
              marginTop: 5,
              marginBottom: 0,
            }}>
              {product.sold > 85 ? '🔥 Almost sold out!' : `${product.sold}% claimed`}
            </p>
          </>
        )}

        {/* Add to Cart Button (for non-deals) */}
        {!isDeal && (
          <button
            onClick={handleAddToCart}
            style={{
              background: colors.primary,
              color: colors.white,
              border: 'none',
              padding: isMobile ? '10px 14px' : '11px 18px',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              borderRadius: borderRadius.default,
              cursor: 'pointer',
              width: '100%',
              marginTop: spacing[2],
              fontFamily: typography.fontFamily.body,
              transition: transitions.hover,
              // Sentence case, not uppercase
              textTransform: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.primary;
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
