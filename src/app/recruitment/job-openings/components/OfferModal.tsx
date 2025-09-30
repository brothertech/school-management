'use client';

import { useState } from 'react';
import { JobOfferFormData } from '../types';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobOfferFormData) => void;
  candidateName: string;
  candidateId: string;
  currentUser: string;
}

export default function OfferModal({
  isOpen,
  onClose,
  onSubmit,
  candidateName,
  candidateId,
  currentUser
}: OfferModalProps) {
  const [formData, setFormData] = useState<JobOfferFormData>({
    positionTitle: '',
    salary: '',
    benefits: '',
    startDate: '',
    notes: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.positionTitle.trim() || !formData.salary.trim() || !formData.startDate) {
      alert('Please fill in all required fields: Position Title, Salary, and Start Date');
      return;
    }
    onSubmit(formData);
    setFormData({
      positionTitle: '',
      salary: '',
      benefits: '',
      startDate: '',
      notes: ''
    });
    setShowPreview(false);
    onClose();
  };

  const generateOfferPreview = () => {
    return `
      OFFER LETTER
      
      Dear ${candidateName},
      
      We are pleased to offer you the position of ${formData.positionTitle} at our company.
      
      Position Details:
      - Title: ${formData.positionTitle}
      - Salary: ${formData.salary}
      - Benefits: ${formData.benefits || 'Standard company benefits'}
      - Start Date: ${formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'To be determined'}
      
      Terms and Conditions:
      ${formData.notes || 'Standard employment terms apply.'}
      
      Please review this offer and respond by [Date].
      
      Sincerely,
      ${currentUser}
      HR Department
    `;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Generate Offer Letter</h2>
        <p className="text-gray-600 mb-6">
          For: <span className="font-medium">{candidateName}</span>
        </p>

        {!showPreview ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Position Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position Title *
              </label>
              <input
                type="text"
                value={formData.positionTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, positionTitle: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary *
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., $95,000 - $110,000 per year"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits
              </label>
              <textarea
                value={formData.benefits}
                onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Health insurance, retirement plan, paid time off, etc."
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notes/Terms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes & Terms
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional terms, conditions, or special notes for the candidate..."
              />
            </div>

            <div className="flex justify-between space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!formData.positionTitle || !formData.salary || !formData.startDate}
              >
                Preview Offer
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Offer Letter Preview</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {generateOfferPreview()}
              </pre>
            </div>
            
            <div className="flex justify-between space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Send Offer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}