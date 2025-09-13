'use client';

import { useState } from 'react';
import { AcademicSession, CreateAcademicSessionData } from '@/types/settings';
import { mockAcademicSessions } from '@/data/settingsData';

export default function AcademicSessionSettings() {
  const [sessions, setSessions] = useState<AcademicSession[]>(mockAcademicSessions.map(session => ({
    ...session,
    isCurrent: session.isCurrent || false
  })));
  const [isCreating, setIsCreating] = useState(false);
  const [editingSession, setEditingSession] = useState<AcademicSession | null>(null);
  const [formData, setFormData] = useState<CreateAcademicSessionData>({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    isCurrent: false,
  });

  const handleCreate = () => {
    const newSession: AcademicSession = {
      id: Date.now().toString(),
      ...formData,
      isCurrent: formData.isCurrent || false,
      status: 'upcoming',
      terms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions([...sessions, newSession]);
    setFormData({ name: '', startDate: new Date(), endDate: new Date(), isCurrent: false });
    setIsCreating(false);
  };

  const handleSetCurrent = (session: AcademicSession) => {
    const updatedSessions = sessions.map(s => ({
      ...s,
      isCurrent: s.id === session.id,
      status: s.id === session.id ? 'active' : s.status === 'active' ? 'completed' : s.status
    }));
    setSessions(updatedSessions);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Academic Sessions</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Session
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-4">Create New Academic Session</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2024-2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Set as Current
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                  className="mr-2"
                />
                Current Academic Session
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate.toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate.toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Session
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map((session) => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {session.name}
                    </span>
                    {session.isCurrent && (
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(session.startDate)} - {formatDate(session.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    session.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : session.status === 'completed'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!session.isCurrent && (
                    <button
                      onClick={() => handleSetCurrent(session)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Set Current
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sessions.length === 0 && !isCreating && (
        <div className="text-center py-8 text-gray-500">
          No academic sessions found. Create your first academic session to get started.
        </div>
      )}
    </div>
  );
}