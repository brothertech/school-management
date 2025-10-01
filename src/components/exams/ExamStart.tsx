'use client';

import React from 'react';
import Button from '@/components/ui/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { startExam } from '@/store/examSlice';

interface ExamStartProps {
  examId: string;
  title?: string;
  instructions?: string;
  onStarted?: () => void;
}

const ExamStart: React.FC<ExamStartProps> = ({ examId, title, instructions, onStarted }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((s: RootState) => s.exam);

  const handleStart = async () => {
    await dispatch(startExam(examId));
    onStarted?.();
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>}
      {instructions && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 text-gray-700 dark:text-gray-300">
          {instructions}
        </div>
      )}
      <Button onClick={handleStart} disabled={loading}>Start Exam</Button>
    </div>
  );
};

export default ExamStart;