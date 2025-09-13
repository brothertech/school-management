'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ExamTakingInterface from "@/app/student-portal/components/ExamTakingInterface";
import { mockExams } from "@/data/examData";
import { Exam } from "@/types/exam";

export default function ExamTakingPage() {
  const params = useParams();
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Disable sidebar navigation during exam
  useEffect(() => {
    // Add a class to body to indicate exam mode
    document.body.classList.add('exam-mode');
    
    // Track exam session to prevent going back to instructions
    const examId = params.examId as string;
    localStorage.setItem(`exam_${examId}_session`, 'active');
    
    return () => {
      // Remove the class when component unmounts
      document.body.classList.remove('exam-mode');
      
      // Clear exam session when leaving exam page
      localStorage.removeItem(`exam_${examId}_session`);
    };
  }, [params.examId]);

  useEffect(() => {
    const examId = params.examId as string;
    const foundExam = mockExams.find(e => e.id === examId);
    
    if (foundExam) {
      setExam(foundExam);
    } else {
      // Redirect if exam not found
      router.push('/student-portal');
    }
    
    setLoading(false);
  }, [params.examId, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleExamSubmit = (answers: Record<string, string>) => {
    // In a real application, this would send the answers to the server
    console.log('Exam submitted with answers:', answers);
    
    const examId = params.examId as string;
    
    // Track exam submission in localStorage
    const submissionKey = `exam_${examId}_submissions`;
    const existingSubmissions = JSON.parse(localStorage.getItem(submissionKey) || '[]');
    
    const newSubmission = {
      timestamp: new Date().toISOString(),
      answers: answers,
      examId: examId,
      studentId: 'current_student' // In real app, use actual student ID
    };
    
    localStorage.setItem(submissionKey, JSON.stringify([...existingSubmissions, newSubmission]));
    
    // You would typically make an API call here to submit the exam
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Exam Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested exam could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Check if exam is currently active
  const now = currentTime.getTime();
  const startTime = exam.startDate.getTime();
  const endTime = exam.endDate.getTime();
  
  const isExamActive = now >= startTime && now <= endTime;

  // Check if student has already submitted this exam
  const submissionKey = `exam_${examId}_submissions`;
  const existingSubmissions = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(submissionKey) || '[]') : [];
  const hasSubmitted = existingSubmissions.length > 0;
  
  // Check if multiple attempts are allowed
  const canRetake = exam.allowedAttempts > 1 && existingSubmissions.length < exam.allowedAttempts;

  if (!isExamActive) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 text-center">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <h1 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">
              {now < startTime ? 'Exam Not Started' : 'Exam Closed'}
            </h1>
            <p className="text-red-600 dark:text-red-400">
              {now < startTime 
                ? `This exam will be available on ${exam.startDate.toLocaleString('en-US')}`
                : `This exam ended on ${exam.endDate.toLocaleString('en-US')}`
              }
            </p>
            <p className="text-sm text-red-500 dark:text-red-300 mt-2">
              {now < startTime 
                ? 'You cannot start the exam before the scheduled start time.'
                : 'The exam period has ended. No further attempts are allowed.'
              }
            </p>
          </div>
          <Button variant="primary" onClick={() => router.push('/student-portal')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Check if exam has already been submitted and retakes are not allowed
  if (hasSubmitted && !canRetake) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 text-center">
          <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-2">
              Exam Already Submitted
            </h1>
            <p className="text-blue-600 dark:text-blue-400">
              You have already submitted this exam on {new Date(existingSubmissions[0].timestamp).toLocaleString('en-US')}
            </p>
            <p className="text-sm text-blue-500 dark:text-blue-300 mt-2">
              {exam.allowedAttempts === 1 
                ? 'Only one attempt is allowed for this exam.'
                : `You have used ${existingSubmissions.length} of ${exam.allowedAttempts} allowed attempts.`
              }
            </p>
          </div>
          <button
            onClick={() => router.push('/student-portal')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <ExamTakingInterface exam={exam} onExamSubmit={handleExamSubmit} />
    </div>
  );
}