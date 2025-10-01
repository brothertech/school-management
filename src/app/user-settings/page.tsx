'use client';

import { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import PreferencesSettings from './components/PreferencesSettings';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';
// import ProfileSettings from './components/ProfileSettings';
// import PreferencesSettings from './components/PreferencesSettings';
// import NotificationSettings from './components/NotificationSettings';
// import SecuritySettings from './components/SecuritySettings';

type UserSettingsTab = 'profile' | 'preferences' | 'notifications' | 'security';

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState<UserSettingsTab>('profile');

  const tabs = [
    { id: 'profile' as UserSettingsTab, label: 'Profile', icon: '👤' },
    { id: 'preferences' as UserSettingsTab, label: 'Preferences', icon: '⚙️' },
    { id: 'notifications' as UserSettingsTab, label: 'Notifications', icon: '🔔' },
    { id: 'security' as UserSettingsTab, label: 'Security', icon: '🔒' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'preferences':
        return <PreferencesSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your personal settings and preferences.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}