import React, { useState, useEffect } from "react";
import { CurriculumDay, UserProgress, Question } from "../types";
import { CURRICULUM_DAYS, MASTER_QUESTION_BANK } from "../data/curriculumData";
import { fetchTeacherDailyPlan } from "../services/aiService";
import { saveUserProgress } from "../services/storageService";
import { useLanguage } from "../i18n/LanguageContext";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Sparkles,
  GraduationCap,
  AlertCircle,
  ArrowRight,
  RotateCcw
} from "lucide-react";
import { DailyProgramNavigator } from "./DailyProgramNavigator";
import { NavTabType } from "./Header";

interface CurriculumViewProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onStartDayTest: (day: CurriculumDay, questions: Question[]) => void;
  onStartMistakeDrill: () => void;
  onNavigateToMemorization: () => void;
  onNavigateToPrayers?: () => void;
  onNavigateToTab?: (tab: NavTabType) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  progress,
  onProgressUpdate,
  onStartDayTest,
  onStartMistakeDrill,
  onNavigateToMemorization,
  onNavigateToPrayers,
  onNavigateToTab,
}) => {
  const { t, getCurriculumDay, getQuestion } = useLanguage();
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(progress.currentDay || 1);
  const [teacherPlan, setTeacherPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  const rawDay = CURRICULUM_DAYS.find((d) => d.day === selectedDayNumber) || CURRICULUM_DAYS[0];
  const activeDay = getCurriculumDay(rawDay);

  const mistakesList = Object.values(progress.mistakes || {}) as { isMastered: boolean }[];
  const unresolvedMistakesCount = mistakesList.filter((m) => !m.isMastered).length;
  const masteredCount = mistakesList.filter((m) => m.isMastered).length;

  const totalTests = progress.testHistory?.length || 0;
  const avgScore =
    totalTests > 0
      ? Math.round(progress.testHistory.reduce((acc, t) => acc + t.scorePercentage, 0) / totalTests)
      : 0;

  useEffect(() => {
    let isMounted = true;
    const fetchPlan = async () => {
      setLoadingPlan(true);
      try {
        const advice = await fetchTeacherDailyPlan({
          dayNumber: selectedDayNumber,
          totalMistakes: unresolvedMistakesCount,
          masteredCount,
          accuracyRate: avgScore || 85,
        });
        if (isMounted) setTeacherPlan(advice);
      } catch {
        if (isMounted) {
          setTeacherPlan(
            `Welcome to Day ${selectedDayNumber}! Allocate 8 minutes to resolve active mistakes, 15 minutes to today's 1–4 multiple-choice test, and 7 minutes to reciting prayers in Memorization Mode.`
          );
        }
      } finally {
        if (isMounted) setLoadingPlan(false);
      }
    };

    fetchPlan();
    return () => {
      isMounted = false;
    };
  }, [selectedDayNumber, unresolvedMistakesCount, masteredCount, avgScore]);

  const handleStartDay = (dayNum?: number) => {
    const targetDayNumber = dayNum || activeDay.day;
    const dayObj = CURRICULUM_DAYS.find((d) => d.day === targetDayNumber) || rawDay;
    const curDay = getCurriculumDay(dayObj);

    const dayQuestions = curDay.questionIds
      .map((id) => MASTER_QUESTION_BANK[id])
      .filter((q): q is Question => Boolean(q))
      .map((q) => getQuestion(q));

    // Update currentDay in progress if advancing
    if (curDay.day > (progress.currentDay || 1)) {
      const updated: UserProgress = {
        ...progress,
        currentDay: curDay.day,
      };
      onProgressUpdate(updated);
      saveUserProgress(updated);
    }

    onStartDayTest(curDay, dayQuestions);
  };

  const handleTabNavigation = (tab: string) => {
    if (onNavigateToTab) {
      onNavigateToTab(tab as NavTabType);
    }
  };

  return (
    <div className="space-y-8 text-slate-800 max-w-5xl mx-auto pb-12">
      {/* 1. Daily Program Progress Tracker & Navigator */}
      <DailyProgramNavigator
        progress={progress}
        onProgressUpdate={(updated) => {
          onProgressUpdate(updated);
          saveUserProgress(updated);
        }}
        onNavigateToTab={handleTabNavigation}
        onStartDayTest={(dayNum) => handleStartDay(dayNum)}
        selectedDayNumber={selectedDayNumber}
        onSelectDayNumber={(dayNum) => setSelectedDayNumber(dayNum)}
      />

      {/* 2. Teacher's Daily Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {t.curriculumHeaderTitle}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                  Day {activeDay.day} of 14
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t.curriculumHeaderSubtitle}
              </p>
            </div>
          </div>

          <button
            id={`btn-start-day-${activeDay.day}-curriculum`}
            onClick={() => handleStartDay()}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span>Start Day {activeDay.day} Test ({activeDay.questionIds.length} Qs)</span>
          </button>
        </div>

        {/* Dynamic Teacher Recommendation */}
        <div className="pt-4 flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 mt-4">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-700 mr-1">{t.aiTeacherPlanTitle}:</span>
            {loadingPlan ? (
              <span className="text-slate-400 italic">{t.aiTeacherPlanLoading}</span>
            ) : (
              <span className="leading-relaxed text-slate-600">{teacherPlan}</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Active Day Detailed Lesson Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-600 font-bold font-mono">
              Day {activeDay.day} • {activeDay.category.toUpperCase()}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {activeDay.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{activeDay.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Target: 30 Minutes</span>
          </div>
        </div>

        {/* Day Summary */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
            Today's Lesson Overview
          </h4>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {activeDay.summary}
          </p>
        </div>

        {/* 4 Core Learning Points */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
            {t.learningObjectivesTitle}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeDay.learningPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700"
              >
                <div className="w-6 h-6 rounded-xl bg-blue-100 text-blue-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="leading-normal">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Phase Daily 30-Minute Routine Box */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" /> Recommended 30-Minute Schedule Breakdown
            </span>
            <span className="text-xs text-slate-400 font-mono font-semibold">30 Mins Total</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Phase 1: Mistake Repetition Drill */}
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-orange-700 mb-1">
                  <span>Phase 1 (8 Mins)</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <h5 className="text-sm font-bold text-orange-950">Mistake Repetition Drill</h5>
                <p className="text-xs text-orange-700/80 mt-1">
                  {unresolvedMistakesCount > 0
                    ? `Drill your ${unresolvedMistakesCount} active mistakes until mastered.`
                    : "Zero active mistakes! Clean queue."}
                </p>
              </div>
              <button
                onClick={onStartMistakeDrill}
                className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {t.startDrillBtn}
              </button>
            </div>

            {/* Phase 2: 1-4 MCQ Test Examination */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1">
                  <span>Phase 2 (15 Mins)</span>
                  <Play className="w-3.5 h-3.5" />
                </div>
                <h5 className="text-sm font-bold text-blue-950">1–4 MCQ Test Examination</h5>
                <p className="text-xs text-blue-700/80 mt-1">
                  Test today's lesson with {activeDay.questionIds.length} questions.
                </p>
              </div>
              <button
                onClick={() => handleStartDay()}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {t.startDailyTestBtn}
              </button>
            </div>

            {/* Phase 3: Memorization & Chants */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 mb-1">
                  <span>Phase 3 (7 Mins)</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h5 className="text-sm font-bold text-purple-950">Memorization & Prayers</h5>
                <p className="text-xs text-purple-700/80 mt-1">
                  Lock today's sacred text into long-term memory.
                </p>
              </div>
              <button
                onClick={onNavigateToMemorization}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {t.tabMemorize}
              </button>
            </div>
          </div>
        </div>

        {/* Key Text to Memorize */}
        {activeDay.keyTextToMemorize && (
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-900 space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" /> {t.keyTextToMemorizeTitle}
            </span>
            <p className="text-sm font-serif italic text-amber-950 font-medium">
              "{activeDay.keyTextToMemorize}"
            </p>
          </div>
        )}

        {/* Completion & Test Launch Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              const isComp = progress.completedDays?.includes(activeDay.day);
              const updatedDays = isComp
                ? progress.completedDays.filter((d) => d !== activeDay.day)
                : [...(progress.completedDays || []), activeDay.day];
              const updated: UserProgress = {
                ...progress,
                completedDays: updatedDays,
              };
              onProgressUpdate(updated);
              saveUserProgress(updated);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {progress.completedDays?.includes(activeDay.day)
                ? t.markAsIncompleteBtn
                : t.markAsCompleteBtn}
            </span>
          </button>

          <button
            onClick={() => handleStartDay()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.startDailyTestBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
