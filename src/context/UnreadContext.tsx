"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UnreadContextType {
  groupsUnreadCount: number;
  setGroupsUnreadCount: (count: number) => void;
  incrementGroupsUnreadCount: () => void;
  decrementGroupsUnreadCount: () => void;
  resetGroupsUnreadCount: () => void;
}

const UnreadContext = createContext<UnreadContextType | undefined>(undefined);

export const useUnread = () => {
  const context = useContext(UnreadContext);
  if (context === undefined) {
    throw new Error('useUnread must be used within an UnreadProvider');
  }
  return context;
};

interface UnreadProviderProps {
  children: ReactNode;
}

export const UnreadProvider: React.FC<UnreadProviderProps> = ({ children }) => {
  const [groupsUnreadCount, setGroupsUnreadCount] = useState(0);

  const incrementGroupsUnreadCount = () => {
    setGroupsUnreadCount(prev => prev + 1);
  };

  const decrementGroupsUnreadCount = () => {
    setGroupsUnreadCount(prev => Math.max(0, prev - 1));
  };

  const resetGroupsUnreadCount = () => {
    setGroupsUnreadCount(0);
  };

  return (
    <UnreadContext.Provider
      value={{
        groupsUnreadCount,
        setGroupsUnreadCount,
        incrementGroupsUnreadCount,
        decrementGroupsUnreadCount,
        resetGroupsUnreadCount
      }}
    >
      {children}
    </UnreadContext.Provider>
  );
};