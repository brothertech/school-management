'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchExamAnalytics } from '@/store/examSlice';

const ExamAnalytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { analytics } = useSelector((s: RootState) => s.exam);

  useEffect(() => {
    dispatch(fetchExamAnalytics());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between"><span>Total Exams</span><span className="font-semibold">{analytics?.totalExams ?? '-'}</span></div>
          <div className="flex justify-between"><span>Active Exams</span><span className="font-semibold">{analytics?.activeExams ?? '-'}</span></div>
          <div className="flex justify-between"><span>Closed Exams</span><span className="font-semibold">{analytics?.closedExams ?? '-'}</span></div>
          <div className="flex justify-between"><span>Average Score</span><span className="font-semibold">{analytics?.averageScore ?? '-'}</span></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Charts</h3>
        <p className="text-gray-600 dark:text-gray-400">Charts integration pending. Placeholder shown.</p>
      </div>
    </div>
  );
};

export default ExamAnalytics;