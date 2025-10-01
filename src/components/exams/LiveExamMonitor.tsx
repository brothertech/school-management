'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import Badge from '@/components/ui/badge/Badge';

interface Participant {
  id: string;
  name: string;
  classSection: string;
  progress: number; // percentage
  timeLeftMin: number;
  status: 'in_progress' | 'submitted' | 'disconnected';
}

const mockParticipants: Participant[] = [
  { id: 'p1', name: 'John Smith', classSection: 'Grade 10 - A', progress: 65, timeLeftMin: 42, status: 'in_progress' },
  { id: 'p2', name: 'Sarah Johnson', classSection: 'Grade 10 - A', progress: 98, timeLeftMin: 5, status: 'in_progress' },
  { id: 'p3', name: 'Michael Brown', classSection: 'Grade 10 - A', progress: 100, timeLeftMin: 0, status: 'submitted' },
  { id: 'p4', name: 'Emily Davis', classSection: 'Grade 10 - A', progress: 20, timeLeftMin: 55, status: 'disconnected' },
];

export default function LiveExamMonitor() {
  const [query, setQuery] = useState('');
  const [showDisconnectedOnly, setShowDisconnectedOnly] = useState(false);

  const filtered = useMemo(() => {
    return mockParticipants.filter((p) =>
      (query ? p.name.toLowerCase().includes(query.toLowerCase()) : true) &&
      (showDisconnectedOnly ? p.status === 'disconnected' : true)
    );
  }, [query, showDisconnectedOnly]);

  const renderStatus = (s: Participant['status']) => {
    if (s === 'submitted') return <Badge variant="solid" color="success">Submitted</Badge>;
    if (s === 'disconnected') return <Badge variant="solid" color="danger">Disconnected</Badge>;
    return <Badge variant="solid" color="warning">In Progress</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Exam Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div>
            <label className="block text-xs text-gray-500">Search by name</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-64 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              placeholder="Type a student name..."
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input type="checkbox" checked={showDisconnectedOnly} onChange={(e) => setShowDisconnectedOnly(e.target.checked)} />
            Show disconnected only
          </label>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Class</TableCell>
              <TableCell isHeader>Progress</TableCell>
              <TableCell isHeader>Time Left</TableCell>
              <TableCell isHeader>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.classSection}</TableCell>
                <TableCell>
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded h-2">
                    <div className="bg-blue-600 h-2 rounded" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{p.progress}%</span>
                </TableCell>
                <TableCell>{p.timeLeftMin} min</TableCell>
                <TableCell>{renderStatus(p.status)}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-gray-500">No participants found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}