'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Candidate, CandidateFilters } from '../job-openings/types';

// Mock data for candidates
const mockCandidates: Candidate[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    jobOpeningId: '1',
    jobTitle: 'Senior Frontend Developer',
    applicationDate: '2024-01-15',
    status: 'New',
    cvFile: { name: 'john_doe_cv.pdf', type: 'application/pdf' },
    coverLetter: 'Experienced frontend developer with 5+ years in React and TypeScript.',
    whyGoodFit: 'I have extensive experience with modern frontend frameworks and a strong portfolio of successful projects.'
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    jobOpeningId: '2',
    jobTitle: 'UX Designer',
    applicationDate: '2024-01-14',
    status: 'Shortlisted',
    cvFile: { name: 'jane_smith_resume.docx', type: 'application/docx' },
    additionalFiles: [
      { name: 'portfolio.pdf', type: 'application/pdf' },
      { name: 'references.docx', type: 'application/docx' }
    ],
    coverLetter: 'Creative UX designer with a passion for user-centered design.',
    whyGoodFit: 'My design philosophy aligns perfectly with your company\'s user-first approach.'
  },
  {
    id: '3',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    jobOpeningId: '1',
    jobTitle: 'Senior Frontend Developer',
    applicationDate: '2024-01-13',
    status: 'Interview',
    cvFile: { name: 'mike_johnson_cv.pdf', type: 'application/pdf' },
    coverLetter: 'Senior developer specializing in performance optimization.',
    whyGoodFit: 'I have a proven track record of improving application performance by 40%+.'
  },
  {
    id: '4',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 789-0123',
    jobOpeningId: '3',
    jobTitle: 'Product Manager',
    applicationDate: '2024-01-12',
    status: 'Offer',
    cvFile: { name: 'sarah_wilson_resume.pdf', type: 'application/pdf' },
    coverLetter: 'Strategic product manager with experience in agile development.',
    whyGoodFit: 'I successfully launched 3 products that achieved 200%+ revenue growth.'
  },
  {
    id: '5',
    fullName: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 321-0987',
    jobOpeningId: '2',
    jobTitle: 'UX Designer',
    applicationDate: '2024-01-11',
    status: 'Rejected',
    cvFile: { name: 'david_brown_cv.docx', type: 'application/docx' },
    coverLetter: 'Junior UX designer looking for an opportunity to grow.',
    whyGoodFit: 'I bring fresh perspectives and enthusiasm to the design process.'
  }
];

// Mock job openings for filter
const mockJobOpenings = [
  { id: '1', title: 'Senior Frontend Developer' },
  { id: '2', title: 'UX Designer' },
  { id: '3', title: 'Product Manager' }
];

const statusOptions: Candidate['status'][] = ['New', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

export default function CandidatesPage() {
  const [filters, setFilters] = useState<CandidateFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const matchesJob = !filters.jobOpeningId || candidate.jobOpeningId === filters.jobOpeningId;
      const matchesStatus = !filters.status || candidate.status === filters.status;
      const matchesSearch = !searchTerm || 
        candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Date filtering (simplified)
      let matchesDate = true;
      if (filters.startDate) {
        matchesDate = candidate.applicationDate >= filters.startDate;
      }
      if (filters.endDate && matchesDate) {
        matchesDate = candidate.applicationDate <= filters.endDate;
      }

      return matchesJob && matchesStatus && matchesSearch && matchesDate;
    });
  }, [filters, searchTerm]);

  const groupedCandidates = useMemo(() => {
    const groups: Record<string, Candidate[]> = {};
    
    filteredCandidates.forEach(candidate => {
      if (!groups[candidate.jobTitle]) {
        groups[candidate.jobTitle] = [];
      }
      groups[candidate.jobTitle].push(candidate);
    });

    return groups;
  }, [filteredCandidates]);

  const getStatusColor = (status: Candidate['status']) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800',
      Shortlisted: 'bg-purple-100 text-purple-800',
      Interview: 'bg-yellow-100 text-yellow-800',
      Offer: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Management</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Candidates
            </label>
            <input
              type="text"
              placeholder="Search by name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Job
            </label>
            <select
              value={filters.jobOpeningId || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                jobOpeningId: e.target.value || undefined
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Jobs</option>
              {mockJobOpenings.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                status: e.target.value as Candidate['status'] || undefined
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Date From
            </label>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                startDate: e.target.value || undefined
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Date To
            </label>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                endDate: e.target.value || undefined
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setFilters({})}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Candidates grouped by Job Opening */}
      <div className="space-y-6">
        {Object.entries(groupedCandidates).map(([jobTitle, candidates]) => (
          <div key={jobTitle} className="bg-white rounded-lg shadow-md">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{jobTitle}</h2>
              <p className="text-sm text-gray-600">{candidates.length} candidate(s)</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application Date
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
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {candidate.fullName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(candidate.applicationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/recruitment/candidates/${candidate.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {Object.keys(groupedCandidates).length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find candidates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}