'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  whyGoodFit: string;
  cvFile: File | null;
  additionalFiles: File[];
}

export default function ApplyPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    whyGoodFit: '',
    cvFile: null,
    additionalFiles: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'cvFile' | 'additionalFiles') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'cvFile') {
      setFormData(prev => ({
        ...prev,
        cvFile: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        additionalFiles: Array.from(files)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app this would send data to API
    console.log('Application submitted:', {
      jobId,
      ...formData,
      cvFileName: formData.cvFile?.name,
      additionalFileNames: formData.additionalFiles.map(f => f.name)
    });
    
    setIsSubmitted(true);
    
    // Mock state storage
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    applications.push({
      jobId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
            <p className="text-lg">
              Your application has been submitted successfully. We will contact you if shortlisted.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link
              href={`/jobs/${jobId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Back to Job Details
            </Link>
            <Link
              href="/jobs"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Browse More Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        href={`/jobs/${jobId}`} 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to job details
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Apply for Position</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* CV/Resume Upload */}
          <div>
            <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700 mb-2">
              CV/Resume * (PDF or DOC)
            </label>
            <input
              type="file"
              id="cvFile"
              name="cvFile"
              required
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, 'cvFile')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.cvFile && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {formData.cvFile.name}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter *
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              required
              rows={6}
              value={formData.coverLetter}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your cover letter here..."
            />
          </div>

          {/* Custom Question */}
          <div>
            <label htmlFor="whyGoodFit" className="block text-sm font-medium text-gray-700 mb-2">
              Why are you a good fit for this position? *
            </label>
            <textarea
              id="whyGoodFit"
              name="whyGoodFit"
              required
              rows={4}
              value={formData.whyGoodFit}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share what makes you the ideal candidate..."
            />
          </div>

          {/* Optional Attachments */}
          <div>
            <label htmlFor="additionalFiles" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Attachments (Optional)
            </label>
            <input
              type="file"
              id="additionalFiles"
              name="additionalFiles"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'additionalFiles')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            {formData.additionalFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Selected files:</p>
                <ul className="text-sm text-green-600">
                  {formData.additionalFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
            <Link
              href={`/jobs/${jobId}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}