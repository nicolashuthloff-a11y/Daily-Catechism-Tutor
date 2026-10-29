import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  Info
} from "lucide-react";
import { LATIN_PARALLEL_PRAYERS, ParallelPrayerGuide } from "../data/latinParallelData";
import { devotionalAudio } from "../services/devotionalAudioService";

export const LatinParallelReaderView: React.FC = () => {
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>(LATIN_PARALLEL_PRAYERS[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const [showLiteralBreakdown, setShowLiteralBreakdown] = useState<boolean>(true);

  const selectedPrayer = LATIN_PARALLEL_PRAYERS.find((p) => p.id === selectedPrayerId) || LATIN_PARALLEL_PRAYERS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSpeak = (text: string, key: string, lang: "la" | "en" = "la") => {
    if (speakingKey === key) {
      devotionalAudio.stop();
      setSpeakingKey(null);
      return;
    }

    setSpeakingKey(key);
    devotionalAudio.speakText(
      text,
      lang,
      0.85,
      () => setSpeakingKey(null),
      () => setSpeakingKey(null)
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 uppercase tracking-wider">
                Ecclesiastical Latin & English Interlinear Reader
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Parallel Liturgical Reader & Phonetic Pronunciation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Master the official universal language of the Western Church with side-by-side English translations, Vatican-standard phonetic transcriptions, and word-by-word grammatical breakdowns.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLiteralBreakdown(!showLiteralBreakdown)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                showLiteralBreakdown
                  ? "bg-blue-50 text-blue-800 border-blue-200"
                  : "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {showLiteralBreakdown ? "Hide Word Breakdown" : "Show Word Breakdown"}
            </button>
          </div>
        </div>

        {/* Prayer Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-6 border-t border-slate-100">
          {LATIN_PARALLEL_PRAYERS.map((p) => {
            const isSelected = p.id === selectedPrayerId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPrayerId(p.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-amber-50 border-amber-300 ring-2 ring-amber-400/20 text-amber-950 font-bold"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="text-xs font-bold">{p.latinTitle}</div>
                <div className="text-[11px] text-slate-500 truncate">{p.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Prayer Parallel Display Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                {selectedPrayer.latinTitle}
              </h3>
              <span className="text-xs text-slate-500 font-serif">
                ({selectedPrayer.title})
              </span>
            </div>
            {selectedPrayer.rubrics && (
              <p className="text-xs text-slate-500 mt-1 italic">
                {selectedPrayer.rubrics}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const fullLatin = selectedPrayer.verses.map((v) => v.latin).join(" ");
                handleSpeak(fullLatin, "full-latin", "la");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              {speakingKey === "full-latin" ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{speakingKey === "full-latin" ? "Stop Recitation" : "Listen in Latin"}</span>
            </button>
          </div>
        </div>

        {/* Verses Table / List */}
        <div className="space-y-4">
          {selectedPrayer.verses.map((verse, idx) => {
            const verseKey = `${selectedPrayer.id}-${idx}`;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                  {/* Latin & Phonetic Column */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                        Latin (Ecclesiastical)
                      </span>
                      <button
                        onClick={() => handleSpeak(verse.latin, `latin-${verseKey}`, "la")}
                        className="text-xs text-amber-800 hover:text-amber-950 flex items-center gap-1 font-semibold"
                      >
                        {speakingKey === `latin-${verseKey}` ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>Pronounce</span>
                      </button>
                    </div>

                    <div className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed">
                      {verse.latin}
                    </div>

                    <div className="text-xs sm:text-sm font-mono text-amber-900/90 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40 leading-relaxed">
                      🗣️ <span className="font-bold">Phonetics:</span> {verse.phonetic}
                    </div>
                  </div>

                  {/* English Translation Column */}
                  <div className="space-y-2 lg:border-l lg:border-slate-200 lg:pl-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                        English Translation
                      </span>
                      <button
                        onClick={() => handleCopy(verse.english, `eng-${verseKey}`)}
                        className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                      >
                        {copiedKey === `eng-${verseKey}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <div className="text-base sm:text-lg font-serif text-slate-800 leading-relaxed pt-1">
                      {verse.english}
                    </div>
                  </div>
                </div>

                {/* Literal Word-for-Word Breakdown */}
                {showLiteralBreakdown && verse.literalBreakdown && verse.literalBreakdown.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Info className="w-3 h-3 text-blue-500" />
                      <span>Literal Word Breakdown:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {verse.literalBreakdown.map((item, wIdx) => (
                        <div
                          key={wIdx}
                          className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs shadow-xs"
                        >
                          <span className="font-bold font-serif text-amber-900">{item.word}</span>
                          <span className="text-slate-400 mx-1">→</span>
                          <span className="text-slate-600">{item.translation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
