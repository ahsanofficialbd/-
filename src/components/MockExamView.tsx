import React, { useState } from 'react';
import { 
  GraduationCap, Play, AlertTriangle, Clock, 
  CheckCircle2, History, Award, ShieldAlert
} from 'lucide-react';
import { Language, UserStats } from '../types/quiz';
import { sound } from '../utils/sound';

interface MockExamViewProps {
  userStats: UserStats;
  language: Language;
  onStartMockExam: (config: {
    questionCount: number;
    hasNegativeMarking: boolean;
  }) => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  userStats,
  language,
  onStartMockExam,
}) => {
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [hasNegativeMarking, setHasNegativeMarking] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4 py-3 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-900/50 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              {language === 'bn' ? 'বিসিএস ও চাকরি মডেল টেস্ট' : 'BCS & Job Exam Mock Test'}
            </h2>
            <p className="text-xs text-indigo-300">
              {language === 'bn' ? 'বাস্তব পরীক্ষার আদলে পূর্ণাঙ্গ মূল্যায়ন' : 'Real exam simulation with negative marking'}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-4">
          {language === 'bn'
            ? 'সকল বিষয় (গণিত, বিজ্ঞান, ইতিহাস, ভূগোল, সাহিত্য, সাম্প্রতিক) থেকে সমন্বিত প্রশ্নপত্র তৈরি করা হবে।'
            : 'Combined questions from all subjects (Math, Science, History, Geography, Literature, Current Affairs).'}
        </p>

        {/* Configuration Options */}
        <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 space-y-3.5 mb-4">
          {/* Question Count Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              {language === 'bn' ? 'প্রশ্নের সংখ্যা নির্ধারণ করুন:' : 'Select Question Count:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[10, 20].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setQuestionCount(count);
                  }}
                  className={`h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    questionCount === count
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {language === 'bn' ? `${count}টি প্রশ্ন (${count} নম্বর)` : `${count} Questions (${count} Marks)`}
                </button>
              ))}
            </div>
          </div>

          {/* Negative Marking Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  {language === 'bn' ? 'নেগেটিভ মার্কিং (০.২৫)' : 'Negative Marking (-0.25)'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'ভুল উত্তরের জন্য নম্বর কর্তন' : 'Deduct 0.25 mark per wrong answer'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setHasNegativeMarking(!hasNegativeMarking);
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                hasNegativeMarking ? 'bg-amber-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  hasNegativeMarking ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => {
            sound.playClick();
            onStartMockExam({ questionCount, hasNegativeMarking });
          }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{language === 'bn' ? 'মডেল টেস্ট শুরু করুন' : 'Start Mock Test'}</span>
        </button>
      </div>

      {/* Previous Mock Test Scores History */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <History className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-200">
            {language === 'bn' ? 'পূর্ববর্তী পরীক্ষার স্কোর ও ফলাফল' : 'Past Test Records'}
          </h3>
        </div>

        {userStats.completedExamScores.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center text-xs text-slate-400">
            {language === 'bn'
              ? 'এখনও কোনো মক টেস্ট দেওয়া হয়নি। ওপরের বোতাম চেপে প্রথম পরীক্ষাটি শুরু করুন!'
              : 'No mock exams completed yet. Click above to start your first test!'}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {userStats.completedExamScores.slice(0, 5).map((record, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-200 block">
                    {record.title}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {record.date} · {language === 'bn' ? `নির্ভুলতা: ${record.accuracy}%` : `Accuracy: ${record.accuracy}%`}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-amber-400 text-sm tabular-nums">
                    {record.score} / {record.total}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {language === 'bn' ? 'নম্বর' : 'Marks'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
