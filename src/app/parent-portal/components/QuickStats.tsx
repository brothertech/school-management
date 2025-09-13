import React from "react";
import { Parent } from "@/types/parent";

interface QuickStatsProps {
  parent: Parent;
}

export default function QuickStats({ parent }: QuickStatsProps) {
  const totalChildren = parent.children.length;
  
  // Calculate overall statistics
  const totalAttendanceRate = parent.children.reduce(
    (sum, child) => sum + child.attendanceSummary.attendanceRate,
    0
  ) / totalChildren;

  const totalAverageScore = parent.children.reduce(
    (sum, child) => sum + child.examPerformance.averageScore,
    0
  ) / totalChildren;

  const totalPendingFees = parent.children.reduce(
    (sum, child) => sum + child.feeStatus.pendingFees,
    0
  );

  const childrenWithPendingFees = parent.children.filter(
    child => child.feeStatus.pendingFees > 0
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Children Count */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Children</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalChildren}</p>
          </div>
        </div>
      </div>

      {/* Average Attendance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Attendance</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalAttendanceRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Average Score */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Score</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalAverageScore.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Pending Fees */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Fees</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              ${totalPendingFees}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {childrenWithPendingFees} of {totalChildren} children
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}