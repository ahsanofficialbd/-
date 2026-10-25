import React from 'react';
import { X, CheckCircle2, XCircle, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';
import { Question, Language } from '../types/quiz';
import { sound } from '../utils/sound';

interface QuestionReviewModalProps {
  answers: Array<{
    question: Question;
    userSelected: number | null;
    isCorrect: boolean;
  }>;
  language: Language;
  onClose: () => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const QuestionReviewModal: React.FC<QuestionReviewModalProps> = ({
  answers,
  language,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const optionLabels = language === 'bn' ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end sm:justify-center p-0 sm:p-4 select-none animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-2xl max-h-[90vh] sm:rounded-3xl rounded-t-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              {language === 'bn' ? 'উত্তরপত্র ও বিস্তারিত ব্যাখ্যা' : 'Review Answers & Explanations'}
            </h3>
            <span className="text-xs text-slate-400">
              {language === 'bn' ? `মোট ${answers.length}টি প্রশ্ন` : `Total ${answers.length} questions`}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Questions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {answers.map((item, qIdx) => {
            const q = item.question;
            const bookmarked = isBookmarked(q.id);

            return (
              <div
                key={q.id || qIdx}
                className={`rounded-2xl border p-4 transition-all ${
                  item.isCorrect
                    ? 'bg-slate-950/70 border-emerald-900/50'
                    : 'bg-slate-950/70 border-red-900/50'
                }`}
              >
                {/* Question Header & Status */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 tabular-nums">
                      {qIdx + 1}
                    </span>
                    {item.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === 'bn' ? 'সঠিক (+১)' : 'Correct (+1)'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-red-400">
                        <XCircle className="w-3.5 h-3.5" />
                        {language === 'bn' ? 'ভুল (০)' : 'Incorrect (0)'}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleBookmark(q.id);
                    }}
                    className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                      bookmarked
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-slate-850 text-slate-400 border-slate-750 hover:text-slate-200'
                    }`}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-3.5 h-3.5 fill-amber-400" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Question Text */}
                <h4 className="text-sm sm:text-base font-bold text-slate-100 mb-3 leading-snug">
                  {q.question[language]}
                </h4>

                {/* 4 Options Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {q.options[language].map((optText, optIdx) => {
                    const isCorrectAnswer = optIdx === q.correctIndex;
                    const isUserChoice = optIdx === item.userSelected;

                    let optStyle = 'bg-slate-900/80 border-slate-800 text-slate-400';
                    if (isCorrectAnswer) {
                      optStyle = 'bg-emerald-950/80 border-emerald-600/80 text-emerald-200 font-medium';
                    } else if (isUserChoice) {
                      optStyle = 'bg-red-950/80 border-red-600/80 text-red-200 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-between gap-2 ${optStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold opacity-80">{optionLabels[optIdx]}.</span>
                          <span>{optText}</span>
                        </div>
                        {isCorrectAnswer && (
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">
                            {language === 'bn' ? 'সঠিক' : 'Correct'}
                          </span>
                        )}
                        {isUserChoice && !isCorrectAnswer && (
                          <span className="text-[10px] font-bold text-red-400 uppercase">
                            {language === 'bn' ? 'আপনার উত্তর' : 'Your choice'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-400 block mb-0.5">
                      {language === 'bn' ? 'ব্যাখ্যা:' : 'Explanation:'}
                    </span>
                    <p className="leading-relaxed">{q.explanation[language]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'পর্যালোচনা সমাপ্ত করুন' : 'Close Review'}
          </button>
        </div>
      </div>
    </div>
  );
};
