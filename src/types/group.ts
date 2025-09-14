export interface Group {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  members: string[];
  admins: string[];
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: {
    id: string;
    content: string;
    sender: {
      id: string;
      name: string;
      avatar?: string;
    };
    timestamp: Date;
    type: 'text' | 'image' | 'emoji' | 'file';
  };
  unreadCount: number;
  isPinned?: boolean;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'emoji' | 'file';
  isRead: boolean;
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

export interface CreateGroupData {
  name: string;
  description?: string;
  avatar?: string;
  members: string[];
  admins: string[];
}

export interface UpdateGroupData {
  name?: string;
  description?: string;
  avatar?: string;
  members?: string[];
  admins?: string[];
}