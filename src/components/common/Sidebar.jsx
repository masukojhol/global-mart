/**
 * SIDEBAR COMPONENT
 * =================
 * Vertical navigation sidebar with grouped menu items.
 * Follows Coupang-style profile page layout.
 *
 * Usage:
 * <Sidebar>
 *   <SidebarSection title="My Shopping">
 *     <SidebarItem icon="📦" label="Orders" active onClick={...} />
 *   </SidebarSection>
 * </Sidebar>
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// =============================================================================
// SIDEBAR CONTAINER
// =============================================================================

export function Sidebar({ children, style, ...props }) {
  return (
    <nav
      style={{
        width: 220,
        flexShrink: 0,
        background: colors.background,
        borderRight: `1px solid ${colors.border}`,
        overflowY: 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </nav>
  );
}

// =============================================================================
// SIDEBAR HEADER
// =============================================================================

export function SidebarHeader({ title, subtitle, icon, style, ...props }) {
  return (
    <div
      style={{
        padding: spacing[4],
        borderBottom: `1px solid ${colors.border}`,
        background: colors.primary,
        color: colors.white,
        ...style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
        {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
        <div>
          <h3 style={{
            margin: 0,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
          }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{
              margin: `${spacing[1]}px 0 0`,
              fontSize: typography.fontSize.xs,
              opacity: 0.9,
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SIDEBAR SECTION
// =============================================================================

export function SidebarSection({ title, children, style, ...props }) {
  return (
    <div
      style={{
        padding: `${spacing[3]}px 0`,
        borderBottom: `1px solid ${colors.border}`,
        ...style,
      }}
      {...props}
    >
      {title && (
        <h4 style={{
          margin: 0,
          padding: `0 ${spacing[4]}px ${spacing[2]}px`,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.bold,
          color: colors.text,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          {title}
        </h4>
      )}
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {children}
      </ul>
    </div>
  );
}

// =============================================================================
// SIDEBAR ITEM
// =============================================================================

export function SidebarItem({
  icon,
  label,
  badge,
  badgeVariant = 'primary',
  active = false,
  onClick,
  style,
  ...props
}) {
  const badgeColors = {
    primary: colors.primary,
    error: colors.error,
    success: colors.success,
    warning: colors.accent,
  };

  return (
    <li>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]}px ${spacing[4]}px`,
          background: active ? `${colors.primary}10` : 'transparent',
          border: 'none',
          borderLeft: active ? `3px solid ${colors.primary}` : '3px solid transparent',
          cursor: 'pointer',
          fontSize: typography.fontSize.sm,
          fontWeight: active ? typography.fontWeight.medium : typography.fontWeight.regular,
          color: active ? colors.primary : colors.text,
          textAlign: 'left',
          transition: transitions.hover,
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.background = colors.backgroundSoft;
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
        {...props}
      >
        {icon && <span style={{ fontSize: 16, opacity: 0.8 }}>{icon}</span>}
        <span style={{ flex: 1 }}>{label}</span>
        {badge && (
          <span style={{
            minWidth: 18,
            height: 18,
            padding: '0 6px',
            borderRadius: borderRadius.circle,
            background: badgeColors[badgeVariant] || badgeColors.primary,
            color: colors.white,
            fontSize: 10,
            fontWeight: typography.fontWeight.bold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {badge}
          </span>
        )}
      </button>
    </li>
  );
}

// =============================================================================
// SIDEBAR BALANCE CARD (for showing wallet/cash/points)
// =============================================================================

export function SidebarBalanceCard({ items, style, ...props }) {
  return (
    <div
      style={{
        display: 'flex',
        background: colors.backgroundSoft,
        borderBottom: `1px solid ${colors.border}`,
        ...style,
      }}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            padding: spacing[3],
            textAlign: 'center',
            borderRight: index < items.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}
        >
          <p style={{
            margin: 0,
            fontSize: typography.fontSize.xs,
            color: colors.textSecondary,
          }}>
            {item.label}
          </p>
          <p style={{
            margin: `${spacing[1]}px 0 0`,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text,
            fontFamily: typography.fontFamily.mono,
          }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
