'use client';

import { useState } from 'react';
import { InterviewFeedbackFormData } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFeedbackFormData) => void;
  candidateName: string;
  interviewDate: string;
  interviewType: string;
  interviewId: string;
  currentUser: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  candidateName,
  interviewDate,
  interviewType,
  interviewId,
  currentUser
}: FeedbackModalProps) {
  const [formData, setFormData] = useState<InterviewFeedbackFormData>({
    interviewId,
    rating: 3,
    comments: '',
    recommendation: 'Pass'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comments.trim()) {
      alert('Please provide comments for your feedback');
      return;
    }
    onSubmit(formData);
    setFormData({
      interviewId,
      rating: 3,
      comments: '',
      recommendation: 'Pass'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Interview Feedback</h2>
        <p className="text-gray-600 mb-4">
          For: <span className="font-medium">{candidateName}</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {new Date(interviewDate).toLocaleDateString()} - {interviewType} Interview
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating (1-5)
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors ${
                    formData.rating >= star
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {star}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommendation
            </label>
            <select
              value={formData.recommendation}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recommendation: e.target.value as 'Pass' | 'Fail' | 'Next Round'
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pass">Pass - Ready for Offer</option>
              <option value="Next Round">Next Round - Additional Interview Needed</option>
              <option value="Fail">Fail - Not Suitable</option>
            </select>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments & Notes *
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide detailed feedback about the candidate's performance, strengths, weaknesses, and any specific observations..."
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
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}