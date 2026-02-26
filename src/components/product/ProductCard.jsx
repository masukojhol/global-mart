import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { theme } from '../../styles/theme';
import { formatKRW, toUSD } from '../../utils/helpers';
import { useWindowSize } from '../../hooks/useWindowSize';

export function StarRating({ rating }) {
  return (
    <span style={{ color: theme.colors.textPrimary, fontSize: 11, letterSpacing: -0.5 }}>
      {'★'.repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? '½' : ''}
      <span style={{ color: theme.colors.textDisabled }}>
        {'★'.repeat(5 - Math.ceil(rating))}
      </span>
    </span>
  );
}

export function ProgressBar({ percent }) {
  return (
    <div style={{
      width: '100%',
      height: 4,
      background: theme.colors.borderLight,
      borderRadius: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${percent}%`,
        height: '100%',
        borderRadius: 0,
        background: percent > 80 ? theme.colors.uiSale : theme.colors.textPrimary,
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}

export function RocketBadge({ small = false }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: theme.colors.brandBlue,
      color: '#fff',
      padding: small ? '2px 6px' : '4px 8px',
      borderRadius: 0,
      fontSize: small ? 9 : 10,
      fontWeight: 600,
      letterSpacing: 0.3,
    }}>
      <span>🚀</span>
      <span>Rocket</span>
    </div>
  );
}

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

  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.colors.brandWhite,
        borderRadius: 0,
        overflow: 'hidden',
        border: `1px solid ${theme.colors.borderLight}`,
        cursor: 'pointer',
        boxShadow: isHovered ? theme.shadows.hover : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.surfaceLight,
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
          <span style={{
            position: 'absolute',
            top: isMobile ? 6 : 10,
            left: isMobile ? 6 : 10,
            background: theme.colors.uiSale,
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: 0,
            letterSpacing: 0.5,
            fontFamily: theme.fonts.primary,
          }}>
            -{discount}%
          </span>
        )}

        {/* Tag Badge */}
        {product.tag && !discount && (
          <span style={{
            position: 'absolute',
            top: isMobile ? 6 : 10,
            left: isMobile ? 6 : 10,
            background: product.tag === 'New' || product.tag === 'Trending' ? theme.colors.brandPrimary : theme.colors.brandWhite,
            color: product.tag === 'New' || product.tag === 'Trending' ? '#fff' : theme.colors.brandPrimary,
            fontSize: 9,
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: 0,
            border: (product.tag !== 'New' && product.tag !== 'Trending') ? `1px solid ${theme.colors.borderMedium}` : 'none',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontFamily: theme.fonts.primary,
          }}>
            {product.tag}
          </span>
        )}

        {/* Like Button */}
        <button
          onClick={handleLike}
          style={{
            position: 'absolute',
            top: isMobile ? 6 : 10,
            right: isMobile ? 6 : 10,
            background: '#fff',
            border: 'none',
            width: isMobile ? 30 : 34,
            height: isMobile ? 30 : 34,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isLiked ? theme.colors.uiSale : 'none'}
            stroke={isLiked ? theme.colors.uiSale : theme.colors.textPrimary}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Rocket Badge */}
        {product.rocket && (
          <div style={{ position: 'absolute', bottom: isMobile ? 6 : 10, left: isMobile ? 6 : 10 }}>
            <RocketBadge small />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? 10 : 14 }}>
        {/* Category */}
        <span style={{
          fontSize: 9,
          fontWeight: 600,
          color: theme.colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          fontFamily: theme.fonts.primary,
        }}>
          {product.flag} {product.categoryLabel || product.category}
        </span>

        {/* Name */}
        <p style={{
          fontSize: isMobile ? 12 : 13,
          fontWeight: 400,
          margin: '4px 0 8px',
          lineHeight: 1.4,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.body,
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
            fontSize: isMobile ? 15 : 17,
            fontWeight: 700,
            color: isDeal ? theme.colors.uiSale : theme.colors.textPrimary,
            fontFamily: theme.fonts.mono,
          }}>
            ₩{formatKRW(price)}
          </span>
          <span style={{
            fontSize: 11,
            color: theme.colors.textMuted,
            marginLeft: 6,
          }}>
            ≈${toUSD(price)}
          </span>
        </div>

        {/* Original Price */}
        {originalPrice && (
          <span style={{
            fontSize: isMobile ? 11 : 12,
            color: theme.colors.textMuted,
            textDecoration: 'line-through',
          }}>
            ₩{formatKRW(originalPrice)}
          </span>
        )}

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '8px 0' }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 10, color: theme.colors.textMuted }}>
            ({formatKRW(product.reviews)})
          </span>
        </div>

        {/* Progress Bar (for deals) */}
        {isDeal && product.sold && (
          <>
            <ProgressBar percent={product.sold} />
            <p style={{
              fontSize: 10,
              color: product.sold > 85 ? theme.colors.uiSale : theme.colors.textSecondary,
              fontWeight: product.sold > 85 ? 600 : 400,
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
              background: theme.colors.brandPrimary,
              color: '#fff',
              border: 'none',
              padding: isMobile ? '10px 14px' : '11px 18px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 0,
              cursor: 'pointer',
              width: '100%',
              marginTop: 8,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              fontFamily: theme.fonts.primary,
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
