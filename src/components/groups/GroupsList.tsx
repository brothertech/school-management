"use client";

import React from "react";
import { Group } from "@/types/group";
import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@/components/ui/avatar/Avatar";
import Badge from "@/components/ui/badge/Badge";

interface GroupsListProps {
  groups: Group[];
  onDeleteGroup: (groupId: string) => void;
  onCreateGroup: () => void;
  onEditGroup: (group: Group) => void;
  onOpenChatRoom: (group: Group) => void;
}

export default function GroupsList({ groups, onDeleteGroup, onCreateGroup, onEditGroup, onOpenChatRoom }: GroupsListProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No groups found</div>
        <button
          onClick={onCreateGroup}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create your first group
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {groups.map((group) => (
        <Card 
          key={group.id} 
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onOpenChatRoom(group)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar 
                src={group.avatar || "/images/default-avatar.png"} 
                alt={group.name}
                size="large"
                className="h-12 w-12"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 truncate">{group.name}</h3>
                    {group.isPinned && (
                      <span className="text-yellow-500">📌</span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditGroup(group);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteGroup(group.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {group.lastMessage && (
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {group.lastMessage.type === "image" ? "📷 Image" :
                     group.lastMessage.type === "emoji" ? "😊 Emoji" :
                     group.lastMessage.content}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {group.members.length} members • {group.admins?.length || 0} admins • Created {formatTime(group.createdAt)}
                  </span>
                  
                  {group.unreadCount > 0 && (
                    <Badge >
                      {group.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              
              {group.lastMessage && (
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    {formatTime(group.lastMessage.timestamp)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}