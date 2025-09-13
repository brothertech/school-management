'use client';

import { useState } from 'react';


  import Input from '@/components/form/input/InputField';
import Badge from '@/components/ui/badge/Badge';
import { Search, Send, MoreHorizontal } from 'lucide-react';
import { Message, Conversation } from '@/types/announcement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "@/components/ui/avatar/Avatar";
import Button from '@/components/ui/button/Button';

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: {
      id: '101',
      sender: { id: '2', name: 'Sarah Johnson' },
      content: 'Can we schedule a meeting tomorrow?',
      timestamp: new Date('2024-12-20T14:30:00'),
      isRead: false,
      type: 'text',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participants: ['1', '3'],
    lastMessage: {
      id: '102',
      sender: { id: '3', name: 'Mike Chen' },
      content: 'Thanks for the update!',
      timestamp: new Date('2024-12-19T10:15:00'),
      isRead: true,
      type: 'text',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participants: ['1', '4'],
    lastMessage: {
      id: '103',
      sender: { id: '4', name: 'Emily Davis' },
      content: 'I sent you the files',
      timestamp: new Date('2024-12-18T16:45:00'),
      isRead: true,
      type: 'text',
    },
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: { id: '1', name: 'You' },
    content: 'Hi Sarah, how are you doing?',
    timestamp: new Date('2024-12-20T14:00:00'),
    isRead: true,
    type: 'text',
  },
  {
    id: '2',
    sender: { id: '2', name: 'Sarah Johnson' },
    content: 'I\'m good, thanks! Working on the project report.',
    timestamp: new Date('2024-12-20T14:05:00'),
    isRead: true,
    type: 'text',
  },
  {
    id: '3',
    sender: { id: '2', name: 'Sarah Johnson' },
    content: 'Can we schedule a meeting tomorrow?',
    timestamp: new Date('2024-12-20T14:30:00'),
    isRead: false,
    type: 'text',
  },
];

export default function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.lastMessage?.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: { id: '1', name: 'You' },
        content: newMessage,
        timestamp: new Date(),
        isRead: true,
        type: 'text',
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  const currentConversation = mockConversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="flex h-[calc(100vh-200px)] gap-6">
      {/* Conversations List */}
      <Card className="w-80 flex-shrink-0">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              defaultValue={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted ${
                  selectedConversation === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}>
                {/* <Avatar src="">
                  <AvatarFallback>
                    {conversation.lastMessage?.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar> */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">
                      {conversation.lastMessage?.sender.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {conversation.lastMessage?.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage?.content}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge variant="solid" color="primary">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <Avatar>
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar> */}
            <div>
              <CardTitle>Sarah Johnson</CardTitle>
              <p className="text-sm text-muted-foreground">Last seen recently</p>
            </div>
          </div>
          <Button variant="primary" >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
          <div className="h-[400px] p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === '1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender.id === '1'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                defaultValue={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                // onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage(e)}
              />
              {/* <Button onClick={(e) => handleSendMessage(e)}>
                <Send className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}