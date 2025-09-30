"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

// Advanced Dashboard Components
const SchoolOverviewCard = ({ title, value, change, icon }: {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className="text-sm text-green-600 mt-1">{change}</p>
        )}
      </div>
      <div className="text-blue-600">{icon}</div>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent School Activities</h3>
    <div className="space-y-4">
      {[
        { action: "New student enrollment", time: "2 hours ago", type: "enrollment" },
        { action: "Teacher attendance updated", time: "4 hours ago", type: "attendance" },
        { action: "Exam results published", time: "1 day ago", type: "exam" },
        { action: "Fee payment received", time: "2 days ago", type: "payment" },
      ].map((activity, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full ${
            activity.type === 'enrollment' ? 'bg-green-500' :
            activity.type === 'attendance' ? 'bg-blue-500' :
            activity.type === 'exam' ? 'bg-purple-500' : 'bg-yellow-500'
          }`}></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SystemHealth = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
    <div className="space-y-4">
      {[
        { metric: "Server Status", status: "Online", color: "green" },
        { metric: "Database", status: "Healthy", color: "green" },
        { metric: "Backup Status", status: "Up to date", color: "green" },
        { metric: "Security", status: "Secure", color: "green" },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">{item.metric}</span>
          <span className={`text-sm font-semibold ${
            item.color === 'green' ? 'text-green-600' : 'text-red-600'
          }`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function AdvancedDashboard() {
  const { user, isAuthenticated } = useAuth();

  // Check if user is authenticated and is Super Admin
  if (!isAuthenticated || !user) {
    redirect('/auth/signin');
  }

  if (!user.roles.includes('Super Admin')) {
    redirect('/');
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive overview of your school management system
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SchoolOverviewCard
          title="Total Students"
          value="1,247"
          change="+12 this month"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          }
        />
        <SchoolOverviewCard
          title="Total Teachers"
          value="89"
          change="+3 this month"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <SchoolOverviewCard
          title="Active Classes"
          value="42"
          change="All running"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <SchoolOverviewCard
          title="Revenue (Monthly)"
          value="$45,230"
          change="+8.2% from last month"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart placeholder - Enrollment over time</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart placeholder - Performance metrics</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity />
        <SystemHealth />
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "Generate Reports", href: "/reports" },
              { label: "Manage Users", href: "/users" },
              { label: "System Settings", href: "/settings" },
              { label: "Backup Data", href: "#" },
            ].map((action, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}