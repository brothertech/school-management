'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import InputField from '@/components/form/input/InputField';
import { useTranslation } from '@/hooks/useTranslation';
import axiosClient from '@/lib/axiosClient';
import Cookies from 'js-cookie';

interface UserFormData {
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  password: string;
}

interface BulkUploadResult {
  success: boolean;
  message: string;
  processed: number;
  errors: string[];
}

type TabType = 'individual' | 'bulk' | 'invite';

const UserRegistrationSettings: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('individual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Individual registration state
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'student',
    password: ''
  });

  // Bulk upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bulkResults, setBulkResults] = useState<BulkUploadResult | null>(null);

  // Invite state
  const [inviteEmails, setInviteEmails] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<'teacher' | 'parent'>('teacher');

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearMessages();
  };

  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const token = Cookies.get('token');
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        roles: [formData.role]
      };

      const response = await axiosClient.post('/admin/users', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message) {
        setSuccess(response.data.message);
        setFormData({
          name: '',
          email: '',
          role: 'student',
          password: ''
        });
      } else {
        setError('Failed to register user');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setSelectedFile(file);
      setBulkResults(null);
      clearMessages();
    } else {
      setError('Please select a valid Excel file (.xlsx)');
    }
  };

  const handleBulkUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    clearMessages();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const token = Cookies.get('token');
      const response = await axiosClient.post('/admin/users', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'successful') {
        setSuccess(response.data.message);
        setBulkResults({
          success: true,
          message: response.data.message,
          processed: parseInt(response.data.message.match(/\d+/)?.[0] || '0'),
          errors: response.data.errors || []
        });
        setSelectedFile(null);
      } else {
        setError(response.data.message || 'Bulk upload failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvites = async () => {
    if (!inviteEmails.trim()) {
      setError('Please enter at least one email address');
      return;
    }

    setLoading(true);
    clearMessages();

    try {
      const emails = inviteEmails.split(',').map(email => email.trim()).filter(email => email);
      const token = Cookies.get('token');
      
      const response = await axiosClient.post('/admin/users/send-invites', {
        emails,
        role: inviteRole
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSuccess(`Invites sent successfully to ${emails.length} ${inviteRole}(s)`);
        setInviteEmails('');
      } else {
        setError(response.data.message || 'Failed to send invites');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send invites');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    // Create a template based on the required and optional columns
    const csvContent = "name,email,role,guardian_name,guardian_phone,school_class_name,section_name,title,department,status\nJohn Doe,john.doe@example.com,student,Jane Doe,+1234567890,Grade 10,A,,,active\nJane Smith,jane.smith@example.com,teacher,,,,,Math Teacher,Mathematics,active";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'individual':
        return (
          <div className="space-y-6">
            <form onSubmit={handleIndividualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <InputField
                  type="text"
                  placeholder="Enter full name"
                  defaultValue={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <InputField
                  type="email"
                  placeholder="Enter email address"
                  defaultValue={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <InputField
                  type="password"
                  placeholder="Enter password"
                  defaultValue={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>

              <Button
                disabled={loading}
                className="w-full md:w-auto"
              >
                {loading ? 'Registering...' : 'Register User'}
              </Button>
            </form>
          </div>
        );

      case 'bulk':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                Bulk Registration for Users
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                Upload an Excel file (.xlsx) with user information. Required columns: name, email, role. Optional columns: guardian_name, guardian_phone, school_class_name, section_name, title, department, status.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadTemplate}
              >
                Download Template
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Excel File
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900/20 dark:file:text-brand-300"
              />
            </div>

            {selectedFile && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Selected file: <span className="font-medium">{selectedFile.name}</span>
                </p>
              </div>
            )}

            <Button
              onClick={handleBulkUpload}
              disabled={loading || !selectedFile}
              className="w-full md:w-auto"
            >
              {loading ? 'Uploading...' : 'Upload Users'}
            </Button>

            {bulkResults && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Upload Results</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Processed: {bulkResults.processed} users
                </p>
                {bulkResults.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Errors:</p>
                    <ul className="text-sm text-red-600 dark:text-red-400 list-disc list-inside">
                      {bulkResults.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'invite':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                Send Invitations
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Send invitation emails to teachers or parents. They will receive a link to complete their registration.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as 'teacher' | 'parent')}
              >
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Addresses <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-900 dark:text-white resize-none"
                rows={4}
                placeholder="Enter email addresses separated by commas&#10;e.g., teacher1@example.com, teacher2@example.com"
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate multiple email addresses with commas
              </p>
            </div>

            <Button
              onClick={handleSendInvites}
              disabled={loading || !inviteEmails.trim()}
              className="w-full md:w-auto"
            >
              {loading ? 'Sending...' : `Send Invites to ${inviteRole}s`}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          User Registration
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Register new users, upload students in bulk, or send invitations to teachers and parents.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'individual', label: 'Individual Registration' },
            { id: 'bulk', label: 'Bulk Upload' },
            { id: 'invite', label: 'Send Invites' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-800 dark:text-green-300">{success}</p>
        </div>
      )}

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserRegistrationSettings;