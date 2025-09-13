"use client";

import React, { useState, useEffect } from "react";
import { Student, CreateStudentData, UpdateStudentData, PromoteStudentData } from "@/types/student";
import StudentsList from "@/components/admin/StudentsList";
import AddStudentForm from "@/components/admin/AddStudentForm";
import StudentProfile from "@/components/admin/StudentProfile";
import PromoteStudentModal from "@/components/admin/PromoteStudentModal";

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date("2010-05-15"),
    gender: "male",
    currentClass: "5",
    currentSection: "A",
    rollNumber: 12,
    admissionNumber: "ADM001",
    admissionDate: new Date("2020-04-01"),
    createdAt: new Date("2020-04-01"),
    updatedAt: new Date("2020-04-01"),
    guardian: {
      name: "Jane Doe",
      relationship: "mother",
      contact: "+1234567890",
      email: "jane.doe@email.com",
      occupation: "Teacher"
    },
    contact: "+1234567891",
    email: "john.doe@school.com",
    address: "123 Main St, City, State",
    academicHistory: [
      {
        year: "2020-2021",
        class: "1",
        section: "A",
        rollNumber: 5
      },
      {
        year: "2021-2022",
        class: "2",
        section: "B",
        rollNumber: 8
      }
    ]
  },
  {
    id: "2",
    firstName: "Alice",
    lastName: "Smith",
    dateOfBirth: new Date("2011-08-22"),
    gender: "female",
    currentClass: "4",
    currentSection: "B",
    rollNumber: 8,
    admissionNumber: "ADM002",
    admissionDate: new Date("2019-04-01"),
     createdAt: new Date("2020-04-01"),
    updatedAt: new Date("2020-04-01"),
    guardian: {
      name: "Bob Smith",
      relationship: "father",
      contact: "+0987654321",
      email: "bob.smith@email.com",
      occupation: "Engineer"
    },
    contact: "+0987654322",
    email: "alice.smith@school.com",
    address: "456 Oak St, City, State",
    academicHistory: [
      {
        year: "2019-2020",
        class: "1",
        section: "A",
        rollNumber: 3
      },
      {
        year: "2020-2021",
        class: "2",
        section: "B",
        rollNumber: 6
      },
      {
        year: "2021-2022",
        class: "3",
        section: "C",
        rollNumber: 7
      }
    ]
  }
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateStudent = (studentData: CreateStudentData) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      academicHistory: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setStudents(prev => [...prev, newStudent]);
    setIsAddFormOpen(false);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setIsAddFormOpen(true);
  };

  const handleUpdateStudent = (studentData: UpdateStudentData) => {
    if (selectedStudent) {
      setStudents(prev =>
        prev.map(student =>
          student.id === selectedStudent.id
            ? {
                ...student,
                ...studentData,
                // Handle guardian update separately to avoid overwriting with undefined values
                guardian: studentData.guardian
                  ? {
                      ...student.guardian,
                      ...studentData.guardian,
                      // Ensure required guardian fields are not undefined
                      name: studentData.guardian.name ?? student.guardian.name,
                      relationship: studentData.guardian.relationship ?? student.guardian.relationship,
                      contact: studentData.guardian.contact ?? student.guardian.contact
                    }
                  : student.guardian
              }
            : student
        )
      );
      setIsAddFormOpen(false);
      setIsEditing(false);
      setSelectedStudent(null);
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
    }
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

  const handlePromoteStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsPromoteModalOpen(true);
  };

  const handlePromote = (promoteData: PromoteStudentData) => {
    if (selectedStudent) {
      setStudents(prev =>
        prev.map(student =>
          student.id === selectedStudent.id
            ? {
                ...student,
                currentClass: promoteData.newClass,
                currentSection: promoteData.newSection,
                rollNumber: promoteData.newRollNumber,
                academicHistory: [
                  ...student.academicHistory,
                  {
                    year: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                    class: student.currentClass,
                    section: student.currentSection,
                    rollNumber: student.rollNumber
                  }
                ]
              }
            : student
        )
      );
    }
    setIsPromoteModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseForms = () => {
    setIsAddFormOpen(false);
    setIsProfileOpen(false);
    setIsPromoteModalOpen(false);
    setIsEditing(false);
    setSelectedStudent(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      
      <StudentsList
        students={students}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
        onViewProfile={handleViewProfile}
        onPromoteStudent={handlePromoteStudent}
        onCreateStudent={() => setIsAddFormOpen(true)}
      />

      {/* Add/Edit Student Form Modal */}
      {isAddFormOpen && (
        <AddStudentForm
          onSubmit={isEditing ? handleUpdateStudent : handleCreateStudent}
          onCancel={handleCloseForms}
          initialData={isEditing && selectedStudent ? {
            firstName: selectedStudent.firstName,
            lastName: selectedStudent.lastName,
            dateOfBirth: selectedStudent.dateOfBirth,
            gender: selectedStudent.gender,
            currentClass: selectedStudent.currentClass,
            currentSection: selectedStudent.currentSection,
            rollNumber: selectedStudent.rollNumber,
            admissionNumber: selectedStudent.admissionNumber,
            admissionDate: selectedStudent.admissionDate,
            guardian: selectedStudent.guardian,
            contact: selectedStudent.contact,
            email: selectedStudent.email,
            address: selectedStudent.address
          } : undefined}
        />
      )}

      {/* Student Profile Modal */}
      {isProfileOpen && selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          onClose={handleCloseForms}
          onEdit={handleEditStudent}
          onPromote={handlePromoteStudent}
        />
      )}

      {/* Promote Student Modal */}
      {isPromoteModalOpen && selectedStudent && (
        <PromoteStudentModal
          isOpen={isPromoteModalOpen}
          onClose={handleCloseForms}
          student={selectedStudent}
          onPromote={handlePromote}
        />
      )}
    </div>
  );
}
