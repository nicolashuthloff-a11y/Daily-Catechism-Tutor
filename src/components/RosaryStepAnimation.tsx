import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  CheckCircle2,
  Copy,
  Check,
  Compass,
  Clock,
  Info
} from "lucide-react";
import { ROSARY_MYSTERY_SETS, RosaryMysterySet, RosaryMysteryDetail } from "../data/rosaryGuideData";
import { devotionalAudio } from "../services/devotionalAudioService";

export interface RosaryStepItem {
  stepIndex: number; // 0-based
  id: string;
  beadName: string;
  prayerTitle: string;
  prayerText: string;
  mysteryIndex?: number; // 0..4 if decade bead
  decadeIndex?: number; // 0..4
  beadInDecade?: number; // 1..10
  isLargeBead?: boolean;
  isCrucifix?: boolean;
  isCenterpiece?: boolean;
  cx: number;
  cy: number;
}

interface RosaryStepAnimationProps {
  onAddMinutes?: (mins: number) => void;
  mysterySetId?: "joyful" | "luminous" | "sorrowful" | "glorious";
}

export const RosaryStepAnimation: React.FC<RosaryStepAnimationProps> = ({
  onAddMinutes,
  mysterySetId = "joyful"
}) => {
  const [selectedMysterySetId, setSelectedMysterySetId] = useState<"joyful" | "luminous" | "sorrowful" | "glorious">(
    () => {
      // Auto-select based on day of week
      const d = new Date().getDay();
      if (d === 1 || d === 6) return "joyful"; // Mon, Sat
      if (d === 4) return "luminous"; // Thu
      if (d === 2 || d === 5) return "sorrowful"; // Tue, Fri
      return "glorious"; // Wed, Sun
    }
  );

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoPlaySeconds, setAutoPlaySeconds] = useState<number>(12);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeMysterySet: RosaryMysterySet =
    ROSARY_MYSTERY_SETS.find((s) => s.id === selectedMysterySetId) || ROSARY_MYSTERY_SETS[0];

  // Build the complete 67-step chronological prayer path for the chosen mystery set
  const generateSteps = (): RosaryStepItem[] => {
    const steps: RosaryStepItem[] = [];
    let idx = 0;

    // Center layout constants for SVG (viewBox: 0 0 700 700)
    const centerX = 350;
    const centerY = 280;
    const radius = 210;

    // 1. Crucifix at bottom (x: 350, y: 640)
    steps.push({
      stepIndex: idx++,
      id: "crucifix",
      beadName: "The Crucifix",
      prayerTitle: "Sign of the Cross & The Apostles' Creed",
      prayerText:
        "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nI believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord: Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He arose again from the dead; He ascended into heaven, sitteth at the right hand of God the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Ghost, the Holy Catholic Church, the communion of Saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
      isCrucifix: true,
      cx: 350,
      cy: 640
    });

    // 2. First Large Bead (Our Father for Pope)
    steps.push({
      stepIndex: idx++,
      id: "pendant-large-1",
      beadName: "Opening Large Bead",
      prayerTitle: "The Our Father (For the intentions of the Holy Father)",
      prayerText:
        "Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
      isLargeBead: true,
      cx: 350,
      cy: 580
    });

    // 3, 4, 5. Three Small Beads (Hail Marys for Faith, Hope, Charity)
    const virtues = [
      "For an increase in the theological virtue of Faith",
      "For an increase in the theological virtue of Hope",
      "For an increase in the theological virtue of Charity"
    ];
    for (let b = 0; b < 3; b++) {
      steps.push({
        stepIndex: idx++,
        id: `pendant-small-${b + 1}`,
        beadName: `Initial Bead #${b + 1}`,
        prayerTitle: `Hail Mary (${virtues[b]})`,
        prayerText:
          "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
        cx: 350,
        cy: 535 - b * 26
      });
    }

    // 6. Glory Be & Fatima Prayer before centerpiece
    steps.push({
      stepIndex: idx++,
      id: "pendant-doxology",
      beadName: "Chain Link / Medal",
      prayerTitle: "Glory Be & Fatima Decade Prayer",
      prayerText:
        "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen.",
      cx: 350,
      cy: 450
    });

    // 7. Centerpiece Medal
    steps.push({
      stepIndex: idx++,
      id: "centerpiece-medal",
      beadName: "The Centerpiece Medal",
      prayerTitle: "Announcement of the Five Decades",
      prayerText: `Now we begin the five decades of ${activeMysterySet.titleEn}. Contemplate the life, passion, and glory of Jesus Christ through the immaculate heart of Mary.`,
      isCenterpiece: true,
      cx: 350,
      cy: 405
    });

    // 5 Decades arranged in a circle of 50 small beads and 5 large beads
    // Total beads on ring = 55 (5 decades * 11: 1 large + 10 small)
    // Decade 0: right/bottom, moving clockwise or counter-clockwise
    for (let d = 0; d < 5; d++) {
      const mystery = activeMysterySet.mysteries[d];

      // Angle span for this decade on the circle (start angle: approx 100 degrees for decade 1)
      const decadeStartAngle = 100 + d * 72; // in degrees

      // Large Bead: Mystery announcement + Our Father
      const radIntro = ((decadeStartAngle - 20) * Math.PI) / 180;
      const lx = centerX + radius * Math.cos(radIntro);
      const ly = centerY + radius * Math.sin(radIntro);

      steps.push({
        stepIndex: idx++,
        id: `decade-${d + 1}-large`,
        beadName: `Decade ${d + 1} Large Bead`,
        prayerTitle: `The ${d + 1}${d === 0 ? "st" : d === 1 ? "nd" : d === 2 ? "rd" : "th"} Mystery: ${mystery.nameEn} (Our Father)`,
        prayerText: `The ${d + 1}th Mystery: ${mystery.nameEn}.\nScripture: ${mystery.scriptureRef}\nSpiritual Fruit: ${mystery.fruitEn}.\nMeditation: ${mystery.meditationEn}\n\nOur Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.`,
        isLargeBead: true,
        decadeIndex: d,
        mysteryIndex: d,
        cx: Math.round(lx),
        cy: Math.round(ly)
      });

      // 10 Small Beads: Hail Marys
      for (let b = 1; b <= 10; b++) {
        const beadAngle = decadeStartAngle - 10 + b * 5.8;
        const rad = (beadAngle * Math.PI) / 180;
        const bx = centerX + radius * Math.cos(rad);
        const by = centerY + radius * Math.sin(rad);

        steps.push({
          stepIndex: idx++,
          id: `decade-${d + 1}-bead-${b}`,
          beadName: `Decade ${d + 1} • Bead #${b}`,
          prayerTitle: `Hail Mary (Decade ${d + 1}, Bead #${b} of 10)`,
          prayerText: `Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
          decadeIndex: d,
          mysteryIndex: d,
          beadInDecade: b,
          cx: Math.round(bx),
          cy: Math.round(by)
        });
      }

      // Glory Be & Fatima prayer at end of decade
      const doxAngle = decadeStartAngle + 56;
      const radDox = (doxAngle * Math.PI) / 180;
      const dx = centerX + (radius - 20) * Math.cos(radDox);
      const dy = centerY + (radius - 20) * Math.sin(radDox);

      steps.push({
        stepIndex: idx++,
        id: `decade-${d + 1}-doxology`,
        beadName: `Decade ${d + 1} Doxology`,
        prayerTitle: `Glory Be & Fatima Prayer (Decade ${d + 1})`,
        prayerText:
          "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen.",
        decadeIndex: d,
        mysteryIndex: d,
        cx: Math.round(dx),
        cy: Math.round(dy)
      });
    }

    // Final Concluding Prayers on Centerpiece
    steps.push({
      stepIndex: idx++,
      id: "conclusion-salve-regina",
      beadName: "Concluding Prayer on Centerpiece",
      prayerTitle: "Hail Holy Queen (Salve Regina) & Concluding Prayer",
      prayerText:
        "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.\n\nPray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ.\n\nLet us pray: O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.",
      isCenterpiece: true,
      cx: 350,
      cy: 405
    });

    return steps;
  };

  const steps = generateSteps();
  const activeStep = steps[currentStepIndex] || steps[0];
  const activeMystery: RosaryMysteryDetail | undefined =
    activeStep.mysteryIndex !== undefined ? activeMysterySet.mysteries[activeStep.mysteryIndex] : undefined;

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      devotionalAudio.stop();
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  // Handle step speech
  const playCurrentPrayerAudio = (onDone?: () => void) => {
    setIsPlayingAudio(true);
    devotionalAudio.speakText(
      activeStep.prayerText,
      "en",
      0.9,
      () => {
        setIsPlayingAudio(false);
        if (onDone) onDone();
      },
      () => {
        setIsPlayingAudio(false);
      }
    );
  };

  const stopAudio = () => {
    devotionalAudio.stop();
    setIsPlayingAudio(false);
  };

  const handleNextStep = () => {
    stopAudio();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsAutoPlaying(false);
      if (onAddMinutes) onAddMinutes(20);
    }
  };

  const handlePrevStep = () => {
    stopAudio();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (index: number) => {
    stopAudio();
    setCurrentStepIndex(index);
  };

  // Autoplay timer effect
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNextStep();
    }, autoPlaySeconds * 1000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [isAutoPlaying, autoPlaySeconds, currentStepIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeStep.prayerText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const progressPct = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="space-y-6 text-slate-800">
      {/* Control Ribbon & Mystery Group Selector */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                Step-by-Step Rosary Animation
              </span>
              <span className="text-xs text-slate-500 font-semibold font-mono">
                Step {currentStepIndex + 1} of {steps.length} ({progressPct}%)
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Interactive 59-Bead Marian Rosary Visualizer
            </h3>
          </div>

          {/* Mystery Group Selectors */}
          <div className="flex flex-wrap items-center gap-1.5">
            {ROSARY_MYSTERY_SETS.map((set) => (
              <button
                key={set.id}
                onClick={() => {
                  setSelectedMysterySetId(set.id);
                  setCurrentStepIndex(0);
                  stopAudio();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedMysterySetId === set.id
                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {set.titleEn.split(" ")[0]} ({set.daysEn.split(",")[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500 font-semibold">
            <span>Progress: {activeStep.beadName}</span>
            <span>{currentStepIndex + 1} / {steps.length} Steps</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-rose-500 to-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Playback & Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center gap-1 border border-slate-200 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Bead</span>
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === steps.length - 1}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-rose-500/20 transition-all"
            >
              <span>Next Bead</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (isPlayingAudio) {
                  stopAudio();
                } else {
                  playCurrentPrayerAudio();
                }
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all ${
                isPlayingAudio
                  ? "bg-amber-500 text-white border-amber-600 animate-pulse shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
              <span>{isPlayingAudio ? "Stop Voice" : "Recite Prayer Aloud"}</span>
            </button>
          </div>

          {/* Autoplay toggle */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                setIsAutoPlaying(!isAutoPlaying);
                if (!isAutoPlaying) {
                  playCurrentPrayerAudio();
                } else {
                  stopAudio();
                }
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAutoPlaying
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isAutoPlaying ? "Autoplay ON" : "Autoplay Animation"}</span>
            </button>

            <select
              value={autoPlaySeconds}
              onChange={(e) => setAutoPlaySeconds(Number(e.target.value))}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 font-semibold text-slate-700"
            >
              <option value={8}>8s / bead</option>
              <option value={12}>12s / bead</option>
              <option value={20}>20s / bead</option>
              <option value={35}>35s / bead</option>
            </select>

            <button
              onClick={() => {
                stopAudio();
                setCurrentStepIndex(0);
                setIsAutoPlaying(false);
              }}
              title="Restart from Beginning"
              className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: SVG Rosary Canvas + Active Prayer Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center: Visual SVG Rosary Diagram */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col items-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2 z-10">
            <span className="font-bold flex items-center gap-1.5 text-rose-400">
              <Sparkles className="w-3.5 h-3.5" /> Physical Bead Map
            </span>
            <span>Click any bead to jump</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full max-w-[480px] aspect-square relative z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 700 700"
              className="w-full h-full drop-shadow-xl select-none"
            >
              <defs>
                {/* Active Bead Glow Filter */}
                <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Chain Linear Gradient */}
                <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Rosary Chain Path (Upper Ring + Pendant) */}
              {/* Upper Circle of 5 Decades */}
              <circle
                cx="350"
                cy="280"
                r="210"
                fill="none"
                stroke="url(#chainGradient)"
                strokeWidth="3"
                strokeDasharray="4 4"
                className="opacity-70"
              />

              {/* Lower Pendant Chain: Centerpiece to Crucifix */}
              <path
                d="M 350 405 L 350 640"
                fill="none"
                stroke="url(#chainGradient)"
                strokeWidth="3.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />

              {/* Animated Light Ray to Active Bead */}
              <line
                x1="350"
                y1="280"
                x2={activeStep.cx}
                y2={activeStep.cy}
                stroke="#f43f5e"
                strokeWidth="1.5"
                strokeDasharray="2 4"
                className="opacity-30 animate-pulse pointer-events-none"
              />

              {/* Render all beads */}
              {steps.map((step) => {
                const isCurrent = step.stepIndex === currentStepIndex;
                const isCompleted = step.stepIndex < currentStepIndex;

                if (step.isCrucifix) {
                  return (
                    <g
                      key={step.id}
                      onClick={() => handleJumpToStep(step.stepIndex)}
                      className="cursor-pointer transition-transform hover:scale-110"
                      transform={`translate(${step.cx}, ${step.cy})`}
                    >
                      {/* Glow when active */}
                      {isCurrent && (
                        <circle
                          r="32"
                          fill="#f43f5e"
                          opacity="0.3"
                          filter="url(#activeGlow)"
                          className="animate-ping"
                        />
                      )}
                      {/* Crucifix Body */}
                      <rect
                        x="-6"
                        y="-26"
                        width="12"
                        height="52"
                        rx="3"
                        fill={isCurrent ? "#fbbf24" : isCompleted ? "#d97706" : "#64748b"}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <rect
                        x="-20"
                        y="-12"
                        width="40"
                        height="10"
                        rx="3"
                        fill={isCurrent ? "#fbbf24" : isCompleted ? "#d97706" : "#64748b"}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <circle
                        r="3"
                        cy="-6"
                        fill={isCurrent ? "#ffffff" : "#cbd5e1"}
                      />
                    </g>
                  );
                }

                if (step.isCenterpiece) {
                  return (
                    <g
                      key={step.id}
                      onClick={() => handleJumpToStep(step.stepIndex)}
                      className="cursor-pointer transition-transform hover:scale-110"
                      transform={`translate(${step.cx}, ${step.cy})`}
                    >
                      {isCurrent && (
                        <circle
                          r="26"
                          fill="#f43f5e"
                          opacity="0.35"
                          filter="url(#activeGlow)"
                          className="animate-ping"
                        />
                      )}
                      <polygon
                        points="0,-16 16,12 -16,12"
                        fill={isCurrent ? "#f43f5e" : isCompleted ? "#e11d48" : "#475569"}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <circle r="4" cy="2" fill="#ffffff" />
                    </g>
                  );
                }

                // Standard bead rendering (large vs small)
                const radiusSize = step.isLargeBead ? 13 : 8;
                const fillColor = isCurrent
                  ? "#fbbf24"
                  : isCompleted
                  ? "#e11d48"
                  : "#94a3b8";

                return (
                  <g
                    key={step.id}
                    onClick={() => handleJumpToStep(step.stepIndex)}
                    className="cursor-pointer transition-all hover:scale-125"
                  >
                    {/* Active bead radiating wave */}
                    {isCurrent && (
                      <circle
                        cx={step.cx}
                        cy={step.cy}
                        r={radiusSize + 12}
                        fill="#fbbf24"
                        opacity="0.3"
                        filter="url(#activeGlow)"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={step.cx}
                      cy={step.cy}
                      r={radiusSize}
                      fill={fillColor}
                      stroke={isCurrent ? "#ffffff" : "#0f172a"}
                      strokeWidth={isCurrent ? 2.5 : 1.5}
                      className="transition-all duration-200"
                    />
                    {/* Subtle shine highlight */}
                    <circle
                      cx={step.cx - radiusSize / 3}
                      cy={step.cy - radiusSize / 3}
                      r={radiusSize / 3.5}
                      fill="#ffffff"
                      opacity="0.7"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Decade Jump Strip */}
          <div className="w-full flex items-center justify-center gap-1.5 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-400 font-bold mr-1">Decade:</span>
            {[1, 2, 3, 4, 5].map((decNum) => {
              const decStartIndex = steps.findIndex(
                (s) => s.decadeIndex === decNum - 1 && s.isLargeBead
              );
              const isActiveDecade = activeStep.decadeIndex === decNum - 1;
              return (
                <button
                  key={decNum}
                  onClick={() => {
                    if (decStartIndex !== -1) handleJumpToStep(decStartIndex);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    isActiveDecade
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
                  }`}
                >
                  {decNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Prayer Detail Card */}
        <div className="lg:col-span-6 space-y-4">
          {/* Mystery Info Card (if during a decade) */}
          {activeMystery && (
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-5 sm:p-6 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-rose-700 tracking-wider">
                  Decade {(activeStep.decadeIndex || 0) + 1} of 5 • {activeMysterySet.titleEn}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                  Fruit: {activeMystery.fruitEn}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-rose-950">
                {activeMystery.nameEn}
              </h4>
              <p className="text-xs font-serif italic text-rose-800/90 font-medium">
                Scripture: {activeMystery.scriptureRef}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                {activeMystery.meditationEn}
              </p>
            </div>
          )}

          {/* Active Prayer Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                  {activeStep.beadName}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeStep.prayerTitle}
                </h3>
              </div>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Copy Prayer Text"
              >
                {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Prayer Text */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif whitespace-pre-line">
                {activeStep.prayerText}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Devout pace: ~15-20 minutes total</span>
              </div>

              <button
                onClick={handleNextStep}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center gap-1.5"
              >
                <span>{currentStepIndex === steps.length - 1 ? "Finish Rosary" : "Next Prayer"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Practical Rosary Guide Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Contemplative Prayer Method:</span> While vocalizing the Hail Mary, center your mind’s eye on the sacred event in the life of Our Lord and Our Lady. Allow the repetition of the angelic greeting to form the quiet background music for interior meditation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
