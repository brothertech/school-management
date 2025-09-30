'use client';

import React, { useState } from 'react';
import { JobOpening } from './types';
import JobOpeningsTable from './components/JobOpeningsTable';
import JobOpeningForm from './components/JobOpeningForm';

export default function JobOpeningsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([
    {
      id: '1',
      jobTitle: 'Frontend Developer',
      department: 'Engineering',
      jobType: 'Full-time',
      status: 'Open',
      datePosted: '2024-01-15',
      hiringManager: 'John Smith',
      numberOfPositions: 2,
      salaryRange: '$80,000 - $100,000',
      experienceLevel: 'Mid-level',
      postingType: 'External'
    },
    {
      id: '2',
      jobTitle: 'UX Designer',
      department: 'Design',
      jobType: 'Full-time',
      status: 'Pending Approval',
      datePosted: '2024-01-10',
      hiringManager: 'Jane Doe',
      numberOfPositions: 1,
      salaryRange: '$70,000 - $90,000',
      experienceLevel: 'Senior',
      postingType: 'Both'
    }
  ]);

  const handleCreateJob = (jobData: Omit<JobOpening, 'id'>) => {
    const newJob: JobOpening = {
      ...jobData,
      id: Date.now().toString(),
    };
    setJobOpenings(prev => [...prev, newJob]);
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Openings</h1>
        <p className="text-gray-600">
          Manage and track all job openings and recruitment activities
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + New Job Opening
        </button>
      </div>

      <JobOpeningsTable jobOpenings={jobOpenings} />

      {isFormOpen && (
        <JobOpeningForm
          onSubmit={handleCreateJob}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}