export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  category: 'core' | 'elective' | 'extra-curricular';
  credits: number;
  hoursPerWeek: number;
  isActive: boolean;
  assignedTeacher?: string;
  prerequisites?: string[];
  gradeLevels: string[];
  teachers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubjectData {
  name: string;
  code: string;
  description?: string;
  category: 'core' | 'elective' | 'extra-curricular';
  credits: number;
  hoursPerWeek: number;
  isActive: boolean;
  assignedTeacher?: string;
  prerequisites?: string[];
}

export interface UpdateSubjectData {
  name?: string;
  code?: string;
  description?: string;
  category?: 'core' | 'elective' | 'extra-curricular';
  credits?: number;
  hoursPerWeek?: number;
  isActive?: boolean;
  assignedTeacher?: string;
  prerequisites?: string[];
}

export interface TeacherSubjectAssignment {
  id: string;
  teacherId: string;
  subjectId: string;
  classId?: string;
  sectionId?: string;
  hoursAllocated: number;
  isPrimary: boolean;
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeacherSubjectAssignmentData {
  teacherId: string;
  subjectId: string;
  classId?: string;
  sectionId?: string;
  hoursAllocated: number;
  isPrimary: boolean;
  academicYear: string;
}

export interface UpdateTeacherSubjectAssignmentData {
  classId?: string;
  sectionId?: string;
  hoursAllocated?: number;
  isPrimary?: boolean;
  academicYear?: string;
}