"use client";

import { useState } from "react";
import { TimetableWithDetails, CreateTimetableEntryData, UpdateTimetableEntryData } from "@/types/timetable";
import { Class } from "@/types/class";
import { Subject } from "@/types/subject";
import { User } from "@/types/user";

// Mock data
const mockClasses: Class[] = [
  { 
    id: "1", 
    name: "Class 1A", 
    grade: "1", 
    section: "A", 
    capacity: 30, 
    currentStudents: 25,
    subjects: [],
    roomNumber: "101",
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: "2", 
    name: "Class 2B", 
    grade: "2", 
    section: "B", 
    capacity: 25, 
    currentStudents: 20,
    subjects: [],
    roomNumber: "102",
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

const mockSubjects: Subject[] = [
  { 
    id: "1", 
    name: "Mathematics", 
    code: "MATH", 
    category: "core", 
    description: "Mathematics subject", 
    credits: 4,
    hoursPerWeek: 5,
    isActive: true,
    gradeLevels: ["1", "2"],
    teachers: ["1"],
    prerequisites: [],
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: "2", 
    name: "Science", 
    code: "SCI", 
    category: "core", 
    description: "Science subject", 
    credits: 4,
    hoursPerWeek: 4,
    isActive: true,
    gradeLevels: ["1", "2"],
    teachers: ["2"],
    prerequisites: [],
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: "3", 
    name: "English", 
    code: "ENG", 
    category: "core", 
    description: "English subject", 
    credits: 3,
    hoursPerWeek: 4,
    isActive: true,
    gradeLevels: ["1", "2"],
    teachers: ["1"],
    prerequisites: [],
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

const mockTeachers: User[] = [
  { 
    id: "1", 
    firstName: "John", 
    lastName: "Smith", 
    email: "john@example.com", 
    role: "teacher", 
    contact: "+1234567890",
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: "2", 
    firstName: "Jane", 
    lastName: "Doe", 
    email: "jane@example.com", 
    role: "teacher", 
    contact: "+0987654321",
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

const mockTimetable: TimetableWithDetails[] = [
  {
    id: "1",
    classId: "1",
    subjectId: "1",
    teacherId: "1",
    day: "monday",
    period: 1,
    startTime: "08:00",
    endTime: "09:00",
    room: "Room 101",
    className: "Class 1A",
    subjectName: "Mathematics",
    teacherName: "John Smith",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    classId: "1",
    subjectId: "2",
    teacherId: "2",
    day: "monday",
    period: 2,
    startTime: "09:00",
    endTime: "10:00",
    room: "Room 102",
    className: "Class 1A",
    subjectName: "Science",
    teacherName: "Jane Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;
const periods = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState<string>(mockClasses[0].id);
  const [timetable, setTimetable] = useState<TimetableWithDetails[]>(mockTimetable);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableWithDetails | null>(null);

  const filteredTimetable = timetable.filter(entry => entry.classId === selectedClass);

  const getEntryForSlot = (day: typeof days[number], period: number) => {
    return filteredTimetable.find(entry => entry.day === day && entry.period === period);
  };

  const handleCreateEntry = (data: CreateTimetableEntryData) => {
    const teacher = mockTeachers.find(t => t.id === data.teacherId);
    const newEntry: TimetableWithDetails = {
      id: Date.now().toString(),
      ...data,
      className: mockClasses.find(c => c.id === data.classId)?.name || "",
      subjectName: mockSubjects.find(s => s.id === data.subjectId)?.name || "",
      teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTimetable([...timetable, newEntry]);
    setShowAddForm(false);
  };

  const handleUpdateEntry = (id: string, data: UpdateTimetableEntryData) => {
    setTimetable(timetable.map(entry => {
      if (entry.id === id) {
        const teacher = data.teacherId ? mockTeachers.find(t => t.id === data.teacherId) : null;
        return { 
          ...entry, 
          ...data,
          className: data.classId ? mockClasses.find(c => c.id === data.classId)?.name || "" : entry.className,
          subjectName: data.subjectId ? mockSubjects.find(s => s.id === data.subjectId)?.name || "" : entry.subjectName,
          teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : entry.teacherName,
          updatedAt: new Date() 
        };
      }
      return entry;
    }));
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id: string) => {
    setTimetable(timetable.filter(entry => entry.id !== id));
  };

  const handleEditEntry = (entry: TimetableWithDetails) => {
    setEditingEntry(entry);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Timetable Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Timetable Entry
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full md:w-64 p-2 border border-gray-300 rounded"
        >
          {mockClasses.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100">Period</th>
              {days.map(day => (
                <th key={day} className="border border-gray-300 p-2 bg-gray-100 capitalize">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map(period => (
              <tr key={period}>
                <td className="border border-gray-300 p-2 bg-gray-50 text-center">
                  {period}
                </td>
                {days.map(day => {
                  const entry = getEntryForSlot(day, period);
                  return (
                    <td key={day} className="border border-gray-300 p-2 min-w-[200px]">
                      {entry ? (
                        <div className="bg-blue-50 p-2 rounded">
                          <div className="font-semibold">{entry.subjectName}</div>
                          <div className="text-sm text-gray-600">{entry.teacherName}</div>
                          <div className="text-sm text-gray-500">{entry.room}</div>
                          <div className="text-xs text-gray-400">
                            {entry.startTime} - {entry.endTime}
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={() => handleEditEntry(entry)}
                              className="text-blue-600 hover:text-blue-800 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-center">-</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <TimetableEntryModal
          classes={mockClasses}
          subjects={mockSubjects}
          teachers={mockTeachers}
          onSubmit={handleCreateEntry}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingEntry && (
        <TimetableEntryModal
          entry={editingEntry}
          classes={mockClasses}
          subjects={mockSubjects}
          teachers={mockTeachers}
          onSubmit={(data) => handleUpdateEntry(editingEntry.id, data)}
          onClose={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
}

interface TimetableEntryModalProps {
  entry?: TimetableWithDetails;
  classes: Class[];
  subjects: Subject[];
  teachers: User[];
  onSubmit: (data: CreateTimetableEntryData) => void;
  onClose: () => void;
}

function TimetableEntryModal({ entry, classes, subjects, teachers, onSubmit, onClose }: TimetableEntryModalProps) {
  const [formData, setFormData] = useState({
    classId: entry?.classId || "",
    subjectId: entry?.subjectId || "",
    teacherId: entry?.teacherId || "",
    day: entry?.day || "monday",
    period: entry?.period || 1,
    startTime: entry?.startTime || "08:00",
    endTime: entry?.endTime || "09:00",
    room: entry?.room || "",  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {entry ? "Edit Timetable Entry" : "Add Timetable Entry"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Class:</label>
            <select
              required
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject:</label>
            <select
              required
              value={formData.subjectId}
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teacher:</label>
            <select
              required
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Day:</label>
            <select
              required
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value as typeof days[number] })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {days.map(day => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Period:</label>
            <select
              required
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {periods.map(period => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time:</label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time:</label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room:</label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="Optional"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              {entry ? "Update" : "Add"} Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}