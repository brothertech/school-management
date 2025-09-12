"use client";

import React, { useState, useEffect } from 'react';
import { User, CreateUserData, UpdateUserData } from '@/types/user';
import UsersList from './UsersList';
import CreateUserForm from './CreateUserForm';
import UserProfile from './UserProfile';
import { useAuth } from '@/context/AuthContext';

// Mock data for demonstration
const initialUsers: User[] = [
  {
    id: '1',
    firstName: 'School',
    lastName: 'Admin',
    email: 'admin@school.com',
    role: 'admin',
    contact: '+1234567890',
    avatar: '/images/user/admin.jpg',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Smith',
    email: 'teacher@school.com',
    role: 'teacher',
    contact: '+1234567891',
    avatar: '/images/user/teacher.jpg',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'student@school.com',
    role: 'student',
    contact: '+1234567892',
    avatar: '/images/user/student.jpg',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'parent@school.com',
    role: 'parent',
    contact: '+1234567893',
    avatar: '/images/user/parent.jpg',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useAuth();

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('admin_users');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        const usersWithDates = parsedUsers.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt)
        }));
        setUsers(usersWithDates);
      } catch (error) {
        console.error('Error loading users from localStorage:', error);
      }
    }
  }, []);

  // Save users to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem('admin_users', JSON.stringify(users));
  }, [users]);

  const handleCreateUser = async (userData: CreateUserData) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: (users.length + 1).toString(),
      avatar: `/images/user/${userData.role}.jpg`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setUsers(prev => [...prev, newUser]);
    setShowCreateForm(false);
    setIsLoading(false);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    // For now, we'll just show the profile and edit from there
    setShowUserProfile(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUsers(prev => prev.filter(user => user.id !== userId));
    setIsLoading(false);
  };

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleCloseProfile = () => {
    setShowUserProfile(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all users in the system - create, edit, and delete user accounts.
        </p>
      </div>

      <UsersList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onCreate={() => setShowCreateForm(true)}
        onViewProfile={handleViewProfile}
      />

      {showCreateForm && (
        <CreateUserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowCreateForm(false)}
          isLoading={isLoading}
        />
      )}

      {showUserProfile && selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={handleCloseProfile}
          onEdit={handleEditUser}
        />
      )}
    </div>
  );
}