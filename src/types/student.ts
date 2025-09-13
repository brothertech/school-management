export interface Guardian {
  name: string;
  relationship: string; // Changed to string to be compatible with CreateStudentData
  contact: string;
  email?: string;
  occupation?: string;
}

export interface AcademicRecord {
  year: string;
  class: string;
  section: string;
  rollNumber: number;
  grade?: string;
  remarks?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  currentClass: string;
  currentSection: string;
  rollNumber: number;
  admissionNumber: string;
  admissionDate: Date;
  guardian: Guardian;
  contact?: string;
  email?: string;
  address?: string;
  avatar?: string;
  academicHistory: AcademicRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStudentData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  currentClass: string;
  currentSection: string;
  rollNumber: number;
  admissionNumber: string;
  admissionDate: Date;
  guardian: Omit<Guardian, 'relationship'> & { relationship: string };
  contact?: string;
  email?: string;
  address?: string;
}

export interface UpdateStudentData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  currentClass?: string;
  currentSection?: string;
  rollNumber?: number;
  contact?: string;
  email?: string;
  address?: string;
  guardian?: {
    name?: string;
    relationship?: string;
    contact?: string;
    email?: string;
    occupation?: string;
  };
}

export interface PromoteStudentData {
  newClass: string;
  newSection: string;
  newRollNumber: number;
  promotionDate: Date;
}

// Student Portal specific interfaces
export interface StudentPortalData {
  student: Student;
  timetable: TimetableEntry[];
  upcomingExams: UpcomingExam[];
  examResults: ExamResult[];
  attendanceSummary: StudentAttendanceSummary;
  notifications: StudentNotification[];
}

export interface TimetableEntry {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface UpcomingExam {
  id: string;
  subject: string;
  date: Date;
  time: string;
  duration: string;
  room: string;
  syllabus: string;
  importance: 'high' | 'medium' | 'low';
}

export interface StudentAttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendanceRate: number;
  monthlyBreakdown: MonthlyAttendance[];
  subjectWiseAttendance: SubjectAttendance[];
}

export interface MonthlyAttendance {
  month: string;
  year: number;
  presentDays: number;
  totalDays: number;
  rate: number;
}

export interface SubjectAttendance {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  attendanceRate: number;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'exam' | 'timetable' | 'fee' | 'general';
  date: Date;
  read: boolean;
  important: boolean;
  actionUrl?: string;
}

export interface StudentProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    bloodGroup?: string;
    allergies?: string[];
    emergencyContact: string;
  };
  academicInfo: {
    currentClass: string;
    section: string;
    rollNumber: number;
    admissionNumber: string;
    admissionDate: Date;
  };
  contactInfo: {
    email?: string;
    phone?: string;
    address: string;
  };
  guardianInfo: Guardian;
}