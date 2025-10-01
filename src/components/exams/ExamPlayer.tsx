'use client';

import React, { useEffect } from 'react';
import Button from '@/components/ui/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { saveAnswer, submitExam, toggleLargeFonts } from '@/store/examSlice';
import QuestionRenderer from './QuestionRenderer';
import Timer from './Timer';

interface ExamPlayerProps {
  examId: string;
}

const ExamPlayer: React.FC<ExamPlayerProps> = ({ examId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { session, answers, largeFonts } = useSelector((s: RootState) => s.exam);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Basic keyboard navigation between questions (Left/Right)
      // Could be expanded with focus management
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!session) return null;

  const onAutosave = () => {
    // Would send partial answers to server
    // console.log('Autosaving...', answers);
  };

  const onSubmit = () => {
    dispatch(submitExam({ examId, answers }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Timer endTimeIso={session.endsAt} onAutosave={onAutosave} onTimeUp={onSubmit} largeFonts={largeFonts} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => dispatch(toggleLargeFonts())}>A+</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </div>

      <div className="space-y-6">
        {session.questions.map((q) => (
          <div key={q.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <QuestionRenderer
              question={q}
              value={answers[q.id]}
              onChange={(val) => dispatch(saveAnswer({ questionId: q.id, value: val }))}
              largeFonts={largeFonts}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamPlayer;