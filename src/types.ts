export interface Question {
  id: string;
  category: "prayers" | "commandments" | "sacraments" | "mass" | "doctrine" | "scripture";
  categoryLabel?: string;
  day?: number;
  question: string;
  options: [string, string, string, string]; // exactly 4 options corresponding to 1, 2, 3, 4
  correctAnswer: 1 | 2 | 3 | 4; // strictly 1 to 4
  explanation: string;
  memoryTip?: string;
}

export interface MistakeRecord {
  questionId: string;
  question: Question;
  timesFailed: number;
  consecutiveCorrect: number;
  lastAttemptDate: string;
  isMastered: boolean; // true once answered correctly 2+ times consecutively
  studentNotes?: string;
}

export interface TestSessionResult {
  id: string;
  date: string;
  mode: "daily_curriculum" | "mistake_drill" | "custom_test" | "memorization_quiz";
  day?: number;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  durationSeconds: number;
  missedQuestionIds: string[];
}

export interface CurriculumDay {
  day: number;
  title: string;
  subtitle: string;
  category: "prayers" | "commandments" | "sacraments" | "mass" | "doctrine";
  estimatedMinutes: number;
  summary: string;
  learningPoints: string[];
  keyTextToMemorize?: string;
  questionIds: string[];
}

export interface MemorizationItem {
  id: string;
  category: "prayers" | "commandments" | "sacraments" | "mass";
  title: string;
  latinTitle?: string;
  subtitle?: string;
  fullText: string;
  lines: string[];
  clozeBlanks?: {
    sentence: string;
    missingWord: string;
    options: [string, string, string, string]; // 1-4 choices for cloze
    correctIndex: 1 | 2 | 3 | 4;
  }[];
  notes?: string;
  stepsOrParts?: {
    title: string;
    description: string;
    congregationResponse?: string;
  }[];
}

export interface UserProgress {
  currentDay: number;
  dailyStreak: number;
  lastStudyDate: string;
  todayMinutesStudied: number;
  totalMinutesStudied: number;
  mistakes: Record<string, MistakeRecord>; // key is questionId
  testHistory: TestSessionResult[];
  completedDays: number[];
  memorizedItemIds: string[];
  soundEnabled: boolean;
}
