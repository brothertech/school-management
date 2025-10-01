'use client';

import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';
import { Exam } from '@/types/exam';
import { EyeIcon, PencilIcon, TrashBinIcon } from '@/icons';
import { Play } from 'lucide-react';

interface ExamRowProps {
  exam: Exam;
  onView?: (exam: Exam) => void;
  onEdit?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
  onStart?: (exam: Exam) => void;
}

const ExamRow: React.FC<ExamRowProps> = ({ exam, onView, onEdit, onDelete, onStart }) => {
  const getStatusBadge = () => {
    if (exam.status === 'upcoming') return <Badge variant="light" color="primary">Upcoming</Badge>;
    if (exam.status === 'active') return <Badge variant="solid" color="warning">Active</Badge>;
    return <Badge variant="solid" color="success">Closed</Badge>;
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{exam.title}</TableCell>
      <TableCell>{exam.subject}</TableCell>
      <TableCell>{exam.classSection}</TableCell>
      <TableCell>{formatDateTime(exam.startDate)}</TableCell>
      <TableCell>{formatDateTime(exam.endDate)}</TableCell>
      <TableCell>{formatDuration(exam.duration)}</TableCell>
      <TableCell>{exam.allowedAttempts}</TableCell>
      <TableCell>{getStatusBadge()}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-1">
          {onView && (
            <Button variant="outline" size="sm" onClick={() => onView(exam)}>
              <EyeIcon className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(exam)}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          )}
          {onStart && (
            <Button variant="outline" size="sm" disabled={exam.status !== 'upcoming'} onClick={() => onStart(exam)}>
              <Play className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="outline" size="sm" onClick={() => onDelete(exam)}>
              <TrashBinIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ExamRow;