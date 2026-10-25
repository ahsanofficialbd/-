import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Bookmark, BookmarkCheck, ArrowRight, 
  HelpCircle, Sparkles, AlertCircle, CheckCircle2, 
  XCircle, PauseCircle, Users, Zap
} from 'lucide-react';
import { Question, Language, ActiveQuizState } from '../types/quiz';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizPlayerProps {
  questions: Question[];
  quizTitle: {
    bn: string;
    en: string;
  };
  categoryName?: string;
  language: Language;
  onFinishQuiz: (results: {
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
  }) => void;
  onExitQuiz: () => void;
  isBookmarked: (questionId: string) => boolean;
  onToggleBookmark: (questionId: string) => void;
}

const QUESTION_TIME_LIMIT = 20; // 20 seconds per question

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  questions,
  quizTitle,
  categoryName,
  language,
  onFinishQuiz,
  onExitQuiz,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  
  // Lifelines
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    freeze: true,
    hint: true,
  });
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  // Score tracking
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Array<{
      question: Question;
      userSelected: number | null;
      isCorrect: boolean;
    }>
  >([]);

  const totalTimeStartRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length; // 10 questions

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || isTimerPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        // Subtle countdown tick for the final 3 seconds
        if (prev <= 4 && prev > 1) {
          sound.playTimerTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isSubmitted, isTimerPaused]);

  // Handle timeout (marked as unattempted/wrong)
  const handleTimeOut = () => {
    sound.playWrong();
    setIsSubmitted(true);
    setWrongCount((prev) => prev + 1);
    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        userSelected: null,
        isCorrect: false,
      },
    ]);
  };

  // Option selection
  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(index);
    setIsSubmitted(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
      setWrongCount((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        userSelected: index,
        isCorrect,
      },
    ]);
  };

  // Move to next question or complete quiz
  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
      setHiddenOptions([]);
      setHintMessage(null);
      setIsTimerPaused(false);
    } else {
      // Finished all 10 questions!
      const totalTimeSpent = Math.round((Date.now() - totalTimeStartRef.current) / 1000);
      const scoreMarks = correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0);
      const totalMarks = totalQuestions;
      const xpEarned = scoreMarks * 10 + (scoreMarks === totalMarks ? 25 : 0); // +10 XP per mark + bonus for 10/10

      onFinishQuiz({
        totalQuestions,
        correctCount: scoreMarks,
        wrongCount: totalQuestions - scoreMarks,
        scoreMarks,
        totalMarks,
        xpEarned,
        timeSpentSeconds: totalTimeSpent,
        answers: userAnswers,
      });
    }
  };

  // Lifeline: 50-50
  const handleFiftyFifty = () => {
    if (!lifelines.fiftyFifty || isSubmitted) return;
    sound.playLifeline();
    setLifelines((prev) => ({ ...prev, fiftyFifty: false }));

    const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== currentQ.correctIndex);
    // Shuffle and pick 2 to hide
    const toHide = wrongIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(toHide);
  };

  // Lifeline: Freeze Timer
  const handleFreezeTimer = () => {
    if (!lifelines.freeze || isSubmitted) return;
    sound.playLifeline();
    setLifelines((prev) => ({ ...prev, freeze: false }));
    setIsTimerPaused(true);
    setTimeLeft((prev) => prev + 15); // Add 15 extra seconds
  };

  // Lifeline: Audience / Fact Hint
  const handleHint = () => {
    if (!lifelines.hint || isSubmitted) return;
    sound.playLifeline();
    setLifelines((prev) => ({ ...prev, hint: false }));
    const correctLetter = ['ক', 'খ', 'গ', 'ঘ'][currentQ.correctIndex];
    const hint = language === 'bn' 
      ? `দর্শকদের ৭৮% ভোট দিয়েছেন অপশন "${correctLetter}" এর পক্ষে। লক্ষ্য করুন: ${currentQ.sourceOrExam || 'পরীক্ষার গুরুত্বপূর্ণ প্রশ্ন'}`
      : `78% audience favored option "${['A', 'B', 'C', 'D'][currentQ.correctIndex]}". Exam reference: ${currentQ.sourceOrExam || 'High-yield'}`;
    setHintMessage(hint);
  };

  // Progress percentage
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const timeBarPercent = (timeLeft / QUESTION_TIME_LIMIT) * 100;

  const optionLabels = language === 'bn' ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col min-h-full max-w-xl mx-auto px-4 py-3 select-none">
      {/* Top Bar inside Quiz */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <button
          onClick={() => {
            sound.playClick();
            if (confirm(language === 'bn' ? 'আপনি কি কুইজ ত্যাগ করতে চান?' : 'Do you want to exit the quiz?')) {
              onExitQuiz();
            }
          }}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer py-1"
        >
          {language === 'bn' ? '← প্রস্থান' : '← Exit'}
        </button>

        {/* Quiz Title & Question Count with smooth animation */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-amber-400 truncate max-w-[130px] xs:max-w-none">
            {quizTitle[language]}
          </span>
          <span className="text-slate-600">·</span>
          <div className="relative overflow-hidden h-4 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="text-xs font-medium text-slate-300 tabular-nums block"
              >
                {language === 'bn' ? `প্রশ্ন ${currentIndex + 1}/${totalQuestions}` : `Q ${currentIndex + 1}/${totalQuestions}`}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Current Marks / Score */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span>{language === 'bn' ? 'নম্বর:' : 'Score:'}</span>
          <span className="tabular-nums font-bold">{correctCount}/{totalQuestions}</span>
        </div>
      </div>

      {/* Framer Motion Animated Progress Bar */}
      <div className="relative w-full mb-3 select-none">
        {/* Background Track with soft inner shadow */}
        <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden border border-slate-800/60 shadow-inner relative">
          {/* Animated Progress Fill with Spring Physics */}
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full relative"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              mass: 0.6,
            }}
          >
            {/* Shimmer sweep effect inside the progress fill */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
            />

            {/* Glowing Leading Head / Pulse Node */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_4px_rgba(16,185,129,0.8)]"
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Step Checkpoints / Segment Notches */}
        <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                idx < currentIndex + 1 ? 'bg-slate-950/60' : 'bg-slate-700/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Timer & Lifelines Row */}
      <div className="flex items-center justify-between gap-2 bg-slate-900/80 border border-slate-800/80 rounded-xl px-3 py-2 mb-3 shadow-sm">
        {/* Countdown */}
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
          <span className={`text-sm font-bold tabular-nums ${timeLeft <= 5 ? 'text-red-400' : 'text-slate-200'}`}>
            {timeLeft}s
          </span>
          {isTimerPaused && (
            <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">
              {language === 'bn' ? 'স্থগিত' : 'Paused'}
            </span>
          )}
        </div>

        {/* Lifeline Buttons */}
        <div className="flex items-center gap-1.5">
          {/* 50:50 */}
          <button
            onClick={handleFiftyFifty}
            disabled={!lifelines.fiftyFifty || isSubmitted}
            title={language === 'bn' ? '৫০:৫০ লাইফলাইন (২টি ভুল অপশন মুছুন)' : '50:50 Lifeline'}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              lifelines.fiftyFifty && !isSubmitted
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed opacity-40'
            }`}
          >
            50:50
          </button>

          {/* Freeze */}
          <button
            onClick={handleFreezeTimer}
            disabled={!lifelines.freeze || isSubmitted}
            title={language === 'bn' ? 'সময় ফ্রিজ (+১৫ সেকেন্ড যোগ করুন)' : 'Freeze Timer'}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              lifelines.freeze && !isSubmitted
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                : 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed opacity-40'
            }`}
          >
            <PauseCircle className="w-4 h-4" />
          </button>

          {/* Hint */}
          <button
            onClick={handleHint}
            disabled={!lifelines.hint || isSubmitted}
            title={language === 'bn' ? 'দর্শক মতামত / ইঙ্গিত' : 'Audience Hint'}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              lifelines.hint && !isSubmitted
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30'
                : 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed opacity-40'
            }`}
          >
            <Users className="w-4 h-4" />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleBookmark(currentQ.id);
            }}
            title={isBookmarked(currentQ.id) ? (language === 'bn' ? 'সংরক্ষণ বাতিল' : 'Remove Bookmark') : (language === 'bn' ? 'সংরক্ষণ করুন' : 'Bookmark')}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer border ${
              isBookmarked(currentQ.id)
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700/80 hover:text-slate-200'
            }`}
          >
            {isBookmarked(currentQ.id) ? (
              <BookmarkCheck className="w-4 h-4 fill-amber-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Hint Alert if Active */}
      {hintMessage && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-200 text-xs flex items-start gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>{hintMessage}</span>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-4 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>{categoryName || currentQ.categoryId}</span>
          {currentQ.sourceOrExam && (
            <span className="text-[11px] text-amber-400/90 font-medium">
              {currentQ.sourceOrExam}
            </span>
          )}
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
          {currentQ.question[language]}
        </h2>
      </div>

      {/* Options List */}
      <div className="flex flex-col gap-2.5 mb-4">
        {currentQ.options[language].map((optionText, index) => {
          const isHidden = hiddenOptions.includes(index);
          if (isHidden) {
            return (
              <div
                key={index}
                className="h-13 rounded-xl border border-dashed border-slate-800/60 bg-slate-950/30 flex items-center justify-center opacity-30 select-none text-xs text-slate-600"
              >
                — 50:50 দ্বারা অপনীত —
              </div>
            );
          }

          const isSelected = selectedOption === index;
          const isCorrect = index === currentQ.correctIndex;

          let btnClasses = 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 text-slate-200';
          let indicatorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

          if (isSubmitted) {
            if (isCorrect) {
              btnClasses = 'bg-emerald-950/70 border-emerald-600 text-emerald-100 shadow-md shadow-emerald-950/50';
              indicatorClasses = 'bg-emerald-600 text-white border-emerald-500';
            } else if (isSelected) {
              btnClasses = 'bg-red-950/70 border-red-600 text-red-100 shadow-md shadow-red-950/50';
              indicatorClasses = 'bg-red-600 text-white border-red-500';
            } else {
              btnClasses = 'bg-slate-900/40 border-slate-850 text-slate-500 opacity-60';
              indicatorClasses = 'bg-slate-850 text-slate-500 border-slate-800';
            }
          } else if (isSelected) {
            btnClasses = 'bg-amber-500/20 border-amber-500 text-amber-200';
            indicatorClasses = 'bg-amber-500 text-slate-950 border-amber-400 font-bold';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={isSubmitted}
              className={`w-full text-left min-h-[52px] px-3.5 py-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer active:scale-[0.99] ${btnClasses}`}
            >
              <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${indicatorClasses}`}>
                {optionLabels[index]}
              </span>

              <span className="flex-1 text-sm sm:text-base font-medium leading-normal">
                {optionText}
              </span>

              {isSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation Box (Revealed after submission) */}
      {isSubmitted && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {language === 'bn' ? 'তথ্যকণিকা ও সঠিক ব্যাখ্যা' : 'Educational Explanation'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentQ.explanation[language]}
          </p>
        </div>
      )}

      {/* Bottom Floating Action: Next Question */}
      {isSubmitted && (
        <div className="sticky bottom-2 mt-auto pt-2">
          <button
            onClick={handleNextQuestion}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>
              {currentIndex + 1 < totalQuestions
                ? (language === 'bn' ? 'পরবর্তী প্রশ্ন' : 'Next Question')
                : (language === 'bn' ? 'ফলাফল ও মার্কশিট দেখুন' : 'View Results & Scorecard')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
