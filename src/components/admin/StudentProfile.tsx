"use client";

import React, { useState } from "react";
import { Student } from "@/types/student";

interface StudentProfileProps {
  student: Student;
  onClose: () => void;
  onEdit: (student: Student) => void;
  onPromote: (student: Student) => void;
}

type ProfileTab = "details" | "guardian" | "academic";

const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  onClose,
  onEdit,
  onPromote,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("details");

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const calculateAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
          <p className="text-lg font-semibold text-gray-900">
            {student.firstName} {student.lastName}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
          <p className="text-lg text-gray-900">
            {formatDate(student.dateOfBirth)} (Age: {calculateAge(student.dateOfBirth)})
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Gender</h4>
          <p className="text-lg text-gray-900 capitalize">{student.gender}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Admission Number</h4>
          <p className="text-lg text-gray-900">{student.admissionNumber}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Current Class</h4>
            <p className="text-lg font-semibold text-gray-900">{student.currentClass}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Section</h4>
            <p className="text-lg text-gray-900">{student.currentSection}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Roll Number</h4>
            <p className="text-lg text-gray-900">{student.rollNumber}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Admission Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Admission Date</h4>
            <p className="text-lg text-gray-900">{formatDate(student.admissionDate)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Years in School</h4>
            <p className="text-lg text-gray-900">
              {new Date().getFullYear() - student.admissionDate.getFullYear()} years
            </p>
          </div>
        </div>
      </div>

      {student.contact && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
              <p className="text-lg text-gray-900">{student.contact}</p>
            </div>
            {student.email && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-lg text-gray-900">{student.email}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {student.address && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
          <p className="text-gray-900">{student.address}</p>
        </div>
      )}
    </div>
  );

  const renderGuardianTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Guardian Name</h4>
          <p className="text-lg font-semibold text-gray-900">{student.guardian.name}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Relationship</h4>
          <p className="text-lg text-gray-900 capitalize">{student.guardian.relationship}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Contact Number</h4>
          <p className="text-lg text-gray-900">{student.guardian.contact}</p>
        </div>
        {student.guardian.email && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
            <p className="text-lg text-gray-900">{student.guardian.email}</p>
          </div>
        )}
        {student.guardian.occupation && (
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Occupation</h4>
            <p className="text-lg text-gray-900">{student.guardian.occupation}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAcademicTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Academic Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">Class</h4>
            <p className="text-2xl font-bold text-gray-900">{student.currentClass}</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">Section</h4>
            <p className="text-2xl font-bold text-gray-900">{student.currentSection}</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">Roll No.</h4>
            <p className="text-2xl font-bold text-gray-900">{student.rollNumber}</p>
          </div>
        </div>
      </div>

      {student.academicHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Academic History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Year</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Class</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Section</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Roll No.</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Grade</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {student.academicHistory
                  .sort((a, b) => b.year.localeCompare(a.year))
                  .map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900">{record.year}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{record.class}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{record.section}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{record.rollNumber}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{record.grade || "-"}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{record.remarks || "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {student.academicHistory.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No academic history records found.</p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return renderDetailsTab();
      case "guardian":
        return renderGuardianTab();
      case "academic":
        return renderAcademicTab();
      default:
        return renderDetailsTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Student Profile</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onPromote(student)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
            >
              Promote
            </button>
            <button
              onClick={() => onEdit(student)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              Edit
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Student Header */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-4">
            {student.avatar ? (
              <img
                className="h-16 w-16 rounded-full"
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl font-medium text-gray-600">
                  {student.firstName[0]}
                  {student.lastName[0]}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {student.firstName} {student.lastName}
              </h1>
              <p className="text-gray-600">
                {student.currentClass} - {student.currentSection} (Roll: {student.rollNumber})
              </p>
              <p className="text-sm text-gray-500">{student.admissionNumber}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "details", label: "Student Details" },
              { id: "guardian", label: "Guardian Info" },
              { id: "academic", label: "Academic History" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 200px)" }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;