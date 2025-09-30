'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { JobOpening } from '../recruitment/job-openings/types';

// Mock data for public job listings
const mockJobOpenings: JobOpening[] = [
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
    postingType: 'External',
    jobDescription: 'We are looking for a skilled Frontend Developer to join our team...',
    requiredQualifications: 'Bachelor\'s degree in Computer Science or related field...',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript']
  },
  {
    id: '2',
    jobTitle: 'UX Designer',
    department: 'Design',
    jobType: 'Full-time',
    status: 'Open',
    datePosted: '2024-01-10',
    hiringManager: 'Jane Doe',
    numberOfPositions: 1,
    salaryRange: '$70,000 - $90,000',
    experienceLevel: 'Senior',
    postingType: 'Both',
    jobDescription: 'Join our design team to create amazing user experiences...',
    requiredQualifications: '5+ years of UX design experience...',
    skills: ['Figma', 'User Research', 'Prototyping', 'UI Design']
  },
  {
    id: '3',
    jobTitle: 'Backend Engineer',
    department: 'Engineering',
    jobType: 'Full-time',
    status: 'Open',
    datePosted: '2024-01-20',
    hiringManager: 'Mike Johnson',
    numberOfPositions: 3,
    salaryRange: '$90,000 - $120,000',
    experienceLevel: 'Senior',
    postingType: 'External',
    jobDescription: 'Design and implement scalable backend systems...',
    requiredQualifications: 'Experience with Node.js and databases...',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker']
  }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  const filteredJobs = useMemo(() => {
    return mockJobOpenings.filter(job => {
      const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
      const matchesJobType = !selectedJobType || job.jobType === selectedJobType;
      
      return matchesSearch && matchesDepartment && matchesJobType && job.status === 'Open';
    });
  }, [searchTerm, selectedDepartment, selectedJobType]);

  const departments = Array.from(new Set(mockJobOpenings.map(job => job.department)));
  const jobTypes = Array.from(new Set(mockJobOpenings.map(job => job.jobType)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Opportunities</h1>
        <p className="text-xl text-gray-600">Join our team and grow with us</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Jobs
            </label>
            <input
              type="text"
              placeholder="Search by title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Job Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No job openings match your criteria.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.jobTitle}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>Department: {job.department}</span>
                    <span>Type: {job.jobType}</span>
                    <span>Posted: {job.datePosted}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.status}
                    </span>
                    {job.salaryRange && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.salaryRange}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-center transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium text-center transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}