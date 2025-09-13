'use client';

import { useState } from 'react';
import { Bell, Check, MessageSquare, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Announcement, Message } from '@/types/announcement';

interface Notification {
  id: string;
  type: 'message' | 'announcement' | 'system';
  title: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sarah',
    content: 'Can we schedule a meeting tomorrow?',
    timestamp: new Date('2024-12-20T14:30:00'),
    isRead: false,
    link: '/messaging',
  },
  {
    id: '2',
    type: 'announcement',
    title: 'New announcement',
    content: 'School Holiday Notice has been posted',
    timestamp: new Date('2024-12-20T10:00:00'),
    isRead: false,
    link: '/announcements',
  },
  {
    id: '3',
    type: 'system',
    title: 'System update',
    content: 'New features available in the dashboard',
    timestamp: new Date('2024-12-19T16:45:00'),
    isRead: true,
  },
  {
    id: '4',
    type: 'message',
    title: 'Mike replied to your message',
    content: 'Thanks for the information!',
    timestamp: new Date('2024-12-19T14:20:00'),
    isRead: true,
    link: '/messaging',
  },
];

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'announcement':
        return <Megaphone className="h-4 w-4 text-orange-500" />;
      case 'system':
        return <Bell className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="solid"
              color="danger"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-6 text-xs"
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-60">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 p-3 cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${notification.isRead ? '' : 'text-foreground'}`}>
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleDateString()} at{' '}
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}