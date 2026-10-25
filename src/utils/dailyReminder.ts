import { Language } from '../types/quiz';

const REMINDER_ENABLED_KEY = 'gk_reminder_enabled_v1';
const REMINDER_TIME_KEY = 'gk_reminder_time_v1';
const REMINDER_LAST_DATE_KEY = 'gk_reminder_last_notified_date_v1';

export type NotificationStatus = 'granted' | 'denied' | 'default' | 'unsupported';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationStatus {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission as NotificationStatus;
}

export function isDailyReminderEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(REMINDER_ENABLED_KEY) === 'true';
}

export function setDailyReminderEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REMINDER_ENABLED_KEY, String(enabled));
}

export function getDailyReminderTime(): string {
  if (typeof window === 'undefined') return '09:00';
  return localStorage.getItem(REMINDER_TIME_KEY) || '09:00';
}

export function setDailyReminderTime(time: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REMINDER_TIME_KEY, time);
}

/**
 * Requests browser permission for notifications
 */
export async function requestNotificationPermission(): Promise<NotificationStatus> {
  if (!isNotificationSupported()) return 'unsupported';

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setDailyReminderEnabled(true);
    } else if (permission === 'denied') {
      setDailyReminderEnabled(false);
    }
    return permission as NotificationStatus;
  } catch (e) {
    console.error('Failed to request notification permission', e);
    return 'default';
  }
}

export type ExtendedNotificationOptions = NotificationOptions & {
  vibrate?: number[];
  renotify?: boolean;
};

/**
 * Dispatches a notification using either ServiceWorkerRegistration or standard Notification API
 */
async function dispatchNotification(title: string, options: ExtendedNotificationOptions): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;

  const defaultOptions: ExtendedNotificationOptions = {
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [100, 50, 100],
    ...options,
  };

  try {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration && typeof registration.showNotification === 'function') {
          await (registration as any).showNotification(title, defaultOptions);
          return true;
        }
      } catch {
        // Fall back to window Notification
      }
    }

    const n = new Notification(title, defaultOptions as NotificationOptions);
    n.onclick = () => {
      window.focus();
      n.close();
    };
    return true;
  } catch (error) {
    console.error('Error dispatching notification:', error);
    return false;
  }
}

/**
 * Sends an immediate test reminder to verify notifications are functioning
 */
export async function sendTestNotification(language: Language): Promise<boolean> {
  const isBn = language === 'bn';
  const title = isBn 
    ? 'জ্ঞানকোষ GK Master 🏆' 
    : 'Jnankosh GK Master 🏆';
    
  const body = isBn
    ? 'পরীক্ষামূলক নোটিফিকেশন সফল! আপনার দৈনিক সাধারণ জ্ঞান রিমাইন্ডার এখন সম্পূর্ণ সক্রিয়।'
    : 'Test notification successful! Your daily GK challenge reminders are now active.';

  return dispatchNotification(title, {
    body,
    tag: 'gk-test-reminder',
    renotify: true,
  });
}

/**
 * Checks if a daily reminder should be triggered right now
 */
export async function checkAndTriggerDailyReminder(
  language: Language,
  hasCompletedTodayChallenge: boolean
): Promise<boolean> {
  if (!isDailyReminderEnabled()) return false;
  if (getNotificationPermission() !== 'granted') return false;
  if (hasCompletedTodayChallenge) return false;

  const todayStr = new Date().toISOString().split('T')[0];
  const lastNotifiedDate = localStorage.getItem(REMINDER_LAST_DATE_KEY);

  // Already sent notification today
  if (lastNotifiedDate === todayStr) {
    return false;
  }

  // Check if current time is >= configured reminder time
  const reminderTime = getDailyReminderTime(); // e.g. "09:00"
  const [targetHour, targetMinute] = reminderTime.split(':').map(Number);

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const isDue = currentHour > targetHour || (currentHour === targetHour && currentMinute >= targetMinute);
  if (!isDue) {
    return false;
  }

  const isBn = language === 'bn';
  const title = isBn
    ? 'জ্ঞানকোষ GK Master · আজকের চ্যালেঞ্জ 🏆'
    : 'Jnankosh GK Master · Daily Challenge 🏆';

  const body = isBn
    ? 'আজকের ১০টি সাধারণ জ্ঞান প্রশ্ন প্রস্তুত! কুইজ খেলে আপনার দৈনিক ধারাবাহিকতা রক্ষা করুন 🔥'
    : "Today's 10 GK questions are ready! Complete your daily quiz to keep your streak alive 🔥";

  const sent = await dispatchNotification(title, {
    body,
    tag: 'gk-daily-reminder',
    renotify: true,
  });

  if (sent) {
    localStorage.setItem(REMINDER_LAST_DATE_KEY, todayStr);
  }

  return sent;
}
