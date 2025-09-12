"use client";

import React from 'react';

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'classes', label: 'Classes', icon: '🏫' },
  { id: 'reports', label: 'Reports', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];

export default function AdminNavigation({ activeTab, onTabChange }: AdminNavigationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <div className="flex overflow-x-auto">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === item.id
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="mr-2 text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}