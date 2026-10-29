import React, { useState } from "react";
import { X, Send, Sparkles, GraduationCap, Loader2, Lightbulb } from "lucide-react";
import { Question } from "../types";
import { askTeacher } from "../services/aiService";
import { useLanguage } from "../i18n/LanguageContext";

interface TeacherAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: Question;
  selectedAnswer?: number;
  correctAnswer?: number;
}

export const TeacherAssistantModal: React.FC<TeacherAssistantModalProps> = ({
  isOpen,
  onClose,
  question,
  selectedAnswer,
  correctAnswer,
}) => {
  const { language, t, getQuestion } = useLanguage();
  const [userQuery, setUserQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherReply, setTeacherReply] = useState<string | null>(null);

  if (!isOpen) return null;

  const localizedQ = question ? getQuestion(question) : undefined;

  const handleConsultTeacher = async (customText?: string) => {
    if (!localizedQ) return;
    setLoading(true);
    try {
      const promptQuery =
        customText ||
        userQuery ||
        (language === "de"
          ? "Bitte erkläre auf Deutsch, warum dies die richtige Antwort ist, und gib mir eine praktische Eselsbrücke."
          : "Please explain why this is the correct answer and give me a memory trick.");

      const reply = await askTeacher({
        question: localizedQ.question,
        options: localizedQ.options,
        selectedAnswer: selectedAnswer || 0,
        correctAnswer: correctAnswer || localizedQ.correctAnswer,
        category: localizedQ.categoryLabel || localizedQ.category,
        userQuery: `${language === "de" ? "[Please respond strictly in German] " : ""}${promptQuery}`,
      });
      setTeacherReply(reply);
    } catch {
      setTeacherReply(
        language === "de"
          ? `Merke: Option ${localizedQ.correctAnswer} ist richtig. Durch tägliches Wiederholen deiner Fehler wirst du diesen Glaubenssatz fest verankern!`
          : `Remember: Option ${localizedQ.correctAnswer} is correct. Daily spaced repetition of mistakes will cement this in your memory!`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-slate-800 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                {language === "de" ? "Rat des Katechismus-Lehrers" : "Teacher's Guidance"}
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                  {language === "de" ? "Pädagogischer Tutor" : "Pedagogical Tutor"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "de"
                  ? "Sokratische Erklärung ohne Lösungs-Spoiler"
                  : "Socratic explanation without reference spoilers"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 border border-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {localizedQ && (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold">
                {language === "de" ? "Aktuelle Prüfungsfrage" : "Question Under Review"}
              </span>
              <p className="font-bold text-slate-900">{localizedQ.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                {localizedQ.options.map((opt, i) => {
                  const num = i + 1;
                  const isCorrect = num === localizedQ.correctAnswer;
                  const isSelected = num === selectedAnswer;
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border ${
                        isCorrect
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
                          : isSelected
                          ? "bg-rose-50 border-rose-200 text-rose-800 font-bold"
                          : "bg-white border-slate-200 text-slate-600 font-medium"
                      }`}
                    >
                      <span className="font-bold mr-1.5">[{num}]</span> {opt}
                      {isCorrect && ` (${language === "de" ? "Richtig" : "Correct"})`}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Action Prompt */}
          {!teacherReply && !loading && (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-medium">
                {language === "de" ? "Frage an den Lehrer auswählen:" : "Select a prompt for your teacher:"}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleConsultTeacher(
                      language === "de"
                        ? "Warum ist die richtige Antwort korrekt und wie unterscheide ich sie?"
                        : "Why is the correct option right, and how do I distinguish it?"
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs border border-slate-200 transition-colors text-left flex items-center gap-1.5 font-bold"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                  {language === "de" ? "Erkläre, warum die Antwort stimmt" : "Explain why the correct answer is right"}
                </button>
                <button
                  onClick={() =>
                    handleConsultTeacher(
                      language === "de"
                        ? "Gib mir eine einprägsame Eselsbrücke, damit ich das nie wieder vergesse."
                        : "Give me a memorable trick or mnemonic to never get this wrong again."
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs border border-slate-200 transition-colors text-left flex items-center gap-1.5 font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  {language === "de" ? "Gib mir eine Merk-Eselsbrücke" : "Give me a mnemonic memory trick"}
                </button>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-xs font-medium">
                {language === "de"
                  ? "Der Lehrer formuliert die pädagogische Erklärung..."
                  : "The Teacher is formulating personalized feedback..."}
              </p>
            </div>
          )}

          {/* Teacher Response Box */}
          {teacherReply && !loading && (
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 text-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-blue-700 font-bold">
                <GraduationCap className="w-4 h-4" />
                {language === "de" ? "Erklärung & pädagogischer Hinweis:" : "Teacher's Lesson & Feedback:"}
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm font-medium">
                {teacherReply}
              </p>
              {localizedQ?.memoryTip && (
                <div className="pt-2 border-t border-blue-100 text-xs text-blue-800 flex items-start gap-1.5 font-medium">
                  <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === "de" ? "Kern-Tipp:" : "Core Tip:"}</strong> {localizedQ.memoryTip}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer (Ask Custom Question) */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && userQuery.trim() && !loading) {
                handleConsultTeacher(userQuery);
              }
            }}
            placeholder={
              language === "de"
                ? "Frage deinen Lehrer etwas zu dieser Frage..."
                : "Ask your teacher anything about this question..."
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-600 font-medium"
          />
          <button
            onClick={() => handleConsultTeacher(userQuery)}
            disabled={loading || !userQuery.trim()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            {language === "de" ? "Fragen" : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
};
