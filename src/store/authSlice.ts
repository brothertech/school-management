import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../lib/axiosClient';
import Cookies from 'js-cookie';


// Types
export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  primary_role: string;
  module_visibility: {
    id: number;
    role_id: number;
    modules: { [key: string]: boolean } | string; // Can be object or JSON string for backward compatibility
    created_at: string;
    updated_at: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  device_name?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginError {
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export interface TwoFactorState {
  required: boolean;
  methods: TwoFactorMethod[];
  selectedMethod?: TwoFactorMethod;
}

export type TwoFactorMethod = 'sms' | 'email' | 'authenticator';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  twoFactor: TwoFactorState;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  twoFactor: {
    required: false,
    methods: [],
    selectedMethod: undefined,
  },
};

// Async thunks
export const loginBegin = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: LoginError }
>('auth/loginBegin', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data as LoginResponse;
  } catch (error: any) {
    // Axios interceptor will handle 401 redirects automatically
    const errorData = error.response?.data || {
      message: 'Network error. Please check your connection and try again.',
      errors: {},
    };
    return rejectWithValue(errorData as LoginError);
  }
});

export interface TwoFactorSubmission {
  code: string;
  method: TwoFactorMethod;
}

export const submitTwoFactorCode = createAsyncThunk<
  LoginResponse,
  TwoFactorSubmission,
  { rejectValue: LoginError }
>('auth/submitTwoFactorCode', async (submission, { rejectWithValue }) => {
  try {
     const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axiosClient.post('/auth/two-factor', submission, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data as LoginResponse;
  } catch (error: any) {
    // Axios interceptor will handle 401 redirects automatically
    const errorData = error.response?.data || {
      message: 'Network error. Please check your connection and try again.',
      errors: {},
    };
    return rejectWithValue(errorData as LoginError);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axiosClient.post('/auth/logout',
        {headers: {'Authorization': `Bearer ${token}`}}
      );
      // Axios interceptor will handle token cleanup automatically
    } catch (error: any) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout request failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// Check if user is already authenticated (on app load)
export const checkAuthStatus = createAsyncThunk<
  LoginResponse | null,
  void
>('auth/checkAuthStatus', async () => {
  // Redux Persist will automatically rehydrate the state
  // This thunk is now mainly for compatibility and can be simplified
  return null;
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTwoFactorMethod: (state, action: PayloadAction<TwoFactorMethod>) => {
      state.twoFactor.selectedMethod = action.payload;
    },
    resetTwoFactor: (state) => {
      state.twoFactor = {
        required: false,
        methods: [],
        selectedMethod: undefined,
      };
    },
    // Handle 401 unauthorized errors
    handleUnauthorized: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = 'Session expired. Please sign in again.';
      state.twoFactor = {
        required: false,
        methods: [],
        selectedMethod: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Begin
      .addCase(loginBegin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginBegin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.twoFactor.required = false;
      })
      .addCase(loginBegin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
        
        // Check if two-factor authentication is required
        if (action.payload?.message?.includes('two-factor')) {
          state.twoFactor.required = true;
          state.twoFactor.methods = ['sms', 'email', 'authenticator']; // This should come from API
        }
      })
      
      // Two-Factor Code Submission
      .addCase(submitTwoFactorCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitTwoFactorCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.twoFactor.required = false;
      })
      .addCase(submitTwoFactorCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Two-factor authentication failed';
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        state.twoFactor = {
          required: false,
          methods: [],
          selectedMethod: undefined,
        };
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setTwoFactorMethod, resetTwoFactor, handleUnauthorized } = authSlice.actions;
export const authReducer = authSlice.reducer;