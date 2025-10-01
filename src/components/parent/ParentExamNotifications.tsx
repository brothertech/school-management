'use client';

import React, { useMemo, useState } from 'react';
import { mockParentNotifications, mockParentData } from '@/data/parentPortalData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge/Badge';

type FilterType = 'all' | 'exam' | 'attendance' | 'fee' | 'announcement';

const ParentExamNotifications: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedChildId, setSelectedChildId] = useState<string>(mockParentData.children[0]?.id || '');

  const items = useMemo(() => {
    return mockParentNotifications.filter((n) => (filter === 'all' ? true : n.type === filter));
  }, [filter]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {(['all','exam','attendance','fee','announcement'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded border text-sm ${filter === f ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {mockParentData.children.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChildId(c.id)}
                className={`px-3 py-1 rounded border text-sm ${selectedChildId === c.id ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                {c.firstName} {c.lastName}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((n) => (
              <div key={n.id} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-start gap-3">
                <Badge variant="light" color={
                  n.type === 'exam' ? 'primary' : n.type === 'attendance' ? 'warning' : n.type === 'fee' ? 'danger' : 'success'
                }>
                  {n.type}
                </Badge>
                <div className="flex-1">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{n.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleDateString()}</div>
                  {n.relatedTo?.studentName && (
                    <div className="text-xs text-gray-500">For: {n.relatedTo.studentName}</div>
                  )}
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-sm text-gray-500">No notifications for the selected filter.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentExamNotifications;