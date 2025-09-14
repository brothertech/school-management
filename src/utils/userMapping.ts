import { User } from '@/types/user';

// User data that matches the mockUsers from AuthContext
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@school.com',
    firstName: 'School',
    lastName: 'Admin',
    role: 'admin',
    avatar: '/images/user/admin.jpg',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'teacher@school.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'teacher',
    avatar: '/images/user/teacher.jpg',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '3',
    email: 'student@school.com',
    firstName: 'Emma',
    lastName: 'Johnson',
    role: 'student',
    avatar: '/images/user/student.jpg',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '4',
    email: 'parent@school.com',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'parent',
    avatar: '/images/user/parent.jpg',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  }
];

// User ID mapping from group data to auth context users
const userIdMapping: Record<string, string> = {
  'teacher-001': '1',
  'teacher-002': '2', 
  'teacher-003': '3',
  'teacher-004': '4',
  'teacher-005': '5',
  'student-001': '6',
  'student-002': '7',
  'student-003': '8',
  'student-004': '9',
  'student-005': '10',
  'student-006': '11',
  'student-007': '12',
  'student-008': '13',
  'student-009': '14',
  'student-010': '15',
  'student-011': '16',
  'student-012': '17',
  'student-013': '18',
  'student-014': '19',
  'student-015': '20',
  'student-016': '21',
  'student-017': '22',
};

export const getUserById = (userId: string): User | undefined => {
  const mappedId = userIdMapping[userId];
  if (!mappedId) return undefined;
  
  return mockUsers.find(user => user.id === mappedId);
};

export const getUsersByIds = (userIds: string[]): User[] => {
  return userIds
    .map(userId => getUserById(userId))
    .filter((user: User | undefined): user is User => user !== undefined);
};