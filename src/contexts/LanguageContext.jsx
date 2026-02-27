/**
 * LANGUAGE CONTEXT
 * ================
 * Provides localization support for Korean and English.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { en, ko, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../locales';

const translations = { en, ko };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Try to get saved language from localStorage, fallback to default
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gofresh-language');
      if (saved && translations[saved]) {
        return saved;
      }
    }
    return DEFAULT_LANGUAGE;
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('gofresh-language', language);
    // Set document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Get translation function
  const t = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key;
          }
        }
        break;
      }
    }

    // If value is still an object, return key
    if (typeof value === 'object') {
      console.warn(`Translation key "${key}" points to an object, not a string`);
      return key;
    }

    // Replace parameters like {count} with actual values
    if (typeof value === 'string' && params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
      });
    }

    return value || key;
  }, [language]);

  // Change language
  const setLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
    } else {
      console.warn(`Language "${lang}" not supported`);
    }
  }, []);

  // Toggle between languages
  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'ko' : 'en');
  }, []);

  // Get current language info
  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isKorean: language === 'ko',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
