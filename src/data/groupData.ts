import { Group, GroupMessage } from '@/types/group';

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Mathematics Study Group',
    description: 'Group for discussing math problems and homework',
    avatar: '/images/group/math-group.png',
    members: ['teacher-001', 'student-001', 'student-002', 'student-003'],
    admins: ['teacher-001'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
    lastMessage: {
      id: 'msg-15',
      content: 'Don\'t forget the algebra homework is due tomorrow!',
      sender: {
        id: 'teacher-001',
        name: 'Dr. Robert Brown',
        avatar: '/images/user/user-01.jpg'
      },
      timestamp: new Date('2024-02-10T16:30:00'),
      type: 'text'
    },
    unreadCount: 3,
    isPinned: true
  },
  {
    id: 'group-2',
    name: 'Science Club',
    description: 'Science experiments and project discussions',
    avatar: '/images/group/science-club.png',
    members: ['teacher-002', 'student-004', 'student-005', 'student-006', 'student-007'],
    admins: ['teacher-002', 'student-004'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-10'),
    lastMessage: {
      id: 'msg-22',
      content: '🚀',
      sender: {
        id: 'student-005',
        name: 'Michael Brown',
        avatar: '/images/user/user-05.jpg'
      },
      timestamp: new Date('2024-02-10T15:45:00'),
      type: 'emoji'
    },
    unreadCount: 0,
    isPinned: false
  },
  {
    id: 'group-3',
    name: 'English Literature',
    description: 'Book discussions and essay writing tips',
    avatar: '/images/group/english-group.png',
    members: ['teacher-003', 'student-008', 'student-009', 'student-010'],
    admins: ['teacher-003'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-09'),
    lastMessage: {
      id: 'msg-18',
      content: 'I just uploaded the essay guidelines document',
      sender: {
        id: 'teacher-003',
        name: 'Mr. James Miller',
        avatar: '/images/user/user-03.jpg'
      },
      timestamp: new Date('2024-02-09T14:20:00'),
      type: 'text'
    },
    unreadCount: 1,
    isPinned: false
  },
  {
    id: 'group-4',
    name: 'Sports Team',
    description: 'Practice schedules and game updates',
    avatar: '/images/group/sports-team.png',
    members: ['teacher-004', 'student-011', 'student-012', 'student-013', 'student-014'],
    admins: ['teacher-004', 'student-011'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
    lastMessage: {
      id: 'msg-25',
      content: 'Practice canceled today due to rain ☔',
      sender: {
        id: 'teacher-004',
        name: 'Coach Johnson',
        avatar: '/images/user/user-04.jpg'
      },
      timestamp: new Date('2024-02-10T13:15:00'),
      type: 'text'
    },
    unreadCount: 0,
    isPinned: true
  },
  {
    id: 'group-5',
    name: 'Art & Design',
    description: 'Creative projects and art techniques',
    avatar: '/images/group/art-group.png',
    members: ['teacher-005', 'student-015', 'student-016', 'student-017'],
    admins: ['teacher-005', 'student-015'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-10'),
    lastMessage: {
      id: 'msg-30',
      content: 'Check out this amazing painting I finished!',
      sender: {
        id: 'student-015',
        name: 'Emily Davis',
        avatar: '/images/user/user-15.jpg'
      },
      timestamp: new Date('2024-02-10T11:30:00'),
      type: 'image'
    },
    unreadCount: 5,
    isPinned: false
  }
];

export const mockGroupMessages: GroupMessage[] = [
  // Group 1 messages
  {
    id: 'msg-15',
    groupId: 'group-1',
    sender: {
      id: 'teacher-001',
      name: 'Dr. Robert Brown',
      avatar: '/images/user/user-01.jpg'
    },
    content: 'Don\'t forget the algebra homework is due tomorrow!',
    timestamp: new Date('2024-02-10T16:30:00'),
    type: 'text',
    isRead: false
  },
  {
    id: 'msg-14',
    groupId: 'group-1',
    sender: {
      id: 'student-001',
      name: 'John Smith',
      avatar: '/images/user/user-01.jpg'
    },
    content: 'I need help with question 5 on page 42',
    timestamp: new Date('2024-02-10T15:45:00'),
    type: 'text',
    isRead: true
  },
  // Group 2 messages
  {
    id: 'msg-22',
    groupId: 'group-2',
    sender: {
      id: 'student-005',
      name: 'Michael Brown',
      avatar: '/images/user/user-05.jpg'
    },
    content: '🚀',
    timestamp: new Date('2024-02-10T15:45:00'),
    type: 'emoji',
    isRead: true
  },
  // Group 3 messages
  {
    id: 'msg-18',
    groupId: 'group-3',
    sender: {
      id: 'teacher-003',
      name: 'Mr. James Miller',
      avatar: '/images/user/user-03.jpg'
    },
    content: 'I just uploaded the essay guidelines document',
    timestamp: new Date('2024-02-09T14:20:00'),
    type: 'text',
    isRead: false
  },
  // Group 4 messages
  {
    id: 'msg-25',
    groupId: 'group-4',
    sender: {
      id: 'teacher-004',
      name: 'Coach Johnson',
      avatar: '/images/user/user-04.jpg'
    },
    content: 'Practice canceled today due to rain ☔',
    timestamp: new Date('2024-02-10T13:15:00'),
    type: 'text',
    isRead: true
  },
  // Group 5 messages
  {
    id: 'msg-30',
    groupId: 'group-5',
    sender: {
      id: 'student-015',
      name: 'Emily Davis',
      avatar: '/images/user/user-15.jpg'
    },
    content: 'Check out this amazing painting I finished!',
    timestamp: new Date('2024-02-10T11:30:00'),
    type: 'image',
    isRead: false
  }
];