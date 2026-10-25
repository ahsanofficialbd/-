import { UserStats, Language } from '../types/quiz';

const STATS_KEY = 'gk_master_user_stats_v1';
const LANG_KEY = 'gk_master_language_v1';
const VIEW_MODE_KEY = 'gk_master_view_mode_v1';

export const DEFAULT_USER_STATS: UserStats = {
  name: 'কুইজ যোদ্ধা',
  avatarSeed: 'scholar',
  xp: 0,
  level: 1,
  streakDays: 1,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  quizzesCompleted: 0,
  totalQuestionsAnswered: 0,
  correctAnswersCount: 0,
  categoryStats: {
    math: { attempted: 0, correct: 0 },
    science: { attempted: 0, correct: 0 },
    history: { attempted: 0, correct: 0 },
    geography: { attempted: 0, correct: 0 },
    literature: { attempted: 0, correct: 0 },
    current_affairs: { attempted: 0, correct: 0 },
    bangladesh: { attempted: 0, correct: 0 },
    international: { attempted: 0, correct: 0 },
  },
  bookmarkedQuestionIds: [],
  mistakeQuestionIds: [],
  completedExamScores: [],
};

export function getUserStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_USER_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_USER_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER_STATS,
      ...parsed,
      categoryStats: {
        ...DEFAULT_USER_STATS.categoryStats,
        ...(parsed.categoryStats || {}),
      },
      bookmarkedQuestionIds: parsed.bookmarkedQuestionIds || [],
      mistakeQuestionIds: parsed.mistakeQuestionIds || [],
      completedExamScores: parsed.completedExamScores || [],
    };
  } catch {
    return DEFAULT_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats', e);
  }
}

export function calculateLevel(xp: number): { level: number; title: { bn: string; en: string }; nextLevelXp: number } {
  if (xp >= 1500) return { level: 6, title: { bn: 'জ্ঞানপীঠ গুরু', en: 'Grandmaster' }, nextLevelXp: 2000 };
  if (xp >= 1000) return { level: 5, title: { bn: 'বিসিএস সেনাপতি', en: 'Commander' }, nextLevelXp: 1500 };
  if (xp >= 600) return { level: 4, title: { bn: 'সাধারণ জ্ঞান বিশারদ', en: 'GK Specialist' }, nextLevelXp: 1000 };
  if (xp >= 300) return { level: 3, title: { bn: 'মেধাবী কুইজার', en: 'Talented Quizzer' }, nextLevelXp: 600 };
  if (xp >= 100) return { level: 2, title: { bn: 'জ্ঞানান্বেষী', en: 'Knowledge Seeker' }, nextLevelXp: 300 };
  return { level: 1, title: { bn: 'নবীন শিক্ষার্থী', en: 'Novice Learner' }, nextLevelXp: 100 };
}

export function updateStatsAfterQuiz(params: {
  categoryId: string;
  totalQuestions: number;
  correctCount: number;
  xpEarned: number;
  mistakeIds: string[];
  quizTitle: string;
}): UserStats {
  const current = getUserStats();
  const today = new Date().toISOString().split('T')[0];

  // Calculate streak
  let newStreak = current.streakDays;
  if (current.lastPlayedDate !== today) {
    const lastDate = new Date(current.lastPlayedDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const updatedXp = current.xp + params.xpEarned;
  const { level } = calculateLevel(updatedXp);

  const prevCat = current.categoryStats[params.categoryId] || { attempted: 0, correct: 0 };
  const updatedCategoryStats = {
    ...current.categoryStats,
    [params.categoryId]: {
      attempted: prevCat.attempted + params.totalQuestions,
      correct: prevCat.correct + params.correctCount,
    },
  };

  // Unique mistake ids added
  const mistakesSet = new Set(current.mistakeQuestionIds);
  params.mistakeIds.forEach(id => mistakesSet.add(id));

  const updatedScores = [
    {
      date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' }),
      title: params.quizTitle,
      score: params.correctCount,
      total: params.totalQuestions,
      accuracy: Math.round((params.correctCount / (params.totalQuestions || 1)) * 100),
      categoryId: params.categoryId,
    },
    ...current.completedExamScores.slice(0, 19),
  ];

  const updated: UserStats = {
    ...current,
    xp: updatedXp,
    level,
    streakDays: newStreak,
    lastPlayedDate: today,
    quizzesCompleted: current.quizzesCompleted + 1,
    totalQuestionsAnswered: current.totalQuestionsAnswered + params.totalQuestions,
    correctAnswersCount: current.correctAnswersCount + params.correctCount,
    categoryStats: updatedCategoryStats,
    mistakeQuestionIds: Array.from(mistakesSet),
    completedExamScores: updatedScores,
  };

  saveUserStats(updated);
  return updated;
}

export function toggleBookmark(questionId: string): boolean {
  const stats = getUserStats();
  const isBookmarked = stats.bookmarkedQuestionIds.includes(questionId);
  const updatedIds = isBookmarked
    ? stats.bookmarkedQuestionIds.filter(id => id !== questionId)
    : [...stats.bookmarkedQuestionIds, questionId];

  saveUserStats({
    ...stats,
    bookmarkedQuestionIds: updatedIds,
  });
  return !isBookmarked;
}

export function removeMistake(questionId: string): void {
  const stats = getUserStats();
  saveUserStats({
    ...stats,
    mistakeQuestionIds: stats.mistakeQuestionIds.filter(id => id !== questionId),
  });
}

export function getSavedLanguage(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === 'en' ? 'en' : 'bn';
  } catch {
    return 'bn';
  }
}

export function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export function getSavedViewMode(): 'mobile' | 'wide' {
  if (typeof window === 'undefined') return 'mobile';
  try {
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    return saved === 'wide' ? 'wide' : 'mobile';
  } catch {
    return 'mobile';
  }
}

export function saveViewMode(mode: 'mobile' | 'wide'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VIEW_MODE_KEY, mode);
  } catch {}
}
