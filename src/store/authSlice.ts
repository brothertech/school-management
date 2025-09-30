import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
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

// API Base URL
const API_BASE_URL = 'https://schoolmanger.test/api';

// Async thunks
export const loginBegin = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: LoginError }
>('auth/loginBegin', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data as LoginError);
    }

    // Persist token on the client for refreshes
    if (typeof window !== 'undefined') {
      try {
        // Local storage for redux-persist to rehydrate
        window.localStorage.setItem('auth_token', data.token);
        // Cookie for middleware/server-side usage if needed
        const maxAgeDays = 7; // default remember period
        document.cookie = `auth_token=${data.token}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}`;
      } catch (e) {
        // noop
      }
    }

    return data as LoginResponse;
  } catch (error) {
    return rejectWithValue({
      message: 'Network error. Please check your connection and try again.',
      errors: {},
    });
  }
});

export const submitTwoFactorCode = createAsyncThunk<
  LoginResponse,
  { code: string; method: TwoFactorMethod },
  { rejectValue: LoginError }
>('auth/submitTwoFactorCode', async ({ code, method }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/two-factor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ code, method }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data as LoginError);
    }

    return data as LoginResponse;
  } catch (error) {
    return rejectWithValue({
      message: 'Network error. Please check your connection and try again.',
      errors: {},
    });
  }
});

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;

    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      }
      // Clear client storage
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem('auth_token');
          document.cookie = 'auth_token=; path=/; max-age=0';
        } catch (e) {
          // noop
        }
      }
    } catch (error) {
      // Even if logout fails on server, we still proceed with logout
      console.error('Logout error:', error);
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

export const { clearError, setTwoFactorMethod, resetTwoFactor } = authSlice.actions;
export const authReducer = authSlice.reducer;