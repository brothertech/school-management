'use client';

import React from 'react';
import { ExamQuestion } from '@/store/examSlice';

interface QuestionRendererProps {
  question: ExamQuestion;
  value?: string | string[] | boolean;
  onChange: (value: string | string[] | boolean) => void;
  largeFonts?: boolean;
}

const baseLabel = 'text-gray-800 dark:text-white';

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, value, onChange, largeFonts }) => {
  const labelClass = `${baseLabel} ${largeFonts ? 'text-lg' : 'text-base'}`;

  switch (question.type) {
    case 'mcq':
      return (
        <div role="group" aria-label={question.text} className="space-y-2">
          <p className={`font-medium ${labelClass}`}>{question.text}</p>
          {question.options?.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={value === opt.id}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className={labelClass}>{opt.text}</span>
            </label>
          ))}
        </div>
      );
    case 'tf':
      return (
        <div role="group" aria-label={question.text} className="space-y-2">
          <p className={`font-medium ${labelClass}`}>{question.text}</p>
          {['true', 'false'].map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={val}
                checked={String(value) === val}
                onChange={(e) => onChange(e.target.value === 'true')}
              />
              <span className={labelClass}>{val.toUpperCase()}</span>
            </label>
          ))}
        </div>
      );
    case 'short':
      return (
        <div className="space-y-2" aria-label={question.text}>
          <p className={`font-medium ${labelClass}`}>{question.text}</p>
          <input
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
            aria-label={question.text}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case 'essay':
      return (
        <div className="space-y-2" aria-label={question.text}>
          <p className={`font-medium ${labelClass}`}>{question.text}</p>
          <textarea
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 min-h-32"
            aria-label={question.text}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case 'match':
      return (
        <div className="space-y-2" aria-label={question.text}>
          <p className={`font-medium ${labelClass}`}>{question.text}</p>
          <p className="text-gray-600 dark:text-gray-400">Matching question type to be implemented</p>
        </div>
      );
    case 'media':
      return (
        <div className="space-y-2" aria-label={question.text}>
          <p className={`font-medium ${labelClass}`}>{question.text}</p>
          {question.mediaUrl && (
            <img src={question.mediaUrl} alt="Question media" className="max-h-48 rounded" />
          )}
          <p className="text-gray-600 dark:text-gray-400">Answer input for media question</p>
        </div>
      );
    default:
      return null;
  }
};

export default QuestionRenderer;