'use client';

import { useState } from 'react';
import { GradeScale, CreateGradeScaleData } from '@/types/settings';
import { mockGradeScales } from '@/data/settingsData';

export default function GradeScaleSettings() {
  const [gradeScales, setGradeScales] = useState<GradeScale[]>(mockGradeScales);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreateGradeScaleData>({
    name: '',
    description: '',
    minPercentage: 0,
    maxPercentage: 0,
    grade: '',
    gradePoint: 0,
    remarks: '',
    isActive: true,
  });

  const handleCreate = () => {
    const newGradeScale: GradeScale = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGradeScales([...gradeScales, newGradeScale]);
    setFormData({
      name: '',
      description: '',
      minPercentage: 0,
      maxPercentage: 0,
      grade: '',
      gradePoint: 0,
      remarks: '',
      isActive: true,
    });
    setIsCreating(false);
  };

  const handleToggleActive = (id: string) => {
    setGradeScales(gradeScales.map(scale => 
      scale.id === id ? { ...scale, isActive: !scale.isActive } : scale
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Grading Scale</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Grade
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-4">Add New Grade Scale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., A+, A, B+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade Symbol
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., A+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Percentage
              </label>
              <input
                type="number"
                value={formData.minPercentage}
                onChange={(e) => setFormData({ ...formData, minPercentage: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Percentage
              </label>
              <input
                type="number"
                value={formData.maxPercentage}
                onChange={(e) => setFormData({ ...formData, maxPercentage: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade Point
              </label>
              <input
                type="number"
                value={formData.gradePoint}
                onChange={(e) => setFormData({ ...formData, gradePoint: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                max="4"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Excellent, Very Good"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Remarks
              </label>
              <input
                type="text"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Outstanding performance"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                Active
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Grade
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

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Current Grading Scale</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {gradeScales
            .filter(scale => scale.isActive)
            .sort((a, b) => b.minPercentage - a.minPercentage)
            .map((scale, index) => (
            <div key={scale.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {scale.grade}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{scale.name}</h4>
                    <p className="text-sm text-gray-500">{scale.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {scale.minPercentage}% - {scale.maxPercentage}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Grade Point: {scale.gradePoint}
                  </div>
                </div>
              </div>
              {scale.remarks && (
                <div className="mt-2 text-sm text-gray-600">
                  {scale.remarks}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {gradeScales.some(scale => !scale.isActive) && (
        <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Inactive Grades</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {gradeScales
              .filter(scale => !scale.isActive)
              .map((scale) => (
              <div key={scale.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {scale.grade}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">{scale.name}</h4>
                      <p className="text-sm text-gray-400">{scale.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">
                      {scale.minPercentage}% - {scale.maxPercentage}%
                    </div>
                    <div className="text-sm text-gray-400">
                      Grade Point: {scale.gradePoint}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleToggleActive(scale.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {gradeScales.length === 0 && !isCreating && (
        <div className="text-center py-8 text-gray-500">
          No grade scales found. Create your first grade scale to get started.
        </div>
      )}
    </div>
  );
}