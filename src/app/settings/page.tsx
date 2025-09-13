'use client';

import { useState } from 'react';
import GradeScaleSettings from './components/GradeScaleSettings';
import AcademicSessionSettings from './components/AcademicSessionSettings';
import TermSettings from './components/TermSettings';
import SchoolProfileSettings from './components/SchoolProfileSettings';


type SettingsTab = 'academic-sessions' | 'terms' | 'grading' | 'school-profile';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('academic-sessions');

  const tabs = [
    { id: 'academic-sessions' as SettingsTab, label: 'Academic Sessions', icon: '📅' },
    { id: 'terms' as SettingsTab, label: 'Terms/Semesters', icon: '📚' },
    { id: 'grading' as SettingsTab, label: 'Grading Scale', icon: '📊' },
    { id: 'school-profile' as SettingsTab, label: 'School Profile', icon: '🏫' },
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
      default:
        return <AcademicSessionSettings />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">
          Manage academic sessions, terms, grading scales, and school profile settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {renderContent()}
      </div>
    </div>
  );
}
