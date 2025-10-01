'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TeacherExamList from '@/components/exams/TeacherExamList';
import ExamCreateEdit from '@/components/exams/ExamCreateEdit';
import LiveExamMonitor from '@/components/exams/LiveExamMonitor';
import EssayGrading from '@/components/exams/EssayGrading';
import TeacherExamAnalytics from '@/components/exams/TeacherExamAnalytics';
import RoleGuard from '@/components/auth/RoleGuard';

type TabId = 'list' | 'create' | 'monitor' | 'grading' | 'analytics';

export default function TeacherExamsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('list');
  const [showCreateInline, setShowCreateInline] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    // Would dispatch create exam action
    alert('Exam saved: ' + data.title);
    setActiveTab('list');
  };

  return (
    <RoleGuard allowedRoles={['Teacher', 'Super Admin', 'Admin']} fallback="You do not have access to Teacher Exams.">
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          <Button variant={activeTab === 'list' ? 'primary' : 'outline'} onClick={() => setActiveTab('list')}>My Exams</Button>
          <Button variant={activeTab === 'create' ? 'primary' : 'outline'} onClick={() => setActiveTab('create')}>Create/Edit</Button>
          <Button variant={activeTab === 'monitor' ? 'primary' : 'outline'} onClick={() => setActiveTab('monitor')}>Monitor Live</Button>
          <Button variant={activeTab === 'grading' ? 'primary' : 'outline'} onClick={() => setActiveTab('grading')}>Grading & Feedback</Button>
          <Button variant={activeTab === 'analytics' ? 'primary' : 'outline'} onClick={() => setActiveTab('analytics')}>Analytics</Button>
        </div>

        {activeTab === 'list' && (
          <TeacherExamList onCreate={() => setActiveTab('create')} />
        )}

        {activeTab === 'create' && (
          <Card>
            <CardHeader>
              <CardTitle>Create/Edit Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <ExamCreateEdit onSubmit={onSubmit} />
            </CardContent>
          </Card>
        )}

        {activeTab === 'monitor' && (
          <LiveExamMonitor />
        )}

        {activeTab === 'grading' && (
          <EssayGrading />
        )}

        {activeTab === 'analytics' && (
          <TeacherExamAnalytics />
        )}
      </div>
    </RoleGuard>
  );
}