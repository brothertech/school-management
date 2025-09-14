'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge/Badge';
import { mockExams } from '@/data/examData';
import { getAllExamResults, getExamResultsByExamId } from '@/data/examResultsData';
import Badge from '../ui/badge/Badge';

interface StudentExamAttemptsListProps {
  selectedExamId?: string;
}

const StudentExamAttemptsList: React.FC<StudentExamAttemptsListProps> = ({ selectedExamId }) => {
  const [selectedExam, setSelectedExam] = useState(selectedExamId || '');
  
  const allResults = getAllExamResults();
  const examResults = selectedExam 
    ? getExamResultsByExamId(selectedExam)
    : allResults;

  const exams = mockExams;

  const getStatusBadge = (result: any) => {
    if (result.isAbsent) {
      return <Badge variant="solid" >Absent</Badge>;
    }
    if (result.marksObtained === 0) {
      return <Badge variant="solid" >Incomplete</Badge>;
    }
    return <Badge variant="solid" >Completed</Badge>;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 dark:text-green-400';
      case 'A': return 'text-green-600 dark:text-green-400';
      case 'A-': return 'text-green-600 dark:text-green-400';
      case 'B+': return 'text-blue-600 dark:text-blue-400';
      case 'B': return 'text-blue-600 dark:text-blue-400';
      case 'C+': return 'text-yellow-600 dark:text-yellow-400';
      case 'C': return 'text-yellow-600 dark:text-yellow-400';
      case 'D': return 'text-orange-600 dark:text-orange-400';
      case 'F': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Student Exam Attempts
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedExam ? 'Filtered by selected exam' : 'All exam attempts'}
            </p>
          </div>
          
          <select 
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Exams</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title} - {exam.classSection}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Class</TableHeader>
                <TableHeader>Exam</TableHeader>
                <TableHeader>Score</TableHeader>
                <TableHeader>Grade</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Date</TableHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examResults.map((result) => {
                const exam = exams.find(e => e.id === result.examId);
                return (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium text-gray-800 dark:text-white">
                      {result.studentName}
                    </TableCell>
                    <TableCell>
                      {exam?.classSection || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {exam?.title || 'Unknown Exam'}
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${result.marksObtained >= 40 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {result.marksObtained}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getGradeColor(result.grade || '')}`}>
                        {result.grade || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(result)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {result.createdAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {examResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No exam attempts found for the selected criteria.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentExamAttemptsList;