import React, { useState } from 'react';
import { X, Sparkles, Loader2, Play, BookOpen } from 'lucide-react';
import { Question, Language } from '../types/quiz';
import { GK_QUESTIONS } from '../data/questions';
import { sound } from '../utils/sound';

interface AIQuizGeneratorModalProps {
  language: Language;
  onClose: () => void;
  onStartGeneratedQuiz: (questions: Question[], topicTitle: string) => void;
}

export const AIQuizGeneratorModal: React.FC<AIQuizGeneratorModalProps> = ({
  language,
  onClose,
  onStartGeneratedQuiz,
}) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const suggestedTopics = [
    { bn: 'মুক্তিযুদ্ধ ও ৭ বীরশ্রেষ্ঠ', en: '1971 War & Bir Sreshtho' },
    { bn: 'পদ্মা সেতু ও মেগা প্রজেক্ট', en: 'Padma Bridge & Mega Projects' },
    { bn: 'বিজ্ঞান ও কৃত্রিম বুদ্ধিমত্তা', en: 'Science & Artificial Intelligence' },
    { bn: 'বিশ্বকাপ ফুটবল ও ক্রিকেট রেকর্ড', en: 'World Cup Football & Cricket Records' },
    { bn: 'বাংলাদেশের প্রাচীন ইতিহাস', en: 'Ancient History of Bengal' },
  ];

  const handleGenerate = async (selectedTopic?: string) => {
    const finalTopic = (selectedTopic || topic).trim();
    if (!finalTopic) return;
    sound.playClick();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: finalTopic,
          count: 10,
          language,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        // Convert to app Question format
        const formattedQuestions: Question[] = data.questions.map((q: any, i: number) => ({
          id: `ai_${Date.now()}_${i}`,
          categoryId: 'custom',
          question: {
            bn: q.question,
            en: q.question,
          },
          options: {
            bn: q.options,
            en: q.options,
          },
          correctIndex: q.correctIndex ?? 0,
          explanation: {
            bn: q.explanation || 'সঠিক উত্তর নির্বাচন করা হয়েছে।',
            en: q.explanation || 'Correct answer selected.',
          },
          difficulty: 'medium',
          sourceOrExam: 'AI কুইজ জেনারেটর',
        }));

        onStartGeneratedQuiz(formattedQuestions, finalTopic);
        return;
      }
      throw new Error(data.error || 'Server returned empty quiz');
    } catch (e: any) {
      console.warn('AI generator fallback to related question set:', e);
      // Smart Fallback: filter questions relevant to topic or pick a diverse 10-question set
      const matching = GK_QUESTIONS.filter((q) =>
        q.question.bn.includes(finalTopic) || q.explanation.bn.includes(finalTopic)
      );

      let fallbackList: Question[] = [];
      if (matching.length >= 5) {
        fallbackList = matching.slice(0, 10);
      } else {
        // Pick 10 high-quality questions across categories
        fallbackList = [...GK_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);
      }

      onStartGeneratedQuiz(fallbackList, `${finalTopic} (১০ প্রশ্ন)`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {language === 'bn' ? 'কাস্টম AI কুইজ জেনারেটর' : 'Custom AI Quiz Generator'}
              </h3>
              <p className="text-[11px] text-purple-300">
                {language === 'bn' ? 'যেকোনো বিষয়ে তাৎক্ষণিক ১০টি প্রশ্নের কুইজ' : 'Instant 10 questions on any custom topic'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            {language === 'bn' ? 'আপনার পছন্দের বিষয়টি লিখুন:' : 'Enter your topic:'}
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={language === 'bn' ? 'যেমন: প্রাচীন মিশর, সাইবার নিরাপত্তা, নোবেল বিজয়ী...' : 'e.g., Space Exploration, World War 2...'}
            className="w-full h-11 px-3.5 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
            disabled={isLoading}
          />
        </div>

        {/* Suggested Topics Pills */}
        <div className="mb-5">
          <span className="text-[11px] font-semibold text-slate-400 block mb-2">
            {language === 'bn' ? 'জনপ্রিয় সাজেস্টেড বিষয়সমূহ:' : 'Popular suggestions:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedTopics.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTopic(item[language]);
                  handleGenerate(item[language]);
                }}
                disabled={isLoading}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-900/40 border border-slate-700/80 text-slate-300 hover:text-purple-200 transition-colors cursor-pointer"
              >
                {item[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleGenerate()}
          disabled={!topic.trim() || isLoading}
          className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            topic.trim() && !isLoading
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{language === 'bn' ? '১০টি প্রশ্ন তৈরি হচ্ছে...' : 'Generating 10 questions...'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>{language === 'bn' ? '১০ নম্বরের কুইজ শুরু করুন' : 'Start 10-Mark Quiz'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
