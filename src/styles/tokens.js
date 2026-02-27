/**
 * DESIGN TOKENS - Single Source of Truth
 * =======================================
 *
 * This file contains ALL design tokens for the application.
 * To change the entire look and feel, modify values here only.
 *
 * Based on: GoFresh × GlobalMart Design System v2.0
 *
 * HOW TO USE:
 * -----------
 * import { tokens } from './tokens';
 *
 * // Access colors
 * tokens.colors.primary
 *
 * // Access typography
 * tokens.typography.fontFamily.heading
 *
 * // Access spacing
 * tokens.spacing[4] // 16px
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
  // Primary Brand Colors
  primary: '#2D6A4F',        // Forest green - brand anchor
  primaryLight: '#40916C',   // Hover states, secondary badges
  primaryDark: '#1B4332',    // Hero headlines, footer, high-emphasis

  // Accent & Signal Colors
  accent: '#FF6B35',         // Primary CTA, cart badge, attention
  accentLight: '#FF8C5A',    // Accent hover state only
  sale: '#E63946',           // Sale badges, discounts, urgency
  star: '#F59E0B',           // Star ratings ONLY
  loyalty: '#D4A847',        // Loyalty badges, rewards

  // Neutrals & Surfaces
  background: '#FFFFFF',     // Main canvas, modals
  backgroundSoft: '#F5F7F4', // Card fills, section backgrounds
  backgroundCard: '#FFFFFF', // Product cards, overlays

  // Text Colors
  text: '#1A1A2E',           // Headlines, product names, prices
  textSecondary: '#6B7280',  // Descriptions, meta info
  textMuted: '#9CA3AF',      // Placeholders, timestamps, disabled

  // Border Colors
  border: '#E8ECE6',         // Card borders, dividers
  borderFocus: '#2D6A4F',    // Input focus (same as primary)

  // Semantic Colors
  success: '#2D7D3F',
  warning: '#D4920B',
  error: '#D32F2F',
  info: '#2B6CB0',

  // Static Colors (don't change with theme)
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Dark Mode Colors (optional - swap with colors object for dark theme)
export const darkColors = {
  primary: '#52B788',        // Lightened for contrast
  primaryLight: '#74C69D',
  primaryDark: '#40916C',

  accent: '#FF6B35',         // Keep same
  accentLight: '#FF8C5A',
  sale: '#E63946',
  star: '#F59E0B',
  loyalty: '#D4A847',

  background: '#0F1A14',
  backgroundSoft: '#1A2E23',
  backgroundCard: '#162A1F',

  text: '#F0F4F1',
  textSecondary: '#9CA89F',
  textMuted: '#6B7A6F',

  border: '#2A3D31',
  borderFocus: '#52B788',

  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    heading: "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif",
    body: "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font Sizes (in px)
  fontSize: {
    xs: 11,      // Micro labels, badges
    sm: 12,      // Captions, meta
    base: 14,    // Body, card titles
    md: 13,      // Body small
    lg: 16,      // Price large
    xl: 20,      // Section heading
    '2xl': 24,   // Page title
    '3xl': 32,   // Hero display
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.15,
    snug: 1.25,
    normal: 1.4,
    relaxed: 1.5,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.01em',
    tight: '-0.005em',
    normal: '0',
    wide: '0.02em',
    wider: '0.08em',
  },
};

// =============================================================================
// SPACING TOKENS (4px base)
// =============================================================================

export const spacing = {
  0: 0,
  1: 4,    // Inline icon gaps
  2: 8,    // Badge padding, chip gaps
  3: 12,   // Card padding compact, button vertical
  4: 16,   // Card padding standard, grid gutters
  5: 20,   // Major section padding
  6: 24,   // Banner padding
  8: 32,   // Page section separation
  10: 40,  // Hero vertical padding
  12: 48,  // Major section breaks
  16: 64,
  20: 80,
  24: 96,
};

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const borderRadius = {
  none: 0,
  default: 4,    // Universal default - buttons, cards, inputs, badges
  pill: 20,      // Category chips, tags, toggles
  circle: '50%', // Avatars, notification dots
  // IMPORTANT: Only use 4px, 20px, or 50%. Never 0px, 8px, 12px, 16px
};

// =============================================================================
// SHADOW TOKENS (Green-tinted, not pure black)
// =============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 3px rgba(45, 106, 79, 0.06), 0 1px 2px rgba(45, 106, 79, 0.04)',
  md: '0 4px 12px rgba(45, 106, 79, 0.12)',
  lg: '0 8px 24px rgba(45, 106, 79, 0.15)',
  // Special shadows
  card: '0 1px 3px rgba(45, 106, 79, 0.06), 0 1px 2px rgba(45, 106, 79, 0.04)',
  cardHover: '0 4px 12px rgba(45, 106, 79, 0.12)',
  modal: '0 8px 24px rgba(45, 106, 79, 0.15)',
  drawer: '-4px 0 20px rgba(45, 106, 79, 0.1)',
};

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

export const transitions = {
  // Durations
  duration: {
    fast: 150,
    default: 200,
    slow: 250,
    drawer: 300,
    skeleton: 1500,
  },

  // Easings
  easing: {
    default: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
    drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
  },

  // Pre-composed transitions
  hover: '150ms ease',
  cardHover: '200ms ease',
  focusRing: '150ms ease-out',
  modalEnter: '250ms ease-out',
  modalExit: '200ms ease-in',
  drawerSlide: '300ms cubic-bezier(0.32, 0.72, 0, 1)',
};

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  mobile: 640,   // < 640px
  tablet: 1024,  // 640-1024px
  desktop: 1280, // > 1024px
};

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 1000,
  overlay: 999,
  toast: 1100,
  tooltip: 1200,
};

// =============================================================================
// COMPONENT-SPECIFIC TOKENS
// =============================================================================

export const components = {
  // Button
  button: {
    padding: {
      sm: { y: 8, x: 16 },
      md: { y: 10, x: 24 },
      lg: { y: 14, x: 32 },
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 14,
    },
    minHeight: 44, // Touch target
    borderRadius: borderRadius.default,
    fontWeight: typography.fontWeight.semibold,
  },

  // Card
  card: {
    padding: {
      compact: spacing[3],
      default: spacing[4],
    },
    borderRadius: borderRadius.default,
    borderWidth: 1,
  },

  // Input
  input: {
    height: 44,
    padding: { y: 12, x: 14 },
    borderRadius: borderRadius.default,
    borderWidth: 1.5,
    fontSize: typography.fontSize.base,
  },

  // Badge
  badge: {
    padding: { y: 4, x: 10 },
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.wide,
  },

  // Search Bar
  searchBar: {
    height: 44,
    borderRadius: borderRadius.default,
    iconSize: 18,
  },

  // Product Card
  productCard: {
    imageHeight: { min: 130, max: 160 },
    badgePosition: { top: 8, left: 8 },
    borderRadius: borderRadius.default,
  },

  // Star Rating
  starRating: {
    size: {
      compact: 14,
      default: 18,
    },
    colorFilled: colors.star,
    colorEmpty: colors.border,
  },

  // Navigation
  nav: {
    height: 64,
    mobileHeight: 'auto',
    cartBadgeColor: colors.accent,
  },

  // Modal
  modal: {
    borderRadius: borderRadius.default,
    maxWidth: {
      sm: 400,
      md: 500,
      lg: 700,
      xl: 900,
    },
  },
};

// =============================================================================
// GRADIENTS
// =============================================================================

export const gradients = {
  promoBanner: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
  heroOverlay: 'rgba(27, 67, 50, 0.55)',
  skeleton: `linear-gradient(90deg, #F5F7F4 0%, #EAEDE8 50%, #F5F7F4 100%)`,
};

// =============================================================================
// CONSOLIDATED TOKENS OBJECT
// =============================================================================

export const tokens = {
  colors,
  darkColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  components,
  gradients,
};

export default tokens;
