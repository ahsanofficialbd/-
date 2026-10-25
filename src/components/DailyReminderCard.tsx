import React, { useState, useEffect } from 'react';
import { 
  Bell, BellRing, BellOff, Clock, Check, 
  AlertCircle, Sparkles, Send, Settings2 
} from 'lucide-react';
import { Language } from '../types/quiz';
import { 
  getNotificationPermission, 
  isNotificationSupported, 
  isDailyReminderEnabled, 
  setDailyReminderEnabled, 
  getDailyReminderTime, 
  setDailyReminderTime, 
  requestNotificationPermission, 
  sendTestNotification,
  NotificationStatus 
} from '../utils/dailyReminder';
import { sound } from '../utils/sound';

interface DailyReminderCardProps {
  language: Language;
  variant?: 'card' | 'compact';
}

export const DailyReminderCard: React.FC<DailyReminderCardProps> = ({
  language,
  variant = 'card',
}) => {
  const [permission, setPermission] = useState<NotificationStatus>('default');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [testSent, setTestSent] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  useEffect(() => {
    setPermission(getNotificationPermission());
    setIsEnabled(isDailyReminderEnabled());
    setSelectedTime(getDailyReminderTime());
  }, []);

  const handleToggle = async () => {
    sound.playClick();
    if (!isNotificationSupported()) {
      return;
    }

    if (permission === 'denied') {
      // Permission blocked by browser
      return;
    }

    if (permission === 'default') {
      setIsRequesting(true);
      const result = await requestNotificationPermission();
      setPermission(result);
      setIsRequesting(false);
      if (result === 'granted') {
        setIsEnabled(true);
        sound.playCorrect();
      }
      return;
    }

    // Permission is granted, toggle state
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    setDailyReminderEnabled(nextState);
    if (nextState) {
      sound.playCorrect();
    }
  };

  const handleTimeChange = (time: string) => {
    sound.playClick();
    setSelectedTime(time);
    setDailyReminderTime(time);
  };

  const handleSendTest = async () => {
    sound.playClick();
    if (permission !== 'granted') {
      setIsRequesting(true);
      const res = await requestNotificationPermission();
      setPermission(res);
      setIsRequesting(false);
      if (res !== 'granted') return;
      setIsEnabled(true);
    }

    const success = await sendTestNotification(language);
    if (success) {
      sound.playCorrect();
      setTestSent(true);
      setTimeout(() => setTestSent(false), 4000);
    }
  };

  const timePresets = [
    { time: '08:00', labelBn: 'সকাল ৮:০০', labelEn: '8:00 AM' },
    { time: '13:00', labelBn: 'দুপুর ১:০০', labelEn: '1:00 PM' },
    { time: '20:00', labelBn: 'রাত ৮:০০', labelEn: '8:00 PM' },
    { time: '21:30', labelBn: 'রাত ৯:৩০', labelEn: '9:30 PM' },
  ];

  if (!isNotificationSupported()) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isEnabled && permission === 'granted' 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {isEnabled && permission === 'granted' ? (
              <BellRing className="w-4 h-4 animate-bounce" />
            ) : (
              <Bell className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-100 truncate">
              {language === 'bn' ? 'দৈনিক কুইজ রিমাইন্ডার' : 'Daily Quiz Reminder'}
            </h4>
            <p className="text-[11px] text-slate-400 truncate">
              {isEnabled && permission === 'granted'
                ? (language === 'bn' ? `প্রতিদিন ${selectedTime} টায় পাঠানো হবে` : `Scheduled daily at ${selectedTime}`)
                : (language === 'bn' ? 'কুইজের নিয়মিত আপডেট ও নোটিফিকেশন পান' : 'Get daily practice prompts')}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={isRequesting}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
            isEnabled && permission === 'granted'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold shadow-md shadow-amber-500/20'
          }`}
        >
          {isEnabled && permission === 'granted'
            ? (language === 'bn' ? 'সক্রিয় ✓' : 'Active ✓')
            : (language === 'bn' ? 'চালু করুন' : 'Enable')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
            isEnabled && permission === 'granted'
              ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {isEnabled && permission === 'granted' ? (
              <BellRing className="w-5 h-5 animate-pulse" />
            ) : (
              <BellOff className="w-5 h-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                {language === 'bn' ? 'দৈনিক কুইজ রিমাইন্ডার' : 'Daily Quiz Reminders'}
              </h3>
              {isEnabled && permission === 'granted' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {language === 'bn' ? 'চালু' : 'Active'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'bn' 
                ? 'ব্রাউজার নোটিফিকেশনের মাধ্যমে দৈনিক ১০টি কুইজ চ্যালেঞ্জ মনে করিয়ে দেবে' 
                : 'Get prompted daily to finish your GK challenge & keep your streak'}
            </p>
          </div>
        </div>

        {/* Master Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={isRequesting || permission === 'denied'}
          aria-label="Toggle Daily Reminder"
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isEnabled && permission === 'granted' ? 'bg-amber-500' : 'bg-slate-850 border-slate-700'
          } ${permission === 'denied' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              isEnabled && permission === 'granted' ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Permission Denied Warning */}
      {permission === 'denied' && (
        <div className="mb-3 p-3 rounded-2xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">
              {language === 'bn' 
                ? 'ব্রাউজারে নোটিফিকেশন বন্ধ করা আছে' 
                : 'Notifications are blocked in your browser'}
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {language === 'bn'
                ? 'ব্রাউজারের অ্যাড্রেস বারের সাইট সেটিংস (আইকন 🔒) থেকে Notification অনুমতি "Allow" বা অনুমতি প্রদান করুন।'
                : 'Please enable notifications for this site in your browser site permissions (lock icon in address bar).'}
            </p>
          </div>
        </div>
      )}

      {/* Reminder Scheduling Options */}
      {permission !== 'denied' && (
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {language === 'bn' ? 'রিমাইন্ডারের সময় নির্বাচন করুন:' : 'Preferred Reminder Time:'}
              </span>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="bg-slate-950 border border-slate-700 hover:border-amber-500/50 rounded-lg px-2 py-0.5 text-xs text-amber-300 font-mono focus:outline-none"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-4 gap-1.5">
              {timePresets.map((preset) => {
                const isSelected = selectedTime === preset.time;
                return (
                  <button
                    key={preset.time}
                    onClick={() => handleTimeChange(preset.time)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {language === 'bn' ? preset.labelBn : preset.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row: Send Test Notification */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] text-slate-400">
              {language === 'bn' 
                ? 'নোটিফিকেশন ঠিকমত কাজ করছে কিনা পরীক্ষা করুন' 
                : 'Verify notifications work on your device'}
            </span>

            <button
              onClick={handleSendTest}
              disabled={isRequesting}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/80 text-amber-300 hover:text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {testSent ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{language === 'bn' ? 'পাঠানো হয়েছে!' : 'Dispatched!'}</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'টেস্ট নোটিফিকেশন' : 'Test Reminder'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
