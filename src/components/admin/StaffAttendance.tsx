"use client";

import React, { useState, useEffect } from "react";
import { Teacher, TeacherAttendance } from "@/types/teacher";

interface StaffAttendanceProps {
  teacher: Teacher;
  onClose: () => void;
  onSaveAttendance: (attendance: TeacherAttendance) => void;
}

const StaffAttendance: React.FC<StaffAttendanceProps> = ({
  teacher,
  onClose,
  onSaveAttendance,
}) => {
  const [attendanceStatus, setAttendanceStatus] = useState<'present' | 'absent' | 'leave'>('present');
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [checkOutTime, setCheckOutTime] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceHistory, setAttendanceHistory] = useState<TeacherAttendance[]>([]);

  useEffect(() => {
    // Load mock attendance history
    const mockHistory: TeacherAttendance[] = [
      {
        id: "1",
        teacherId: teacher.id,
        date: new Date(Date.now() - 86400000), // Yesterday
        status: "present",
        checkInTime: new Date(Date.now() - 86400000 + 28800000), // 8:00 AM
        checkOutTime: new Date(Date.now() - 86400000 + 61200000), // 5:00 PM
        remarks: "Regular working hours"
      },
      {
        id: "2",
        teacherId: teacher.id,
        date: new Date(Date.now() - 172800000), // 2 days ago
        status: "absent",
        remarks: "Sick leave"
      },
      {
        id: "3",
        teacherId: teacher.id,
        date: new Date(Date.now() - 259200000), // 3 days ago
        status: "present",
        checkInTime: new Date(Date.now() - 259200000 + 32400000), // 9:00 AM
        checkOutTime: new Date(Date.now() - 259200000 + 61200000), // 5:00 PM
        remarks: "Staff meeting"
      }
    ];
    setAttendanceHistory(mockHistory);
  }, [teacher.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const attendanceData: TeacherAttendance = {
      id: Date.now().toString(),
      teacherId: teacher.id,
      date: new Date(attendanceDate),
      status: attendanceStatus,
      remarks: remarks.trim() || undefined
    };

    if (checkInTime) {
      attendanceData.checkInTime = new Date(`${attendanceDate}T${checkInTime}`);
    }
    
    if (checkOutTime) {
      attendanceData.checkOutTime = new Date(`${attendanceDate}T${checkOutTime}`);
    }

    onSaveAttendance(attendanceData);
    onClose();
  };

  const getStatusColor = (status: 'present' | 'absent' | 'leave') => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTodayAttendance = () => {
    const today = new Date().toDateString();
    return attendanceHistory.find(record => 
      new Date(record.date).toDateString() === today
    );
  };

  const todayAttendance = getTodayAttendance();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Staff Attendance</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            {teacher.avatar ? (
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={teacher.avatar}
                alt={`${teacher.firstName} ${teacher.lastName}`}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {teacher.firstName} {teacher.lastName}
              </h3>
              <p className="text-gray-600">{teacher.qualification}</p>
            </div>
          </div>

          {todayAttendance && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Today's Attendance</h4>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(todayAttendance.status)}`}>
                  {todayAttendance.status.toUpperCase()}
                </span>
                {todayAttendance.checkInTime && (
                  <span className="text-sm text-gray-600">
                    Check-in: {formatTime(todayAttendance.checkInTime)}
                  </span>
                )}
                {todayAttendance.checkOutTime && (
                  <span className="text-sm text-gray-600">
                    Check-out: {formatTime(todayAttendance.checkOutTime)}
                  </span>
                )}
              </div>
              {todayAttendance.remarks && (
                <p className="text-sm text-gray-600 mt-2">Remarks: {todayAttendance.remarks}</p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attendance Date
              </label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendanceStatus"
                    value="present"
                    checked={attendanceStatus === 'present'}
                    onChange={() => setAttendanceStatus('present')}
                    className="mr-2"
                  />
                  <span className="text-green-600">Present</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendanceStatus"
                    value="absent"
                    checked={attendanceStatus === 'absent'}
                    onChange={() => setAttendanceStatus('absent')}
                    className="mr-2"
                  />
                  <span className="text-red-600">Absent</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendanceStatus"
                    value="leave"
                    checked={attendanceStatus === 'leave'}
                    onChange={() => setAttendanceStatus('leave')}
                    className="mr-2"
                  />
                  <span className="text-yellow-600">Leave</span>
                </label>
              </div>
            </div>

            {attendanceStatus === 'present' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Time
                    </label>
                    <input
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Time
                    </label>
                    <input
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Add any remarks or notes..."
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
                Save Attendance
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Attendance History (Last 7 Days)</h4>
            <div className="space-y-2">
              {attendanceHistory.slice(0, 7).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {record.checkInTime && formatTime(record.checkInTime)}
                    {record.checkOutTime && ` - ${formatTime(record.checkOutTime)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;