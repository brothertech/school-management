import React from "react";
import { ChildStudent } from "@/types/parent";

interface AttendanceViewProps {
  child: ChildStudent;
}

export default function AttendanceView({ child }: AttendanceViewProps) {
  const attendance = child.attendanceSummary;
  const totalDays = attendance.presentDays + attendance.absentDays + attendance.lateDays;
  
  const attendanceData = [
    { label: "Present", value: attendance.presentDays, color: "bg-green-500", percentage: (attendance.presentDays / totalDays) * 100 },
    { label: "Absent", value: attendance.absentDays, color: "bg-red-500", percentage: (attendance.absentDays / totalDays) * 100 },
    { label: "Late", value: attendance.lateDays, color: "bg-yellow-500", percentage: (attendance.lateDays / totalDays) * 100 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Attendance Summary - {child.name}
        </h2>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            attendance.attendanceRate >= 90 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : attendance.attendanceRate >= 75 
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {attendance.attendanceRate}% Attendance
          </span>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {attendance.presentDays}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Present Days</div>
        </div>
        
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {attendance.absentDays}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">Absent Days</div>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {attendance.lateDays}
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Late Days</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 mb-6">
        {attendanceData.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.value} days ({item.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Attendance */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
          Recent Attendance
        </h3>
        
        <div className="space-y-2">
          {attendance.recentAttendance?.slice(0, 5).map((record, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  record.status === "present" 
                    ? "bg-green-500" 
                    : record.status === "absent" 
                    ? "bg-red-500" 
                    : "bg-yellow-500"
                }`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {record.date}
                </span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                record.status === "present" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : record.status === "absent" 
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              }`}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
        
        {(!attendance.recentAttendance || attendance.recentAttendance.length === 0) && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No recent attendance records
          </div>
        )}
      </div>

      {/* Notes */}
      {attendance.notes && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            Teacher Notes
          </h3>
          <p className="text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            {attendance.notes}
          </p>
        </div>
      )}
    </div>
  );
}