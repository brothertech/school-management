"use client";

import React, { useState } from "react";
import { mockStudentPortalData, mockStudentNotifications } from "@/data/studentPortalData";
import { StudentNotification } from "@/types/student";

// Components
import StudentDashboard from "./components/StudentDashboard";
import NotificationsPanel from "./components/NotificationsPanel";

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState<StudentNotification[]>(mockStudentNotifications);

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
            Student Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {mockStudentPortalData.student.firstName} {mockStudentPortalData.student.lastName}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Grade {mockStudentPortalData.student.currentClass} - {mockStudentPortalData.student.currentSection}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {unreadNotificationsCount} Unread Notifications
          </div>
        </div>
      </div>

      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <StudentDashboard data={mockStudentPortalData} />
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <NotificationsPanel
              notifications={notifications}
              onMarkAsRead={markNotificationAsRead}
            />
          </div>
        </div>
      )}
    </div>
  );
}
