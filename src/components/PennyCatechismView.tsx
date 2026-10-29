import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  GraduationCap,
  Layers,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Play,
  CheckCircle,
  XCircle,
  Flame,
  ArrowRight,
  Shuffle,
  Lightbulb,
  Award,
  Filter
} from "lucide-react";
import {
  ALL_PENNY_QUESTIONS,
  PENNY_SECTIONS,
  PennyQuestion,
  PennySection,
  generatePennyMultipleChoiceQuiz,
  PennyQuizQuestion
} from "../data/penny";
import { devotionalAudio } from "../services/devotionalAudioService";

interface PennyCatechismViewProps {
  onAddMinutes?: (mins: number) => void;
}

type StudyMode = "list" | "flashcard" | "firstLetter" | "cloze" | "quiz";

const STORAGE_MEMORIZED_KEY = "penny_mastered_numbers_v2";
const STORAGE_BOOKMARKS_KEY = "penny_bookmarked_numbers_v2";

export const PennyCatechismView: React.FC<PennyCatechismViewProps> = ({ onAddMinutes }) => {
  // Selected Section: 0 means "All Sections", 1-5 correspond to PENNY_SECTIONS
  const [selectedSectionId, setSelectedSectionId] = useState<number>(1);
  const [selectedChapter, setSelectedChapter] = useState<string>("All Chapters");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studyMode, setStudyMode] = useState<StudyMode>("list");

  // Memorized and Bookmarked sets
  const [memorizedNumbers, setMemorizedNumbers] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_MEMORIZED_KEY);
      if (raw) return new Set(JSON.parse(raw));
    } catch {
      // ignore
    }
    return new Set<number>();
  });

  const [bookmarkedNumbers, setBookmarkedNumbers] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (raw) return new Set(JSON.parse(raw));
    } catch {
      // ignore
    }
    return new Set<number>();
  });

  // Filter: all, memorized only, unmastered only, bookmarked only
  const [statusFilter, setStatusFilter] = useState<"all" | "unmastered" | "mastered" | "bookmarked">("all");

  // Revealing answers in list mode
  const [hideAllAnswers, setHideAllAnswers] = useState<boolean>(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  // Audio & Copy feedback
  const [speakingNumber, setSpeakingNumber] = useState<number | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<number | null>(null);

  // Flashcard Mode State
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  // Multiple Choice Quiz State
  const [quizQuestions, setQuizQuestions] = useState<PennyQuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizMistakes, setQuizMistakes] = useState<PennyQuizQuestion[]>([]);

  // Cloze revealed map
  const [revealedClozeWords, setRevealedClozeWords] = useState<Record<number, boolean>>({});

  // Save progress to LocalStorage
  const toggleMemorized = (num: number) => {
    setMemorizedNumbers((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
        if (onAddMinutes) onAddMinutes(1);
      }
      try {
        localStorage.setItem(STORAGE_MEMORIZED_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleBookmark = (num: number) => {
    setBookmarkedNumbers((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      try {
        localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Currently active section metadata
  const activeSection = useMemo(() => {
    if (selectedSectionId === 0) return null;
    return PENNY_SECTIONS.find((s) => s.id === selectedSectionId) || null;
  }, [selectedSectionId]);

  // Available chapters for the selected section
  const availableChapters = useMemo(() => {
    if (!activeSection) return ["All Chapters"];
    return activeSection.chapters;
  }, [activeSection]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return ALL_PENNY_QUESTIONS.filter((item) => {
      // Section check
      if (selectedSectionId !== 0) {
        if (activeSection && (item.number < activeSection.startNum || item.number > activeSection.endNum)) {
          return false;
        }
      }

      // Chapter check
      if (selectedChapter !== "All Chapters" && item.chapter !== selectedChapter) {
        return false;
      }

      // Status check
      if (statusFilter === "mastered" && !memorizedNumbers.has(item.number)) return false;
      if (statusFilter === "unmastered" && memorizedNumbers.has(item.number)) return false;
      if (statusFilter === "bookmarked" && !bookmarkedNumbers.has(item.number)) return false;

      // Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.number.toString() === q ||
        item.number.toString().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.chapter.toLowerCase().includes(q) ||
        (item.scriptureRef && item.scriptureRef.toLowerCase().includes(q))
      );
    });
  }, [selectedSectionId, activeSection, selectedChapter, statusFilter, memorizedNumbers, bookmarkedNumbers, searchQuery]);

  // Keep cardIndex within range when filtered list changes
  useEffect(() => {
    setCardIndex(0);
    setCardFlipped(false);
  }, [selectedSectionId, selectedChapter, statusFilter]);

  // Audio recitation handler
  const handleSpeak = (text: string, num: number) => {
    if (speakingNumber === num) {
      devotionalAudio.stop();
      setSpeakingNumber(null);
      return;
    }
    setSpeakingNumber(num);
    devotionalAudio.speakText(
      text,
      "en",
      0.9,
      () => setSpeakingNumber(null),
      () => setSpeakingNumber(null)
    );
  };

  const handleCopy = (item: PennyQuestion) => {
    const text = `Q. ${item.number}: ${item.question}\nA: ${item.answer}${item.scriptureRef ? ` (${item.scriptureRef})` : ""}`;
    navigator.clipboard.writeText(text);
    setCopiedNumber(item.number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Generate Multiple Choice Quiz
  const startQuiz = (questionCount: number = 10, pool?: PennyQuestion[]) => {
    const targetPool = pool || (filteredQuestions.length > 0 ? filteredQuestions : ALL_PENNY_QUESTIONS);
    const quiz = generatePennyMultipleChoiceQuiz(targetPool, questionCount);
    setQuizQuestions(quiz);
    setQuizIndex(0);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
    setQuizMistakes([]);
    setStudyMode("quiz");
  };

  const handleSelectQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setQuizSelectedOption(index);
  };

  const handleSubmitQuizAnswer = () => {
    if (quizSelectedOption === null || quizSubmitted) return;
    setQuizSubmitted(true);
    const currentQ = quizQuestions[quizIndex];
    const isCorrect = quizSelectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      // Automatically mark question as memorized
      if (!memorizedNumbers.has(currentQ.sourceQuestion.number)) {
        toggleMemorized(currentQ.sourceQuestion.number);
      }
    } else {
      setQuizMistakes((prev) => [...prev, currentQ]);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((prev) => prev + 1);
      setQuizSelectedOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizCompleted(true);
      if (onAddMinutes) onAddMinutes(5);
    }
  };

  // First-Letter prompt generator (e.g., "God made me" -> "G m m")
  const getFirstLetters = (text: string): string => {
    return text
      .split(" ")
      .map((word) => {
        const clean = word.replace(/[^a-zA-Z0-9]/g, "");
        if (!clean) return word;
        const first = clean[0];
        const punctuation = word.slice(clean.length);
        return first + (punctuation ? punctuation : "");
      })
      .join(" ");
  };

  // Cloze fill-in-the-blank text generator
  const getClozeMarkup = (answer: string, qNum: number) => {
    const isRevealed = revealedClozeWords[qNum];
    if (isRevealed) {
      return (
        <span className="text-slate-800">
          {answer}
          <button
            onClick={() => setRevealedClozeWords((prev) => ({ ...prev, [qNum]: false }))}
            className="ml-2 text-xs text-blue-600 hover:underline font-semibold"
          >
            (Hide Blanks)
          </button>
        </span>
      );
    }

    // Replace significant words (longer than 4 chars or theological keywords) with blanks
    const words = answer.split(" ");
    return (
      <span className="leading-relaxed">
        {words.map((w, idx) => {
          const clean = w.replace(/[^a-zA-Z]/g, "");
          const isSignificant =
            clean.length >= 4 &&
            !["that", "this", "with", "from", "have", "they", "will", "what", "which", "there", "their"].includes(clean.toLowerCase());

          if (isSignificant) {
            return (
              <span
                key={idx}
                className="inline-block mx-0.5 px-2 py-0.5 bg-blue-50 text-blue-800 border-b-2 border-blue-400 font-mono text-xs rounded-sm cursor-pointer hover:bg-blue-100 transition-colors"
                title={`Click to reveal: ${w}`}
                onClick={() => setRevealedClozeWords((prev) => ({ ...prev, [qNum]: true }))}
              >
                [ {clean[0]}... ]
              </span>
            );
          }
          return <span key={idx}> {w} </span>;
        })}
        <button
          onClick={() => setRevealedClozeWords((prev) => ({ ...prev, [qNum]: true }))}
          className="ml-2 text-xs text-blue-600 hover:underline font-semibold"
        >
          (Reveal All)
        </button>
      </span>
    );
  };

  const memorizedPercent = Math.round((memorizedNumbers.size / ALL_PENNY_QUESTIONS.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Complete Catechism
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                All 370 Questions
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-serif">
              The Penny Catechism
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              The complete historical 370 questions of Christian Doctrine organized into canonical sections, equipped with 
              multiple-choice tests, active recall flashcards, and verbatim memorization tools.
            </p>
          </div>

          {/* Overall Progress Gauge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center min-w-[220px] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Mastery Progress</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 mb-1">
              {memorizedNumbers.size} <span className="text-sm font-normal text-slate-500">/ 370</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1 mb-2">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${memorizedPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between w-full text-[11px] text-slate-500 font-medium">
              <span>{memorizedPercent}% Memorized</span>
              <span>{bookmarkedNumbers.size} Bookmarked</span>
            </div>
          </div>
        </div>

        {/* Section Tabs Navigation (Canonical 5 Sections) */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Select Section (1–370)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
            <button
              id="section-tab-all"
              onClick={() => {
                setSelectedSectionId(0);
                setSelectedChapter("All Chapters");
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedSectionId === 0
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div className="font-bold text-xs">All Questions</div>
              <div className={`text-[11px] mt-0.5 ${selectedSectionId === 0 ? "text-blue-100" : "text-slate-500"}`}>
                Q. 1–370
              </div>
            </button>

            {PENNY_SECTIONS.map((sec) => {
              const isSelected = selectedSectionId === sec.id;
              // Count memorized in this section
              const inSectionCount = sec.endNum - sec.startNum + 1;
              let memorizedInSec = 0;
              for (let i = sec.startNum; i <= sec.endNum; i++) {
                if (memorizedNumbers.has(i)) memorizedInSec++;
              }

              return (
                <button
                  key={sec.id}
                  id={`section-tab-${sec.id}`}
                  onClick={() => {
                    setSelectedSectionId(sec.id);
                    setSelectedChapter("All Chapters");
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                      Section {sec.id}
                    </span>
                    <span className={`text-[10px] font-semibold ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                      {memorizedInSec}/{inSectionCount}
                    </span>
                  </div>
                  <div className="font-bold text-xs mt-1 truncate" title={sec.title}>
                    {sec.title}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                    {sec.range}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Description & Action Bar */}
        {activeSection && (
          <div className="mt-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-700 leading-relaxed max-w-2xl">
              <span className="font-bold text-blue-900">Section {activeSection.id}: </span>
              {activeSection.description}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-quiz-section"
                onClick={() => startQuiz(10)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Test This Section</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Study Mode Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Tool Mode Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 flex-wrap gap-1">
          <button
            id="mode-tab-list"
            onClick={() => setStudyMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studyMode === "list"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study List</span>
          </button>

          <button
            id="mode-tab-flashcard"
            onClick={() => {
              setStudyMode("flashcard");
              setCardIndex(0);
              setCardFlipped(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studyMode === "flashcard"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>

          <button
            id="mode-tab-firstletter"
            onClick={() => setStudyMode("firstLetter")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studyMode === "firstLetter"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Active memory prompt displaying the first letter of each word"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>First-Letter Recall</span>
          </button>

          <button
            id="mode-tab-cloze"
            onClick={() => setStudyMode("cloze")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studyMode === "cloze"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Fill in the blank test for key theological terms"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fill-in-Blanks</span>
          </button>

          <button
            id="mode-tab-quiz"
            onClick={() => startQuiz(10)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              studyMode === "quiz"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-blue-700 bg-blue-50 hover:bg-blue-100"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Multiple Choice Quiz</span>
          </button>
        </div>

        {/* Quick Search & Filters */}
        <div className="flex items-center flex-wrap gap-2 grow sm:grow-0 justify-end">
          {/* Chapter Filter */}
          {availableChapters.length > 1 && (
            <select
              id="select-chapter"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableChapters.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          )}

          {/* Status Filter */}
          <select
            id="select-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="unmastered">Unmastered Only</option>
            <option value="mastered">Memorized Only</option>
            <option value="bookmarked">Bookmarked Only</option>
          </select>

          {/* Search Box */}
          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-penny-input"
              type="text"
              placeholder="Search or Jump to #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MULTIPLE CHOICE QUIZ MODE */}
      {/* ========================================================================= */}
      {studyMode === "quiz" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm animate-fade-in">
          {!quizCompleted && quizQuestions.length > 0 ? (
            <div>
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      Question {quizIndex + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-xs text-slate-500">
                      {quizQuestions[quizIndex].sourceQuestion.chapter}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {quizQuestions[quizIndex].questionText}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-slate-500">Score</div>
                  <div className="text-lg font-black text-blue-700">
                    {quizScore} / {quizIndex}
                  </div>
                </div>
              </div>

              {/* Multiple Choice Options (1-4) */}
              <div className="space-y-3 mb-6">
                {quizQuestions[quizIndex].options.map((opt, idx) => {
                  const isSelected = quizSelectedOption === idx;
                  const isCorrect = idx === quizQuestions[quizIndex].correctIndex;
                  const isWrong = isSelected && !isCorrect;

                  let cardStyle = "bg-white border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-slate-50";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/20";
                    } else if (isWrong) {
                      cardStyle = "bg-red-50 border-red-400 text-red-950 ring-2 ring-red-500/20";
                    } else {
                      cardStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                    }
                  } else if (isSelected) {
                    cardStyle = "bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-500/20 font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={quizSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${cardStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {quizSubmitted && (
                <div className="p-4 rounded-2xl mb-6 bg-slate-50 border border-slate-200 animate-fade-in">
                  <div className="flex items-center gap-2 mb-1">
                    {quizSelectedOption === quizQuestions[quizIndex].correctIndex ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        Correct! Question marked as memorized.
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-red-600" />
                        Incorrect. Review the correct answer below:
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    {quizQuestions[quizIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  id="quiz-quit-btn"
                  onClick={() => setStudyMode("list")}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Exit Quiz
                </button>

                {!quizSubmitted ? (
                  <button
                    id="quiz-submit-btn"
                    onClick={handleSubmitQuizAnswer}
                    disabled={quizSelectedOption === null}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      quizSelectedOption !== null
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xs cursor-pointer"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    id="quiz-next-btn"
                    onClick={handleNextQuizQuestion}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{quizIndex + 1 < quizQuestions.length ? "Next Question" : "View Results"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : quizCompleted ? (
            /* Quiz Results Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">Quiz Completed!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  You scored <span className="font-bold text-blue-700">{quizScore} out of {quizQuestions.length}</span> ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                </p>
              </div>

              {quizMistakes.length > 0 && (
                <div className="max-w-xl mx-auto p-4 rounded-2xl bg-orange-50 border border-orange-200 text-left">
                  <div className="text-xs font-bold text-orange-900 uppercase tracking-wider mb-2">
                    Questions to Review ({quizMistakes.length})
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {quizMistakes.map((m, idx) => (
                      <div key={idx} className="text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-orange-100">
                        <div className="font-bold text-slate-900">{m.questionText}</div>
                        <div className="text-emerald-700 mt-0.5">Answer: {m.sourceQuestion.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  id="quiz-retry-btn"
                  onClick={() => startQuiz(quizQuestions.length)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
                <button
                  id="quiz-return-list-btn"
                  onClick={() => setStudyMode("list")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Return to Study List
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No questions found for this selection.</p>
              <button
                onClick={() => setStudyMode("list")}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Back to List
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ACTIVE RECALL FLASHCARD MODE */}
      {/* ========================================================================= */}
      {studyMode === "flashcard" && filteredQuestions.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto animate-fade-in">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Card {cardIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-xs text-slate-500">
                Q. {filteredQuestions[cardIndex].number} · {filteredQuestions[cardIndex].chapter}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="flashcard-bookmark-btn"
                onClick={() => toggleBookmark(filteredQuestions[cardIndex].number)}
                className={`p-2 rounded-xl border transition-colors ${
                  bookmarkedNumbers.has(filteredQuestions[cardIndex].number)
                    ? "bg-amber-50 text-amber-600 border-amber-200"
                    : "bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700"
                }`}
                title="Bookmark card"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
              <button
                id="flashcard-speak-btn"
                onClick={() =>
                  handleSpeak(
                    `Question ${filteredQuestions[cardIndex].number}: ${filteredQuestions[cardIndex].question}. Answer: ${filteredQuestions[cardIndex].answer}`,
                    filteredQuestions[cardIndex].number
                  )
                }
                className="p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                title="Listen with text-to-speech"
              >
                {speakingNumber === filteredQuestions[cardIndex].number ? (
                  <VolumeX className="w-4 h-4 text-blue-600" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Flashcard Body (Flip to reveal) */}
          <div
            id="flashcard-tap-area"
            onClick={() => setCardFlipped((prev) => !prev)}
            className={`min-h-[220px] p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-center text-center select-none ${
              cardFlipped
                ? "bg-blue-50/40 border-blue-300 shadow-sm"
                : "bg-slate-50/70 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/20"
            }`}
          >
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              {cardFlipped ? "Catechism Answer" : "Catechism Question"}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-snug">
              {cardFlipped ? filteredQuestions[cardIndex].answer : filteredQuestions[cardIndex].question}
            </div>

            {cardFlipped && filteredQuestions[cardIndex].scriptureRef && (
              <div className="text-xs text-blue-700 font-semibold mt-4">
                Scripture: {filteredQuestions[cardIndex].scriptureRef}
              </div>
            )}

            <div className="text-[11px] text-slate-400 mt-6">
              {cardFlipped ? "Click card to flip back" : "Click card to reveal answer"}
            </div>
          </div>

          {/* Rating Controls & Navigation */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <button
                id="flashcard-prev-btn"
                onClick={() => {
                  setCardIndex((prev) => Math.max(0, prev - 1));
                  setCardFlipped(false);
                }}
                disabled={cardIndex === 0}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="flashcard-next-btn"
                onClick={() => {
                  setCardIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1));
                  setCardFlipped(false);
                }}
                disabled={cardIndex === filteredQuestions.length - 1}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mastery self-rating buttons */}
            <div className="flex items-center gap-3">
              <button
                id="flashcard-unmaster-btn"
                onClick={() => {
                  if (memorizedNumbers.has(filteredQuestions[cardIndex].number)) {
                    toggleMemorized(filteredQuestions[cardIndex].number);
                  }
                  if (cardIndex + 1 < filteredQuestions.length) {
                    setCardIndex((prev) => prev + 1);
                    setCardFlipped(false);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold transition-colors"
              >
                Needs Practice
              </button>
              <button
                id="flashcard-master-btn"
                onClick={() => {
                  if (!memorizedNumbers.has(filteredQuestions[cardIndex].number)) {
                    toggleMemorized(filteredQuestions[cardIndex].number);
                  }
                  if (cardIndex + 1 < filteredQuestions.length) {
                    setCardIndex((prev) => prev + 1);
                    setCardFlipped(false);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Mark as Memorized</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STUDY LIST, FIRST-LETTER RECALL, AND CLOZE LIST */}
      {/* ========================================================================= */}
      {(studyMode === "list" || studyMode === "firstLetter" || studyMode === "cloze") && (
        <div className="space-y-4">
          {/* Action Header & Bulk Controls */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredQuestions.length}</span> questions
              {statusFilter !== "all" && ` (${statusFilter})`}
            </div>
            <div className="flex items-center gap-3">
              <button
                id="toggle-hide-all-btn"
                onClick={() => setHideAllAnswers((prev) => !prev)}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                {hideAllAnswers ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{hideAllAnswers ? "Reveal All Answers" : "Hide All Answers"}</span>
              </button>
            </div>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">No Questions Match Your Filters</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try switching to another section or clearing your search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedSectionId(0);
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredQuestions.map((item) => {
                const isMastered = memorizedNumbers.has(item.number);
                const isBookmarked = bookmarkedNumbers.has(item.number);
                const isAnswerRevealed = hideAllAnswers ? !!revealedAnswers[item.number] : true;

                return (
                  <div
                    key={item.number}
                    id={`penny-item-${item.number}`}
                    className={`bg-white border rounded-3xl p-5 sm:p-6 transition-all duration-200 hover:shadow-sm ${
                      isMastered
                        ? "border-emerald-200/80 bg-emerald-50/20"
                        : "border-slate-200"
                    }`}
                  >
                    {/* Top Row: Question number, Chapter badge, Actions */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-100 shrink-0">
                          {item.number}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {item.chapter}
                        </span>
                        {item.scriptureRef && (
                          <span className="text-[11px] text-blue-600 font-medium bg-blue-50/60 px-2 py-0.5 rounded-md border border-blue-100/50">
                            {item.scriptureRef}
                          </span>
                        )}
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Audio Speak */}
                        <button
                          id={`speak-btn-${item.number}`}
                          onClick={() => handleSpeak(`Q. ${item.number}: ${item.question}. Answer: ${item.answer}`, item.number)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Recite aloud"
                        >
                          {speakingNumber === item.number ? (
                            <VolumeX className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        {/* Copy button */}
                        <button
                          id={`copy-btn-${item.number}`}
                          onClick={() => handleCopy(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedNumber === item.number ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        {/* Bookmark */}
                        <button
                          id={`bookmark-btn-${item.number}`}
                          onClick={() => toggleBookmark(item.number)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isBookmarked
                              ? "text-amber-500 hover:bg-amber-50"
                              : "text-slate-300 hover:text-slate-500 hover:bg-slate-100"
                          }`}
                          title="Bookmark this question"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                        </button>

                        {/* Mastered checkbox */}
                        <button
                          id={`master-btn-${item.number}`}
                          onClick={() => toggleMemorized(item.number)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                            isMastered
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                              : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                          }`}
                          title="Mark as memorized / mastered"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isMastered ? "Memorized" : "Learn"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="text-base sm:text-lg font-bold text-slate-900 font-serif mb-2">
                      Q. {item.question}
                    </div>

                    {/* Answer Area (Based on Selected Study Mode) */}
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      {hideAllAnswers && !revealedAnswers[item.number] ? (
                        <button
                          id={`reveal-answer-btn-${item.number}`}
                          onClick={() => setRevealedAnswers((prev) => ({ ...prev, [item.number]: true }))}
                          className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-50/50 border border-dashed border-slate-200 rounded-xl text-xs font-semibold text-blue-600 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Reveal Answer</span>
                        </button>
                      ) : studyMode === "firstLetter" ? (
                        /* First-Letter Prompt mode */
                        <div className="space-y-1.5">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            First-Letter Memory Prompt
                          </div>
                          <div className="font-mono text-sm tracking-wide text-blue-950 font-bold bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                            {getFirstLetters(item.answer)}
                          </div>
                          <details className="text-xs text-slate-500 cursor-pointer pt-1">
                            <summary className="hover:text-blue-600 font-medium">Show Full Answer</summary>
                            <p className="mt-2 text-slate-800 text-sm leading-relaxed pl-2 border-l-2 border-blue-400">
                              {item.answer}
                            </p>
                          </details>
                        </div>
                      ) : studyMode === "cloze" ? (
                        /* Fill in the blanks mode */
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Fill in the Key Terms
                          </div>
                          <div className="text-sm leading-relaxed text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {getClozeMarkup(item.answer, item.number)}
                          </div>
                        </div>
                      ) : (
                        /* Standard Full Answer */
                        <div className="text-sm sm:text-base leading-relaxed text-slate-800">
                          <span className="font-bold text-slate-900 mr-1.5">A.</span>
                          {item.answer}
                        </div>
                      )}

                      {/* Memory tip / footnote */}
                      {item.memoryTip && (
                        <div className="mt-2 text-xs text-slate-500 italic flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Tip: {item.memoryTip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
