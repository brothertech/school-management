'use client';
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/context/AuthContext';
import MultiSelect from '@/components/form/MultiSelect';

interface UserSelectionProps {
  label: string;
  users: User[];
  selectedUserIds: string[];
  onChange: (selectedUserIds: string[]) => void;
  disabled?: boolean;
  roleFilter?: UserRole[];
  showRoleBadge?: boolean;
}

const UserSelection: React.FC<UserSelectionProps> = ({
  label,
  users,
  selectedUserIds,
  onChange,
  disabled = false,
  roleFilter = ['teacher', 'student', 'parent'],
  showRoleBadge = true,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on role and search term
  const filteredUsers = users.filter(user => {
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoleFilter = roleFilter.includes(user.role);
    
    return matchesRole && matchesSearch && matchesRoleFilter;
  });

  // Convert users to MultiSelect options
  const options = filteredUsers.map(user => ({
    value: user.id,
    text: `${user.firstName} ${user.lastName}${showRoleBadge ? ` (${user.role})` : ''}`,
    selected: selectedUserIds.includes(user.id),
  }));

  const handleSelectionChange = (selectedValues: string[]) => {
    onChange(selectedValues);
  };

  const getRoleCounts = () => {
    const counts = {
      all: users.filter(user => roleFilter.includes(user.role)).length,
      teacher: users.filter(user => user.role === 'teacher' && roleFilter.includes(user.role)).length,
      student: users.filter(user => user.role === 'student' && roleFilter.includes(user.role)).length,
      parent: users.filter(user => user.role === 'parent' && roleFilter.includes(user.role)).length,
    };
    return counts;
  };

  const roleCounts = getRoleCounts();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
        
        {/* Role Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedRole('all')}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedRole === 'all'
                ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            All ({roleCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('teacher')}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedRole === 'teacher'
                ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            Teachers ({roleCounts.teacher})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedRole === 'student'
                ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            Students ({roleCounts.student})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('parent')}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedRole === 'parent'
                ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            Parents ({roleCounts.parent})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* MultiSelect */}
      <MultiSelect
        label=""
        options={options}
        defaultSelected={selectedUserIds}
        onChange={handleSelectionChange}
        disabled={disabled}
      />

      {/* Selected Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Selected: {selectedUserIds.length} user{selectedUserIds.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default UserSelection;