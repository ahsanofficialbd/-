import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, Trophy, ArrowRight, RotateCcw, XCircle, CheckCircle2 } from 'lucide-react';
import { Question, Language } from '../types/quiz';
import { GK_QUESTIONS } from '../data/questions';
import { sound } from '../utils/sound';

interface RapidFireModeProps {
  language: Language;
  onExit: () => void;
  onFinished: (score: number, total: number) => void;
}

export const RapidFireMode: React.FC<RapidFireModeProps> = ({
  language,
  onExit,
  onFinished,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Shuffle all questions
    const shuffled = [...GK_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelect = (optionIndex: number) => {
    if (isGameOver || feedback !== null) return;
    const currentQ = questions[currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    setAttempted((prev) => prev + 1);

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      setSecondsLeft((prev) => Math.min(90, prev + 5)); // +5s reward
      setFeedback('correct');
    } else {
      sound.playWrong();
      setSecondsLeft((prev) => Math.max(0, prev - 4)); // -4s penalty
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsGameOver(true);
      }
    }, 400);
  };

  const handleRestart = () => {
    sound.playClick();
    setScore(0);
    setAttempted(0);
    setCurrentIndex(0);
    setSecondsLeft(60);
    setIsGameOver(false);
    setFeedback(null);
    setQuestions([...GK_QUESTIONS].sort(() => 0.5 - Math.random()));
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] px-4 py-8 text-center select-none animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-1">
          {language === 'bn' ? 'সময় সমাপ্ত! র‍্যাপিড ফায়ার ফলাফল' : 'Time Up! Rapid Fire Result'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          {language === 'bn' ? '৬০ সেকেন্ডের গতিশীল কুইজ' : '60-Second Blitz'}
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm mb-5 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {language === 'bn' ? 'অর্জিত স্কোর' : 'Total Score'}
          </span>
          <div className="text-5xl font-extrabold text-amber-400 tabular-nums mb-3">
            {score}
          </div>
          <div className="text-xs text-slate-300">
            {language === 'bn' 
              ? `মোট ${attempted}টি প্রশ্নের মধ্যে ${score}টি সঠিক উত্তর` 
              : `Answered ${score} correctly out of ${attempted} attempted`}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-sm">
          <button
            onClick={handleRestart}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'bn' ? 'আবার খেলুন' : 'Play Again'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExit();
            }}
            className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium cursor-pointer"
          >
            {language === 'bn' ? 'মূল মেন্যুতে ফিরে যান' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || GK_QUESTIONS[0];

  return (
    <div className="flex flex-col min-h-full max-w-xl mx-auto px-4 py-3 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            sound.playClick();
            onExit();
          }}
          className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          {language === 'bn' ? '← প্রস্থান' : '← Exit'}
        </button>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="text-xs font-bold text-rose-400">
            {language === 'bn' ? 'র‍্যাপিড ফায়ার' : 'Rapid Fire'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-amber-400">
          <span>{language === 'bn' ? 'স্কোর:' : 'Score:'}</span>
          <span className="tabular-nums">{score}</span>
        </div>
      </div>

      {/* Big Timer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-center gap-2 mb-4">
        <Clock className={`w-5 h-5 ${secondsLeft <= 10 ? 'text-red-400 animate-bounce' : 'text-amber-400'}`} />
        <span className={`text-2xl font-black tabular-nums ${secondsLeft <= 10 ? 'text-red-400' : 'text-slate-100'}`}>
          {secondsLeft}s
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4 shadow-lg">
        <div className="text-[11px] text-amber-400 font-semibold mb-1">
          {language === 'bn' ? `প্রশ্ন নং ${currentIndex + 1}` : `Question #${currentIndex + 1}`}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
          {currentQ.question[language]}
        </h3>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {currentQ.options[language].map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={feedback !== null}
            className="w-full text-left min-h-[50px] px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 active:bg-amber-500/20 border border-slate-800 text-sm font-semibold text-slate-200 transition-all cursor-pointer active:scale-[0.99]"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
