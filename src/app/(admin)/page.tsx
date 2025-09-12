
"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";

export default function SchoolDashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to School Management System</h1>
        <p className="text-gray-600">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  // Render role-specific dashboard
  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} />;
    case 'teacher':
      return <TeacherDashboard user={user} />;
    case 'student':
      return <StudentDashboard user={user} />;
    case 'parent':
      return <ParentDashboard user={user} />;
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Welcome, {user.firstName}!</h1>
          <p className="text-gray-600">Your role dashboard is being prepared.</p>
        </div>
      );
  }
    
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold mb-6">School Management Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome to your school management system. Manage students, teachers, classes, and more from this dashboard.
        </p>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Students</h3>
          <p className="text-3xl font-bold text-blue-600">1,245</p>
          <p className="text-sm text-gray-500">Total enrolled</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Teachers</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
          <p className="text-sm text-gray-500">Teaching staff</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Classes</h3>
          <p className="text-3xl font-bold text-purple-600">32</p>
          <p className="text-sm text-gray-500">Active classes</p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-3xl font-bold text-orange-600">94%</p>
          <p className="text-sm text-gray-500">Today's rate</p>
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">New student registration</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Exam results published</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Fee payment received</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  
}
