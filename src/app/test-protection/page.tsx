'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function TestProtectionPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const clearStorageAndTest = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    // Redirect to dashboard to test protection
    router.push('/');
  };

  const testDashboardAccess = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Protection Test</h1>
        
        {/* Current Status */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {user ? 'Yes' : 'No'}</p>
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            {user && (
              <>
                <p><strong>User:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.primary_role}</p>
              </>
            )}
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Protection Tests</h2>
          
          <div className="space-y-4">
            <div>
              <button
                onClick={testDashboardAccess}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
              >
                Test Dashboard Access (Current State)
              </button>
              <span className="text-sm text-gray-600">
                {user ? 'Should allow access' : 'Should redirect to login'}
              </span>
            </div>

            <div>
              <button
                onClick={clearStorageAndTest}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-4"
              >
                Clear Auth & Test Dashboard
              </button>
              <span className="text-sm text-gray-600">
                Will clear localStorage and redirect to dashboard (should redirect to login)
              </span>
            </div>

            {user && (
              <div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-4"
                >
                  Logout & Test Dashboard
                </button>
                <span className="text-sm text-gray-600">
                  Will logout properly and then you can test dashboard access
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <div className="space-y-2 text-sm">
            <p><strong>1. Test Authenticated Access:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>If you're logged in, click "Test Dashboard Access" - should work normally</li>
              <li>Dashboard should load with sidebar and content</li>
            </ul>
            
            <p className="pt-4"><strong>2. Test Unauthenticated Access:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Click "Clear Auth & Test Dashboard" to simulate unauthenticated state</li>
              <li>Should redirect to /auth/signin automatically</li>
              <li>Should show loading spinner briefly during redirect</li>
            </ul>

            <p className="pt-4"><strong>3. Manual Test:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Open browser dev tools (F12)</li>
              <li>Go to Application/Storage tab</li>
              <li>Clear localStorage manually</li>
              <li>Navigate to http://localhost:3000/</li>
              <li>Should redirect to login page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}