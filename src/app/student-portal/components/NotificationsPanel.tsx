import React from "react";
import { StudentNotification } from "@/types/student";

interface NotificationsPanelProps {
  notifications: StudentNotification[];
  onMarkAsRead: (notificationId: string) => void;
}

export default function NotificationsPanel({ notifications, onMarkAsRead }: NotificationsPanelProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "exam":
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: "bg-red-100 dark:bg-red-900/20",
          textColor: "text-red-600 dark:text-red-400"
        };
      case "announcement":
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: "bg-blue-100 dark:bg-blue-900/20",
          textColor: "text-blue-600 dark:text-blue-400"
        };
      case "timetable":
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          ),
          bgColor: "bg-purple-100 dark:bg-purple-900/20",
          textColor: "text-purple-600 dark:text-purple-400"
        };
      default:
        return {
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          ),
          bgColor: "bg-gray-100 dark:bg-gray-900/20",
          textColor: "text-gray-600 dark:text-gray-400"
        };
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Notifications
        </h2>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs px-2.5 py-0.5 rounded-full">
          {notifications.filter(n => !n.read).length}
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const { icon, bgColor, textColor } = getNotificationIcon(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                notification.read
                  ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                  : "border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
              }`}
              onClick={() => !notification.read && onMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className={textColor}>{icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      notification.read 
                        ? "text-gray-600 dark:text-gray-400" 
                        : "text-gray-800 dark:text-white"
                    }`}>
                      {notification.title}
                    </h4>
                    {notification.important && (
                      <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDate(notification.date)}
                    </span>
                    {!notification.read && (
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        Mark as read
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">No notifications yet</p>
        </div>
      )}
    </div>
  );
}