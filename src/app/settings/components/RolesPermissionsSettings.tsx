'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { 
  fetchRolesPermissions, 
  clearError, 
  selectRoles, 
  selectOrganizedPermissions,
  selectLoading, 
  selectError,
  Role,
  Permission,
  OrganizedPermission,
  AccessLevel
} from '@/store/rolesPermissionsSlice';
import { rolePermissionsApi } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Modal } from '@/components/ui/modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';

export default function RolesPermissionsSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector(selectRoles);
  const organizedPermissions = useSelector(selectOrganizedPermissions);
  const loading = useSelector(selectLoading);
  const [isManageLoading, setIsManageLoading] = useState<boolean>(false);
  const error = useSelector(selectError);
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState<Permission[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Debug logging
  console.log('Roles from selector:', roles, 'Type:', typeof roles, 'Is Array:', Array.isArray(roles));
  console.log('Organized Permissions from selector:', organizedPermissions, 'Type:', typeof organizedPermissions, 'Is Array:', Array.isArray(organizedPermissions));

  useEffect(() => {
    // Fetch roles and permissions on component mount
    dispatch(fetchRolesPermissions());
  }, [dispatch]);

  // Safety checks to ensure we always have arrays
  const safeRoles = Array.isArray(roles) ? roles : [];
  const safeOrganizedPermissions = Array.isArray(organizedPermissions) ? organizedPermissions : [];

  const openPermissionsModal = (role: Role) => {
    setSelectedRole(role);
    
    try {
      // Find the permissions for this specific role
      const rolePermissions = safeOrganizedPermissions.find(op => op.role_id === role.id);
      
      if (rolePermissions && rolePermissions.permissions) {
         // Validate permission structure before setting
         const validPermissions = rolePermissions.permissions.filter((permission: Permission) => 
           permission.module && 
           typeof permission.add === 'string' &&
           typeof permission.view === 'string' &&
           typeof permission.update === 'string' &&
           typeof permission.delete === 'string'
         );
        
        setEditedPermissions([...validPermissions]);
      } else {
        // No permissions found for this role
        setEditedPermissions([]);
      }
      
      setHasChanges(false);
      setSaveError(null);
      setSaveSuccess(false);
      setIsSaving(false);
      setIsPermissionsModalOpen(true);
    } catch (error) {
      console.error('Error opening permissions modal:', error);
      setSaveError('Failed to load permissions for this role');
      setEditedPermissions([]);
      setIsPermissionsModalOpen(true);
    }
  };

  const closePermissionsModal = () => {
    setIsPermissionsModalOpen(false);
    setSelectedRole(null);
    setEditedPermissions([]);
    setHasChanges(false);
    setSaveError(null);
    setSaveSuccess(false);
    setIsSaving(false);
  };

  const handlePermissionChange = (permissionIndex: number, field: 'add' | 'view' | 'update' | 'delete', value: string) => {
    const updatedPermissions = [...editedPermissions];
    updatedPermissions[permissionIndex] = {
      ...updatedPermissions[permissionIndex],
      [field]: value
    };
    setEditedPermissions(updatedPermissions);
    setHasChanges(true);
  };

  const savePermissions = async () => {
    if (!selectedRole || !hasChanges) return;

    // Validate that we have permissions to save
    if (!editedPermissions || editedPermissions.length === 0) {
      setSaveError('No permissions to save for this role');
      return;
    }

    // Validate permission structure
    const invalidPermissions = editedPermissions.filter((permission: Permission) => 
      !permission.module || 
      !['all', 'owned', 'none'].includes(permission.add) ||
      !['all', 'owned', 'none'].includes(permission.view) ||
      !['all', 'owned', 'none'].includes(permission.update) ||
      !['all', 'owned', 'none'].includes(permission.delete)
    );

    if (invalidPermissions.length > 0) {
      setSaveError('Invalid permission values detected. Please check all fields.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const response = await rolePermissionsApi.updateRolePermissions(
        selectedRole.id,
        editedPermissions
      );

      if (response.success) {
        setSaveSuccess(true);
        setHasChanges(false);
        
        // Update the Redux store with the new permissions
        dispatch(fetchRolesPermissions());
        
        // Close modal after a brief success message
        setTimeout(() => {
          closePermissionsModal();
        }, 1500);
      } else {
        setSaveError(response.message || 'Failed to update permissions');
      }
    } catch (error: any) {
      console.error('Error saving permissions:', error);
      
      // Handle different types of errors
      if (error?.response?.status === 404) {
        setSaveError('Role not found. Please refresh and try again.');
      } else if (error?.response?.status === 403) {
        setSaveError('You do not have permission to update role permissions.');
      } else if (error?.response?.status === 422) {
        setSaveError('Invalid permission data. Please check your selections.');
      } else if (error?.response?.status >= 500) {
        setSaveError('Server error. Please try again later.');
      } else if (error?.name === 'NetworkError' || !navigator.onLine) {
        setSaveError('Network error. Please check your connection and try again.');
      } else {
        setSaveError(error?.response?.data?.message || error?.message || 'An unexpected error occurred while saving permissions.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchRolesPermissions());
  };

  // Get access level display text
  const getAccessLevelText = (level: AccessLevel) => {
    switch (level) {
      case 'all': return 'All';
      case 'owned': return 'Owned';
      case 'none': return 'None';
      default: return 'None';
    }
  };

  // Get access level color
  const getAccessLevelColor = (level: AccessLevel) => {
    switch (level) {
      case 'all': return 'bg-green-100 text-green-800';
      case 'owned': return 'bg-yellow-100 text-yellow-800';
      case 'none': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (loading && safeRoles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading roles and permissions...</p>
        </div>

      </div>
    );
  }

  // Error state with fallback
  if (error && safeRoles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load roles and permissions</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Roles & Permissions</h2>
          <p className="text-gray-600 mt-1">Manage user roles and their permissions</p>
        </div>
       
        <div className='flex justify-center gap-2.5'>
           <button
        
          disabled={isManageLoading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isManageLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          Manage Role
        </button>
         <button
          onClick={() => dispatch(fetchRolesPermissions())}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          Refresh
        </button>
        </div>
      </div>

      {/* Error banner for when we have cached data */}
      {error && safeRoles.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Unable to fetch latest data. Showing cached information. {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Roles</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {safeRoles.map((role: Role) => (
            <div key={role.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Role permissions configured
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {role.name === 'Super Admin' ? (
                  <span className="text-sm text-gray-500">Admin permissions can not be changed</span>
                ) : (
                  <button
                    onClick={() => openPermissionsModal(role)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Permissions
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions Modal */}
      <Modal
        isOpen={isPermissionsModalOpen && !!selectedRole}
        onClose={closePermissionsModal}
        className="max-w-6xl mx-4 max-h-[80vh] overflow-y-auto"
      >
        {selectedRole && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Permissions for {selectedRole.name}
              </h3>
            </div>
            
            {/* Success Message */}
            {saveSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md dark:bg-green-800 dark:border-green-600 dark:text-green-200">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Permissions updated successfully!
                </div>
              </div>
            )}

            {/* Error Message */}
            {saveError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md dark:bg-red-800 dark:border-red-600 dark:text-red-200">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {saveError}
                </div>
              </div>
            )}

            {/* Permissions Table */}
            <div className="overflow-x-auto">
              {editedPermissions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-2 dark:text-gray-400">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">No permissions configured for this role.</p>
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Module</th>
                      <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Add</th>
                      <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">View</th>
                      <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Update</th>
                      <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedPermissions.map((permission: Permission, index: number) => (
                      <tr key={index} className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                        <td className="p-4 font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {permission.module?.replace('_', ' ')}
                        </td>
                        <td className="p-4 text-center">
                          <select 
                            value={permission.add}
                            onChange={(e) => handlePermissionChange(index, 'add', e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="none">None</option>
                            <option value="owned">Owned</option>
                            <option value="all">All</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <select 
                            value={permission.view}
                            onChange={(e) => handlePermissionChange(index, 'view', e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="none">None</option>
                            <option value="owned">Owned</option>
                            <option value="all">All</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <select 
                            value={permission.update}
                            onChange={(e) => handlePermissionChange(index, 'update', e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="none">None</option>
                            <option value="owned">Owned</option>
                            <option value="all">All</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <select 
                            value={permission.delete}
                            onChange={(e) => handlePermissionChange(index, 'delete', e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="none">None</option>
                            <option value="owned">Owned</option>
                            <option value="all">All</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* Modal Footer with Save/Cancel buttons */}
            <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 mt-6 -mx-6 -mb-6">
              <button
                onClick={closePermissionsModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                    onClick={savePermissions}
                    disabled={!hasChanges || isSaving}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      hasChanges && !isSaving
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSaving ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}