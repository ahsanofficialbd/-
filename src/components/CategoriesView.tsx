import React from 'react';
import { 
  Calculator, Atom, Scroll, Compass, BookOpen, 
  Newspaper, Landmark, Globe, Play, Sparkles, PlusCircle,
  CheckCircle2
} from 'lucide-react';
import { Category, Language, UserStats } from '../types/quiz';
import { sound } from '../utils/sound';

interface CategoriesViewProps {
  categories: Category[];
  userStats: UserStats;
  language: Language;
  onSelectCategory: (categoryId: string) => void;
  onOpenAICreator: () => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  userStats,
  language,
  onSelectCategory,
  onOpenAICreator,
}) => {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100">
            {language === 'bn' ? 'কুইজ জোন (বিষয়ভিত্তিক)' : 'Subject Quiz Zone'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'পছন্দের বিষয়টি বেছে নিয়ে দক্ষতা যাচাই করুন' : 'Choose a subject to test your knowledge'}
          </p>
        </div>

        {/* AI Custom Quiz Trigger */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenAICreator();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold cursor-pointer transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{language === 'bn' ? 'কাস্টম AI কুইজ' : 'Custom AI Quiz'}</span>
        </button>
      </div>

      {/* Categories Cards List */}
      <div className="flex flex-col gap-3">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          const stats = userStats.categoryStats[cat.id] || { attempted: 0, correct: 0 };
          const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

          return (
            <div
              key={cat.id}
              onClick={() => {
                sound.playClick();
                onSelectCategory(cat.id);
              }}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all cursor-pointer active:scale-[0.99] group shadow-sm"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: cat.accentBg, color: cat.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                      {cat.name[language]}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1 mb-1.5">
                    {cat.description[language]}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-amber-400">১০টি প্রশ্ন • ১০ নম্বর</span>
                    {stats.attempted > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          {accuracy}% দক্ষতা ({stats.correct}/{stats.attempted})
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Start Action */}
              <button
                className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-all shadow-sm"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
