export interface Question {
  id: string;
  subject: string;
  classSection: string;
  type: 'mcq' | 'true-false' | 'short-answer' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  options?: string[];
  correctAnswer: string | string[];
  attachment?: {
    type: 'image' | 'audio' | 'video';
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateQuestionData {
  subject: string;
  classSection: string;
  type: 'mcq' | 'true-false' | 'short-answer' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  options?: string[];
  correctAnswer: string | string[];
  attachment?: {
    type: 'image' | 'audio' | 'video';
    url: string;
  };
}

export interface UpdateQuestionData extends Partial<CreateQuestionData> {}

export interface QuestionFilters {
  subject?: string;
  classSection?: string;
  type?: string;
  difficulty?: string;
  search?: string;
}