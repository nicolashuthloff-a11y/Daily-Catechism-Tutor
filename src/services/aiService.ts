import { Question } from "../types";

export interface TeacherAdviceResponse {
  reply: string;
  error?: string;
}

export async function askTeacher(params: {
  question: string;
  options: string[];
  selectedAnswer: number;
  correctAnswer: number;
  category?: string;
  userQuery?: string;
}): Promise<string> {
  try {
    const res = await fetch("/api/teacher/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to reach teacher");
    }
    const data = await res.json();
    return data.reply || "Keep persevering with your daily 30-minute practice!";
  } catch (e: unknown) {
    console.warn("AI Teacher fallback:", e);
    return `Teacher Guidance: Option ${params.correctAnswer} is the correct answer. Remember: Repetition of mistakes builds permanent memory. Add this to your daily mistake drill!`;
  }
}

export async function fetchTeacherDailyPlan(params: {
  dayNumber: number;
  totalMistakes: number;
  masteredCount: number;
  accuracyRate: number;
}): Promise<string> {
  try {
    const res = await fetch("/api/teacher/daily-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Plan generation error");
    const data = await res.json();
    return data.recommendation;
  } catch (e) {
    console.warn("Teacher plan fallback:", e);
    return `Day ${params.dayNumber} 30-Minute Schedule: Spend 8 minutes reviewing your ${params.totalMistakes} mistakes in the Mistake Drill, 15 minutes taking today's multiple-choice test (1-4), and 7 minutes in Memorization Mode for Chief Prayers and Sacraments.`;
  }
}

export async function generateCustomAiQuiz(
  topic: string,
  count = 5,
  difficulty = "standard"
): Promise<Question[]> {
  const res = await fetch("/api/teacher/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, count, difficulty }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to generate AI quiz");
  }
  const data = await res.json();
  return data.questions || [];
}
