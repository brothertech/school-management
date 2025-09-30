/**
 * Internationalization (i18n) Configuration
 * Supports multiple languages including Nigerian languages
 */

export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export interface I18nConfig {
  defaultLocale: string;
  locales: LocaleConfig[];
  fallbackLocale: string;
  localeDetection: boolean;
}

// Supported locales configuration
export const i18nConfig: I18nConfig = {
  // Default locale (English)
  defaultLocale: 'en',
  
  // Supported locales with metadata
  locales: [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    },
    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷',
      direction: 'ltr'
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',
      direction: 'ltr'
    },
    // Nigerian languages
    {
      code: 'yo',
      name: 'Yorùbá',
      flag: '🇳🇬',
      direction: 'ltr'
    },
    {
      code: 'ig',
      name: 'Igbo',
      flag: '🇳🇬',
      direction: 'ltr'
    },
    {
      code: 'ha',
      name: 'Hausa',
      flag: '🇳🇬',
      direction: 'ltr'
    },
    {
      code: 'pcm',
      name: 'Nigerian Pidgin',
      flag: '🇳🇬',
      direction: 'ltr'
    }
  ],
  
  // Fallback locale if translation is missing
  fallbackLocale: 'en',
  
  // Enable automatic locale detection
  localeDetection: true
};

// Helper functions
export const getLocaleConfig = (localeCode: string): LocaleConfig => {
  const locale = i18nConfig.locales.find(loc => loc.code === localeCode);
  return locale || {
    code: i18nConfig.defaultLocale,
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  };
};

export const isLocaleSupported = (localeCode: string): boolean => {
  return i18nConfig.locales.some(loc => loc.code === localeCode);
};

export const getSupportedLocales = (): LocaleConfig[] => {
  return i18nConfig.locales;
};