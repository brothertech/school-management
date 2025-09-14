'use client';

import React, { useState } from 'react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ExamPerformanceDashboard from '@/components/cbt/ExamPerformanceDashboard';
import StudentExamAttemptsList from '@/components/cbt/StudentExamAttemptsList';
import ClassPerformanceChart from '@/components/cbt/ClassPerformanceChart';
import CSVDownloadButton from '@/components/cbt/CSVDownloadButton';
import { mockExams } from '@/data/examData';

const CBTReportsPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState('');

  return (
    <div className="space-y-6">
      <PageBreadcrumb 
        pageTitle="CBT Exam Reports"
      />

      {/* Header with Exam Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">CBT Exam Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive reporting and analytics for computer-based tests
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select 
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Exams</option>
            {mockExams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title} - {exam.classSection}
              </option>
            ))}
          </select>
          
          <CSVDownloadButton 
            examId={selectedExam || undefined} 
            variant="primary" 
            size="md" 
          />
        </div>
      </div>

      {/* Performance Dashboard */}
      <ExamPerformanceDashboard selectedExamId={selectedExam || undefined} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance Chart */}
        <ClassPerformanceChart />

        {/* Quick Stats Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Exam Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Exams</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {mockExams.length}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Completed Exams</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {mockExams.filter(exam => exam.status === 'closed').length}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Active Exams</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {mockExams.filter(exam => exam.status === 'active').length}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Upcoming Exams</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {mockExams.filter(exam => exam.status === 'upcoming').length}
              </span>
            </div>
            
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Exam Attempts List */}
      <StudentExamAttemptsList selectedExamId={selectedExam || undefined} />

      {/* Additional Analytics Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Analytics Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Data Export</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Download comprehensive reports in CSV format for further analysis
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 00-6 6c0 1.887.454 3.665 1.257 5.234a.5.5 0 00.656.254L10 14.208l4.087 2.276a.5.5 0 00.656-.254A5.975 5.975 0 0016 10a6 6 0 00-6-6z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Performance Insights</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track student performance trends and identify areas for improvement
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800 dark:text-white">Class Comparison</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compare performance across different classes and subjects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBTReportsPage;