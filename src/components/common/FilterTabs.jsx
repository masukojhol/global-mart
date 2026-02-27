/**
 * FILTER TABS COMPONENT
 * =====================
 * Horizontal filter tabs/chips for filtering content.
 * Follows Coupang-style order list filters.
 *
 * Usage:
 * <FilterTabs
 *   options={[{ value: '6m', label: 'Last 6 months' }, ...]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// =============================================================================
// FILTER TABS
// =============================================================================

export function FilterTabs({
  options = [],
  value,
  onChange,
  variant = 'default', // 'default' | 'pills' | 'underline'
  size = 'md', // 'sm' | 'md'
  style,
  ...props
}) {
  const sizes = {
    sm: {
      padding: `${spacing[1]}px ${spacing[3]}px`,
      fontSize: typography.fontSize.xs,
    },
    md: {
      padding: `${spacing[2]}px ${spacing[4]}px`,
      fontSize: typography.fontSize.sm,
    },
  };

  const sizeStyles = sizes[size] || sizes.md;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing[2],
        ...style,
      }}
      {...props}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        const getVariantStyles = () => {
          switch (variant) {
            case 'pills':
              return {
                background: isActive ? colors.primary : colors.backgroundSoft,
                color: isActive ? colors.white : colors.text,
                border: 'none',
                borderRadius: borderRadius.pill,
              };
            case 'underline':
              return {
                background: 'transparent',
                color: isActive ? colors.primary : colors.textSecondary,
                border: 'none',
                borderBottom: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
                borderRadius: 0,
              };
            default:
              return {
                background: isActive ? colors.primary : colors.background,
                color: isActive ? colors.white : colors.text,
                border: `1px solid ${isActive ? colors.primary : colors.border}`,
                borderRadius: borderRadius.default,
              };
          }
        };

        const variantStyles = getVariantStyles();

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              ...sizeStyles,
              ...variantStyles,
              fontWeight: isActive ? typography.fontWeight.medium : typography.fontWeight.regular,
              fontFamily: typography.fontFamily.body,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: transitions.hover,
            }}
            onMouseEnter={(e) => {
              if (!isActive && variant !== 'underline') {
                e.currentTarget.style.background = colors.backgroundSoft;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive && variant !== 'underline') {
                e.currentTarget.style.background = variant === 'pills' ? colors.backgroundSoft : colors.background;
              }
            }}
          >
            {option.icon && <span style={{ marginRight: spacing[1] }}>{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

// =============================================================================
// DATE FILTER TABS (Pre-configured for order filtering)
// =============================================================================

export function DateFilterTabs({ value, onChange, style, ...props }) {
  const currentYear = new Date().getFullYear();

  const options = [
    { value: '6m', label: 'Last 6 months' },
    { value: String(currentYear), label: String(currentYear) },
    { value: String(currentYear - 1), label: String(currentYear - 1) },
    { value: String(currentYear - 2), label: String(currentYear - 2) },
    { value: String(currentYear - 3), label: String(currentYear - 3) },
    { value: String(currentYear - 4), label: String(currentYear - 4) },
  ];

  return (
    <FilterTabs
      options={options}
      value={value}
      onChange={onChange}
      variant="default"
      size="sm"
      style={style}
      {...props}
    />
  );
}

export default FilterTabs;
