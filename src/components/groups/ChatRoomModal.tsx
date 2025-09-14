"use client";

import React from "react";
import { Group } from "@/types/group";
import { Message } from "@/types/announcement";
import { Modal } from "@/components/ui/modal";
import ChatRoom from "./ChatRoom";

interface ChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export default function ChatRoomModal({
  isOpen,
  onClose,
  group,
  messages,
  onSendMessage
}: ChatRoomModalProps) {
  if (!group) return null;

  const handleOpenGroupInfo = () => {
    // TODO: Implement group info panel
    console.log("Open group info for:", group.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden"
      showCloseButton={true}
    >
      <div className="h-full">
        <ChatRoom
          group={group}
          messages={messages}
          onSendMessage={onSendMessage}
          onOpenGroupInfo={handleOpenGroupInfo}
        />
      </div>
    </Modal>
  );
}