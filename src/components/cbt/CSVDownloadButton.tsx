'use client';

import React from 'react';
import Button from '@/components/ui/button/Button';
import { DownloadIcon } from '@/icons';
import { getAllExamResults } from '@/data/examResultsData';
import { mockExams } from '@/data/examData';

interface CSVDownloadButtonProps {
  examId?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const CSVDownloadButton: React.FC<CSVDownloadButtonProps> = ({ 
  examId, 
  variant = 'outline', 
  size = 'md' 
}) => {
  const handleDownload = () => {
    const allResults = getAllExamResults();
    const filteredResults = examId 
      ? allResults.filter(result => result.examId === examId)
      : allResults;

    // Create CSV content
    const headers = [
      'Student Name',
      'Class',
      'Exam Title',
      'Score (%)',
      'Grade',
      'Status',
      'Date',
      'Remarks'
    ];

    const rows = filteredResults.map(result => {
      const exam = mockExams.find(e => e.id === result.examId);
      const status = result.isAbsent ? 'Absent' : result.marksObtained === 0 ? 'Incomplete' : 'Completed';
      
      return [
        result.studentName,
        exam?.classSection || 'N/A',
        exam?.title || 'Unknown Exam',
        result.marksObtained.toString(),
        result.grade || 'N/A',
        status,
        result.createdAt.toLocaleDateString('en-US'),
        result.remarks || ''
      ];
    });

    // Create CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const filename = examId 
      ? `exam-results-${examId}-${new Date().toISOString().split('T')[0]}.csv`
      : `all-exam-results-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success message (mock functionality)
    alert(`Downloading ${filteredResults.length} records as CSV...`);
  };

  return (
    <Button
      variant={variant as 'primary' | 'outline'}
      
      onClick={handleDownload}
      startIcon={<DownloadIcon />}
    >
      Download as CSV
    </Button>
  );
};

export default CSVDownloadButton;