import React from 'react';
import { Home, Layers, Folder, GraduationCap, BookMarked, User } from 'lucide-react';
import { Language } from '../types/quiz';
import { sound } from '../utils/sound';

export type NavTab = 'home' | 'categories' | 'folders' | 'mock' | 'mistakes' | 'profile';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  mistakesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  mistakesCount,
}) => {
  const tabs = [
    {
      id: 'home' as NavTab,
      label: language === 'bn' ? 'হোম' : 'Home',
      icon: Home,
    },
    {
      id: 'categories' as NavTab,
      label: language === 'bn' ? 'কুইজ জোন' : 'Quizzes',
      icon: Layers,
    },
    {
      id: 'folders' as NavTab,
      label: language === 'bn' ? 'ফোল্ডার' : 'Folders',
      icon: Folder,
    },
    {
      id: 'mock' as NavTab,
      label: language === 'bn' ? 'মক টেস্ট' : 'Mock Test',
      icon: GraduationCap,
    },
    {
      id: 'profile' as NavTab,
      label: language === 'bn' ? 'প্রোফাইল' : 'Profile',
      icon: User,
      badge: mistakesCount > 0 ? mistakesCount : undefined,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl safe-area-pb"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center h-full w-full min-h-[44px] cursor-pointer transition-colors ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight font-medium ${isActive ? 'font-semibold text-amber-400' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
