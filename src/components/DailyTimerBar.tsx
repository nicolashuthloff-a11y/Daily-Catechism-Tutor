import React from "react";
import { Play, Pause, RotateCcw, CheckCircle2, Flame, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface DailyTimerBarProps {
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAddMinutes: (mins: number) => void;
  todayMinutesStudied: number;
  targetMinutes?: number;
}

export const DailyTimerBar: React.FC<DailyTimerBarProps> = ({
  timerSecondsLeft,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onAddMinutes,
  todayMinutesStudied,
  targetMinutes = 30,
}) => {
  const mins = Math.floor(timerSecondsLeft / 60);
  const secs = timerSecondsLeft % 60;
  const timeDisplay = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const progressPercent = Math.min(100, Math.round((todayMinutesStudied / targetMinutes) * 100));
  const isTargetAchieved = todayMinutesStudied >= targetMinutes;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 mb-6 text-slate-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Timer Display & Controls */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3.5">
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-blue-600 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 shadow-inner">
              {timeDisplay}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  30-Min Daily Session
                </span>
                {isTimerRunning && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-blue-50 text-blue-700 border border-blue-100 font-bold animate-pulse">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isTargetAchieved
                  ? "🎉 Daily 30-minute study goal achieved!"
                  : `${Math.max(0, targetMinutes - Math.floor(todayMinutesStudied))} mins remaining for today's goal`}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="timer-toggle-play-btn"
              onClick={onToggleTimer}
              className={`p-3 rounded-xl font-bold transition-all shadow-md ${
                isTimerRunning
                  ? "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
              }`}
              title={isTimerRunning ? "Pause Timer" : "Start Timer"}
            >
              {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              id="timer-reset-btn"
              onClick={onResetTimer}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
              title="Reset 30-Minute Countdown"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Daily Target Progress */}
        <div className="w-full md:w-80 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              Today's Progress
            </span>
            <span className="text-slate-900 font-bold">
              {todayMinutesStudied} / {targetMinutes} min ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isTargetAchieved ? "bg-green-500" : "bg-green-500"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Quick Adjustment Options */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <div className="flex items-center gap-1.5">
              <span>Quick add:</span>
              <button
                onClick={() => onAddMinutes(5)}
                className="px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200 transition-colors"
              >
                +5m
              </button>
              <button
                onClick={() => onAddMinutes(15)}
                className="px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200 transition-colors"
              >
                +15m
              </button>
            </div>

            {isTargetAchieved && (
              <button
                onClick={triggerCelebration}
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold"
              >
                <Award className="w-3.5 h-3.5" />
                Celebration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
