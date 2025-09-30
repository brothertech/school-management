'use client';

import React, { useState } from 'react';
import { JobOpeningFormData } from '../types';

interface JobOpeningFormProps {
  onSubmit: (data: JobOpeningFormData) => void;
  onClose: () => void;
}

const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Customer Support'
];

const hiringManagers = [
  'John Smith',
  'Jane Doe',
  'Mike Johnson',
  'Sarah Wilson',
  'David Brown'
];

const skillsOptions = [
  'JavaScript',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'UI/UX Design',
  'Project Management',
  'Communication',
  'Leadership'
];

export default function JobOpeningForm({ onSubmit, onClose }: JobOpeningFormProps) {
  const [formData, setFormData] = useState<JobOpeningFormData>({
    jobTitle: '',
    department: '',
    hiringManager: '',
    numberOfPositions: 1,
    jobType: 'Full-time',
    salaryRange: '',
    jobDescription: '',
    requiredQualifications: '',
    skills: [],
    experienceLevel: 'Mid-level',
    postingType: 'External',
    status: 'Pending Approval'
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills(prev => [...prev, newSkill.trim()]);
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills || [], newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: selectedSkills
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Hiring Manager */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hiring Manager *
              </label>
              <select
                name="hiringManager"
                value={formData.hiringManager}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Hiring Manager</option>
                {hiringManagers.map(manager => (
                  <option key={manager} value={manager}>{manager}</option>
                ))}
              </select>
            </div>

            {/* Number of Positions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Positions *
              </label>
              <input
                type="number"
                name="numberOfPositions"
                value={formData.numberOfPositions}
                onChange={handleNumberChange}
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type *
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range (Optional)
              </label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleInputChange}
                placeholder="e.g., $80,000 - $100,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level *
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            {/* Posting Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posting Type *
              </label>
              <select
                name="postingType"
                value={formData.postingType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map(skill => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the role, responsibilities, and expectations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Required Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Qualifications
            </label>
            <textarea
              name="requiredQualifications"
              value={formData.requiredQualifications}
              onChange={handleInputChange}
              rows={3}
              placeholder="List the required qualifications, education, and experience..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}