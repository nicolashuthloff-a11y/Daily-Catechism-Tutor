import React, { useEffect } from "react";
import {
  X,
  Compass,
  BookOpen,
  RotateCcw,
  Sparkles,
  Brain,
  Sunrise,
  Book,
  GraduationCap,
  Heart,
  Languages,
  Calendar,
  ShieldCheck,
  Award,
  Printer,
  Clock,
  Flame,
  Volume2,
  VolumeX,
  UserCheck,
  RefreshCw
} from "lucide-react";
import { NavTabType } from "./Header";
import { UserProgress, MistakeRecord } from "../types";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: NavTabType;
  onSelectTab: (tab: NavTabType) => void;
  progress: UserProgress;
  onOpenTeacherHelp: () => void;
  onToggleSound: () => void;
  onToggleTimer: () => void;
  isTimerRunning: boolean;
  timerSecondsLeft: number;
  onResetProgress?: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  progress,
  onOpenTeacherHelp,
  onToggleSound,
  onToggleTimer,
  isTimerRunning,
  timerSecondsLeft,
  onResetProgress,
}) => {
  const mistakesList = Object.values(progress.mistakes || {}) as MistakeRecord[];
  const unresolvedMistakesCount = mistakesList.filter((m) => !m.isMastered).length;

  const timerMins = Math.floor(timerSecondsLeft / 60);
  const timerSecs = timerSecondsLeft % 60;
  const formattedTime = `${String(timerMins).padStart(2, "0")}:${String(timerSecs).padStart(2, "0")}`;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemClick = (tab: NavTabType) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-slate-800 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl border-r border-slate-200 flex flex-col justify-between overflow-hidden">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
                S
              </div>
              <div>
                <h2 className="font-bold text-base tracking-tight text-slate-900">Sanctuary</h2>
                <p className="text-xs text-slate-500">Catholic Scripture, Catechism & Prayers</p>
              </div>
            </div>
            <button
              id="close-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Status Bar in Drawer */}
          <div className="px-5 py-3 bg-blue-50/50 border-b border-blue-100/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-700">Day {progress.currentDay || 1} of 14</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{progress.todayMinutesStudied}/30 min</span>
            </div>
            <div className="flex items-center gap-1.5 text-orange-700 font-bold bg-orange-100/70 px-2 py-0.5 rounded-md">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{progress.dailyStreak || 1}d Streak</span>
            </div>
          </div>

          {/* Drawer Scrollable Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
            {/* GROUP 1: DAILY FORMATION */}
            <div>
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Daily Formation
              </span>
              <div className="mt-2 space-y-1">
                <button
                  id="drawer-item-hub"
                  onClick={() => handleItemClick("hub")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "hub"
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span>Library Hub (Home)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                    Start
                  </span>
                </button>

                <button
                  id="drawer-item-curriculum"
                  onClick={() => handleItemClick("curriculum")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "curriculum"
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Today's Curriculum</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Day {progress.currentDay || 1}</span>
                </button>

                <button
                  id="drawer-item-mistakes"
                  onClick={() => handleItemClick("mistakes")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "mistakes"
                      ? "bg-orange-50 text-orange-700 border border-orange-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-4 h-4 text-orange-600" />
                    <span>Practice & Mistake Drills</span>
                  </div>
                  {unresolvedMistakesCount > 0 ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold">
                      {unresolvedMistakesCount}
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-600 font-bold">Clean</span>
                  )}
                </button>

                <button
                  id="drawer-item-test"
                  onClick={() => handleItemClick("test")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "test"
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>1-to-4 Tests (All Content)</span>
                  </div>
                </button>

                <button
                  id="drawer-item-memorize"
                  onClick={() => handleItemClick("memorize")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "memorize"
                      ? "bg-purple-50 text-purple-700 border border-purple-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span>Sacred Memorization</span>
                  </div>
                </button>

                <button
                  id="drawer-item-prayers"
                  onClick={() => handleItemClick("prayers")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "prayers"
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sunrise className="w-4 h-4 text-amber-600" />
                    <span>Daily Prayer Guide</span>
                  </div>
                </button>
              </div>
            </div>

            {/* GROUP 2: LIBRARY & HERITAGE */}
            <div>
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Library
              </span>
              <div className="mt-2 space-y-1">
                <button
                  id="drawer-item-bible"
                  onClick={() => handleItemClick("bible")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "bible"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Book className={`w-4 h-4 ${currentTab === "bible" ? "text-white" : "text-blue-600"}`} />
                    <span>Catholic Bible (73 Books)</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${currentTab === "bible" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    Vulgate
                  </span>
                </button>

                <button
                  id="drawer-item-penny"
                  onClick={() => handleItemClick("penny")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "penny"
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className={`w-4 h-4 ${currentTab === "penny" ? "text-white" : "text-emerald-600"}`} />
                    <span>Penny Catechism Q&A</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${currentTab === "penny" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    370 Qs
                  </span>
                </button>

                <button
                  id="drawer-item-rosary"
                  onClick={() => handleItemClick("rosary")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "rosary"
                      ? "bg-rose-700 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className={`w-4 h-4 ${currentTab === "rosary" ? "text-white" : "text-rose-600"}`} />
                    <span>Rosary & 59-Bead Animation</span>
                  </div>
                </button>

                <button
                  id="drawer-item-latin"
                  onClick={() => handleItemClick("latin")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "latin"
                      ? "bg-amber-50 text-amber-900 border border-amber-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Languages className="w-4 h-4 text-amber-600" />
                    <span>Latin Texts & Liturgy</span>
                  </div>
                </button>

                <button
                  id="drawer-item-calendar"
                  onClick={() => handleItemClick("calendar")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "calendar"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Liturgical Calendar</span>
                  </div>
                </button>

                <button
                  id="drawer-item-confession"
                  onClick={() => handleItemClick("confession")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "confession"
                      ? "bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>Examination & Confession</span>
                  </div>
                </button>
              </div>
            </div>

            {/* GROUP 3: SETTINGS / ROLES & TOOLS */}
            <div>
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Settings & Roles
              </span>
              <div className="mt-2 space-y-1">
                <button
                  id="drawer-item-scores"
                  onClick={() => handleItemClick("scores")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "scores"
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Progress & Score Analytics</span>
                  </div>
                </button>

                <button
                  id="drawer-item-sheets"
                  onClick={() => handleItemClick("sheets")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentTab === "sheets"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Printer className={`w-4 h-4 ${currentTab === "sheets" ? "text-white" : "text-slate-600"}`} />
                    <span>Printable Study Sheets</span>
                  </div>
                </button>

                {/* Study Timer Toggle */}
                <button
                  id="drawer-toggle-timer"
                  onClick={onToggleTimer}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>30-Min Daily Timer</span>
                  </div>
                  <span className="font-mono text-xs text-blue-600 font-bold">
                    {formattedTime} {isTimerRunning ? "(Run)" : "(Paused)"}
                  </span>
                </button>

                {/* Sound FX Toggle */}
                <button
                  id="drawer-toggle-sound"
                  onClick={onToggleSound}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {progress.soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-blue-600" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Sound & Audio Effects</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {progress.soundEnabled ? "Enabled" : "Muted"}
                  </span>
                </button>

                {onResetProgress && (
                  <button
                    id="drawer-reset-progress"
                    onClick={() => {
                      if (confirm("Reset current curriculum progress and start from Day 1?")) {
                        onResetProgress();
                        onClose();
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all mt-3"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset Daily Progress</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 text-center text-xs text-slate-400">
            <span>Ad Maiorem Dei Gloriam</span>
          </div>
        </div>
      </div>
    </div>
  );
};
