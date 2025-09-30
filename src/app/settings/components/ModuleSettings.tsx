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

interface ToggleModuleResponse {
  success: boolean;
  message: string;
  role?: {
    id: number;
    name: string;
  };
  modules?: {
    [key: string]: boolean;
  };
}

interface BatchSavePayload {
  modules: {
    [key: string]: boolean;
  };
}

const ModuleSettings: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [allRoleModules, setAllRoleModules] = useState<RoleModuleData[]>([]);
  const [availableModules, setAvailableModules] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Role tabs for different user roles
  const [activeRoleId, setActiveRoleId] = useState<number | null>(null);
  const [pendingChanges, setPendingChanges] = useState<{ [moduleKey: string]: boolean }>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
  // Removed: saveModuleChanges function since toggles are now immediate

  // Handle module toggle
  // Handle batch save of module changes
  const handleSaveChanges = async () => {
    if (!activeRoleId || Object.keys(pendingChanges).length === 0) return;

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Get current modules for the active role
      const currentRoleData = allRoleModules.find(rm => rm.role.id === activeRoleId);
      if (!currentRoleData) {
        throw new Error('Role data not found');
      }

      // Merge current modules with pending changes
      const updatedModules = {
        ...currentRoleData.modules,
        ...pendingChanges
      };

      // Prepare payload
      const payload: BatchSavePayload = {
        modules: updatedModules
      };

      // Make API call
      const response = await axiosClient.post(`/admin/role-modules/toggle/${activeRoleId}/module`, payload);

      if (response.data.success) {
        // Update the state with the response data
        setAllRoleModules(prevData => 
          prevData.map(roleData => 
            roleData.role.id === activeRoleId
              ? {
                  ...roleData,
                  modules: response.data.modules || updatedModules
                }
              : roleData
          )
        );

        // Clear pending changes
        setPendingChanges({});
        setHasChanges(false);
        setSaveSuccess(true);

        // Clear success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(response.data.message || 'Failed to save changes');
      }
    } catch (error: any) {
      console.error('Error saving module changes:', error);
      setSaveError(error.response?.data?.message || 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleModuleToggle = (moduleKey: string, checked: boolean) => {
    if (!activeRoleId) return;

    // Update local state immediately for UI responsiveness
    setAllRoleModules(prevData => 
      prevData.map(roleData => 
        roleData.role.id === activeRoleId
          ? {
              ...roleData,
              modules: {
                ...roleData.modules,
                [moduleKey]: checked
              }
            }
          : roleData
      )
    );

    // Track pending changes
    const currentRoleData = allRoleModules.find(rm => rm.role.id === activeRoleId);
    const originalValue = currentRoleData?.modules[moduleKey] || false;
    
    setPendingChanges(prev => {
      const newChanges = { ...prev };
      
      // If the new value matches the original, remove from pending changes
      if (checked === originalValue) {
        delete newChanges[moduleKey];
      } else {
        newChanges[moduleKey] = checked;
      }
      
      return newChanges;
    });

    // Update hasChanges flag
    setHasChanges(Object.keys(pendingChanges).length > 0 || checked !== originalValue);
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
        <nav className="-mb-px flex space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto no-scrollbar px-2 sm:px-0">
          {allRoleModules.map((roleData) => (
            <button
              key={roleData.role.id}
              onClick={() => handleRoleChange(roleData.role.id)}
              className={`py-3 px-3 sm:px-4 md:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0 min-w-0 ${
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
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {availableModules.map((moduleKey) => {
            const isChanged = pendingChanges.hasOwnProperty(moduleKey);
            return (
              <div
                key={moduleKey}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border transition-colors ${
                  isChanged 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' 
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {moduleDisplayNames[moduleKey] || moduleKey}
                    </h3>
                    {isChanged && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Changed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {currentRoleData.modules[moduleKey] ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Switch
                    label=""
                    checked={currentRoleData.modules[moduleKey] || false}
                    onChange={(checked) => handleModuleToggle(moduleKey, checked)}
                    color="blue"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSaveChanges}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}

      {/* Success/Error Messages */}
      {saveSuccess && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">Changes saved successfully!</p>
        </div>
      )}
      
      {(error || saveError) && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-300">{error || saveError}</p>
        </div>
      )}
    </div>
  );
};

export default ModuleSettings;