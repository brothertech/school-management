'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';
import { ExamWithDetails } from '@/types/exam';

interface ExamDetailsProps {
  exam: ExamWithDetails;
  role: 'Super Admin' | 'Admin' | 'Teacher' | 'Student' | 'Parent';
  onStart?: () => void;
  onEdit?: () => void;
}

const ExamDetails: React.FC<ExamDetailsProps> = ({ exam, role, onStart, onEdit }) => {
  const statusBadge = () => {
    switch (exam.status) {
      case 'upcoming':
        return <Badge variant="light" color="primary">Upcoming</Badge>;
      case 'active':
        return <Badge variant="solid" color="warning">Active</Badge>;
      default:
        return <Badge variant="solid" color="success">Closed</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <CardDescription>{exam.subject} • {exam.classSection}</CardDescription>
          </div>
          <div>{statusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Starts</div>
            <div className="font-medium">{exam.startDate.toLocaleString('en-US')}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Ends</div>
            <div className="font-medium">{exam.endDate.toLocaleString('en-US')}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
            <div className="font-medium">{exam.duration} minutes</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Attempts</div>
            <div className="font-medium">{exam.allowedAttempts}</div>
          </div>
        </div>

        {exam.instructions && (
          <div className="mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Instructions</div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 text-gray-700 dark:text-gray-300">
              {exam.instructions}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          {(role === 'Teacher' || role === 'Admin' || role === 'Super Admin') && (
            <Button variant="outline" onClick={onEdit}>Edit</Button>
          )}
          {(role === 'Student') && (
            <Button onClick={onStart} disabled={exam.status !== 'upcoming'}>Start</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamDetails;