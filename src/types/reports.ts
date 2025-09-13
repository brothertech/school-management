export interface AttendanceData {
  className: string;
  attendanceRate: number;
  totalStudents: number;
  presentStudents: number;
}

export interface ExamPerformanceData {
  subject: string;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
}

export interface FeeCollectionData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface StudentAttendance {
  studentName: string;
  className: string;
  attendanceRate: number;
  presentDays: number;
  totalDays: number;
}