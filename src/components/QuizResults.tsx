import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { 
  Trophy, RotateCcw, Eye, ArrowLeft, CheckCircle2, 
  XCircle, Clock, Zap, Star, Share2
} from 'lucide-react';
import { Question, Language } from '../types/quiz';
import { sound } from '../utils/sound';

interface QuizResultsProps {
  quizTitle: {
    bn: string;
    en: string;
  };
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  scoreMarks: number;
  totalMarks: number;
  xpEarned: number;
  timeSpentSeconds: number;
  language: Language;
  onRetake: () => void;
  onGoHome: () => void;
  onOpenReview: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  quizTitle,
  totalQuestions,
  correctCount,
  wrongCount,
  scoreMarks,
  totalMarks,
  xpEarned,
  timeSpentSeconds,
  language,
  onRetake,
  onGoHome,
  onOpenReview,
}) => {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isHighScore = percentage >= 60; // Successful completion / high score

  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 400,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [isConfettiActive, setIsConfettiActive] = useState(isHighScore);

  useEffect(() => {
    sound.playVictory();

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop adding pieces after 6 seconds
    if (isHighScore) {
      const timer = setTimeout(() => {
        setIsConfettiActive(false);
      }, 6500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isHighScore]);

  // Performance Rating Badge
  const getVerdict = () => {
    if (percentage === 100) {
      return {
        badge: language === 'bn' ? 'অসাধারণ! পূর্ণমান অর্জন' : 'Flawless! Perfect 100%',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      };
    }
    if (percentage >= 80) {
      return {
        badge: language === 'bn' ? 'দারুণ প্রস্তুতি! মেধাবী স্কোর' : 'Excellent Performance!',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      };
    }
    if (percentage >= 60) {
      return {
        badge: language === 'bn' ? 'সন্তোষজনক! আরেকটু অনুশীলন দরকার' : 'Good Effort! Keep practicing',
        color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      };
    }
    return {
      badge: language === 'bn' ? 'আরও প্রস্তুতি নিন! নিয়মিত কুইজ খেলুন' : 'Needs Practice! Try again',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    };
  };

  const verdict = getVerdict();

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (language === 'bn') {
      return mins > 0 ? `${mins} মি. ${remainingSecs} সে.` : `${remainingSecs} সেকেন্ড`;
    }
    return mins > 0 ? `${mins}m ${remainingSecs}s` : `${remainingSecs}s`;
  };

  return (
    <div className="flex flex-col min-h-full max-w-xl mx-auto px-4 py-5 select-none animate-fadeIn relative">
      {/* React-Confetti celebratory animation on high score or successful quiz */}
      {isConfettiActive && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={percentage === 100 ? 300 : 180}
          gravity={0.22}
          colors={['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )}

      {/* Top Header */}
      <div className="text-center mb-5">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/20 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>

        <h2 className="text-xl font-bold text-slate-100 mb-1">
          {quizTitle[language]}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'bn' ? '১০টি প্রশ্নের কুইজ সম্পন্ন হয়েছে' : '10-question quiz completed'}
        </p>

        <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${verdict.color}`}>
          {verdict.badge}
        </div>
      </div>

      {/* Main Score Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-5 shadow-xl shadow-black/40 relative overflow-hidden">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {language === 'bn' ? 'প্রাপ্ত মোট নম্বর' : 'Total Marks Obtained'}
          </span>
          <div className="flex items-baseline justify-center gap-1.5 mt-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-amber-400 tabular-nums">
              {scoreMarks}
            </span>
            <span className="text-xl text-slate-500 font-bold">
              / {totalMarks}
            </span>
          </div>
          <span className="text-xs text-emerald-400 font-medium">
            {language === 'bn' ? `সাফল্যের হার: ${percentage}%` : `Accuracy: ${percentage}%`}
          </span>
        </div>

        {/* 4-Stat Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-800/80">
          <div className="bg-slate-950/60 rounded-xl p-2.5 text-center border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{language === 'bn' ? 'সঠিক' : 'Correct'}</span>
            </div>
            <span className="text-base font-bold text-slate-100 tabular-nums">{correctCount}</span>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-2.5 text-center border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-red-400 mb-0.5">
              <XCircle className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{language === 'bn' ? 'ভুল' : 'Wrong'}</span>
            </div>
            <span className="text-base font-bold text-slate-100 tabular-nums">{wrongCount}</span>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-2.5 text-center border border-slate-800/60">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{language === 'bn' ? 'অর্জিত XP' : 'Earned XP'}</span>
            </div>
            <span className="text-base font-bold text-amber-400 tabular-nums">+{xpEarned}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? `ব্যয়িত সময়: ${formatTime(timeSpentSeconds)}` : `Time: ${formatTime(timeSpentSeconds)}`}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        {/* Review Answers */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenReview();
          }}
          className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-100 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Eye className="w-4 h-4 text-amber-400" />
          <span>{language === 'bn' ? 'সবগুলো প্রশ্ন ও সঠিক ব্যাখ্যা দেখুন' : 'Review Questions & Explanations'}</span>
        </button>

        {/* Retake */}
        <button
          onClick={() => {
            sound.playClick();
            onRetake();
          }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{language === 'bn' ? 'এই কুইজটি আবার দিন' : 'Retake This Quiz'}</span>
        </button>

        {/* Choose Another Subject */}
        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'অন্য বিষয় নির্বাচন করুন' : 'Select Another Subject'}</span>
        </button>
      </div>
    </div>
  );
};
