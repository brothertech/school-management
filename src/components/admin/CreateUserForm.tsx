"use client";

import React, { useState } from 'react';
import { CreateUserData } from '@/types/user';
import Button from '@/components/ui/button/Button';
import InputField from '@/components/form/input/InputField';

interface CreateUserFormProps {
  onSubmit: (userData: CreateUserData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CreateUserForm({ onSubmit, onCancel, isLoading = false }: CreateUserFormProps) {
  const [formData, setFormData] = useState<CreateUserData>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student',
    contact: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserData, string>>>({});

  const handleInputChange = (field: keyof CreateUserData, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateUserData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Create New User</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputField
                  // label="First Name"
                  type="text"
                  defaultValue={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e)}
                  error={!!errors.firstName}
              // required
                />
              </div>
              <div>
                <InputField
                  // label="Last Name"
                  type="text"
                  defaultValue={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e)}
                  error={!!errors.lastName}
              // required
                />
              </div>
            </div>

            <InputField
              // label="Email Address"
              type="email"
              defaultValue={formData.email}
              onChange={(e) => handleInputChange('email', e)}
              error={!!errors.email}
            
            />

            <InputField
              // label="Contact Number"
              type="tel"
              defaultValue={formData.contact || ''}
              onChange={(e) => handleInputChange('contact', e)}
              placeholder="Optional"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value as any)}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <InputField
              aria-label="Password"
              type="password"
              defaultValue={formData.password}
              onChange={(e) => handleInputChange('password', e)}
              error={!!errors.password}
            />

            <div className="flex space-x-4 pt-4">
              <Button
                // type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
              // isLoading={isLoading}
              className="w-full"
            >
              Create User
            </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}