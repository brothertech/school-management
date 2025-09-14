"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Group } from "@/types/group";
import { Message } from "@/types/announcement";
import { useAuth } from "@/context/AuthContext";
import { useUnread } from "@/context/UnreadContext";
import { getUsersByIds } from "@/utils/userMapping";
import Button from "@/components/ui/button/Button";

interface ChatRoomProps {
  group: Group;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onOpenGroupInfo: () => void;
  typingUsers?: string[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  group,
  messages,
  onSendMessage,
  onOpenGroupInfo,
  typingUsers = [],
}) => {
  const { user: currentUser } = useAuth();
  const { decrementGroupsUnreadCount } = useUnread();
  const [newMessage, setNewMessage] = useState("");
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState<any[]>([]);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [readMessages, setReadMessages] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Mark messages as read when they become visible
  const markMessageAsRead = useCallback((messageId: string) => {
    if (!readMessages.has(messageId)) {
      setReadMessages(prev => {
        const newSet = new Set(prev);
        newSet.add(messageId);
        return newSet;
      });
      decrementGroupsUnreadCount();
    }
  }, [readMessages, decrementGroupsUnreadCount]);

  // Mark all unread messages as read when component mounts or messages change
  useEffect(() => {
    const unreadMessages = messages.filter(
      message => !message.isRead && message.sender.id !== currentUser?.id
    );
    
    unreadMessages.forEach(message => {
      markMessageAsRead(message.id);
    });
  }, [messages, currentUser?.id, markMessageAsRead]);

  // Handle scroll to bottom for new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      let finalMessage = newMessage.trim();
      
      // Add reply context if replying to a message
      if (replyingTo) {
        finalMessage = `Replying to @${replyingTo.sender.name}: ${finalMessage}`;
      }
      
      onSendMessage(finalMessage);
      setNewMessage("");
      setReplyingTo(null);
      setShowMentionSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    // Check for @ mentions
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && (atIndex === 0 || value[atIndex - 1] === ' ')) {
      const query = value.substring(atIndex + 1).split(' ')[0];
      
      if (query.length > 0) {
        // Get actual user objects from member IDs
        const groupMembers = getUsersByIds(group.members);
        const filteredMembers = groupMembers.filter(member =>
          member.firstName.toLowerCase().includes(query.toLowerCase()) ||
          member.lastName.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredMembers.length > 0) {
          setMentionSuggestions(filteredMembers);
          setShowMentionSuggestions(true);
          
          // Calculate position for suggestions dropdown
          if (textareaRef.current) {
            const textarea = textareaRef.current;
            const cursorPos = textarea.selectionStart;
            const textBeforeCursor = value.substring(0, cursorPos);
            const lines = textBeforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            const atPos = currentLine.lastIndexOf('@');
            
            if (atPos !== -1) {
              const tempDiv = document.createElement('div');
              tempDiv.style.position = 'absolute';
              tempDiv.style.whiteSpace = 'pre';
              tempDiv.style.font = window.getComputedStyle(textarea).font;
              tempDiv.textContent = currentLine.substring(0, atPos);
              document.body.appendChild(tempDiv);
              
              const leftPos = tempDiv.offsetWidth;
              document.body.removeChild(tempDiv);
              
              setMentionPosition({
                top: textarea.offsetTop + (lines.length * parseInt(window.getComputedStyle(textarea).lineHeight || '20')) - textarea.scrollTop,
                left: textarea.offsetLeft + leftPos
              });
            }
          }
        } else {
          setShowMentionSuggestions(false);
        }
      } else {
        setShowMentionSuggestions(false);
      }
    } else {
      setShowMentionSuggestions(false);
    }
  };

  const handleMentionSelect = (member: any) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const value = textarea.value;
      const cursorPos = textarea.selectionStart;
      const atIndex = value.lastIndexOf('@', cursorPos - 1);
      
      if (atIndex !== -1) {
        const beforeAt = value.substring(0, atIndex);
        const afterCursor = value.substring(cursorPos);
        const memberName = `${member.firstName} ${member.lastName}`;
        const newValue = beforeAt + '@' + memberName + ' ' + afterCursor;
        
        setNewMessage(newValue);
        setShowMentionSuggestions(false);
        
        // Set cursor position after the mention
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(beforeAt.length + memberName.length + 2, beforeAt.length + memberName.length + 2);
        }, 0);
      }
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    textareaRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };



  const groupMessagesByDate = () => {
    const grouped: { [key: string]: Message[] } = {};
    
    messages.forEach((message) => {
      const dateKey = formatDate(message.timestamp);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    
    return grouped;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={group.avatar || "/images/default-avatar.png"}
              alt={group.name}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/default-avatar.png";
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {group.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {group.members.length} members
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenGroupInfo}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            {/* Date Separator */}
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 rounded-full">
                {date}
              </span>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((message) => {
              const isOwnMessage = message.sender.id === currentUser?.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-xs lg:max-w-md ${
                      isOwnMessage ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar (only for others) */}
                    {!isOwnMessage && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={message.sender.avatar || "/images/default-avatar.png"}
                            alt={message.sender.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Message Content */}
                    <div
                      className={`flex flex-col ${
                        isOwnMessage ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Sender Name (only for others) */}
                      {!isOwnMessage && (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {message.sender.name}
                        </span>
                      )}

                      {/* Message Bubble with context menu */}
                      <div className="group relative">
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwnMessage
                              ? "bg-brand-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>

                        {/* Message actions (appear on hover) */}
                        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReply(message)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      {/* Timestamp and status */}
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`text-xs text-gray-400 ${
                            isOwnMessage ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                        {isOwnMessage && (
                          <span className="text-xs text-gray-400">
                            {readMessages.has(message.id) || message.isRead ? "✓✓" : "✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {typingUsers.length === 1
                  ? `${typingUsers[0]} is typing...`
                  : `${typingUsers.length} people are typing...`}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        {/* Reply Indicator */}
        {replyingTo && (
          <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Replying to {replyingTo.sender.name}
              </span>
              <span className="text-xs text-gray-400 truncate max-w-xs">
                {replyingTo.content.length > 50 ? replyingTo.content.substring(0, 50) + '...' : replyingTo.content}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={cancelReply}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {/* Attachment Buttons */}
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-4 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>

        {/* Mention Suggestions */}
        {showMentionSuggestions && (
          <div
            className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            style={{
              top: `${mentionPosition.top}px`,
              left: `${mentionPosition.left}px`,
              minWidth: '200px'
            }}
          >
            {mentionSuggestions.map((member) => (
              <div
                key={member.id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center space-x-3"
                onClick={() => handleMentionSelect(member)}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={member.avatar || "/images/default-avatar.png"}
                    alt={`${member.firstName} ${member.lastName}`}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-gray-800 dark:text-white">
                  {member.firstName} {member.lastName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Utility functions for date formatting
const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const inputDate = new Date(date);
  
  if (inputDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (inputDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (inputDate.getFullYear() === today.getFullYear()) {
    return inputDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  } else {
    return inputDate.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  }
};

const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export default ChatRoom;