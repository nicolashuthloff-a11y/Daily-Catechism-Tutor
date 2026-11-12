import React, { useState, useRef } from "react";
import { UserProgress } from "../types";
import {
  Award,
  Flame,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  FileJson
} from "lucide-react";
import { downloadProgressBackup, importProgressFromJson } from "../services/storageService";

interface ScoreAnalyticsViewProps {
  progress: UserProgress;
  onProgressUpdate?: (updated: UserProgress) => void;
  onClearHistory?: () => void;
}

export const ScoreAnalyticsView: React.FC<ScoreAnalyticsViewProps> = ({
  progress,
  onProgressUpdate,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const history = progress.testHistory || [];
  const allMistakes = Object.values(progress.mistakes || {}) as {
    isMastered: boolean;
    question: { category: string };
  }[];
  const activeMistakes = allMistakes.filter((m) => !m.isMastered);
  const masteredMistakes = allMistakes.filter((m) => m.isMastered);

  const totalTests = history.length;
  const avgScore =
    totalTests > 0
      ? Math.round(history.reduce((acc, h) => acc + h.scorePercentage, 0) / totalTests)
      : 0;

  const highestScore =
    totalTests > 0 ? Math.max(...history.map((h) => h.scorePercentage)) : 0;

  const totalQuestionsAnswered = history.reduce((acc, h) => acc + h.totalQuestions, 0);
  const totalCorrectAnswered = history.reduce((acc, h) => acc + h.correctCount, 0);

  // Recovery Rate
  const recoveryRate =
    allMistakes.length > 0
      ? Math.round((masteredMistakes.length / allMistakes.length) * 100)
      : 100;

  // Category breakdown
  const categoryStats: Record<string, { total: number; mastered: number; failed: number }> = {
    prayers: { total: 0, mastered: 0, failed: 0 },
    commandments: { total: 0, mastered: 0, failed: 0 },
    sacraments: { total: 0, mastered: 0, failed: 0 },
    mass: { total: 0, mastered: 0, failed: 0 },
    doctrine: { total: 0, mastered: 0, failed: 0 },
  };

  allMistakes.forEach((m) => {
    const cat = m.question.category || "doctrine";
    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, mastered: 0, failed: 0 };
    }
    categoryStats[cat].total += 1;
    if (m.isMastered) categoryStats[cat].mastered += 1;
    else categoryStats[cat].failed += 1;
  });

  const handleExportBackup = () => {
    downloadProgressBackup(progress);
    setToastMessage("Study progress backup downloaded successfully!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      const res = importProgressFromJson(content);
      if (res.success && res.progress) {
        if (onProgressUpdate) {
          onProgressUpdate(res.progress);
        }
        setToastMessage("Progress backup successfully imported and restored!");
      } else {
        setToastMessage(`Import failed: ${res.error || "Invalid file"}`);
      }
      setTimeout(() => setToastMessage(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs bg-slate-950/20 px-2 py-1 rounded-lg"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Score Tracker & Improvement Analytics
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Keeping track of your daily study minutes, test scores, and mistake recovery over time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-2 rounded-2xl border border-amber-200 dark:border-amber-800">
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-500/30" />
              <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
                {progress.dailyStreak || 1} Day Streak
              </span>
            </div>

            {/* Backup & Restore Action Buttons */}
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Download backup file of your study streak and test history"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Import and restore progress from a JSON backup file"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Restore</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* 4 Core Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Score</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">
              {avgScore}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Across {totalTests} tests</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highest Score</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {highestScore}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Personal Best</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mistake Recovery</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              {recoveryRate}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{masteredMistakes.length} conquered</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Study Time</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-800 dark:text-slate-100 mt-1">
              {Math.round(progress.totalMinutesStudied || 0)}m
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {Math.round(progress.todayMinutesStudied || 0)}m today
            </span>
          </div>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Curriculum Category Mastery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {Object.entries(categoryStats).map(([cat, stats]) => {
            const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 100;
            return (
              <div
                key={cat}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center space-y-1"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 capitalize">
                  {cat}
                </div>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
                  {pct}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {stats.mastered}/{stats.total} mastered
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Test Sessions Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Recent Test History ({history.length} attempts)
        </h3>

        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            No test sessions recorded yet. Complete a Daily Curriculum Test to begin tracking your scores!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Test Mode</th>
                  <th className="py-2.5 px-3">Day</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Correct</th>
                  <th className="py-2.5 px-3">Missed</th>
                  <th className="py-2.5 px-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.slice(0, 25).map((h) => {
                  const dateStr = new Date(h.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-mono text-slate-400">{dateStr}</td>
                      <td className="py-3 px-3 capitalize font-bold text-slate-800 dark:text-slate-200">
                        {h.mode.replace("_", " ")}
                      </td>
                      <td className="py-3 px-3 font-mono">{h.day ? `Day ${h.day}` : "—"}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-mono font-bold px-2.5 py-1 rounded-full text-xs ${
                            h.scorePercentage >= 80
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              : h.scorePercentage >= 60
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                              : "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                          }`}
                        >
                          {h.scorePercentage}%
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{h.correctCount}</td>
                      <td className="py-3 px-3 font-mono font-bold text-rose-600 dark:text-rose-400">
                        {h.missedQuestionIds.length}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">{h.durationSeconds}s</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
