import React from 'react';
import { User } from '@/context/AuthContext';
import { useSettings } from '@/context/SettingsContext';

interface TeacherDashboardProps {
  user: User;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  const { settings } = useSettings();
  const widgets = settings.dashboardWidgets.teacher;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome, Professor {user.lastName}! Manage your classes and students.
        </p>
      </div>

      {widgets.clockIn && (
        <div className="col-span-12 md:col-span-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-2">Clock In</h3>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md">Clock In</button>
            </div>
            <p className="text-sm text-gray-500">Mark your attendance for today.</p>
          </div>
        </div>
      )}

      {widgets.birthdays && (
        <div className="col-span-12 md:col-span-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Staff Birthdays</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Jane Doe - HR - Today 🎉</li>
              <li>Mark Lee - Maths - Tomorrow</li>
            </ul>
          </div>
        </div>
      )}

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">My Classes</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <p className="text-sm text-gray-500">Active classes</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Students</h3>
          <p className="text-3xl font-bold text-green-600">142</p>
          <p className="text-sm text-gray-500">Total students</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Assignments</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
          <p className="text-sm text-gray-500">Pending grading</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-3xl font-bold text-orange-600">96%</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mathematics - Grade 9</span>
              <span className="text-sm text-gray-500">8:00 - 9:30 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Science - Grade 10</span>
              <span className="text-sm text-gray-500">10:00 - 11:30 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Office Hours</span>
              <span className="text-sm text-gray-500">1:00 - 3:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
              Take Attendance
            </button>
            <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30">
              Grade Assignments
            </button>
            <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30">
              Lesson Plans
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Math Competition:</strong> Registration closes this Friday. Encourage your students to participate!
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Staff Meeting:</strong> Wednesday at 3:30 PM in the conference room.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}