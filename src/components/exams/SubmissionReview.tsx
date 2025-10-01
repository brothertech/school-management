'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SubmissionReviewProps {
  submission: {
    submittedAt: string;
    score?: number;
    total?: number;
    answersPreview?: Array<{ question: string; answer: string }>;
  };
  role: 'student' | 'teacher';
}

const SubmissionReview: React.FC<SubmissionReviewProps> = ({ submission, role }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role === 'teacher' ? 'Student Submission Review' : 'Your Submission'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Submitted at: {new Date(submission.submittedAt).toLocaleString('en-US')}
        </div>
        {submission.score !== undefined && submission.total !== undefined && (
          <div className="font-medium">Score: {submission.score} / {submission.total}</div>
        )}
        {submission.answersPreview && (
          <div className="space-y-2">
            {submission.answersPreview.map((a, i) => (
              <div key={i} className="p-2 rounded border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-700 dark:text-gray-300">{a.question}</div>
                <div className="text-gray-800 dark:text-white">Answer: {a.answer}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionReview;