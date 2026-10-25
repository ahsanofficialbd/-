export type Language = 'bn' | 'en';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  categoryId: string;
  question: {
    bn: string;
    en: string;
  };
  options: {
    bn: string[];
    en: string[];
  };
  correctIndex: number;
  explanation: {
    bn: string;
    en: string;
  };
  difficulty: Difficulty;
  sourceOrExam?: string; // e.g. "৪৪তম বিসিএস", "প্রাক-প্রাথমিক শিক্ষক নিয়োগ", "সাধারণ জ্ঞান"
}

export interface Category {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  description: {
    bn: string;
    en: string;
  };
  iconName: string;
  color: string;
  accentBg: string;
  totalQuestionsCount: number;
}

export interface UserStats {
  name: string;
  avatarSeed: string;
  xp: number;
  level: number;
  streakDays: number;
  lastPlayedDate: string;
  quizzesCompleted: number;
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
  categoryStats: Record<string, { attempted: number; correct: number }>;
  bookmarkedQuestionIds: string[];
  mistakeQuestionIds: string[];
  completedExamScores: Array<{
    date: string;
    title: string;
    score: number;
    total: number;
    accuracy: number;
    categoryId?: string;
  }>;
}

export interface ActiveQuizState {
  questions: Question[];
  currentIndex: number;
  userAnswers: Array<{
    questionId: string;
    selectedOptionIndex: number | null;
    isCorrect: boolean;
    timeTakenSeconds: number;
  }>;
  timeLeft: number;
  isTimerRunning: boolean;
  isAnswerSubmitted: boolean;
  selectedOption: number | null;
  mode: 'category' | 'daily' | 'rapid' | 'mock' | 'custom' | 'mistakes';
  title: {
    bn: string;
    en: string;
  };
  lifelines: {
    fiftyFifty: boolean;
    freezeTime: boolean;
    audiencePoll: boolean;
    skip: boolean;
  };
  hiddenOptions: number[]; // Indices of options hidden by 50-50
  audienceHintText: string | null;
  score: number;
  startTime: number;
}

export interface DailyFact {
  id: string;
  title: {
    bn: string;
    en: string;
  };
  content: {
    bn: string;
    en: string;
  };
  category: {
    bn: string;
    en: string;
  };
  tag: string;
}

export interface GKNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface GKSubfolder {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  questionIds: string[];
  notes: GKNote[];
}

export interface GKFolder {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
  subfolders: GKSubfolder[];
}

