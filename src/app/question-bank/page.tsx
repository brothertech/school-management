'use client';

import { useState, useMemo } from 'react';
import { Question, QuestionFilters } from '@/types/questionBank';
import { mockQuestions, mockSubjects, mockClassSections } from '@/data/questionBankData';
import QuestionFormModal from './components/QuestionFormModal';

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [filters, setFilters] = useState<QuestionFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      if (filters.subject && question.subject !== filters.subject) return false;
      if (filters.classSection && question.classSection !== filters.classSection) return false;
      if (filters.type && question.type !== filters.type) return false;
      if (filters.difficulty && question.difficulty !== filters.difficulty) return false;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          question.questionText.toLowerCase().includes(searchTerm) ||
          question.subject.toLowerCase().includes(searchTerm) ||
          question.classSection.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });
  }, [questions, filters]);

  const handleCreateQuestion = (data: any) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setQuestions([...questions, newQuestion]);
    setIsModalOpen(false);
  };

  const handleUpdateQuestion = (id: string, data: any) => {
    setQuestions(questions.map(q =>
      q.id === id
        ? { ...q, ...data, updatedAt: new Date() }
        : q
    ));
    setEditingQuestion(null);
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-medium mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={filters.subject || ''}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Subjects</option>
              {mockSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class/Section</label>
            <select
              value={filters.classSection || ''}
              onChange={(e) => setFilters({ ...filters, classSection: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Classes</option>
              {mockClassSections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filters.type || ''}
              onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Types</option>
              <option value="mcq">MCQ</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
              <option value="essay">Essay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={filters.difficulty || ''}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search questions..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class/Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {question.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {question.classSection}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {question.type.replace('-', ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    question.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800'
                      : question.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {question.questionText}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {question.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(question)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredQuestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No questions found. Create your first question to get started.
          </div>
        )}
      </div>

      {/* Question Form Modal */}
      {isModalOpen && (
        <QuestionFormModal
          question={editingQuestion}
          onSubmit={(data) => editingQuestion 
            ? handleUpdateQuestion(editingQuestion.id, data)
            : handleCreateQuestion(data)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}