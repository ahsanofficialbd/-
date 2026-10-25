import React, { useState } from 'react';
import { 
  Folder, FolderPlus, Plus, Play, Trash2, Edit3, 
  ChevronRight, ArrowLeft, BookOpen, FileText, Sparkles, 
  Check, X, Search, Landmark, Globe, HelpCircle, CheckCircle2
} from 'lucide-react';
import { GKFolder, GKSubfolder, Question, Language } from '../types/quiz';
import { GK_QUESTIONS } from '../data/questions';
import { 
  addSubfolderToFolder, updateSubfolderInFolder, 
  deleteSubfolderFromFolder, toggleQuestionInSubfolder,
  addNoteToSubfolder, deleteNoteFromSubfolder
} from '../utils/folderStorage';
import { sound } from '../utils/sound';

interface FoldersViewProps {
  folders: GKFolder[];
  language: Language;
  onUpdateFolder: () => void;
  onStartQuizFromQuestions: (questions: Question[], title: string) => void;
}

const COLOR_PALETTES = [
  { label: 'Emerald', hex: '#10b981' },
  { label: 'Blue', hex: '#3b82f6' },
  { label: 'Amber', hex: '#f59e0b' },
  { label: 'Cyan', hex: '#06b6d4' },
  { label: 'Purple', hex: '#8b5cf6' },
  { label: 'Red', hex: '#ef4444' },
  { label: 'Rose', hex: '#f43f5e' },
];

export const FoldersView: React.FC<FoldersViewProps> = ({
  folders,
  language,
  onUpdateFolder,
  onStartQuizFromQuestions,
}) => {
  // Active top-level folder
  const [activeFolderId, setActiveFolderId] = useState<string>(
    folders[0]?.id || 'folder_gk_bangladesh'
  );

  // Selected subfolder navigation
  const [selectedSubfolderId, setSelectedSubfolderId] = useState<string | null>(null);
  const [subfolderTab, setSubfolderTab] = useState<'questions' | 'notes'>('questions');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddSubfolderOpen, setIsAddSubfolderOpen] = useState(false);
  const [editingSubfolder, setEditingSubfolder] = useState<GKSubfolder | null>(null);
  const [isAddQuestionPickerOpen, setIsAddQuestionPickerOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // Form states for creating / editing subfolder
  const [subfolderName, setSubfolderName] = useState('');
  const [subfolderDesc, setSubfolderDesc] = useState('');
  const [subfolderColor, setSubfolderColor] = useState('#10b981');

  // Form state for adding note
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const currentFolder = folders.find((f) => f.id === activeFolderId) || folders[0];
  const activeSubfolder = currentFolder?.subfolders.find((s) => s.id === selectedSubfolderId);

  // Global search across folders and subfolders
  const trimmedSearch = searchQuery.trim().toLowerCase();
  const isSearching = trimmedSearch.length > 0;

  // Matching main folders
  const matchingFolders = isSearching
    ? folders.filter(
        (f) =>
          f.name.toLowerCase().includes(trimmedSearch) ||
          f.description.toLowerCase().includes(trimmedSearch)
      )
    : [];

  // Matching subfolders across all folders
  const searchResults: Array<{
    folder: GKFolder;
    subfolder: GKSubfolder;
  }> = [];

  if (isSearching) {
    folders.forEach((f) => {
      f.subfolders.forEach((s) => {
        if (
          s.name.toLowerCase().includes(trimmedSearch) ||
          s.description.toLowerCase().includes(trimmedSearch) ||
          f.name.toLowerCase().includes(trimmedSearch)
        ) {
          searchResults.push({
            folder: f,
            subfolder: s,
          });
        }
      });
    });
  }

  // Filter subfolders in active view
  const filteredSubfolders = (currentFolder?.subfolders || []).filter((s) =>
    s.name.toLowerCase().includes(trimmedSearch) ||
    s.description.toLowerCase().includes(trimmedSearch)
  );

  // Subfolder creation / edit handler
  const handleSaveSubfolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subfolderName.trim()) return;
    sound.playClick();

    if (editingSubfolder) {
      updateSubfolderInFolder(currentFolder.id, editingSubfolder.id, {
        name: subfolderName,
        description: subfolderDesc,
        color: subfolderColor,
      });
      setEditingSubfolder(null);
    } else {
      addSubfolderToFolder(currentFolder.id, {
        name: subfolderName,
        description: subfolderDesc,
        color: subfolderColor,
      });
    }

    setSubfolderName('');
    setSubfolderDesc('');
    setIsAddSubfolderOpen(false);
    onUpdateFolder();
  };

  const handleOpenEdit = (subfolder: GKSubfolder, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setEditingSubfolder(subfolder);
    setSubfolderName(subfolder.name);
    setSubfolderDesc(subfolder.description);
    setSubfolderColor(subfolder.color);
    setIsAddSubfolderOpen(true);
  };

  const handleDeleteSubfolder = (subfolderId: string, subName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (confirm(language === 'bn' ? `আপনি কি "${subName}" সাবফোল্ডারটি মুছে ফেলতে চান?` : `Delete subfolder "${subName}"?`)) {
      deleteSubfolderFromFolder(currentFolder.id, subfolderId);
      if (selectedSubfolderId === subfolderId) {
        setSelectedSubfolderId(null);
      }
      onUpdateFolder();
    }
  };

  const handleStartSubfolderQuiz = (subfolder: GKSubfolder, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();

    let questions = GK_QUESTIONS.filter((q) => subfolder.questionIds.includes(q.id));
    // If fewer than 10 questions, backfill from related categories
    if (questions.length < 10) {
      const existingIds = new Set(questions.map((q) => q.id));
      const isIntl = currentFolder.name.includes('আন্তর্জাতিক');
      const targetCategory = isIntl ? 'international' : 'bangladesh';
      const related = GK_QUESTIONS.filter(
        (q) => (q.categoryId === targetCategory || (isIntl ? q.categoryId === 'geography' : q.categoryId === 'history')) && !existingIds.has(q.id)
      );
      questions = [...questions, ...related.slice(0, 10 - questions.length)];
    }

    onStartQuizFromQuestions(questions.slice(0, 10), `${subfolder.name} (১০ প্রশ্ন)`);
  };

  // Add Note handler
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim() || !selectedSubfolderId) return;
    sound.playClick();

    addNoteToSubfolder(currentFolder.id, selectedSubfolderId, {
      title: noteTitle,
      content: noteContent,
    });

    setNoteTitle('');
    setNoteContent('');
    setIsAddNoteOpen(false);
    onUpdateFolder();
  };

  const handleDeleteNote = (noteId: string) => {
    if (!selectedSubfolderId) return;
    sound.playClick();
    deleteNoteFromSubfolder(currentFolder.id, selectedSubfolderId, noteId);
    onUpdateFolder();
  };

  // Toggle question in subfolder
  const handleToggleQuestion = (questionId: string) => {
    if (!selectedSubfolderId) return;
    sound.playClick();
    toggleQuestionInSubfolder(currentFolder.id, selectedSubfolderId, questionId);
    onUpdateFolder();
  };

  // Switch top-level folder
  const handleSelectFolder = (folderId: string) => {
    sound.playClick();
    setActiveFolderId(folderId);
    setSelectedSubfolderId(null);
    setSearchQuery('');
  };

  // ==================== Subfolder Detail View ====================
  if (activeSubfolder) {
    const subQuestions = GK_QUESTIONS.filter((q) => activeSubfolder.questionIds.includes(q.id));

    return (
      <div className="flex flex-col gap-4 px-3 sm:px-4 py-3 select-none animate-fadeIn">
        {/* Back and Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedSubfolderId(null);
            }}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentFolder.name}</span>
          </button>

          <button
            onClick={(e) => handleStartSubfolderQuiz(activeSubfolder, e)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-amber-500/20 active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{language === 'bn' ? '১০ নম্বরের কুইজ দিন' : 'Start 10-Mark Quiz'}</span>
          </button>
        </div>

        {/* Subfolder Header Banner */}
        <div 
          className="rounded-3xl p-5 border relative overflow-hidden shadow-lg"
          style={{ 
            backgroundColor: `${activeSubfolder.color}15`,
            borderColor: `${activeSubfolder.color}40`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/60 text-slate-300 border border-slate-700/60 inline-block mb-1.5">
                {currentFolder.name} · {language === 'bn' ? 'সাবফোল্ডার' : 'Subfolder'}
              </span>
              <h2 className="text-lg font-bold text-slate-100 mb-1">
                {activeSubfolder.name}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSubfolder.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span>{language === 'bn' ? `${activeSubfolder.questionIds.length}টি সংগৃহীত প্রশ্ন` : `${activeSubfolder.questionIds.length} Questions`}</span>
            <span>·</span>
            <span>{language === 'bn' ? `${activeSubfolder.notes.length}টি স্টাডি নোট` : `${activeSubfolder.notes.length} Notes`}</span>
          </div>
        </div>

        {/* Tabs: Questions vs Notes */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => {
              sound.playClick();
              setSubfolderTab('questions');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              subfolderTab === 'questions'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? `প্রশ্নমালা (${subQuestions.length})` : `Questions (${subQuestions.length})`}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setSubfolderTab('notes');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              subfolderTab === 'notes'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? `স্টাডি নোটস (${activeSubfolder.notes.length})` : `Study Notes (${activeSubfolder.notes.length})`}</span>
          </button>
        </div>

        {/* Questions Tab Content */}
        {subfolderTab === 'questions' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                {language === 'bn' ? 'এই সাবফোল্ডারে সংরক্ষিত প্রশ্নসমূহ:' : 'Questions in this subfolder:'}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsAddQuestionPickerOpen(true);
                }}
                className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'প্রশ্ন যুক্ত করুন' : 'Add Questions'}</span>
              </button>
            </div>

            {subQuestions.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-400">
                <p className="mb-3">
                  {language === 'bn' 
                    ? 'এই সাবফোল্ডারে এখনও কোনো প্রশ্ন যুক্ত করা হয়নি।' 
                    : 'No questions added yet.'}
                </p>
                <button
                  onClick={() => setIsAddQuestionPickerOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold cursor-pointer"
                >
                  {language === 'bn' ? '+ প্রশ্ন যোগ করুন' : '+ Add Questions'}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {subQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-amber-400">
                        {q.sourceOrExam || currentFolder.name}
                      </span>
                      <button
                        onClick={() => handleToggleQuestion(q.id)}
                        title={language === 'bn' ? 'সাবফোল্ডার থেকে বাদ দিন' : 'Remove question'}
                        className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-100 mb-2 leading-snug">
                      {q.question[language]}
                    </h4>

                    <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-200">
                      <span className="font-semibold text-emerald-400">
                        {language === 'bn' ? 'সঠিক উত্তর: ' : 'Answer: '}
                      </span>
                      {q.options[language][q.correctIndex]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes Tab Content */}
        {subfolderTab === 'notes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                {language === 'bn' ? 'সংক্ষিপ্ত তথ্য ও রিভিশন নোট:' : 'Revision notes & facts:'}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsAddNoteOpen(true);
                }}
                className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'নতুন নোট লিখুন' : 'Write Note'}</span>
              </button>
            </div>

            {activeSubfolder.notes.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-400">
                <p className="mb-3">
                  {language === 'bn' 
                    ? 'এখনও কোনো নোট লেখা হয়নি। গুরুত্বপূর্ণ পয়েন্ট নোট করে রাখুন।' 
                    : 'No study notes yet.'}
                </p>
                <button
                  onClick={() => setIsAddNoteOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold cursor-pointer"
                >
                  {language === 'bn' ? '+ নতুন নোট লিখুন' : '+ Write Note'}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeSubfolder.notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                        {note.title}
                      </h4>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      {note.content}
                    </p>
                    <span className="text-[10px] text-slate-500">{note.createdAt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal: Pick questions to add to this subfolder */}
        {isAddQuestionPickerOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-lg max-h-[85vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {language === 'bn' ? 'সাবফোল্ডারে প্রশ্ন যোগ করুন' : 'Add Questions to Subfolder'}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {language === 'bn' ? 'ক্লিক করে প্রশ্ন নির্বাচন বা বাদ দিন' : 'Tap to toggle selection'}
                  </span>
                </div>
                <button
                  onClick={() => setIsAddQuestionPickerOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {GK_QUESTIONS.filter((q) => {
                  const isIntlFolder = currentFolder.name.includes('আন্তর্জাতিক');
                  if (isIntlFolder) {
                    return q.categoryId === 'international' || q.categoryId === 'current_affairs' || q.categoryId === 'geography';
                  }
                  return q.categoryId === 'bangladesh' || q.categoryId === 'history' || q.categoryId === 'geography';
                }).map((q) => {
                  const isAdded = activeSubfolder.questionIds.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      onClick={() => handleToggleQuestion(q.id)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isAdded
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      <span className="font-medium leading-snug flex-1">
                        {q.question[language]}
                      </span>
                      {isAdded ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 border-t border-slate-800">
                <button
                  onClick={() => setIsAddQuestionPickerOpen(false)}
                  className="w-full h-10 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  {language === 'bn' ? 'সম্পন্ন করুন' : 'Done'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Note */}
        {isAddNoteOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-100">
                  {language === 'bn' ? 'নতুন স্টাডি নোট যোগ করুন' : 'Add New Study Note'}
                </h3>
                <button
                  onClick={() => setIsAddNoteOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {language === 'bn' ? 'নোটের শিরোনাম:' : 'Note Title:'}
                  </label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: গুরুত্বপূর্ণ আন্তর্জাতিক সংস্থার সদর দপ্তর' : 'e.g., UN Headquarters'}
                    className="w-full h-10 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {language === 'bn' ? 'নোটের বিস্তারিত বিষয়বস্তু:' : 'Note Content:'}
                  </label>
                  <textarea
                    rows={4}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder={language === 'bn' ? 'পয়েন্ট বা সংক্ষিপ্ত তথ্য এখানে লিখুন...' : 'Write notes...'}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  {language === 'bn' ? 'নোট সংরক্ষণ করুন' : 'Save Note'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== Main Folders Root View ====================
  const isCurrentIntl = currentFolder?.name.includes('আন্তর্জাতিক');

  return (
    <div className="flex flex-col gap-4 px-3 sm:px-4 py-3 select-none animate-fadeIn">
      {/* Prominent Global Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'bn'
              ? 'ফোল্ডার বা সাবফোল্ডার অনুসন্ধান করুন... (যেমন: বাংলাদেশ, মুক্তিযুদ্ধ, ভূগোল)'
              : 'Search folders or subfolders...'
          }
          className="w-full h-11 pl-10 pr-10 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer transition-colors"
            title={language === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isSearching ? (
        /* Dedicated Search Results View */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-slate-300">
              {language === 'bn'
                ? `অনুসন্ধানের ফলাফল (${searchResults.length + matchingFolders.length}টি পাওয়া গেছে)`
                : `Search Results (${searchResults.length + matchingFolders.length} found)`}
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-400 hover:text-amber-300 hover:underline font-medium text-[11px] cursor-pointer"
            >
              {language === 'bn' ? 'অনুসন্ধান মুছুন' : 'Clear search'}
            </button>
          </div>

          {/* Matching Main Folders if any */}
          {matchingFolders.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                {language === 'bn' ? 'মূল ফোল্ডারসমূহ:' : 'Main Folders:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingFolders.map((f) => {
                  const isIntl = f.name.includes('আন্তর্জাতিক');
                  return (
                    <div
                      key={f.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveFolderId(f.id);
                        setSearchQuery('');
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isIntl
                          ? 'bg-blue-950/40 border-blue-800/50 hover:border-blue-600'
                          : 'bg-emerald-950/40 border-emerald-800/50 hover:border-emerald-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isIntl
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {isIntl ? <Globe className="w-5 h-5" /> : <Landmark className="w-5 h-5" />}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-100">{f.name}</h5>
                          <p className="text-[11px] text-slate-400">
                            {f.subfolders.length}টি সাবফোল্ডার · {language === 'bn' ? 'খুলতে ক্লিক করুন' : 'Click to open'}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matching Subfolders */}
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                {language === 'bn' ? 'সাবফোল্ডারসমূহ:' : 'Subfolders:'}
              </h4>
              <div className="flex flex-col gap-2.5">
                {searchResults.map(({ folder, subfolder }) => {
                  const isIntlFolder = folder.name.includes('আন্তর্জাতিক');
                  return (
                    <div
                      key={`${folder.id}-${subfolder.id}`}
                      onClick={() => {
                        sound.playClick();
                        setActiveFolderId(folder.id);
                        setSelectedSubfolderId(subfolder.id);
                      }}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all cursor-pointer group active:scale-[0.99] shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                            style={{
                              backgroundColor: `${subfolder.color}20`,
                              color: subfolder.color,
                            }}
                          >
                            <Folder className="w-5 h-5 fill-current" />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isIntlFolder
                                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                }`}
                              >
                                {folder.name}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                              {subfolder.name}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {subfolder.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Strip: Question count & 1-click Quiz Button */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-xs">
                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                          <span className="font-semibold text-slate-300">
                            {subfolder.questionIds.length}টি প্রশ্ন
                          </span>
                          <span>·</span>
                          <span>{subfolder.notes.length}টি নোট</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleStartSubfolderQuiz(subfolder, e)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer active:scale-[0.97]"
                          >
                            <Play className="w-3 h-3 fill-amber-300" />
                            <span>১০ নম্বরের কুইজ</span>
                          </button>

                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : matchingFolders.length === 0 ? (
            /* No results state */
            <div className="py-12 px-4 text-center bg-slate-900/50 border border-slate-800/80 rounded-3xl">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">
                {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results found'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 mb-4">
                {language === 'bn'
                  ? `"${searchQuery}" এর সাথে মিলে এমন কোনো ফোল্ডার বা সাবফোল্ডার পাওয়া যায়নি।`
                  : `No folders or subfolders match "${searchQuery}".`}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
              >
                {language === 'bn' ? 'অনুসন্ধান রিসেট করুন' : 'Reset search'}
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        /* Normal Standard View (Tabs + Active Folder Banner + Subfolders) */
        <>
          {/* Top Folder Tabs Switcher: বাংলাদেশ & আন্তর্জাতিক */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
            {folders.map((f) => {
              const isSelected = f.id === currentFolder?.id;
              const isIntl = f.name.includes('আন্তর্জাতিক');

              return (
                <button
                  key={f.id}
                  onClick={() => handleSelectFolder(f.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? isIntl
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                        : 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isIntl ? <Globe className="w-4 h-4" /> : <Landmark className="w-4 h-4" />}
                  <span className="truncate">{f.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Folder Header Banner */}
          <div 
            className={`border rounded-3xl p-5 shadow-xl relative overflow-hidden transition-all ${
              isCurrentIntl
                ? 'bg-gradient-to-br from-blue-950/70 via-slate-900 to-slate-900 border-blue-900/50'
                : 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-900/50'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isCurrentIntl
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                      : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  {isCurrentIntl ? <Globe className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
                </div>
                <div>
                  <span 
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-block mb-1 ${
                      isCurrentIntl
                        ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    }`}
                  >
                    {language === 'bn' ? 'স্টাডি ফোল্ডার' : 'Study Folder'}
                  </span>
                  <h2 className="text-lg font-bold text-slate-100 leading-tight">
                    {currentFolder?.name}
                  </h2>
                </div>
              </div>

              {/* Add Subfolder Action */}
              <button
                onClick={() => {
                  sound.playClick();
                  setEditingSubfolder(null);
                  setSubfolderName('');
                  setSubfolderDesc('');
                  setSubfolderColor(isCurrentIntl ? '#3b82f6' : '#10b981');
                  setIsAddSubfolderOpen(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-md cursor-pointer active:scale-[0.98] transition-all shrink-0 ${
                  isCurrentIntl
                    ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                <span>{language === 'bn' ? 'সাবফোল্ডার যোগ' : '+ Subfolder'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-3">
              {currentFolder?.description}
            </p>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">
                {language === 'bn' ? `মোট ${currentFolder?.subfolders.length}টি সাবফোল্ডার` : `${currentFolder?.subfolders.length} Subfolders`}
              </span>
              <span>·</span>
              <span>
                {language === 'bn' 
                  ? `${(currentFolder?.subfolders || []).reduce((acc, s) => acc + s.questionIds.length, 0)}টি প্রশ্ন` 
                  : 'Indexed Questions'}
              </span>
            </div>
          </div>

          {/* Subfolders List Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              {language === 'bn' ? `"${currentFolder?.name}" এর সাবফোল্ডারসমূহ:` : 'Available Subfolders:'}
            </h3>
            <span className="text-[11px] text-slate-400">
              {language === 'bn' ? 'ক্লিক করে সাবফোল্ডার খুলুন' : 'Tap to open'}
            </span>
          </div>

          {/* Subfolder Cards List */}
          <div className="flex flex-col gap-2.5">
            {filteredSubfolders.length > 0 ? (
              filteredSubfolders.map((subfolder) => (
                <div
                  key={subfolder.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSubfolderId(subfolder.id);
                  }}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all cursor-pointer group active:scale-[0.99] shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: `${subfolder.color}20`,
                          color: subfolder.color,
                        }}
                      >
                        <Folder className="w-5 h-5 fill-current" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                          {subfolder.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {subfolder.description}
                        </p>
                      </div>
                    </div>

                    {/* Subfolder Context Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleOpenEdit(subfolder, e)}
                        title={language === 'bn' ? 'সম্পাদনা' : 'Edit'}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteSubfolder(subfolder.id, subfolder.name, e)}
                        title={language === 'bn' ? 'মুছুন' : 'Delete'}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Strip: Question count & 1-click Quiz Button */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <span className="font-semibold text-slate-300">
                        {subfolder.questionIds.length}টি প্রশ্ন
                      </span>
                      <span>·</span>
                      <span>{subfolder.notes.length}টি নোট</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleStartSubfolderQuiz(subfolder, e)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer active:scale-[0.97]"
                      >
                        <Play className="w-3 h-3 fill-amber-300" />
                        <span>১০ নম্বরের কুইজ</span>
                      </button>

                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800/60 rounded-2xl">
                <Folder className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  {language === 'bn'
                    ? 'এই ফোল্ডারে এখনো কোনো সাবফোল্ডার তৈরি করা হয়নি।'
                    : 'No subfolders created in this folder yet.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal: Add / Edit Subfolder */}
      {isAddSubfolderOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
          <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {editingSubfolder
                      ? (language === 'bn' ? 'সাবফোল্ডার সম্পাদনা' : 'Edit Subfolder')
                      : (language === 'bn' ? 'নতুন সাবফোল্ডার তৈরি করুন' : 'Create New Subfolder')}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    {language === 'bn' ? `ফোল্ডার: ${currentFolder?.name}` : `In: ${currentFolder?.name}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAddSubfolderOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubfolder} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === 'bn' ? 'সাবফোল্ডারের নাম:' : 'Subfolder Name:'}
                </label>
                <input
                  type="text"
                  value={subfolderName}
                  onChange={(e) => setSubfolderName(e.target.value)}
                  placeholder={
                    isCurrentIntl
                      ? (language === 'bn' ? 'যেমন: ইউরোপীয় ইউনিয়ন ও বৈশ্বিক সম্মেলন' : 'e.g., European Union & Treaties')
                      : (language === 'bn' ? 'যেমন: প্রাচীন বাংলার ইতিহাস ও স্থাপত্য' : 'e.g., Ancient Bengal')
                  }
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === 'bn' ? 'সংক্ষিপ্ত বিবরণ:' : 'Description:'}
                </label>
                <input
                  type="text"
                  value={subfolderDesc}
                  onChange={(e) => setSubfolderDesc(e.target.value)}
                  placeholder={
                    isCurrentIntl
                      ? (language === 'bn' ? 'যেমন: সদস্য দেশসমূহ, মুদ্রা ও সদর দপ্তর' : 'e.g., Member states and headquarters')
                      : (language === 'bn' ? 'যেমন: মহাস্থানগড় ও পাহাড়পুর' : 'e.g., Mahasthangarh')
                  }
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {language === 'bn' ? 'সাবফোল্ডার থিম কালার:' : 'Color Theme:'}
                </label>
                <div className="flex items-center gap-2">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.hex}
                      type="button"
                      onClick={() => setSubfolderColor(palette.hex)}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                        subfolderColor === palette.hex ? 'scale-115 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-80'
                      }`}
                      style={{ backgroundColor: palette.hex }}
                    >
                      {subfolderColor === palette.hex && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full h-11 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md mt-2 ${
                  isCurrentIntl
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {editingSubfolder
                  ? (language === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes')
                  : (language === 'bn' ? 'সাবফোল্ডার তৈরি করুন' : 'Create Subfolder')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
