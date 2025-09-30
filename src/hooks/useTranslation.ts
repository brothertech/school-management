'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPath, getDefaultLocale } from '@/lib/routing';
import { useSettings } from '@/context/SettingsContext';

// Import all locale files
import enTranslations from '@/locales/en.json';
import frTranslations from '@/locales/fr.json';
import haTranslations from '@/locales/ha.json';
import igTranslations from '@/locales/ig.json';
import yoTranslations from '@/locales/yo.json';

// Map locale codes to translation objects
const translations: Record<string, any> = {
  en: enTranslations,
  fr: frTranslations,
  ha: haTranslations,
  ig: igTranslations,
  yo: yoTranslations,
};

export function useTranslation() {
  const pathname = usePathname();
  const { settings } = useSettings();
  
  // Get locale from localStorage, cookie, or default settings
  const getPreferredLocale = (): string => {
    // Check localStorage first (client-side preference)
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('preferred-locale');
      if (storedLocale) return storedLocale;
    }
    
    // Check cookie (server-side preference)
    if (typeof document !== 'undefined') {
      const cookieMatch = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
      if (cookieMatch && cookieMatch[1]) return cookieMatch[1];
    }
    
    // Fallback to settings or default
    return settings.defaultLocale || getDefaultLocale();
  };
  
  const locale = getPreferredLocale();

  const t = (key: string, defaultValue?: string): string => {
    // Split the key by dots to navigate the translation object
    const keys = key.split('.');
    
    // Try to get translation from current locale
    let result = getNestedTranslation(translations[locale], keys);
    if (result !== undefined) return result;
    
    // Fallback to default locale if different from current locale
    if (settings.defaultLocale && settings.defaultLocale !== locale) {
      result = getNestedTranslation(translations[settings.defaultLocale], keys);
      if (result !== undefined) return result;
    }
    
    // Fallback to English
    if (locale !== 'en') {
      result = getNestedTranslation(translations.en, keys);
      if (result !== undefined) return result;
    }
    
    // If no translation found anywhere, handle missing translation
    return handleMissingTranslation(key, defaultValue);
  };

  return { t, locale };
}

function getNestedTranslation(translationObj: any, keys: string[]): string | undefined {
  let current = translationObj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

function handleMissingTranslation(key: string, defaultValue?: string): string {
  // In development, show a clear indicator for missing translations
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    return `[missing: ${key}]`;
  }
  
  // In production, use defaultValue if provided, otherwise return the key
  return defaultValue || key;
}

export function getTranslation(locale: string, key: string, defaultValue?: string): string {
  const keys = key.split('.');
  
  // Try to get translation from requested locale
  let result = getNestedTranslation(translations[locale], keys);
  if (result !== undefined) return result;
  
  // Fallback to English
  if (locale !== 'en') {
    result = getNestedTranslation(translations.en, keys);
    if (result !== undefined) return result;
  }
  
  // If no translation found anywhere, handle missing translation
  return handleMissingTranslation(key, defaultValue);
}