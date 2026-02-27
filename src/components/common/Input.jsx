/**
 * INPUT COMPONENT
 * ===============
 * Generic form input components using design tokens.
 * Includes Input, Select, Textarea, and Checkbox.
 *
 * Usage:
 * <Input label="Email" placeholder="Enter email" />
 * <Select label="Country" options={countries} />
 * <Textarea label="Message" rows={4} />
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions, components } = tokens;

// =============================================================================
// BASE INPUT STYLES
// =============================================================================

const getBaseInputStyles = (error, disabled) => ({
  width: '100%',
  padding: `${components.input.padding.y}px ${components.input.padding.x}px`,
  fontSize: components.input.fontSize,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.regular,
  lineHeight: 1.5,
  color: colors.text,
  background: disabled ? colors.backgroundSoft : colors.background,
  border: `${components.input.borderWidth}px solid ${error ? colors.error : colors.border}`,
  borderRadius: borderRadius.default,
  outline: 'none',
  transition: `border-color ${transitions.hover}, box-shadow ${transitions.hover}`,
  boxSizing: 'border-box',
});

const focusStyles = {
  borderColor: colors.borderFocus,
  boxShadow: `0 0 0 3px rgba(45, 106, 79, 0.1)`,
};

// =============================================================================
// LABEL STYLES
// =============================================================================

const labelStyles = {
  display: 'block',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  fontFamily: typography.fontFamily.body,
  color: colors.textSecondary,
  marginBottom: spacing[2],
  // Sentence case, not uppercase per design spec
  textTransform: 'none',
};

// =============================================================================
// INPUT COMPONENT
// =============================================================================

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  inputStyle,
  ...props
}) {
  const handleFocus = (e) => {
    e.target.style.borderColor = focusStyles.borderColor;
    e.target.style.boxShadow = focusStyles.boxShadow;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = error ? colors.error : colors.border;
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ marginBottom: spacing[4], ...style }}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: colors.error, marginLeft: 4 }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.textMuted,
              display: 'flex',
            }}
          >
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            ...getBaseInputStyles(error, disabled),
            paddingLeft: leftIcon ? 40 : components.input.padding.x,
            paddingRight: rightIcon ? 40 : components.input.padding.x,
            ...inputStyle,
          }}
          {...props}
        />

        {rightIcon && (
          <span
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.textMuted,
              display: 'flex',
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <p
          style={{
            fontSize: typography.fontSize.xs,
            color: error ? colors.error : colors.textMuted,
            marginTop: spacing[1],
            marginBottom: 0,
          }}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// SELECT COMPONENT
// =============================================================================

export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  error,
  helperText,
  required = false,
  disabled = false,
  style,
  ...props
}) {
  const handleFocus = (e) => {
    e.target.style.borderColor = focusStyles.borderColor;
    e.target.style.boxShadow = focusStyles.boxShadow;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = error ? colors.error : colors.border;
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ marginBottom: spacing[4], ...style }}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: colors.error, marginLeft: 4 }}>*</span>}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          ...getBaseInputStyles(error, disabled),
          cursor: disabled ? 'not-allowed' : 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `right ${components.input.padding.x}px center`,
          paddingRight: 40,
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {(error || helperText) && (
        <p
          style={{
            fontSize: typography.fontSize.xs,
            color: error ? colors.error : colors.textMuted,
            marginTop: spacing[1],
            marginBottom: 0,
          }}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// TEXTAREA COMPONENT
// =============================================================================

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  helperText,
  required = false,
  disabled = false,
  maxLength,
  style,
  ...props
}) {
  const handleFocus = (e) => {
    e.target.style.borderColor = focusStyles.borderColor;
    e.target.style.boxShadow = focusStyles.boxShadow;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = error ? colors.error : colors.border;
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ marginBottom: spacing[4], ...style }}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: colors.error, marginLeft: 4 }}>*</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          ...getBaseInputStyles(error, disabled),
          resize: 'vertical',
          minHeight: 100,
        }}
        {...props}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: spacing[1],
        }}
      >
        {(error || helperText) && (
          <p
            style={{
              fontSize: typography.fontSize.xs,
              color: error ? colors.error : colors.textMuted,
              margin: 0,
            }}
          >
            {error || helperText}
          </p>
        )}
        {maxLength && (
          <p
            style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
              margin: 0,
            }}
          >
            {value?.length || 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// CHECKBOX COMPONENT
// =============================================================================

export function Checkbox({
  label,
  checked,
  onChange,
  error,
  disabled = false,
  style,
  ...props
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing[2],
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        marginBottom: spacing[3],
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: 18,
          height: 18,
          margin: 0,
          marginTop: 2,
          accentColor: colors.primary,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        {...props}
      />
      <span
        style={{
          fontSize: typography.fontSize.base,
          fontFamily: typography.fontFamily.body,
          color: error ? colors.error : colors.text,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </label>
  );
}

// =============================================================================
// SEARCH INPUT COMPONENT
// =============================================================================

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  style,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        border: `2px solid ${colors.primary}`,
        borderRadius: borderRadius.default,
        overflow: 'hidden',
        height: components.searchBar.height,
        ...style,
      }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          padding: `0 ${spacing[4]}px`,
          fontSize: typography.fontSize.base,
          fontFamily: typography.fontFamily.body,
          background: colors.background,
        }}
        {...props}
      />
      <button
        onClick={() => onSearch?.(value)}
        style={{
          width: 52,
          background: colors.primary,
          border: 'none',
          color: colors.white,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={components.searchBar.iconSize}
          height={components.searchBar.iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

export default Input;
