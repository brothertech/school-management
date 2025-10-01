'use client';

import { useState } from 'react';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';

export default function SecuritySettings() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // TODO: Implement API call to change password
    console.log('Changing password...');
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleLogoutAllDevices = () => {
    // TODO: Implement API call to logout from all devices
    console.log('Logging out from all devices...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Security Settings
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Manage your account security and password settings.
        </p>
      </div>

      {/* Password Change Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Password
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Change your account password
            </p>
          </div>
          {!isChangingPassword && (
            <Button onClick={() => setIsChangingPassword(true)}>
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                defaultValue={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="mt-1"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                defaultValue={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="mt-1"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                defaultValue={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1"
                placeholder="Confirm your new password"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
              >
                Update Password
              </button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Session Management */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Active Sessions
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Logout from all devices except this one
            </p>
          </div>
          <Button variant="outline" onClick={handleLogoutAllDevices}>
            Logout All Devices
          </Button>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h4 className="text-md font-medium text-blue-900 dark:text-blue-100 mb-2">
          Security Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Use a strong, unique password for your account</li>
          <li>• Don't share your login credentials with others</li>
          <li>• Log out from shared or public computers</li>
          <li>• Report any suspicious activity immediately</li>
        </ul>
      </div>
    </div>
  );
}