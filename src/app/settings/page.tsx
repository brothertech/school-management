'use client';

import { useState } from 'react';
import GradeScaleSettings from './components/GradeScaleSettings';
import AcademicSessionSettings from './components/AcademicSessionSettings';
import TermSettings from './components/TermSettings';
import SchoolProfileSettings from './components/SchoolProfileSettings';
import RolesPermissionsSettings from './components/RolesPermissionsSettings';
import ModuleSettings from './components/ModuleSettings';


type SettingsTab = 'academic-sessions' | 'terms' | 'grading' | 'school-profile' | 'roles-permissions' | 'module-settings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('academic-sessions');

  const tabs = [
    { id: 'academic-sessions' as SettingsTab, label: 'Academic Sessions', icon: '📅' },
    { id: 'terms' as SettingsTab, label: 'Terms/Semesters', icon: '📚' },
    { id: 'grading' as SettingsTab, label: 'Grading Scale', icon: '📊' },
    { id: 'school-profile' as SettingsTab, label: 'School Profile', icon: '🏫' },
    { id: 'roles-permissions' as SettingsTab, label: 'Roles & Permissions', icon: '🔑' },
    { id: 'module-settings' as SettingsTab, label: 'Module Settings', icon: '⚙️' }, // NEW TAB
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'academic-sessions':
        return <AcademicSessionSettings />;
      case 'terms':
        return <TermSettings />;
      case 'grading':
        return <GradeScaleSettings />;
      case 'school-profile':
        return <SchoolProfileSettings />;
      case 'roles-permissions':
        return <RolesPermissionsSettings />;
      case 'module-settings':
        return <ModuleSettings />;
      default:
        return <AcademicSessionSettings />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">System Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage academic sessions, terms, grading scales, module settings, and school profile settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {renderContent()}
      </div>
    </div>
  );
}
