'use client';

import { useState } from 'react';
import { InterviewFormData } from '../types';

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormData) => void;
  candidateName: string;
  candidateId: string;
  jobTitle: string;
}

const staffMembers = [
  'Sarah Johnson (HR Manager)',
  'Michael Chen (Technical Lead)',
  'Emily Rodriguez (Department Head)',
  'David Kim (Senior Developer)',
  'Lisa Wang (Product Manager)',
  'James Wilson (Team Lead)',
  'Maria Garcia (HR Specialist)'
];

export default function InterviewModal({
  isOpen,
  onClose,
  onSubmit,
  candidateName,
  candidateId,
  jobTitle
}: InterviewModalProps) {
  const [formData, setFormData] = useState<InterviewFormData>({
    candidateId,
    interviewDate: '',
    interviewType: 'Phone',
    interviewers: [],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.interviewDate || formData.interviewers.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
    setFormData({
      candidateId,
      interviewDate: '',
      interviewType: 'Phone',
      interviewers: [],
      notes: ''
    });
    onClose();
  };

  const handleInterviewerToggle = (interviewer: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.includes(interviewer)
        ? prev.interviewers.filter(i => i !== interviewer)
        : [...prev.interviewers, interviewer]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Schedule Interview</h2>
        <p className="text-gray-600 mb-4">
          For: <span className="font-medium">{candidateName}</span> - {jobTitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={formData.interviewDate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                interviewDate: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Type *
            </label>
            <select
              value={formData.interviewType}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                interviewType: e.target.value as 'Phone' | 'Video' | 'In-Person'
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Phone">Phone</option>
              <option value="Video">Video</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interviewer(s) *
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
              {staffMembers.map((staff) => (
                <label key={staff} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={formData.interviewers.includes(staff)}
                    onChange={() => handleInterviewerToggle(staff)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{staff}</span>
                </label>
              ))}
            </div>
            {formData.interviewers.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {formData.interviewers.join(', ')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes/Agenda
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notes: e.target.value
              }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add interview agenda, questions, or special instructions..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}