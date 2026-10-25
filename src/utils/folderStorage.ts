import { GKFolder, GKSubfolder, GKNote } from '../types/quiz';

const FOLDERS_KEY = 'gk_master_folders_v1';

export const DEFAULT_BANGLADESH_FOLDER: GKFolder = {
  id: 'folder_gk_bangladesh',
  name: 'সাধারণ জ্ঞান বাংলাদেশ',
  description: 'বাংলাদেশের মুক্তিযুদ্ধ, সংবিধান, মেগা প্রকল্প, ভূগোল ও ইতিহাস সংক্রান্ত নোট এবং প্রশ্ন সংগ্রহের প্রধান ফোল্ডার।',
  color: '#059669',
  iconName: 'Landmark',
  subfolders: [
    {
      id: 'sub_bd_liberation',
      name: 'মুক্তিযুদ্ধ ও স্বাধীনতা সংগ্রাম',
      description: '১৯৭১ সালের যুদ্ধ, ৭ বীরশ্রেষ্ঠ, সেক্টর ও ঐতিহাসিক দিনপঞ্জি',
      color: '#ef4444',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['hist_1', 'hist_2', 'hist_3', 'hist_7', 'hist_8'],
      notes: [
        {
          id: 'note_1',
          title: '৭ বীরশ্রেষ্ঠ সংক্ষিপ্ত তালিকা',
          content: 'বীরশ্রেষ্ঠ মোট ৭ জন: হামিদুর রহমান (সর্বকনিষ্ঠ), মতিউর রহমান, মোস্তফা কামাল, মুন্সী আব্দুর রউফ, নূর মোহাম্মদ শেখ, রুহুল আমিন এবং মহিউদ্দীন জাহাঙ্গীর।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_bd_constitution',
      name: 'সংবিধান ও শাসনব্যবস্থা',
      description: 'সংবিধানের ৪ মূলনীতি, অনুচ্ছেদ ও রাষ্ট্রীয় প্রতীক',
      color: '#10b981',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['bd_1', 'bd_2', 'bd_4', 'bd_7'],
      notes: [
        {
          id: 'note_2',
          title: 'সংবিধানের গুরুত্বপূর্ণ তথ্য',
          content: 'সংবিধান কার্যকর ১৬ ডিসেম্বর ১৯৭২। রাষ্ট্রীয় মূলনীতি ৪টি: জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র ও ধর্মনিরপেক্ষতা। মোট অনুচ্ছেদ ১৫৩টি।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_bd_megaprojects',
      name: 'মেগা প্রজেক্ট ও আধুনিক বাংলাদেশ',
      description: 'পদ্মা সেতু, মেট্রোরেল, বঙ্গবন্ধু টানেল ও রূপপুর পারমাণবিক প্রকল্প',
      color: '#3b82f6',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['bd_2', 'bd_10', 'ca_1', 'ca_2', 'ca_9'],
      notes: [
        {
          id: 'note_3',
          title: 'পদ্মা সেতু ও মেট্রোরেল নোট',
          content: 'পদ্মা সেতুর দৈর্ঘ্য ৬.১৫ কিমি, স্প্যান ৪১টি, পিলার ৪২টি। ঢাকা মেট্রোরেল (এমআরটি-৬) প্রথম বাণিজ্যিকভাবে চালু হয় ২৮ ডিসেম্বর ২০২২।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_bd_geography',
      name: 'ভূগোল, নদ-নদী ও জাতীয় সম্পদ',
      description: 'পাহাড়ি দ্বীপ মহেশখালী, সেন্টমার্টিন, কর্কটক্রান্তি ও সুন্দরবন',
      color: '#06b6d4',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['bd_3', 'bd_5', 'bd_9', 'geo_1', 'geo_7'],
      notes: [
        {
          id: 'note_4',
          title: 'বাংলাদেশের ভৌগোলিক সীমানা',
          content: 'সর্বউত্তরের উপজেলা তেঁতুলিয়া (বাংলাবান্ধা), সর্বদক্ষিণের বিন্দু ছেঁড়াদ্বীপ। কর্কটক্রান্তি রেখা (২৩.৫° উত্তর) বাংলাদেশের মধ্য দিয়ে অতিক্রম করেছে।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
  ],
};

export const DEFAULT_INTERNATIONAL_FOLDER: GKFolder = {
  id: 'folder_gk_international',
  name: 'সাধারণ জ্ঞান আন্তর্জাতিক',
  description: 'জাতিসংঘ, বিশ্ব রাজনীতি, নোবেল পুরস্কার, আন্তর্জাতিক সংস্থা, রাজধানী, মুদ্রা ও প্রণালী সংক্রান্ত নোট এবং প্রশ্ন সংগ্রহের প্রধান ফোল্ডার।',
  color: '#3b82f6',
  iconName: 'Globe',
  subfolders: [
    {
      id: 'sub_intl_un',
      name: 'জাতিসংঘ ও আন্তর্জাতিক সংস্থাসমূহ',
      description: 'জাতিসংঘ (UN), নিরাপত্তা পরিষদ, আইসিজে (ICJ), ডব্লিউটিও ও সদর দপ্তর',
      color: '#3b82f6',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['intl_1', 'intl_3', 'intl_5', 'intl_6', 'intl_7'],
      notes: [
        {
          id: 'intl_note_1',
          title: 'জাতিসংঘের গুরুত্বপূর্ণ তথ্য',
          content: 'জাতিসংঘ প্রতিষ্ঠিত হয় ২৪ অক্টোবর ১৯৪৫। প্রধান সদর দপ্তর নিউইয়র্ক। সাধারণ পরিষদে ১৯৩টি সদস্য রাষ্ট্র রয়েছে। নিরাপত্তা পরিষদের স্থায়ী সদস্য ৫টি: যুক্তরাষ্ট্র, যুক্তরাজ্য, রাশিয়া, ফ্রান্স ও চীন।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_intl_nobel',
      name: 'নোবেল পুরস্কার ও বৈশ্বিক খেতাব',
      description: 'অসলো ও স্টকহোমের নোবেল পুরস্কার, ইতিহাস ও বিশিষ্ট ব্যক্তিত্ব',
      color: '#f59e0b',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['intl_2', 'lit_1'],
      notes: [
        {
          id: 'intl_note_2',
          title: 'নোবেল পুরস্কারের নিয়মাবলী',
          content: '১৯০১ সাল থেকে সুইডিশ বিজ্ঞানী আলফ্রেড নোবেলের উইলে ৫টি ক্ষেত্রে এবং ১৯৬৮ সালে অর্থনীতিতে নোবেল প্রবর্তিত হয়। শান্তিতে নোবেল অসলো (নরওয়ে) এবং বাকি ৫টি স্টকহোম (সুইডেন) থেকে প্রদান করা হয়।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_intl_straits',
      name: 'প্রণালী, সাগর ও আন্তর্জাতিক ভূগোল',
      description: 'মালাক্কা প্রণালী, বেরিং প্রণালী, সুয়েজ খাল ও বিশ্বের দীর্ঘতম নদী',
      color: '#06b6d4',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['intl_7', 'intl_9', 'geo_2', 'geo_4', 'geo_5'],
      notes: [
        {
          id: 'intl_note_3',
          title: 'আন্তর্জাতিক প্রণালী ও খাল',
          content: 'সুয়েজ খাল (মিশর) ভূমধ্যসাগর ও লোহিত সাগরকে যুক্ত করেছে। বেরিং প্রণালী এশিয়া ও উত্তর আমেরিকাকে বিভক্ত করেছে। মালাক্কা প্রণালী ভারত ও প্রশান্ত মহাসাগরকে যুক্ত করেছে।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_intl_summits',
      name: 'ন্যাটো, বৈশ্বিক চুক্তি ও সাম্প্রতিক জোট',
      description: 'ন্যাটো সামরিক জোটের ৩২তম সদস্য সুইডেন, জাতিসংঘ সম্মেলন ও অলিম্পিক',
      color: '#8b5cf6',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['ca_3', 'ca_4', 'ca_5', 'ca_7', 'ca_8', 'ca_10'],
      notes: [
        {
          id: 'intl_note_4',
          title: 'ন্যাটো ও আন্তর্জাতিক সাম্প্রতিক',
          content: 'ন্যাটোর বর্তমান সদস্য সংখ্যা ৩২টি। সর্বশেষ সুইডেন ৭ মার্চ ২০২৪ ন্যাটোর ৩২তম সদস্য হিসেবে যোগদান করে। বিশ্ব স্বাস্থ্য সংস্থা (WHO) এর মহাপরিচালক ড. টেড্রোস আধানম গ্যাব্রিয়েসুস।',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
    {
      id: 'sub_intl_aliases',
      name: 'উপনাম',
      description: 'বিশ্বের বিখ্যাত দেশ, নগরী, সাগর ও ভৌগোলিক স্থানের ডাকনাম ও উপনাম (International Aliases)',
      color: '#f59e0b',
      createdAt: '২৪ অক্টোবর ২০২৬',
      questionIds: ['alias_1', 'alias_2', 'alias_3', 'alias_4', 'alias_5', 'alias_6', 'alias_7', 'alias_8', 'alias_9', 'alias_10', 'intl_3'],
      notes: [
        {
          id: 'alias_note_1',
          title: 'দেশসমূহের বিখ্যাত ভৌগোলিক উপনাম (Country Aliases)',
          content: '• সূর্যোদয়ের দেশ: জাপান\n• নিশীথ সূর্যের দেশ: নরওয়ে (হ্যামারফেস্ট)\n• হাজার হ্রদের দেশ: ফিনল্যান্ড\n• বজ্রপাতের দেশ (Land of Thunder Dragon): ভুটান\n• সাদা হাতির দেশ: থাইল্যান্ড\n• ক্যাঙ্গারুর দেশ: অস্ট্রেলিয়া\n• চিনির পাত্র (Sugar Bowl of the World): কিউবা\n• ইউরোপের ককপিট / রণক্ষেত্র: বেলজিয়াম\n• ইউরোপের খেলার মাঠ: সুইজারল্যান্ড\n• লবঙ্গ দ্বীপ: জাঞ্জিবার (তানজানিয়া)\n• মুক্তার দ্বীপ: বাহরাইন\n• দারুচিনির দ্বীপ: শ্রীলঙ্কা\n• নীল নদের দান: মিশর\n• ম্যাপল পাতার দেশ: কানাডা\n• প্রাচ্যের গ্রেট ব্রিটেন: জাপান\n• সোনালী আঁশের দেশ: বাংলাদেশ\n• ভাটির দেশ: বাংলাদেশ\n• পবিত্র ভূমি: ফিলিস্তিন ও জেরুজালেম',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
        {
          id: 'alias_note_2',
          title: 'বিশ্বের বিখ্যাত শহরসমূহের উপনাম (City Aliases)',
          content: '• সাত পাহাড়ের শহর ও অমর শহর (Eternal City): রোম, ইতালি\n• বিগ অ্যাপল (The Big Apple) ও গগনচুম্বী অট্টালিকার শহর: নিউইয়র্ক, যুক্তরাষ্ট্র\n• বাতাসের শহর (Windy City): শিকাগো, যুক্তরাষ্ট্র\n• মোটরগাড়ির শহর (Motor City): ডেট্রয়েট, যুক্তরাষ্ট্র\n• সম্মেলনের শহর ও শান্তির শহর: জেনেভা, সুইজারল্যান্ড\n• সোনালী তোরণের শহর (City of Golden Gate): সান ফ্রান্সিসকো, যুক্তরাষ্ট্র\n• নিষিদ্ধ শহর (Forbidden City): লাসা, তিব্বত\n• খালের শহর ও প্রাচ্যের ভেনিস: ব্যাংকক, থাইল্যান্ড\n• গোলাপী শহর (Pink City): জয়পুর, ভারত\n• প্রাসাদের শহর (City of Palaces): কলকাতা, ভারত\n• লাইট অব দ্য ওয়ার্ল্ড / আলোর শহর: প্যারিস, ফ্রান্স\n• মসজিদের শহর: ঢাকা, বাংলাদেশ\n• প্রাচ্যের ড্যান্ডি: নারায়ণগঞ্জ, বাংলাদেশ',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
        {
          id: 'alias_note_3',
          title: 'ভৌগোলিক স্থান, প্রণালী ও অঞ্চলের উপনাম (Place & Geographic Aliases)',
          content: '• পৃথিবীর ছাদ (Roof of the World): পামির মালভূমি (তাজিকিস্তান)\n• ভূমধ্যসাগরের চাবি / প্রবেশদ্বার: জিব্রাল্টার প্রণালী\n• অশ্রুর প্রবেশদ্বার (Gate of Tears): বাবেল মান্দেব প্রণালী\n• পৃথিবীর রুটির ঝুড়ি (Bread Basket of the World): উত্তর আমেরিকার প্রেইরি অঞ্চল\n• হারকিউলিসের স্তম্ভ: জিব্রাল্টার প্রণালীর উভয় তীরের পাহাড়\n• অন্ধকারের মহাদেশ: আফ্রিকা\n• সাদা মানুষের কবরখানা: গিনি উপকূল\n• পৃথিবীর কসাইখানা: শিকাগো\n• পপ সঙ্গীতের শহর: লিভারপুল',
          createdAt: '২৪ অক্টোবর ২০২৬',
        },
      ],
    },
  ],
};

export const ALIAS_SUBFOLDER: GKSubfolder = DEFAULT_INTERNATIONAL_FOLDER.subfolders[4];

export function getFolders(): GKFolder[] {
  if (typeof window === 'undefined') return [DEFAULT_BANGLADESH_FOLDER, DEFAULT_INTERNATIONAL_FOLDER];
  try {
    const raw = localStorage.getItem(FOLDERS_KEY);
    if (!raw) {
      saveFolders([DEFAULT_BANGLADESH_FOLDER, DEFAULT_INTERNATIONAL_FOLDER]);
      return [DEFAULT_BANGLADESH_FOLDER, DEFAULT_INTERNATIONAL_FOLDER];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveFolders([DEFAULT_BANGLADESH_FOLDER, DEFAULT_INTERNATIONAL_FOLDER]);
      return [DEFAULT_BANGLADESH_FOLDER, DEFAULT_INTERNATIONAL_FOLDER];
    }

    const hasBangladesh = parsed.some((f: GKFolder) => f.name.includes('বাংলাদেশ'));
    const hasInternational = parsed.some((f: GKFolder) => f.name.includes('আন্তর্জাতিক'));
    let updated = [...parsed];
    if (!hasBangladesh) updated.unshift(DEFAULT_BANGLADESH_FOLDER);
    if (!hasInternational) updated.push(DEFAULT_INTERNATIONAL_FOLDER);

    // Ensure 'উপনাম' subfolder is present in 'সাধারণ জ্ঞান আন্তর্জাতিক'
    const intlFolder = updated.find((f: GKFolder) => f.name.includes('আন্তর্জাতিক'));
    if (intlFolder) {
      const hasAlias = intlFolder.subfolders.some(
        (s: GKSubfolder) => s.name === 'উপনাম' || s.id === 'sub_intl_aliases'
      );
      if (!hasAlias) {
        intlFolder.subfolders.push(ALIAS_SUBFOLDER);
        saveFolders(updated);
      }
    }

    if (!hasBangladesh || !hasInternational) saveFolders(updated);

    return updated;
  } catch {
    return [DEFAULT_BANGLADESH_FOLDER, DEFAULT_INTERNATIONAL_FOLDER];
  }
}

export function saveFolders(folders: GKFolder[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (e) {
    console.error('Failed to save folders', e);
  }
}

export function addSubfolderToFolder(
  folderId: string,
  newSubfolder: {
    name: string;
    description: string;
    color: string;
    questionIds?: string[];
  }
): GKFolder[] {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return folders;

  const subfolder: GKSubfolder = {
    id: `sub_${Date.now()}`,
    name: newSubfolder.name.trim(),
    description: newSubfolder.description.trim() || 'কাস্টম সাবফোল্ডার',
    color: newSubfolder.color || '#f59e0b',
    createdAt: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }),
    questionIds: newSubfolder.questionIds || [],
    notes: [],
  };

  folder.subfolders.push(subfolder);
  saveFolders(folders);
  return folders;
}

export function updateSubfolderInFolder(
  folderId: string,
  subfolderId: string,
  updates: {
    name: string;
    description: string;
    color: string;
  }
): GKFolder[] {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return folders;

  const subfolder = folder.subfolders.find((s) => s.id === subfolderId);
  if (subfolder) {
    subfolder.name = updates.name.trim();
    subfolder.description = updates.description.trim();
    subfolder.color = updates.color;
    saveFolders(folders);
  }
  return folders;
}

export function deleteSubfolderFromFolder(folderId: string, subfolderId: string): GKFolder[] {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return folders;

  folder.subfolders = folder.subfolders.filter((s) => s.id !== subfolderId);
  saveFolders(folders);
  return folders;
}

export function toggleQuestionInSubfolder(
  folderId: string,
  subfolderId: string,
  questionId: string
): boolean {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return false;

  const subfolder = folder.subfolders.find((s) => s.id === subfolderId);
  if (!subfolder) return false;

  const exists = subfolder.questionIds.includes(questionId);
  if (exists) {
    subfolder.questionIds = subfolder.questionIds.filter((id) => id !== questionId);
  } else {
    subfolder.questionIds.push(questionId);
  }

  saveFolders(folders);
  return !exists;
}

export function addNoteToSubfolder(
  folderId: string,
  subfolderId: string,
  note: { title: string; content: string }
): GKFolder[] {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return folders;

  const subfolder = folder.subfolders.find((s) => s.id === subfolderId);
  if (!subfolder) return folders;

  subfolder.notes.unshift({
    id: `note_${Date.now()}`,
    title: note.title.trim(),
    content: note.content.trim(),
    createdAt: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' }),
  });

  saveFolders(folders);
  return folders;
}

export function deleteNoteFromSubfolder(
  folderId: string,
  subfolderId: string,
  noteId: string
): GKFolder[] {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return folders;

  const subfolder = folder.subfolders.find((s) => s.id === subfolderId);
  if (!subfolder) return folders;

  subfolder.notes = subfolder.notes.filter((n) => n.id !== noteId);
  saveFolders(folders);
  return folders;
}
