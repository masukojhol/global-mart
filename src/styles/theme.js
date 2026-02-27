/**
 * THEME - Design System Configuration
 * ====================================
 *
 * This file imports tokens and creates theme-aware configurations.
 * It provides backward compatibility with existing components.
 *
 * For NEW components: Import { tokens } from './tokens'
 * For EXISTING components: Import { theme } from './theme'
 */

import {
  tokens,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
} from './tokens';

// =============================================================================
// THEME OBJECT (Backward compatible + Enhanced)
// =============================================================================

export const theme = {
  // Colors - mapped from tokens
  colors: {
    // Brand (Primary)
    brandPrimary: colors.primary,
    brandPrimaryLight: colors.primaryLight,
    brandPrimaryDark: colors.primaryDark,
    brandWhite: colors.white,
    brandOffwhite: colors.backgroundSoft,

    // Accent
    accent: colors.accent,
    accentLight: colors.accentLight,

    // Text
    textPrimary: colors.text,
    textBody: colors.text,
    textSecondary: colors.textSecondary,
    textMuted: colors.textMuted,
    textDisabled: colors.textMuted,

    // UI/Functional
    uiSale: colors.sale,
    uiStar: colors.star,
    uiSuccess: colors.success,
    uiWarning: colors.warning,
    uiError: colors.error,
    uiInfo: colors.info,

    // Rewards/Loyalty
    rewardGold: colors.loyalty,
    rewardLight: '#F5EDD6',

    // Surfaces
    surfaceWhite: colors.background,
    surfaceCream: colors.backgroundSoft,
    surfaceLight: colors.backgroundSoft,
    surfaceSubtle: colors.backgroundSoft,

    // Borders
    borderLight: colors.border,
    borderMedium: colors.border,
    borderDark: colors.textMuted,
    borderFocus: colors.borderFocus,

    // Direct token access
    ...colors,
  },

  // Fonts - mapped from tokens
  fonts: {
    primary: typography.fontFamily.heading,
    heading: typography.fontFamily.heading,
    body: typography.fontFamily.body,
    accent: typography.fontFamily.heading, // No separate accent font
    mono: typography.fontFamily.mono,
  },

  // Font Weights
  fontWeight: typography.fontWeight,

  // Font Sizes
  fontSize: typography.fontSize,

  // Spacing
  spacing: {
    xs: `${spacing[1]}px`,
    sm: `${spacing[2]}px`,
    md: `${spacing[4]}px`,
    lg: `${spacing[6]}px`,
    xl: `${spacing[10]}px`,
    xxl: `${spacing[16]}px`,
    xxxl: `${spacing[24]}px`,
    // Numeric access
    ...Object.fromEntries(
      Object.entries(spacing).map(([key, value]) => [key, `${value}px`])
    ),
  },

  // Border Radius
  borderRadius: {
    none: borderRadius.none,
    default: borderRadius.default,
    sm: borderRadius.default,
    md: borderRadius.default,
    lg: borderRadius.default,
    pill: borderRadius.pill,
    circle: borderRadius.circle,
    full: borderRadius.circle,
  },

  // Breakpoints
  breakpoints: {
    mobile: breakpoints.mobile,
    tablet: breakpoints.tablet,
    desktop: breakpoints.desktop,
  },

  // Shadows
  shadows: {
    none: shadows.none,
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
    hover: shadows.cardHover,
    modal: shadows.modal,
    card: shadows.card,
    cardHover: shadows.cardHover,
    drawer: shadows.drawer,
  },

  // Transitions
  transitions: {
    default: transitions.hover,
    slow: transitions.modalEnter,
    fast: `${transitions.duration.fast}ms ease`,
    hover: transitions.hover,
    cardHover: transitions.cardHover,
    modal: transitions.modalEnter,
  },

  // Gradients
  gradients: {
    promoBanner: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
    heroOverlay: 'rgba(27, 67, 50, 0.55)',
  },
};

// =============================================================================
// CSS VARIABLES (for CSS-in-JS or inline style injection)
// =============================================================================

export const cssVariables = {
  // Colors
  '--color-primary': colors.primary,
  '--color-primary-light': colors.primaryLight,
  '--color-primary-dark': colors.primaryDark,
  '--color-accent': colors.accent,
  '--color-accent-light': colors.accentLight,
  '--color-sale': colors.sale,
  '--color-star': colors.star,
  '--color-loyalty': colors.loyalty,

  '--color-bg': colors.background,
  '--color-bg-soft': colors.backgroundSoft,
  '--color-bg-card': colors.backgroundCard,

  '--color-text': colors.text,
  '--color-text-secondary': colors.textSecondary,
  '--color-text-muted': colors.textMuted,

  '--color-border': colors.border,
  '--color-border-focus': colors.borderFocus,

  '--color-success': colors.success,
  '--color-warning': colors.warning,
  '--color-error': colors.error,
  '--color-info': colors.info,

  // Typography
  '--font-heading': typography.fontFamily.heading,
  '--font-body': typography.fontFamily.body,
  '--font-mono': typography.fontFamily.mono,

  // Spacing
  '--space-1': `${spacing[1]}px`,
  '--space-2': `${spacing[2]}px`,
  '--space-3': `${spacing[3]}px`,
  '--space-4': `${spacing[4]}px`,
  '--space-5': `${spacing[5]}px`,
  '--space-6': `${spacing[6]}px`,
  '--space-8': `${spacing[8]}px`,
  '--space-10': `${spacing[10]}px`,
  '--space-12': `${spacing[12]}px`,

  // Border Radius
  '--radius': `${borderRadius.default}px`,
  '--radius-pill': `${borderRadius.pill}px`,
  '--radius-circle': borderRadius.circle,

  // Shadows
  '--shadow-sm': shadows.sm,
  '--shadow-md': shadows.md,
  '--shadow-lg': shadows.lg,

  // Transitions
  '--transition-fast': `${transitions.duration.fast}ms`,
  '--transition-default': `${transitions.duration.default}ms`,
  '--transition-slow': `${transitions.duration.slow}ms`,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get spacing value in pixels
 * @param {number} key - Spacing key (1, 2, 3, 4, etc.)
 * @returns {number} Spacing value in pixels
 */
export const getSpacing = (key) => spacing[key] || 0;

/**
 * Get color value
 * @param {string} key - Color key
 * @returns {string} Color hex value
 */
export const getColor = (key) => colors[key] || key;

/**
 * Get border radius value
 * @param {string} variant - 'default' | 'pill' | 'circle' | 'none'
 * @returns {number|string} Border radius value
 */
export const getRadius = (variant = 'default') => borderRadius[variant] || borderRadius.default;

/**
 * Get shadow value
 * @param {string} variant - 'sm' | 'md' | 'lg' | 'card' | 'modal'
 * @returns {string} Shadow CSS value
 */
export const getShadow = (variant = 'sm') => shadows[variant] || shadows.none;

// =============================================================================
// EXPORTS
// =============================================================================

export { tokens, colors, typography, spacing, borderRadius, shadows, transitions, breakpoints };

export default theme;
