export interface Guardian {
  name: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
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
  guardian?: Partial<Guardian>;
}

export interface PromoteStudentData {
  newClass: string;
  newSection: string;
  newRollNumber: number;
  promotionDate: Date;
}