import React from "react";
import {
  BookOpen,
  Book,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Heart,
  Sunrise,
  Brain,
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
  Play,
  Languages,
  Calendar,
  ShieldCheck,
  Award
} from "lucide-react";
import { UserProgress, MistakeRecord } from "../types";
import { CURRICULUM_DAYS } from "../data/curriculumData";
import { NavTabType } from "./Header";
import { useLanguage } from "../i18n/LanguageContext";

interface LibraryHubViewProps {
  progress: UserProgress;
  onNavigateToTab: (tab: NavTabType) => void;
  onStartDayTest?: (dayNumber: number) => void;
  onStartMistakeDrill?: () => void;
  onToggleTimer: () => void;
  isTimerRunning: boolean;
  timerSecondsLeft: number;
}

export const LibraryHubView: React.FC<LibraryHubViewProps> = ({
  progress,
  onNavigateToTab,
  onStartDayTest,
  onStartMistakeDrill,
  onToggleTimer,
  isTimerRunning,
  timerSecondsLeft,
}) => {
  const { t, getCurriculumDay } = useLanguage();
  const currentDayNum = progress.currentDay || 1;
  const rawDay = CURRICULUM_DAYS.find((d) => d.day === currentDayNum) || CURRICULUM_DAYS[0];
  const activeDay = getCurriculumDay(rawDay);

  const mistakesList = Object.values(progress.mistakes || {}) as MistakeRecord[];
  const unresolvedMistakesCount = mistakesList.filter((m) => !m.isMastered).length;
  const masteredCount = mistakesList.filter((m) => m.isMastered).length;

  const isDayCompleted = progress.completedDays?.includes(currentDayNum);
  const completedCount = progress.completedDays?.length || 0;

  // Last read Bible position (stored in localStorage or default)
  const lastBibleRef = typeof window !== "undefined"
    ? localStorage.getItem("virtuepath_last_bible_ref") || "Genesis 1"
    : "Genesis 1";

  const timerMins = Math.floor(timerSecondsLeft / 60);
  const timerSecs = timerSecondsLeft % 60;
  const formattedTime = `${String(timerMins).padStart(2, "0")}:${String(timerSecs).padStart(2, "0")}`;

  const catechismBracket = currentDayNum <= 3
    ? "Q 1–50: Faith & Creed"
    : currentDayNum <= 6
    ? "Q 51–138: Hope & The Lord's Prayer"
    : currentDayNum <= 9
    ? "Q 139–250: Charity & Ten Commandments"
    : currentDayNum <= 12
    ? "Q 251–320: Grace & Seven Sacraments"
    : "Q 321–370: Virtues, Sins & Four Last Things";

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-slate-800 pb-16">
      {/* 1. Daily Welcome Banner & 30-Minute Commitment */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase tracking-wider text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Catholic Library & Formation Hub
              </span>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                {progress.dailyStreak || 1} Day Streak
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-2">
              Welcome to Sanctuary
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Catholic Scripture Prayers, Penny Catechism Q&A, and Bible Reading with systematic 1-to-4 multiple-choice drill retention.
            </p>
          </div>

          {/* 30-Minute Daily Progress Box */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Daily Goal: 30 Mins
              </span>
              <div className="flex items-baseline gap-1 mt-0.5 justify-center">
                <span className="text-2xl font-black font-mono text-slate-900">
                  {progress.todayMinutesStudied}
                </span>
                <span className="text-xs text-slate-400 font-semibold">/ 30 min</span>
              </div>
              <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-blue-600 transition-all rounded-full"
                  style={{ width: `${Math.min(100, Math.round((progress.todayMinutesStudied / 30) * 100))}%` }}
                />
              </div>
            </div>

            <button
              id="hub-timer-toggle-btn"
              onClick={onToggleTimer}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-all flex flex-col items-center justify-center gap-0.5 ${
                isTimerRunning
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono">{formattedTime}</span>
              </div>
              <span className="text-[10px] font-normal opacity-90">
                {isTimerRunning ? "Pause Timer" : "Start Timer"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE 4 PRIMARY SPOKE CARDS (Requested Core Hub Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Core Formation & Library Modules
          </h2>
          <span className="text-xs text-slate-400 font-medium">Tap any card to resume</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SPOKE 1: CURRICULUM */}
          <div
            id="hub-spoke-curriculum"
            onClick={() => onNavigateToTab("curriculum")}
            className="group relative bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    Day {activeDay.day} of 14
                  </span>
                  {isDayCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wide">
                  Curriculum
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                  Day {activeDay.day} of 14 • 30 Mins Today
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1 line-clamp-1">
                  {activeDay.title}: {activeDay.subtitle}
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {activeDay.summary}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
              <span className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Day {activeDay.day} Lesson</span>
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* SPOKE 2: CATHOLIC BIBLE */}
          <div
            id="hub-spoke-bible"
            onClick={() => onNavigateToTab("bible")}
            className="group relative bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                  <Book className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    73 Books Canon
                  </span>
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    English
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wide">
                  Catholic Holy Bible
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">
                  Resume: {lastBibleRef} • English Edition
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                  eBook page-by-page reader, chapter selector & "Read to Me" audio recitation
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Includes all 73 Catholic canonical books (Douay-Rheims & RSV-CE) with chapter browsing and font controls.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
              <span className="flex items-center gap-1.5">
                <Book className="w-3.5 h-3.5" />
                <span>Open Catholic Bible Reader</span>
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* SPOKE 3: PENNY CATECHISM */}
          <div
            id="hub-spoke-penny"
            onClick={() => onNavigateToTab("penny")}
            className="group relative bg-white border-2 border-slate-200 hover:border-emerald-600 rounded-3xl p-6 shadow-md hover:shadow-xl hover:shadow-emerald-600/10 transition-all cursor-pointer flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    370 Traditional Q&A
                  </span>
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    5 Sections
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wide">
                  Penny Catechism
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                  {catechismBracket}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                  Full systematic Catholic doctrine, Creed, Commandments & Sacraments
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Test your recall with question-by-question reveals, audio pronunciation, and instant 1-to-4 multiple-choice tests.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Browse Catechism Q&A</span>
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* SPOKE 4: SPACED REVIEW & MISTAKE DRILLS */}
          <div
            id="hub-spoke-review"
            onClick={() => onNavigateToTab(unresolvedMistakesCount > 0 ? "mistakes" : "test")}
            className="group relative bg-white border-2 border-slate-200 hover:border-orange-500 rounded-3xl p-6 shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all cursor-pointer flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold group-hover:bg-orange-600 group-hover:text-white transition-all shadow-xs">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    unresolvedMistakesCount > 0
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {unresolvedMistakesCount > 0
                      ? `${unresolvedMistakesCount} Active Mistakes`
                      : "0 Mistakes Queue"}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {masteredCount} Mastered
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wide">
                  Spaced Review
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors mt-0.5">
                  {unresolvedMistakesCount > 0
                    ? `${unresolvedMistakesCount} Mistakes to clear`
                    : "0 Mistakes to clear"}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                  Spaced repetition drills targeting precisely the questions you missed
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Each mistake must be answered correctly twice across separated sessions before it is marked as mastered in your queue.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {unresolvedMistakesCount > 0 ? "Start Mistake Repetition Drill" : "Practice 1-to-4 Tests"}
                </span>
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECONDARY SPOKE ACTION TILES */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Devotions & Auxiliary Practice
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Tile 1: Rosary & Animation */}
          <button
            id="hub-tile-rosary"
            onClick={() => onNavigateToTab("rosary")}
            className="p-4 bg-white border border-slate-200 hover:border-rose-300 hover:shadow-md rounded-2xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">Rosary</span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                59-Bead Guide
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">Interactive animation</p>
            </div>
          </button>

          {/* Tile 2: Daily Prayers */}
          <button
            id="hub-tile-prayers"
            onClick={() => onNavigateToTab("prayers")}
            className="p-4 bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md rounded-2xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Sunrise className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">Devotions</span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Daily Prayers
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">Morning, Noon & Night</p>
            </div>
          </button>

          {/* Tile 3: 1-to-4 Tests Hub */}
          <button
            id="hub-tile-test"
            onClick={() => onNavigateToTab("test")}
            className="p-4 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">Testing Center</span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                1-to-4 Tests
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">Across all content</p>
            </div>
          </button>

          {/* Tile 4: Sacred Memorization */}
          <button
            id="hub-tile-memorize"
            onClick={() => onNavigateToTab("memorize")}
            className="p-4 bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md rounded-2xl text-left transition-all group flex flex-col justify-between gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 block">Memory</span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Memorize Verses
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">First-letter & cloze drill</p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Quick Today's Lesson Call to Action */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <span className="text-xs uppercase font-mono tracking-wider text-blue-200 font-bold">
            Ready to study today?
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Day {activeDay.day}: {activeDay.title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            {activeDay.subtitle} • Complete the 15-min MCQ examination, 8-min mistake drill, and 7-min memory recitation.
          </p>
        </div>

        <button
          id="hub-cta-start-day"
          onClick={() => {
            if (onStartDayTest) {
              onStartDayTest(activeDay.day);
            } else {
              onNavigateToTab("curriculum");
            }
          }}
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-sm transition-all shadow-md flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
          <span>Start Day {activeDay.day} Routine</span>
        </button>
      </div>
    </div>
  );
};
