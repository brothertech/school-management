export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  capacity: number;
  currentStudents: number;
  classTeacher?: string;
  roomNumber?: string;
  subjects: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassData {
  name: string;
  grade: string;
  section: string;
  capacity: number;
  classTeacher?: string;
  roomNumber?: string;
  subjects?: string[];
}

export interface UpdateClassData {
  name?: string;
  grade?: string;
  section?: string;
  capacity?: number;
  classTeacher?: string;
  roomNumber?: string;
  subjects?: string[];
}

export interface Section {
  id: string;
  name: string;
  classId: string;
  className: string;
  capacity: number;
  currentStudents: number;
  classTeacher?: string;
  roomNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSectionData {
  name: string;
  classId: string;
  capacity: number;
  classTeacher?: string;
  roomNumber?: string;
}

export interface UpdateSectionData {
  name?: string;
  capacity?: number;
  classTeacher?: string;
  roomNumber?: string;
}

export interface ClassSubjectAssignment {
  id: string;
  classId: string;
  subjectId: string;
  teacherId?: string;
  hoursPerWeek: number;
  isCompulsory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassSubjectAssignmentData {
  classId: string;
  subjectId: string;
  teacherId?: string;
  hoursPerWeek: number;
  isCompulsory: boolean;
}

export interface UpdateClassSubjectAssignmentData {
  teacherId?: string;
  hoursPerWeek?: number;
  isCompulsory?: boolean;
}