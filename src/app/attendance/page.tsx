"use client";

import { useState } from "react";
import { AttendanceWithDetails, CreateAttendanceRecordData, DailyAttendanceSummary } from "@/types/attendance";
import { Class } from "@/types/class";
import { User } from "@/types/user";

// Mock data
const mockClasses: Class[] = [
  { id: "1", name: "Class 1A", gradeLevel: "1", section: "A", capacity: 30, createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Class 2B", gradeLevel: "2", section: "B", capacity: 25, createdAt: new Date(), updatedAt: new Date() },
];

const mockStudents: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "student", createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "student", createdAt: new Date(), updatedAt: new Date() },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "student", createdAt: new Date(), updatedAt: new Date() },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "student", createdAt: new Date(), updatedAt: new Date() },
];

const mockAttendance: AttendanceWithDetails[] = [
  {
    id: "1",
    studentId: "1",
    classId: "1",
    date: "2024-01-15",
    status: "present",
    remarks: "",
    recordedBy: "1",
    studentName: "Alice Johnson",
    className: "Class 1A",
    recordedByName: "Teacher 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    studentId: "2",
    classId: "1",
    date: "2024-01-15",
    status: "absent",
    remarks: "Sick",
    recordedBy: "1",
    studentName: "Bob Smith",
    className: "Class 1A",
    recordedByName: "Teacher 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState<string>(mockClasses[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<AttendanceWithDetails[]>(mockAttendance);
  const [showSummary, setShowSummary] = useState(false);

  const classStudents = mockStudents.filter(student => student.role === "student");
  
  const filteredAttendance = attendance.filter(
    record => record.classId === selectedClass && record.date === selectedDate
  );

  const getAttendanceForStudent = (studentId: string) => {
    return filteredAttendance.find(record => record.studentId === studentId);
  };

  const calculateSummary = (): DailyAttendanceSummary => {
    const classStudentsCount = classStudents.length;
    const present = filteredAttendance.filter(r => r.status === "present").length;
    const absent = filteredAttendance.filter(r => r.status === "absent").length;
    const late = filteredAttendance.filter(r => r.status === "late").length;
    const excused = filteredAttendance.filter(r => r.status === "excused").length;
    const totalMarked = present + absent + late + excused;
    const attendancePercentage = classStudentsCount > 0 ? (present / classStudentsCount) * 100 : 0;

    return {
      classId: selectedClass,
      className: mockClasses.find(c => c.id === selectedClass)?.name || "",
      date: selectedDate,
      totalStudents: classStudentsCount,
      present,
      absent,
      late,
      excused,
      attendancePercentage: Math.round(attendancePercentage),
    };
  };

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused', remarks?: string) => {
    const existingRecord = getAttendanceForStudent(studentId);
    
    if (existingRecord) {
      // Update existing record
      setAttendance(attendance.map(record =>
        record.id === existingRecord.id
          ? { ...record, status, remarks, updatedAt: new Date() }
          : record
      ));
    } else {
      // Create new record
      const newRecord: AttendanceWithDetails = {
        id: Date.now().toString(),
        studentId,
        classId: selectedClass,
        date: selectedDate,
        status,
        remarks,
        recordedBy: "1", // Mock teacher ID
        studentName: mockStudents.find(s => s.id === studentId)?.name || "",
        className: mockClasses.find(c => c.id === selectedClass)?.name || "",
        recordedByName: "Current User",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAttendance([...attendance, newRecord]);
    }
  };

  const summary = calculateSummary();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daily Attendance</h1>
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {showSummary ? "Hide Summary" : "Show Summary"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {mockClasses.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {showSummary && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3">Attendance Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{summary.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{summary.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{summary.late}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summary.excused}</div>
              <div className="text-sm text-gray-600">Excused</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-gray-800">
              {summary.attendancePercentage}%
            </div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {summary.totalStudents} students total
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classStudents.map((student) => {
              const attendanceRecord = getAttendanceForStudent(student.id);
              
              return (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attendanceRecord ? (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        attendanceRecord.status === 'present' 
                          ? 'bg-green-100 text-green-800'
                          : attendanceRecord.status === 'absent'
                          ? 'bg-red-100 text-red-800'
                          : attendanceRecord.status === 'late'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {attendanceRecord.status}
                      </span>
                    ) : (
                      <span className="text-gray-400">Not marked</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attendanceRecord?.remarks || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'present')}
                        className="text-green-600 hover:text-green-800"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'absent')}
                        className="text-red-600 hover:text-red-800"
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'late')}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        Late
                      </button>
                      <button
                        onClick={() => {
                          const remarks = prompt('Enter reason for excused absence:');
                          if (remarks !== null) {
                            handleMarkAttendance(student.id, 'excused', remarks);
                          }
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Excused
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Legend:</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 border border-green-300 mr-1"></div>
            <span>Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 border border-red-300 mr-1"></div>
            <span>Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 mr-1"></div>
            <span>Late</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 mr-1"></div>
            <span>Excused</span>
          </div>
        </div>
      </div>
    </div>
  );
}
