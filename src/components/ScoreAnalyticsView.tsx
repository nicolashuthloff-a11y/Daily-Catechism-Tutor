import React from "react";
import { UserProgress } from "../types";
import { Award, Flame, TrendingUp, AlertTriangle, CheckCircle2, Clock, RotateCcw } from "lucide-react";

interface ScoreAnalyticsViewProps {
  progress: UserProgress;
  onClearHistory?: () => void;
}

export const ScoreAnalyticsView: React.FC<ScoreAnalyticsViewProps> = ({ progress }) => {
  const history = progress.testHistory || [];
  const allMistakes = (Object.values(progress.mistakes || {}) as { isMastered: boolean; question: { category: string } }[]);
  const activeMistakes = allMistakes.filter((m) => !m.isMastered);
  const masteredMistakes = allMistakes.filter((m) => m.isMastered);

  const totalTests = history.length;
  const avgScore = totalTests > 0
    ? Math.round(history.reduce((acc, h) => acc + h.scorePercentage, 0) / totalTests)
    : 0;

  const highestScore = totalTests > 0
    ? Math.max(...history.map((h) => h.scorePercentage))
    : 0;

  const totalQuestionsAnswered = history.reduce((acc, h) => acc + h.totalQuestions, 0);
  const totalCorrectAnswered = history.reduce((acc, h) => acc + h.correctCount, 0);

  // Recovery Rate
  const recoveryRate = allMistakes.length > 0
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

  return (
    <div className="space-y-6 text-slate-800 max-w-5xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Score Tracker & Improvement Analytics
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Keeping track of your daily study minutes, test scores, and mistake recovery over time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500/30" />
            <span className="text-sm font-bold text-amber-800">
              {progress.dailyStreak || 1} Day Streak
            </span>
          </div>
        </div>

        {/* 4 Core Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Score</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 mt-1">
              {avgScore}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Across {totalTests} tests</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highest Score</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 mt-1">
              {highestScore}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Personal Best</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mistake Recovery</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600 mt-1">
              {recoveryRate}%
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{masteredMistakes.length} conquered</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Study Time</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-800 mt-1">
              {Math.round(progress.totalMinutesStudied || 0)}m
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Today: {progress.todayMinutesStudied || 0}/30m
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Improvements & Category Mastery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Overall Accuracy & Improvements */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl shadow-slate-200/50">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Accuracy & Memory Retention
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-slate-600 font-medium">Total Questions Attempted</span>
              <span className="font-mono font-bold text-slate-900">{totalQuestionsAnswered}</span>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-slate-600 font-medium">Total Correct Answers</span>
              <span className="font-mono font-bold text-emerald-600">
                {totalCorrectAnswered} (
                {totalQuestionsAnswered > 0
                  ? Math.round((totalCorrectAnswered / totalQuestionsAnswered) * 100)
                  : 0}
                %)
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-slate-600 font-medium">Active Queued Mistakes</span>
              <span className="font-mono font-bold text-rose-600">{activeMistakes.length}</span>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-slate-600 font-medium">Texts Memorized</span>
              <span className="font-mono font-bold text-blue-600">
                {progress.memorizedItemIds?.length || 0} items
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-slate-600 font-medium">Curriculum Days Completed</span>
              <span className="font-mono font-bold text-slate-900">
                {progress.completedDays?.length || 0} / 14 Days
              </span>
            </div>
          </div>
        </div>

        {/* Right: Category Performance Breakdown */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl shadow-slate-200/50">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Category Mastery Breakdown
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            {[
              { id: "prayers", label: "📿 Chief Prayers" },
              { id: "commandments", label: "📜 Ten Commandments" },
              { id: "sacraments", label: "🕊️ Seven Sacraments" },
              { id: "mass", label: "⛪ Order of the Mass" },
              { id: "doctrine", label: "✝️ Catholic Doctrine & Creed" },
            ].map((cat) => {
              const stat = categoryStats[cat.id] || { total: 0, mastered: 0, failed: 0 };
              const percent = stat.total > 0
                ? Math.round((stat.mastered / stat.total) * 100)
                : 100;

              return (
                <div key={cat.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{cat.label}</span>
                    <span className="font-mono font-bold text-blue-600 text-xs">
                      {stat.failed > 0 ? `${stat.failed} mistakes to drill` : "Mastered"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${stat.failed > 0 ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Past Test History Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl shadow-slate-200/50">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Recent Test History & Session Logs
        </h3>

        {history.length === 0 ? (
          <p className="text-xs sm:text-sm text-slate-400 py-6 text-center font-medium">
            No completed tests yet. Start with Day 1 in the Daily Curriculum!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="text-slate-400 border-b border-slate-100 text-[11px] uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Mode</th>
                  <th className="py-3 px-3">Day</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Correct</th>
                  <th className="py-3 px-3">Missed</th>
                  <th className="py-3 px-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {history.slice(0, 10).map((h) => {
                  const dateStr = new Date(h.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400">{dateStr}</td>
                      <td className="py-3 px-3 capitalize font-bold text-slate-800">
                        {h.mode.replace("_", " ")}
                      </td>
                      <td className="py-3 px-3 font-mono">{h.day ? `Day ${h.day}` : "—"}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-mono font-bold px-2.5 py-1 rounded-full text-xs ${
                            h.scorePercentage >= 80
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : h.scorePercentage >= 60
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {h.scorePercentage}%
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-600">{h.correctCount}</td>
                      <td className="py-3 px-3 font-mono font-bold text-rose-600">
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
