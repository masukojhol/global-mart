import { useEffect } from 'react';
import { theme } from '../../styles/theme';
import { useWindowSize } from '../../hooks/useWindowSize';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
}) {
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 400,
    md: 500,
    lg: 700,
    xl: 900,
    full: '100%',
  };

  const maxWidth = sizes[size] || sizes.md;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? 0 : 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: theme.colors.brandWhite,
          width: '100%',
          maxWidth: isMobile ? '100%' : maxWidth,
          maxHeight: isMobile ? '90vh' : '85vh',
          borderRadius: isMobile ? '16px 16px 0 0' : 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: theme.shadows.modal,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: isMobile ? '16px 20px' : '20px 24px',
          borderBottom: `1px solid ${theme.colors.borderLight}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: isMobile ? 18 : 20,
            fontWeight: 400,
            fontFamily: theme.fonts.primary,
            color: theme.colors.textPrimary,
            letterSpacing: -0.5,
          }}>
            {title}
          </h2>
          {showClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: theme.colors.textSecondary,
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: isMobile ? '20px' : '24px',
          overflowY: 'auto',
          flex: 1,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
