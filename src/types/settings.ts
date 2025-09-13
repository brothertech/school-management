export interface AcademicSession {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  status: 'active' | 'completed' | 'upcoming';
  terms: Term[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAcademicSessionData {
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrent?: boolean;
}

export interface UpdateAcademicSessionData {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  isCurrent?: boolean;
  status?: 'active' | 'completed' | 'upcoming';
}

export interface Term {
  id: string;
  name: string;
  academicSessionId: string;
  startDate: Date;
  endDate: Date;
  order: number;
  isCurrent: boolean;
  status: 'active' | 'completed' | 'upcoming';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTermData {
  name: string;
  academicSessionId: string;
  startDate: Date;
  endDate: Date;
  order: number;
  isCurrent?: boolean;
}

export interface UpdateTermData {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  order?: number;
  isCurrent?: boolean;
  status?: 'active' | 'completed' | 'upcoming';
}

export interface GradeScale {
  id: string;
  name: string;
  description?: string;
  minPercentage: number;
  maxPercentage: number;
  grade: string;
  gradePoint: number;
  remarks?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGradeScaleData {
  name: string;
  description?: string;
  minPercentage: number;
  maxPercentage: number;
  grade: string;
  gradePoint: number;
  remarks?: string;
  isActive: boolean;
}

export interface UpdateGradeScaleData {
  name?: string;
  description?: string;
  minPercentage?: number;
  maxPercentage?: number;
  grade?: string;
  gradePoint?: number;
  remarks?: string;
  isActive?: boolean;
}

export interface SchoolProfile {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  website?: string;
  establishedYear?: number;
  principalName?: string;
  motto?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSchoolProfileData {
  name: string;
  shortName?: string;
  logo?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  website?: string;
  establishedYear?: number;
  principalName?: string;
  motto?: string;
  isActive: boolean;
}

export interface UpdateSchoolProfileData {
  name?: string;
  shortName?: string;
  logo?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  establishedYear?: number;
  principalName?: string;
  motto?: string;
  isActive?: boolean;
}

export interface SystemSettings {
  academicSessions: AcademicSession[];
  currentAcademicSession?: AcademicSession;
  currentTerm?: Term;
  gradeScales: GradeScale[];
  schoolProfile: SchoolProfile;
}

export interface SettingsModuleData {
  academicSessions: AcademicSession[];
  terms: Term[];
  gradeScales: GradeScale[];
  schoolProfile: SchoolProfile;
  currentAcademicSession?: AcademicSession;
  currentTerm?: Term;
}