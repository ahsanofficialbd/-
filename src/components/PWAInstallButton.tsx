import React, { useState } from 'react';
import { Download, CheckCircle2, Share, PlusSquare, X, Smartphone, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types/quiz';
import { sound } from '../utils/sound';

interface PWAInstallButtonProps {
  language: Language;
  variant?: 'header' | 'card' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ language, variant = 'header' }) => {
  const { isInstalled, isStandalone, isIOS, hasNativePrompt, promptInstall } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);

  // If running already inside installed standalone app, do not show install prompt
  if (isStandalone) {
    return null;
  }

  const handleInstallClick = async () => {
    sound.playClick();
    if (hasNativePrompt) {
      const outcome = await promptInstall();
      if (outcome === 'accepted') {
        sound.playCorrect();
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 5000);
      }
    } else {
      // Show guide modal for iOS or browsers waiting on user trigger
      setShowGuideModal(true);
    }
  };

  return (
    <>
      {/* 1. Header Variant */}
      {variant === 'header' && (
        <button
          onClick={handleInstallClick}
          title={language === 'bn' ? 'অ্যাপটি ফোনে ইনস্টল করুন' : 'Install App on Device'}
          className={`h-8 px-2.5 sm:px-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
            installSuccess || isInstalled
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-400/30 border-amber-500/40 text-amber-300 hover:text-amber-200 shadow-amber-500/10'
          }`}
        >
          {installSuccess || isInstalled ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xs:inline">
                {language === 'bn' ? 'ইনস্টলড' : 'Installed'}
              </span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>
                {language === 'bn' ? 'ইনস্টল' : 'Install'}
              </span>
            </>
          )}
        </button>
      )}

      {/* 2. Card / Dashboard Variant */}
      {variant === 'card' && !isInstalled && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 p-4 shadow-lg shadow-amber-950/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-amber-400 text-lg">
                  জ্ঞ
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-100">
                    {language === 'bn' ? 'মোবাইলে ইনস্টল করুন' : 'Install on Your Device'}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    PWA
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {language === 'bn' 
                    ? 'হোম স্ক্রিনে যুক্ত করে সম্পূর্ণ অ্যাপের মতো সহজে কুইজ খেলুন' 
                    : 'Add to home screen for fullscreen fast offline quiz access'}
                </p>
              </div>
            </div>

            <button
              onClick={handleInstallClick}
              className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'bn' ? 'ইনস্টল' : 'Install'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal for iOS / Non-automated installation */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl text-slate-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* App branding */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold text-slate-950 text-xl">
                জ্ঞ
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">
                  {language === 'bn' ? 'জ্ঞানকোষ GK Master' : 'Jnankosh GK Master'}
                </h4>
                <p className="text-xs text-amber-400 font-medium">
                  {language === 'bn' ? 'হোম স্ক্রিন অ্যাপ হিসেবে ইনস্টলেশন' : 'Add to Home Screen'}
                </p>
              </div>
            </div>

            {/* Instructions */}
            {isIOS ? (
              <div className="space-y-3.5 text-xs text-slate-300">
                <p className="text-slate-400">
                  {language === 'bn' 
                    ? 'আইফোন ও আইপ্যাডে অ্যাপটি ইনস্টল করতে নিচের ধাপগুলো অনুসরণ করুন:' 
                    : 'To install on iPhone or iPad Safari, follow these simple steps:'}
                </p>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">
                      {language === 'bn' ? '১. নিচে Share আইকনে ট্যাপ করুন' : '1. Tap the Share button'}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'Safari ব্রাউজারের নিচের মেনুবারে পাবেন' : 'Located at the bottom of Safari browser'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">
                      {language === 'bn' ? '২. "Add to Home Screen" নির্বাচন করুন' : '2. Tap "Add to Home Screen"'}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'স্ক্রল করে "হোম স্ক্রিনে যোগ করুন" চাপুন' : 'Scroll down to find Add to Home Screen'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">
                      {language === 'bn' ? '৩. উপরে "Add" চাপুন' : '3. Tap "Add"'}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'অ্যাপটি আপনার ডিভাইসের হোম স্ক্রিনে যুক্ত হবে' : 'The app icon is now on your home screen!'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs text-slate-300">
                <p className="text-slate-400">
                  {language === 'bn'
                    ? 'আপনার ব্রাউজার মেনু (তিনটি বিন্দু) থেকে খুব সহজেই অ্যাপটি ফোনে বা কম্পিউটারে যুক্ত করতে পারেন:'
                    : 'You can install this app directly from your browser menu:'}
                </p>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">
                      {language === 'bn' ? 'ব্রাউজার মেনু খুলুন' : 'Open browser menu (⋮)'}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'উপরে ডানদিকের ৩টি ডট চাপুন' : 'Click the 3 dots in upper right corner'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">
                      {language === 'bn' ? '"Install app" বা "Add to Home screen"' : 'Select "Install app"'}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'ইনস্টল বাটনে ক্লিক করে নিশ্চিত করুন' : 'Confirm installation in the prompt'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits summary */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {language === 'bn' ? 'অফলাইন ও দ্রুত অ্যাক্সেস' : 'Fast & Offline Ready'}
              </span>

              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
              >
                {language === 'bn' ? 'বুঝেছি' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
