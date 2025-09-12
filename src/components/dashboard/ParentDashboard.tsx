import React from 'react';
import { User } from '@/context/AuthContext';

interface ParentDashboardProps {
  user: User;
}

export default function ParentDashboard({ user }: ParentDashboardProps) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold mb-2">Parent Portal</h1>
        <p className="text-gray-600 mb-8">
          Welcome, {user.firstName}! Monitor your child's academic progress.
        </p>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Children</h3>
          <p className="text-3xl font-bold text-blue-600">2</p>
          <p className="text-sm text-gray-500">Enrolled students</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average GPA</h3>
          <p className="text-3xl font-bold text-green-600">3.6</p>
          <p className="text-sm text-gray-500">Overall performance</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-3xl font-bold text-purple-600">97%</p>
          <p className="text-sm text-gray-500">This semester</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Messages</h3>
          <p className="text-3xl font-bold text-orange-600">3</p>
          <p className="text-sm text-gray-500">Unread</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Children's Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Emma Johnson</span>
                <p className="text-sm text-gray-500">Grade 10 - Student ID: S1001</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-green-600">GPA: 3.8</span>
                <p className="text-sm text-gray-500">Math: A, Science: A-</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Noah Johnson</span>
                <p className="text-sm text-gray-500">Grade 8 - Student ID: S1002</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-blue-600">GPA: 3.4</span>
                <p className="text-sm text-gray-500">English: B+, History: A-</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
              View Report Cards
            </button>
            <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30">
              Check Attendance
            </button>
            <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30">
              Contact Teachers
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Upcoming School Events</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Parent-Teacher Conference</span>
                <p className="text-sm text-gray-500">Schedule your appointment</p>
              </div>
              <span className="text-sm text-red-600 font-semibold">Next Week</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Science Fair Exhibition</span>
                <p className="text-sm text-gray-500">All parents welcome</p>
              </div>
              <span className="text-sm text-blue-600 font-semibold">Oct 15</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Sports Day</span>
                <p className="text-sm text-gray-500">Annual school event</p>
              </div>
              <span className="text-sm text-green-600 font-semibold">Nov 5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent School Announcements</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> School will be closed next Monday for teacher training day.
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Reminder:</strong> Fall semester progress reports will be available online this Friday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}