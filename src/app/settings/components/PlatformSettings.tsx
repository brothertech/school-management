'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { getSupportedLocales } from '@/config/i18nConfig';

export default function PlatformSettings() {
  const { settings, updateSettings } = useSettings();
  const supportedLocales = getSupportedLocales();

  const handleLocaleChange = (localeCode: string) => {
    updateSettings({ defaultLocale: localeCode });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h2>
        <p className="text-sm text-gray-600 mb-6">
          Configure default platform settings that apply to all users who haven't set personal preferences.
        </p>
      </div>

      {/* Default Language Setting */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Default Language</h3>
        <p className="text-sm text-gray-600 mb-4">
          Set the default language for the platform. Users who haven't selected a personal preference will see the platform in this language.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportedLocales.map((locale) => (
            <div
              key={locale.code}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.defaultLocale === locale.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleLocaleChange(locale.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{locale.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{locale.name}</div>
                  <div className="text-sm text-gray-500">{locale.code}</div>
                </div>
                {settings.defaultLocale === locale.code && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              Current default language: <strong>{settings.defaultLocale.toUpperCase()}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Additional platform settings can be added here */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Additional Settings</h3>
        <p className="text-sm text-gray-600">
          More platform-wide settings will be available here in future updates.
        </p>
      </div>
    </div>
  );
}