'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreateExamData, Exam } from '@/types/exam';

interface ExamCreateEditProps {
  initial?: Partial<Exam>;
  onSubmit: (data: CreateExamData) => void;
  onCancel?: () => void;
}

const ExamCreateEdit: React.FC<ExamCreateEditProps> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<CreateExamData>({
    title: initial?.title || '',
    subject: initial?.subject || '',
    classSection: initial?.classSection || '',
    startDate: initial?.startDate || new Date(),
    endDate: initial?.endDate || new Date(Date.now() + 60 * 60 * 1000),
    duration: initial?.duration || 60,
    allowedAttempts: initial?.allowedAttempts || 1,
    randomizeQuestions: initial?.randomizeQuestions ?? true,
    passMark: initial?.passMark ?? 50,
    instructions: initial?.instructions || '',
  });

  const handleChange = (key: keyof CreateExamData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initial?.id ? 'Edit Exam' : 'Create Exam'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">Title</label>
            <input className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required aria-label="Exam title" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Subject</label>
              <input className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={form.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required aria-label="Subject" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Class/Section</label>
              <input className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={form.classSection}
                onChange={(e) => handleChange('classSection', e.target.value)}
                required aria-label="Class section" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Start Date</label>
              <input type="datetime-local" className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={new Date(form.startDate).toISOString().slice(0,16)}
                onChange={(e) => handleChange('startDate', new Date(e.target.value))}
                aria-label="Start date" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">End Date</label>
              <input type="datetime-local" className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={new Date(form.endDate).toISOString().slice(0,16)}
                onChange={(e) => handleChange('endDate', new Date(e.target.value))}
                aria-label="End date" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Duration (min)</label>
              <input type="number" min={1} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={form.duration}
                onChange={(e) => handleChange('duration', Number(e.target.value))}
                aria-label="Duration" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Attempts</label>
              <input type="number" min={1} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={form.allowedAttempts}
                onChange={(e) => handleChange('allowedAttempts', Number(e.target.value))}
                aria-label="Allowed attempts" />
            </div>
            <div className="flex items-center gap-2">
              <input id="randomize" type="checkbox" checked={form.randomizeQuestions} onChange={(e) => handleChange('randomizeQuestions', e.target.checked)} aria-label="Randomize questions" />
              <label htmlFor="randomize" className="text-sm text-gray-600 dark:text-gray-400">Shuffle Questions</label>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Pass Mark (%)</label>
              <input type="number" min={0} max={100} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                value={form.passMark ?? 50}
                onChange={(e) => handleChange('passMark', Number(e.target.value))}
                aria-label="Pass mark percentage" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">Instructions</label>
            <textarea className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 min-h-28"
              value={form.instructions || ''}
              onChange={(e) => handleChange('instructions', e.target.value)}
              aria-label="Exam instructions" />
          </div>

          <div className="flex justify-end gap-2">
            {onCancel && <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>}
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExamCreateEdit;