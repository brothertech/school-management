'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getSupportedLocales } from '@/lib/routing';
import { useSettings } from '@/context/SettingsContext';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { settings, updateSettings } = useSettings();
  
  const currentLocale = settings.defaultLocale || 'en';
  const locales = getSupportedLocales().map(locale => locale.code);
  
  const handleLanguageChange = (newLocale: string) => {
    // Set language preference in localStorage
    localStorage.setItem('preferred-locale', newLocale);
    
    // Also set a cookie for server-side consistency
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Update settings context to trigger re-render with new language
    updateSettings({ ...settings, defaultLocale: newLocale });
    setIsOpen(false);
  };
  
  const getLanguageName = (code: string) => {
    const names: Record<string, string> = {
      en: 'English',
      fr: 'Français',
      es: 'Español',
      yo: 'Yorùbá',
      ha: 'Hausa',
      ig: 'Igbo'
    };
    return names[code] || code;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="w-5 h-5 text-xs font-bold text-center bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
          {currentLocale.toUpperCase()}
        </span>
        <span className="hidden sm:block">{getLanguageName(currentLocale)}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${
                  currentLocale === locale
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
              >
                <span className="w-5 h-5 mr-2 text-xs font-bold text-center bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  {locale.toUpperCase()}
                </span>
                {getLanguageName(locale)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;