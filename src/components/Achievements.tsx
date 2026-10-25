import React, { useState } from 'react';
import { 
  Award, Lock, CheckCircle2, Sparkles, Trophy, 
  Flame, Zap, Star, ShieldCheck, ChevronRight, X
} from 'lucide-react';
import { UserStats, Language } from '../types/quiz';
import { sound } from '../utils/sound';

export interface BadgeDefinition {
  id: string;
  title: {
    bn: string;
    en: string;
  };
  description: {
    bn: string;
    en: string;
  };
  category: 'xp' | 'quizzes' | 'accuracy' | 'streak' | 'subject';
  icon: string;
  color: string;
  currentValue: number;
  targetValue: number;
  progressPercent: number;
  isUnlocked: boolean;
  rewardXp: number;
}

interface AchievementsProps {
  userStats: UserStats;
  language: Language;
}

export const Achievements: React.FC<AchievementsProps> = ({
  userStats,
  language,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<BadgeDefinition | null>(null);

  // Compute stats metrics
  const totalXP = userStats.xp;
  const quizzesCompleted = userStats.quizzesCompleted;
  const correctCount = userStats.correctAnswersCount;
  const totalAttempted = userStats.totalQuestionsAnswered;
  const streak = userStats.streakDays;
  const hasPerfectScore = userStats.completedExamScores.some(
    (s) => s.score === s.total && s.total >= 10
  );
  const bdCorrect = userStats.categoryStats['bangladesh']?.correct || 0;
  const mathCorrect = userStats.categoryStats['math']?.correct || 0;

  // Badge list definitions
  const badgeDefinitions: BadgeDefinition[] = [
    {
      id: 'novice_explorer',
      title: {
        bn: 'প্রথম পদক্ষেপ',
        en: 'Novice Explorer',
      },
      description: {
        bn: 'অ্যাপটিতে আপনার প্রথম কুইজ সফলভাবে সম্পন্ন করুন',
        en: 'Complete your first quiz successfully',
      },
      category: 'quizzes',
      icon: '🌱',
      color: '#10b981',
      currentValue: Math.min(1, quizzesCompleted),
      targetValue: 1,
      progressPercent: Math.min(100, (quizzesCompleted / 1) * 100),
      isUnlocked: quizzesCompleted >= 1,
      rewardXp: 20,
    },
    {
      id: 'fast_learner',
      title: {
        bn: 'ফাস্ট লার্নার (Fast Learner)',
        en: 'Fast Learner',
      },
      description: {
        bn: '৩টি কুইজ সম্পন্ন করে দ্রুত জ্ঞান অর্জনের স্বাক্ষর রাখুন',
        en: 'Complete 3 quizzes to show rapid learning capability',
      },
      category: 'quizzes',
      icon: '⚡',
      color: '#f59e0b',
      currentValue: Math.min(3, quizzesCompleted),
      targetValue: 3,
      progressPercent: Math.min(100, Math.round((quizzesCompleted / 3) * 100)),
      isUnlocked: quizzesCompleted >= 3,
      rewardXp: 50,
    },
    {
      id: 'quiz_master',
      title: {
        bn: 'কুইজ মাস্টার (Quiz Master)',
        en: 'Quiz Master',
      },
      description: {
        bn: 'কুইজ খেলে ৫০০ এর বেশি মোট XP অর্জন করুন',
        en: 'Accumulate 500 or more total XP across quizzes',
      },
      category: 'xp',
      icon: '👑',
      color: '#eab308',
      currentValue: Math.min(500, totalXP),
      targetValue: 500,
      progressPercent: Math.min(100, Math.round((totalXP / 500) * 100)),
      isUnlocked: totalXP >= 500,
      rewardXp: 100,
    },
    {
      id: 'sharpshooter',
      title: {
        bn: 'লক্ষ্যভেদী (Perfect 10/10)',
        en: 'Sharpshooter',
      },
      description: {
        bn: '১০টি প্রশ্নের যেকোনো কুইজে ১০/১০ পূর্ণমান অর্জন করুন',
        en: 'Achieve a 100% score (10/10) in any quiz',
      },
      category: 'accuracy',
      icon: '🎯',
      color: '#ec4899',
      currentValue: hasPerfectScore ? 1 : 0,
      targetValue: 1,
      progressPercent: hasPerfectScore ? 100 : 0,
      isUnlocked: hasPerfectScore,
      rewardXp: 80,
    },
    {
      id: 'knowledge_commander',
      title: {
        bn: 'জ্ঞান সেনাপতি',
        en: 'Knowledge Commander',
      },
      description: {
        bn: 'সর্বমোট ৫০টি প্রশ্নের সঠিক উত্তর দিন',
        en: 'Correctly answer 50 total questions',
      },
      category: 'quizzes',
      icon: '⚔️',
      color: '#8b5cf6',
      currentValue: Math.min(50, correctCount),
      targetValue: 50,
      progressPercent: Math.min(100, Math.round((correctCount / 50) * 100)),
      isUnlocked: correctCount >= 50,
      rewardXp: 120,
    },
    {
      id: 'streak_champion',
      title: {
        bn: 'অটল সাধক (Streak Champion)',
        en: 'Streak Champion',
      },
      description: {
        bn: 'টানা ৩ দিন অ্যাপে কুইজ খেলে ধারাবাহিকতা বজায় রাখুন',
        en: 'Maintain an active daily quiz streak of 3 days',
      },
      category: 'streak',
      icon: '🔥',
      color: '#f97316',
      currentValue: Math.min(3, streak),
      targetValue: 3,
      progressPercent: Math.min(100, Math.round((streak / 3) * 100)),
      isUnlocked: streak >= 3,
      rewardXp: 60,
    },
    {
      id: 'grandmaster_titan',
      title: {
        bn: 'জ্ঞানপীঠ গুরু (Grandmaster)',
        en: 'Grandmaster Titan',
      },
      description: {
        bn: '১,০০০ XP সীমা অতিক্রম করে সাধারণ জ্ঞানের চূড়ায় পৌঁছান',
        en: 'Surpass 1,000 XP to achieve Grandmaster rank',
      },
      category: 'xp',
      icon: '🏆',
      color: '#3b82f6',
      currentValue: Math.min(1000, totalXP),
      targetValue: 1000,
      progressPercent: Math.min(100, Math.round((totalXP / 1000) * 100)),
      isUnlocked: totalXP >= 1000,
      rewardXp: 200,
    },
    {
      id: 'bd_scholar',
      title: {
        bn: 'সোনার বাংলা বিশারদ',
        en: 'Bangladesh Scholar',
      },
      description: {
        bn: 'বাংলাদেশ বিষয়াবলীতে ১০টি প্রশ্নের সঠিক উত্তর দিন',
        en: 'Correctly solve 10 questions in Bangladesh Affairs',
      },
      category: 'subject',
      icon: '🏛️',
      color: '#059669',
      currentValue: Math.min(10, bdCorrect),
      targetValue: 10,
      progressPercent: Math.min(100, Math.round((bdCorrect / 10) * 100)),
      isUnlocked: bdCorrect >= 10,
      rewardXp: 75,
    },
    {
      id: 'math_genius',
      title: {
        bn: 'গণিত জাদুকর (Math Genius)',
        en: 'Math Genius',
      },
      description: {
        bn: 'গণিত ও মানসিক দক্ষতা কুইজে ১০টি সঠিক উত্তর দিন',
        en: 'Correctly solve 10 Mathematics questions',
      },
      category: 'subject',
      icon: '🧮',
      color: '#06b6d4',
      currentValue: Math.min(10, mathCorrect),
      targetValue: 10,
      progressPercent: Math.min(100, Math.round((mathCorrect / 10) * 100)),
      isUnlocked: mathCorrect >= 10,
      rewardXp: 75,
    },
    {
      id: 'century_club',
      title: {
        bn: 'শত প্রশ্ন ক্লাব (Century Club)',
        en: 'Century Club',
      },
      description: {
        bn: 'সর্বমোট ১০০টি প্রশ্নে দক্ষতা যাচাই করার মাইলফলক স্পর্শ করুন',
        en: 'Attempt 100 total questions across all quizzes',
      },
      category: 'quizzes',
      icon: '💎',
      color: '#a855f7',
      currentValue: Math.min(100, totalAttempted),
      targetValue: 100,
      progressPercent: Math.min(100, Math.round((totalAttempted / 100) * 100)),
      isUnlocked: totalAttempted >= 100,
      rewardXp: 150,
    },
  ];

  const unlockedCount = badgeDefinitions.filter((b) => b.isUnlocked).length;
  const totalBadges = badgeDefinitions.length;
  const totalPercent = Math.round((unlockedCount / totalBadges) * 100);

  const filteredBadges = badgeDefinitions.filter((b) => {
    if (filter === 'unlocked') return b.isUnlocked;
    if (filter === 'locked') return !b.isUnlocked;
    return true;
  });

  const handleBadgeClick = (badge: BadgeDefinition) => {
    sound.playClick();
    setSelectedBadge(badge);
    if (badge.isUnlocked) {
      sound.playLifeline();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl relative select-none">
      {/* Component Title & Total Counter */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 leading-tight">
              {language === 'bn' ? 'ডিজিটাল ব্যাজ ও অর্জন' : 'Achievements & Badges'}
            </h3>
            <span className="text-[11px] text-amber-400/90 font-medium">
              {language === 'bn' ? 'XP ও মাইলফলকের ভিত্তিতে আনলকযোগ্য' : 'Unlockable via XP & Milestones'}
            </span>
          </div>
        </div>

        {/* Unlocked Counter Pill */}
        <div className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-bold flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-400 tabular-nums">{unlockedCount}</span>
          <span className="text-slate-500">/ {totalBadges}</span>
        </div>
      </div>

      {/* Overall Unlock Progress Bar */}
      <div className="mb-4 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
          <span className="font-semibold text-slate-300">
            {language === 'bn' ? 'ব্যাজ আনলক করার অগ্রগতি:' : 'Badge Unlock Progress:'}
          </span>
          <span className="text-amber-400 font-bold tabular-nums">
            {totalPercent}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${totalPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs (All / Unlocked / Locked) */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl mb-3.5">
        <button
          onClick={() => {
            sound.playClick();
            setFilter('all');
          }}
          className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-slate-800 text-amber-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {language === 'bn' ? `সবগুলো (${totalBadges})` : `All (${totalBadges})`}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setFilter('unlocked');
          }}
          className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            filter === 'unlocked'
              ? 'bg-slate-800 text-emerald-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {language === 'bn' ? `অর্জিত (${unlockedCount})` : `Unlocked (${unlockedCount})`}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setFilter('locked');
          }}
          className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            filter === 'locked'
              ? 'bg-slate-800 text-slate-200 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {language === 'bn' ? `লকড (${totalBadges - unlockedCount})` : `Locked (${totalBadges - unlockedCount})`}
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredBadges.map((badge) => {
          return (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                badge.isUnlocked
                  ? 'bg-slate-950/70 border-amber-500/30 hover:border-amber-500/60 shadow-md shadow-amber-500/5'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 opacity-75'
              }`}
            >
              <div>
                {/* Header Icon & Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform ${
                      badge.isUnlocked
                        ? 'bg-amber-500/15 shadow-inner'
                        : 'bg-slate-800/80 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  {badge.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{language === 'bn' ? 'অর্জিত' : 'Unlocked'}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-850 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>{language === 'bn' ? 'লকড' : 'Locked'}</span>
                    </span>
                  )}
                </div>

                <h4 className={`text-xs font-bold leading-tight mb-1 line-clamp-1 ${
                  badge.isUnlocked ? 'text-slate-100' : 'text-slate-400'
                }`}>
                  {badge.title[language]}
                </h4>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {badge.description[language]}
                </p>
              </div>

              {/* Progress Bar inside Badge Card */}
              <div className="pt-2 border-t border-slate-800/60">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                  <span>{language === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
                  <span className="tabular-nums font-semibold text-slate-300">
                    {badge.currentValue} / {badge.targetValue}
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      badge.isUnlocked ? 'bg-amber-400' : 'bg-slate-600'
                    }`}
                    style={{ width: `${badge.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl relative text-center">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedBadge(null);
              }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Big Badge Icon */}
            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-3 shadow-xl ${
              selectedBadge.isUnlocked
                ? 'bg-gradient-to-tr from-amber-500/20 to-amber-400/20 border-2 border-amber-500/40 shadow-amber-500/10'
                : 'bg-slate-800/80 border-2 border-slate-700 text-slate-600'
            }`}>
              {selectedBadge.icon}
            </div>

            <div className="inline-block mb-2">
              {selectedBadge.isUnlocked ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অর্জিত ব্যাজ' : 'Unlocked Badge'}</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-xs inline-flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'লকড ব্যাজ' : 'Locked Badge'}</span>
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-100 mb-1">
              {selectedBadge.title[language]}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 max-w-xs mx-auto">
              {selectedBadge.description[language]}
            </p>

            {/* Target Progress Bar */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 mb-4 text-left">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-400">
                  {language === 'bn' ? 'মাইলফলক লক্ষ্য:' : 'Milestone Target:'}
                </span>
                <span className="font-bold text-amber-400 tabular-nums">
                  {selectedBadge.currentValue} / {selectedBadge.targetValue} ({selectedBadge.progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${selectedBadge.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Reward */}
            <div className="flex items-center justify-center gap-2 text-xs text-amber-400 font-semibold mb-4">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>{language === 'bn' ? `অতিরিক্ত পুরস্কার: +${selectedBadge.rewardXp} XP` : `Bonus Reward: +${selectedBadge.rewardXp} XP`}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedBadge(null);
              }}
              className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-100 text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'Got It'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
