'use client';

import { useState } from 'react';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';

interface NotificationPreferences {
  email: {
    announcements: boolean;
    assignments: boolean;
    grades: boolean;
    messages: boolean;
  };
  push: {
    announcements: boolean;
    assignments: boolean;
    grades: boolean;
    messages: boolean;
  };
  sms: {
    urgent: boolean;
    reminders: boolean;
  };
}

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    email: {
      announcements: true,
      assignments: true,
      grades: true,
      messages: false,
    },
    push: {
      announcements: true,
      assignments: false,
      grades: true,
      messages: true,
    },
    sms: {
      urgent: true,
      reminders: false,
    },
  });

  const handleToggle = (category: keyof NotificationPreferences, setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save notification preferences
    console.log('Saving notification preferences:', notifications);
  };

  const NotificationSection = ({ 
    title, 
    category, 
    settings 
  }: { 
    title: string; 
    category: keyof NotificationPreferences; 
    settings: { key: string; label: string; description: string }[] 
  }) => (
    <div>
      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
        {title}
      </h4>
      <div className="space-y-3">
        {settings.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[category][key as keyof typeof notifications[typeof category]]}
                onChange={() => handleToggle(category, key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Choose how you want to be notified about important updates and activities.
        </p>
      </div>

      <NotificationSection
        title="Email Notifications"
        category="email"
        settings={[
          { key: 'announcements', label: 'Announcements', description: 'School-wide announcements and news' },
          { key: 'assignments', label: 'Assignments', description: 'New assignments and due date reminders' },
          { key: 'grades', label: 'Grades', description: 'Grade updates and report cards' },
          { key: 'messages', label: 'Messages', description: 'Direct messages from teachers and staff' },
        ]}
      />

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <NotificationSection
          title="Push Notifications"
          category="push"
          settings={[
            { key: 'announcements', label: 'Announcements', description: 'Instant notifications for urgent announcements' },
            { key: 'assignments', label: 'Assignments', description: 'Real-time assignment notifications' },
            { key: 'grades', label: 'Grades', description: 'Immediate grade update notifications' },
            { key: 'messages', label: 'Messages', description: 'Instant message notifications' },
          ]}
        />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <NotificationSection
          title="SMS Notifications"
          category="sms"
          settings={[
            { key: 'urgent', label: 'Urgent Alerts', description: 'Emergency notifications and critical updates' },
            { key: 'reminders', label: 'Reminders', description: 'Important deadline and event reminders' },
          ]}
        />
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave}>
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
}