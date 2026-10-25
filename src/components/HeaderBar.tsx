import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flame, Smartphone, Monitor, Bell, BellRing } from 'lucide-react';
import { Language } from '../types/quiz';
import { sound } from '../utils/sound';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  getNotificationPermission, 
  isDailyReminderEnabled, 
  setDailyReminderEnabled, 
  requestNotificationPermission, 
  isNotificationSupported 
} from '../utils/dailyReminder';

interface HeaderBarProps {
  language: Language;
  onToggleLanguage: () => void;
  viewMode: 'mobile' | 'wide';
  onToggleViewMode: () => void;
  streakDays: number;
  xp: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  language,
  onToggleLanguage,
  viewMode,
  onToggleViewMode,
  streakDays,
  xp,
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getMuted());
  const [reminderActive, setReminderActive] = useState<boolean>(() => {
    return isNotificationSupported() && getNotificationPermission() === 'granted' && isDailyReminderEnabled();
  });

  useEffect(() => {
    const updateReminderState = () => {
      setReminderActive(
        isNotificationSupported() && 
        getNotificationPermission() === 'granted' && 
        isDailyReminderEnabled()
      );
    };
    updateReminderState();
    window.addEventListener('focus', updateReminderState);
    return () => window.removeEventListener('focus', updateReminderState);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  const handleToggleReminder = async () => {
    sound.playClick();
    if (!isNotificationSupported()) return;

    const perm = getNotificationPermission();
    if (perm === 'default') {
      const res = await requestNotificationPermission();
      if (res === 'granted') {
        sound.playCorrect();
        setReminderActive(true);
      }
      return;
    }

    if (perm === 'granted') {
      const next = !reminderActive;
      setDailyReminderEnabled(next);
      setReminderActive(next);
      if (next) sound.playCorrect();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 select-none">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-bold text-base">
            জ্ঞ
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 tracking-tight leading-none">
              {language === 'bn' ? 'জ্ঞানকোষ GK' : 'Jnankosh GK'}
            </h1>
            <span className="text-[11px] text-amber-400/90 font-medium leading-none">
              {language === 'bn' ? 'সাধারণ জ্ঞান মাস্টার' : 'GK Master App'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak Indicator */}
          <div 
            title={language === 'bn' ? `ধারাবাহিকতা: ${streakDays} দিন` : `Streak: ${streakDays} days`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span className="tabular-nums">{streakDays}</span>
          </div>

          {/* XP Pill */}
          <div className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
            <span className="text-amber-400 font-bold">★</span>
            <span className="tabular-nums">{xp} XP</span>
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton language={language} variant="header" />

          {/* Language Switcher */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleLanguage();
            }}
            aria-label="Toggle Language"
            className="h-8 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center cursor-pointer"
          >
            {language === 'bn' ? 'EN' : 'বাংলা'}
          </button>

          {/* Daily Reminder Bell Toggle */}
          {isNotificationSupported() && (
            <button
              onClick={handleToggleReminder}
              aria-label="Toggle Daily Reminder"
              title={reminderActive 
                ? (language === 'bn' ? 'দৈনিক কুইজ রিমাইন্ডার সক্রিয়' : 'Daily Quiz Reminder Active') 
                : (language === 'bn' ? 'দৈনিক কুইজ রিমাইন্ডার চালু করুন' : 'Enable Daily Quiz Reminder')}
              className={`w-8 h-8 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
                reminderActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {reminderActive ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-slate-100 transition-colors flex items-center justify-center cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* View Mode Toggle (Mobile / Wide) */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleViewMode();
            }}
            title={viewMode === 'mobile' ? (language === 'bn' ? 'ওয়াইড ভিউ' : 'Wide View') : (language === 'bn' ? 'মোবাইল ফ্রেম' : 'Mobile Frame')}
            aria-label="Toggle View Mode"
            className="hidden sm:flex w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-slate-100 transition-colors items-center justify-center cursor-pointer"
          >
            {viewMode === 'mobile' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
