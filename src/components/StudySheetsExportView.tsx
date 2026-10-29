import React, { useState } from "react";
import {
  Printer,
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Award,
  Sparkles
} from "lucide-react";
import { CURRICULUM_DAYS } from "../data/curriculumData";
import { MEMORIZATION_ITEMS } from "../data/memorizationData";

export const StudySheetsExportView: React.FC = () => {
  const [copiedState, setCopiedState] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const copyAnkiDeck = () => {
    // Generate simple tab-separated Anki / Quizlet format
    const lines = MEMORIZATION_ITEMS.map((item) => {
      const front = `<b>${item.title}</b> (${item.category.toUpperCase()})<br>${item.subtitle || ""}`;
      const back = item.fullText.replace(/\n/g, "<br>");
      return `${front}\t${back}`;
    });

    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedState("anki");
    setTimeout(() => setCopiedState(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200 uppercase tracking-wider">
                Printable Handouts & Anki Exporter
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Printable Catechism Cheat Sheets & Flashcard Decks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Export high-contrast study handouts for offline catechism classes, RCIA study groups, family home review, or import directly into Anki and Quizlet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copyAnkiDeck}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              {copiedState === "anki" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedState === "anki" ? "Copied Anki Cards!" : "Copy Anki / Quizlet Deck"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Study Handout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 print:border-none print:shadow-none print:p-0 space-y-8">
        {/* Document Title Header for Printout */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
              Traditional Catholic Catechism Study Guide
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              14-Day Foundation: Chief Prayers, The 10 Commandments, The 7 Sacraments & The Holy Mass
            </p>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono hidden sm:block">
            AI Catechism Applet Handout
          </div>
        </div>

        {/* Section 1: 14-Day Curriculum Quick Reference */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <span>Part I: 14-Day Curriculum Overview</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {CURRICULUM_DAYS.map((d) => (
              <div
                key={d.day}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 print:bg-transparent print:border-slate-300 space-y-1"
              >
                <div className="font-bold text-slate-900">
                  Day {d.day}: {d.title}
                </div>
                <div className="text-slate-600">{d.subtitle}</div>
                <div className="text-[11px] text-blue-700 italic">
                  Key: {d.learningPoints[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Chief Prayers & Memorization Master Table */}
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <span>Part II: Chief Catholic Prayers</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {MEMORIZATION_ITEMS.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-white print:border-slate-300 space-y-2"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                  {item.latinTitle && (
                    <div className="italic text-slate-500 font-serif">{item.latinTitle}</div>
                  )}
                </div>
                <blockquote className="text-slate-700 font-serif leading-relaxed whitespace-pre-line text-xs">
                  {item.fullText}
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Footer for Printout */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          "Hold fast to the traditions which you were taught, whether by word of mouth or by letter from us." — 2 Thessalonians 2:15
        </div>
      </div>
    </div>
  );
};
