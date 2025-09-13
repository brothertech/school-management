'use client';

import { useState, useEffect } from 'react';
import { Question, CreateQuestionData } from '@/types/questionBank';
import { mockSubjects, mockClassSections } from '@/data/questionBankData';

interface QuestionFormModalProps {
  question?: Question | null;
  onSubmit: (data: CreateQuestionData | { id: string } & CreateQuestionData) => void;
  onClose: () => void;
}

export default function QuestionFormModal({ question, onSubmit, onClose }: QuestionFormModalProps) {
  const [formData, setFormData] = useState<CreateQuestionData>({
    subject: '',
    classSection: '',
    type: 'mcq',
    difficulty: 'easy',
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  const [options, setOptions] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    if (question) {
      setFormData({
        subject: question.subject,
        classSection: question.classSection,
        type: question.type,
        difficulty: question.difficulty,
        questionText: question.questionText,
        options: question.options || ['', '', '', ''],
        correctAnswer: question.correctAnswer,
      });
      setOptions(question.options || ['', '', '', '']);
    } else {
      setFormData({
        subject: '',
        classSection: '',
        type: 'mcq',
        difficulty: 'easy',
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      });
      setOptions(['', '', '', '']);
    }
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      options: formData.type === 'mcq' ? options.filter(opt => opt.trim() !== '') : undefined,
    };

    if (question) {
      onSubmit({ id: question.id, ...submitData });
    } else {
      onSubmit(submitData);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setFormData({ ...formData, options: newOptions });
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      setFormData({ ...formData, options: newOptions });
    }
  };

  const isMCQ = formData.type === 'mcq';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-90vh overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {question ? 'Edit Question' : 'Add New Question'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Subject</option>
                {mockSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class/Section *
              </label>
              <select
                required
                value={formData.classSection}
                onChange={(e) => setFormData({ ...formData, classSection: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Class/Section</option>
                {mockClassSections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  type: e.target.value as 'mcq' | 'true-false' | 'short-answer' | 'essay',
                  correctAnswer: ''
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
                <option value="essay">Essay</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level *
              </label>
              <select
                required
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text *
            </label>
            <textarea
              required
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your question here..."
            />
          </div>

          {isMCQ && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options *
              </label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      required={index < 2}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-600 hover:text-red-800 px-2 py-1"
                      disabled={options.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Option
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer *
            </label>
            {isMCQ ? (
              <select
                required
                value={formData.correctAnswer as string}
                onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Correct Option</option>
                {options.map((option, index) => (
                  option.trim() && (
                    <option key={index} value={option}>
                      Option {index + 1}: {option}
                    </option>
                  )
                ))}
              </select>
            ) : formData.type === 'true-false' ? (
              <select
                required
                value={formData.correctAnswer as string}
                onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : (
              <textarea
                required
                value={formData.correctAnswer as string}
                onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                rows={formData.type === 'essay' ? 4 : 2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter the correct answer..."
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {question ? 'Update Question' : 'Create Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}