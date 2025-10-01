'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button/Button';

interface ExamSettingsProps {
  onSave?: (settings: Record<string, any>) => void;
}

const ExamSettings: React.FC<ExamSettingsProps> = ({ onSave }) => {
  const [settings, setSettings] = useState({
    enableCBTModule: true,
    defaultDuration: 60,
    allowMultipleAttempts: false,
    autosaveIntervalMs: 30000,
  });

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <input id="enableCBTModule" type="checkbox" checked={settings.enableCBTModule} onChange={(e) => handleChange('enableCBTModule', e.target.checked)} />
          <label htmlFor="enableCBTModule" className="text-sm text-gray-600 dark:text-gray-400">Enable CBT Module</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">Default Duration (min)</label>
            <input type="number" min={1} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              value={settings.defaultDuration}
              onChange={(e) => handleChange('defaultDuration', Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-2">
            <input id="allowMulti" type="checkbox" checked={settings.allowMultipleAttempts} onChange={(e) => handleChange('allowMultipleAttempts', e.target.checked)} />
            <label htmlFor="allowMulti" className="text-sm text-gray-600 dark:text-gray-400">Allow Multiple Attempts</label>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">Autosave Interval (ms)</label>
            <input type="number" min={5000} step={5000} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              value={settings.autosaveIntervalMs}
              onChange={(e) => handleChange('autosaveIntervalMs', Number(e.target.value))} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onSave?.(settings)}>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamSettings;