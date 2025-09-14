"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import { Group } from "@/types/group";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Switch from "@/components/form/switch/Switch";

interface GroupInfoPanelProps {
  group: Group;
  users: User[]; // All users for member resolution
  currentUser: User;
  onUpdateGroup: (data: Partial<Group>) => void;
  onLeaveGroup: () => void;
  onDeleteGroup: () => void;
  onClose: () => void;
}

const GroupInfoPanel: React.FC<GroupInfoPanelProps> = ({
  group,
  users,
  currentUser,
  onUpdateGroup,
  onLeaveGroup,
  onDeleteGroup,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messagePermissions, setMessagePermissions] = useState<"everyone" | "admins">("everyone");
  const [isMuted, setIsMuted] = useState(false);

  // Resolve member objects from IDs
  const members = useMemo(() => {
    return group.members
      .map(memberId => users.find(user => user.id === memberId))
      .filter(Boolean) as User[];
  }, [group.members, users]);

  // Resolve admin objects from IDs
  const admins = useMemo(() => {
    return group.admins
      .map(adminId => users.find(user => user.id === adminId))
      .filter(Boolean) as User[];
  }, [group.admins, users]);

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    return members.filter(member =>
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  const isCurrentUserAdmin = group.admins.includes(currentUser.id);
  const isCurrentUserOwner = group.admins[0] === currentUser.id; // First admin is owner

  const handlePromoteToAdmin = (userId: string) => {
    if (!group.admins.includes(userId)) {
      onUpdateGroup({
        admins: [...group.admins, userId]
      });
    }
  };

  const handleDemoteFromAdmin = (userId: string) => {
    if (userId !== group.admins[0]) { // Cannot demote owner
      onUpdateGroup({
        admins: group.admins.filter(id => id !== userId)
      });
    }
  };

  const handleRemoveMember = (userId: string) => {
    onUpdateGroup({
      members: group.members.filter(id => id !== userId),
      admins: group.admins.filter(id => id !== userId)
    });
  };

  const handleMessagePermissionsChange = (enabled: boolean) => {
    setMessagePermissions(enabled ? "everyone" : "admins");
    // In a real app, you would save this to the group settings
  };

  const handleMuteToggle = (enabled: boolean) => {
    setIsMuted(enabled);
    // In a real app, you would save this to user preferences
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Group Info
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Group Details */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
              <Image
                src={group.avatar || "/images/default-group-avatar.png"}
                alt={group.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/default-group-avatar.png";
                }}
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {group.name}
            </h3>
            {group.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {group.description}
              </p>
            )}
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              {members.length} members • {admins.length} admins
            </p>
          </div>
        </div>

        {/* Group Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Group Settings</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Who can send messages?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {messagePermissions === "everyone" ? "Everyone" : "Admins only"}
              </p>
            </div>
            <Switch
              label=""
              defaultChecked={messagePermissions === "everyone"}
              onChange={(checked) => handleMessagePermissionsChange(checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mute notifications
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isMuted ? "Muted" : "Active"}
              </p>
            </div>
            <Switch
              label=""
              defaultChecked={isMuted}
              onChange={(checked) => handleMuteToggle(checked)}
            />
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              Members ({members.length})
            </h4>
            {isCurrentUserAdmin && (
              <Button
                variant="primary"
                size="sm"
                className="text-xs text-brand-500 hover:text-brand-600"
              >
                Add Member
              </Button>
            )}
          </div>

          {/* Search */}
          <Input
            placeholder="Search members..."
            defaultValue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            // size="sm"
          />

          {/* Members */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredMembers.map((member) => {
              const isAdmin = group.admins.includes(member.id);
              const isOwner = group.admins[0] === member.id;
              const canManage = isCurrentUserAdmin && member.id !== currentUser.id;

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={member.avatar || "/images/default-avatar.png"}
                        alt={`${member.firstName} ${member.lastName}`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isOwner ? "Owner" : isAdmin ? "Admin" : "Member"}
                      </p>
                    </div>
                  </div>

                  {canManage && (
                    <div className="flex space-x-1">
                      {!isAdmin ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePromoteToAdmin(member.id)}
                          className="h-6 w-6 p-0 text-green-500 hover:text-green-600"
                          // title="Promote to admin"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDemoteFromAdmin(member.id)}
                          className="h-6 w-6 p-0 text-yellow-500 hover:text-yellow-600"
                          // title="Demote from admin"
                          disabled={isOwner}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                        // title="Remove member"
                        disabled={isOwner}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            className="w-full text-red-500 hover:text-red-600 hover:border-red-300"
            onClick={onLeaveGroup}
          >
            Leave Group
          </Button>

          {isCurrentUserOwner && (
            <Button
              variant="primary"
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={onDeleteGroup}
            >
              Delete Group
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupInfoPanel;