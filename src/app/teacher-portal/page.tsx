"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Mock data for teacher dashboard
const mockTeacherData = {
  id: "teacher-1",
  name: "Sarah Johnson",
  email: "sarah.johnson@school.com",
  subjects: ["Mathematics", "Physics"],
  classes: [
    { id: "class-1", name: "Grade 10A", subject: "Mathematics", students: 28 },
    { id: "class-2", name: "Grade 11B", subject: "Physics", students: 25 },
    { id: "class-3", name: "Grade 9C", subject: "Mathematics", students: 30 }
  ]
};

const mockAnnouncements = [
  {
    id: "1",
    title: "Staff Meeting Tomorrow",
    content: "Monthly staff meeting scheduled for 3:00 PM in the conference room.",
    priority: "high",
    date: new Date("2024-01-15"),
    type: "admin"
  },
  {
    id: "2",
    title: "New Grading System Update",
    content: "The new online grading system will be implemented next week.",
    priority: "medium",
    date: new Date("2024-01-14"),
    type: "system"
  },
  {
    id: "3",
    title: "Parent-Teacher Conference",
    content: "Parent-teacher conferences scheduled for next Friday.",
    priority: "medium",
    date: new Date("2024-01-13"),
    type: "event"
  }
];

const mockBirthdays = [
  { id: "1", name: "John Smith", type: "birthday", date: "Jan 18", department: "Science" },
  { id: "2", name: "Mary Wilson", type: "anniversary", date: "Jan 20", years: 5, department: "English" },
  { id: "3", name: "David Brown", type: "birthday", date: "Jan 22", department: "Mathematics" }
];

const mockUpcomingExams = [
  { id: "1", subject: "Mathematics", class: "Grade 10A", date: "2024-01-25", type: "Mid-term" },
  { id: "2", subject: "Physics", class: "Grade 11B", date: "2024-01-28", type: "Quiz" },
  { id: "3", subject: "Mathematics", class: "Grade 9C", date: "2024-02-01", type: "Final" }
];

const mockTasks = [
  { id: "1", title: "Grade Math Assignments", dueDate: "2024-01-16", priority: "high", completed: false },
  { id: "2", title: "Prepare Physics Lab Report", dueDate: "2024-01-18", priority: "medium", completed: false },
  { id: "3", title: "Parent Meeting - Alex Johnson", dueDate: "2024-01-19", priority: "high", completed: false },
  { id: "4", title: "Submit Attendance Report", dueDate: "2024-01-20", priority: "low", completed: true }
];

const mockMessages = [
  { id: "1", from: "Principal", subject: "Budget Meeting", time: "2 hours ago", unread: true },
  { id: "2", from: "Parent - Mrs. Davis", subject: "Student Progress Inquiry", time: "5 hours ago", unread: true },
  { id: "3", from: "Admin", subject: "New Policy Update", time: "1 day ago", unread: false }
];

export default function TeacherPortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const unreadMessagesCount = mockMessages.filter(msg => msg.unread).length;
  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name || mockTeacherData.name}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {mockTeacherData.classes.length} Classes
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {pendingTasksCount} Pending Tasks
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {unreadMessagesCount} Unread Messages
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Classes</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{mockTeacherData.classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {mockTeacherData.classes.reduce((sum, cls) => sum + cls.students, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
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
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingTasksCount}</p>
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
              Recent Announcements
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
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
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

          {/* Class Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              My Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTeacherData.classes.map((classItem) => (
                <div key={classItem.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {classItem.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {classItem.students} students
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {classItem.subject}
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/40">
                      Attendance
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-900/40">
                      Grades
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Upcoming Exams & Grading
            </h2>
            <div className="space-y-3">
              {mockUpcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {exam.subject} - {exam.type}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exam.class}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(exam.date).toLocaleDateString()}
                    </p>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      Manage Grades
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Staff Birthdays & Celebrations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Staff Celebrations
            </h2>
            <div className="space-y-3">
              {mockBirthdays.map((celebration) => (
                <div key={celebration.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    {celebration.type === 'birthday' ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2L13.09 8.26L20 9L15 14.74L16.18 21.02L10 17.77L3.82 21.02L5 14.74L0 9L6.91 8.26L10 2Z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {celebration.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {celebration.type === 'birthday' ? 'Birthday' : `${celebration.years} Year Anniversary`} - {celebration.date}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {celebration.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks & Reminders */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Tasks & Reminders
            </h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/10' 
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      task.completed 
                        ? 'text-gray-500 dark:text-gray-400 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Communication */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Recent Messages
            </h2>
            <div className="space-y-3">
              {mockMessages.map((message) => (
                <div key={message.id} className={`p-3 rounded-lg border-l-4 ${
                  message.unread 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
                    : 'border-gray-300 bg-gray-50 dark:bg-gray-700/50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${
                      message.unread 
                        ? 'text-blue-900 dark:text-blue-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {message.from}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {message.subject}
                  </p>
                  {message.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View All Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}