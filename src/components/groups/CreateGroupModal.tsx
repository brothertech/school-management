"use client";

import React, { useState, useEffect } from "react";
import { CreateGroupData } from "@/types/group";
import { User } from "@/context/AuthContext";
import { Modal } from "@/components/ui/modal";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import UserSelection from "./UserSelection";
import AvatarUpload from "./AvatarUpload";

interface CreateGroupModalProps {
  onSubmit: (data: CreateGroupData) => void;
  onCancel: () => void;
  users: User[];
}

export default function CreateGroupModal({ onSubmit, onCancel, users }: CreateGroupModalProps) {
  const [formData, setFormData] = useState<CreateGroupData>({
    name: "",
    description: "",
    avatar: "",
    members: [],
    admins: []
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [availableAdmins, setAvailableAdmins] = useState<string[]>([]);

  // Update available admins when members change
  useEffect(() => {
    setAvailableAdmins(formData.members);
    // Remove admins that are no longer members
    setFormData(prev => ({
      ...prev,
      admins: prev.admins.filter(adminId => formData.members.includes(adminId))
    }));
  }, [formData.members]);

  const handleSubmit = () => {
    if (formData.name.trim() && formData.members.length > 0) {
      let finalAvatarUrl = formData.avatar;
      
      // In a real application, you would upload the avatar file here
      if (avatarFile) {
        // Simulate file upload - in a real app, you would:
        // 1. Upload the file to your server/storage
        // 2. Get the permanent URL
        // 3. Use that URL for the group avatar
        console.log("Uploading avatar file:", avatarFile.name);
        // For now, we'll keep the object URL as a placeholder
      }
      
      onSubmit(formData);
      setFormData({ name: "", description: "", avatar: "", members: [], admins: [] });
    }
  };

  const handleInputChange = (field: keyof CreateGroupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file);
    // Generate a preview URL for immediate display
    const objectUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatar: objectUrl }));
  };

  const handleMembersChange = (selectedUserIds: string[]) => {
    setFormData(prev => ({ ...prev, members: selectedUserIds }));
  };

  const handleAdminsChange = (selectedUserIds: string[]) => {
    setFormData(prev => ({ ...prev, admins: selectedUserIds }));
  };

  return (
    <Modal isOpen={true} onClose={onCancel} className="max-w-md mx-4">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Group Name *
            </label>
            <InputField
              id="name"
              type="text"
              defaultValue={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter group name"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <TextArea
              value={formData.description}
              onChange={(value) => handleInputChange("description", value)}
              placeholder="Enter group description (optional)"
              rows={3}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Avatar
            </label>
            <AvatarUpload
              currentAvatar={formData.avatar}
              onAvatarChange={handleAvatarChange}
              className="w-full"
            />
          </div>

          {/* Member Selection */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <UserSelection
              label="Select Members"
              users={users}
              selectedUserIds={formData.members}
              onChange={handleMembersChange}
              roleFilter={['teacher', 'student', 'parent']}
              showRoleBadge={true}
            />
          </div>

          {/* Admin Selection - Only show if members are selected */}
          {formData.members.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <UserSelection
                label="Select Admins (from selected members)"
                users={users.filter(user => formData.members.includes(user.id))}
                selectedUserIds={formData.admins}
                onChange={handleAdminsChange}
                roleFilter={['teacher', 'student', 'parent']}
                showRoleBadge={true}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Admins will have additional permissions to manage the group
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              // type="button"
              variant="outline"
              onClick={onCancel}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              // type="submit"
              className="px-4 bg-blue-600 hover:bg-blue-700"
              disabled={!formData.name.trim() || formData.members.length === 0}
            >
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}