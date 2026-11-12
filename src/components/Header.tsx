import React from "react";
import {
  Menu,
  Compass,
  BookOpen,
  Book,
  GraduationCap,
  Heart,
  RotateCcw,
  Clock,
  Flame,
  Volume2,
  VolumeX,
  AlertCircle,
  Search,
  Sun,
  Moon,
  Sparkles,
  Languages
} from "lucide-react";
import { UserProgress, MistakeRecord } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

export type NavTabType =
  | "hub"
  | "curriculum"
  | "bible"
  | "penny"
  | "rosary"
  | "test"
  | "mistakes"
  | "memorize"
  | "prayers"
  | "calendar"
  | "confession"
  | "latin"
  | "sheets"
  | "scores";

interface HeaderProps {
  currentTab: NavTabType;
  onSelectTab: (tab: NavTabType) => void;
  progress: UserProgress;
  onToggleSound: () => void;
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onOpenDrawer: () => void;
  onOpenSearch?: () => void;
  isCandlelight?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  progress,
  onToggleSound,
  timerSecondsLeft,
  isTimerRunning,
  onToggleTimer,
  onOpenDrawer,
  onOpenSearch,
  isCandlelight = false,
  onToggleTheme,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const mistakesList = Object.values(progress.mistakes || {}) as MistakeRecord[];
  const unresolvedMistakesCount = mistakesList.filter((m) => !m.isMastered).length;

  const timerMins = Math.floor(timerSecondsLeft / 60);
  const timerSecs = timerSecondsLeft % 60;
  const formattedTime = `${String(timerMins).padStart(2, "0")}:${String(timerSecs).padStart(2, "0")}`;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Hamburger + Brand & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-3">
          {/* Left: ☰ Hamburger Drawer Toggle & VirtuePath Brand */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <button
                id="header-hamburger-menu-btn"
                onClick={onOpenDrawer}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center shrink-0"
                title="Open Navigation Menu"
                aria-label="Open side menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div
                className="flex items-center gap-2.5 cursor-pointer select-none"
                onClick={() => onSelectTab("hub")}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
                  S
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                      Sanctuary
                    </h1>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden sm:block max-w-sm truncate" title="Catholic Scripture Prayers, Catechism, Penny Catechism & Bible Reading">
                    Catholic Scripture Prayers • Penny Catechism • Bible Reading
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile-only Controls */}
            <div className="flex items-center gap-1.5 sm:hidden">
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  title="Search Library"
                >
                  <Search className="w-4 h-4 text-amber-500" />
                </button>
              )}
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  title="Toggle Candlelight Theme"
                >
                  {isCandlelight ? <Sun className="w-4 h-4 text-amber-400" /> : <Flame className="w-4 h-4 text-amber-500" />}
                </button>
              )}
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs font-bold"
                title="Daily Study Streak"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>{progress.dailyStreak || 1}d</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Status Badges & Controls (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center flex-wrap gap-2">
            {/* Quick Universal Search Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-all group"
                title="Universal Search (⌘K / Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">Search Library...</span>
                <span className="md:hidden">Search</span>
                <kbd className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* 30-Min Daily Timer Pill */}
            <button
              id="header-timer-btn"
              onClick={onToggleTimer}
              title={isTimerRunning ? t.timerTooltipPause : t.timerTooltipStart}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isTimerRunning
                  ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 ring-2 ring-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-mono">{formattedTime}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                ({progress.todayMinutesStudied}/30m)
              </span>
            </button>

            {/* Daily Streak */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs font-bold"
              title="Daily Consecutive Study Streak"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{progress.dailyStreak || 1} {t.streakDays}</span>
            </div>

            {/* Mistake Drill Badge */}
            <button
              id="header-mistakes-badge-btn"
              onClick={() => onSelectTab("mistakes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                unresolvedMistakesCount > 0
                  ? "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800 hover:bg-orange-100"
                  : "bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
              }`}
              title="Questions needing repeated practice"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                {unresolvedMistakesCount > 0
                  ? `${unresolvedMistakesCount} ${t.mistakesBadge}`
                  : "0 Mistakes"}
              </span>
            </button>

            {/* Candlelight / Daylight Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                title={isCandlelight ? "Switch to Daylight Mode" : "Switch to Candlelight / Adoration Chapel Mode"}
              >
                {isCandlelight ? <Sun className="w-4 h-4 text-amber-400" /> : <Flame className="w-4 h-4 text-amber-500" />}
              </button>
            )}

            {/* Language Switch Button (EN / DE) */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
              title={`Switch language (Current: ${language.toUpperCase()})`}
            >
              <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={progress.soundEnabled ? t.soundOn : t.soundOff}
            >
              {progress.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. Top Segmented Filter Pills (Sticky horizontal control right under header) */}
        <div className="py-2 border-t border-slate-100 flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-none">
          <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1 text-xs sm:text-sm font-semibold text-slate-600 shrink-0">
            {/* Hub Pill */}
            <button
              id="pill-hub"
              onClick={() => onSelectTab("hub")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "hub"
                  ? "bg-white text-blue-700 font-bold shadow-xs border border-slate-200/50"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Library Hub</span>
            </button>

            {/* Curriculum Pill */}
            <button
              id="pill-curriculum"
              onClick={() => onSelectTab("curriculum")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "curriculum"
                  ? "bg-white text-blue-700 font-bold shadow-xs border border-slate-200/50"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Curriculum</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  currentTab === "curriculum"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                Day {progress.currentDay || 1}
              </span>
            </button>

            {/* Bible Pill */}
            <button
              id="pill-bible"
              onClick={() => onSelectTab("bible")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "bible"
                  ? "bg-white text-indigo-700 font-bold shadow-xs border border-slate-200/50"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Book className="w-4 h-4 text-indigo-600" />
              <span>Bible</span>
            </button>

            {/* Catechism Pill */}
            <button
              id="pill-penny"
              onClick={() => onSelectTab("penny")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "penny"
                  ? "bg-white text-emerald-700 font-bold shadow-xs border border-slate-200/50"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Catechism</span>
            </button>

            {/* Rosary Animation Pill */}
            <button
              id="pill-rosary"
              onClick={() => onSelectTab("rosary")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "rosary"
                  ? "bg-white text-rose-700 font-bold shadow-xs border border-slate-200/50 ring-1 ring-rose-300"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600/30" />
              <span>📿 Rosary Animation</span>
            </button>

            {/* Prayers Pill */}
            <button
              id="pill-prayers"
              onClick={() => onSelectTab("prayers")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "prayers"
                  ? "bg-white text-amber-700 font-bold shadow-xs border border-slate-200/50"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Heart className="w-4 h-4 text-amber-600" />
              <span>Prayers</span>
            </button>

            {/* Review / Drills Pill */}
            <button
              id="pill-review"
              onClick={() => onSelectTab(unresolvedMistakesCount > 0 ? "mistakes" : "test")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                currentTab === "mistakes" || currentTab === "test"
                  ? "bg-white text-orange-700 font-bold shadow-xs border border-slate-200/50"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>Review</span>
              {unresolvedMistakesCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-600 text-white font-bold">
                  {unresolvedMistakesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
