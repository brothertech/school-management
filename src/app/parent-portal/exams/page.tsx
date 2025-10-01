'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import ParentExamOverview from '@/components/parent/ParentExamOverview';
import ParentResultsList from '@/components/parent/ParentResultsList';
import ParentExamNotifications from '@/components/parent/ParentExamNotifications';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type TabKey = 'overview' | 'results' | 'notifications';

const ParentExamsPage: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('overview');

  return (
    <RoleGuard allowedRoles={["Parent"]}>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded border text-sm ${tab === 'overview' ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setTab('overview')}
              >
                Child Exam Overview
              </button>
              <button
                className={`px-3 py-1 rounded border text-sm ${tab === 'results' ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setTab('results')}
              >
                Results
              </button>
              <button
                className={`px-3 py-1 rounded border text-sm ${tab === 'notifications' ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setTab('notifications')}
              >
                Notifications
              </button>
            </div>
          </CardContent>
        </Card>

        {tab === 'overview' && <ParentExamOverview />}
        {tab === 'results' && <ParentResultsList />}
        {tab === 'notifications' && <ParentExamNotifications />}
      </div>
    </RoleGuard>
  );
};

export default ParentExamsPage;