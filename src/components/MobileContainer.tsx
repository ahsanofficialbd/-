import React from 'react';

interface MobileContainerProps {
  viewMode: 'mobile' | 'wide';
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ viewMode, children }) => {
  if (viewMode === 'wide') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20">
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:py-6 flex items-center justify-center">
      {/* Phone Canvas Container */}
      <div className="w-full md:max-w-[430px] md:h-[890px] md:rounded-[48px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] bg-slate-950 flex flex-col overflow-hidden relative">
        
        {/* Phone Notch / Speaker Island (Desktop only) */}
        <div className="hidden md:flex items-center justify-center pt-2 pb-1 bg-slate-950 shrink-0 select-none">
          <div className="h-5 w-28 bg-slate-900 rounded-full flex items-center justify-between px-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950/80 border border-slate-800/80" />
            <span className="w-10 h-1 bg-slate-800 rounded-full" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col pb-20 relative overscroll-contain">
          {children}
        </div>

        {/* Mobile Home Indicator bar */}
        <div className="hidden md:flex justify-center pb-2 pt-1 bg-slate-950 shrink-0 select-none pointer-events-none">
          <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
        </div>
      </div>
    </div>
  );
};
