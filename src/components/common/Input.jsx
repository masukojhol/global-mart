import { theme } from '../../styles/theme';

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  style,
  ...props
}) {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 500,
          color: theme.colors.textSecondary,
          marginBottom: 6,
          fontFamily: theme.fonts.primary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          {label} {required && <span style={{ color: theme.colors.uiSale }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: 14,
          fontFamily: theme.fonts.body,
          border: `1.5px solid ${error ? theme.colors.uiError : theme.colors.borderMedium}`,
          borderRadius: 0,
          outline: 'none',
          background: disabled ? theme.colors.surfaceLight : theme.colors.brandWhite,
          color: theme.colors.textPrimary,
          transition: theme.transitions.default,
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.colors.borderFocus;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? theme.colors.uiError : theme.colors.borderMedium;
        }}
        {...props}
      />
      {error && (
        <p style={{
          fontSize: 11,
          color: theme.colors.uiError,
          marginTop: 4,
          marginBottom: 0,
          fontFamily: theme.fonts.body,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  error,
  required = false,
  disabled = false,
  style,
  ...props
}) {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 500,
          color: theme.colors.textSecondary,
          marginBottom: 6,
          fontFamily: theme.fonts.primary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          {label} {required && <span style={{ color: theme.colors.uiSale }}>*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: 14,
          fontFamily: theme.fonts.body,
          border: `1.5px solid ${error ? theme.colors.uiError : theme.colors.borderMedium}`,
          borderRadius: 0,
          outline: 'none',
          background: disabled ? theme.colors.surfaceLight : theme.colors.brandWhite,
          color: theme.colors.textPrimary,
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 36,
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
      {error && (
        <p style={{
          fontSize: 11,
          color: theme.colors.uiError,
          marginTop: 4,
          marginBottom: 0,
          fontFamily: theme.fonts.body,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
