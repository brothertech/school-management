export interface TimetableEntry {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  period: number;
  startTime: string;
  endTime: string;
  room?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTimetableEntryData {
  classId: string;
  subjectId: string;
  teacherId: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  period: number;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface UpdateTimetableEntryData {
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  day?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  period?: number;
  startTime?: string;
  endTime?: string;
  room?: string;
}

export interface TimetableWithDetails extends TimetableEntry {
  className: string;
  subjectName: string;
  teacherName: string;
}

export interface WeeklyTimetable {
  classId: string;
  className: string;
  timetable: TimetableWithDetails[];
}