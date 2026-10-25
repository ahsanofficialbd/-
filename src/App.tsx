import React, { useState, useEffect } from 'react';
import { GK_CATEGORIES } from './data/categories';
import { GK_QUESTIONS } from './data/questions';
import { DAILY_FACTS } from './data/dailyFacts';
import { Question, Language, UserStats } from './types/quiz';
import { 
  getUserStats, saveUserStats, updateStatsAfterQuiz, 
  toggleBookmark, removeMistake, getSavedLanguage, 
  saveLanguage, getSavedViewMode, saveViewMode 
} from './utils/storage';
import { sound } from './utils/sound';

import { HeaderBar } from './components/HeaderBar';
import { BottomNav, NavTab } from './components/BottomNav';
import { MobileContainer } from './components/MobileContainer';
import { HomeDashboard } from './components/HomeDashboard';
import { CategoriesView } from './components/CategoriesView';
import { MockExamView } from './components/MockExamView';
import { MistakesReviewView } from './components/MistakesReviewView';
import { LeaderboardProfileView } from './components/LeaderboardProfileView';
import { FoldersView } from './components/FoldersView';
import { QuizPlayer } from './components/QuizPlayer';
import { QuizResults } from './components/QuizResults';
import { QuestionReviewModal } from './components/QuestionReviewModal';
import { AIQuizGeneratorModal } from './components/AIQuizGeneratorModal';
import { RapidFireMode } from './components/RapidFireMode';
import { GKFolder } from './types/quiz';
import { getFolders } from './utils/folderStorage';
import { checkAndTriggerDailyReminder } from './utils/dailyReminder';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [viewMode, setViewMode] = useState<'mobile' | 'wide'>('mobile');
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());
  const [folders, setFolders] = useState<GKFolder[]>(getFolders());
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // Quiz execution states
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[] | null>(null);
  const [activeQuizTitle, setActiveQuizTitle] = useState<{ bn: string; en: string }>({ bn: '', en: '' });
  const [activeQuizCategory, setActiveQuizCategory] = useState<string>('all');
  const [isRapidFireActive, setIsRapidFireActive] = useState<boolean>(false);

  // Results state
  const [quizResultsData, setQuizResultsData] = useState<{
    quizTitle: { bn: string; en: string };
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    scoreMarks: number;
    totalMarks: number;
    xpEarned: number;
    timeSpentSeconds: number;
    answers: Array<{
      question: Question;
      userSelected: number | null;
      isCorrect: boolean;
    }>;
  } | null>(null);

  // Modals
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAICreatorOpen, setIsAICreatorOpen] = useState(false);

  // Daily Fact
  const [dailyFactIndex] = useState(() => Math.floor(Math.random() * DAILY_FACTS.length));
  const currentDailyFact = DAILY_FACTS[dailyFactIndex] || DAILY_FACTS[0];

  useEffect(() => {
    setLanguage(getSavedLanguage());
    setViewMode(getSavedViewMode());
    setUserStats(getUserStats());
  }, []);

  // Daily reminder notification scheduler
  useEffect(() => {
    const checkReminder = () => {
      const today = new Date().toISOString().split('T')[0];
      const completed = localStorage.getItem(`gk_daily_challenge_completed_${today}`) === 'true';
      checkAndTriggerDailyReminder(language, completed);
    };

    // Run check on startup with slight delay
    const timeout = setTimeout(checkReminder, 2500);

    // Periodic check every 60 seconds
    const interval = setInterval(checkReminder, 60000);

    // Check when user brings tab into focus
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkReminder();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [language]);

  const handleToggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
    saveLanguage(nextLang);
  };

  const handleToggleViewMode = () => {
    const nextMode = viewMode === 'mobile' ? 'wide' : 'mobile';
    setViewMode(nextMode);
    saveViewMode(nextMode);
  };

  const handleToggleBookmark = (questionId: string) => {
    toggleBookmark(questionId);
    setUserStats(getUserStats());
  };

  const handleRemoveMistake = (questionId: string) => {
    removeMistake(questionId);
    setUserStats(getUserStats());
  };

  const handleUpdateName = (newName: string) => {
    const updated = { ...userStats, name: newName };
    saveUserStats(updated);
    setUserStats(updated);
  };

  // Start 10-Question Subject Quiz (গণিত, বিজ্ঞান, ইতিহাস, ভূগোল, সাহিত্য, সাম্প্রতিক ঘটনাবলী, ইত্যাদি)
  const handleStartSubjectQuiz = (categoryId: string) => {
    sound.playClick();
    const cat = GK_CATEGORIES.find((c) => c.id === categoryId);
    const categoryQuestions = GK_QUESTIONS.filter((q) => q.categoryId === categoryId);

    // Ensure 10 questions
    const selected = categoryQuestions.slice(0, 10);
    if (selected.length < 10) {
      // If category has fewer than 10, fill from general bank
      const remainingNeeded = 10 - selected.length;
      const others = GK_QUESTIONS.filter((q) => q.categoryId !== categoryId).slice(0, remainingNeeded);
      selected.push(...others);
    }

    setActiveQuizCategory(categoryId);
    setActiveQuizTitle({
      bn: cat ? `${cat.name.bn} কুইজ` : 'বিষয়ভিত্তিক কুইজ',
      en: cat ? `${cat.name.en} Quiz` : 'Subject Quiz',
    });
    setActiveQuizQuestions(selected);
    setQuizResultsData(null);
  };

  // Start Daily 10-Question Challenge
  const handleStartDailyQuiz = () => {
    sound.playClick();
    // 10 curated questions across all subjects
    const shuffled = [...GK_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);
    setActiveQuizCategory('daily');
    setActiveQuizTitle({
      bn: 'দৈনিক সাধারণ জ্ঞান চ্যালেঞ্জ (১০ প্রশ্ন)',
      en: 'Daily GK Challenge (10 Questions)',
    });
    setActiveQuizQuestions(shuffled);
    setQuizResultsData(null);
  };

  // Start Mock Test (10 or 20 questions)
  const handleStartMockExam = (config: { questionCount: number; hasNegativeMarking: boolean }) => {
    sound.playClick();
    const count = config.questionCount;
    const shuffled = [...GK_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, count);
    setActiveQuizCategory('mock');
    setActiveQuizTitle({
      bn: `বিসিএস ও চাকরি মডেল টেস্ট (${count} প্রশ্ন • ${count} নম্বর)`,
      en: `BCS & Job Mock Test (${count} Questions • ${count} Marks)`,
    });
    setActiveQuizQuestions(shuffled);
    setQuizResultsData(null);
  };

  // Start Custom / Revision Quiz
  const handleStartCustomQuiz = (questions: Question[], title: string) => {
    sound.playClick();
    setActiveQuizCategory('custom');
    setActiveQuizTitle({
      bn: title,
      en: title,
    });
    setActiveQuizQuestions(questions.slice(0, 10));
    setQuizResultsData(null);
  };

  // When a quiz completes
  const handleFinishQuiz = (results: {
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    scoreMarks: number;
    totalMarks: number;
    xpEarned: number;
    timeSpentSeconds: number;
    answers: Array<{
      question: Question;
      userSelected: number | null;
      isCorrect: boolean;
    }>;
  }) => {
    const mistakeIds = results.answers
      .filter((a) => !a.isCorrect)
      .map((a) => a.question.id);

    // Save stats in local storage
    const updated = updateStatsAfterQuiz({
      categoryId: activeQuizCategory,
      totalQuestions: results.totalQuestions,
      correctCount: results.correctCount,
      xpEarned: results.xpEarned,
      mistakeIds,
      quizTitle: activeQuizTitle[language],
    });

    if (activeQuizCategory === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      try {
        localStorage.setItem(`gk_daily_challenge_completed_${today}`, 'true');
      } catch {}
    }

    setUserStats(updated);
    setQuizResultsData({
      quizTitle: activeQuizTitle,
      ...results,
    });
    setActiveQuizQuestions(null);
  };

  // Retake current quiz
  const handleRetakeQuiz = () => {
    if (quizResultsData) {
      const questionsToRetake = quizResultsData.answers.map((a) => a.question);
      setActiveQuizQuestions(questionsToRetake);
      setQuizResultsData(null);
    }
  };

  const handleExitQuiz = () => {
    setActiveQuizQuestions(null);
    setQuizResultsData(null);
    setIsRapidFireActive(false);
  };

  return (
    <MobileContainer viewMode={viewMode}>
      {/* App Top Header Bar */}
      <HeaderBar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        streakDays={userStats.streakDays}
        xp={userStats.xp}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* 1. Active Quiz Mode (10 Questions Interactive Engine) */}
        {activeQuizQuestions !== null ? (
          <QuizPlayer
            questions={activeQuizQuestions}
            quizTitle={activeQuizTitle}
            categoryName={
              GK_CATEGORIES.find((c) => c.id === activeQuizCategory)?.name[language]
            }
            language={language}
            onFinishQuiz={handleFinishQuiz}
            onExitQuiz={handleExitQuiz}
            isBookmarked={(id) => userStats.bookmarkedQuestionIds.includes(id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : isRapidFireActive ? (
          /* 2. Rapid Fire 60-Second Challenge */
          <RapidFireMode
            language={language}
            onExit={() => setIsRapidFireActive(false)}
            onFinished={(score) => {
              const updated = updateStatsAfterQuiz({
                categoryId: 'rapid',
                totalQuestions: score,
                correctCount: score,
                xpEarned: score * 15,
                mistakeIds: [],
                quizTitle: language === 'bn' ? 'র‍্যাপিড ফায়ার কুইজ' : 'Rapid Fire Challenge',
              });
              setUserStats(updated);
              setIsRapidFireActive(false);
            }}
          />
        ) : quizResultsData !== null ? (
          /* 3. Quiz Results Scorecard */
          <QuizResults
            quizTitle={quizResultsData.quizTitle}
            totalQuestions={quizResultsData.totalQuestions}
            correctCount={quizResultsData.correctCount}
            wrongCount={quizResultsData.wrongCount}
            scoreMarks={quizResultsData.scoreMarks}
            totalMarks={quizResultsData.totalMarks}
            xpEarned={quizResultsData.xpEarned}
            timeSpentSeconds={quizResultsData.timeSpentSeconds}
            language={language}
            onRetake={handleRetakeQuiz}
            onGoHome={() => setQuizResultsData(null)}
            onOpenReview={() => setIsReviewModalOpen(true)}
          />
        ) : (
          /* 4. Tab Navigation Content */
          <>
            {currentTab === 'home' && (
              <HomeDashboard
                categories={GK_CATEGORIES}
                userStats={userStats}
                language={language}
                dailyFact={currentDailyFact}
                onStartSubjectQuiz={handleStartSubjectQuiz}
                onStartDailyQuiz={handleStartDailyQuiz}
                onStartRapidFire={() => setIsRapidFireActive(true)}
                onOpenCategories={() => setCurrentTab('categories')}
                onOpenFolders={() => setCurrentTab('folders')}
              />
            )}

            {currentTab === 'categories' && (
              <CategoriesView
                categories={GK_CATEGORIES}
                userStats={userStats}
                language={language}
                onSelectCategory={handleStartSubjectQuiz}
                onOpenAICreator={() => setIsAICreatorOpen(true)}
              />
            )}

            {currentTab === 'folders' && (
              <FoldersView
                folders={folders}
                language={language}
                onUpdateFolder={() => setFolders(getFolders())}
                onStartQuizFromQuestions={handleStartCustomQuiz}
              />
            )}

            {currentTab === 'mock' && (
              <MockExamView
                userStats={userStats}
                language={language}
                onStartMockExam={handleStartMockExam}
              />
            )}

            {currentTab === 'mistakes' && (
              <MistakesReviewView
                userStats={userStats}
                language={language}
                onStartReTest={handleStartCustomQuiz}
                onRemoveMistake={handleRemoveMistake}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentTab === 'profile' && (
              <LeaderboardProfileView
                userStats={userStats}
                language={language}
                onUpdateName={handleUpdateName}
              />
            )}
          </>
        )}
      </div>

      {/* Persistent Mobile Bottom Navigation Bar (Hidden during active quiz) */}
      {activeQuizQuestions === null && !isRapidFireActive && quizResultsData === null && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          language={language}
          mistakesCount={userStats.mistakeQuestionIds.length}
        />
      )}

      {/* Review Modal for inspecting all 10 questions & detailed explanations */}
      {isReviewModalOpen && quizResultsData && (
        <QuestionReviewModal
          answers={quizResultsData.answers}
          language={language}
          onClose={() => setIsReviewModalOpen(false)}
          isBookmarked={(id) => userStats.bookmarkedQuestionIds.includes(id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* AI Quiz Generator Modal */}
      {isAICreatorOpen && (
        <AIQuizGeneratorModal
          language={language}
          onClose={() => setIsAICreatorOpen(false)}
          onStartGeneratedQuiz={(questions, title) => {
            setIsAICreatorOpen(false);
            handleStartCustomQuiz(questions, title);
          }}
        />
      )}
    </MobileContainer>
  );
}
