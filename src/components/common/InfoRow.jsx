/**
 * INFO ROW COMPONENT
 * ==================
 * Display key-value information in a consistent row format.
 * Perfect for profile details, order info, settings display.
 *
 * Usage:
 * <InfoRow label="Email" value="user@example.com" />
 * <InfoRow label="Phone" value="+82 10-1234-5678" icon="📱" />
 * <InfoRow label="Status" value={<Badge>Active</Badge>} />
 * <InfoRow label="Address" value="Not set" placeholder />
 */

import { tokens } from '../../styles/tokens';

const { colors, typography, spacing, transitions, borderRadius } = tokens;

// =============================================================================
// INFO ROW COMPONENT
// =============================================================================

export function InfoRow({
  label,
  value,
  icon,
  placeholder = false,
  copyable = false,
  onClick,
  rightElement,
  style,
  ...props
}) {
  const handleCopy = () => {
    if (copyable && value && typeof value === 'string') {
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing[3],
        padding: `${spacing[3]}px 0`,
        cursor: onClick ? 'pointer' : 'default',
        transition: transitions.hover,
        ...style,
      }}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <span
          style={{
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {icon}
        </span>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.textMuted,
            margin: 0,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          {label}
        </p>
        <div
          style={{
            fontSize: typography.fontSize.base,
            color: placeholder ? colors.textMuted : colors.text,
            fontStyle: placeholder ? 'italic' : 'normal',
            marginTop: spacing[1],
            wordBreak: 'break-word',
          }}
        >
          {value}
        </div>
      </div>

      {/* Right element (action button, badge, etc.) */}
      {rightElement && (
        <div style={{ flexShrink: 0, marginLeft: spacing[2] }}>
          {rightElement}
        </div>
      )}

      {/* Copy button */}
      {copyable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: spacing[1],
            cursor: 'pointer',
            color: colors.textMuted,
            display: 'flex',
            alignItems: 'center',
            borderRadius: borderRadius.default,
            transition: transitions.hover,
          }}
          title="Copy to clipboard"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        </button>
      )}

      {/* Arrow indicator for clickable rows */}
      {onClick && !rightElement && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.textMuted}
          strokeWidth="2"
          style={{ flexShrink: 0 }}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </div>
  );
}

// =============================================================================
// INFO LIST (Container for multiple InfoRows)
// =============================================================================

export function InfoList({
  children,
  divided = true,
  style,
  ...props
}) {
  return (
    <div
      style={{
        borderRadius: borderRadius.default,
        ...style,
      }}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                borderBottom: divided && index < children.length - 1
                  ? `1px solid ${colors.border}`
                  : 'none',
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

// =============================================================================
// STAT CARD (For displaying statistics)
// =============================================================================

export function StatCard({
  icon,
  label,
  value,
  trend,
  trendDirection,
  style,
  ...props
}) {
  const trendColors = {
    up: colors.success,
    down: colors.error,
    neutral: colors.textMuted,
  };

  return (
    <div
      style={{
        padding: spacing[4],
        background: colors.backgroundSoft,
        borderRadius: borderRadius.default,
        textAlign: 'center',
        ...style,
      }}
      {...props}
    >
      {icon && (
        <span
          style={{
            fontSize: 24,
            display: 'block',
            marginBottom: spacing[2],
          }}
        >
          {icon}
        </span>
      )}
      <p
        style={{
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
          color: colors.text,
          margin: 0,
          fontFamily: typography.fontFamily.mono,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: typography.fontSize.xs,
          color: colors.textMuted,
          margin: `${spacing[1]}px 0 0`,
        }}
      >
        {label}
      </p>
      {trend && (
        <p
          style={{
            fontSize: typography.fontSize.xs,
            color: trendColors[trendDirection] || trendColors.neutral,
            margin: `${spacing[1]}px 0 0`,
          }}
        >
          {trendDirection === 'up' && '↑'}
          {trendDirection === 'down' && '↓'}
          {trend}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// STAT GRID (Grid of stat cards)
// =============================================================================

export function StatGrid({
  children,
  columns = 3,
  style,
  ...props
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: spacing[3],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default InfoRow;
