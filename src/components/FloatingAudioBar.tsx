import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  FastForward,
  Gauge,
  Sparkles
} from "lucide-react";
import { devotionalAudio, AudioPlaybackState } from "../services/devotionalAudioService";

export const FloatingAudioBar: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioPlaybackState>(() =>
    devotionalAudio.getState()
  );

  useEffect(() => {
    const unsubscribe = devotionalAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  if (!audioState.isSpeaking && !audioState.isPaused) {
    return null;
  }

  const rates = [0.75, 0.9, 1.0, 1.25];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-lg animate-slide-up">
      <div className="bg-slate-900/95 dark:bg-black/95 text-white backdrop-blur-md border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/50 flex items-center justify-between gap-3">
        {/* Left: Wave / Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            {audioState.isSpeaking && !audioState.isPaused ? (
              <span className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2" />
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-4 [animation-delay:0.15s]" />
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3 [animation-delay:0.3s]" />
              </span>
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {audioState.lang === "la" ? "Ecclesiastical Latin" : audioState.lang === "de" ? "German Audio" : "Devotional Audio"}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
              {audioState.title || "Playing text..."}
            </p>
          </div>
        </div>

        {/* Right: Controls & Speed */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Rate Selector */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700">
            {rates.map((r) => (
              <button
                key={r}
                onClick={() => devotionalAudio.setRate(r)}
                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                  Math.abs(audioState.rate - r) < 0.05
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
                title={`Playback speed ${r}x`}
              >
                {r}x
              </button>
            ))}
          </div>

          {/* Pause / Resume */}
          <button
            onClick={() => {
              if (audioState.isPaused) {
                devotionalAudio.resume();
              } else {
                devotionalAudio.pause();
              }
            }}
            className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md transition-transform active:scale-95"
            title={audioState.isPaused ? "Resume" : "Pause"}
          >
            {audioState.isPaused ? (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            ) : (
              <Pause className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* Stop Button */}
          <button
            onClick={() => devotionalAudio.stop()}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 border border-slate-700 flex items-center justify-center transition-colors"
            title="Stop audio"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
