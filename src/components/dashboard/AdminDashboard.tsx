import React, { useState } from 'react';
import { User } from '@/context/AuthContext';
import AdminNavigation from '@/components/admin/AdminNavigation';
import UserManagement from '@/components/admin/UserManagement';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettings } from '@/context/SettingsContext';


interface AdminDashboardProps {
  user: User;

} 
//  default function AdminDashboard({ user }: AdminDashboardProps) {

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useTranslation();
  const { settings } = useSettings();
  const widgets = settings.dashboardWidgets.admin;

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome {user.firstName}</p>
              </div>
              {widgets.clockIn && (
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                  Clock In
                </button>
              )}
            </header>

            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                  <p className="text-3xl font-bold text-blue-600">1,245</p>
                  <p className="text-sm text-gray-500">Total Enrolled Students</p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Teachers</h3>
                  <p className="text-3xl font-bold text-green-600">45</p>
                  <p className="text-sm text-gray-500">Teaching Staff</p>
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
                  <h3 className="text-lg font-semibold mb-2">Attendance Rate</h3>
                  <p className="text-3xl font-bold text-orange-600">94%</p>
                  <p className="text-sm text-gray-500">Today's Average</p>
                </div>
              </div>

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

              <div className="col-span-12 md:col-span-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">{t('dashboard.systemOverview')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{t('dashboard.pendingApprovals')}</span>
                      <span className="text-sm text-red-600 font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{t('dashboard.systemHealth')}</span>
                      <span className="text-sm text-green-600 font-semibold">Excellent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{t('dashboard.storageUsage')}</span>
                      <span className="text-sm text-gray-600">65% used</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3> 
                  <div className="space-y-3">
                    <button 
                      className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      onClick={() => setActiveTab('users')}
                    >
                      Add New User
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      Generate Reports
                    </button>
                    <button 
                      className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      onClick={() => setActiveTab('settings')}
                    >
                      System Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}
