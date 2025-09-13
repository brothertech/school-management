'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Exam } from "@/types/exam";

interface ExamTakingInterfaceProps {
  exam: Exam;
  onExamSubmit: (answers: Record<string, string>) => void;
}

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
}

// Mock questions data - in a real app, this would come from an API
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    type: 'mcq',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    id: '2',
    text: 'The Earth is flat.',
    type: 'true-false',
    options: ['True', 'False'],
    correctAnswer: 'False'
  },
  {
    id: '3',
    text: 'Explain the process of photosynthesis.',
    type: 'essay',
    correctAnswer: ''
  },
  {
    id: '4',
    text: 'What is the chemical symbol for gold?',
    type: 'short-answer',
    correctAnswer: 'Au'
  }
];

export default function ExamTakingInterface({ exam, onExamSubmit }: ExamTakingInterfaceProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // Convert minutes to seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  const questions = mockQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  // Prevent page navigation during exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!examSubmitted) {
        e.preventDefault();
        e.returnValue = 'You have an ongoing exam. Are you sure you want to leave? Your progress may be lost.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [examSubmitted]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examSubmitted]);

  const handleAutoSubmit = useCallback(() => {
    if (!examSubmitted) {
      setExamSubmitted(true);
      onExamSubmit(answers);
      alert('Time is up! Your exam has been automatically submitted.');
      router.push('/student-portal');
    }
  }, [examSubmitted, answers, onExamSubmit, router]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    onExamSubmit(answers);
    setShowSubmitModal(false);
    alert('Exam submitted successfully!');
    router.push('/student-portal');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const renderQuestionInput = () => {
    const currentAnswer = answers[currentQuestion.id] || '';

    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="Enter your answer"
          />
        );

      case 'essay':
        return (
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            rows={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
            placeholder="Write your answer here..."
          />
        );

      default:
        return null;
    }
  };

  if (examSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Exam Submitted Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for completing the exam. Your answers have been recorded.
        </p>
        <Button variant="primary" onClick={() => router.push('/student-portal')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Timer and Header */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {exam.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {exam.subject} • {exam.classSection}
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Time Remaining</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>{Math.round(getProgressPercentage())}% Complete</span>
      </div>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestionIndex + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            {currentQuestion.text}
          </p>

          {renderQuestionInput()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="flex space-x-3">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button variant="primary" onClick={goToNextQuestion}>
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Exam
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentQuestionIndex
                ? 'bg-blue-600'
                : answers[questions[index].id]
                ? 'bg-green-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            title={`Question ${index + 1}`}
          />
        ))}
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Confirm Exam Submission"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to submit your exam? This action cannot be undone.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You have answered {Object.keys(answers).length} out of {questions.length} questions.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSubmitModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleSubmitExam}
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}