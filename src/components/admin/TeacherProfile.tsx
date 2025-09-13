"use client";

import React, { useState } from "react";
import { Teacher } from "@/types/teacher";

interface TeacherProfileProps {
  teacher: Teacher;
  onClose: () => void;
  onEdit: (teacher: Teacher) => void;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({
  teacher,
  onClose,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'subjects' | 'timetable'>('profile');

  // Mock timetable data
  const mockTimetable = [
    { day: 'Monday', period: 1, subject: 'Mathematics', class: '10', section: 'A', room: '101' },
    { day: 'Monday', period: 3, subject: 'Science', class: '9', section: 'B', room: '102' },
    { day: 'Tuesday', period: 2, subject: 'Physics', class: '11', section: 'A', room: '201' },
    { day: 'Tuesday', period: 4, subject: 'Chemistry', class: '12', section: 'B', room: '202' },
    { day: 'Wednesday', period: 1, subject: 'Mathematics', class: '10', section: 'B', room: '101' },
    { day: 'Wednesday', period: 3, subject: 'Computer Science', class: '11', section: 'A', room: '301' },
    { day: 'Thursday', period: 2, subject: 'Physics', class: '12', section: 'A', room: '201' },
    { day: 'Thursday', period: 4, subject: 'Mathematics', class: '9', section: 'A', room: '101' },
    { day: 'Friday', period: 1, subject: 'Science', class: '10', section: 'A', room: '102' },
    { day: 'Friday', period: 3, subject: 'Chemistry', class: '11', section: 'B', room: '202' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  const getTeacherTimetable = () => {
    return mockTimetable.filter(slot => 
      teacher.subjects.some(subject => slot.subject.toLowerCase().includes(subject.toLowerCase()))
    );
  };

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const calculateExperience = (dateOfJoining: Date) => {
    const today = new Date();
    const joiningDate = new Date(dateOfJoining);
    let years = today.getFullYear() - joiningDate.getFullYear();
    const monthDiff = today.getMonth() - joiningDate.getMonth();
    
    if (monthDiff < 0) {
      years--;
    }
    
    return years;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Teacher Profile</h2>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(teacher)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Edit Profile
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar with tabs */}
          <div className="w-full md:w-48 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-brand-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === 'subjects' 
                    ? 'bg-brand-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Subjects
              </button>
              <button
                onClick={() => setActiveTab('timetable')}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === 'timetable' 
                    ? 'bg-brand-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Timetable
              </button>
            </nav>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="p-6">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="flex-shrink-0">
                    {teacher.avatar ? (
                      <img
                        className="h-24 w-24 rounded-full object-cover"
                        src={teacher.avatar}
                        alt={`${teacher.firstName} ${teacher.lastName}`}
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-600">
                          {teacher.firstName[0]}{teacher.lastName[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-gray-600">{teacher.email}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      teacher.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {teacher.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Personal Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Date of Birth</span>
                        <p className="text-gray-900">{new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Age: {calculateAge(teacher.dateOfBirth)} years</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Contact</span>
                        <p className="text-gray-900">{teacher.contact}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Address</span>
                        <p className="text-gray-900">{teacher.address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Professional Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Qualification</span>
                        <p className="text-gray-900">{teacher.qualification}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Date of Joining</span>
                        <p className="text-gray-900">{new Date(teacher.dateOfJoining).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Experience: {calculateExperience(teacher.dateOfJoining)} years</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Subjects</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {teacher.subjects.map((subject, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <p>Member since: {new Date(teacher.createdAt).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(teacher.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Assigned Subjects</h3>
                <div className="grid gap-4">
                  {teacher.subjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{subject}</h4>
                          <p className="text-sm text-gray-600">Expert level</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'timetable' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Weekly Timetable</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day/Period
                        </th>
                        {periods.map(period => (
                          <th key={period} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Period {period}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {days.map(day => (
                        <tr key={day}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {day}
                          </td>
                          {periods.map(period => {
                            const slot = getTeacherTimetable().find(
                              s => s.day === day && s.period === period
                            );
                            return (
                              <td key={`${day}-${period}`} className="px-6 py-4 text-center">
                                {slot ? (
                                  <div className="text-xs">
                                    <div className="font-medium">{slot.subject}</div>
                                    <div className="text-gray-500">{slot.class}-{slot.section}</div>
                                    <div className="text-gray-400">{slot.room}</div>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;