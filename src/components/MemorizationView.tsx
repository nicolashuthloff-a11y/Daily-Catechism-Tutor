import React, { useState } from "react";
import { MemorizationItem, UserProgress, Question } from "../types";
import { MEMORIZATION_ITEMS } from "../data/memorizationData";
import { saveUserProgress } from "../services/storageService";
import { Brain, Eye, EyeOff, CheckCircle2, BookOpen, Sparkles, ChevronRight, Award, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface MemorizationViewProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onStartQuizOnItem: (category: string) => void;
}

export const MemorizationView: React.FC<MemorizationViewProps> = ({
  progress,
  onProgressUpdate,
  onStartQuizOnItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<"prayers" | "commandments" | "sacraments" | "mass">("prayers");
  const [selectedItemId, setSelectedItemId] = useState<string>("prayer-our-father");
  const [practiceMode, setPracticeMode] = useState<"text" | "mask" | "cloze" | "steps">("mask");
  const [maskLevel, setMaskLevel] = useState<number>(50); // 0 = fully visible, 100 = fully hidden
  const [activeClozeIndex, setActiveClozeIndex] = useState<number>(0);
  const [clozeSelectedAnswer, setClozeSelectedAnswer] = useState<number | null>(null);
  const [clozeSubmitted, setClozeSubmitted] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const categoryItems = MEMORIZATION_ITEMS.filter((item) => item.category === activeCategory);
  const currentItem = categoryItems.find((item) => item.id === selectedItemId) || categoryItems[0] || MEMORIZATION_ITEMS[0];

  const isMemorized = progress.memorizedItemIds?.includes(currentItem.id);

  const handleToggleMemorized = (itemId: string) => {
    const list = progress.memorizedItemIds || [];
    let updatedList: string[];
    if (list.includes(itemId)) {
      updatedList = list.filter((id) => id !== itemId);
    } else {
      updatedList = [...list, itemId];
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
    const updated: UserProgress = {
      ...progress,
      memorizedItemIds: updatedList,
    };
    onProgressUpdate(updated);
    saveUserProgress(updated);
  };

  // Masking words based on maskLevel
  const renderMaskedText = (text: string) => {
    if (maskLevel === 0) return text;
    const words = text.split(" ");
    return words
      .map((word, i) => {
        // Deterministic pseudo-randomness based on word index
        const shouldHide = (i * 37) % 100 < maskLevel;
        if (shouldHide && word.trim().length > 0) {
          const cleanWord = word.replace(/[^a-zA-Z]/g, "");
          const punctuation = word.replace(/[a-zA-Z]/g, "");
          return `_`.repeat(Math.max(3, cleanWord.length)) + punctuation;
        }
        return word;
      })
      .join(" ");
  };

  return (
    <div className="space-y-6 text-slate-800 max-w-5xl mx-auto">
      {/* Category Tabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Dedicated Memorization Mode
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Master Chief Prayers, the Decalogue, 7 Sacraments, and the Order of the Mass through masked recall and 1–4 cloze tests.
            </p>
          </div>

          <button
            onClick={() => onStartQuizOnItem(activeCategory)}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take 1–4 MCQ Test on {activeCategory.toUpperCase()}</span>
          </button>
        </div>

        {/* 4 Main Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          {[
            { id: "prayers", label: "📿 Chief Prayers", count: MEMORIZATION_ITEMS.filter((i) => i.category === "prayers").length },
            { id: "commandments", label: "📜 Ten Commandments", count: MEMORIZATION_ITEMS.filter((i) => i.category === "commandments").length },
            { id: "sacraments", label: "🕊️ Seven Sacraments", count: MEMORIZATION_ITEMS.filter((i) => i.category === "sacraments").length },
            { id: "mass", label: "⛪ Order of Mass", count: MEMORIZATION_ITEMS.filter((i) => i.category === "mass").length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                const targetCat = cat.id as "prayers" | "commandments" | "sacraments" | "mass";
                setActiveCategory(targetCat);
                const first = MEMORIZATION_ITEMS.find((i) => i.category === targetCat);
                if (first) setSelectedItemId(first.id);
                setClozeSelectedAnswer(null);
                setClozeSubmitted(false);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-md shadow-blue-500/10 font-bold"
                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="text-xs sm:text-sm font-bold truncate">{cat.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{cat.count} texts</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Left Sidebar of Items + Right Memorization Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Item List */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Select Text to Memorize
          </div>
          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {categoryItems.map((item) => {
              const itemMemorized = progress.memorizedItemIds?.includes(item.id);
              const isSelected = item.id === currentItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItemId(item.id);
                    setClozeSelectedAnswer(null);
                    setClozeSubmitted(false);
                    setActiveClozeIndex(0);
                    setActiveStepIndex(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-blue-600 text-white font-bold border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="truncate">
                    <div className="text-xs sm:text-sm truncate">{item.title}</div>
                    {item.latinTitle && (
                      <div className={`text-[10px] italic truncate ${isSelected ? "text-blue-100 font-medium" : "text-slate-400"}`}>
                        {item.latinTitle}
                      </div>
                    )}
                  </div>
                  {itemMemorized && (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? "text-white" : "text-emerald-600"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Memorization Canvas */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/50">
          {/* Header of Active Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {currentItem.title}
                </h3>
                {currentItem.latinTitle && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-serif italic font-bold">
                    {currentItem.latinTitle}
                  </span>
                )}
              </div>
              {currentItem.subtitle && (
                <p className="text-xs text-slate-500 mt-0.5">{currentItem.subtitle}</p>
              )}
            </div>

            <button
              id={`btn-toggle-memorized-${currentItem.id}`}
              onClick={() => handleToggleMemorized(currentItem.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shadow-xs ${
                isMemorized
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isMemorized ? "Memorized! 🎉" : "Mark as Memorized"}</span>
            </button>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 text-xs overflow-x-auto">
            <button
              onClick={() => setPracticeMode("mask")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                practiceMode === "mask"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🎭 Progressive Mask (Blind Recall)
            </button>

            {currentItem.clozeBlanks && currentItem.clozeBlanks.length > 0 && (
              <button
                onClick={() => setPracticeMode("cloze")}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                  practiceMode === "cloze"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ✏️ 1–4 Fill in Blanks (Cloze)
              </button>
            )}

            {currentItem.stepsOrParts && currentItem.stepsOrParts.length > 0 && (
              <button
                onClick={() => setPracticeMode("steps")}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                  practiceMode === "steps"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                📜 Step-by-Step Recitation
              </button>
            )}

            <button
              onClick={() => setPracticeMode("text")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                practiceMode === "text"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              📖 Full Reference Text
            </button>
          </div>

          {/* VIEW: 1. Progressive Mask Mode */}
          {practiceMode === "mask" && (
            <div className="space-y-5">
              {/* Mask Slider Control */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-bold flex items-center gap-1.5">
                    {maskLevel === 100 ? <EyeOff className="w-4 h-4 text-rose-500" /> : <Eye className="w-4 h-4 text-blue-600" />}
                    Masking Level (Hide words to test memory):
                  </span>
                  <span className="text-blue-600 font-bold font-mono text-sm">{maskLevel}% Hidden</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={25}
                  value={maskLevel}
                  onChange={(e) => setMaskLevel(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>0% (Visible)</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100% (Complete Recall)</span>
                </div>
              </div>

              {/* Masked Output */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-base sm:text-lg leading-relaxed text-slate-800 shadow-inner whitespace-pre-line tracking-wide select-none">
                {renderMaskedText(currentItem.fullText)}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Tip: Recite aloud line-by-line with 100% masking to test complete mastery.</span>
                <button
                  onClick={() => setMaskLevel((prev) => (prev >= 100 ? 0 : prev + 25))}
                  className="text-blue-600 hover:text-blue-700 font-bold"
                >
                  {maskLevel >= 100 ? "Reveal Text" : "Increase Difficulty →"}
                </button>
              </div>
            </div>
          )}

          {/* VIEW: 2. 1-4 Cloze (Fill in the blanks) */}
          {practiceMode === "cloze" && currentItem.clozeBlanks && (
            <div className="space-y-5">
              <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 pb-2 font-medium">
                <span>
                  Blank {activeClozeIndex + 1} of {currentItem.clozeBlanks.length}
                </span>
                <span className="text-blue-600 font-bold">Choose the correct missing word (1–4)</span>
              </div>

              {/* Blank Prompt */}
              {currentItem.clozeBlanks[activeClozeIndex] && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                    {currentItem.clozeBlanks[activeClozeIndex].sentence.replace(
                      "___",
                      clozeSubmitted
                        ? `[ ${currentItem.clozeBlanks[activeClozeIndex].missingWord} ]`
                        : "_____"
                    )}
                  </div>

                  {/* 1-4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentItem.clozeBlanks[activeClozeIndex].options.map((opt, i) => {
                      const num = i + 1;
                      const isCorrect = num === currentItem.clozeBlanks![activeClozeIndex].correctIndex;
                      const isSelected = clozeSelectedAnswer === num;

                      let btnStyle = "bg-white border-2 border-slate-100 text-slate-700 hover:border-blue-600";
                      let numBadge = "bg-slate-100 text-slate-700";
                      if (clozeSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-2 border-emerald-600 text-emerald-800 font-bold";
                          numBadge = "bg-emerald-600 text-white";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-50 border-2 border-rose-600 text-rose-800 font-bold";
                          numBadge = "bg-rose-600 text-white";
                        } else {
                          btnStyle = "bg-slate-50/50 border border-slate-100 text-slate-400 opacity-50";
                          numBadge = "bg-slate-100 text-slate-400";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-blue-50 border-2 border-blue-600 text-blue-900 font-bold";
                        numBadge = "bg-blue-600 text-white";
                      }

                      return (
                        <button
                          key={i}
                          disabled={clozeSubmitted}
                          onClick={() => setClozeSelectedAnswer(num)}
                          className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center ${numBadge}`}>
                              {num}
                            </span>
                            <span className="text-sm font-bold">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Next button */}
                  <div className="flex justify-end pt-2">
                    {!clozeSubmitted ? (
                      <button
                        disabled={clozeSelectedAnswer === null}
                        onClick={() => setClozeSubmitted(true)}
                        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (activeClozeIndex + 1 < currentItem.clozeBlanks!.length) {
                            setActiveClozeIndex((prev) => prev + 1);
                            setClozeSelectedAnswer(null);
                            setClozeSubmitted(false);
                          } else {
                            // reset to start
                            setActiveClozeIndex(0);
                            setClozeSelectedAnswer(null);
                            setClozeSubmitted(false);
                          }
                        }}
                        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                      >
                        <span>
                          {activeClozeIndex + 1 < currentItem.clozeBlanks!.length ? "Next Blank" : "Restart Cloze"}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW: 3. Step-by-Step / Parts Recitation */}
          {practiceMode === "steps" && currentItem.stepsOrParts && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>
                  Part {activeStepIndex + 1} of {currentItem.stepsOrParts.length}
                </span>
                <span className="text-blue-600 font-bold">Recite each part in sequence</span>
              </div>

              <div className="space-y-3">
                {currentItem.stepsOrParts.map((step, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-blue-50 border-2 border-blue-600 shadow-md shadow-blue-500/10"
                          : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold pb-1 text-blue-700">
                        <span>{step.title}</span>
                        {isCurrent && <span className="text-[10px] uppercase text-blue-600 font-mono bg-blue-100 px-2 py-0.5 rounded-full">Active Part</span>}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{step.description}</p>
                      {step.congregationResponse && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-serif">
                          🗣️ {step.congregationResponse}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-bold text-xs"
                >
                  Previous Part
                </button>
                <button
                  disabled={activeStepIndex === currentItem.stepsOrParts.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(currentItem.stepsOrParts!.length - 1, prev + 1))}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  Next Part
                </button>
              </div>
            </div>
          )}

          {/* VIEW: 4. Full Text View */}
          {practiceMode === "text" && (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-base sm:text-lg leading-relaxed text-slate-800 whitespace-pre-line tracking-wide">
              {currentItem.fullText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
