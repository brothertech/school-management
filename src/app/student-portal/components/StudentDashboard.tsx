import React from "react";
import { StudentPortalData } from "@/types/student";
import { mockExams } from "@/data/examData";
import ExamList from "./ExamList";
import { useAuth } from "@/context/AuthContext";

interface StudentDashboardProps {
  data: StudentPortalData;
}

export default function StudentDashboard({ data }: StudentDashboardProps) {
  const { student, timetable, upcomingExams, attendanceSummary } = data;
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {attendanceSummary.attendanceRate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${attendanceSummary.attendanceRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Upcoming Exams Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Exams</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {upcomingExams.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Next: {upcomingExams[0]?.subject} on {upcomingExams[0]?.date.toLocaleDateString()}
          </p>
        </div>

        {/* Today's Classes Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Classes</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                6
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Current: Mathematics (08:00-08:45)
          </p>
        </div>

        {/* Overall Performance Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                A-
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Last semester: 88.5%
          </p>
        </div>
      </div>

      {/* Today's Timetable */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Today's Schedule
        </h2>
        <div className="space-y-3">
          {timetable.slice(0, 4).map((classItem) => (
            <div key={classItem.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {classItem.period}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {classItem.subject}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {classItem.startTime} - {classItem.endTime}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {classItem.teacher}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {classItem.room}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          View Full Timetable →
        </button>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Upcoming Exams
        </h2>
        <div className="space-y-3">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {exam.subject}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exam.date.toLocaleDateString()} at {exam.time}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  exam.importance === 'high' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                    : exam.importance === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {exam.importance}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {exam.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          View Exam Details →
        </button>
      </div>

      {/* Exam Navigation - Only show if CBT module is enabled */}
      {user?.module_visibility?.cbt && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Exam Center
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/student-portal/exams/1/instructions"
              className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <svg className="w-12 h-12 text-blue-600 mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                View Exam Instructions
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                Read instructions and guidelines before starting your exam
              </p>
            </a>
            
            <a
              href="/student-portal/exams/1/take"
              className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <svg className="w-12 h-12 text-green-600 mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                Take Exam
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400 text-center">
                Start your exam and submit your answers online
              </p>
            </a>
          </div>
        </div>
      )}

      {/* Available Exams */}
      <ExamList exams={mockExams} />
    </div>
  );
}