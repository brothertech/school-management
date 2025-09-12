import React from 'react';
import { User } from '@/context/AuthContext';

interface StudentDashboardProps {
  user: User;
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold mb-2">Student Portal</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {user.firstName}! Here's your academic overview.
        </p>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Current GPA</h3>
          <p className="text-3xl font-bold text-blue-600">3.8</p>
          <p className="text-sm text-gray-500">Out of 4.0</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Classes</h3>
          <p className="text-3xl font-bold text-green-600">6</p>
          <p className="text-sm text-gray-500">This semester</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Assignments</h3>
          <p className="text-3xl font-bold text-purple-600">3</p>
          <p className="text-sm text-gray-500">Due this week</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-3xl font-bold text-orange-600">98%</p>
          <p className="text-sm text-gray-500">This semester</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Mathematics</span>
              <span className="text-sm text-gray-500">8:00 - 9:30 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Science</span>
              <span className="text-sm text-gray-500">10:00 - 11:30 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">English</span>
              <span className="text-sm text-gray-500">1:00 - 2:30 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">History</span>
              <span className="text-sm text-gray-500">3:00 - 4:30 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
              View Assignments
            </button>
            <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30">
              Check Grades
            </button>
            <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30">
              School Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Math Quiz</span>
                <p className="text-sm text-gray-500">Algebra Chapter 5</p>
              </div>
              <span className="text-sm text-red-600 font-semibold">Tomorrow</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Science Fair</span>
                <p className="text-sm text-gray-500">Project submissions</p>
              </div>
              <span className="text-sm text-blue-600 font-semibold">Next Week</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Basketball Game</span>
                <p className="text-sm text-gray-500">Home vs. City High</p>
              </div>
              <span className="text-sm text-green-600 font-semibold">Friday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}