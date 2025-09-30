'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { JobOpening } from '../../../../recruitment/job-openings/types';

// Mock data - in real app this would come from API
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
    jobDescription: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for building modern, responsive web applications using React and TypeScript. The ideal candidate has a strong understanding of modern frontend development practices and enjoys working in a collaborative environment.',
    requiredQualifications: '• Bachelor\'s degree in Computer Science or related field\n• 3+ years of professional frontend development experience\n• Strong proficiency in React, TypeScript, and modern JavaScript\n• Experience with state management libraries (Redux, Zustand)\n• Familiarity with build tools like Webpack and Vite\n• Understanding of responsive design principles',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'HTML5', 'Git']
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
    jobDescription: 'Join our design team to create amazing user experiences for our educational platform. You will work closely with product managers and developers to design intuitive interfaces that enhance the learning experience for students and educators.',
    requiredQualifications: '• 5+ years of UX design experience\n• Portfolio demonstrating user-centered design solutions\n• Proficiency in Figma, Sketch, or similar design tools\n• Experience with user research and usability testing\n• Strong understanding of design systems and component libraries\n• Excellent communication and collaboration skills',
    skills: ['Figma', 'User Research', 'Prototyping', 'UI Design', 'Wireframing', 'Design Systems']
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
    jobDescription: 'Design and implement scalable backend systems for our educational platform. You will work on API development, database design, and system architecture to support our growing user base. The ideal candidate has experience with cloud infrastructure and microservices architecture.',
    requiredQualifications: '• Bachelor\'s or Master\'s degree in Computer Science\n• 5+ years of backend development experience\n• Strong proficiency in Node.js and TypeScript\n• Experience with PostgreSQL, MongoDB, or similar databases\n• Knowledge of cloud platforms (AWS, GCP, or Azure)\n• Understanding of RESTful API design and microservices',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis', 'Microservices']
  }
];

// Share buttons component
function ShareButtons({ jobTitle }: { jobTitle: string }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = (platform: string) => {
    // Mock share functionality - in real app this would open share dialogs
    console.log(`Sharing ${jobTitle} on ${platform}`);
    alert(`Sharing feature would open ${platform} share dialog`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Share this job</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleShare('Facebook')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span className="w-5 h-5">📘</span>
          Facebook
        </button>
        
        <button
          onClick={() => handleShare('Twitter')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          <span className="w-5 h-5">🐦</span>
          Twitter
        </button>
        
        <button
          onClick={() => handleShare('LinkedIn')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
        >
          <span className="w-5 h-5">💼</span>
          LinkedIn
        </button>
        
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span className="w-5 h-5">🔗</span>
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  
  const job = mockJobOpenings.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link href="/jobs" className="text-blue-600 hover:text-blue-700">
            ← Back to all jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back to jobs link */}
      <Link 
        href="/jobs" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to all jobs
      </Link>

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Department: {job.department}</span>
              <span>Type: {job.jobType}</span>
              <span>Posted: {job.datePosted}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link
              href={`/jobs/${job.id}/apply`}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors block"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Job Status and Salary */}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {job.status}
          </span>
          {job.salaryRange && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              💰 {job.salaryRange}
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            👥 {job.numberOfPositions} position(s)
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
            📍 {job.experienceLevel}
          </span>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line mb-6">{job.jobDescription}</p>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Qualifications</h2>
        <p className="text-gray-700 whitespace-pre-line mb-6">{job.requiredQualifications}</p>

        {job.skills && job.skills.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-blue-700">
            <strong>Hiring Manager:</strong> {job.hiringManager}
          </p>
          <p className="text-blue-700">
            <strong>Posting Type:</strong> {job.postingType}
          </p>
        </div>

        <div className="text-center">
          <Link
            href={`/jobs/${job.id}/apply`}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Apply for this Position
          </Link>
        </div>
      </div>

      {/* Share Buttons */}
      <ShareButtons jobTitle={job.jobTitle} />
    </div>
  );
}