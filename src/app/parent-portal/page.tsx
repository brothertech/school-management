"use client";

import React, { useState } from "react";
import { mockParentData, mockParentNotifications } from "@/data/parentPortalData";
import { ParentNotification } from "@/types/parent";

// Components
import ChildrenList from "./components/ChildrenList";
import NotificationsPanel from "./components/NotificationsPanel";
import QuickStats from "./components/QuickStats";
import AttendanceView from "./components/child-views/AttendanceView";
import ResultsView from "./components/child-views/ResultsView";
import FeeStatusView from "./components/child-views/FeeStatusView";

export default function ParentPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedChild, setSelectedChild] = useState(mockParentData.children[0].id);
  const [childViewTab, setChildViewTab] = useState("attendance");
  const [notifications, setNotifications] = useState<ParentNotification[]>(mockParentNotifications);

  const selectedChildData = mockParentData.children.find(child => child.id === selectedChild);

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleSelectChild = (childId: string) => {
    setSelectedChild(childId);
    setActiveTab("childDetails");
    setChildViewTab("attendance");
  };

  const handleBackToDashboard = () => {
    setActiveTab("dashboard");
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
            Parent Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {mockParentData.firstName} {mockParentData.lastName}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {mockParentData.children.length} Children
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {unreadNotificationsCount} Unread Notifications
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats parent={mockParentData} />

      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Children List */}
          <div className="lg:col-span-2">
            <ChildrenList
              children={mockParentData.children}
              selectedChild={selectedChild}
              onSelectChild={handleSelectChild}
            />
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

      {activeTab === "childDetails" && selectedChildData && (
        <div>
          {/* Back Button */}
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>

          {/* Child Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {selectedChildData.firstName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {selectedChildData.firstName} {selectedChildData.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedChildData.currentClass} - Section {selectedChildData.currentSection}
              </p>
            </div>
          </div>

          {/* Child View Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              {["attendance", "results", "fees"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChildViewTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    childViewTab === tab
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab === "attendance" && "Attendance"}
                  {tab === "results" && "Exam Results"}
                  {tab === "fees" && "Fee Status"}
                </button>
              ))}
            </nav>
          </div>

          {/* Child View Content */}
          <div>
            {childViewTab === "attendance" && (
              <AttendanceView child={selectedChildData} />
            )}
            
            {childViewTab === "results" && (
              <ResultsView child={selectedChildData} />
            )}
            
            {childViewTab === "fees" && (
              <FeeStatusView child={selectedChildData} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
