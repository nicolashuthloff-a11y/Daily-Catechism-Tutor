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
  Trash2
} from "lucide-react";
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
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);

  const toggleSin = (id: string) => {
    setCheckedSins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWipeData = () => {
    setCheckedSins({});
    setPrivateNotes("");
    setIsWipedNotice(true);
    setTimeout(() => setIsWipedNotice(false), 3000);
  };

  const totalFlaggedSins = Object.values(checkedSins).filter(Boolean).length;

  const categories = [
    "First 3 Commandments (God)",
    "4th-6th Commandments (Family, Life & Purity)",
    "7th-10th Commandments (Justice & Truth)",
    "Precepts of the Church"
  ] as const;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200 uppercase tracking-wider">
                Sacrament of Reconciliation & Penance
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" /> Private & Client-Side Only
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Confession Preparation & Examination of Conscience
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Examine your conscience thoroughly, organize your thoughts, review the exact step-by-step priest/penitent dialogue, and pray the Act of Contrition before receiving sacramental absolution.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div className="text-center px-2">
              <div className="text-xl font-extrabold text-indigo-700">{totalFlaggedSins}</div>
              <div className="text-[11px] text-slate-500 font-medium">Areas to Confess</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <button
              onClick={handleWipeData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-red-50 text-red-600 text-xs font-bold border border-red-200 shadow-xs transition-colors"
              title="Immediately wipe all checklist marks"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe Checklist</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab("examination")}
            className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
              activeTab === "examination"
                ? "bg-indigo-50 text-indigo-900 border-indigo-300 ring-2 ring-indigo-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            📋 Examination of Conscience
          </button>
          <button
            onClick={() => setActiveTab("rite")}
            className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
              activeTab === "rite"
                ? "bg-indigo-50 text-indigo-900 border-indigo-300 ring-2 ring-indigo-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            ⛪ Step-by-Step Rite in Confessional
          </button>
          <button
            onClick={() => setActiveTab("actOfContrition")}
            className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
              activeTab === "actOfContrition"
                ? "bg-indigo-50 text-indigo-900 border-indigo-300 ring-2 ring-indigo-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            ❤️ Act of Contrition
          </button>
        </div>
      </div>

      {isWipedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
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
              <div key={cat} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/40 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">{cat}</h3>
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
                            ? "bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-400/30"
                            : "bg-slate-50/50 hover:bg-slate-100/70 border-slate-200"
                        }`}
                      >
                        <div className="pt-0.5 text-indigo-600 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-900">
                            {item.commandmentTitle}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            {item.question}
                          </p>
                          <span className="text-[11px] text-slate-400 font-mono inline-block pt-1">
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
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg shadow-slate-200/40 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Temporary Private Note Scratchpad
              </h4>
              <span className="text-[11px] text-slate-400">Never saved to server</span>
            </div>
            <textarea
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Jot down any reminders, frequencies, or details to mention in the confessional box..."
              className="w-full h-24 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Step-by-Step Rite in Confessional */}
      {activeTab === "rite" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              The Sacramental Rite of Reconciliation
            </h3>
            <p className="text-xs text-slate-500">
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
                      ? "bg-blue-50/60 border-blue-200"
                      : "bg-purple-50/60 border-purple-200"
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
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        {step.actor}
                      </span>
                      {step.latinPhrase && (
                        <span className="text-xs italic text-slate-500 font-serif">
                          ({step.latinPhrase})
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        devotionalAudio.speakText(step.dialogue, "en");
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-900 font-medium whitespace-pre-line leading-relaxed">
                    {step.dialogue}
                  </p>

                  <div className="text-xs text-slate-500 italic bg-white/70 p-2.5 rounded-xl border border-slate-200/50">
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
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Essential Prayer of Penance
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">The Act of Contrition</h3>
            <p className="text-xs text-slate-500">
              Recited inside the confessional to express heartfelt sorrow and firm resolution
            </p>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-4">
            <blockquote className="text-base sm:text-lg text-slate-900 leading-relaxed font-serif">
              "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen."
            </blockquote>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 text-sm">Three Necessary Components of Perfect Contrition:</h4>
            <ol className="list-decimal pl-5 space-y-1.5 font-medium">
              <li><strong>Heartfelt Sorrow</strong>: True sorrow for offending God, who is infinite goodness and love.</li>
              <li><strong>Detestation of Sin</strong>: Hating sin itself rather than simply fearing earthly embarrassment.</li>
              <li><strong>Firm Purpose of Amendment</strong>: Sincere intention to avoid repeated traps and near occasions of sin.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
