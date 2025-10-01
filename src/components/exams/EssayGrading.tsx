'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

interface EssayResponse {
  id: string;
  studentName: string;
  question: string;
  answerText: string;
  maxMarks: number;
  score?: number;
  feedback?: string;
}

const mockEssayResponses: EssayResponse[] = [
  {
    id: 'er1',
    studentName: 'John Smith',
    question: 'Explain the Pythagorean theorem and provide a real-world application.',
    answerText: 'The Pythagorean theorem states that in a right-angled triangle... [answer truncated for brevity]',
    maxMarks: 10,
  },
  {
    id: 'er2',
    studentName: 'Sarah Johnson',
    question: 'Discuss the impact of photosynthesis on the global carbon cycle.',
    answerText: 'Photosynthesis captures carbon dioxide from the atmosphere... [answer truncated]',
    maxMarks: 15,
  },
];

export default function EssayGrading() {
  const [responses, setResponses] = useState<EssayResponse[]>(mockEssayResponses);
  const [publishing, setPublishing] = useState<boolean>(false);

  const handleScoreChange = (id: string, val: number) => {
    setResponses((prev) => prev.map((r) => (r.id === id ? { ...r, score: val } : r)));
  };
  const handleFeedbackChange = (id: string, val: string) => {
    setResponses((prev) => prev.map((r) => (r.id === id ? { ...r, feedback: val } : r)));
  };

  const saveGrades = () => {
    // Would POST to server
    alert('Grades saved for ' + responses.length + ' essays');
  };

  const bulkPublish = async () => {
    setPublishing(true);
    // Would POST publish action
    setTimeout(() => {
      setPublishing(false);
      alert('Results published to students');
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grading & Feedback (Essay Questions)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Student</TableCell>
              <TableCell isHeader>Question</TableCell>
              <TableCell isHeader>Answer</TableCell>
              <TableCell isHeader>Score</TableCell>
              <TableCell isHeader>Feedback</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.studentName}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300">{r.question}</TableCell>
                <TableCell>
                  <div className="max-w-xl text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{r.answerText}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={r.maxMarks}
                      value={r.score ?? ''}
                      onChange={(e) => handleScoreChange(r.id, Number(e.target.value))}
                      className="w-24 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1"
                      aria-label="Essay score"
                    />
                    <span className="text-xs text-gray-500">/ {r.maxMarks}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <textarea
                    value={r.feedback ?? ''}
                    onChange={(e) => handleFeedbackChange(r.id, e.target.value)}
                    className="w-64 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1"
                    aria-label="Feedback"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={saveGrades}>Save Grades</Button>
          <Button onClick={bulkPublish} disabled={publishing}>{publishing ? 'Publishing...' : 'Bulk Publish'}</Button>
        </div>
      </CardContent>
    </Card>
  );
}