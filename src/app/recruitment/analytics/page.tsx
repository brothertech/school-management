'use client';

import { useState } from 'react';

// Mock data for analytics
const mockData = {
  jobOpenings: {
    active: 12,
    closed: 8,
    total: 20
  },
  applications: {
    total: 156,
    thisMonth: 24,
    lastMonth: 32
  },
  candidatesByStatus: {
    New: 42,
    Shortlisted: 28,
    Interview: 18,
    Offer: 8,
    Rejected: 60
  },
  timeToHire: {
    average: 24, // days
    min: 14,
    max: 45
  },
  sources: {
    LinkedIn: 45,
    'Company Website': 32,
    'Job Boards': 28,
    Referrals: 18,
    Other: 33
  },
  pipeline: {
    Applied: 156,
    Shortlisted: 42,
    Interviewed: 28,
    Offered: 12,
    Hired: 8,
    Rejected: 66
  }
};

export default function RecruitmentAnalytics() {
  const [selectedChart, setSelectedChart] = useState<'bar' | 'pie'>('bar');

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(`Exporting analytics data to ${format.toUpperCase()} format (mock functionality)`);
  };

  const calculateConversionRate = (current: number, previous: number) => {
    return previous > 0 ? ((current / previous) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Recruitment Analytics</h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Job Openings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Job Openings</h3>
              <p className="text-2xl font-bold text-gray-900">{mockData.jobOpenings.total}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-green-600 font-medium">
                {mockData.jobOpenings.active} Active
              </span>
              <br />
              <span className="text-sm text-gray-500">
                {mockData.jobOpenings.closed} Closed
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(mockData.jobOpenings.active / mockData.jobOpenings.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Total Applications</h3>
            <p className="text-2xl font-bold text-gray-900">{mockData.applications.total}</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">{mockData.applications.thisMonth}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Month</span>
              <span className="font-medium">{mockData.applications.lastMonth}</span>
            </div>
          </div>
        </div>

        {/* Average Time to Hire */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Avg Time to Hire</h3>
            <p className="text-2xl font-bold text-gray-900">{mockData.timeToHire.average} days</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fastest</span>
              <span className="text-green-600 font-medium">{mockData.timeToHire.min} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Slowest</span>
              <span className="text-red-600 font-medium">{mockData.timeToHire.max} days</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Offer Acceptance Rate</h3>
            <p className="text-2xl font-bold text-gray-900">
              {calculateConversionRate(mockData.pipeline.Hired, mockData.pipeline.Offered)}%
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Offers Made</span>
              <span className="font-medium">{mockData.pipeline.Offered}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hired</span>
              <span className="text-green-600 font-medium">{mockData.pipeline.Hired}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidates by Status Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Candidates by Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedChart('bar')}
                className={`px-3 py-1 rounded text-sm ${
                  selectedChart === 'bar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setSelectedChart('pie')}
                className={`px-3 py-1 rounded text-sm ${
                  selectedChart === 'pie'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Pie
              </button>
            </div>
          </div>
          
          {selectedChart === 'bar' ? (
            <div className="space-y-3">
              {Object.entries(mockData.candidatesByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center">
                  <span className="w-24 text-sm text-gray-600">{status}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className={`h-6 rounded-full ${
                        status === 'Hired' ? 'bg-green-500' :
                        status === 'Interview' ? 'bg-yellow-500' :
                        status === 'Rejected' ? 'bg-red-500' :
                        status === 'Offer' ? 'bg-blue-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${(count / Math.max(...Object.values(mockData.candidatesByStatus))) * 80}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-gray-600">Pie Chart View</span>
                </div>
                {/* Mock pie chart segments */}
                <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }} />
                <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%, 50% 100%)' }} />
                <div className="absolute inset-0 rounded-full border-8 border-yellow-500" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 50% 100%)' }} />
              </div>
              <div className="ml-6 space-y-2">
                {Object.entries(mockData.candidatesByStatus).map(([status, count], index) => (
                  <div key={status} className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded mr-2 ${
                        index === 0 ? 'bg-green-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-yellow-500' :
                        index === 3 ? 'bg-purple-500' :
                        'bg-red-500'
                      }`}
                    />
                    <span className="text-sm text-gray-600">{status}</span>
                    <span className="ml-2 text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Source of Applicants */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Source of Applicants</h3>
          <div className="space-y-4">
            {Object.entries(mockData.sources).map(([source, count]) => {
              const total = Object.values(mockData.sources).reduce((a, b) => a + b, 0);
              const percentage = ((count / total) * 100).toFixed(1);
              
              return (
                <div key={source} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{source}</span>
                    <span className="font-medium">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Candidate Pipeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Pipeline</h3>
        <div className="grid grid-cols-6 gap-4">
          {Object.entries(mockData.pipeline).map(([stage, count], index) => {
            const total = Object.values(mockData.pipeline).reduce((a, b) => a + b, 0);
            const percentage = index > 0 
              ? ((count / Object.values(mockData.pipeline)[index - 1]) * 100).toFixed(1)
              : '100';
            
            return (
              <div key={stage} className="text-center">
                <div className={`p-4 rounded-lg ${
                  stage === 'Hired' ? 'bg-green-100 border border-green-200' :
                  stage === 'Rejected' ? 'bg-red-100 border border-red-200' :
                  'bg-blue-100 border border-blue-200'
                }`}>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600 mt-1">{stage}</div>
                </div>
                {index > 0 && (
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-500">{percentage}%</span>
                  </div>
                )}
                {index < Object.keys(mockData.pipeline).length - 1 && (
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Pipeline Progress Bars */}
        <div className="mt-6 space-y-4">
          {Object.entries(mockData.pipeline).map(([stage, count], index) => {
            if (index === 0) return null;
            
            const previousCount = Object.values(mockData.pipeline)[index - 1];
            const conversionRate = ((count / previousCount) * 100).toFixed(1);
            
            return (
              <div key={stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {Object.keys(mockData.pipeline)[index - 1]} → {stage}
                  </span>
                  <span className="font-medium">{conversionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      parseFloat(conversionRate) > 50 ? 'bg-green-500' :
                      parseFloat(conversionRate) > 25 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${conversionRate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}