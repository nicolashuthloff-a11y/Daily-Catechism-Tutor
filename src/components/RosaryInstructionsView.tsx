import React, { useState } from "react";
import {
  Heart,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle2,
  Play,
  RotateCcw,
  Copy,
  Check,
  Compass
} from "lucide-react";
import {
  ROSARY_INSTRUCTION_STEPS,
  ROSARY_MYSTERY_SETS,
  RosaryMysterySet,
  RosaryInstructionStep
} from "../data/rosaryGuideData";
import { RosaryStepAnimation } from "./RosaryStepAnimation";
import { RosaryAudioVisualizer } from "./RosaryAudioVisualizer";
import { devotionalAudio } from "../services/devotionalAudioService";

interface RosaryInstructionsViewProps {
  onAddMinutes?: (mins: number) => void;
}

export const RosaryInstructionsView: React.FC<RosaryInstructionsViewProps> = ({ onAddMinutes }) => {
  const [activeTab, setActiveTab] = useState<"animation" | "instructions" | "mysteries" | "prayers" | "chaplet">("animation");
  const [selectedMysterySetId, setSelectedMysterySetId] = useState<"joyful" | "luminous" | "sorrowful" | "glorious">("joyful");
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedMysterySet = ROSARY_MYSTERY_SETS.find((s) => s.id === selectedMysterySetId) || ROSARY_MYSTERY_SETS[0];

  const handleSpeak = (text: string, key: string) => {
    if (speakingKey === key) {
      devotionalAudio.stop();
      setSpeakingKey(null);
      return;
    }
    setSpeakingKey(key);
    devotionalAudio.speakText(
      text,
      "en",
      0.88,
      () => setSpeakingKey(null),
      () => setSpeakingKey(null)
    );
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 text-slate-800">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                Marian Devotion & Contemplation
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Daily Catholic Rosary
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              The Most Holy Rosary of the Blessed Virgin Mary
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Step-by-step interactive 59-bead visualizer with real-time progression animations, devout spoken audio, scriptural meditations on all 20 Mysteries, and complete traditional Catholic prayers.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab("animation")}
            className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all text-center ${
              activeTab === "animation"
                ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            📿 Step-by-Step Animation
          </button>
          <button
            onClick={() => setActiveTab("instructions")}
            className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all text-center ${
              activeTab === "instructions"
                ? "bg-rose-50 text-rose-950 border-rose-300 ring-2 ring-rose-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            📖 How to Pray Guide
          </button>
          <button
            onClick={() => setActiveTab("mysteries")}
            className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all text-center ${
              activeTab === "mysteries"
                ? "bg-rose-50 text-rose-950 border-rose-300 ring-2 ring-rose-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            🌹 The 20 Mysteries
          </button>
          <button
            onClick={() => setActiveTab("prayers")}
            className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all text-center ${
              activeTab === "prayers"
                ? "bg-rose-50 text-rose-950 border-rose-300 ring-2 ring-rose-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            ✨ Chief Rosary Prayers
          </button>
          <button
            onClick={() => setActiveTab("chaplet")}
            className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all text-center ${
              activeTab === "chaplet"
                ? "bg-red-50 text-red-950 border-red-300 ring-2 ring-red-400/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            ❤️ Divine Mercy Chaplet
          </button>
        </div>
      </div>

      {/* Tab 1: Step-by-Step Interactive Animation (Centerpiece Mode) */}
      {activeTab === "animation" && (
        <RosaryStepAnimation onAddMinutes={onAddMinutes} />
      )}

      {/* Tab 2: Step-by-Step How to Pray Guide */}
      {activeTab === "instructions" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  How to Pray the Rosary (Step-by-Step Outline)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Follow each bead around the garland from the crucifix to the centerpiece medal
                </p>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              {ROSARY_INSTRUCTION_STEPS.map((step) => {
                const stepKey = `step-${step.stepNumber}`;
                return (
                  <div
                    key={step.stepNumber}
                    className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {step.stepNumber}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase font-mono">
                            {step.beadNameEn}
                          </div>
                          <div className="text-base font-bold text-slate-900">
                            {step.prayerNameEn}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSpeak(step.prayerTextEn, `en-${stepKey}`)}
                        className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Speak Prayer
                      </button>
                    </div>

                    {/* Instruction Details */}
                    <div className="bg-white border border-slate-200/60 rounded-xl p-3 text-xs text-slate-700 font-medium">
                      💡 <strong>Instruction:</strong> {step.instructionEn}
                    </div>

                    {/* Prayer Text */}
                    <div className="text-xs sm:text-sm font-serif text-slate-800 whitespace-pre-line leading-relaxed bg-white/60 p-3 rounded-xl border border-slate-100">
                      {step.prayerTextEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: The 20 Mysteries & Meditations */}
      {activeTab === "mysteries" && (
        <div className="space-y-6">
          {/* Mystery Group Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROSARY_MYSTERY_SETS.map((mSet) => {
              const isSelected = mSet.id === selectedMysterySetId;
              return (
                <button
                  key={mSet.id}
                  onClick={() => setSelectedMysterySetId(mSet.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-rose-50 border-rose-300 ring-2 ring-rose-400/20 text-rose-950 font-bold"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">{mSet.titleEn}</div>
                  <div className="text-[10px] text-rose-700 font-semibold mt-1">{mSet.daysEn}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Mystery Group Container */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{selectedMysterySet.titleEn}</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Traditionally prayed on: <strong>{selectedMysterySet.daysEn}</strong>
              </p>
            </div>

            <div className="space-y-4">
              {selectedMysterySet.mysteries.map((m) => {
                const mKey = `mystery-${selectedMysterySet.id}-${m.number}`;
                return (
                  <div
                    key={m.number}
                    className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {m.number}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{m.nameEn}</h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-900 text-xs font-bold">
                          Fruit: {m.fruitEn}
                        </span>
                        <button
                          onClick={() => handleSpeak(m.meditationEn, `med-${mKey}`)}
                          className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-semibold"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Read
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-blue-800 font-mono font-semibold">
                      Scripture: {m.scriptureRef}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {m.meditationEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Chief Rosary Prayers */}
      {activeTab === "prayers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">The Apostles' Creed</h3>
              <button
                onClick={() => handleCopy("I believe in God, the Father Almighty, Creator of heaven and earth...", "creed")}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedKey === "creed" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed whitespace-pre-line">
              I believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord: Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He arose again from the dead; He ascended into heaven, sitteth at the right hand of God the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Ghost, the Holy Catholic Church, the communion of Saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">The Lord's Prayer (Our Father)</h3>
              <button
                onClick={() => handleCopy("Our Father, who art in heaven...", "pater")}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedKey === "pater" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed whitespace-pre-line">
              Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">The Hail Mary (Ave Maria)</h3>
              <button
                onClick={() => handleCopy("Hail Mary, full of grace...", "ave")}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedKey === "ave" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed whitespace-pre-line">
              Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Hail, Holy Queen (Salve Regina)</h3>
              <button
                onClick={() => handleCopy("Hail, Holy Queen, Mother of Mercy...", "salve")}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedKey === "salve" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed whitespace-pre-line">
              Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Divine Mercy Chaplet */}
      {activeTab === "chaplet" && (
        <RosaryAudioVisualizer onAddMinutes={onAddMinutes} />
      )}
    </div>
  );
};
