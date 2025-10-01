'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';
import { Exam } from '@/types/exam';

interface ExamCardProps {
  exam: Exam;
  onView?: (exam: Exam) => void;
  onEdit?: (exam: Exam) => void;
  onStart?: (exam: Exam) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onView, onEdit, onStart }) => {
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
            <CardDescription>
              {exam.subject} • {exam.classSection}
            </CardDescription>
          </div>
          <div>{statusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 justify-end">
          {onView && (
            <Button variant="outline" size="sm" onClick={() => onView(exam)}>View</Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(exam)}>Edit</Button>
          )}
          {onStart && (
            <Button variant="outline" size="sm" disabled={exam.status !== 'upcoming'} onClick={() => onStart(exam)}>Start</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamCard;