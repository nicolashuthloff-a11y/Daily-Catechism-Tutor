import React from "react";
import { Compass, Book, GraduationCap, RotateCcw, Heart } from "lucide-react";
import { NavTabType } from "./Header";
import { UserProgress, MistakeRecord } from "../types";

interface BottomNavProps {
  currentTab: NavTabType;
  onSelectTab: (tab: NavTabType) => void;
  progress: UserProgress;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  progress,
}) => {
  const mistakesList = Object.values(progress.mistakes || {}) as MistakeRecord[];
  const unresolvedMistakesCount = mistakesList.filter((m) => !m.isMastered).length;

  const isDailyActive = currentTab === "curriculum" || currentTab === "hub";
  const isBibleActive = currentTab === "bible";
  const isCatechismActive = currentTab === "penny";
  const isRosaryActive = currentTab === "rosary";
  const isReviewActive = currentTab === "mistakes" || currentTab === "test";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 sm:px-6 py-1.5 transition-all">
      <nav className="max-w-xl mx-auto flex items-center justify-around" aria-label="Bottom Navigation">
        {/* 1. Learn / Daily */}
        <button
          id="bottom-nav-daily"
          onClick={() => onSelectTab("curriculum")}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isDailyActive
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`relative p-1 rounded-xl transition-all ${isDailyActive ? "bg-blue-50" : ""}`}>
            <Compass className={`w-5 h-5 ${isDailyActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">Learn / Daily</span>
          {isDailyActive && (
            <span className="absolute -bottom-1 w-6 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        {/* 2. Bible */}
        <button
          id="bottom-nav-bible"
          onClick={() => onSelectTab("bible")}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isBibleActive
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`relative p-1 rounded-xl transition-all ${isBibleActive ? "bg-blue-50" : ""}`}>
            <Book className={`w-5 h-5 ${isBibleActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">Bible</span>
          {isBibleActive && (
            <span className="absolute -bottom-1 w-6 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        {/* 3. Catechism */}
        <button
          id="bottom-nav-catechism"
          onClick={() => onSelectTab("penny")}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isCatechismActive
              ? "text-emerald-700 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`relative p-1 rounded-xl transition-all ${isCatechismActive ? "bg-emerald-50" : ""}`}>
            <GraduationCap className={`w-5 h-5 ${isCatechismActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">Catechism</span>
          {isCatechismActive && (
            <span className="absolute -bottom-1 w-6 h-0.5 bg-emerald-600 rounded-full" />
          )}
        </button>

        {/* 4. Review / Drills */}
        <button
          id="bottom-nav-review"
          onClick={() => onSelectTab(unresolvedMistakesCount > 0 ? "mistakes" : "test")}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isReviewActive
              ? "text-orange-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`relative p-1 rounded-xl transition-all ${isReviewActive ? "bg-orange-50" : ""}`}>
            <RotateCcw className={`w-5 h-5 ${isReviewActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            {unresolvedMistakesCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-orange-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                {unresolvedMistakesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">Review / Drills</span>
          {isReviewActive && (
            <span className="absolute -bottom-1 w-6 h-0.5 bg-orange-600 rounded-full" />
          )}
        </button>

        {/* 5. Rosary Animation */}
        <button
          id="bottom-nav-rosary"
          onClick={() => onSelectTab("rosary")}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isRosaryActive
              ? "text-rose-600 font-bold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div className={`relative p-1 rounded-xl transition-all ${isRosaryActive ? "bg-rose-50" : ""}`}>
            <Heart className={`w-5 h-5 ${isRosaryActive ? "stroke-[2.5] fill-rose-600/30" : "stroke-[1.75]"}`} />
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">📿 Rosary</span>
          {isRosaryActive && (
            <span className="absolute -bottom-1 w-6 h-0.5 bg-rose-600 rounded-full" />
          )}
        </button>
      </nav>
    </div>
  );
};
