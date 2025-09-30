import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { schoolSettingsApi, SchoolSettingsPayload, SchoolSettingsData } from '@/lib/api';
import toast from 'react-hot-toast';

interface SchoolSettingsState {
  data: SchoolSettingsData | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: SchoolSettingsState = {
  data: null,
  isLoading: false,
  isSaving: false,
  error: null,
};

// Async thunk for saving school settings
export const saveSchoolSettings = createAsyncThunk(
  'schoolSettings/save',
  async (payload: SchoolSettingsPayload, { rejectWithValue }) => {
    try {
      const response = await schoolSettingsApi.saveSchoolSettings(payload);
      toast.success('School settings saved successfully!');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save school settings';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching school settings
export const fetchSchoolSettings = createAsyncThunk(
  'schoolSettings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await schoolSettingsApi.getSchoolSettings();
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch school settings';
      return rejectWithValue(errorMessage);
    }
  }
);

const schoolSettingsSlice = createSlice({
  name: 'schoolSettings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save school settings
      .addCase(saveSchoolSettings.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(saveSchoolSettings.fulfilled, (state, action) => {
        state.isSaving = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(saveSchoolSettings.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload as string;
      })
      // Fetch school settings
      .addCase(fetchSchoolSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSchoolSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchSchoolSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = schoolSettingsSlice.actions;
export default schoolSettingsSlice.reducer;