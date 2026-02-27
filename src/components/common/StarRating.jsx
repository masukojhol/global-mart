/**
 * STAR RATING COMPONENT
 * =====================
 * Generic star rating display using design tokens.
 * Uses gold color (#F59E0B) exclusively per design spec.
 *
 * Usage:
 * <StarRating rating={4.5} />
 * <StarRating rating={4} size="lg" showCount reviewCount={128} />
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, components } = tokens;

// =============================================================================
// STAR RATING COMPONENT
// =============================================================================

export function StarRating({
  rating = 0,
  maxRating = 5,
  size = 'default',
  showNumeric = false,
  showCount = false,
  reviewCount = 0,
  interactive = false,
  onChange,
  style,
  ...props
}) {
  const starSize = size === 'compact' ? components.starRating.size.compact : components.starRating.size.default;

  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const renderStar = (index) => {
    const fillPercent = Math.min(Math.max(rating - index, 0), 1) * 100;

    return (
      <span
        key={index}
        onClick={() => handleClick(index)}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: starSize,
          height: starSize,
          cursor: interactive ? 'pointer' : 'default',
        }}
      >
        {/* Empty star (background) */}
        <svg
          width={starSize}
          height={starSize}
          viewBox="0 0 24 24"
          fill={components.starRating.colorEmpty}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {/* Filled star (foreground with clip) */}
        <svg
          width={starSize}
          height={starSize}
          viewBox="0 0 24 24"
          fill={components.starRating.colorFilled}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
          }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>
    );
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        ...style,
      }}
      {...props}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: maxRating }, (_, i) => renderStar(i))}
      </div>

      {/* Numeric rating */}
      {showNumeric && (
        <span
          style={{
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.body,
            color: colors.text,
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}

      {/* Review count */}
      {showCount && (
        <span
          style={{
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.body,
            color: colors.textMuted,
          }}
        >
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

// =============================================================================
// SIMPLE STAR RATING (Text-based, lighter weight)
// =============================================================================

export function SimpleStarRating({
  rating = 0,
  maxRating = 5,
  style,
  ...props
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <span
      style={{
        fontSize: typography.fontSize.xs,
        letterSpacing: -0.5,
        ...style,
      }}
      {...props}
    >
      <span style={{ color: components.starRating.colorFilled }}>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '★'}
      </span>
      <span style={{ color: components.starRating.colorEmpty }}>
        {'★'.repeat(emptyStars)}
      </span>
    </span>
  );
}

export default StarRating;
