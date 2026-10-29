import { UserProgress, MistakeRecord, TestSessionResult, Question } from "../types";

const STORAGE_KEY = "catechism_teacher_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
  currentDay: 1,
  dailyStreak: 1,
  lastStudyDate: new Date().toISOString().split("T")[0],
  todayMinutesStudied: 0,
  totalMinutesStudied: 0,
  mistakes: {},
  testHistory: [],
  completedDays: [],
  memorizedItemIds: [],
  soundEnabled: true,
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed: UserProgress = JSON.parse(raw);

    // Check if new calendar day to manage streak & todayMinutesStudied
    const today = new Date().toISOString().split("T")[0];
    if (parsed.lastStudyDate !== today) {
      const lastDate = new Date(parsed.lastStudyDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Consecutive day
        parsed.dailyStreak = (parsed.dailyStreak || 0) + 1;
      } else if (diffDays > 1) {
        // Streak lost
        parsed.dailyStreak = 1;
      }
      parsed.lastStudyDate = today;
      parsed.todayMinutesStudied = 0; // reset for new day
    }

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      mistakes: parsed.mistakes || {},
      testHistory: parsed.testHistory || [],
      completedDays: parsed.completedDays || [],
      memorizedItemIds: parsed.memorizedItemIds || [],
    };
  } catch (e) {
    console.error("Failed to load user progress", e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save user progress", e);
  }
}

export function recordQuestionAttempt(
  question: Question,
  selectedAnswer: number,
  progress: UserProgress
): { progress: UserProgress; isCorrect: boolean } {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const today = new Date().toISOString().split("T")[0];
  const qId = question.id;
  const existingMistake = progress.mistakes[qId];

  const updatedMistakes = { ...progress.mistakes };

  if (!isCorrect) {
    // Record or escalate mistake
    updatedMistakes[qId] = {
      questionId: qId,
      question,
      timesFailed: (existingMistake?.timesFailed || 0) + 1,
      consecutiveCorrect: 0,
      lastAttemptDate: today,
      isMastered: false,
    };
  } else if (existingMistake && !existingMistake.isMastered) {
    // Correct attempt on a previous mistake
    const newConsecutive = (existingMistake.consecutiveCorrect || 0) + 1;
    // Mastered if answered correctly 2 times consecutively in drills
    const isNowMastered = newConsecutive >= 2;

    updatedMistakes[qId] = {
      ...existingMistake,
      consecutiveCorrect: newConsecutive,
      lastAttemptDate: today,
      isMastered: isNowMastered,
    };
  }

  const updatedProgress: UserProgress = {
    ...progress,
    mistakes: updatedMistakes,
  };

  saveUserProgress(updatedProgress);
  return { progress: updatedProgress, isCorrect };
}

export function logCompletedSession(
  result: TestSessionResult,
  progress: UserProgress
): UserProgress {
  const updatedHistory = [result, ...(progress.testHistory || [])].slice(0, 100);
  const completedDays = [...new Set([...(progress.completedDays || [])])];
  if (result.day && result.scorePercentage >= 70 && !completedDays.includes(result.day)) {
    completedDays.push(result.day);
  }

  const updatedProgress: UserProgress = {
    ...progress,
    testHistory: updatedHistory,
    completedDays,
  };

  saveUserProgress(updatedProgress);
  return updatedProgress;
}

export function addStudiedMinutes(minutes: number, progress: UserProgress): UserProgress {
  const updated: UserProgress = {
    ...progress,
    todayMinutesStudied: Math.round(((progress.todayMinutesStudied || 0) + minutes) * 10) / 10,
    totalMinutesStudied: Math.round(((progress.totalMinutesStudied || 0) + minutes) * 10) / 10,
  };
  saveUserProgress(updated);
  return updated;
}
