import React, { useState, useEffect, useRef } from "react";
import { Header, NavTabType } from "./components/Header";
import { DailyTimerBar } from "./components/DailyTimerBar";
import { CurriculumView } from "./components/CurriculumView";
import { MultipleChoiceTest } from "./components/MultipleChoiceTest";
import { MistakeDrillView } from "./components/MistakeDrillView";
import { MemorizationView } from "./components/MemorizationView";
import { ScoreAnalyticsView } from "./components/ScoreAnalyticsView";
import { DailyPrayerGuideView } from "./components/DailyPrayerGuideView";
import { LiturgicalCalendarView } from "./components/LiturgicalCalendarView";
import { ConfessionGuideView } from "./components/ConfessionGuideView";
import { LatinParallelReaderView } from "./components/LatinParallelReaderView";
import { StudySheetsExportView } from "./components/StudySheetsExportView";
import { BibleReaderView } from "./components/BibleReaderView";
import { PennyCatechismView } from "./components/PennyCatechismView";
import { RosaryInstructionsView } from "./components/RosaryInstructionsView";
import { ComprehensiveTestHub } from "./components/ComprehensiveTestHub";
import { LibraryHubView } from "./components/LibraryHubView";
import { SideDrawer } from "./components/SideDrawer";
import { BottomNav } from "./components/BottomNav";
import { TestContentCategory } from "./services/comprehensiveTestService";
import { TeacherAssistantModal } from "./components/TeacherAssistantModal";
import { UserProgress, Question, CurriculumDay } from "./types";
import { loadUserProgress, saveUserProgress, addStudiedMinutes } from "./services/storageService";
import { MASTER_QUESTION_BANK, CURRICULUM_DAYS } from "./data/curriculumData";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { Sparkles, BookOpen, RotateCcw, Brain, Award, Play } from "lucide-react";

function MainAppContent() {
  const { language, t, getCurriculumDay, getQuestion } = useLanguage();
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [currentTab, setCurrentTab] = useState<NavTabType>("hub");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active Test State
  const [selectedTestCategory, setSelectedTestCategory] = useState<TestContentCategory | undefined>("curriculum_daily");
  const [activeTestDay, setActiveTestDay] = useState<number | undefined>(undefined);

  // 30-Minute Daily Timer
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(30 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Teacher Assistant Modal State
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [selectedQuestionForTeacher, setSelectedQuestionForTeacher] = useState<Question | undefined>(undefined);
  const [teacherSelectedAnswer, setTeacherSelectedAnswer] = useState<number | undefined>(undefined);
  const [teacherCorrectAnswer, setTeacherCorrectAnswer] = useState<number | undefined>(undefined);

  // 1-second interval timer ticker for the 30-minute daily session
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            // Completed 30 min session!
            setIsTimerRunning(false);
            const updated = addStudiedMinutes(0.5, progress);
            setProgress(updated);
            return 0;
          }
          // Every 60 seconds, increment studied minutes in progress
          if (prev % 60 === 0) {
            setProgress((curr) => addStudiedMinutes(1, curr));
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, progress]);

  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(30 * 60);
  };

  const handleAddMinutes = (mins: number) => {
    const updated = addStudiedMinutes(mins, progress);
    setProgress(updated);
  };

  const handleToggleSound = () => {
    const updated: UserProgress = {
      ...progress,
      soundEnabled: !progress.soundEnabled,
    };
    setProgress(updated);
    saveUserProgress(updated);
  };

  // Launching a specific Curriculum Day test
  const handleStartDayTest = (day: CurriculumDay, _questions?: Question[]) => {
    setSelectedTestCategory("curriculum_daily");
    setActiveTestDay(day.day);
    setCurrentTab("test");
    if (!isTimerRunning) setIsTimerRunning(true);
  };

  // Launching general / category test
  const handleStartCategoryQuiz = (category: string) => {
    const catMap: Record<string, TestContentCategory> = {
      prayers: "rosary_mysteries",
      creed: "penny_all",
      commandments: "ten_commandments",
      sacraments: "seven_sacraments",
      mass: "holy_mass_liturgy",
      virtues: "penny_all",
      scripture: "sacred_scripture",
    };
    setSelectedTestCategory(catMap[category.toLowerCase()] || "penny_all");
    setCurrentTab("test");
    if (!isTimerRunning) setIsTimerRunning(true);
  };

  // Launching mistake drill from button
  const handleStartMistakeDrill = () => {
    setSelectedTestCategory("curriculum_daily");
    setCurrentTab("mistakes");
    if (!isTimerRunning) setIsTimerRunning(true);
  };

  const handleOpenTeacherHelp = (q: Question, selected: number, correct: number) => {
    setSelectedQuestionForTeacher(q);
    setTeacherSelectedAnswer(selected);
    setTeacherCorrectAnswer(correct);
    setIsTeacherModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        progress={progress}
        onToggleSound={handleToggleSound}
        timerSecondsLeft={timerSecondsLeft}
        isTimerRunning={isTimerRunning}
        onToggleTimer={handleToggleTimer}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Collapsible Side Drawer (Hamburger Menu) */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        progress={progress}
        onOpenTeacherHelp={() => {
          setSelectedQuestionForTeacher(undefined);
          setIsTeacherModalOpen(true);
        }}
        onToggleSound={handleToggleSound}
        onToggleTimer={handleToggleTimer}
        isTimerRunning={isTimerRunning}
        timerSecondsLeft={timerSecondsLeft}
        onResetProgress={() => {
          const reset: UserProgress = {
            ...progress,
            currentDay: 1,
            completedDays: [],
            todayMinutesStudied: 0,
          };
          setProgress(reset);
          saveUserProgress(reset);
        }}
      />

      {/* 30-Minute Daily Progress Tracker Sub-Bar (Shown when on Curriculum tab) */}
      {currentTab === "curriculum" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <DailyTimerBar
            timerSecondsLeft={timerSecondsLeft}
            isTimerRunning={isTimerRunning}
            onToggleTimer={handleToggleTimer}
            onResetTimer={handleResetTimer}
            todayMinutesStudied={progress.todayMinutesStudied}
            onAddMinutes={handleAddMinutes}
          />
        </div>
      )}

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-20">
        {currentTab === "hub" && (
          <LibraryHubView
            progress={progress}
            onNavigateToTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onStartDayTest={(dayNumber) => {
              const dayObj = CURRICULUM_DAYS.find((d) => d.day === dayNumber) || CURRICULUM_DAYS[0];
              handleStartDayTest(dayObj);
            }}
            onStartMistakeDrill={handleStartMistakeDrill}
            onToggleTimer={handleToggleTimer}
            isTimerRunning={isTimerRunning}
            timerSecondsLeft={timerSecondsLeft}
          />
        )}
        {currentTab === "curriculum" && (
          <CurriculumView
            progress={progress}
            onProgressUpdate={setProgress}
            onStartDayTest={handleStartDayTest}
            onStartMistakeDrill={handleStartMistakeDrill}
            onNavigateToMemorization={() => setCurrentTab("memorize")}
            onNavigateToPrayers={() => setCurrentTab("prayers")}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === "bible" && (
          <BibleReaderView
            onAddMinutes={(mins) => {
              const updated = addStudiedMinutes(mins, progress);
              setProgress(updated);
            }}
          />
        )}

        {currentTab === "penny" && (
          <PennyCatechismView
            onAddMinutes={(mins) => {
              const updated = addStudiedMinutes(mins, progress);
              setProgress(updated);
            }}
          />
        )}

        {currentTab === "rosary" && (
          <RosaryInstructionsView
            onAddMinutes={(mins) => {
              const updated = addStudiedMinutes(mins, progress);
              setProgress(updated);
            }}
          />
        )}

        {currentTab === "test" && (
          <ComprehensiveTestHub
            progress={progress}
            onProgressUpdate={(updated) => {
              setProgress(updated);
              saveUserProgress(updated);
            }}
            onOpenTeacherHelp={handleOpenTeacherHelp}
            onAdvanceDay={() => {
              const currentD = progress.currentDay || 1;
              const nextDay = currentD < 14 ? currentD + 1 : 1;
              const completed = progress.completedDays || [];
              const updated: UserProgress = {
                ...progress,
                currentDay: nextDay,
                completedDays: completed.includes(currentD) ? completed : [...completed, currentD],
              };
              setProgress(updated);
              saveUserProgress(updated);
              setActiveTestDay(nextDay);
            }}
            initialCategory={selectedTestCategory}
            initialDay={activeTestDay || progress.currentDay || 1}
          />
        )}

        {currentTab === "mistakes" && (
          <MistakeDrillView
            progress={progress}
            onProgressUpdate={setProgress}
            onOpenTeacherHelp={handleOpenTeacherHelp}
          />
        )}

        {currentTab === "memorize" && (
          <MemorizationView
            progress={progress}
            onProgressUpdate={setProgress}
            onStartQuizOnItem={handleStartCategoryQuiz}
          />
        )}

        {currentTab === "prayers" && (
          <DailyPrayerGuideView
            progress={progress}
            onProgressUpdate={setProgress}
            onNavigateToMemorization={(itemId) => {
              setCurrentTab("memorize");
            }}
            onNavigateToRosary={() => {
              setCurrentTab("rosary");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onAddMinutes={(mins) => {
              const updated = addStudiedMinutes(mins, progress);
              setProgress(updated);
            }}
          />
        )}

        {currentTab === "calendar" && (
          <LiturgicalCalendarView />
        )}

        {currentTab === "confession" && (
          <ConfessionGuideView
            onAddMinutes={(mins) => {
              const updated = addStudiedMinutes(mins, progress);
              setProgress(updated);
            }}
          />
        )}

        {currentTab === "latin" && (
          <LatinParallelReaderView />
        )}

        {currentTab === "sheets" && (
          <StudySheetsExportView />
        )}

        {currentTab === "scores" && (
          <ScoreAnalyticsView progress={progress} />
        )}
      </main>

      {/* Teacher Assistant Modal */}
      <TeacherAssistantModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        question={selectedQuestionForTeacher}
        selectedAnswer={teacherSelectedAnswer}
        correctAnswer={teacherCorrectAnswer}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 shadow-xs mb-16 sm:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-slate-700">
            Sanctuary • Catholic Scripture Prayers, Catechism, Penny Catechism and Bible Reading
          </span>
          <span className="italic text-slate-500">
            Ad Maiorem Dei Gloriam • For the Greater Glory of God
          </span>
        </div>
      </footer>

      {/* Fixed Bottom Navigation Bar (Core Mobile & Quick Access) */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        progress={progress}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
