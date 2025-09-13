'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ExamInstructions from "@/app/student-portal/components/ExamInstructions";
import { mockExams } from "@/data/examData";
import { Exam } from "@/types/exam";

export default function ExamInstructionsPage() {
  const params = useParams();
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const examId = params.examId as string;
    
    // Check if exam session is active (prevent going back to instructions)
    if (typeof window !== 'undefined') {
      const examSession = localStorage.getItem(`exam_${examId}_session`);
      if (examSession === 'active') {
        // Redirect to exam taking page if session is active
        router.push(`/student-portal/exams/${examId}/take`);
        return;
      }
    }
    
    const foundExam = mockExams.find(e => e.id === examId);
    
    if (foundExam) {
      setExam(foundExam);
    } else {
      // Redirect if exam not found
      router.push('/student-portal');
    }
    
    setLoading(false);
  }, [params.examId, router]);

  const handleStartExam = () => {
    if (exam) {
      router.push(`/student-portal/exams/${exam.id}/take`);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <ExamInstructions exam={exam} onStartExam={handleStartExam} />
    </div>
  );
}