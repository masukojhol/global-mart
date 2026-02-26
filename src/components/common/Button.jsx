import { theme } from '../../styles/theme';

const variants = {
  primary: {
    background: theme.colors.brandPrimary,
    color: theme.colors.brandWhite,
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: theme.colors.brandPrimary,
    border: `1.5px solid ${theme.colors.brandPrimary}`,
  },
  blue: {
    background: theme.colors.brandBlue,
    color: theme.colors.brandWhite,
    border: 'none',
  },
  danger: {
    background: theme.colors.uiError,
    color: theme.colors.brandWhite,
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: theme.colors.textPrimary,
    border: 'none',
  },
};

const sizes = {
  sm: {
    padding: '8px 16px',
    fontSize: 11,
  },
  md: {
    padding: '12px 24px',
    fontSize: 12,
  },
  lg: {
    padding: '14px 32px',
    fontSize: 13,
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  style,
  ...props
}) {
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...variantStyles,
        ...sizeStyles,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: theme.fonts.primary,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        borderRadius: 0,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: theme.transitions.default,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...style,
      }}
      {...props}
    >
      {loading && (
        <span style={{
          width: 14,
          height: 14,
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      )}
      {children}
    </button>
  );
}

export default Button;
