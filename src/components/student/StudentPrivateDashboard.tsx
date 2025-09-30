"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Mock data for student dashboard
const mockStudentData = {
  id: "student-1",
  name: "John Doe",
  class: "Grade 10A",
  section: "A",
  rollNumber: 15,
  admissionNumber: "ADM001",
  email: "john.doe@school.com"
};

const mockAnnouncements = [
  {
    id: "1",
    title: "Mid-term Exams Schedule Released",
    content: "Mid-term examinations will begin from February 15th. Check your timetable for details.",
    date: new Date("2024-01-15"),
    priority: "high"
  },
  {
    id: "2",
    title: "Sports Day Registration",
    content: "Register for annual sports day events. Last date: January 25th.",
    date: new Date("2024-01-14"),
    priority: "medium"
  },
  {
    id: "3",
    title: "Library New Books",
    content: "New collection of science and literature books available in the library.",
    date: new Date("2024-01-13"),
    priority: "low"
  }
];

const mockUpcomingExams = [
  { id: "1", subject: "Mathematics", date: "2024-02-15", time: "09:00 AM", duration: "3 hours" },
  { id: "2", subject: "Physics", date: "2024-02-17", time: "09:00 AM", duration: "3 hours" },
  { id: "3", subject: "Chemistry", date: "2024-02-19", time: "09:00 AM", duration: "3 hours" }
];

const mockAssignments = [
  { id: "1", subject: "English", title: "Essay on Climate Change", dueDate: "2024-01-20", status: "pending" },
  { id: "2", subject: "History", title: "World War II Report", dueDate: "2024-01-22", status: "submitted" },
  { id: "3", subject: "Biology", title: "Cell Structure Diagram", dueDate: "2024-01-25", status: "pending" }
];

const mockAttendance = {
  totalDays: 180,
  presentDays: 165,
  absentDays: 15,
  percentage: 91.7
};

const mockRecentGrades = [
  { subject: "Mathematics", grade: "A", marks: "85/100", exam: "Unit Test 3" },
  { subject: "Physics", grade: "B+", marks: "78/100", exam: "Unit Test 3" },
  { subject: "Chemistry", grade: "A-", marks: "82/100", exam: "Unit Test 3" },
  { subject: "English", grade: "A", marks: "88/100", exam: "Unit Test 3" }
];

export default function StudentPrivateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const pendingAssignments = mockAssignments.filter(assignment => assignment.status === "pending");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name || mockStudentData.name}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {mockStudentData.class}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {mockAttendance.percentage}% Attendance
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {pendingAssignments.length} Pending Tasks
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{mockAttendance.percentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingAssignments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Exams</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{mockUpcomingExams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Grade</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">A-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Announcements */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              School Announcements
            </h2>
            <div className="space-y-4">
              {mockAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {announcement.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      announcement.priority === 'high' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : announcement.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {announcement.date.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Upcoming Exams
            </h2>
            <div className="space-y-3">
              {mockUpcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {exam.subject}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exam.time} • {exam.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(exam.date).toLocaleDateString()}
                    </p>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Recent Grades
            </h2>
            <div className="space-y-3">
              {mockRecentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {grade.subject}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {grade.exam}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {grade.grade}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {grade.marks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Student Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-semibold text-2xl">
                  {mockStudentData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {mockStudentData.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {mockStudentData.class} • Roll No: {mockStudentData.rollNumber}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {mockStudentData.admissionNumber}
              </p>
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Attendance Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Present Days</span>
                <span className="font-medium text-green-600">{mockAttendance.presentDays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Absent Days</span>
                <span className="font-medium text-red-600">{mockAttendance.absentDays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Days</span>
                <span className="font-medium text-gray-900 dark:text-white">{mockAttendance.totalDays}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Percentage</span>
                  <span className="text-lg font-bold text-blue-600">{mockAttendance.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${mockAttendance.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Pending Assignments
            </h2>
            <div className="space-y-3">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {assignment.subject}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            {pendingAssignments.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No pending assignments
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Timetable
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Submit Assignment
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Library Resources
              </button>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                Fee Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}