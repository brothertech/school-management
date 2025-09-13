export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  qualification: string;
  subjects: string[];
  dateOfBirth: Date;
  dateOfJoining: Date;
  address?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeacherData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  qualification: string;
  subjects: string[];
  dateOfBirth: Date;
  dateOfJoining: Date;
  address?: string;
//   isActive?: boolean;
}

export interface UpdateTeacherData {
  firstName?: string;
  lastName?: string;
  email?: string;
  contact?: string;
  qualification?: string;
  subjects?: string[];
  dateOfBirth?: Date;
  dateOfJoining?: Date;
  address?: string;
  isActive?: boolean;
}

export interface TeacherAttendance {
  id: string;
  teacherId: string;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  checkInTime?: Date;
  checkOutTime?: Date;
  remarks?: string;
}

export interface AssignedSubject {
  id: string;
  teacherId: string;
  subject: string;
  class: string;
  section: string;
  academicYear: string;
}

export interface TimetableSlot {
  id: string;
  teacherId: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  period: number;
  subject: string;
  class: string;
  section: string;
  room?: string;
}