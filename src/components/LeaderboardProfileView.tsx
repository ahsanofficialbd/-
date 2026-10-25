import React, { useState } from 'react';
import { 
  User, Award, Zap, Flame, CheckCircle2, 
  BarChart3, Edit3, Check, Trophy, Star
} from 'lucide-react';
import { UserStats, Language } from '../types/quiz';
import { GK_CATEGORIES } from '../data/categories';
import { calculateLevel, saveUserStats } from '../utils/storage';
import { sound } from '../utils/sound';
import { Achievements } from './Achievements';
import { ProgressOverview } from './ProgressOverview';
import { PWAInstallButton } from './PWAInstallButton';
import { DailyReminderCard } from './DailyReminderCard';


interface LeaderboardProfileViewProps {
  userStats: UserStats;
  language: Language;
  onUpdateName: (newName: string) => void;
}

export const LeaderboardProfileView: React.FC<LeaderboardProfileViewProps> = ({
  userStats,
  language,
  onUpdateName,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userStats.name);
  const { level, title, nextLevelXp } = calculateLevel(userStats.xp);

  const accuracy = userStats.totalQuestionsAnswered > 0
    ? Math.round((userStats.correctAnswersCount / userStats.totalQuestionsAnswered) * 100)
    : 0;

  const handleSaveName = () => {
    sound.playClick();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  // Mock competitive leaderboard peers
  const mockLeaderboard = [
    { rank: 1, name: 'আরিফুল ইসলাম (BCS 44)', xp: 2450, badge: '🥇' },
    { rank: 2, name: 'নুসরাত জাহান', xp: 2180, badge: '🥈' },
    { rank: 3, name: userStats.name, xp: Math.max(userStats.xp, 1850), isUser: true, badge: '🥉' },
    { rank: 4, name: 'শাকিল আহমেদ', xp: 1620, badge: '৪' },
    { rank: 5, name: 'ফারহানা ইয়াসমিন', xp: 1410, badge: '৫' },
  ];

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4 py-3 select-none">
      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl relative">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            {userStats.name.charAt(0) || 'জ্ঞ'}
          </div>

          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-slate-950 border border-amber-500/50 rounded-xl px-2.5 py-1 text-sm text-slate-100 font-bold focus:outline-none w-full"
                  maxLength={25}
                />
                <button
                  onClick={handleSaveName}
                  className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100 truncate">
                  {userStats.name}
                </h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-slate-400 hover:text-amber-400 cursor-pointer p-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-amber-400">
                {title[language]}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                {language === 'bn' ? `লেভেল ${level}` : `Level ${level}`}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stat Pill Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800">
          <div className="text-center">
            <span className="text-base font-bold text-slate-100 tabular-nums">
              {userStats.quizzesCompleted}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {language === 'bn' ? 'কুইজ সম্পন্ন' : 'Quizzes'}
            </span>
          </div>

          <div className="text-center">
            <span className="text-base font-bold text-emerald-400 tabular-nums">
              {accuracy}%
            </span>
            <span className="text-[10px] text-slate-400 block">
              {language === 'bn' ? 'সাফল্যের হার' : 'Accuracy'}
            </span>
          </div>

          <div className="text-center">
            <span className="text-base font-bold text-amber-400 tabular-nums">
              {userStats.xp}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {language === 'bn' ? 'মোট XP' : 'Total XP'}
            </span>
          </div>
        </div>
      </div>

      {/* Subject Performance Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-100">
            {language === 'bn' ? 'বিষয়ভিত্তিক দক্ষতা ও পারফরম্যান্স' : 'Subject Mastery Breakdown'}
          </h3>
        </div>

        <div className="space-y-3">
          {GK_CATEGORIES.map((cat) => {
            const stat = userStats.categoryStats[cat.id] || { attempted: 0, correct: 0 };
            const catAcc = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;

            return (
              <div key={cat.id}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">
                    {cat.name[language]}
                  </span>
                  <span className="text-slate-400 tabular-nums text-[11px]">
                    {stat.correct}/{stat.attempted} ({catAcc}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${catAcc}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Overview with Recharts Line Chart */}
      <ProgressOverview userStats={userStats} language={language} />

      {/* Digital Badges & Achievements Component */}
      <Achievements userStats={userStats} language={language} />

      {/* Daily GK Reminder Notifications */}
      <DailyReminderCard language={language} variant="card" />

      {/* PWA App Install Promo */}
      <PWAInstallButton language={language} variant="card" />

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">
              {language === 'bn' ? 'সাপ্তাহিক লিডারবোর্ড' : 'Weekly Leaderboard'}
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">
            {language === 'bn' ? 'শীর্ষ কুইজারবৃন্দ' : 'Top Quizzers'}
          </span>
        </div>

        <div className="space-y-2">
          {mockLeaderboard.map((item) => (
            <div
              key={item.rank}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                item.isUser
                  ? 'bg-amber-500/15 border-amber-500/30 font-bold'
                  : 'bg-slate-950/50 border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 text-center text-sm font-bold">
                  {item.badge}
                </span>
                <span className={item.isUser ? 'text-amber-300' : 'text-slate-200'}>
                  {item.name} {item.isUser && `(${language === 'bn' ? 'আপনি' : 'You'})`}
                </span>
              </div>
              <span className="font-extrabold text-amber-400 tabular-nums">
                {item.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
