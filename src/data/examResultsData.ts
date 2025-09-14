import { ExamResult } from '@/types/exam';
import { mockExams } from './examData';

export const mockExamResults: ExamResult[] = [
  // Exam 1: Midterm Mathematics Exam - Grade 10 - A
  {
    id: 'result-1-1',
    examId: '1',
    studentId: 'student-001',
    studentName: 'John Smith',
    marksObtained: 85,
    grade: 'A',
    remarks: 'Excellent performance',
    isAbsent: false,
    createdAt: new Date('2024-03-15T11:30:00'),
    updatedAt: new Date('2024-03-15T11:30:00'),
  },
  {
    id: 'result-1-2',
    examId: '1',
    studentId: 'student-002',
    studentName: 'Sarah Johnson',
    marksObtained: 92,
    grade: 'A+',
    remarks: 'Outstanding work',
    isAbsent: false,
    createdAt: new Date('2024-03-15T11:30:00'),
    updatedAt: new Date('2024-03-15T11:30:00'),
  },
  {
    id: 'result-1-3',
    examId: '1',
    studentId: 'student-003',
    studentName: 'Michael Brown',
    marksObtained: 78,
    grade: 'B+',
    remarks: 'Good effort',
    isAbsent: false,
    createdAt: new Date('2024-03-15T11:30:00'),
    updatedAt: new Date('2024-03-15T11:30:00'),
  },
  {
    id: 'result-1-4',
    examId: '1',
    studentId: 'student-004',
    studentName: 'Emily Davis',
    marksObtained: 65,
    grade: 'C+',
    remarks: 'Needs improvement',
    isAbsent: false,
    createdAt: new Date('2024-03-15T11:30:00'),
    updatedAt: new Date('2024-03-15T11:30:00'),
  },
  {
    id: 'result-1-5',
    examId: '1',
    studentId: 'student-005',
    studentName: 'David Wilson',
    marksObtained: 0,
    grade: 'F',
    remarks: 'Absent',
    isAbsent: true,
    createdAt: new Date('2024-03-15T11:30:00'),
    updatedAt: new Date('2024-03-15T11:30:00'),
  },

  // Exam 2: Science Final Exam - Grade 8 - B
  {
    id: 'result-2-1',
    examId: '2',
    studentId: 'student-101',
    studentName: 'Emma Thompson',
    marksObtained: 88,
    grade: 'A',
    remarks: 'Very good',
    isAbsent: false,
    createdAt: new Date('2024-03-20T12:15:00'),
    updatedAt: new Date('2024-03-20T12:15:00'),
  },
  {
    id: 'result-2-2',
    examId: '2',
    studentId: 'student-102',
    studentName: 'James Anderson',
    marksObtained: 76,
    grade: 'B',
    remarks: 'Satisfactory',
    isAbsent: false,
    createdAt: new Date('2024-03-20T12:15:00'),
    updatedAt: new Date('2024-03-20T12:15:00'),
  },
  {
    id: 'result-2-3',
    examId: '2',
    studentId: 'student-103',
    studentName: 'Olivia Martinez',
    marksObtained: 94,
    grade: 'A+',
    remarks: 'Excellent',
    isAbsent: false,
    createdAt: new Date('2024-03-20T12:15:00'),
    updatedAt: new Date('2024-03-20T12:15:00'),
  },

  // Exam 3: English Literature Quiz - Grade 12 - C
  {
    id: 'result-3-1',
    examId: '3',
    studentId: 'student-201',
    studentName: 'Robert Taylor',
    marksObtained: 82,
    grade: 'A-',
    remarks: 'Good work',
    isAbsent: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'result-3-2',
    examId: '3',
    studentId: 'student-202',
    studentName: 'Sophia Clark',
    marksObtained: 79,
    grade: 'B+',
    remarks: 'Well done',
    isAbsent: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'result-3-3',
    examId: '3',
    studentId: 'student-203',
    studentName: 'William Rodriguez',
    marksObtained: 0,
    grade: 'F',
    remarks: 'Incomplete - only attempted 50%',
    isAbsent: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Exam 4: History Chapter Test - Grade 11 - A
  {
    id: 'result-4-1',
    examId: '4',
    studentId: 'student-301',
    studentName: 'Jennifer Lee',
    marksObtained: 91,
    grade: 'A+',
    remarks: 'Excellent historical analysis',
    isAbsent: false,
    createdAt: new Date('2024-02-25T14:45:00'),
    updatedAt: new Date('2024-02-25T14:45:00'),
  },
  {
    id: 'result-4-2',
    examId: '4',
    studentId: 'student-302',
    studentName: 'Christopher Harris',
    marksObtained: 68,
    grade: 'C+',
    remarks: 'Needs to study more',
    isAbsent: false,
    createdAt: new Date('2024-02-25T14:45:00'),
    updatedAt: new Date('2024-02-25T14:45:00'),
  },
  {
    id: 'result-4-3',
    examId: '4',
    studentId: 'student-303',
    studentName: 'Amanda White',
    marksObtained: 0,
    grade: 'F',
    remarks: 'Absent',
    isAbsent: true,
    createdAt: new Date('2024-02-25T14:45:00'),
    updatedAt: new Date('2024-02-25T14:45:00'),
  },
];

export const getExamResultsByExamId = (examId: string): ExamResult[] => {
  return mockExamResults.filter(result => result.examId === examId);
};

export const getAllExamResults = (): ExamResult[] => {
  return mockExamResults;
};

export const getClassPerformanceStats = () => {
  const classStats: Record<string, { totalStudents: number; totalMarks: number; average: number; completed: number }> = {};
  
  mockExamResults.forEach(result => {
    if (!result.isAbsent) {
      const exam = mockExams.find(e => e.id === result.examId);
      if (exam) {
        const classKey = exam.classSection;
        if (!classStats[classKey]) {
          classStats[classKey] = { totalStudents: 0, totalMarks: 0, average: 0, completed: 0 };
        }
        classStats[classKey].totalStudents++;
        classStats[classKey].totalMarks += result.marksObtained;
        classStats[classKey].completed++;
      }
    }
  });

  // Calculate averages
  Object.keys(classStats).forEach(classKey => {
    if (classStats[classKey].completed > 0) {
      classStats[classKey].average = classStats[classKey].totalMarks / classStats[classKey].completed;
    }
  });

  return classStats;
};