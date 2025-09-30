// Server-side translation utilities

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

export function getTranslation(locale: string, key: string, defaultValue?: string): string {
  const keys = key.split('.');
  let current: any = translations[locale] || translations.en;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to English
      if (locale !== 'en') {
        let fallback: any = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return defaultValue || key;
          }
        }
        return fallback || defaultValue || key;
      }
      return defaultValue || key;
    }
  }
  
  return current || defaultValue || key;
}

export function getAllTranslationsForKeys(keys: string[]): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  
  for (const locale of Object.keys(translations)) {
    result[locale] = {};
    for (const key of keys) {
      result[locale][key] = getTranslation(locale, key);
    }
  }
  
  return result;
}

export function checkTranslationKeysExist(keys: string[]): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  
  for (const key of keys) {
    const keys = key.split('.');
    let current: any = translations.en;
    let exists = true;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        exists = false;
        break;
      }
    }
    
    result[key] = exists;
  }
  
  return result;
}