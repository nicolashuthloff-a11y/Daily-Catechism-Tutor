import React, { useState } from "react";
import {
  ShieldAlert,
  CheckSquare,
  Square,
  RotateCcw,
  Sparkles,
  Heart,
  ChevronRight,
  BookOpen,
  Volume2,
  Lock,
  Flame,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  FileText
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  EXAMINATION_OF_CONSCIENCE_ITEMS,
  CONFESSION_RITE_STEPS,
  ConfessionCheckItem,
  ConfessionStep
} from "../data/confessionData";
import { devotionalAudio } from "../services/devotionalAudioService";

interface ConfessionGuideViewProps {
  onAddMinutes?: (mins: number) => void;
}

export const ConfessionGuideView: React.FC<ConfessionGuideViewProps> = ({ onAddMinutes }) => {
  const [activeTab, setActiveTab] = useState<"examination" | "rite" | "actOfContrition">("examination");
  const [checkedSins, setCheckedSins] = useState<Record<string, boolean>>({});
  const [privateNotes, setPrivateNotes] = useState<string>("");
  const [isWipedNotice, setIsWipedNotice] = useState<boolean>(false);
  const [isAbsolvedNotice, setIsAbsolvedNotice] = useState<boolean>(false);
  const [isConfessionalModeOpen, setIsConfessionalModeOpen] = useState<boolean>(false);

  const toggleSin = (id: string) => {
    setCheckedSins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWipeData = () => {
    setCheckedSins({});
    setPrivateNotes("");
    setIsWipedNotice(true);
    setTimeout(() => setIsWipedNotice(false), 3500);
  };

  const handleAbsolvedWipe = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setCheckedSins({});
    setPrivateNotes("");
    setIsConfessionalModeOpen(false);
    setIsAbsolvedNotice(true);
    if (onAddMinutes) onAddMinutes(15);
    setTimeout(() => setIsAbsolvedNotice(false), 6000);
  };

  const totalFlaggedSins = Object.values(checkedSins).filter(Boolean).length;
  const flaggedItems = EXAMINATION_OF_CONSCIENCE_ITEMS.filter((item) => !!checkedSins[item.id]);

  const categories = [
    "First 3 Commandments (God)",
    "4th-6th Commandments (Family, Life & Purity)",
    "7th-10th Commandments (Justice & Truth)",
    "Precepts of the Church"
  ] as const;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 uppercase tracking-wider">
                Sacrament of Reconciliation & Penance
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Private & Zero-Retention
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Confession Preparation & Examination of Conscience
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Examine your conscience thoroughly, organize your thoughts, review the exact step-by-step priest/penitent dialogue, and pray the Act of Contrition before receiving sacramental absolution.
            </p>
          </div>

          {/* Quick Actions & Stats */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <div className="text-center px-2">
              <div className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400">{totalFlaggedSins}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Flagged Items</div>
            </div>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

            {totalFlaggedSins > 0 && (
              <button
                onClick={() => setIsConfessionalModeOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                title="Open clean view for when entering the confessional box"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Confessional Mode</span>
              </button>
            )}

            <button
              onClick={handleWipeData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-900 shadow-xs transition-colors"
              title="Immediately wipe all checklist marks"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe Data</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("examination")}
            className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
              activeTab === "examination"
                ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-400/20"
                : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
          >
            📋 Examination of Conscience
          </button>
          <button
            onClick={() => setActiveTab("rite")}
            className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
              activeTab === "rite"
                ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-400/20"
                : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
          >
            ⛪ Step-by-Step Rite
          </button>
          <button
            onClick={() => setActiveTab("actOfContrition")}
            className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
              activeTab === "actOfContrition"
                ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-400/20"
                : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
          >
            ❤️ Act of Contrition
          </button>
        </div>
      </div>

      {/* Absolved Peace Notification */}
      {isAbsolvedNotice && (
        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-xl animate-bounce-short space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
              Absolvo Te • Go in Peace, Your Sins Are Forgiven!
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
            "The Lord has put away your sin; you shall not die." (2 Samuel 12:13). Your examination has been wiped completely from memory. Go in peace to complete your assigned penance and praise the infinite mercy of God.
          </p>
        </div>
      )}

      {/* Wiped Notice */}
      {isWipedNotice && (
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All temporary marks and notes have been completely erased from your device memory.</span>
        </div>
      )}

      {/* Tab 1: Examination of Conscience */}
      {activeTab === "examination" && (
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = EXAMINATION_OF_CONSCIENCE_ITEMS.filter((i) => i.category === cat);
            return (
              <div
                key={cat}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/30 rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/40 dark:shadow-black/40 space-y-4"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{cat}</h3>
                </div>

                <div className="space-y-3">
                  {items.map((item) => {
                    const isChecked = !!checkedSins[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleSin(item.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-600 ring-1 ring-indigo-400/30"
                            : "bg-slate-50/50 dark:bg-slate-850 hover:bg-slate-100/70 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-750"
                        }`}
                      >
                        <div className="pt-0.5 text-indigo-600 dark:text-indigo-400 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {item.commandmentTitle}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {item.question}
                          </p>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono inline-block pt-1">
                            Scripture: {item.biblicalRoot}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Private Notes Scratchpad */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/30 rounded-3xl p-6 shadow-lg shadow-slate-200/40 dark:shadow-black/40 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Temporary Private Note Scratchpad
              </h4>
              <span className="text-[11px] text-slate-400">Never saved to server or disk</span>
            </div>
            <textarea
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Jot down any reminders, frequencies, or details to mention in the confessional box..."
              className="w-full h-24 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Step-by-Step Rite in Confessional */}
      {activeTab === "rite" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              The Sacramental Rite of Reconciliation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exact dialogue and rubrics for what you say and what the priest says
            </p>
          </div>

          <div className="space-y-4">
            {CONFESSION_RITE_STEPS.map((step) => {
              const isPenitent = step.actor.includes("Penitent");
              return (
                <div
                  key={step.stepNumber}
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    isPenitent
                      ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900"
                      : "bg-purple-50/60 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          isPenitent ? "bg-blue-600" : "bg-purple-600"
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        {step.actor}
                      </span>
                      {step.latinPhrase && (
                        <span className="text-xs italic text-slate-500 dark:text-slate-400 font-serif">
                          ({step.latinPhrase})
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        devotionalAudio.speakText(step.dialogue, "en", 0.9, undefined, undefined, `${step.actor} Dialogue`);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium whitespace-pre-line leading-relaxed">
                    {step.dialogue}
                  </p>

                  <div className="text-xs text-slate-500 dark:text-slate-400 italic bg-white/70 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700">
                    💡 <strong>Rubric:</strong> {step.notes}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Act of Contrition */}
      {activeTab === "actOfContrition" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Essential Prayer of Penance
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">The Act of Contrition</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recited inside the confessional to express heartfelt sorrow and firm resolution
              </p>
            </div>
            <button
              onClick={() => {
                devotionalAudio.speakText(
                  "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.",
                  "en",
                  0.9,
                  undefined,
                  undefined,
                  "Act of Contrition"
                );
              }}
              className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" /> Listen
            </button>
          </div>

          <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-6 space-y-4">
            <blockquote className="text-base sm:text-lg text-slate-900 dark:text-amber-100 leading-relaxed font-serif">
              "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen."
            </blockquote>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Three Necessary Components of Perfect Contrition:</h4>
            <ol className="list-decimal pl-5 space-y-1.5 font-medium">
              <li><strong>Heartfelt Sorrow</strong>: True sorrow for offending God, who is infinite goodness and love.</li>
              <li><strong>Detestation of Sin</strong>: Hating sin itself rather than simply fearing earthly embarrassment.</li>
              <li><strong>Firm Purpose of Amendment</strong>: Sincere intention to avoid repeated traps and near occasions of sin.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Confessional Mode Modal (Focused, high-contrast, for kneeling in confessional) */}
      {isConfessionalModeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white flex flex-col max-h-[90vh] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-lg font-bold text-amber-200">
                  Confessional Box Assistant Mode
                </h3>
              </div>
              <button
                onClick={() => setIsConfessionalModeOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
              {/* Flagged items summary */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Your Examined Sins ({flaggedItems.length} items to confess)
                </h4>
                {flaggedItems.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No sins flagged in examination.</p>
                ) : (
                  <div className="space-y-2">
                    {flaggedItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-amber-900/40 text-sm flex items-start gap-3"
                      >
                        <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold text-amber-300 block">{item.commandmentTitle}</span>
                          <p className="text-slate-200 text-xs sm:text-sm font-medium">{item.question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Private Notes */}
              {privateNotes.trim() && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Scratchpad Notes:</span>
                  <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line">{privateNotes}</p>
                </div>
              )}

              {/* Quick Opening Dialogue */}
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/40 space-y-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Opening Words:</span>
                <p className="text-xs sm:text-sm text-slate-200 italic font-serif">
                  "Bless me, Father, for I have sinned. It has been [time] since my last confession. These are my sins..."
                </p>
              </div>

              {/* Act of Contrition in Box */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Act of Contrition:</span>
                <p className="text-xs sm:text-sm text-amber-100 font-serif leading-relaxed">
                  "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen."
                </p>
              </div>
            </div>

            {/* Bottom: Wipe & Absolve */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsConfessionalModeOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
              >
                Close
              </button>

              <button
                onClick={handleAbsolvedWipe}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Absolved: Wipe Clean & Finish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
