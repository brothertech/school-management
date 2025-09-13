export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  occupation?: string;
  avatar?: string;
  children: ChildStudent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChildStudent {
  id: string;
  firstName: string;
  lastName: string;
  currentClass: string;
  currentSection: string;
  rollNumber: number;
  avatar?: string;
  attendanceSummary: AttendanceSummary;
  examPerformance: ExamPerformanceSummary;
  feeStatus: FeeStatus;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendanceRate: number;
  recentAttendance: DailyAttendance[];
}

export interface DailyAttendance {
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  remarks?: string;
}

export interface ExamPerformanceSummary {
  averageScore: number;
  totalExams: number;
  subjects: SubjectPerformance[];
  recentResults: ExamResult[];
}

export interface SubjectPerformance {
  subject: string;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  grade: string;
}

export interface ExamResult {
  examId: string;
  examName: string;
  subject: string;
  date: Date;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
}

export interface FeeStatus {
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  dueDate?: Date;
  paymentHistory: PaymentRecord[];
  upcomingPayments: UpcomingPayment[];
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: Date;
  method: string;
  description: string;
  receiptNumber?: string;
}

export interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'overdue' | 'paid';
}

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'attendance' | 'fee' | 'exam' | 'general';
  date: Date;
  read: boolean;
  relatedTo?: {
    studentId?: string;
    studentName?: string;
    examId?: string;
    feeId?: string;
  };
}