import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Heart,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Flame,
  Award,
  Calendar,
  ArrowRight
} from "lucide-react";
import {
  TEST_CONTENT_CATEGORIES,
  TestContentCategory,
  generateCategoryQuestions
} from "../services/comprehensiveTestService";
import { MultipleChoiceTest } from "./MultipleChoiceTest";
import { Question, UserProgress, TestSessionResult, MistakeRecord } from "../types";
import { DAILY_PROGRAM_DAYS } from "../data/dailyProgramData";

interface ComprehensiveTestHubProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onOpenTeacherHelp: (q: Question, selected: number, correct: number) => void;
  onAdvanceDay?: () => void;
  initialCategory?: TestContentCategory;
  initialDay?: number;
}

export const ComprehensiveTestHub: React.FC<ComprehensiveTestHubProps> = ({
  progress,
  onProgressUpdate,
  onOpenTeacherHelp,
  onAdvanceDay,
  initialCategory,
  initialDay
}) => {
  const [activeCategory, setActiveCategory] = useState<TestContentCategory>(
    initialCategory || "curriculum_daily"
  );
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(
    initialDay || progress.currentDay || 1
  );
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [activeTestQuestions, setActiveTestQuestions] = useState<Question[] | null>(null);
  const [testTitle, setTestTitle] = useState<string>("");
  const [testSubtitle, setTestSubtitle] = useState<string>("");
  const [lastFinishedResult, setLastFinishedResult] = useState<TestSessionResult | null>(null);

  const mistakesList = Object.values(progress.mistakes || {}) as MistakeRecord[];
  const unresolvedMistakesCount = mistakesList.filter((m) => !m.isMastered).length;

  const handleLaunchTest = (cat: TestContentCategory, dayNum?: number) => {
    const targetDay = dayNum || selectedDayNumber;
    const qs = generateCategoryQuestions(cat, questionCount, targetDay);

    const categoryMeta = TEST_CONTENT_CATEGORIES.find((c) => c.id === cat);
    let title = categoryMeta ? categoryMeta.name : "1-to-4 Multiple-Choice Test";
    let subtitle = `4-Option Examination • ${qs.length} Questions`;

    if (cat === "curriculum_daily") {
      const schedule = DAILY_PROGRAM_DAYS.find((d) => d.day === targetDay);
      title = `Day ${targetDay} Examination: ${schedule ? schedule.title : `Curriculum Day ${targetDay}`}`;
      subtitle = `Daily Program • ${qs.length} Questions`;
    }

    setTestTitle(title);
    setTestSubtitle(subtitle);
    setActiveTestQuestions(qs);
    setLastFinishedResult(null);
  };

  const handleStartMistakeDrill = () => {
    const mistakes = mistakesList.filter((m) => !m.isMastered);
    if (mistakes.length === 0) return;

    // Use stored Question objects from mistakes
    const qs: Question[] = mistakes.map((m) => m.question);

    setTestTitle("Spaced Repetition Mistake Drill");
    setTestSubtitle(`Drilling ${qs.length} active mistake(s) until mastered`);
    setActiveTestQuestions(qs);
    setLastFinishedResult(null);
  };

  const handleTestFinished = (result: TestSessionResult) => {
    setLastFinishedResult(result);

    // If it was a daily curriculum test and score >= 70, automatically mark day completed if not already!
    if (result.day && result.scorePercentage >= 70) {
      const currentCompleted = progress.completedDays || [];
      if (!currentCompleted.includes(result.day)) {
        const updated: UserProgress = {
          ...progress,
          completedDays: [...currentCompleted, result.day],
        };
        onProgressUpdate(updated);
      }
    }
  };

  // If a test session is actively running, render the 1-to-4 Test screen
  if (activeTestQuestions && activeTestQuestions.length > 0) {
    return (
      <div className="space-y-6">
        {/* Top Back to Test Hub Bar */}
        <div className="max-w-4xl mx-auto flex items-center justify-between px-2">
          <button
            onClick={() => {
              setActiveTestQuestions(null);
              setLastFinishedResult(null);
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Exit to Test Hub</span>
          </button>

          {lastFinishedResult && lastFinishedResult.day && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Day {lastFinishedResult.day} Completed!
              </span>
              {onAdvanceDay && (
                <button
                  onClick={() => {
                    onAdvanceDay();
                    setActiveTestQuestions(null);
                  }}
                  className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1"
                >
                  <span>Advance to Next Day</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        <MultipleChoiceTest
          questions={activeTestQuestions}
          title={testTitle}
          subtitle={testSubtitle}
          day={activeCategory === "curriculum_daily" ? selectedDayNumber : undefined}
          progress={progress}
          onProgressUpdate={onProgressUpdate}
          onFinishTest={handleTestFinished}
          onOpenTeacherHelp={onOpenTeacherHelp}
          onStartMistakeDrill={unresolvedMistakesCount > 0 ? handleStartMistakeDrill : undefined}
        />
      </div>
    );
  }

  // Otherwise, render the Comprehensive Test Hub Selector
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Universal 1-to-4 Testing Engine
              </span>
              <span className="text-xs text-slate-500 font-semibold font-mono">
                Keyboard Keys: 1, 2, 3, 4 + Enter
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Comprehensive Catholic Testing Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Every area of formation is covered: Daily Curriculum, all 370 Penny Catechism questions, The Holy Rosary, Sacred Scripture, The Holy Mass, Sacraments, and Moral Law.
            </p>
          </div>

          {/* Question Count Selector */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Questions per Test:
            </span>
            <div className="flex items-center gap-1.5">
              {[5, 10, 20, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    questionCount === num
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Quick-Launch: Today's Daily Program Test */}
        <div className="mt-6 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                Assigned Today (Day {progress.currentDay || 1})
              </span>
              {progress.completedDays?.includes(progress.currentDay || 1) && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Already Finished
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-amber-950">
              Today's Daily Program 1-to-4 Examination
            </h3>
            <p className="text-xs text-amber-800">
              Test today's lesson, doctrine, and scripture retention in strict 4-option mode.
            </p>
          </div>

          <button
            onClick={() => handleLaunchTest("curriculum_daily", progress.currentDay || 1)}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Day {progress.currentDay || 1} Test</span>
          </button>
        </div>

        {/* Mistake Repetition Drill Card (if active mistakes exist) */}
        {unresolvedMistakesCount > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-orange-950">
                  Active Mistake Repetition Bank ({unresolvedMistakesCount} question{unresolvedMistakesCount === 1 ? "" : "s"})
                </h4>
                <p className="text-xs text-orange-700">
                  Targeted spaced-repetition testing until each missed question is mastered.
                </p>
              </div>
            </div>

            <button
              onClick={handleStartMistakeDrill}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Drill Mistakes Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of All Available Content Categories for 1-to-4 Testing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Select Content Domain to Test (All Available in 1-to-4 Format)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {TEST_CONTENT_CATEGORIES.length} Specialized Domains
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEST_CONTENT_CATEGORIES.map((cat) => {
            const isDaily = cat.id === "curriculum_daily";

            return (
              <div
                key={cat.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold font-mono">
                      {cat.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      ~{cat.totalPoolEstimate} Questions
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">{cat.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>

                  {/* Day Picker if Curriculum Daily */}
                  {isDaily && (
                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                        Select Curriculum Day:
                      </label>
                      <select
                        value={selectedDayNumber}
                        onChange={(e) => setSelectedDayNumber(Number(e.target.value))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                      >
                        {DAILY_PROGRAM_DAYS.map((d) => (
                          <option key={d.day} value={d.day}>
                            Day {d.day}: {d.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleLaunchTest(cat.id, isDaily ? selectedDayNumber : undefined)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start 1-to-4 Test ({questionCount} Qs)</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
