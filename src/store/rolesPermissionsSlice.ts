import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../lib/axiosClient';
import Cookies from 'js-cookie';



// Define access level type
export type AccessLevel = 'all' | 'owned' | 'none';

// Define interfaces for the roles and permissions data
export interface Permission {
  module: string;
  add: AccessLevel;
  view: AccessLevel;
  update: AccessLevel;
  delete: AccessLevel;
}

export interface Role {
  id: number;
  name: string;
}

export interface OrganizedPermission {
  role_id: number;
  role_name: string;
  permissions: Permission[];
}

export interface RolesPermissionsResponse {
  success: boolean;
  data: {
    roles: Role[];
    organized_permissions: OrganizedPermission[];
  };
}

// Define the state interface
export interface RolesPermissionsState {
  roles: Role[];
  organizedPermissions: OrganizedPermission[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesPermissionsState = {
  roles: [],
  organizedPermissions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch roles and permissions
export const fetchRolesPermissions = createAsyncThunk<
  RolesPermissionsResponse,
  void,
  { rejectValue: string }
>('rolesPermissions/fetchRolesPermissions', async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
console.log('token is ', token);
    if (!token) {
      // return rejectWithValue('No token found');
    }
    const response = await axiosClient.get('/admin/role-permissions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data as RolesPermissionsResponse;
  } catch (error: any) {
    // The axios interceptor will handle 401 redirects automatically
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch roles and permissions');
  }
});

// Roles and Permissions slice
const rolesPermissionsSlice = createSlice({
  name: 'rolesPermissions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.roles = [];
      state.organizedPermissions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch roles and permissions
      .addCase(fetchRolesPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.data.roles;
        state.organizedPermissions = action.payload.data.organized_permissions;
        state.error = null;
      })
      .addCase(fetchRolesPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch roles and permissions';
      });
  },
});

export const { clearError, resetState } = rolesPermissionsSlice.actions;
export const rolesPermissionsReducer = rolesPermissionsSlice.reducer;

// Selectors - using any to work with RootState from store
export const selectRolesPermissions = (state: any) => state.rolesPermissions;
export const selectRoles = (state: any) => state.rolesPermissions?.roles || [];
export const selectOrganizedPermissions = (state: any) => state.rolesPermissions?.organizedPermissions || [];
export const selectLoading = (state: any) => state.rolesPermissions?.loading || false;
export const selectError = (state: any) => state.rolesPermissions?.error || null;