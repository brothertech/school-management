import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axiosClient';
import { Exam, ExamWithDetails } from '@/types/exam';
import { mockExams } from '@/data/examData';
import { examCache } from '@/lib/examCache';

export type QuestionType = 'mcq' | 'tf' | 'short' | 'essay' | 'match' | 'media';

export interface ExamQuestionOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: ExamQuestionOption[];
  correctAnswer?: string | string[] | boolean;
  mediaUrl?: string; // image/audio
}

export interface ExamSession {
  examId: string;
  startedAt: string;
  endsAt: string;
  durationMinutes: number;
  questions: ExamQuestion[];
}

export interface ExamAnalyticsSummary {
  totalExams: number;
  activeExams: number;
  closedExams: number;
  averageScore?: number;
}

export interface SubmitPayload {
  examId: string;
  answers: Record<string, string | string[] | boolean>;
}

interface ExamState {
  list: Exam[];
  details: ExamWithDetails | null;
  session: ExamSession | null;
  answers: Record<string, string | string[] | boolean>;
  flagged: Record<string, boolean>;
  results: any | null;
  analytics: ExamAnalyticsSummary | null;
  loading: boolean;
  error: string | null;
  largeFonts: boolean;
  isDirty: boolean;
  lastSavedAt: string | null;
}

const initialState: ExamState = {
  list: [],
  details: null,
  session: null,
  answers: {},
  flagged: {},
  results: null,
  analytics: null,
  loading: false,
  error: null,
  largeFonts: false,
  isDirty: false,
  lastSavedAt: null,
};

export const fetchExams = createAsyncThunk<Exam[]>(
  'exam/fetchExams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/exams');
      return response.data.data as Exam[];
    } catch (error: any) {
      // Fallback to mock data for now
      return mockExams;
    }
  }
);

export const fetchExamById = createAsyncThunk<ExamWithDetails, string>(
  'exam/fetchExamById',
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/exams/${examId}`);
      return response.data.data as ExamWithDetails;
    } catch (error: any) {
      // Fallback: find in mockExams
      const exam = mockExams.find((e) => e.id === examId);
      if (!exam) return rejectWithValue('Exam not found') as any;
      return { ...exam } as ExamWithDetails;
    }
  }
);

export const startExam = createAsyncThunk<ExamSession, string>(
  'exam/startExam',
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/exams/${examId}/start`);
      return response.data.data as ExamSession;
    } catch (error: any) {
      // Fallback: create a simple session from mock
      const exam = mockExams.find((e) => e.id === examId);
      if (!exam) return rejectWithValue('Exam not found') as any;
      const now = Date.now();
      const questions: ExamQuestion[] = [
        { id: 'q1', type: 'mcq', text: '2 + 2 = ?', options: [
          { id: 'a', text: '3' },
          { id: 'b', text: '4' },
          { id: 'c', text: '5' },
        ] },
        { id: 'q2', type: 'tf', text: 'The earth is flat.' },
        { id: 'q3', type: 'short', text: 'Define photosynthesis.' },
      ];
      return {
        examId,
        startedAt: new Date(now).toISOString(),
        endsAt: new Date(now + exam.duration * 60 * 1000).toISOString(),
        durationMinutes: exam.duration,
        questions,
      };
    }
  }
);

export const submitExam = createAsyncThunk<any, SubmitPayload>(
  'exam/submitExam',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/exams/${payload.examId}/submit`, payload);
      return response.data.data;
    } catch (error: any) {
      // Fallback: mock submission result
      return { success: true, submittedAt: new Date().toISOString() };
    }
  }
);

export const fetchExamAnalytics = createAsyncThunk<ExamAnalyticsSummary>(
  'exam/fetchExamAnalytics',
  async () => {
    try {
      const response = await axiosClient.get('/exams/analytics');
      return response.data.data as ExamAnalyticsSummary;
    } catch (error) {
      return {
        totalExams: mockExams.length,
        activeExams: mockExams.filter((e) => e.status === 'active').length,
        closedExams: mockExams.filter((e) => e.status === 'closed').length,
        averageScore: 76,
      };
    }
  }
);

// Persist current answers and flags to localStorage cache (offline support)
export const persistExamCache = createAsyncThunk<void, void, { state: any }>(
  'exam/persistExamCache',
  async (_, { getState }) => {
    const rootState: any = getState();
    const examState = rootState.exam as ExamState;
    const examId = examState.session?.examId;
    if (!examId) return;
    examCache.save(examId, { answers: examState.answers, flagged: examState.flagged });
  }
);

// Load cached answers/flags for a given exam
export const loadExamCache = createAsyncThunk<
  { answers: Record<string, string | string[] | boolean>; flagged: Record<string, boolean>; savedAt: string } | null,
  string
>(
  'exam/loadExamCache',
  async (examId) => {
    return examCache.load(examId);
  }
);

// Clear cache for an exam
export const clearExamCache = createAsyncThunk<void, string>(
  'exam/clearExamCache',
  async (examId) => {
    examCache.clear(examId);
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<{ questionId: string; value: string | string[] | boolean }>) => {
      state.answers[action.payload.questionId] = action.payload.value;
      state.isDirty = true;
    },
    clearAnswers: (state) => {
      state.answers = {};
      state.flagged = {};
      state.isDirty = false;
      state.lastSavedAt = null;
    },
    toggleLargeFonts: (state, action: PayloadAction<boolean | undefined>) => {
      state.largeFonts = action.payload ?? !state.largeFonts;
    },
    toggleFlagQuestion: (state, action: PayloadAction<string>) => {
      const qid = action.payload;
      state.flagged[qid] = !state.flagged[qid];
      state.isDirty = true;
    },
    setSavedSnapshot: (state) => {
      state.isDirty = false;
      state.lastSavedAt = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message || 'Failed to load exams');
      })
      .addCase(fetchExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message || 'Failed to load exam');
      })
      .addCase(startExam.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.session = null;
      })
      .addCase(startExam.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
        state.answers = {};
        state.flagged = {};
        state.isDirty = false;
        state.lastSavedAt = null;
      })
      .addCase(startExam.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message || 'Failed to start exam');
      })
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.isDirty = false;
        state.lastSavedAt = new Date().toISOString();
        const examId = state.session?.examId;
        if (examId) {
          try { examCache.clear(examId); } catch {}
        }
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message || 'Failed to submit exam');
      })
      .addCase(fetchExamAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })
      .addCase(loadExamCache.fulfilled, (state, action) => {
        const data = action.payload;
        if (data) {
          state.answers = data.answers || {};
          state.flagged = data.flagged || {};
          state.isDirty = false;
          state.lastSavedAt = data.savedAt || new Date().toISOString();
        }
      });
  },
});

export const { saveAnswer, clearAnswers, toggleLargeFonts, toggleFlagQuestion, setSavedSnapshot } = examSlice.actions;
export const examReducer = examSlice.reducer;

// Selectors
export const selectExamSession = (state: any) => state.exam?.session;
export const selectExamAnswers = (state: any) => state.exam?.answers || {};
export const selectFlaggedQuestions = (state: any) => state.exam?.flagged || {};
export const selectSaveStatus = (state: any) => ({
  isDirty: state.exam?.isDirty || false,
  lastSavedAt: state.exam?.lastSavedAt || null,
});
export const selectLargeFonts = (state: any) => state.exam?.largeFonts || false;