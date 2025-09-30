"use client";
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { loginBegin, logout as logoutAction, clearError as clearErrorAction } from '@/store/authSlice';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  primary_role: string;
  module_visibility: {
    students: boolean;
    teachers: boolean;
    classes: boolean;
    subjects: boolean;
    exams: boolean;
    timetable: boolean;
    attendance: boolean;
    fees: boolean;
    library: boolean;
    transport: boolean;
    messaging: boolean;
    groups: boolean;
    announcements: boolean;
    parent_portal: boolean;
    student_portal: boolean;
    reports: boolean;
    cbt: boolean;
    recruitment: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await dispatch(loginBegin({ email, password, device_name: 'web' }));
      return loginBegin.fulfilled.match(result);
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await dispatch(logoutAction());
  };

  const clearError = () => {
    dispatch(clearErrorAction());
  };

  const checkAuthStatus = async (): Promise<void> => {
    // Redux Persist handles rehydration automatically
    // This function is kept for compatibility
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        error: authState.error,
        login,
        logout,
        clearError,
        checkAuthStatus,
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