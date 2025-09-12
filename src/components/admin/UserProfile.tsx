"use client";

import React from 'react';
import { User } from '@/types/user';
import Button from '@/components/ui/button/Button';

interface UserProfileProps {
  user: User;
  onClose: () => void;
  onEdit: (user: User) => void;
}

export default function UserProfile({ user, onClose, onEdit }: UserProfileProps) {
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'teacher':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'student':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'parent':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const formatRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">User Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="mx-auto mb-4">
              <img
                className="h-24 w-24 rounded-full object-cover mx-auto"
                src={user.avatar || `/images/user/${user.role}.jpg`}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h3>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 ${getRoleBadgeClass(user.role)}`}>
              {formatRole(user.role)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Personal Information
              </h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{user.email}</dd>
                </div>
                {user.contact && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{user.contact}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {user.createdAt.toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {user.updatedAt.toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Account Details
              </h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</dt>
                  <dd className="text-sm text-gray-900 dark:text-white font-mono">{user.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                  <dd className="text-sm text-green-600 dark:text-green-400">Active</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={() => onEdit(user)}
              className="flex-1"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}