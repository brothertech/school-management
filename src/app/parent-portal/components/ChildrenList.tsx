import React from "react";
import { ChildStudent } from "@/types/parent";

interface ChildrenListProps {
  children: ChildStudent[];
  selectedChild: string;
  onSelectChild: (childId: string) => void;
}

export default function ChildrenList({ children, selectedChild, onSelectChild }: ChildrenListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        My Children
      </h2>
      
      <div className="space-y-3">
        {children.map((child) => (
          <div
            key={child.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedChild === child.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => onSelectChild(child.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {child.firstName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {child.firstName} {child.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {child.currentClass} - Section {child.currentSection}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Attendance Badge */}
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full ${
                    child.attendanceSummary.attendanceRate >= 90 
                      ? "bg-green-500" 
                      : child.attendanceSummary.attendanceRate >= 75 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                  }`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mt-1">
                    {child.attendanceSummary.attendanceRate}%
                  </span>
                </div>
                
                {/* Performance Badge */}
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full ${
                    child.examPerformance.averageScore >= 80 
                      ? "bg-green-500" 
                      : child.examPerformance.averageScore >= 60 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                  }`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mt-1">
                    {child.examPerformance.averageScore}%
                  </span>
                </div>
                
                {/* Fee Status Badge */}
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full ${
                    child.feeStatus.pendingFees === 0 
                      ? "bg-green-500" 
                      : "bg-red-500"
                  }`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mt-1">
                    ${child.feeStatus.pendingFees}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Present</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {child.attendanceSummary.presentDays}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Absent</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {child.attendanceSummary.absentDays}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Late</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {child.attendanceSummary.recentAttendance.filter(a => a.status === 'late').length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {children.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">No children registered yet</p>
        </div>
      )}
    </div>
  );
}