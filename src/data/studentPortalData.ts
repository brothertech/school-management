import { StudentPortalData, Student, TimetableEntry, UpcomingExam, StudentNotification, StudentAttendanceSummary } from "@/types/student";

// Mock student data
export const mockStudent: Student = {
  id: "stu001",
  firstName: "Emma",
  lastName: "Johnson",
  dateOfBirth: new Date("2008-05-15"),
  gender: "female",
  currentClass: "8",
  currentSection: "A",
  rollNumber: 12,
  admissionNumber: "ADM2023001",
  admissionDate: new Date("2023-04-01"),
  guardian: {
    name: "Sarah Johnson",
    relationship: "Mother",
    contact: "+1-555-0123",
    email: "sarah.j@email.com",
    occupation: "Teacher"
  },
  contact: "+1-555-0124",
  email: "emma.johnson@school.edu",
  address: "123 Maple Street, Springfield, IL 62704",
  avatar: "/images/user/user-12.jpg",
  academicHistory: [
    {
      year: "2023-2024",
      class: "8",
      section: "A",
      rollNumber: 12,
      grade: "A",
      remarks: "Excellent performance"
    },
    {
      year: "2022-2023",
      class: "7",
      section: "B",
      rollNumber: 8,
      grade: "A-",
      remarks: "Very good academic progress"
    }
  ],
  createdAt: new Date("2023-04-01"),
  updatedAt: new Date()
};

// Mock timetable data
export const mockTimetable: TimetableEntry[] = [
  {
    id: "tt001",
    day: "Monday",
    period: 1,
    startTime: "08:00",
    endTime: "08:45",
    subject: "Mathematics",
    teacher: "Dr. Robert Brown",
    room: "Room 101"
  },
  {
    id: "tt002",
    day: "Monday",
    period: 2,
    startTime: "08:45",
    endTime: "09:30",
    subject: "Science",
    teacher: "Ms. Lisa Wilson",
    room: "Lab 201"
  },
  {
    id: "tt003",
    day: "Monday",
    period: 3,
    startTime: "09:30",
    endTime: "10:15",
    subject: "English",
    teacher: "Mr. James Miller",
    room: "Room 102"
  },
  {
    id: "tt004",
    day: "Monday",
    period: 4,
    startTime: "10:15",
    endTime: "11:00",
    subject: "Social Studies",
    teacher: "Mrs. Patricia Davis",
    room: "Room 103"
  },
  {
    id: "tt005",
    day: "Monday",
    period: 5,
    startTime: "11:00",
    endTime: "11:45",
    subject: "Physical Education",
    teacher: "Coach Johnson",
    room: "Gymnasium"
  },
  {
    id: "tt006",
    day: "Monday",
    period: 6,
    startTime: "11:45",
    endTime: "12:30",
    subject: "Art",
    teacher: "Ms. Emily Clark",
    room: "Art Room"
  }
];

// Mock upcoming exams
export const mockUpcomingExams: UpcomingExam[] = [
  {
    id: "exam001",
    subject: "Mathematics",
    date: new Date("2024-02-15"),
    time: "09:00",
    duration: "2 hours",
    room: "Hall A",
    syllabus: "Chapters 1-5: Algebra and Geometry",
    importance: "high"
  },
  {
    id: "exam002",
    subject: "Science",
    date: new Date("2024-02-17"),
    time: "09:00",
    duration: "1.5 hours",
    room: "Lab 201",
    syllabus: "Physics: Motion and Forces",
    importance: "high"
  },
  {
    id: "exam003",
    subject: "English",
    date: new Date("2024-02-20"),
    time: "10:30",
    duration: "2 hours",
    room: "Room 102",
    syllabus: "Literature: Poetry Analysis",
    importance: "medium"
  }
];

// Mock attendance summary
export const mockAttendanceSummary: StudentAttendanceSummary = {
  totalDays: 120,
  presentDays: 115,
  absentDays: 3,
  lateDays: 2,
  attendanceRate: 95.8,
  monthlyBreakdown: [
    { month: "January", year: 2024, presentDays: 22, totalDays: 22, rate: 100 },
    { month: "December", year: 2023, presentDays: 18, totalDays: 20, rate: 90 },
    { month: "November", year: 2023, presentDays: 21, totalDays: 22, rate: 95.5 },
    { month: "October", year: 2023, presentDays: 20, totalDays: 22, rate: 90.9 },
    { month: "September", year: 2023, presentDays: 19, totalDays: 20, rate: 95 }
  ],
  subjectWiseAttendance: [
    { subject: "Mathematics", totalClasses: 45, attendedClasses: 44, attendanceRate: 97.8 },
    { subject: "Science", totalClasses: 40, attendedClasses: 39, attendanceRate: 97.5 },
    { subject: "English", totalClasses: 42, attendedClasses: 41, attendanceRate: 97.6 },
    { subject: "Social Studies", totalClasses: 38, attendedClasses: 37, attendanceRate: 97.4 },
    { subject: "Physical Education", totalClasses: 35, attendedClasses: 34, attendanceRate: 97.1 }
  ]
};

// Mock notifications
export const mockStudentNotifications: StudentNotification[] = [
  {
    id: "notif001",
    title: "Mathematics Exam Schedule",
    message: "The Mathematics mid-term exam has been scheduled for February 15th, 2024.",
    type: "exam",
    date: new Date("2024-02-01"),
    read: false,
    important: true,
    actionUrl: "/student-portal/exams"
  },
  {
    id: "notif002",
    title: "Science Project Submission",
    message: "Reminder: Science project submissions are due by February 20th.",
    type: "general",
    date: new Date("2024-02-05"),
    read: false,
    important: false
  },
  {
    id: "notif003",
    title: "Timetable Update",
    message: "The class timetable has been updated for the new semester.",
    type: "timetable",
    date: new Date("2024-01-28"),
    read: true,
    important: false,
    actionUrl: "/student-portal/timetable"
  },
  {
    id: "notif004",
    title: "School Holiday",
    message: "School will be closed on February 19th for President's Day.",
    type: "announcement",
    date: new Date("2024-01-25"),
    read: true,
    important: true
  },
  {
    id: "notif005",
    title: "Library Book Due",
    message: "Your library book 'Introduction to Algebra' is due tomorrow.",
    type: "general",
    date: new Date("2024-02-06"),
    read: false,
    important: false
  }
];

// Complete student portal data
export const mockStudentPortalData: StudentPortalData = {
  student: mockStudent,
  timetable: mockTimetable,
  upcomingExams: mockUpcomingExams,
  examResults: [], // Will be populated in results view
  attendanceSummary: mockAttendanceSummary,
  notifications: mockStudentNotifications
};