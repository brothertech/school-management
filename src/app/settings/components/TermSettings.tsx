'use client';

import { useState } from 'react';
import { Term, CreateTermData } from '@/types/settings';
import { mockTerms, mockAcademicSessions } from '@/data/settingsData';

export default function TermSettings() {
  const [terms, setTerms] = useState<Term[]>(mockTerms.map(term => ({
    ...term,
    isCurrent: term.isCurrent || false,
    status: term.status as 'active' | 'completed' | 'upcoming'
  })));
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreateTermData>({
    name: '',
    academicSessionId: mockAcademicSessions[0]?.id || '',
    startDate: new Date(),
    endDate: new Date(),
    order: 1,
    isCurrent: false,
  });

  const handleCreate = () => {
    const academicSession = mockAcademicSessions.find(s => s.id === formData.academicSessionId);
    const newTerm: Term = {
      id: Date.now().toString(),
      ...formData,
      status: 'upcoming',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTerms([...terms, newTerm]);
    setFormData({
      name: '',
      academicSessionId: mockAcademicSessions[0]?.id || '',
      startDate: new Date(),
      endDate: new Date(),
      order: terms.length + 1,
      isCurrent: false,
    });
    setIsCreating(false);
  };

  const handleSetCurrent = (term: Term) => {
    const updatedTerms = terms.map(t => ({
      ...t,
      isCurrent: t.id === term.id,
      status: t.id === term.id ? 'active' : t.status === 'active' ? 'completed' : t.status
    } as Term));
    setTerms(updatedTerms);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAcademicSessionName = (sessionId: string) => {
    const session = mockAcademicSessions.find(s => s.id === sessionId);
    return session?.name || 'Unknown Session';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Terms/Semesters</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Term
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-4">Create New Term</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Term Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Term 1, Semester 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Session
              </label>
              <select
                value={formData.academicSessionId}
                onChange={(e) => setFormData({ ...formData, academicSessionId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {mockAcademicSessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="1"
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
                Current Term
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
                Term
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Academic Session
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
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
            {terms.map((term) => (
              <tr key={term.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {term.name}
                    </span>
                    {term.isCurrent && (
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getAcademicSessionName(term.academicSessionId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(term.startDate)} - {formatDate(term.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {term.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    term.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : term.status === 'completed'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {term.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!term.isCurrent && (
                    <button
                      onClick={() => handleSetCurrent(term)}
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

      {terms.length === 0 && !isCreating && (
        <div className="text-center py-8 text-gray-500">
          No terms found. Create your first term to get started.
        </div>
      )}
    </div>
  );
}