export interface Exam {
  id: string;
  title: string;
  subject: string;
  classSection: string;
  startDate: Date;
  endDate: Date;
  duration: number; // in minutes
  allowedAttempts: number;
  randomizeQuestions: boolean;
  instructions?: string;
  status: 'upcoming' | 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExamData {
  title: string;
  subject: string;
  classSection: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  allowedAttempts: number;
  randomizeQuestions: boolean;
  instructions?: string;
}

export interface UpdateExamData {
  title?: string;
  subject?: string;
  classSection?: string;
  startDate?: Date;
  endDate?: Date;
  duration?: number;
  allowedAttempts?: number;
  randomizeQuestions?: boolean;
  instructions?: string;
  status?: 'upcoming' | 'active' | 'closed';
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  marksObtained: number;
  grade?: string;
  remarks?: string;
  isAbsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExamResultData {
  examId: string;
  studentId: string;
  marksObtained: number;
  grade?: string;
  remarks?: string;
  isAbsent: boolean;
}

export interface UpdateExamResultData {
  marksObtained?: number;
  grade?: string;
  remarks?: string;
  isAbsent?: boolean;
}

export interface ExamWithDetails extends Exam {
  results?: ExamResult[];
  totalStudents?: number;
  averageMarks?: number;
  passPercentage?: number;
}

export interface StudentExamResult {
  examId: string;
  examName: string;
  examType: string;
  subjectName?: string;
  totalMarks: number;
  marksObtained: number;
  grade?: string;
  percentage: number;
  date: Date;
}

export interface ReportCard {
  studentId: string;
  studentName: string;
  className: string;
  term: string;
  academicYear: string;
  results: StudentExamResult[];
  totalMarks: number;
  totalObtained: number;
  overallPercentage: number;
  gpa?: number;
  finalGrade?: string;
  attendancePercentage?: number;
  remarks?: string;
}