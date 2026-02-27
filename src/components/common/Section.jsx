/**
 * SECTION COMPONENT
 * =================
 * Collapsible section component for block-by-block editing.
 * Supports accordion behavior, edit modes, and progressive disclosure.
 *
 * Usage:
 * <Section title="Personal Info" icon="👤">Content</Section>
 * <Section title="Security" collapsible defaultCollapsed>Content</Section>
 * <Section title="Contact" editable onEdit={handleEdit}>Content</Section>
 */

import { useState } from 'react';
import { tokens } from '../../styles/tokens';
import { Button } from './Button';

const { colors, typography, borderRadius, shadows, spacing, transitions } = tokens;

// =============================================================================
// SECTION COMPONENT
// =============================================================================

export function Section({
  title,
  subtitle,
  icon,
  children,
  collapsible = false,
  defaultCollapsed = false,
  editable = false,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
  editLabel = 'Edit',
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  headerAction,
  variant = 'default',
  style,
  ...props
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const variants = {
    default: {
      background: 'transparent',
      border: 'none',
      padding: 0,
    },
    card: {
      background: colors.backgroundCard,
      border: `1px solid ${colors.border}`,
      padding: spacing[4],
    },
    filled: {
      background: colors.backgroundSoft,
      border: 'none',
      padding: spacing[4],
    },
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <div
      style={{
        marginBottom: spacing[5],
        borderRadius: borderRadius.default,
        ...variantStyle,
        ...style,
      }}
      {...props}
    >
      {/* Header */}
      <div
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: collapsible ? 'pointer' : 'default',
          marginBottom: isCollapsed ? 0 : spacing[4],
          paddingBottom: isCollapsed ? 0 : spacing[3],
          borderBottom: isCollapsed ? 'none' : `1px solid ${colors.border}`,
          transition: transitions.hover,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], flex: 1 }}>
          {icon && (
            <span style={{ fontSize: 18, display: 'flex' }}>
              {icon}
            </span>
          )}
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                style={{
                  margin: `${spacing[1]}px 0 0`,
                  fontSize: typography.fontSize.xs,
                  color: colors.textMuted,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          {/* Custom header action */}
          {headerAction}

          {/* Edit button */}
          {editable && !isEditing && !collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            >
              {editLabel}
            </Button>
          )}

          {/* Save/Cancel buttons when editing */}
          {isEditing && (
            <div style={{ display: 'flex', gap: spacing[2] }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel?.();
                }}
              >
                {cancelLabel}
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave?.();
                }}
                loading={loading}
              >
                {saveLabel}
              </Button>
            </div>
          )}

          {/* Collapse indicator */}
          {collapsible && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textSecondary}
              strokeWidth="2"
              style={{
                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: transitions.hover,
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div
          style={{
            animation: collapsible ? `fadeIn ${transitions.duration.fast}ms ease-out` : 'none',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SECTION GROUP (Accordion behavior)
// =============================================================================

export function SectionGroup({
  children,
  accordion = false,
  style,
  ...props
}) {
  const [openIndex, setOpenIndex] = useState(null);

  // If accordion mode, only one section can be open
  if (accordion) {
    return (
      <div style={style} {...props}>
        {/* Accordion logic would go here - keeping simple for now */}
        {children}
      </div>
    );
  }

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
}

// =============================================================================
// DIVIDER
// =============================================================================

export function Divider({ style, ...props }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `1px solid ${colors.border}`,
        margin: `${spacing[4]}px 0`,
        ...style,
      }}
      {...props}
    />
  );
}

export default Section;
