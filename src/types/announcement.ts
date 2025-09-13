export interface Announcement {
  id: string;
  title: string;
  content: string;
  audience: 'all' | 'teachers' | 'students' | 'parents';
  createdAt: Date;
  createdBy: string;
  isRead?: boolean;
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  audience: 'all' | 'teachers' | 'students' | 'parents';
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}