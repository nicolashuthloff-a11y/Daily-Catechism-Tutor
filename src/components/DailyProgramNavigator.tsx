import React from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Sparkles,
  Play,
  RotateCcw,
  Check
} from "lucide-react";
import { DAILY_PROGRAM_DAYS, DailyProgramSchedule } from "../data/dailyProgramData";
import { UserProgress } from "../types";
import confetti from "canvas-confetti";

interface DailyProgramNavigatorProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onNavigateToTab: (tab: "curriculum" | "penny" | "bible" | "rosary" | "memorize" | "test") => void;
  onStartDayTest: (dayNumber: number) => void;
  selectedDayNumber?: number;
  onSelectDayNumber?: (dayNumber: number) => void;
}

export const DailyProgramNavigator: React.FC<DailyProgramNavigatorProps> = ({
  progress,
  onProgressUpdate,
  onNavigateToTab,
  onStartDayTest,
  selectedDayNumber,
  onSelectDayNumber,
}) => {
  const currentActiveDay = progress.currentDay || 1;
  const viewingDay = selectedDayNumber || currentActiveDay;

  const currentSchedule: DailyProgramSchedule =
    DAILY_PROGRAM_DAYS.find((d) => d.day === viewingDay) || DAILY_PROGRAM_DAYS[0];

  const completedDays = progress.completedDays || [];
  const isCurrentViewingDayCompleted = completedDays.includes(viewingDay);

  const handleToggleDayCompleted = () => {
    let newCompleted: number[];
    if (isCurrentViewingDayCompleted) {
      newCompleted = completedDays.filter((d) => d !== viewingDay);
    } else {
      newCompleted = [...completedDays, viewingDay];
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    const updated: UserProgress = {
      ...progress,
      completedDays: newCompleted,
    };
    onProgressUpdate(updated);
  };

  const handleAdvanceToNextDay = () => {
    // Ensure viewingDay is marked completed
    let newCompleted = completedDays;
    if (!completedDays.includes(viewingDay)) {
      newCompleted = [...completedDays, viewingDay];
    }

    const nextDay = viewingDay < 14 ? viewingDay + 1 : 1;

    const updated: UserProgress = {
      ...progress,
      currentDay: nextDay,
      completedDays: newCompleted,
    };

    onProgressUpdate(updated);
    if (onSelectDayNumber) {
      onSelectDayNumber(nextDay);
    }

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
      {/* Top Banner: Day Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Daily Program Cycle
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                isCurrentViewingDayCompleted
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {isCurrentViewingDayCompleted ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Finished Day {viewingDay}
                </>
              ) : (
                `In Progress (Day ${viewingDay} of 14)`
              )}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Day {currentSchedule.day}: {currentSchedule.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {currentSchedule.subtitle} • Theme: <span className="text-slate-700 font-semibold">{currentSchedule.theme}</span>
          </p>
        </div>

        {/* Completion & Next Day Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleToggleDayCompleted}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              isCurrentViewingDayCompleted
                ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCurrentViewingDayCompleted ? "text-emerald-600" : "text-emerald-500"}`} />
            <span>{isCurrentViewingDayCompleted ? "Mark as Incomplete" : "Mark Day Finished"}</span>
          </button>

          <button
            onClick={handleAdvanceToNextDay}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <span>Finish & Move to Next Day</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 14-Day Timeline Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>14-Day Formation Timeline (Click any day to inspect)</span>
          <span className="font-mono">{completedDays.length} / 14 Days Finished</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {DAILY_PROGRAM_DAYS.map((sch) => {
            const isFinished = completedDays.includes(sch.day);
            const isCurrent = sch.day === currentActiveDay;
            const isSelected = sch.day === viewingDay;

            return (
              <button
                key={sch.day}
                onClick={() => onSelectDayNumber && onSelectDayNumber(sch.day)}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold border-blue-600 shadow-md shadow-blue-500/20"
                    : isFinished
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    : isCurrent
                    ? "bg-white border-blue-300 ring-2 ring-blue-500/20 text-slate-800"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span>Day {sch.day}</span>
                  {isFinished && (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-emerald-600"}`} />
                  )}
                </div>
                <div className={`text-[11px] mt-1 truncate ${isSelected ? "text-blue-100 font-medium" : "text-slate-500"}`}>
                  {sch.title.split(":")[0]}
                </div>
                {isCurrent && !isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's 5 Integrated Program Blocks */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Today's Assigned Daily Program Modules
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. Penny Catechism Module */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" /> Penny Catechism
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold">
                  Section {currentSchedule.pennyRange.sectionId}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{currentSchedule.pennyRange.label}</h4>
              <p className="text-xs text-slate-600 mt-1">
                Study and recite the assigned catechism questions for Day {currentSchedule.day}.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("penny")}
              className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <span>Open Penny Catechism</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Sacred Scripture Reading Module */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-blue-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" /> Sacred Scripture
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-mono font-bold">
                  {currentSchedule.scripture.book}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{currentSchedule.scripture.label}</h4>
              <p className="text-xs font-serif italic text-slate-600 mt-1">
                "{currentSchedule.scripture.keyVerse}"
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("bible")}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <span>Open Bible Reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Rosary Prayer Module with Animation */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-rose-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-700 fill-rose-700" /> The Holy Rosary
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-mono font-bold">
                  Fruit: {currentSchedule.rosary.fruit}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{currentSchedule.rosary.mysteryName}</h4>
              <p className="text-xs text-slate-600 mt-1">
                Pray with the interactive step-by-step 59-bead animated visualizer.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("rosary")}
              className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <span>Launch Animated Rosary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Memorization & Prayers Module */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-purple-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-700" /> Memory Text
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
                  Recitation
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Key Text to Memorize</h4>
              <p className="text-xs font-serif italic text-purple-900/90 mt-1">
                "{currentSchedule.keyTextToMemorize}"
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("memorize")}
              className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <span>Open Memorization Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5. 1-to-4 Multiple-Choice Examination */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col justify-between gap-3 sm:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-amber-700 fill-amber-700" /> 1-to-4 Examination
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                  Day {currentSchedule.day} Mastery Test
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                1-to-4 Multiple-Choice Test for Day {currentSchedule.day}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Validate your daily retention with strict 4-option verification and instant explanation. Keys 1, 2, 3, 4 supported.
              </p>
            </div>
            <button
              onClick={() => onStartDayTest(currentSchedule.day)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Day {currentSchedule.day} 1-to-4 Test Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
