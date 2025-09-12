"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@school.com',
    password: 'admin123',
    firstName: 'School',
    lastName: 'Admin',
    role: 'admin',
    avatar: '/images/user/admin.jpg'
  },
  {
    id: '2',
    email: 'teacher@school.com',
    password: 'teacher123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'teacher',
    avatar: '/images/user/teacher.jpg'
  },
  {
    id: '3',
    email: 'student@school.com',
    password: 'student123',
    firstName: 'Emma',
    lastName: 'Johnson',
    role: 'student',
    avatar: '/images/user/student.jpg'
  },
  {
    id: '4',
    email: 'parent@school.com',
    password: 'parent123',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'parent',
    avatar: '/images/user/parent.jpg'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      const authUser = userWithoutPassword;
      
      localStorage.setItem('user', JSON.stringify(authUser));
      setAuthState({
        user: authUser,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      return false;
    }
    
    const newUser = {
      ...userData,
      id: (mockUsers.length + 1).toString()
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    const authUser = userWithoutPassword;
    
    localStorage.setItem('user', JSON.stringify(authUser));
    setAuthState({
      user: authUser,
      isAuthenticated: true,
      isLoading: false
    });
    
    return true;
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};