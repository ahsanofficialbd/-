import React from 'react';
import { 
  Play, Sparkles, Flame, Zap, Award, BookOpen, 
  ArrowRight, CheckCircle2, ChevronRight, Calculator,
  Atom, Scroll, Compass, Newspaper, Landmark, Globe, Folder
} from 'lucide-react';
import { Category, Language, UserStats, DailyFact } from '../types/quiz';
import { calculateLevel } from '../utils/storage';
import { sound } from '../utils/sound';
import { PWAInstallButton } from './PWAInstallButton';
import { DailyReminderCard } from './DailyReminderCard';


interface HomeDashboardProps {
  categories: Category[];
  userStats: UserStats;
  language: Language;
  dailyFact: DailyFact;
  onStartSubjectQuiz: (categoryId: string) => void;
  onStartDailyQuiz: () => void;
  onStartRapidFire: () => void;
  onOpenCategories: () => void;
  onOpenFolders?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  categories,
  userStats,
  language,
  dailyFact,
  onStartSubjectQuiz,
  onStartDailyQuiz,
  onStartRapidFire,
  onOpenCategories,
  onOpenFolders,
}) => {
  const { level, title, nextLevelXp } = calculateLevel(userStats.xp);
  const xpInLevel = userStats.xp % 300;
  const levelProgress = Math.min(100, Math.round((userStats.xp / nextLevelXp) * 100));

  // Icon mapper helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return Calculator;
      case 'Atom': return Atom;
      case 'Scroll': return Scroll;
      case 'Compass': return Compass;
      case 'BookOpen': return BookOpen;
      case 'Newspaper': return Newspaper;
      case 'Landmark': return Landmark;
      case 'Globe': return Globe;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4 py-3 select-none">
      {/* User Progress Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-md shadow-amber-500/20">
              {userStats.name.charAt(0) || 'জ্ঞ'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">
                  {userStats.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {language === 'bn' ? `লেভেল ${level}` : `Lvl ${level}`}
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium">
                {title[language]}
              </p>
            </div>
          </div>

          {/* Streak Badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{language === 'bn' ? `${userStats.streakDays} দিন সক্রিয়` : `${userStats.streakDays} Days`}</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
            <span>{language === 'bn' ? 'অভিজ্ঞতা (XP)' : 'Experience XP'}</span>
            <span className="tabular-nums font-semibold text-slate-300">
              {userStats.xp} / {nextLevelXp} XP
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500" 
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* PWA Install Promo Banner */}
      <PWAInstallButton language={language} variant="card" />

      {/* Featured: Daily 10-Question Challenge */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-900 border border-amber-500/30 rounded-3xl p-4 sm:p-5 relative shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'আজকের স্পেশাল চ্যালেঞ্জ' : "Today's Challenge"}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-tight mb-1">
              {language === 'bn' ? 'দৈনিক সাধারণ জ্ঞান কুইজ' : 'Daily General Knowledge Quiz'}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {language === 'bn' ? '১০টি নির্বাচিত প্রশ্ন • ১০ নম্বর • বোনাস XP' : '10 curated questions • 10 Marks • Bonus XP'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onStartDailyQuiz();
          }}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer active:scale-[0.98] transition-all"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{language === 'bn' ? 'কুইজ শুরু করুন (১০ প্রশ্ন)' : 'Start Quiz (10 Questions)'}</span>
        </button>
      </div>

      {/* Daily GK Reminder Notification Setting */}
      <DailyReminderCard language={language} variant="card" />

      {/* Featured Study Folder Card: সাধারণ জ্ঞান বাংলাদেশ */}
      {onOpenFolders && (
        <div
          onClick={() => {
            sound.playClick();
            onOpenFolders();
          }}
          className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-900/60 hover:border-emerald-700/80 rounded-3xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-md active:scale-[0.99] transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Folder className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {language === 'bn' ? 'স্টাডি ফোল্ডার' : 'Study Folder'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[10px] text-slate-400">
                  {language === 'bn' ? 'সাবফোল্ডার সুবিধা' : 'With Subfolders'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                {language === 'bn' ? 'স্টাডি ফোল্ডার: বাংলাদেশ ও আন্তর্জাতিক' : 'Study Folders: Bangladesh & International'}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                {language === 'bn' ? '‘সাধারণ জ্ঞান বাংলাদেশ’ ও ‘সাধারণ জ্ঞান আন্তর্জাতিক’ সাবফোল্ডার' : 'Organized with customizable subfolders'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 shrink-0 group-hover:text-emerald-300">
            <span>{language === 'bn' ? 'খুলুন' : 'Open'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      )}

      {/* Subject Quizzes Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h3 className="text-base font-bold text-slate-100">
            {language === 'bn' ? 'বিষয়ভিত্তিক কুইজ' : 'Subject Quizzes'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'প্রতিটি কুইজে ১০টি প্রশ্ন ও ১০ নম্বর' : '10 Questions & 10 Marks Each'}
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenCategories();
          }}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-0.5 cursor-pointer py-1"
        >
          <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'View All'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Subject Quizzes (গণিত, বিজ্ঞান, ইতিহাস, ভূগোল, সাহিত্য, সাম্প্রতিক) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {categories.slice(0, 6).map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          const catStat = userStats.categoryStats[cat.id] || { attempted: 0, correct: 0 };
          const accuracy = catStat.attempted > 0 ? Math.round((catStat.correct / catStat.attempted) * 100) : 0;

          return (
            <div
              key={cat.id}
              onClick={() => {
                sound.playClick();
                onStartSubjectQuiz(cat.id);
              }}
              className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between transition-all cursor-pointer active:scale-[0.98] shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: cat.accentBg, color: cat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-750">
                    ১০ প্রশ্ন
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1 mb-0.5">
                  {cat.name[language]}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {cat.description[language]}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-semibold">১০ নম্বর</span>
                <span className="text-slate-400 flex items-center gap-0.5 group-hover:text-slate-200">
                  {language === 'bn' ? 'শুরু' : 'Start'} →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rapid Fire / Fast 60-Second Rush */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-rose-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              {language === 'bn' ? 'র‍্যাপিড ফায়ার কুইজ' : 'Rapid Fire Challenge'}
            </h4>
            <p className="text-[11px] text-slate-400">
              {language === 'bn' ? '৬০ সেকেন্ডে যতগুলো সঠিক উত্তর দিতে পারেন' : 'Answer as many as possible in 60s'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onStartRapidFire();
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-100 text-xs font-bold shrink-0 transition-colors cursor-pointer"
        >
          {language === 'bn' ? 'খেলুন' : 'Play'}
        </button>
      </div>

      {/* Daily GK Fact Capsule */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            {language === 'bn' ? 'আজকের তথ্যকণিকা' : 'Daily Fact Capsule'}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
          {dailyFact.content[language]}
        </p>
        <span className="text-[10px] text-slate-500 font-medium">
          #{dailyFact.tag} · {dailyFact.category[language]}
        </span>
      </div>
    </div>
  );
};
