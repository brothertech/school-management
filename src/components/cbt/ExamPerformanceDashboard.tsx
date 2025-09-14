'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mockExams } from '@/data/examData';
import { getAllExamResults, getClassPerformanceStats } from '@/data/examResultsData';

interface ExamPerformanceDashboardProps {
  selectedExamId?: string;
}

const ExamPerformanceDashboard: React.FC<ExamPerformanceDashboardProps> = ({ selectedExamId }) => {
  const allResults = getAllExamResults();
  const classStats = getClassPerformanceStats();
  
  // Filter results if a specific exam is selected
  const filteredResults = selectedExamId 
    ? allResults.filter(result => result.examId === selectedExamId)
    : allResults;

  // Calculate overall statistics
  const totalExams = mockExams.length;
  const completedExams = mockExams.filter(exam => exam.status === 'closed').length;
  const activeExams = mockExams.filter(exam => exam.status === 'active').length;
  const upcomingExams = mockExams.filter(exam => exam.status === 'upcoming').length;

  const totalStudents = new Set(filteredResults.map(result => result.studentId)).size;
  const completedAttempts = filteredResults.filter(result => !result.isAbsent).length;
  const averageScore = completedAttempts > 0 
    ? filteredResults.filter(result => !result.isAbsent)
        .reduce((sum, result) => sum + result.marksObtained, 0) / completedAttempts
    : 0;

  const passRate = completedAttempts > 0
    ? (filteredResults.filter(result => !result.isAbsent && result.marksObtained >= 40).length / completedAttempts) * 100
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Exams Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Exams</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalExams}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm2 2h4v2H8V4zm6 8h-2v2h2v-2zm-4 0H8v2h2v-2zm6-4h-2v2h2V8zm-4 0H8v2h2V8zm-4 0H6v2h2V8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex space-x-2 text-xs text-blue-600 dark:text-blue-400">
            <span>{completedExams} completed</span>
            <span>•</span>
            <span>{activeExams} active</span>
            <span>•</span>
            <span>{upcomingExams} upcoming</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Students Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Total Students</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            {completedAttempts} exam attempts
          </p>
        </CardContent>
      </Card>

      {/* Average Score Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Average Score</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {averageScore.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:from-purple-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
            Based on {completedAttempts} completed exams
          </p>
        </CardContent>
      </Card>

      {/* Pass Rate Card */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Pass Rate</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {passRate.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
            Passing threshold: 40%
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamPerformanceDashboard;