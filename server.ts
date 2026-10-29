import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

/**
 * Robust helper to call Gemini with automatic fallback from gemini-3.7-flash to gemini-3.1-flash-lite
 * when experiencing temporary 503 high demand spikes or rate limits.
 */
async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  }
) {
  try {
    return await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: params.contents,
      config: params.config,
    });
  } catch (primaryErr: any) {
    const isTransient =
      primaryErr?.status === 503 ||
      primaryErr?.status === 429 ||
      primaryErr?.message?.includes("503") ||
      primaryErr?.message?.includes("demand") ||
      primaryErr?.message?.includes("UNAVAILABLE");

    if (isTransient) {
      console.warn("Primary model gemini-3.7-flash busy. Switching to gemini-3.1-flash-lite fallback...");
      try {
        return await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: params.contents,
          config: params.config,
        });
      } catch (fallbackErr) {
        console.warn("Fallback model also encountered error:", fallbackErr);
        throw fallbackErr;
      }
    }
    throw primaryErr;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API: Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", aiConfigured: !!process.env.GEMINI_API_KEY });
  });

  // API: Ask Teacher (Explanation, guidance, Socratic clarification)
  app.post("/api/teacher/ask", async (req, res) => {
    try {
      const { question, options, selectedAnswer, correctAnswer, category, userQuery } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `As your Teacher: The correct answer is Option ${correctAnswer}. Keep practicing! Review the wording carefully and repeat this question in your Mistake Drill session to build permanent memory.`,
        });
      }

      const prompt = `You are a respectful, encouraging, knowledgeable, and patient traditional Catholic catechism teacher conducting a structured 30-minute daily curriculum.
The student is taking a multiple-choice memorization test (with answers numbered 1 to 4).
CRITICAL RULE: Do NOT reveal or quote from external reference PDFs or spoilery cheat-sheets. Focus purely on pedagogical explanation, biblical/theological meaning, and memory aids.

Context:
Topic/Category: ${category || "Catechism & Prayers"}
Question: ${question}
Options (1 to 4):
${options?.map((opt: string, i: number) => `${i + 1}. ${opt}`).join("\n")}
Student Selected: Option ${selectedAnswer}
Correct Answer: Option ${correctAnswer} (${options?.[correctAnswer - 1] || ""})
Student Note / Question to Teacher: "${userQuery || "Please explain why this is the correct answer and give me a memory trick."}"

Respond directly in the persona of the Teacher. Provide:
1. Warm encouraging feedback acknowledging their effort.
2. Clear explanation of why Option ${correctAnswer} is strictly correct and why other choices differ.
3. A practical mnemonic or memorization trick to remember it next time.
Keep your response concise, structured, and inspiring (under 180 words).`;

      const response = await generateWithFallback(ai, {
        contents: prompt,
      });

      return res.json({ reply: response.text || "Keep up the excellent study!" });
    } catch (err: unknown) {
      console.error("Error in /api/teacher/ask:", err);
      const correctAnswer = req.body.correctAnswer || 1;
      return res.json({
        reply: `As your Teacher: The correct answer is Option ${correctAnswer}. Well done for reviewing this question! Repetition in your daily Mistake Drill will turn this knowledge into permanent memory.`,
      });
    }
  });

  // API: Dynamic AI Quiz Generation
  app.post("/api/teacher/generate-quiz", async (req, res) => {
    try {
      const { topic, count = 5, difficulty = "standard" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(400).json({
          error: "Gemini API key is not configured yet. Using built-in master question bank.",
        });
      }

      const prompt = `Generate ${count} multiple choice test questions on the Catholic topic: "${topic}".
Difficulty level: ${difficulty}.
CRITICAL REQUIREMENTS:
- Every question MUST have exactly 4 choices (numbered 1, 2, 3, 4).
- The correct option must be an integer from 1 to 4.
- Do NOT provide PDF references, links, or page citations that give away answers.
- Questions should test exact memorization of prayers, Ten Commandments, Seven Sacraments, Order of the Mass, or key Catholic doctrine.
- Provide a brief 1-sentence teacher explanation.`;

      const response = await generateWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                category: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Array of exactly 4 options corresponding to 1, 2, 3, 4",
                },
                correctAnswer: {
                  type: Type.INTEGER,
                  description: "Integer index 1, 2, 3, or 4 for the correct choice",
                },
                explanation: { type: Type.STRING },
                day: { type: Type.INTEGER },
              },
              required: ["question", "options", "correctAnswer", "explanation"],
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ questions: parsed });
    } catch (err: unknown) {
      console.error("Error in /api/teacher/generate-quiz:", err);
      return res.json({
        questions: [],
        message: "Quiz service is temporarily busy. Please use the built-in 14-day curriculum question bank.",
      });
    }
  });

  // API: Teacher daily curriculum advice
  app.post("/api/teacher/daily-plan", async (req, res) => {
    try {
      const { dayNumber, totalMistakes, masteredCount, accuracyRate } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          recommendation: `Welcome to Day ${dayNumber || 1}! Spend 10 minutes reviewing your ${totalMistakes || 0} mistakes in the Mistake Drill, 15 minutes on today's new curriculum test, and 5 minutes in Memorization Mode for Chief Prayers and Sacraments.`,
        });
      }

      const prompt = `You are a teacher evaluating a student's daily 30-minute Catechism & Memorization curriculum.
Current stats:
- Current Day: Day ${dayNumber || 1}
- Unresolved Mistakes in Drill Queue: ${totalMistakes || 0}
- Items Mastered (100%): ${masteredCount || 0}
- Overall Accuracy Rate: ${accuracyRate || 85}%

Give a concise, encouraging 3-part 30-minute daily breakdown (10 mins mistake drill, 15 mins new topic test, 5 mins memorization recitation) with specific guidance as the Teacher. Keep under 120 words.`;

      const response = await generateWithFallback(ai, {
        contents: prompt,
      });

      return res.json({ recommendation: response.text });
    } catch (err: unknown) {
      console.error("Error in /api/teacher/daily-plan:", err);
      const dayNum = req.body.dayNumber || 1;
      const mistakes = req.body.totalMistakes || 0;
      return res.json({
        recommendation: `Welcome to Day ${dayNum}! Spend 8 minutes reviewing your ${mistakes} queued mistakes in the Mistake Drill, 15 minutes taking today's 1–4 multiple-choice test, and 7 minutes in Memorization Mode.`,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Teacher Curriculum Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
