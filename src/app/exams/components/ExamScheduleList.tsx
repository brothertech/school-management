'use client';

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Exam } from "@/types/exam";

const mockExams: Exam[] = [
  {
    id: "1",
    name: "Mid-Term Examination",
    classId: "class-1",
    className: "Grade 10A",
    subjectId: "math-1",
    subjectName: "Mathematics",
    examType: "midterm",
    totalMarks: 100,
    passingMarks: 40,
    date: new Date("2024-03-15"),
    startTime: "09:00",
    endTime: "12:00",
    description: "Mid-term assessment covering chapters 1-5",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Final Examination",
    classId: "class-1",
    className: "Grade 10A",
    subjectId: "sci-1",
    subjectName: "Science",
    examType: "final",
    totalMarks: 100,
    passingMarks: 35,
    date: new Date("2024-06-20"),
    startTime: "09:00",
    endTime: "16:00",
    description: "Comprehensive final examination",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Quarterly Test",
    classId: "class-2",
    className: "Grade 9B",
    subjectId: "eng-1",
    subjectName: "English",
    examType: "quiz",
    totalMarks: 50,
    passingMarks: 20,
    date: new Date("2024-02-10"),
    startTime: "10:30",
    endTime: "12:30",
    description: "First quarterly assessment",
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ExamScheduleList() {
  const [exams, setExams] = useState<Exam[]>(mockExams);

  const getStatusBadge = (exam: Exam) => {
    const now = new Date();
    const examDate = new Date(exam.date);
    
    if (examDate > now) {
      return <Badge variant="light" color="primary">Upcoming</Badge>;
    } else if (examDate.toDateString() === now.toDateString()) {
      return <Badge variant="solid" color="warning">Today</Badge>;
    } else {
      return <Badge variant="solid" color="success">Completed</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Exam Schedule</h3>
        <Button variant="outline" size="sm">
          Export Schedule
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.name}</TableCell>
                <TableCell>{exam.className}</TableCell>
                <TableCell>{exam.subjectName}</TableCell>
                <TableCell>
                  <div>{formatDate(exam.date.toString())}</div>
                  <div className="text-sm text-gray-500">
                    {exam.startTime} - {exam.endTime}
                  </div>
                </TableCell>
                <TableCell>{exam.totalMarks}</TableCell>
                <TableCell>{getStatusBadge(exam)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No exams scheduled yet.</p>
          <Button className="mt-4">Create First Exam</Button>
        </div>
      )}
    </div>
  );
}