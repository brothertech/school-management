'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function TestLoginPage() {
  const { login, logout, user, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('admin@schoolmanager.test');
  const [password, setPassword] = useState('password123');
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testLogin = async () => {
    clearError();
    addTestResult('Testing login...');
    
    try {
      const success = await login(email, password);
      if (success) {
        addTestResult('✅ Login successful');
        addTestResult(`User: ${user?.name} (${user?.primary_role})`);
        addTestResult(`Modules: ${JSON.stringify(user?.module_visibility)}`);
      } else {
        addTestResult('❌ Login failed');
      }
    } catch (err) {
      addTestResult(`❌ Login error: ${err}`);
    }
  };

  const testLogout = async () => {
    addTestResult('Testing logout...');
    try {
      await logout();
      addTestResult('✅ Logout successful');
    } catch (err) {
      addTestResult(`❌ Logout error: ${err}`);
    }
  };

  const testInvalidCredentials = async () => {
    clearError();
    addTestResult('Testing invalid credentials...');
    
    try {
      const success = await login('invalid@test.com', 'wrongpassword');
      if (!success) {
        addTestResult('✅ Invalid credentials properly rejected');
      } else {
        addTestResult('❌ Invalid credentials should have been rejected');
      }
    } catch (err) {
      addTestResult(`✅ Invalid credentials error handled: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Login Functionality Test</h1>
        
        {/* Current User Status */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {user ? 'Yes' : 'No'}</p>
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error || 'None'}</p>
            {user && (
              <>
                <p><strong>User:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.primary_role}</p>
                <p><strong>Roles:</strong> {user.roles?.join(', ')}</p>
                <p><strong>Module Visibility:</strong></p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
                  {JSON.stringify(user.module_visibility, null, 2)}
                </pre>
              </>
            )}
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={testLogin}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Login
            </button>
            <button
              onClick={testLogout}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Test Logout
            </button>
            <button
              onClick={testInvalidCredentials}
              disabled={isLoading}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              Test Invalid Credentials
            </button>
            <button
              onClick={() => setTestResults([])}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p>No test results yet. Run some tests above.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index}>{result}</div>
              ))
            )}
          </div>
        </div>

        {/* API Information */}
        <div className="bg-blue-50 p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">API Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Base URL:</strong> https://schoolmanger.test/api</p>
            <p><strong>Login Endpoint:</strong> POST /auth/login</p>
            <p><strong>Expected Payload:</strong></p>
            <pre className="bg-white p-2 rounded">
{`{
  "email": "user@example.com",
  "password": "password123"
}`}
            </pre>
            <p><strong>Expected Success Response:</strong></p>
            <pre className="bg-white p-2 rounded">
{`{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "roles": ["Admin"],
    "primary_role": "Admin",
    "module_visibility": {
      "students": true,
      "teachers": true,
      // ... other modules
    }
  },
  "token": "jwt_token_here"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}