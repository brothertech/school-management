'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { UserRole } from '@/context/AuthContext';

interface DashboardWidgets {
  clockIn: boolean;
  birthdays: boolean;
}

type RoleWidgets = Record<UserRole, DashboardWidgets>;

interface PlatformSettings {
  defaultLocale: string;
  dashboardWidgets: RoleWidgets;
}

interface SettingsContextType {
  settings: PlatformSettings;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  updateDashboardWidgets: (role: UserRole, updates: Partial<DashboardWidgets>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'platformSettings';

// Default settings
const defaultSettings: PlatformSettings = {
  defaultLocale: 'en',
  dashboardWidgets: {
    admin: { clockIn: true, birthdays: true },
    teacher: { clockIn: true, birthdays: true },
    student: { clockIn: false, birthdays: false },
    parent: { clockIn: false, birthdays: false },
  },
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);

  // Load persisted settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PlatformSettings;
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (_) {
      // ignore corrupted storage
    }
  }, []);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (_) {
      // ignore write errors
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  const updateDashboardWidgets = (role: UserRole, updates: Partial<DashboardWidgets>) => {
    setSettings(prev => ({
      ...prev,
      dashboardWidgets: {
        ...prev.dashboardWidgets,
        [role]: {
          ...prev.dashboardWidgets[role],
          ...updates,
        },
      },
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateDashboardWidgets }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}