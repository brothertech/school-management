'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge/Badge";
import { Exam } from "@/types/exam";

interface ExamInstructionsProps {
  exam: Exam;
  onStartExam: () => void;
}

export default function ExamInstructions({ exam, onStartExam }: ExamInstructionsProps) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [canStartExam, setCanStartExam] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime.getTime();
    const startTime = exam.startDate.getTime();
    const endTime = exam.endDate.getTime();
    
    setCanStartExam(now >= startTime && now <= endTime);
  }, [currentTime, exam]);

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

  const getExamStatus = () => {
    const now = currentTime.getTime();
    const startTime = exam.startDate.getTime();
    const endTime = exam.endDate.getTime();

    if (now < startTime) return 'upcoming';
    if (now > endTime) return 'closed';
    return 'active';
  };

  const status = getExamStatus();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {exam.title}
        </h1>
        <div className="flex justify-center items-center space-x-4 text-gray-600 dark:text-gray-400">
          <span>{exam.subject}</span>
          <span>•</span>
          <span>{exam.classSection}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
          <CardDescription>
            Important information about this examination
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Start Time</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDateTime(exam.startDate)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">End Time</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDateTime(exam.endDate)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Duration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDuration(exam.duration)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Allowed Attempts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {exam.allowedAttempts}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span>
            {status === 'upcoming' && (
              <Badge variant="light" color="primary">Upcoming</Badge>
            )}
            {status === 'active' && (
              <Badge variant="solid" color="warning">Active</Badge>
            )}
            {status === 'closed' && (
              <Badge variant="solid" color="success">Closed</Badge>
            )}
          </div>

          {status === 'upcoming' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-400 text-sm">
                This exam will be available on {formatDateTime(exam.startDate)}
              </p>
            </div>
          )}

          {status === 'closed' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-400 text-sm">
                This exam has ended. It was available until {formatDateTime(exam.endDate)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {exam.instructions && (
        <Card>
          <CardHeader>
            <CardTitle>Exam Instructions</CardTitle>
            <CardDescription>
              Please read all instructions carefully before starting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {exam.instructions}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Back to Dashboard
        </Button>
        
        <Button
          variant="primary"
          onClick={onStartExam}
          disabled={!canStartExam}
        >
          Start Exam
        </Button>
      </div>

      {!canStartExam && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Current time: {formatDateTime(currentTime)}
          </p>
          <p className="mt-1">
            {currentTime < exam.startDate.getTime() 
              ? `Exam starts in ${Math.ceil((exam.startDate.getTime() - currentTime.getTime()) / 1000 / 60)} minutes` 
              : `Exam ended ${Math.ceil((currentTime.getTime() - exam.endDate.getTime()) / 1000 / 60)} minutes ago`
            }
          </p>
        </div>
      )}
    </div>
  );
}