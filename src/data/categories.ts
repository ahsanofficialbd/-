import { Category } from '../types/quiz';

export const GK_CATEGORIES: Category[] = [
  {
    id: 'math',
    name: {
      bn: 'গণিত ও মানসিক দক্ষতা',
      en: 'Mathematics & Mental Ability',
    },
    description: {
      bn: 'মৌলিক সংখ্যা, শতকরা, ধারা, জ্যামিতি ও লজিক্যাল গণিত',
      en: 'Prime numbers, percentage, series, geometry & logic',
    },
    iconName: 'Calculator',
    color: '#f97316', // Orange
    accentBg: 'rgba(249, 115, 22, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'science',
    name: {
      bn: 'বিজ্ঞান ও প্রযুক্তি',
      en: 'General Science & Technology',
    },
    description: {
      bn: 'পদার্থ, রসায়ন, জীববিজ্ঞান, মানবদেহ ও আধুনিক আইসিটি',
      en: 'Physics, chemistry, biology, human body & ICT',
    },
    iconName: 'Atom',
    color: '#8b5cf6', // Violet
    accentBg: 'rgba(139, 92, 246, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'history',
    name: {
      bn: 'ইতিহাস ও মুক্তিযুদ্ধ',
      en: 'History & Liberation War',
    },
    description: {
      bn: '১৯৭১ মুক্তিযুদ্ধ, ভাষা আন্দোলন, প্রাচীন বাংলা ও বিশ্ব ইতিহাস',
      en: '1971 Liberation War, Language movement & world history',
    },
    iconName: 'Scroll',
    color: '#ef4444', // Red
    accentBg: 'rgba(239, 68, 68, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'geography',
    name: {
      bn: 'ভূগোল ও পরিবেশ',
      en: 'Geography & Environment',
    },
    description: {
      bn: 'নদ-নদী, পর্বতমালা, মহাসাগর, জলবায়ু ও ভৌগোলিক সীমারেখা',
      en: 'Rivers, mountains, oceans, climate & boundary lines',
    },
    iconName: 'Compass',
    color: '#06b6d4', // Cyan
    accentBg: 'rgba(6, 182, 212, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'literature',
    name: {
      bn: 'সাহিত্য ও সংস্কৃতি',
      en: 'Literature & Culture',
    },
    description: {
      bn: 'রবীন্দ্রনাথ, নজরুল, বাংলা ব্যাকরণ, চর্যাপদ ও কালজয়ী গ্রন্থ',
      en: 'Rabindranath, Nazrul, Bengali literature & classic books',
    },
    iconName: 'BookOpen',
    color: '#10b981', // Emerald
    accentBg: 'rgba(16, 185, 129, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'current_affairs',
    name: {
      bn: 'সাম্প্রতিক ঘটনাবলী',
      en: 'Current Affairs (2024-2026)',
    },
    description: {
      bn: 'মেট্রোরেল, কর্ণফুলী টানেল, পদ্মা সেতু, নোবেল ও বৈশ্বিক ঘটনা',
      en: 'Mega projects, Nobel prizes, world summits & sports records',
    },
    iconName: 'Newspaper',
    color: '#3b82f6', // Blue
    accentBg: 'rgba(59, 130, 246, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'bangladesh',
    name: {
      bn: 'বাংলাদেশ বিষয়াবলী',
      en: 'Bangladesh Affairs',
    },
    description: {
      bn: 'সংবিধান, অর্থনীতি, জাতীয় প্রতীক ও ঐতিহ্য',
      en: 'Constitution, economy, national symbols & heritage',
    },
    iconName: 'Landmark',
    color: '#059669', // Green
    accentBg: 'rgba(5, 150, 105, 0.12)',
    totalQuestionsCount: 10,
  },
  {
    id: 'international',
    name: {
      bn: 'আন্তর্জাতিক বিষয়াবলী',
      en: 'International Affairs',
    },
    description: {
      bn: 'জাতিসংঘ, বিশ্ব সংস্থা, রাজধানী, মুদ্রা ও প্রণালী',
      en: 'UN, global treaties, world capitals, currencies & straits',
    },
    iconName: 'Globe',
    color: '#d946ef', // Fuchsia
    accentBg: 'rgba(217, 70, 239, 0.12)',
    totalQuestionsCount: 10,
  },
];
