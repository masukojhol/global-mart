/**
 * TOGGLE/SWITCH COMPONENT
 * =======================
 * Toggle switch for boolean settings like notifications, dark mode, etc.
 *
 * Usage:
 * <Toggle checked={isEnabled} onChange={setIsEnabled} />
 * <Toggle checked={darkMode} onChange={setDarkMode} label="Dark mode" />
 * <Toggle checked={true} disabled label="Always on" />
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// =============================================================================
// TOGGLE SIZES
// =============================================================================

const sizes = {
  sm: { width: 36, height: 20, knobSize: 14 },
  md: { width: 44, height: 24, knobSize: 18 },
  lg: { width: 52, height: 28, knobSize: 22 },
};

// =============================================================================
// TOGGLE COMPONENT
// =============================================================================

export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  style,
  ...props
}) {
  const sizeConfig = sizes[size] || sizes.md;
  const knobOffset = checked
    ? sizeConfig.width - sizeConfig.knobSize - 3
    : 3;

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const toggleElement = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: sizeConfig.width,
        height: sizeConfig.height,
        borderRadius: sizeConfig.height / 2,
        background: checked ? colors.primary : colors.border,
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: `background ${transitions.duration.fast}ms ease`,
        position: 'relative',
        flexShrink: 0,
      }}
      {...props}
    >
      {/* Knob */}
      <span
        style={{
          position: 'absolute',
          top: (sizeConfig.height - sizeConfig.knobSize) / 2,
          left: knobOffset,
          width: sizeConfig.knobSize,
          height: sizeConfig.knobSize,
          borderRadius: borderRadius.circle,
          background: colors.white,
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: `left ${transitions.duration.fast}ms ease`,
        }}
      />
    </button>
  );

  // If no label, just return the toggle
  if (!label) {
    return <div style={style}>{toggleElement}</div>;
  }

  // With label
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: spacing[3],
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onClick={handleClick}
    >
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.regular,
            color: disabled ? colors.textMuted : colors.text,
            display: 'block',
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
              display: 'block',
              marginTop: spacing[1],
            }}
          >
            {description}
          </span>
        )}
      </div>
      {toggleElement}
    </div>
  );
}

// =============================================================================
// TOGGLE GROUP
// =============================================================================

export function ToggleGroup({ children, style, ...props }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[4],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Toggle;
