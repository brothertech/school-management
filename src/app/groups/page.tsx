"use client";

import React, { useState } from "react";
import { Group, CreateGroupData } from "@/types/group";
import { Message } from "@/types/announcement";
import { mockGroups } from "@/data/groupData";
import GroupsList from "@/components/groups/GroupsList";
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import ChatRoomModal from "@/components/groups/ChatRoomModal";
import { mockUsers } from "@/utils/userMapping";

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isChatRoomModalOpen, setIsChatRoomModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const handleCreateGroup = () => {
  //   setIsCreateModalOpen(true);
  // };

  const handleEditGroup = (group: Group) => {
    setIsCreateModalOpen(true);
    // setEditingGroup(group);
  };

 
  const handleCreateGroup = (groupData: CreateGroupData) => {
    const newGroup: Group = {
      ...groupData,
      id: Date.now().toString(),
      members: groupData.members || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      unreadCount: 0,
      isPinned: false
    };
    setGroups(prev => [...prev, newGroup]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm("Are you sure you want to delete this group?")) {
      setGroups(prev => prev.filter(group => group.id !== groupId));
    }
  };

  const handleOpenChatRoom = (group: Group) => {
    setSelectedGroup(group);
    setIsChatRoomModalOpen(true);
  };

  const handleCloseChatRoom = () => {
    setIsChatRoomModalOpen(false);
    setSelectedGroup(null);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedGroup) return;
    
    // TODO: Implement actual message sending logic
    console.log("Sending message to group", selectedGroup.id, ":", content);
    
    // For now, just simulate adding a message
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      sender: {
        id: "current-user-id", // This should come from auth context
        name: "Current User",
        avatar: ""
      },
      isRead: false,
      type: "text"
    };
    
    // Update the group's last message
    setGroups(prev => prev.map(group => 
      group.id === selectedGroup.id 
        ? { ...group, lastMessage: newMessage }
        : group
    ));
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Group Chats</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create Group
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <GroupsList
        groups={filteredGroups}
        onDeleteGroup={handleDeleteGroup}
        onEditGroup={handleEditGroup}
        onCreateGroup={() => setIsCreateModalOpen(true)}
        onOpenChatRoom={handleOpenChatRoom}
      />

      {isCreateModalOpen && (
        <CreateGroupModal
          users={mockUsers}
          onSubmit={handleCreateGroup}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      )}

      {isChatRoomModalOpen && selectedGroup && (
        <ChatRoomModal
          isOpen={isChatRoomModalOpen}
          onClose={handleCloseChatRoom}
          group={selectedGroup}
          messages={[]} // TODO: Load actual messages for this group
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}