'use client';

import { useSettings } from '@/context/SettingsContext';
import { getDefaultLocale } from '@/lib/routing';

export function useCurrentLocale() {
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
  
  return getPreferredLocale();
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useCurrentLocale();
  
  // This component doesn't render html tag, just provides the locale context
  return <>{children}</>;
}