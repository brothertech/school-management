"use client";

import React, { useState } from "react";
import { Class, CreateClassData, UpdateClassData } from "@/types/class";

// Mock data for classes
const mockClasses: Class[] = [
  {
    id: "1",
    name: "Class 1A",
    grade: "1",
    section: "A",
    capacity: 30,
    currentStudents: 25,
    classTeacher: "John Smith",
    roomNumber: "101",
    subjects: ["Mathematics", "English", "Science"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Class 2B",
    grade: "2",
    section: "B",
    capacity: 35,
    currentStudents: 32,
    classTeacher: "Sarah Johnson",
    roomNumber: "102",
    subjects: ["Mathematics", "English", "Social Studies"],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: "3",
    name: "Class 3C",
    grade: "3",
    section: "C",
    capacity: 40,
    currentStudents: 38,
    classTeacher: "Michael Brown",
    roomNumber: "103",
    subjects: ["Mathematics", "Science", "Art"],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17")
  },
  {
    id: "4",
    name: "Class 4A",
    grade: "4",
    section: "A",
    capacity: 30,
    currentStudents: 28,
    classTeacher: "Emily Davis",
    roomNumber: "104",
    subjects: ["Mathematics", "English", "Music"],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "5",
    name: "Class 5B",
    grade: "5",
    section: "B",
    capacity: 35,
    currentStudents: 30,
    classTeacher: "David Wilson",
    roomNumber: "105",
    subjects: ["Mathematics", "Science", "Physical Education"],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19")
  }
];

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const handleCreateClass = (classData: CreateClassData) => {
    const newClass: Class = {
      ...classData,
      id: Date.now().toString(),
      currentStudents: 0,
      subjects: classData.subjects || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setClasses(prev => [...prev, newClass]);
    setShowAddForm(false);
  };

  const handleUpdateClass = (classData: UpdateClassData) => {
    if (!editingClass) return;
    
    setClasses(prev => prev.map(cls => 
      cls.id === editingClass.id
        ? { ...cls, ...classData, updatedAt: new Date() }
        : cls
    ));
    setEditingClass(null);
    setShowAddForm(false);
  };

  const handleDeleteClass = (classId: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== classId));
  };

  const handleEditClass = (cls: Class) => {
    setEditingClass(cls);
    setShowAddForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600"
        >
          Add New Class
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade & Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cls.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Grade {cls.grade} - Section {cls.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cls.currentStudents} / {cls.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cls.classTeacher || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cls.roomNumber || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {cls.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {subject}
                        </span>
                      ))}
                      {cls.subjects.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{cls.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClass(cls)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClass(cls.id)}
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
        <ClassFormModal
          class={editingClass}
          onSubmit={(data: CreateClassData | UpdateClassData) => {
            if (editingClass) {
              handleUpdateClass(data as UpdateClassData);
            } else {
              handleCreateClass(data as CreateClassData);
            }
          }}
          onClose={() => {
            setShowAddForm(false);
            setEditingClass(null);
          }}
        />
      )}
    </div>
  );
}

interface ClassFormModalProps {
  class?: Class | null;
  onSubmit: (data: CreateClassData | UpdateClassData) => void;
  onClose: () => void;
}

function ClassFormModal({ class: cls, onSubmit, onClose }: ClassFormModalProps) {
  const [formData, setFormData] = useState({
    name: cls?.name || "",
    grade: cls?.grade || "",
    section: cls?.section || "",
    capacity: cls?.capacity || 30,
    classTeacher: cls?.classTeacher || "",
    roomNumber: cls?.roomNumber || "",
    subjects: cls?.subjects || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {cls ? "Edit Class" : "Add New Class"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name *
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section *
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select Section</option>
                  {['A', 'B', 'C', 'D', 'E'].map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity *
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Teacher
              </label>
              <input
                type="text"
                name="classTeacher"
                value={formData.classTeacher}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Number
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
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
                {cls ? "Update" : "Create"} Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
