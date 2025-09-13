'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge/Badge";
import { Exam } from "@/types/exam";

interface ExamListProps {
  exams: Exam[];
}

export default function ExamList({ exams }: ExamListProps) {
  const router = useRouter();
  const [currentTime] = useState(new Date());

  const getExamStatus = (exam: Exam) => {
    const now = currentTime.getTime();
    const startTime = exam.startDate.getTime();
    const endTime = exam.endDate.getTime();

    if (now < startTime) return 'upcoming';
    if (now > endTime) return 'closed';
    return 'active';
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

  const handleStartExam = (exam: Exam) => {
    router.push(`/student-portal/exams/${exam.id}/instructions`);
  };

  const availableExams = exams.filter(exam => {
    const status = getExamStatus(exam);
    return status === 'active' || status === 'upcoming';
  });

  if (availableExams.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No exams available at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Exams</CardTitle>
        <CardDescription>
          Exams that are currently available or upcoming
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableExams.map((exam) => {
          const status = getExamStatus(exam);
          const canStart = status === 'active';

          return (
            <div
              key={exam.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex-1 mb-3 sm:mb-0">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {exam.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{exam.subject}</span>
                  <span>•</span>
                  <span>{exam.classSection}</span>
                  <span>•</span>
                  <span>{formatDuration(exam.duration)}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {status === 'upcoming' && (
                    <Badge variant="light" color="primary">Upcoming</Badge>
                  )}
                  {status === 'active' && (
                    <Badge variant="solid" color="warning">Active</Badge>
                  )}
                  {status === 'closed' && (
                    <Badge variant="solid" color="success">Closed</Badge>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Starts: {formatDateTime(exam.startDate)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                {canStart ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStartExam(exam)}
                  >
                    Start Exam
                  </Button>
                ) : (
                  <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  Not Available
                </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}