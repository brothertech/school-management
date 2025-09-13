"use client";

import React, { useState } from "react";
import { Subject, CreateSubjectData, UpdateSubjectData } from "@/types/subject";

// Extended interface for display purposes
interface SubjectWithDetails extends Subject {
  gradeLevels: string[];
  teachers: string[];
}

// Mock data for subjects
const mockSubjects: SubjectWithDetails[] = [
  {
    id: "1",
    hoursPerWeek: 4,
    isActive: true,
    name: "Mathematics",
    code: "MATH101",
    description: "Basic mathematics including algebra, geometry, and calculus",
    category: "core",
    credits: 4,
    gradeLevels: ["1", "2", "3", "4", "5"],
    teachers: ["John Smith", "Sarah Johnson"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    hoursPerWeek: 4,
    isActive: true,
    name: "English Language",
    code: "ENG102",
    description: "English language and literature studies",
    category: "core",
    credits: 3,
    gradeLevels: ["1", "2", "3", "4", "5"],
    teachers: ["Emily Davis"],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: "3",
     hoursPerWeek: 2,
    isActive: true,
    name: "Science",
    code: "SCI103",
    description: "General science including physics, chemistry, and biology",
    category: "core",
    credits: 4,
    gradeLevels: ["3", "4", "5"],
    teachers: ["Michael Brown"],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17")
  },
  {
    id: "4",
     hoursPerWeek: 5,
    isActive: true,
    name: "Social Studies",
    code: "SOC104",
    description: "History, geography, and social sciences",
    category: "core",
    credits: 3,
    gradeLevels: ["4", "5"],
    teachers: ["David Wilson"],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "5",
     hoursPerWeek: 4,
    isActive: true,
    name: "Art",
    code: "ART105",
    description: "Visual arts and creative expression",
    category: "elective",
    credits: 2,
    gradeLevels: ["1", "2", "3", "4", "5"],
    teachers: ["Lisa Anderson"],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19")
  },
  {
    id: "6",
     hoursPerWeek: 4,
    isActive: true,
    name: "Music",
    code: "MUS106",
    description: "Music theory and performance",
    category: "elective",
    credits: 2,
    gradeLevels: ["2", "3", "4", "5"],
    teachers: ["Robert Taylor"],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "7",
     hoursPerWeek: 4,
    isActive: true,
    name: "Physical Education",
    code: "PE107",
    description: "Physical fitness and sports activities",
    category: "elective",
    credits: 1,
    gradeLevels: ["1", "2", "3", "4", "5"],
    teachers: ["James Wilson"],
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21")
  }
];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<SubjectWithDetails[]>(mockSubjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectWithDetails | null>(null);

  const handleCreateSubject = (subjectData: CreateSubjectData) => {
    const newSubject: SubjectWithDetails = {
      ...subjectData,
      id: Date.now().toString(),
      gradeLevels: [],
      teachers: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSubjects(prev => [...prev, newSubject]);
    setShowAddForm(false);
  };

  const handleUpdateSubject = (subjectData: UpdateSubjectData) => {
    if (!editingSubject) return;
    
    setSubjects(prev => prev.map(subject => 
      subject.id === editingSubject.id
        ? { 
            ...subject, 
            ...subjectData, 
            updatedAt: new Date(),
            category: subjectData.category as "core" | "elective" | "extra-curricular"
          }
        : subject
    ));
    setEditingSubject(null);
    setShowAddForm(false);
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== subjectId));
  };

  const handleEditSubject = (subject: SubjectWithDetails) => {
    setEditingSubject(subject);
    setShowAddForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subject Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600"
        >
          Add New Subject
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade Levels
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teachers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {subject.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subject.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subject.category === "core"
                        ? "bg-green-100 text-green-800" 
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {subject.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.credits}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {subject.gradeLevels.slice(0, 3).map((grade, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          Grade {grade}
                        </span>
                      ))}
                      {subject.gradeLevels.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{subject.gradeLevels.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {subject.teachers.slice(0, 2).map((teacher, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                        >
                          {teacher}
                        </span>
                      ))}
                      {subject.teachers.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{subject.teachers.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditSubject(subject)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(subject.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <SubjectFormModal
          subject={editingSubject}
          onSubmit={(data: CreateSubjectData | UpdateSubjectData) => {
            if (editingSubject) {
              handleUpdateSubject(data as UpdateSubjectData);
            } else {
              handleCreateSubject(data as CreateSubjectData);
            }
          }}
          onClose={() => {
            setShowAddForm(false);
            setEditingSubject(null);
          }}
        />
      )}
    </div>
  );
}

interface SubjectFormModalProps {
  subject?: Subject | null;
  onSubmit: (data: CreateSubjectData | UpdateSubjectData) => void;
  onClose: () => void;
}

function SubjectFormModal({ subject: subj, onSubmit, onClose }: SubjectFormModalProps) {
  const [formData, setFormData] = useState({
    name: subj?.name || "",
    code: subj?.code || "",
    description: subj?.description || "",
    category: subj?.category || "Core",
    credits: subj?.credits || 3,
    gradeLevels: subj?.gradeLevels || [] as string[],
    teachers: subj?.teachers || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      category: formData.category.toLowerCase() as "core" | "elective" | "extra-curricular"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {subj ? "Edit Subject" : "Add New Subject"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits *
                </label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600"
              >
                {subj ? "Update" : "Create"} Subject
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}