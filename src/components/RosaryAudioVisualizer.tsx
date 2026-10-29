import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  Heart
} from "lucide-react";
import { ROSARY_MYSTERY_GROUPS, RosaryMysteryGroup } from "../data/prayerGuideData";
import { devotionalAudio } from "../services/devotionalAudioService";

interface RosaryAudioVisualizerProps {
  onAddMinutes?: (mins: number) => void;
}

export type ChapletMode = "marian" | "divine_mercy";

export const RosaryAudioVisualizer: React.FC<RosaryAudioVisualizerProps> = ({ onAddMinutes }) => {
  const [chapletMode, setChapletMode] = useState<ChapletMode>("marian");

  const [mysteryGroupIndex, setMysteryGroupIndex] = useState<number>(() => {
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 1 || dayOfWeek === 6) return 0; // Mon, Sat -> Joyful
    if (dayOfWeek === 4) return 1; // Thu -> Luminous
    if (dayOfWeek === 2 || dayOfWeek === 5) return 2; // Tue, Fri -> Sorrowful
    return 3; // Wed, Sun -> Glorious
  });

  const [currentDecadeIndex, setCurrentDecadeIndex] = useState<number>(0);
  const [currentBeadIndex, setCurrentBeadIndex] = useState<number>(0); // 0 = start, 1..10 = Hail Marys
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "la">("en");

  const currentMysteryGroup: RosaryMysteryGroup = ROSARY_MYSTERY_GROUPS[mysteryGroupIndex];
  const activeMystery = currentMysteryGroup.mysteries[currentDecadeIndex];

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      devotionalAudio.stop();
    };
  }, []);

  // Compute text for current bead in Marian Rosary
  const getMarianPrayerText = (bead: number) => {
    if (bead === 0) {
      return {
        title: "Decade Introduction & Our Father",
        latinTitle: "Pater Noster",
        text: `The ${currentDecadeIndex + 1}th Mystery: ${activeMystery.name}. Fruit of the mystery: ${activeMystery.fruitOfMystery}. Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.`,
        latinText: `Pater noster, qui es in cælis, sanctificétur nomen tuum. Advéniat regnum tuum. Fiat volúntas tua, sicut in cælo et in terra. Panem nostrum cotidiánum da nobis hódie, et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris. Et ne nos indúcas in tentatiónem, sed líbera nos a malo. Amen.`
      };
    } else if (bead >= 1 && bead <= 10) {
      return {
        title: `Hail Mary (Bead #${bead} of 10)`,
        latinTitle: `Ave Maria #${bead}`,
        text: `Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
        latinText: `Ave María, grátia plena, Dóminus tecum. Benedícta tu in muliéribus, et benedíctus fructus ventris tui, Iesus. Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen.`
      };
    } else {
      return {
        title: "Glory Be & Fatima Decade Prayer",
        latinTitle: "Gloria Patri & Oratio Fatimae",
        text: `Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen.`,
        latinText: `Glória Patri, et Fílio, et Spirítui Sancto. Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.\n\nO mi Iesu, dimitte nobis debita nostra, libera nos ab igne inferni, perduc in caelum omnes animas, praesertim eas quae misericordiae tuae maxime indigent.`
      };
    }
  };

  // Divine mercy prayers
  const getDivineMercyPrayerText = (bead: number) => {
    if (bead === 0) {
      return {
        title: "Eternal Father Offering (Large Bead)",
        latinTitle: "Pater Aeterne",
        text: `Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.`,
        latinText: `Pater Aeterne, offero tibi Corpus et Sanguinem, Animam et Divinitatem dilectissimi Filii Tui, Domini Nostri Iesu Christi, in propitiatione pro peccatis nostris et totius mundi.`
      };
    } else if (bead >= 1 && bead <= 10) {
      return {
        title: `Sorrowful Passion Invocation (Bead #${bead} of 10)`,
        latinTitle: `Pro dolorosa Eius passione #${bead}`,
        text: `For the sake of His sorrowful Passion, have mercy on us and on the whole world.`,
        latinText: `Pro dolorosa Eius passione, miserere nobis et totius mundi.`
      };
    } else {
      return {
        title: "Holy God Concluding Doxology (Trisagion)",
        latinTitle: "Sanctus Deus",
        text: `Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. (Recited 3 times). O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You!`,
        latinText: `Sanctus Deus, Sanctus Fortis, Sanctus Immortalis, miserere nobis et totius mundi. O Sanguis et Aqua, quae pro nobis ex Corde Iesu profluxisti ut fons misericordiae, in Te confido!`
      };
    }
  };

  const currentPrayer = chapletMode === "marian" ? getMarianPrayerText(currentBeadIndex) : getDivineMercyPrayerText(currentBeadIndex);
  const textToRead = language === "la" && currentPrayer.latinText ? currentPrayer.latinText : currentPrayer.text;

  const playCurrentBeadAudio = () => {
    setIsPlayingAudio(true);
    devotionalAudio.speakText(
      textToRead,
      language,
      0.88,
      () => {
        setIsPlayingAudio(false);
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

  const handleNextBead = () => {
    stopAudio();
    if (currentBeadIndex < 11) {
      setCurrentBeadIndex((prev) => prev + 1);
    } else {
      // Completed decade! Advance decade
      if (currentDecadeIndex < 4) {
        setCurrentDecadeIndex((prev) => prev + 1);
        setCurrentBeadIndex(0);
      } else {
        // Finished all 5 decades!
        setCurrentBeadIndex(11);
        if (onAddMinutes) onAddMinutes(18);
      }
    }
  };

  const handlePrevBead = () => {
    stopAudio();
    if (currentBeadIndex > 0) {
      setCurrentBeadIndex((prev) => prev - 1);
    } else if (currentDecadeIndex > 0) {
      setCurrentDecadeIndex((prev) => prev - 1);
      setCurrentBeadIndex(11);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
      {/* Top Bar / Chaplet Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 uppercase tracking-wider">
              Virtual Audio Rosary Chaplet
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Interactive 59-Bead Visualizer
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {chapletMode === "marian" ? "The Holy Rosary of the Blessed Virgin Mary" : "The Chaplet of the Divine Mercy (3:00 PM)"}
          </h3>
        </div>

        {/* Mode & Language Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => {
                setChapletMode("marian");
                setCurrentBeadIndex(0);
                stopAudio();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                chapletMode === "marian"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🌹 Marian Rosary
            </button>
            <button
              onClick={() => {
                setChapletMode("divine_mercy");
                setCurrentBeadIndex(0);
                stopAudio();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                chapletMode === "divine_mercy"
                  ? "bg-white text-red-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ❤️ Divine Mercy
            </button>
          </div>

          <button
            onClick={() => {
              setLanguage(language === "en" ? "la" : "en");
              stopAudio();
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            {language === "en" ? "English (Audio)" : "Latin (Audio)"}
          </button>
        </div>
      </div>

      {/* Mystery Selector (for Marian Rosary) */}
      {chapletMode === "marian" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROSARY_MYSTERY_GROUPS.map((group, idx) => (
              <button
                key={group.groupName}
                onClick={() => {
                  setMysteryGroupIndex(idx);
                  setCurrentDecadeIndex(0);
                  setCurrentBeadIndex(0);
                  stopAudio();
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  idx === mysteryGroupIndex
                    ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/20 text-emerald-950 font-bold"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <div className="text-xs font-bold">{group.groupName.replace("The ", "")}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{group.days}</div>
              </button>
            ))}
          </div>

          {/* Active Decade Mystery Info */}
          <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                <span>Decade {currentDecadeIndex + 1} of 5:</span>
                <span className="text-slate-900 font-extrabold">{activeMystery.name}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {activeMystery.description}
              </p>
            </div>
            <div className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
              Fruit: {activeMystery.fruitOfMystery}
            </div>
          </div>
        </div>
      )}

      {/* 5-Decade Graphical Visualizer */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Decade {currentDecadeIndex + 1} Bead Progression
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, dIdx) => (
              <button
                key={dIdx}
                onClick={() => {
                  setCurrentDecadeIndex(dIdx);
                  setCurrentBeadIndex(0);
                  stopAudio();
                }}
                className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                  dIdx === currentDecadeIndex
                    ? "bg-emerald-600 text-white"
                    : dIdx < currentDecadeIndex
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-white border border-slate-200 text-slate-500"
                }`}
              >
                {dIdx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Beads Row */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 pt-2 overflow-x-auto pb-2">
          {/* Large Our Father Bead */}
          <button
            onClick={() => {
              setCurrentBeadIndex(0);
              stopAudio();
            }}
            className={`w-12 h-12 rounded-2xl shrink-0 flex flex-col items-center justify-center font-bold text-xs border transition-all ${
              currentBeadIndex === 0
                ? "bg-amber-500 text-white border-amber-600 shadow-md ring-4 ring-amber-400/20 scale-105"
                : "bg-white text-slate-700 border-slate-300 hover:border-amber-400"
            }`}
          >
            <span className="text-[9px] uppercase">Large</span>
            <span>Intro</span>
          </button>

          {/* 10 Small Hail Mary Beads */}
          {Array.from({ length: 10 }).map((_, bIdx) => {
            const beadNum = bIdx + 1;
            const isCurrent = currentBeadIndex === beadNum;
            const isPassed = currentBeadIndex > beadNum;

            return (
              <button
                key={beadNum}
                onClick={() => {
                  setCurrentBeadIndex(beadNum);
                  stopAudio();
                }}
                className={`w-9 sm:w-10 h-10 rounded-xl shrink-0 flex flex-col items-center justify-center font-bold text-xs border transition-all ${
                  isCurrent
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-md ring-4 ring-emerald-500/20 scale-110"
                    : isPassed
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
                }`}
              >
                <span className="text-[8px] opacity-75">#{beadNum}</span>
                <span>Ave</span>
              </button>
            );
          })}

          {/* Concluding Doxology Bead */}
          <button
            onClick={() => {
              setCurrentBeadIndex(11);
              stopAudio();
            }}
            className={`w-12 h-12 rounded-2xl shrink-0 flex flex-col items-center justify-center font-bold text-xs border transition-all ${
              currentBeadIndex === 11
                ? "bg-indigo-600 text-white border-indigo-700 shadow-md ring-4 ring-indigo-500/20 scale-105"
                : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400"
            }`}
          >
            <span className="text-[9px] uppercase">Glory</span>
            <span>End</span>
          </button>
        </div>
      </div>

      {/* Active Bead Reading Card & Audio Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Active Bead Prayer
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {currentPrayer.title}
            </h4>
          </div>

          {/* Audio Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={isPlayingAudio ? stopAudio : playCurrentBeadAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                isPlayingAudio
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? "Stop Audio" : `Recite in ${language === "la" ? "Latin" : "English"}`}</span>
            </button>
          </div>
        </div>

        {/* Prayer Text View */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 sm:p-5">
          <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif whitespace-pre-line">
            {textToRead}
          </blockquote>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevBead}
            disabled={currentDecadeIndex === 0 && currentBeadIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Bead
          </button>

          <button
            onClick={handleNextBead}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
          >
            <span>Next Bead</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
