'use client';

import React, { useState, useEffect } from 'react';
import Switch from '@/components/form/switch/Switch';
import Button from '@/components/ui/button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import axiosClient from '@/lib/axiosClient';
import Cookies from 'js-cookie';

interface Role {
  id: number;
  name: string;
}

interface RoleModuleData {
  role: Role;
  modules: {
    [key: string]: boolean;
  };
}

interface RoleModulesResponse {
  success: boolean;
  data: RoleModuleData[];
  available_modules: string[];
  message?: string;
}

const ModuleSettings: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allRoleModules, setAllRoleModules] = useState<RoleModuleData[]>([]);
  const [availableModules, setAvailableModules] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Role tabs for different user roles
  const [activeRoleId, setActiveRoleId] = useState<number | null>(null);

  // Module display names mapping
  const moduleDisplayNames: { [key: string]: string } = {
    students: 'Students',
    teachers: 'Teachers',
    classes: 'Classes',
    subjects: 'Subjects',
    exams: 'Exams',
    timetable: 'Timetable',
    attendance: 'Attendance',
    fees: 'Fees',
    library: 'Library',
    transport: 'Transport',
    messaging: 'Messaging',
    groups: 'Groups',
    announcements: 'Announcements',
    parent_portal: 'Parent Portal',
    student_portal: 'Student Portal',
    reports: 'Reports',
    cbt: 'CBT',
    recruitment: 'Recruitment'
  };

  // Fetch module data from API
  const fetchModuleData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get('token');
      
      const response = await axiosClient.get('/admin/role-modules', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result: RoleModulesResponse = response.data;
      
      if (result.success) {
        setAllRoleModules(result.data);
        setAvailableModules(result.available_modules);
        
        // Set the first role as active if none is selected
        if (result.data.length > 0 && activeRoleId === null) {
          setActiveRoleId(result.data[0].role.id);
        }
      } else {
        setError(result.message || 'Failed to fetch module data');
      }
    } catch (error) {
      console.error('Error fetching module data:', error);
      setError('Failed to fetch module data');
    } finally {
      setLoading(false);
    }
  };

  // Save module changes
  const saveModuleChanges = async () => {
    if (!activeRoleId) return;
    
    const currentRoleData = allRoleModules.find(rm => rm.role.id === activeRoleId);
    if (!currentRoleData) return;

    try {
      setSaving(true);
      setError(null);

      const response = await axiosClient.put('/api/admin/role-modules', {
        role_id: activeRoleId,
        modules: currentRoleData.modules
      });

      const result = response.data;

      if (result.success) {
        // Optionally show success message
        console.log('Module settings saved successfully');
      } else {
        setError(result.message || 'Failed to save module settings');
      }
    } catch (error) {
      console.error('Error saving module settings:', error);
      setError('Failed to save module settings');
    } finally {
      setSaving(false);
    }
  };

  // Handle module toggle
  const handleModuleToggle = (moduleKey: string, enabled: boolean) => {
    if (!activeRoleId) return;

    setAllRoleModules(prevData => 
      prevData.map(roleData => 
        roleData.role.id === activeRoleId
          ? {
              ...roleData,
              modules: {
                ...roleData.modules,
                [moduleKey]: enabled
              }
            }
          : roleData
      )
    );
  };

  // Handle role change
  const handleRoleChange = (roleId: number) => {
    setActiveRoleId(roleId);
  };

  // Fetch data on component mount or role change
  useEffect(() => {
    fetchModuleData();
  }, []);

  // Get current role data
  const getCurrentRoleData = () => {
    return allRoleModules.find(rm => rm.role.id === activeRoleId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading module settings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">Error Loading Module Settings</h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{error}</p>
          </div>
          <div className="mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => fetchModuleData()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentRoleData = getCurrentRoleData();
  
  if (!currentRoleData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No module data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Module Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure which modules are accessible for each user role
        </p>
      </div>

      {/* Role Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
          {allRoleModules.map((roleData) => (
            <button
              key={roleData.role.id}
              onClick={() => handleRoleChange(roleData.role.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                activeRoleId === roleData.role.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {roleData.role.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Module Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableModules.map((moduleKey) => (
            <div
              key={moduleKey}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {moduleDisplayNames[moduleKey] || moduleKey}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {currentRoleData.modules[moduleKey] ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div className="ml-4">
                <Switch
                  label=""
                  defaultChecked={currentRoleData.modules[moduleKey] || false}
                  onChange={(checked) => handleModuleToggle(moduleKey, checked)}
                  color="blue"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={saveModuleChanges}
          disabled={saving}
          className="min-w-[120px]"
        >
          {saving ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ModuleSettings;