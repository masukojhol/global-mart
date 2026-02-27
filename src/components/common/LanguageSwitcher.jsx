/**
 * LANGUAGE SWITCHER COMPONENT
 * ===========================
 * Toggle between Korean and English using GoFresh design tokens.
 */

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions, shadows } = tokens;

export function LanguageSwitcher({ variant = 'default', showLabel = true }) {
  const { language, setLanguage, supportedLanguages, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  // Compact toggle variant
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]}px ${spacing[3]}px`,
          background: colors.backgroundSoft,
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.default,
          cursor: 'pointer',
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: colors.text,
          transition: transitions.hover,
        }}
      >
        <span>{currentLanguage.flag}</span>
        {showLabel && <span>{currentLanguage.code.toUpperCase()}</span>}
      </button>
    );
  }

  // Dropdown variant
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]}px ${spacing[3]}px`,
          background: colors.backgroundSoft,
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.default,
          cursor: 'pointer',
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: colors.text,
          transition: transitions.hover,
        }}
      >
        <span style={{ fontSize: 14 }}>{currentLanguage.flag}</span>
        {showLabel && <span>{currentLanguage.code.toUpperCase()}</span>}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: transitions.hover,
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
            }}
          />

          {/* Dropdown */}
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: spacing[1],
            background: colors.background,
            border: `1px solid ${colors.border}`,
            borderRadius: borderRadius.default,
            boxShadow: shadows.medium,
            zIndex: 100,
            minWidth: 140,
            overflow: 'hidden',
          }}>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[3],
                  width: '100%',
                  padding: `${spacing[3]}px ${spacing[4]}px`,
                  background: language === lang.code ? colors.backgroundSoft : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: typography.fontSize.sm,
                  fontWeight: language === lang.code ? typography.fontWeight.semibold : typography.fontWeight.regular,
                  color: language === lang.code ? colors.primary : colors.text,
                  textAlign: 'left',
                  transition: transitions.hover,
                }}
              >
                <span style={{ fontSize: 16 }}>{lang.flag}</span>
                <span>{lang.name}</span>
                {language === lang.code && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2.5"
                    style={{ marginLeft: 'auto' }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSwitcher;
