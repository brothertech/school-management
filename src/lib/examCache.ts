type CachedExamData = {
  answers: Record<string, string | string[] | boolean>;
  flagged: Record<string, boolean>;
  savedAt: string;
};

const KEY_PREFIX = 'cbt_exam_cache_';

const getKey = (examId: string) => `${KEY_PREFIX}${examId}`;

export const examCache = {
  save: (
    examId: string,
    data: { answers: Record<string, string | string[] | boolean>; flagged: Record<string, boolean> }
  ) => {
    try {
      const payload: CachedExamData = {
        answers: data.answers,
        flagged: data.flagged,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(getKey(examId), JSON.stringify(payload));
    } catch (err) {
      // Ignore quota errors for now
      console.warn('Failed to cache exam answers', err);
    }
  },
  load: (examId: string): CachedExamData | null => {
    try {
      const raw = localStorage.getItem(getKey(examId));
      if (!raw) return null;
      return JSON.parse(raw) as CachedExamData;
    } catch (err) {
      console.warn('Failed to load cached exam answers', err);
      return null;
    }
  },
  clear: (examId: string) => {
    try {
      localStorage.removeItem(getKey(examId));
    } catch (err) {
      console.warn('Failed to clear cached exam answers', err);
    }
  },
};