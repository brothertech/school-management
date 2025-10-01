'use client';

import React, { useMemo, useState } from 'react';
import { mockParentData } from '@/data/parentPortalData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge/Badge';
import ParentExamCalendar from '@/components/parent/ParentExamCalendar';
import Table, { TableHeader, TableRow, TableCell, TableBody } from '@/components/tables/table';

const ParentExamOverview: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>(mockParentData.children[0]?.id || '');

  const child = useMemo(() => mockParentData.children.find(c => c.id === selectedChildId) || mockParentData.children[0], [selectedChildId]);

  const upcoming = useMemo(() => {
    // Transform child.examPerformance.recentResults into pseudo upcoming for demo or use studentPortalData if linked
    // Here we simply mock a small set assuming upcoming derived elsewhere; show recent exams as schedule sample
    return (child?.examPerformance?.recentResults || []).map(r => ({
      id: r.examId,
      subject: r.subject,
      date: r.date,
      time: '09:00',
      duration: '—',
      room: '—',
      syllabus: '—',
      importance: 'medium' as const,
    }));
  }, [child]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {mockParentData.children.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChildId(c.id)}
                className={`px-3 py-1 rounded border text-sm ${selectedChildId === c.id ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                {c.firstName} {c.lastName} — {c.currentClass} {c.currentSection}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Date</TableCell>
                <TableCell isHeader>Time</TableCell>
                <TableCell isHeader>Duration</TableCell>
                <TableCell isHeader>Room</TableCell>
                <TableCell isHeader>Importance</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcoming.map((ex) => (
                <TableRow key={ex.id}>
                  <TableCell>{ex.subject}</TableCell>
                  <TableCell>{new Date(ex.date).toLocaleDateString()}</TableCell>
                  <TableCell>{ex.time}</TableCell>
                  <TableCell>{ex.duration}</TableCell>
                  <TableCell>{ex.room}</TableCell>
                  <TableCell>
                    <Badge variant="light" color={ex.importance === 'high' ? 'danger' : ex.importance === 'medium' ? 'warning' : 'success'}>
                      {ex.importance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {upcoming.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-6 text-gray-500">No upcoming exams scheduled.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ParentExamCalendar child={child} />
    </div>
  );
};

export default ParentExamOverview;