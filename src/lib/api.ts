// API Configuration and Services
import { store } from '@/store';

const API_BASE_URL = 'https://schoolmanger.test/api';

// Types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  device_name?: string;
}

export interface LoginResponse {
  token: string;
  user: {
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
  };
}

// Generic API request function with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add authorization header if token exists
  const state = store.getState();
  const token = state.auth.token;
  console.log('🔑 apiRequest: Token from Redux store:', token ? 'EXISTS' : 'NOT_FOUND');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
    console.log('🔑 apiRequest: Added Authorization header');
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  console.log('🌐 apiRequest: Making request to', url, 'with config:', config);

  try {
    const response = await fetch(url, config);
    console.log('📡 apiRequest: Response status:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('📡 apiRequest: Response data:', data);

    if (!response.ok) {
      console.error('❌ apiRequest: Request failed with status', response.status);
      const error: ApiError = {
        message: data.message || 'An error occurred',
        errors: data.errors || {},
        status: response.status,
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('❌ apiRequest: Request error:', error);
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError: ApiError = {
        message: 'Network error. Please check your connection and try again.',
        status: 0,
      };
      throw networkError;
    }
    
    // Re-throw API errors
    throw error;
  }
}

// Authentication API functions
export const authApi = {
  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  async logout(): Promise<void> {
    return apiRequest<void>('/auth/logout', {
      method: 'POST',
    });
  },

  // Verify two-factor authentication code
  async verifyTwoFactor(code: string, method: string): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/auth/two-factor', {
      method: 'POST',
      body: JSON.stringify({ code, method }),
    });
  },

  // Get current user profile
  async getProfile(): Promise<LoginResponse['user']> {
    return apiRequest<LoginResponse['user']>('/auth/profile');
  },

  // Refresh authentication token
  async refreshToken(): Promise<{ token: string }> {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },

  // Request password reset
  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  async resetPassword(data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Role Permissions API functions
export const rolePermissionsApi = {
  // Update role permissions
  async updateRolePermissions(roleId: number, permissions: Array<{
    module: string;
    add: string;
    view: string;
    update: string;
    delete: string;
  }>): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>(`/admin/role-permissions/organized/${roleId}`, {
      method: 'PUT',
      body: JSON.stringify({ permissions }),
    });
  },
};

// Utility functions for error handling
export const handleApiError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const apiError = error as ApiError;
    
    // Handle validation errors
    if (apiError.errors && Object.keys(apiError.errors).length > 0) {
      const firstErrorKey = Object.keys(apiError.errors)[0];
      const firstError = apiError.errors[firstErrorKey];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }
    
    return apiError.message;
  }
  
  return 'An unexpected error occurred';
};

// Check if error is a network error
export const isNetworkError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as ApiError).status === 0
  );
};

// Check if error is an authentication error
export const isAuthError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    ((error as ApiError).status === 401 || (error as ApiError).status === 403)
  );
};

export default apiRequest;