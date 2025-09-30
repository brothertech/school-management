import { i18nConfig } from '@/config/i18nConfig';

export function getPathWithLocale(path: string, locale: string): string {
  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove any existing locale prefix
  const pathWithoutLocale = normalizedPath.replace(
    new RegExp(`^/(${i18nConfig.locales.map(l => l.code).join('|')})`),
    ''
  );
  
  // Add the new locale prefix
  return `/${locale}${pathWithoutLocale}`;
}

export function getLocaleFromPath(path: string): string | null {
  const match = path.match(new RegExp(`^/(${i18nConfig.locales.map(l => l.code).join('|')})`));
  return match ? match[1] : null;
}

export function removeLocaleFromPath(path: string): string {
  return path.replace(
    new RegExp(`^/(${i18nConfig.locales.map(l => l.code).join('|')})`),
    ''
  ) || '/';
}

export function isLocaleSupported(locale: string): boolean {
  return i18nConfig.locales.some(l => l.code === locale);
}

export function getDefaultLocale(): string {
  return i18nConfig.defaultLocale;
}

export function getSupportedLocales() {
  return i18nConfig.locales;
}

// Helper function to generate href for Next.js Link components
export function createLocalizedHref(path: string, locale: string): string {
  return getPathWithLocale(path, locale);
}

// Helper function to get current locale from URL (for use in components)
export function useCurrentLocale(): string {
  // This would typically be used with usePathname from next/navigation
  // For now, it's a placeholder that can be implemented in components
  return getDefaultLocale();
}