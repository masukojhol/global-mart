/**
 * TABS COMPONENT
 * ==============
 * Modern tab navigation component with multiple variants.
 * Supports icons, badges, and animated indicators.
 *
 * Usage:
 * <Tabs value={activeTab} onChange={setActiveTab}>
 *   <Tab value="profile" label="Profile" icon="👤" />
 *   <Tab value="orders" label="Orders" icon="📦" badge={3} />
 *   <Tab value="settings" label="Settings" />
 * </Tabs>
 */

import { useState, useRef, useEffect } from 'react';
import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// =============================================================================
// TABS CONTAINER
// =============================================================================

export function Tabs({
  children,
  value,
  onChange,
  variant = 'underline',
  fullWidth = true,
  style,
  ...props
}) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef(null);
  const tabRefs = useRef({});

  // Update indicator position
  useEffect(() => {
    if (variant === 'underline' && tabRefs.current[value]) {
      const tab = tabRefs.current[value];
      const container = tabsRef.current;
      if (tab && container) {
        const tabRect = tab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIndicatorStyle({
          width: tabRect.width,
          left: tabRect.left - containerRect.left,
        });
      }
    }
  }, [value, variant, children]);

  const variants = {
    underline: {
      container: {
        borderBottom: `1px solid ${colors.border}`,
        position: 'relative',
      },
      tab: {
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
      },
      activeTab: {
        color: colors.primary,
      },
    },
    pills: {
      container: {
        background: colors.backgroundSoft,
        borderRadius: borderRadius.default,
        padding: spacing[1],
      },
      tab: {
        background: 'transparent',
        border: 'none',
        borderRadius: borderRadius.default - 2,
      },
      activeTab: {
        background: colors.background,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        color: colors.primary,
      },
    },
    segmented: {
      container: {
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.default,
        overflow: 'hidden',
      },
      tab: {
        background: 'transparent',
        border: 'none',
        borderRight: `1px solid ${colors.border}`,
        borderRadius: 0,
      },
      activeTab: {
        background: colors.primary,
        color: colors.white,
      },
    },
  };

  const variantStyle = variants[variant] || variants.underline;

  return (
    <div
      ref={tabsRef}
      style={{
        display: 'flex',
        width: fullWidth ? '100%' : 'auto',
        ...variantStyle.container,
        ...style,
      }}
      role="tablist"
      {...props}
    >
      {/* Tabs */}
      {Array.isArray(children) &&
        children.map((child, index) => {
          if (!child) return null;
          const isActive = child.props.value === value;
          const isLast = index === children.length - 1;

          return (
            <button
              key={child.props.value}
              ref={(el) => (tabRefs.current[child.props.value] = el)}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange?.(child.props.value)}
              style={{
                flex: fullWidth ? 1 : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing[2],
                padding: `${spacing[3]}px ${spacing[4]}px`,
                fontSize: typography.fontSize.sm,
                fontWeight: isActive ? typography.fontWeight.semibold : typography.fontWeight.regular,
                fontFamily: typography.fontFamily.body,
                color: isActive ? variantStyle.activeTab?.color || colors.primary : colors.textSecondary,
                cursor: 'pointer',
                transition: `all ${transitions.duration.fast}ms ease`,
                ...variantStyle.tab,
                ...(isActive ? variantStyle.activeTab : {}),
                ...(variant === 'segmented' && isLast ? { borderRight: 'none' } : {}),
              }}
            >
              {child.props.icon && (
                <span style={{ fontSize: 16 }}>{child.props.icon}</span>
              )}
              {child.props.label}
              {child.props.badge !== undefined && (
                <span
                  style={{
                    minWidth: 18,
                    height: 18,
                    padding: '0 5px',
                    borderRadius: borderRadius.circle,
                    background: isActive ? colors.primary : colors.textMuted,
                    color: colors.white,
                    fontSize: 10,
                    fontWeight: typography.fontWeight.semibold,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {child.props.badge}
                </span>
              )}
            </button>
          );
        })}

      {/* Animated underline indicator */}
      {variant === 'underline' && (
        <div
          style={{
            position: 'absolute',
            bottom: -1,
            height: 2,
            background: colors.primary,
            transition: `all ${transitions.duration.fast}ms ease`,
            ...indicatorStyle,
          }}
        />
      )}
    </div>
  );
}

// =============================================================================
// TAB (Individual tab definition)
// =============================================================================

export function Tab({ value, label, icon, badge, disabled }) {
  // This is a configuration component, rendering is handled by Tabs
  return null;
}

// =============================================================================
// TAB PANELS
// =============================================================================

export function TabPanels({ children, value, style, ...props }) {
  return (
    <div style={style} {...props}>
      {Array.isArray(children)
        ? children.find((child) => child?.props?.value === value)
        : children}
    </div>
  );
}

export function TabPanel({ children, value, style, ...props }) {
  return (
    <div
      role="tabpanel"
      style={{
        animation: `fadeIn ${transitions.duration.default}ms ease-out`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Tabs;
