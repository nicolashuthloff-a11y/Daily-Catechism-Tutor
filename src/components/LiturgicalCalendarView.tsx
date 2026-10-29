import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Sun,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  ChevronRight,
  Bookmark,
  Share2,
  Clock,
  Heart,
  Cross
} from "lucide-react";
import { getTodayLiturgicalInfo, LiturgicalDayInfo } from "../data/liturgicalData";
import { devotionalAudio } from "../services/devotionalAudioService";

export const LiturgicalCalendarView: React.FC = () => {
  const [liturgicalInfo, setLiturgicalInfo] = useState<LiturgicalDayInfo>(() => getTodayLiturgicalInfo());
  const [activeReadingTab, setActiveReadingTab] = useState<"gospel" | "firstReading" | "psalm">("gospel");
  const [isAntiphonLatin, setIsAntiphonLatin] = useState<boolean>(false);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const handleSpeak = (text: string, key: string, lang: "en" | "la" = "en") => {
    if (speakingKey === key) {
      devotionalAudio.stop();
      setSpeakingKey(null);
      return;
    }

    setSpeakingKey(key);
    devotionalAudio.speakText(
      text,
      lang,
      0.9,
      () => setSpeakingKey(null),
      () => setSpeakingKey(null)
    );
  };

  useEffect(() => {
    return () => {
      devotionalAudio.stop();
    };
  }, []);

  const antiphon = liturgicalInfo.seasonalMarianAntiphon;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-xs"
                style={{ backgroundColor: liturgicalInfo.colorHex }}
              >
                {liturgicalInfo.season} Season • Vestment: {liturgicalInfo.color}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {liturgicalInfo.rank}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {liturgicalInfo.celebrationTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Liturgical Date: <strong>{liturgicalInfo.date}</strong>
            </p>
          </div>

          {/* Color & Rank Badge */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner font-bold text-lg"
              style={{ backgroundColor: liturgicalInfo.colorHex }}
            >
              †
            </div>
            <div className="text-xs">
              <div className="text-slate-500 font-semibold uppercase tracking-wider">Church Cycle</div>
              <div className="font-bold text-slate-900 text-sm">Year B / Cycle I</div>
              <div className="text-emerald-700 font-medium">{liturgicalInfo.color} Vestments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Saint of the Day & Seasonal Antiphon Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saint of the Day Card */}
        {liturgicalInfo.saintOfTheDay && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 uppercase tracking-wider">
                  Saint of the Day
                </span>
                <span className="text-xs text-slate-400 font-semibold">Patron of {liturgicalInfo.saintOfTheDay.patronage}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {liturgicalInfo.saintOfTheDay.name}
                </h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">
                  {liturgicalInfo.saintOfTheDay.title}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {liturgicalInfo.saintOfTheDay.biography}
              </p>

              {liturgicalInfo.saintOfTheDay.quote && (
                <div className="bg-amber-50/70 border-l-4 border-amber-500 p-3.5 rounded-r-2xl">
                  <p className="text-xs italic text-amber-950 font-serif leading-relaxed">
                    "{liturgicalInfo.saintOfTheDay.quote}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Pray for us, holy saints of God</span>
              <button
                onClick={() =>
                  handleSpeak(
                    `${liturgicalInfo.saintOfTheDay?.name}. ${liturgicalInfo.saintOfTheDay?.biography}`,
                    "saint"
                  )
                }
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
              >
                {speakingKey === "saint" ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{speakingKey === "saint" ? "Stop Audio" : "Listen Bio"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Seasonal Marian Antiphon Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/40 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200 uppercase tracking-wider">
                Seasonal Marian Antiphon
              </span>
              <button
                onClick={() => setIsAntiphonLatin(!isAntiphonLatin)}
                className="text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {isAntiphonLatin ? "Switch to English" : "Switch to Latin"}
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {isAntiphonLatin ? antiphon.latinTitle : antiphon.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {antiphon.seasonContext}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line">
                {isAntiphonLatin ? antiphon.latin : antiphon.english}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Sung at the close of Compline (Night Prayer)</span>
            <button
              onClick={() =>
                handleSpeak(
                  isAntiphonLatin ? antiphon.latin : antiphon.english,
                  "antiphon",
                  isAntiphonLatin ? "la" : "en"
                )
              }
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
            >
              {speakingKey === "antiphon" ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{speakingKey === "antiphon" ? "Stop Audio" : "Chant / Speak"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Mass Readings Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Liturgy of the Word
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Today's Holy Mass Readings
            </h3>
          </div>

          {/* Reading Selector Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveReadingTab("gospel")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeReadingTab === "gospel"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              📖 Holy Gospel
            </button>
            <button
              onClick={() => setActiveReadingTab("firstReading")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeReadingTab === "firstReading"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              📜 1st Reading
            </button>
            <button
              onClick={() => setActiveReadingTab("psalm")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeReadingTab === "psalm"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              🎵 Responsorial Psalm
            </button>
          </div>
        </div>

        {/* Active Reading Body */}
        {activeReadingTab === "gospel" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Gospel Citation: {liturgicalInfo.readings.gospel}
              </span>
              <button
                onClick={() => handleSpeak(liturgicalInfo.readings.gospelText, "gospel")}
                className="text-xs text-blue-600 font-bold flex items-center gap-1"
              >
                {speakingKey === "gospel" ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{speakingKey === "gospel" ? "Stop Audio" : "Listen to Gospel"}</span>
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
              <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
                "{liturgicalInfo.readings.gospelText}"
              </blockquote>
              <div className="mt-4 text-xs font-semibold text-slate-500">
                — The Gospel of the Lord. Praise to You, Lord Jesus Christ.
              </div>
            </div>
          </div>
        )}

        {activeReadingTab === "firstReading" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                First Reading: {liturgicalInfo.readings.firstReading}
              </span>
              <button
                onClick={() => handleSpeak(liturgicalInfo.readings.firstReadingText, "reading1")}
                className="text-xs text-blue-600 font-bold flex items-center gap-1"
              >
                {speakingKey === "reading1" ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{speakingKey === "reading1" ? "Stop Audio" : "Listen"}</span>
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
              <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
                "{liturgicalInfo.readings.firstReadingText}"
              </blockquote>
              <div className="mt-4 text-xs font-semibold text-slate-500">
                — The Word of the Lord. Thanks be to God.
              </div>
            </div>
          </div>
        )}

        {activeReadingTab === "psalm" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Responsorial Psalm: {liturgicalInfo.readings.psalm}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm font-bold text-blue-900">
                R. {liturgicalInfo.readings.psalmResponse}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                The Lord is king; let the earth rejoice; let the many isles be glad.<br />
                Justice and judgment are the foundation of his throne.<br />
                <strong>R. {liturgicalInfo.readings.psalmResponse}</strong><br />
                The mountains melt like wax before the Lord, before the Lord of all the earth.<br />
                The heavens proclaim his justice, and all peoples see his glory.<br />
                <strong>R. {liturgicalInfo.readings.psalmResponse}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
