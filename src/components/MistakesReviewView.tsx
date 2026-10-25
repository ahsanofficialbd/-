import React, { useState } from 'react';
import { 
  BookMarked, Bookmark, Trash2, Play, Sparkles, 
  CheckCircle2, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { Question, Language, UserStats } from '../types/quiz';
import { GK_QUESTIONS } from '../data/questions';
import { sound } from '../utils/sound';

interface MistakesReviewViewProps {
  userStats: UserStats;
  language: Language;
  onStartReTest: (questions: Question[], title: string) => void;
  onRemoveMistake: (questionId: string) => void;
  onToggleBookmark: (questionId: string) => void;
}

export const MistakesReviewView: React.FC<MistakesReviewViewProps> = ({
  userStats,
  language,
  onStartReTest,
  onRemoveMistake,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'mistakes' | 'bookmarks'>('mistakes');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Retrieve questions
  const mistakeQuestions = GK_QUESTIONS.filter((q) =>
    userStats.mistakeQuestionIds.includes(q.id)
  );

  const bookmarkedQuestions = GK_QUESTIONS.filter((q) =>
    userStats.bookmarkedQuestionIds.includes(q.id)
  );

  const displayedList = activeTab === 'mistakes' ? mistakeQuestions : bookmarkedQuestions;

  const handleStartPractice = () => {
    sound.playClick();
    if (displayedList.length === 0) return;
    const count = Math.min(10, displayedList.length);
    const selected = displayedList.slice(0, count);
    const title = activeTab === 'mistakes'
      ? (language === 'bn' ? 'দুর্বলতা সংশোধন কুইজ' : 'Mistakes Revision Quiz')
      : (language === 'bn' ? 'সংরক্ষিত প্রশ্ন কুইজ' : 'Saved Questions Quiz');
    onStartReTest(selected, title);
  };

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4 py-3 select-none">
      {/* Header and Filter Switcher */}
      <div>
        <h2 className="text-lg font-bold text-slate-100 mb-1">
          {language === 'bn' ? 'রিভিশন ও অনুশীলন ডায়েরি' : 'Revision & Notebook'}
        </h2>
        <p className="text-xs text-slate-400 mb-3">
          {language === 'bn' ? 'ভুল উত্তরগুলো পুনরায় ঝালিয়ে নিন ও দক্ষতা বৃদ্ধি করুন' : 'Review incorrect questions and boost accuracy'}
        </p>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('mistakes');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'mistakes'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? `ভুল উত্তর (${mistakeQuestions.length})` : `Mistakes (${mistakeQuestions.length})`}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('bookmarks');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? `সংরক্ষিত (${bookmarkedQuestions.length})` : `Saved (${bookmarkedQuestions.length})`}</span>
          </button>
        </div>
      </div>

      {/* Start Revision Quiz CTA */}
      {displayedList.length > 0 && (
        <button
          onClick={handleStartPractice}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>
            {language === 'bn' 
              ? `এই প্রশ্নগুলো দিয়ে কুইজ দিন (সর্বোচ্চ ১০টি প্রশ্ন)` 
              : `Practice Quiz (${Math.min(10, displayedList.length)} Questions)`}
          </span>
        </button>
      )}

      {/* Empty State */}
      {displayedList.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
            {activeTab === 'mistakes' ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Bookmark className="w-6 h-6 text-amber-400" />}
          </div>
          <h3 className="text-sm font-bold text-slate-200 mb-1">
            {activeTab === 'mistakes'
              ? (language === 'bn' ? 'কোনো ভুল প্রশ্ন নেই!' : 'No mistake questions!')
              : (language === 'bn' ? 'কোনো প্রশ্ন সংরক্ষণ করা হয়নি' : 'No bookmarked questions')}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {activeTab === 'mistakes'
              ? (language === 'bn' ? 'কুইজ খেলার সময় যে প্রশ্নগুলোতে ভুল করবেন সেগুলো এখানে স্বয়ংক্রিয়ভাবে জমা হবে।' : 'Questions you answer incorrectly will appear here.')
              : (language === 'bn' ? 'কুইজ খেলার সময় তারা (Star/Bookmark) চিহ্নে ক্লিক করে প্রশ্ন সংরক্ষণ করতে পারেন।' : 'Click the bookmark icon during quizzes to save questions.')}
          </p>
        </div>
      ) : (
        /* Questions List */
        <div className="flex flex-col gap-2.5">
          {displayedList.map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const correctOpt = q.options[language][q.correctIndex];

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold mb-1">
                      <span>{q.sourceOrExam || 'সাধারণ জ্ঞান'}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                      {q.question[language]}
                    </h4>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {activeTab === 'mistakes' && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onRemoveMistake(q.id);
                        }}
                        title={language === 'bn' ? 'ভুল খাতা থেকে মুছুন' : 'Remove from mistakes'}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs animate-fadeIn space-y-2">
                    <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-200">
                      <span className="font-bold block text-emerald-400 mb-0.5">
                        {language === 'bn' ? 'সঠিক উত্তর:' : 'Correct Answer:'}
                      </span>
                      <span>{correctOpt}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                      <span className="font-bold block text-amber-400 mb-0.5">
                        {language === 'bn' ? 'তথ্য ও ব্যাখ্যা:' : 'Explanation:'}
                      </span>
                      <p className="leading-relaxed">{q.explanation[language]}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
