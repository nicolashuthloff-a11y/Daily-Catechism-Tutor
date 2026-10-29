import React, { useState, useEffect, useCallback } from "react";
import { Question, UserProgress, TestSessionResult } from "../types";
import { recordQuestionAttempt, logCompletedSession } from "../services/storageService";
import { useLanguage } from "../i18n/LanguageContext";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, AlertTriangle, Sparkles, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface MultipleChoiceTestProps {
  questions: Question[];
  title?: string;
  subtitle?: string;
  mode?: "daily_curriculum" | "mistake_drill" | "custom_test" | "memorization_quiz";
  day?: number;
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onFinishTest: (result: TestSessionResult) => void;
  onOpenTeacherHelp: (q: Question, selected: number, correct: number) => void;
  onStartMistakeDrill?: () => void;
}

export const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({
  questions,
  title,
  subtitle,
  mode = "daily_curriculum",
  day,
  progress,
  onProgressUpdate,
  onFinishTest,
  onOpenTeacherHelp,
  onStartMistakeDrill,
}) => {
  const { language, t, getQuestion } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ questionId: string; isCorrect: boolean; selected: number }[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [isComplete, setIsComplete] = useState(false);

  const rawQuestion = questions[currentIndex];
  const currentQuestion = rawQuestion ? getQuestion(rawQuestion) : undefined;

  const handleSelectOption = (optionNumber: 1 | 2 | 3 | 4) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionNumber);
  };

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const { progress: updatedProgress, isCorrect } = recordQuestionAttempt(
      currentQuestion,
      selectedOption,
      progress
    );
    onProgressUpdate(updatedProgress);

    setAnswersLog((prev) => [
      ...prev,
      { questionId: currentQuestion.id, isCorrect, selected: selectedOption },
    ]);
  }, [currentQuestion, selectedOption, isAnswerSubmitted, progress, onProgressUpdate]);

  const handleNextQuestion = () => {
    if (!currentQuestion) return;

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Complete test session
      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      const total = questions.length;
      const correctCount = answersLog.filter((a) => a.isCorrect).length + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
      const scorePercentage = Math.round((correctCount / total) * 100);
      const missedIds = answersLog.filter((a) => !a.isCorrect).map((a) => a.questionId);
      if (selectedOption !== currentQuestion.correctAnswer && !missedIds.includes(currentQuestion.id)) {
        missedIds.push(currentQuestion.id);
      }

      const result: TestSessionResult = {
        id: `test-${Date.now()}`,
        date: new Date().toISOString(),
        mode: (mode || "daily_curriculum") as "daily_curriculum" | "mistake_drill" | "custom_test" | "memorization_quiz",
        day,
        totalQuestions: total,
        correctCount,
        scorePercentage,
        durationSeconds,
        missedQuestionIds: missedIds,
      };

      const updatedProgress = logCompletedSession(result, progress);
      onProgressUpdate(updatedProgress);
      setIsComplete(true);

      if (scorePercentage >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      onFinishTest(result);
    }
  };

  // Keyboard shortcut listener: 1, 2, 3, 4 for answer selection; Enter for submit/next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return;

      if (!isAnswerSubmitted) {
        if (e.key === "1") handleSelectOption(1);
        if (e.key === "2") handleSelectOption(2);
        if (e.key === "3") handleSelectOption(3);
        if (e.key === "4") handleSelectOption(4);
        if (e.key === "Enter" && selectedOption !== null) {
          handleSubmitAnswer();
        }
      } else {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswerSubmitted, selectedOption, isComplete, handleSubmitAnswer]);

  if (!questions || questions.length === 0 || !currentQuestion) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-600 shadow-xl shadow-slate-200/50 max-w-2xl mx-auto">
        <p className="text-base font-semibold">{language === "de" ? "Keine Fragen in diesem Set gefunden." : "No questions found in this set."}</p>
      </div>
    );
  }

  // Completion Screen
  if (isComplete) {
    const correctTotal = answersLog.filter((a) => a.isCorrect).length;
    const scorePct = Math.round((correctTotal / questions.length) * 100);
    const mistakesMade = answersLog.filter((a) => !a.isCorrect);

    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-slate-800 max-w-2xl mx-auto shadow-xl shadow-slate-200/50 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mx-auto flex items-center justify-center font-bold">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.testCompletedTitle}</h2>
          <p className="text-sm text-slate-500">
            {scorePct >= 80 ? t.perfectScoreMsg : t.goodScoreMsg}
          </p>
        </div>

        {/* Score Ring / Summary */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t.testScore}</span>
            <div className="text-2xl font-mono font-black text-blue-600">{scorePct}%</div>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{language === "de" ? "Richtig" : "Correct"}</span>
            <div className="text-2xl font-mono font-black text-emerald-600">
              {correctTotal} / {questions.length}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{language === "de" ? "Fehler" : "Mistakes"}</span>
            <div className="text-2xl font-mono font-black text-rose-600">{mistakesMade.length}</div>
          </div>
        </div>

        {/* Mistake Alert & Instant Drill Option */}
        {mistakesMade.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-orange-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span>
                {language === "de"
                  ? `${mistakesMade.length} fehlerhafte Frage(n) für das Fehlertraining vorgemerkt`
                  : `${mistakesMade.length} question${mistakesMade.length === 1 ? "" : "s"} added to your Mistake Bank`}
              </span>
            </div>
            <p className="text-xs text-orange-700/90 leading-relaxed">
              {language === "de"
                ? "Wie von deinem Lehrer empfohlen, werden Fehler gesammelt, damit du sie durch Wiederholung bis zur Meisterschaft üben kannst."
                : "As requested by your daily teacher, mistakes are automatically queued so you can repeatedly practice them until mastered."}
            </p>
            {onStartMistakeDrill && (
              <button
                id="btn-drill-mistakes-now"
                onClick={onStartMistakeDrill}
                className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t.reviewMistakesBtn}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswerSubmitted(false);
              setAnswersLog([]);
              setIsComplete(false);
            }}
            className="flex-1 py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t.retakeTestBtn}
          </button>
        </div>
      </div>
    );
  }

  const isSelectedCorrect = selectedOption === currentQuestion.correctAnswer;
  const errorRate = answersLog.length > 0
    ? Math.round((answersLog.filter((a) => !a.isCorrect).length / answersLog.length) * 100)
    : 0;

  const displayTitle = title || t.testTitle;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col overflow-hidden max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <span className="text-blue-600 font-bold text-xs sm:text-sm tracking-wide uppercase">
            {currentQuestion.categoryLabel || currentQuestion.category} • {language === "de" ? "Katechismus-Prüfung" : "Memorization Test"}
          </span>
          <h3 className="text-2xl font-bold mt-1 text-slate-900">{displayTitle}</h3>
        </div>
        <div className="text-right">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t.questionOf}</div>
          <div className="text-xl font-black text-slate-700 font-mono">
            {String(currentIndex + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Main Question & Option Cards */}
      <div className="flex-1 p-6 sm:p-12 flex flex-col items-center justify-center text-center">
        {/* Anti-spoiler banner */}
        <div className="text-xs text-slate-400 font-medium mb-6 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-100">
          🔒 {language === "de" ? "Prüfungsmodus: Externe Hilfen während des Tests ausgeblendet." : "Strict Memory Mode: External references hidden during testing."}
        </div>

        <div className="max-w-3xl w-full">
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-800 leading-tight mb-8 sm:mb-12">
            {currentQuestion.question}
          </h2>

          {/* 1–4 Option Cards in 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full text-left">
            {currentQuestion.options.map((optionText, idx) => {
              const optionNum = (idx + 1) as 1 | 2 | 3 | 4;
              const isSelected = selectedOption === optionNum;
              const isCorrect = optionNum === currentQuestion.correctAnswer;

              let cardStyles = "bg-white border-2 border-slate-100 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 text-slate-700";
              let badgeStyles = "bg-slate-50 text-slate-700 group-hover:bg-blue-600 group-hover:text-white";
              let textStyles = "text-slate-700 group-hover:text-blue-700";

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  cardStyles = "bg-emerald-50/50 border-2 border-emerald-600 shadow-lg shadow-emerald-500/10";
                  badgeStyles = "bg-emerald-600 text-white";
                  textStyles = "text-emerald-800 font-bold";
                } else if (isSelected && !isCorrect) {
                  cardStyles = "bg-rose-50/50 border-2 border-rose-600 shadow-lg shadow-rose-500/10";
                  badgeStyles = "bg-rose-600 text-white";
                  textStyles = "text-rose-800 font-bold";
                } else {
                  cardStyles = "bg-slate-50/40 border-2 border-slate-100 opacity-50";
                  badgeStyles = "bg-slate-100 text-slate-400";
                  textStyles = "text-slate-400";
                }
              } else if (isSelected) {
                cardStyles = "bg-white border-2 border-blue-600 shadow-lg shadow-blue-500/10";
                badgeStyles = "bg-blue-600 text-white";
                textStyles = "text-blue-700 font-bold";
              }

              return (
                <button
                  key={idx}
                  id={`option-btn-${optionNum}`}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(optionNum)}
                  className={`group flex items-center p-5 sm:p-6 rounded-2xl transition-all ${cardStyles}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-5 shrink-0 transition-colors ${badgeStyles}`}>
                    {optionNum}
                  </div>
                  <div className={`font-semibold text-base sm:text-lg flex-1 ${textStyles}`}>
                    {optionText}
                  </div>
                  {isAnswerSubmitted && (
                    <div className="shrink-0 ml-2">
                      {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Teacher Note (Appears immediately after submission) */}
          {isAnswerSubmitted && (
            <div
              className={`mt-8 p-5 rounded-2xl border text-sm text-left animate-fade-in ${
                isSelectedCorrect
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-base">
                    {isSelectedCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>{t.correctBadge} (Option {currentQuestion.correctAnswer})</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>{t.incorrectBadge} — {language === "de" ? `Richtige Antwort ist Option ${currentQuestion.correctAnswer}` : `Correct Answer is Option ${currentQuestion.correctAnswer}`}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm pt-1 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.memoryTip && (
                    <p className="text-xs font-semibold text-blue-700 pt-1">
                      💡 {t.memoryTipTitle}: {currentQuestion.memoryTip}
                    </p>
                  )}
                </div>

                {/* Ask Teacher Button */}
                <button
                  id="btn-ask-teacher-help"
                  onClick={() =>
                    onOpenTeacherHelp(
                      currentQuestion,
                      selectedOption || 0,
                      currentQuestion.correctAnswer
                    )
                  }
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs border border-blue-200 transition-colors flex items-center gap-1.5 shadow-xs"
                  title="Ask Teacher to explain further"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{language === "de" ? "Lehrer fragen" : "Ask Teacher"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sleek Dark Bottom Bar */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-8 sm:space-x-12">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              {language === "de" ? "Fortschritt" : "Session Progress"}
            </span>
            <span className="text-lg font-bold">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              {language === "de" ? "Fehlerquote" : "Error Rate"}
            </span>
            <span className={`text-lg font-bold ${errorRate > 0 ? "text-orange-400" : "text-emerald-400"}`}>
              {errorRate}%
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-400 hidden md:inline-block font-mono">
            {!isAnswerSubmitted 
              ? (language === "de" ? "Tasten: 1, 2, 3, 4 + Enter" : "Keyboard: 1, 2, 3, 4 + Enter")
              : (language === "de" ? "Enter drücken für Weiter" : "Press Enter for Next")}
          </span>

          {!isAnswerSubmitted ? (
            <button
              id="btn-submit-answer"
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 disabled:opacity-40 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 text-xs sm:text-sm uppercase tracking-wider text-white"
            >
              {t.submitAnswer}
            </button>
          ) : (
            <button
              id="btn-next-question"
              onClick={handleNextQuestion}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 text-xs sm:text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2"
            >
              <span>{currentIndex + 1 < questions.length ? t.nextQuestion : t.finishTest}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
