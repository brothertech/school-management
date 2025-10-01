'use client';

import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';
import ExamRow from './ExamRow';
import { Exam } from '@/types/exam';
import { mockExams } from '@/data/examData';
import { mockSubjects, mockClassSections } from '@/data/questionBankData';

interface TeacherExamListProps {
  exams?: Exam[];
  onCreate?: () => void;
}

const TeacherExamList: React.FC<TeacherExamListProps> = ({ exams, onCreate }) => {
  const [subject, setSubject] = useState<string>('');
  const [classSection, setClassSection] = useState<string>('');
  const [status, setStatus] = useState<'upcoming' | 'active' | 'closed' | ''>('');
  const [monitoring, setMonitoring] = useState<boolean>(false);

  const data = exams ?? mockExams;

  const filtered = useMemo(() => {
    return data.filter((e) =>
      (subject ? e.subject === subject : true) &&
      (classSection ? e.classSection === classSection : true) &&
      (status ? e.status === status : true)
    );
  }, [data, subject, classSection, status]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs text-gray-500">Subject</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}
                  className="min-w-40 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
            <option value="">All</option>
            {mockSubjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500">Class/Section</label>
          <select value={classSection} onChange={(e) => setClassSection(e.target.value)}
                  className="min-w-40 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
            <option value="">All</option>
            {mockClassSections.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}
                  className="min-w-32 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
            <option value="">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Start Monitoring</label>
          <input type="checkbox" checked={monitoring} onChange={(e) => setMonitoring(e.target.checked)} />
        </div>
        <Button variant="outline" onClick={() => alert('Exporting marks...')}>Export Marks</Button>
        <Button variant="outline" onClick={() => alert('Sending quick notification...')}>Quick Notify</Button>
        {onCreate && (
          <Button onClick={onCreate}>Create Exam</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Title</TableCell>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Class</TableCell>
                <TableCell isHeader>Start</TableCell>
                <TableCell isHeader>End</TableCell>
                <TableCell isHeader>Duration</TableCell>
                <TableCell isHeader>Attempts</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader className="text-right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((exam) => (
                <ExamRow key={exam.id} exam={exam} onView={() => {}} onEdit={() => {}} onStart={() => {}} onDelete={() => {}} />
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell className="py-6 text-gray-500" colSpan={9}>No exams found for selected filters.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {monitoring && (
        <div className="flex items-center gap-2">
          <Badge variant="light" color="warning">Monitoring enabled</Badge>
          <span className="text-sm text-gray-600 dark:text-gray-400">Live monitor panel available in the Monitor tab.</span>
        </div>
      )}
    </div>
  );
};

export default TeacherExamList;