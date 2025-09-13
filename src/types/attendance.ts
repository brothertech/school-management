export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  recordedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAttendanceRecordData {
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  recordedBy: string;
}

export interface UpdateAttendanceRecordData {
  status?: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  recordedBy?: string;
}

export interface AttendanceWithDetails extends AttendanceRecord {
  studentName: string;
  className: string;
  recordedByName: string;
}

export interface DailyAttendanceSummary {
  classId: string;
  className: string;
  date: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
}

export interface StudentAttendanceSummary {
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
}