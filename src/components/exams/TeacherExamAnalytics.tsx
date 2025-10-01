'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExamPerformanceDashboard from '@/components/cbt/ExamPerformanceDashboard';
import ClassPerformanceChart from '@/components/cbt/ClassPerformanceChart';
import { mockExams } from '@/data/examData';

export default function TeacherExamAnalytics() {
  const [selectedExamId, setSelectedExamId] = useState<string>('');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500">Select Exam</label>
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="min-w-64 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="">All exams</option>
                {mockExams.map((e) => (
                  <option key={e.id} value={e.id}>{e.title}</option>
                ))}
              </select>
            </div>
          </div>

          <ExamPerformanceDashboard selectedExamId={selectedExamId || undefined} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Class Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassPerformanceChart />
        </CardContent>
      </Card>
    </div>
  );
}