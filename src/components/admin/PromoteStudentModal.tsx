import React, { useState } from 'react';
import { Student, PromoteStudentData } from '../../types/student';

interface PromoteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onPromote: (data: PromoteStudentData) => void;
}

const PromoteStudentModal: React.FC<PromoteStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onPromote
}) => {
  const [newClass, setNewClass] = useState('');
  const [newSection, setNewSection] = useState('');

  if (!isOpen || !student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newClass && newSection) {
      onPromote({
        newClass,
        newSection,
        newRollNumber: student.rollNumber,
        promotionDate: new Date()
      });
      
      setNewClass('');
      setNewSection('');
      onClose();
    }
  };

  const classOptions = [
    'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  const sectionOptions = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Promote Student</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Current Student:</p>
          <p className="font-medium">{student.firstName} {student.lastName}</p>
          <p className="text-sm text-gray-600">
            Class {student.currentClass} - Section {student.currentSection}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Class
            </label>
            <select
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Section
            </label>
            <select
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sec) => (
                <option key={sec} value={sec}>
                  Section {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
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
              Promote Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromoteStudentModal;