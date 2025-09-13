"use client";

import React, { useState, useEffect } from "react";
import TeachersList from "@/components/admin/TeachersList";
import AddTeacherForm from "@/components/admin/AddTeacherForm";
import TeacherProfile from "@/components/admin/TeacherProfile";
import StaffAttendance from "@/components/admin/StaffAttendance";
import { Teacher, CreateTeacherData, UpdateTeacherData, TeacherAttendance } from "@/types/teacher";

// Mock data for teachers
const mockTeachers: Teacher[] = [
  {
    dateOfJoining: new Date("2024-01-15"),
    dateOfBirth: new Date("1990-01-15"),
    qualification: "M.Ed. in Mathematics",
    isActive: true,
    email: "john.smith@school.edu",
    id: "1",
    firstName: "John",
    lastName: "Smith",
    subjects: ["Mathematics", "Calculus"],
    contact: "john.smith@school.edu",
    avatar: "/api/placeholder/40/40",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
     dateOfJoining: new Date("2024-01-15"),
    dateOfBirth: new Date("1990-01-15"),
    qualification: "M.Ed. in Mathematics",
    email: "sarah.j@school.edu",
    isActive: true,
    firstName: "Sarah",
    lastName: "Johnson",
    subjects: ["Physics", "Advanced Physics"],
    contact: "sarah.j@school.edu",
    avatar: "/api/placeholder/40/40",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: "3",
     dateOfJoining: new Date("2024-01-15"),
    dateOfBirth: new Date("1990-01-15"),
    qualification: "M.Ed. in Mathematics",
    email: "sarah.j@school.edu",
    isActive: true,
    firstName: "Michael",
    lastName: "Brown",
    subjects: ["English", "Literature"],
    contact: "michael.b@school.edu",
    avatar: "/api/placeholder/40/40",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17")
  },
  {
    id: "4",
     dateOfJoining: new Date("2024-01-15"),
    dateOfBirth: new Date("1990-01-15"),
    qualification: "M.Ed. in Mathematics",
    email: "sarah.j@school.edu",
    isActive: true,
    firstName: "Emily",
    lastName: "Davis",
    subjects: ["Chemistry", "Organic Chemistry"],
    contact: "emily.d@school.edu",
    avatar: "/api/placeholder/40/40",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "5",
     dateOfJoining: new Date("2024-01-15"),
    dateOfBirth: new Date("1990-01-15"),
    qualification: "M.Ed. in Mathematics",
    email: "sarah.j@school.edu",
    isActive: true,
    firstName: "David",
    lastName: "Wilson",
    subjects: ["History", "World History"],
    contact: "david.w@school.edu",
    avatar: "/api/placeholder/40/40",
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19")
  }
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const handleCreateTeacher = (teacherData: CreateTeacherData) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      avatar: "/api/placeholder/40/40"
    };
    setTeachers(prev => [...prev, newTeacher]);
    setShowAddForm(false);
  };

  const handleUpdateTeacher = (teacherData: UpdateTeacherData) => {
    if (!editingTeacher) return;
    
    setTeachers(prev => prev.map(teacher => 
      teacher.id === editingTeacher.id
        ? { ...teacher, ...teacherData, updatedAt: new Date() }
        : teacher
    ));
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
  };

  const handleViewProfile = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowProfile(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setShowAddForm(true);
  };

  const handleAttendance = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowAttendance(true);
  };

  const handleSaveAttendance = (attendance: TeacherAttendance) => {
    console.log("Attendance saved:", attendance);
    // In a real application, you would save this to your backend
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600"
        >
          Add New Teacher
        </button>
      </div>

      <TeachersList
        teachers={teachers}
        onViewProfile={handleViewProfile}
        onEditTeacher={handleEditTeacher}
        onDeleteTeacher={handleDeleteTeacher}
        onToggleAttendance={handleAttendance}
        onCreateTeacher={() => setShowAddForm(true)}
      />

      {showAddForm && (
        <AddTeacherForm
          initialData={editingTeacher}
          onSubmit={(teacherData: CreateTeacherData | UpdateTeacherData) => {
            if (editingTeacher) {
              handleUpdateTeacher(teacherData as UpdateTeacherData);
            } else {
              handleCreateTeacher(teacherData as CreateTeacherData);
            }
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingTeacher(null);
          }}
        />
      )}

      {showProfile && selectedTeacher && (
        <TeacherProfile
          teacher={selectedTeacher}
          onClose={() => {
            setShowProfile(false);
            setSelectedTeacher(null);
          }}
          onEdit={() => {
            setShowProfile(false);
            handleEditTeacher(selectedTeacher);
          }}
        />
      )}

      {showAttendance && selectedTeacher && (
        <StaffAttendance
          teacher={selectedTeacher}
          onClose={() => {
            setShowAttendance(false);
            setSelectedTeacher(null);
          }}
          onSaveAttendance={handleSaveAttendance}
        />
      )}
    </div>
  );
}
