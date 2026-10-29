import React, { useState, useEffect } from "react";
import {
  Sun,
  Sunrise,
  Moon,
  Heart,
  Copy,
  Check,
  Brain,
  Sparkles,
  BookOpen,
  ChevronRight,
  Shield,
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  Volume2
} from "lucide-react";
import {
  DAILY_PRAYER_SESSIONS,
  ROSARY_MYSTERY_GROUPS,
  ROSARY_STEP_GUIDE,
  PrayerSessionBlock,
  PrayerEntry,
  RosaryMysteryGroup
} from "../data/prayerGuideData";
import { RosaryAudioVisualizer } from "./RosaryAudioVisualizer";
import { UserProgress } from "../types";

interface DailyPrayerGuideViewProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onNavigateToMemorization?: (itemId?: string) => void;
  onNavigateToRosary?: () => void;
  onAddMinutes: (mins: number) => void;
}

export const DailyPrayerGuideView: React.FC<DailyPrayerGuideViewProps> = ({
  progress,
  onProgressUpdate,
  onNavigateToMemorization,
  onNavigateToRosary,
  onAddMinutes,
}) => {
  // Determine default tab based on current time of day
  const getInitialTab = (): "morning" | "afternoon" | "evening" | "rosary" | "all" => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) return "morning";
    if (currentHour >= 12 && currentHour < 18) return "afternoon";
    return "evening";
  };

  const [activeTab, setActiveTab] = useState<"morning" | "afternoon" | "evening" | "rosary" | "all">(getInitialTab);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [latinViewMap, setLatinViewMap] = useState<Record<string, boolean>>({});
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>({});
  const [prayedItemsMap, setPrayedItemsMap] = useState<Record<string, boolean>>({});

  // Rosary Interactive Decade Tracker
  const [activeMysteryGroupIndex, setActiveMysteryGroupIndex] = useState<number>(() => {
    const dayOfWeek = new Date().getDay(); // 0 = Sun, 1 = Mon, ...
    if (dayOfWeek === 1 || dayOfWeek === 6) return 0; // Mon, Sat -> Joyful
    if (dayOfWeek === 4) return 1; // Thu -> Luminous
    if (dayOfWeek === 2 || dayOfWeek === 5) return 2; // Tue, Fri -> Sorrowful
    return 3; // Wed, Sun -> Glorious
  });
  const [activeMysteryStep, setActiveMysteryStep] = useState<number>(0);
  const [rosaryDecadeCount, setRosaryDecadeCount] = useState<number>(0);
  const [activeExaminationExpanded, setActiveExaminationExpanded] = useState<boolean>(true);
  const [examChecks, setExamChecks] = useState<Record<number, boolean>>({});

  const copyPrayerText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLatin = (id: string) => {
    setLatinViewMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePrayedItem = (id: string) => {
    setPrayedItemsMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markSessionComplete = (sessionId: string, durationMinutes: number) => {
    if (completedSessions[sessionId]) return;
    setCompletedSessions((prev) => ({ ...prev, [sessionId]: true }));
    onAddMinutes(durationMinutes);
  };

  const currentMysteryGroup = ROSARY_MYSTERY_GROUPS[activeMysteryGroupIndex];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Spotlight: 59-Bead Rosary Step-by-Step Animation */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 text-2xl shadow-inner select-none">
            📿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider bg-white/25 px-2 py-0.5 rounded-full">
                Interactive Animation
              </span>
              <span className="text-xs text-rose-100 font-semibold">59-Bead Marian Rosary</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">
              Step-by-Step Interactive Rosary Visualizer
            </h3>
            <p className="text-xs text-rose-100 max-w-xl mt-0.5">
              Full circular bead animations, real-time glowing markers, devout audio recitation, and meditations for all 20 Mysteries.
            </p>
          </div>
        </div>

        {onNavigateToRosary && (
          <button
            id="prayer-guide-open-rosary-btn"
            onClick={onNavigateToRosary}
            className="px-5 py-3 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Rosary Animation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Banner / Introduction */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase tracking-wider">
                Daily Catholic Prayer Session Guide
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Morning • Afternoon • Evening
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Structured Daily Sessions of Prayer & Intercession
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Ground your mind in the truths of the faith, integrate the <strong>Fatima Prayers</strong>, meditate on the <strong>Mysteries of the Rosary</strong>, and guard your soul through the <strong>Examination of Conscience</strong>.
            </p>
          </div>

          {/* Quick Session Status Pill */}
          <div className="flex sm:flex-col gap-2 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Today's Rhythm
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className={`flex items-center gap-1.5 font-bold ${completedSessions["morning"] ? "text-emerald-600" : "text-slate-600"}`}>
                <span>🌅 Morning</span>
                {completedSessions["morning"] && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="text-slate-300">•</span>
              <div className={`flex items-center gap-1.5 font-bold ${completedSessions["afternoon"] ? "text-emerald-600" : "text-slate-600"}`}>
                <span>☀️ Afternoon</span>
                {completedSessions["afternoon"] && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="text-slate-300">•</span>
              <div className={`flex items-center gap-1.5 font-bold ${completedSessions["evening"] ? "text-emerald-600" : "text-slate-600"}`}>
                <span>🌌 Evening</span>
                {completedSessions["evening"] && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab("morning")}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
              activeTab === "morning"
                ? "bg-amber-50 text-amber-900 border-amber-300 shadow-sm ring-2 ring-amber-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <Sunrise className="w-4 h-4 text-amber-600" />
            <span>🌅 Morning</span>
          </button>

          <button
            onClick={() => setActiveTab("afternoon")}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
              activeTab === "afternoon"
                ? "bg-blue-50 text-blue-900 border-blue-300 shadow-sm ring-2 ring-blue-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <Sun className="w-4 h-4 text-blue-600" />
            <span>☀️ Afternoon</span>
          </button>

          <button
            onClick={() => setActiveTab("evening")}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
              activeTab === "evening"
                ? "bg-indigo-50 text-indigo-900 border-indigo-300 shadow-sm ring-2 ring-indigo-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-600" />
            <span>🌌 Evening</span>
          </button>

          <button
            onClick={() => setActiveTab("rosary")}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
              activeTab === "rosary"
                ? "bg-emerald-50 text-emerald-900 border-emerald-300 shadow-sm ring-2 ring-emerald-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>📿 Holy Rosary</span>
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
              activeTab === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Full Day View</span>
          </button>
        </div>
      </div>

      {/* Render Sessions based on tab */}
      {(activeTab === "morning" || activeTab === "all") && (
        <PrayerSessionBlockCard
          block={DAILY_PRAYER_SESSIONS[0]}
          copiedId={copiedId}
          latinViewMap={latinViewMap}
          prayedItemsMap={prayedItemsMap}
          isCompleted={completedSessions["morning"]}
          onCopy={copyPrayerText}
          onToggleLatin={toggleLatin}
          onTogglePrayed={togglePrayedItem}
          onMarkComplete={() => markSessionComplete("morning", 8)}
          onNavigateToMemorization={onNavigateToMemorization}
        />
      )}

      {(activeTab === "afternoon" || activeTab === "all") && (
        <PrayerSessionBlockCard
          block={DAILY_PRAYER_SESSIONS[1]}
          copiedId={copiedId}
          latinViewMap={latinViewMap}
          prayedItemsMap={prayedItemsMap}
          isCompleted={completedSessions["afternoon"]}
          onCopy={copyPrayerText}
          onToggleLatin={toggleLatin}
          onTogglePrayed={togglePrayedItem}
          onMarkComplete={() => markSessionComplete("afternoon", 15)}
          onNavigateToMemorization={onNavigateToMemorization}
          customExtraSection={
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>📿 Midday Rosary & Decade Meditation</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Integrate the Fatima Decade Prayer at the conclusion of each decade
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("rosary")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
                >
                  Open Full Rosary Guide <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          }
        />
      )}

      {(activeTab === "evening" || activeTab === "all") && (
        <PrayerSessionBlockCard
          block={DAILY_PRAYER_SESSIONS[2]}
          copiedId={copiedId}
          latinViewMap={latinViewMap}
          prayedItemsMap={prayedItemsMap}
          isCompleted={completedSessions["evening"]}
          onCopy={copyPrayerText}
          onToggleLatin={toggleLatin}
          onTogglePrayed={togglePrayedItem}
          onMarkComplete={() => markSessionComplete("evening", 10)}
          onNavigateToMemorization={onNavigateToMemorization}
          customExtraSection={
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span>Guarding the Commandments • 2-Minute Silent Meditation</span>
                  </div>
                  <button
                    onClick={() => setActiveExaminationExpanded(!activeExaminationExpanded)}
                    className="text-xs text-indigo-700 font-semibold hover:text-indigo-900 flex items-center gap-1"
                  >
                    {activeExaminationExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                  Reflect on Christ's <strong>Two Greatest Commandments</strong>: Loving God with all your heart, mind, and soul, and loving your neighbor as yourself.
                </p>

                {activeExaminationExpanded && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white border border-indigo-100 rounded-xl p-3.5 space-y-2">
                      <div className="text-xs font-bold text-slate-900">1. Love God Above All</div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={!!examChecks[1]}
                            onChange={() => setExamChecks((prev) => ({ ...prev, [1]: !prev[1] }))}
                            className="mt-0.5 rounded text-blue-600"
                          />
                          <span>Did I put God first in my decisions and morning prayers?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={!!examChecks[2]}
                            onChange={() => setExamChecks((prev) => ({ ...prev, [2]: !prev[2] }))}
                            className="mt-0.5 rounded text-blue-600"
                          />
                          <span>Did I speak God's holy name with reverence and honor?</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white border border-indigo-100 rounded-xl p-3.5 space-y-2">
                      <div className="text-xs font-bold text-slate-900">2. Love Your Neighbor</div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={!!examChecks[3]}
                            onChange={() => setExamChecks((prev) => ({ ...prev, [3]: !prev[3] }))}
                            className="mt-0.5 rounded text-blue-600"
                          />
                          <span>Was I patient, forgiving, and charitable toward others?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={!!examChecks[4]}
                            onChange={() => setExamChecks((prev) => ({ ...prev, [4]: !prev[4] }))}
                            className="mt-0.5 rounded text-blue-600"
                          />
                          <span>Did I guard my words against gossip, anger, or lies?</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        />
      )}

      {/* Rosary Interactive Guide View */}
      {activeTab === "rosary" && (
        <div className="space-y-8 animate-fade-in">
          {/* Interactive Virtual Audio Rosary & Divine Mercy Visualizer */}
          <RosaryAudioVisualizer onAddMinutes={onAddMinutes} />

          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
                  Marian Contemplation & Devotion
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  How to Pray the Holy Rosary
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Step-by-step bead sequence, mysteries of salvation, and Fatima Decade intercession
                </p>
              </div>

              {/* Day recommendation badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Today's Assigned Mysteries:</span>{" "}
                  <span>{currentMysteryGroup.groupName} ({currentMysteryGroup.days})</span>
                </div>
              </div>
            </div>

            {/* Mystery Group Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {ROSARY_MYSTERY_GROUPS.map((group, idx) => {
                const isSelected = idx === activeMysteryGroupIndex;
                return (
                  <button
                    key={group.groupName}
                    onClick={() => {
                      setActiveMysteryGroupIndex(idx);
                      setActiveMysteryStep(0);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 text-emerald-950 font-bold"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium"
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{group.groupName.replace("The ", "")}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{group.days}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Mystery Details Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {activeMysteryStep + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    {currentMysteryGroup.mysteries[activeMysteryStep].name}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
                    Fruit: {currentMysteryGroup.mysteries[activeMysteryStep].fruitOfMystery}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {currentMysteryGroup.mysteries[activeMysteryStep].scripture}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {currentMysteryGroup.mysteries[activeMysteryStep].description}
              </p>

              {/* Step Navigation Dots */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  {currentMysteryGroup.mysteries.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMysteryStep(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        i === activeMysteryStep
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeMysteryStep === 0}
                    onClick={() => setActiveMysteryStep((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-30 hover:bg-white"
                  >
                    Previous Decade
                  </button>
                  <button
                    disabled={activeMysteryStep === 4}
                    onClick={() => setActiveMysteryStep((prev) => Math.min(4, prev + 1))}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-30 shadow-xs"
                  >
                    Next Decade
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Decade Bead Counter Widget */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Interactive Decade Bead Counter
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {rosaryDecadeCount} / 10 Hail Marys
                  </span>
                </div>
                <button
                  onClick={() => setRosaryDecadeCount(0)}
                  className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Decade
                </button>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-1">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const beadNum = idx + 1;
                  const isDone = beadNum <= rosaryDecadeCount;
                  return (
                    <button
                      key={beadNum}
                      onClick={() => setRosaryDecadeCount(beadNum)}
                      className={`h-11 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all border ${
                        isDone
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs scale-102"
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <span className="text-[10px] opacity-75">Bead</span>
                      <span>#{beadNum}</span>
                    </button>
                  );
                })}
              </div>

              {rosaryDecadeCount === 10 && (
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-fade-in">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Decade Completed! Now pray:
                  </div>
                  <p className="text-slate-600 font-medium">
                    1. <strong>Glory Be</strong>: "Glory be to the Father, and to the Son, and to the Holy Spirit..."<br />
                    2. <strong>Fatima Decade Prayer</strong>: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy."
                  </p>
                </div>
              )}
            </div>

            {/* Step-by-Step Bead Sequence Guide */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-slate-900">
                Complete Rosary Bead-by-Bead Method
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ROSARY_STEP_GUIDE.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                        {step.stepNumber}
                      </span>
                      <span className="font-bold text-blue-600">{step.beadName}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs">
                      {step.prayerName}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface PrayerSessionBlockCardProps {
  block: PrayerSessionBlock;
  copiedId: string | null;
  latinViewMap: Record<string, boolean>;
  prayedItemsMap: Record<string, boolean>;
  isCompleted?: boolean;
  onCopy: (text: string, id: string) => void;
  onToggleLatin: (id: string) => void;
  onTogglePrayed: (id: string) => void;
  onMarkComplete: () => void;
  onNavigateToMemorization?: (itemId?: string) => void;
  customExtraSection?: React.ReactNode;
}

const PrayerSessionBlockCard: React.FC<PrayerSessionBlockCardProps> = ({
  block,
  copiedId,
  latinViewMap,
  prayedItemsMap,
  isCompleted,
  onCopy,
  onToggleLatin,
  onTogglePrayed,
  onMarkComplete,
  onNavigateToMemorization,
  customExtraSection,
}) => {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
      {/* Session Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{block.emoji}</span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {block.name}
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              ~{block.estimatedMinutes} Mins
            </span>
          </div>
          <p className="text-xs font-semibold text-blue-600">
            {block.tagline} • Recommended: {block.recommendedTime}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl font-medium pt-1">
            {block.introduction}
          </p>
        </div>

        {/* Complete Session Action Button */}
        <button
          onClick={onMarkComplete}
          disabled={isCompleted}
          className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
            isCompleted
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Session Logged (+{block.estimatedMinutes}m)</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Mark Session Prayed</span>
            </>
          )}
        </button>
      </div>

      {/* Individual Prayer Cards */}
      <div className="space-y-6">
        {block.prayers.map((prayer) => {
          const isLatin = !!latinViewMap[prayer.id];
          const isPrayed = !!prayedItemsMap[prayer.id];
          const textToDisplay = isLatin && prayer.latinText ? prayer.latinText : prayer.text;

          return (
            <div
              key={prayer.id}
              className={`rounded-2xl border transition-all p-5 sm:p-6 space-y-4 ${
                isPrayed
                  ? "bg-slate-50/80 border-emerald-200 shadow-xs"
                  : "bg-white border-slate-200 shadow-xs"
              }`}
            >
              {/* Prayer Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 sm:mt-0">
                    {prayer.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">
                        {prayer.title}
                      </h4>
                      {prayer.latinTitle && (
                        <span className="text-xs italic text-slate-400 font-serif hidden sm:inline">
                          ({prayer.latinTitle})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">
                      {prayer.purpose}
                    </p>
                  </div>
                </div>

                {/* Quick Action Buttons for Prayer */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {prayer.latinText && (
                    <button
                      onClick={() => onToggleLatin(prayer.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        isLatin
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                      title="Toggle Latin translation"
                    >
                      {isLatin ? "Latin (Active)" : "Latin"}
                    </button>
                  )}

                  <button
                    onClick={() => onCopy(textToDisplay, prayer.id)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                    title="Copy Prayer Text"
                  >
                    {copiedId === prayer.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {prayer.memorizationId && onNavigateToMemorization && (
                    <button
                      onClick={() => onNavigateToMemorization(prayer.memorizationId)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                      title="Practice this prayer in Memorization Mode"
                    >
                      <Brain className="w-3 h-3 text-blue-600" />
                      <span>Drill</span>
                    </button>
                  )}

                  <button
                    onClick={() => onTogglePrayed(prayer.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isPrayed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200"
                    }`}
                    title={isPrayed ? "Marked as meditated" : "Mark as meditated"}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Meditation prompt callout */}
              {prayer.meditationPrompt && (
                <div className="text-xs text-blue-800 bg-blue-50/60 border border-blue-100 rounded-xl px-3.5 py-2 font-medium">
                  💡 <strong>Meditation:</strong> {prayer.meditationPrompt}
                </div>
              )}

              {/* Prayer Body Text */}
              <div className="relative bg-slate-50/50 border border-slate-100 rounded-xl p-4 sm:p-5">
                <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif whitespace-pre-line">
                  {textToDisplay}
                </blockquote>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Session Specific Components */}
      {customExtraSection}
    </section>
  );
};
