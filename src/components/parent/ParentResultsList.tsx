'use client';

import React, { useMemo, useState } from 'react';
import { mockParentData } from '@/data/parentPortalData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Table, { TableHeader, TableRow, TableCell, TableBody } from '@/components/tables/table';
import Button from '@/components/ui/button/Button';

const ParentResultsList: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>(mockParentData.children[0]?.id || '');
  const child = useMemo(() => mockParentData.children.find(c => c.id === selectedChildId) || mockParentData.children[0], [selectedChildId]);
  const results = child?.examPerformance?.recentResults || [];

  const onRequestReview = (examId: string) => {
    // Stubbed action: integrate with messaging or request endpoint later
    alert(`Review request submitted for exam ${examId}.`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Child</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {mockParentData.children.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChildId(c.id)}
                className={`px-3 py-1 rounded border text-sm ${selectedChildId === c.id ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                {c.firstName} {c.lastName}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Published Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Exam</TableCell>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Date</TableCell>
                <TableCell isHeader>Score</TableCell>
                <TableCell isHeader>Percentage</TableCell>
                <TableCell isHeader>Grade</TableCell>
                <TableCell isHeader>Rank</TableCell>
                <TableCell isHeader className="text-right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.examId}>
                  <TableCell>{r.examName}</TableCell>
                  <TableCell>{r.subject}</TableCell>
                  <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                  <TableCell>{r.score}/{r.totalMarks}</TableCell>
                  <TableCell>{r.percentage}%</TableCell>
                  <TableCell>{r.grade}</TableCell>
                  <TableCell>{r.rank ?? '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => onRequestReview(r.examId)}>Request Review</Button>
                  </TableCell>
                </TableRow>
              ))}
              {results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-6 text-gray-500">No results published yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {child?.examPerformance?.subjects && (
        <Card>
          <CardHeader>
            <CardTitle>Teacher Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Comments visible if teacher enabled per exam.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParentResultsList;