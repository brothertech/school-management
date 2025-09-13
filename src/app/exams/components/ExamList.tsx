'use client';

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Exam } from "@/types/exam";
import { PencilIcon, TrashBinIcon, EyeIcon } from "@/icons";
import { Play } from "lucide-react";

interface ExamListProps {
  exams: Exam[];
}

export default function ExamList({ exams }: ExamListProps) {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const getStatusBadge = (exam: Exam) => {
    const now = new Date();
    
    if (exam.status === 'upcoming') {
      return <Badge variant="light" color="primary">Upcoming</Badge>;
    } else if (exam.status === 'active') {
      return <Badge variant="solid" color="warning">Active</Badge>;
    } else {
      return <Badge variant="solid" color="success">Closed</Badge>;
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleEditExam = (exam: Exam) => {
    setSelectedExam(exam);
    // TODO: Implement edit functionality
  };

  const handleDeleteExam = (exam: Exam) => {
    if (confirm(`Are you sure you want to delete "${exam.title}"?`)) {
      // TODO: Implement delete functionality
      console.log('Deleting exam:', exam.id);
    }
  };

  const handleViewExam = (exam: Exam) => {
    setSelectedExam(exam);
    // TODO: Implement view details functionality
  };

  const handleStartExam = (exam: Exam) => {
    // TODO: Implement start exam functionality
    console.log('Starting exam:', exam.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">CBT Exams</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class/Section</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Attempts</TableCell>
              <TableCell>Status</TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.title}</TableCell>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>{exam.classSection}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDateTime(exam.startDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDateTime(exam.endDate)}
                  </div>
                </TableCell>
                <TableCell>{formatDuration(exam.duration)}</TableCell>
                <TableCell>{exam.allowedAttempts}</TableCell>
                <TableCell>{getStatusBadge(exam)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewExam(exam)}
                      // title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditExam(exam)}
                      // title="Edit Exam"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartExam(exam)}
                      // title="Start Exam"
                      disabled={exam.status !== 'upcoming'}
                    >
                      <Play className="h-4 w-4" />
                      
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExam(exam)}
                      // title="Delete Exam"
                    >
                      <TrashBinIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No CBT exams created yet.</p>
          <Button className="mt-4">Create First CBT Exam</Button>
        </div>
      )}
    </div>
  );
}