// M&S-inspired Design System Theme

export const theme = {
  colors: {
    // Brand
    brandPrimary: "#000000",
    brandWhite: "#FFFFFF",
    brandOffwhite: "#F8F7F5",
    brandBlue: "#1557FF",

    // Text
    textPrimary: "#1A1A1A",
    textBody: "#333333",
    textSecondary: "#666666",
    textMuted: "#999999",
    textDisabled: "#BDBDBD",

    // UI/Functional
    uiSale: "#C8102E",
    uiRocket: "#1557FF",
    uiSuccess: "#2D7D3F",
    uiWarning: "#D4920B",
    uiError: "#D32F2F",
    uiInfo: "#2B6CB0",

    // Rewards/Loyalty
    rewardGold: "#C8A951",
    rewardLight: "#F5EDD6",

    // Surfaces
    surfaceWhite: "#FFFFFF",
    surfaceCream: "#FAF9F7",
    surfaceLight: "#F5F5F3",
    surfaceSubtle: "#EDEDEB",

    // Borders
    borderLight: "#E8E8E6",
    borderMedium: "#D0D0CE",
    borderDark: "#A0A09E",
    borderFocus: "#000000",
  },

  fonts: {
    primary: "'Raleway', 'Gill Sans', sans-serif",
    body: "'Libre Franklin', 'Source Sans Pro', sans-serif",
    accent: "'Cormorant Garamond', 'Playfair Display', serif",
    mono: "'DM Mono', 'SF Mono', monospace",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    xxl: "64px",
    xxxl: "96px",
  },

  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
  },

  shadows: {
    none: "none",
    hover: "0 4px 20px rgba(0, 0, 0, 0.08)",
    modal: "0 16px 48px rgba(0, 0, 0, 0.12)",
    card: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },

  transitions: {
    default: "0.25s ease",
    slow: "0.4s ease",
    fast: "0.15s ease",
  },
};

export const cssVariables = {
  "--brand-primary": theme.colors.brandPrimary,
  "--brand-white": theme.colors.brandWhite,
  "--brand-offwhite": theme.colors.brandOffwhite,
  "--brand-blue": theme.colors.brandBlue,
  "--text-primary": theme.colors.textPrimary,
  "--text-body": theme.colors.textBody,
  "--text-secondary": theme.colors.textSecondary,
  "--text-muted": theme.colors.textMuted,
  "--ui-sale": theme.colors.uiSale,
  "--ui-rocket": theme.colors.uiRocket,
  "--ui-success": theme.colors.uiSuccess,
  "--ui-error": theme.colors.uiError,
  "--reward-gold": theme.colors.rewardGold,
  "--reward-light": theme.colors.rewardLight,
  "--surface-cream": theme.colors.surfaceCream,
  "--surface-light": theme.colors.surfaceLight,
  "--border-light": theme.colors.borderLight,
  "--border-medium": theme.colors.borderMedium,
  "--font-primary": theme.fonts.primary,
  "--font-body": theme.fonts.body,
  "--font-accent": theme.fonts.accent,
  "--font-mono": theme.fonts.mono,
};

export default theme;
