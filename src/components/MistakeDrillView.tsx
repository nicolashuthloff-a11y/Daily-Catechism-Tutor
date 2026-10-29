import React, { useState } from "react";
import { UserProgress, MistakeRecord, Question } from "../types";
import { MultipleChoiceTest } from "./MultipleChoiceTest";
import { AlertCircle, CheckCircle2, RotateCcw, Sparkles, Filter, Trash2, ArrowRight } from "lucide-react";

interface MistakeDrillViewProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onOpenTeacherHelp: (q: Question, selected: number, correct: number) => void;
}

export const MistakeDrillView: React.FC<MistakeDrillViewProps> = ({
  progress,
  onProgressUpdate,
  onOpenTeacherHelp,
}) => {
  const [activeDrillQuestions, setActiveDrillQuestions] = useState<Question[] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const allMistakes = (Object.values(progress.mistakes || {}) as MistakeRecord[]);
  const unresolvedMistakes = allMistakes.filter((m) => !m.isMastered);
  const masteredMistakes = allMistakes.filter((m) => m.isMastered);

  const filteredMistakes = (filterCategory === "all"
    ? unresolvedMistakes
    : unresolvedMistakes.filter((m) => m.question.category === filterCategory)
  ).sort((a, b) => b.timesFailed - a.timesFailed);

  const startDrillSession = (questionsToDrill?: Question[]) => {
    const list = questionsToDrill || filteredMistakes.map((m) => m.question);
    if (list.length === 0) return;
    // Shuffle the drill questions for effective testing
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setActiveDrillQuestions(shuffled);
  };

  const handleClearMastered = () => {
    const activeOnly: Record<string, MistakeRecord> = {};
    for (const [id, m] of Object.entries(progress.mistakes || {}) as [string, MistakeRecord][]) {
      if (!m.isMastered) activeOnly[id] = m;
    }
    const updated: UserProgress = {
      ...progress,
      mistakes: activeOnly,
    };
    onProgressUpdate(updated);
  };

  if (activeDrillQuestions) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl text-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="font-bold text-orange-600">🔄 Active Mistake Repetition Drill</span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-slate-600">{activeDrillQuestions.length} Questions queued for mastery</span>
          </div>
          <button
            onClick={() => setActiveDrillQuestions(null)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
          >
            Exit Drill Mode
          </button>
        </div>

        <MultipleChoiceTest
          questions={activeDrillQuestions}
          title="Mistake Repetition Drill (Mastery Test)"
          subtitle="Answer each correctly 2 consecutive times to clear from your mistake bank"
          mode="mistake_drill"
          progress={progress}
          onProgressUpdate={onProgressUpdate}
          onFinishTest={() => {
            // keep state updated
          }}
          onOpenTeacherHelp={onOpenTeacherHelp}
          onStartMistakeDrill={() => {
            // refresh active drill with remaining unresolved mistakes
            const updatedUnresolved = (Object.values(progress.mistakes || {}) as MistakeRecord[]).filter((m) => !m.isMastered);
            if (updatedUnresolved.length > 0) {
              setActiveDrillQuestions(updatedUnresolved.map((m) => m.question));
            } else {
              setActiveDrillQuestions(null);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-800 max-w-5xl mx-auto">
      {/* Top Banner & Stats */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Mistake Bank & Spaced Repetition
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Your teacher's rule: Repeatedly test missed questions until answered correctly twice consecutively.
              </p>
            </div>
          </div>

          {unresolvedMistakes.length > 0 && (
            <button
              id="btn-start-all-mistakes-drill"
              onClick={() => startDrillSession()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Drill All {unresolvedMistakes.length} Mistakes Now</span>
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Mistakes</span>
            <div className="text-2xl font-mono font-black text-rose-600">
              {unresolvedMistakes.length}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Mastered & Cleared</span>
            <div className="text-2xl font-mono font-black text-emerald-600">
              {masteredMistakes.length}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Encountered</span>
            <div className="text-2xl font-mono font-black text-slate-700">
              {allMistakes.length}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Recovery Rate</span>
            <div className="text-2xl font-mono font-black text-blue-600">
              {allMistakes.length > 0
                ? `${Math.round((masteredMistakes.length / allMistakes.length) * 100)}%`
                : "100%"}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Content */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: "all", label: `All (${unresolvedMistakes.length})` },
            { id: "prayers", label: "Chief Prayers" },
            { id: "commandments", label: "Ten Commandments" },
            { id: "sacraments", label: "Seven Sacraments" },
            { id: "mass", label: "Order of Mass" },
            { id: "doctrine", label: "Doctrine" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold border transition-all ${
                filterCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {masteredMistakes.length > 0 && (
          <button
            onClick={handleClearMastered}
            className="text-xs text-slate-600 hover:text-slate-800 font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs transition-colors"
            title="Remove 100% mastered items from archive"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            Clear Mastered ({masteredMistakes.length})
          </button>
        )}
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xl shadow-slate-200/50">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mx-auto flex items-center justify-center font-bold">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Active Mistakes in this Category!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            You currently have zero unresolved errors here. Take today's curriculum test or review Chief Prayers in Memorization Mode!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMistakes.map((record) => {
            const q = record.question;
            return (
              <div
                key={record.questionId}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 flex flex-col justify-between gap-4 transition-all shadow-md shadow-slate-100 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100 uppercase tracking-wider font-mono">
                      {q.categoryLabel || q.category}
                    </span>
                    <span className="text-rose-600 font-mono font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Failed {record.timesFailed} time{record.timesFailed === 1 ? "" : "s"}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-800 text-base leading-snug">
                    {q.question}
                  </h4>

                  {/* Options Overview */}
                  <div className="space-y-1.5 pt-1 text-xs">
                    {q.options.map((opt, i) => {
                      const num = i + 1;
                      const isCorrect = num === q.correctAnswer;
                      return (
                        <div
                          key={i}
                          className={`p-2 rounded-xl flex items-center gap-2 ${
                            isCorrect
                              ? "text-emerald-800 font-bold bg-emerald-50 border border-emerald-100"
                              : "text-slate-500 bg-slate-50/50"
                          }`}
                        >
                          <span className="font-mono font-bold text-xs">[{num}]</span>
                          <span className="truncate">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    Mastery: <span className="text-blue-600 font-bold">{record.consecutiveCorrect}/2</span> correct
                  </div>

                  <button
                    onClick={() => startDrillSession([q])}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
                  >
                    <span>Drill Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
