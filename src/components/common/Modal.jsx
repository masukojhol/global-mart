/**
 * MODAL COMPONENT
 * ===============
 * Generic modal/dialog component using design tokens.
 *
 * Usage:
 * <Modal isOpen={isOpen} onClose={handleClose} title="My Modal">
 *   Content here
 * </Modal>
 */

import { useEffect } from 'react';
import { tokens } from '../../styles/tokens';
import { useWindowSize } from '../../hooks/useWindowSize';

const { colors, typography, borderRadius, shadows, spacing, transitions, components } = tokens;

// =============================================================================
// MODAL COMPONENT
// =============================================================================

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  showHeader = true,
  closeOnOverlay = true,
  padding = true,
  footer,
  style,
  ...props
}) {
  const { isMobile } = useWindowSize();

  // Lock body scroll when modal is open
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidth = components.modal.maxWidth[size] || components.modal.maxWidth.md;

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
        padding: isMobile ? 0 : spacing[6],
        animation: `fadeIn ${transitions.duration.default}ms ease-out`,
      }}
      onClick={closeOnOverlay ? onClose : undefined}
      {...props}
    >
      <div
        style={{
          background: colors.background,
          width: '100%',
          maxWidth: isMobile ? '100%' : maxWidth,
          maxHeight: isMobile ? '90vh' : '85vh',
          borderRadius: isMobile ? `${borderRadius.default}px ${borderRadius.default}px 0 0` : borderRadius.default,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: shadows.modal,
          animation: isMobile
            ? `slideUp ${transitions.duration.slow}ms ease-out`
            : `scaleIn ${transitions.duration.default}ms ease-out`,
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showHeader && (title || showClose) && (
          <div
            style={{
              padding: isMobile ? `${spacing[4]}px ${spacing[5]}px` : `${spacing[5]}px ${spacing[6]}px`,
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? typography.fontSize.lg : typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
                fontFamily: typography.fontFamily.heading,
                color: colors.text,
                letterSpacing: typography.letterSpacing.tight,
              }}
            >
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
                  color: colors.textSecondary,
                  padding: spacing[1],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: borderRadius.default,
                  transition: transitions.hover,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.backgroundSoft;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          style={{
            padding: padding ? (isMobile ? spacing[5] : spacing[6]) : 0,
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: isMobile ? `${spacing[4]}px ${spacing[5]}px` : `${spacing[4]}px ${spacing[6]}px`,
              borderTop: `1px solid ${colors.border}`,
              flexShrink: 0,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// DRAWER COMPONENT (Side panel variant)
// =============================================================================

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = 420,
  showClose = true,
  closeOnOverlay = true,
  footer,
  style,
  ...props
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

  const positionStyles = {
    right: { right: 0, left: 'auto' },
    left: { left: 0, right: 'auto' },
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          width: isMobile ? '100%' : width,
          background: colors.background,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: shadows.drawer,
          ...positionStyles[position],
          ...style,
        }}
        {...props}
      >
        {/* Header */}
        <div
          style={{
            padding: `${spacing[5]}px ${spacing[6]}px`,
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.semibold,
              fontFamily: typography.fontFamily.heading,
              color: colors.text,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
            }}
          >
            {title}
          </h2>
          {showClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 28,
                cursor: 'pointer',
                color: colors.textSecondary,
                padding: 0,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: `${spacing[4]}px ${spacing[6]}px`,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: `${spacing[5]}px ${spacing[6]}px`,
              borderTop: `1px solid ${colors.border}`,
              background: colors.backgroundSoft,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

export default Modal;
