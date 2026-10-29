export type Language = "en" | "de";

export interface Translations {
  // Navigation & Tabs
  appName: string;
  appSubtitle: string;
  teacherMode: string;
  tagline: string;
  tabHub: string;
  tabCurriculum: string;
  tabBible: string;
  tabPenny: string;
  tabRosary: string;
  tabTest: string;
  tabMistakes: string;
  tabMemorize: string;
  tabPrayers: string;
  tabCalendar: string;
  tabConfession: string;
  tabLatin: string;
  tabSheets: string;
  tabScores: string;

  // Header & Timer
  timerTooltipStart: string;
  timerTooltipPause: string;
  dailyGoal: string;
  streakDays: string;
  mistakesBadge: string;
  soundOn: string;
  soundOff: string;
  langEn: string;
  langDe: string;

  // Curriculum View
  curriculumHeaderTitle: string;
  curriculumHeaderSubtitle: string;
  teacherPedagogyBadge: string;
  selectDay: string;
  dayBadge: string;
  statusCompleted: string;
  statusCurrent: string;
  statusLocked: string;
  start30MinSession: string;
  aiTeacherPlanTitle: string;
  aiTeacherPlanLoading: string;
  learningObjectivesTitle: string;
  keyTextToMemorizeTitle: string;
  markAsCompleteBtn: string;
  markAsIncompleteBtn: string;
  startDailyTestBtn: string;
  curriculumOverview: string;

  // Test & Quiz View
  testTitle: string;
  questionOf: string;
  selectPrompt: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  submitAnswer: string;
  nextQuestion: string;
  finishTest: string;
  correctBadge: string;
  incorrectBadge: string;
  explanationTitle: string;
  memoryTipTitle: string;
  askAiTeacher: string;
  testCompletedTitle: string;
  testScore: string;
  perfectScoreMsg: string;
  goodScoreMsg: string;
  reviewMistakesBtn: string;
  retakeTestBtn: string;
  backToCurriculumBtn: string;

  // Mistake Drill View
  mistakeDrillTitle: string;
  mistakeDrillSubtitle: string;
  activeMistakesCount: string;
  masteredMistakesCount: string;
  startDrillBtn: string;
  noMistakesMsg: string;
  masteryGoalMsg: string;
  consecutiveCorrect: string;
  timesFailed: string;
  addStudentNote: string;
  saveNote: string;

  // Memorization View
  memorizationTitle: string;
  memorizationSubtitle: string;
  clozeMode: string;
  fullTextMode: string;
  latinMode: string;
  practiceRecall: string;
  listenAudio: string;
  markMemorized: string;
  memorizedBadge: string;

  // Confession Guide View
  confessionTitle: string;
  confessionSubtitle: string;
  examOfConscience: string;
  fiveStepsTitle: string;
  contritionPrayer: string;
  absolutionFormula: string;

  // Liturgical Calendar View
  calendarTitle: string;
  calendarSubtitle: string;
  currentSeason: string;
  todayLiturgical: string;
  colorVestments: string;
  fastingObligation: string;

  // Common UI
  close: string;
  save: string;
  copied: string;
  searchPlaceholder: string;
  filterAll: string;
  readAloud: string;
  stopAudio: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    // Navigation & Tabs
    appName: "Sanctuary",
    appSubtitle: "Catholic Scripture Prayers, Catechism, Penny Catechism & Bible Reading",
    teacherMode: "Study Guide",
    tagline: "Catholic Scripture Prayers • Penny Catechism • Bible Reading",
    tabHub: "Library Hub",
    tabCurriculum: "Daily Program",
    tabBible: "Catholic Bible",
    tabPenny: "Penny Catechism",
    tabRosary: "Rosary & Animation",
    tabTest: "1-to-4 Tests (All Content)",
    tabMistakes: "Mistakes",
    tabMemorize: "Memorize",
    tabPrayers: "Daily Prayers",
    tabCalendar: "Liturgical Calendar",
    tabConfession: "Confession Guide",
    tabLatin: "Latin Reader",
    tabSheets: "Study Sheets",
    tabScores: "Progress & Scores",

    // Header & Timer
    timerTooltipStart: "Start 30-Min Study Timer",
    timerTooltipPause: "Pause 30-Min Study Timer",
    dailyGoal: "Daily Goal: 30 Mins",
    streakDays: "Day Streak",
    mistakesBadge: "Active Mistakes",
    soundOn: "Sound Effects: ON",
    soundOff: "Sound Effects: OFF",
    langEn: "English",
    langDe: "Deutsch",

    // Curriculum View
    curriculumHeaderTitle: "14-Day Structured Catholic Curriculum",
    curriculumHeaderSubtitle: "A disciplined 30-minute daily pathway covering Chief Prayers, the Ten Commandments, Seven Sacraments, the Order of the Mass, and Virtues.",
    teacherPedagogyBadge: "Classical Catholic Pedagogy",
    selectDay: "Select Day",
    dayBadge: "Day",
    statusCompleted: "Completed",
    statusCurrent: "Current Lesson",
    statusLocked: "Upcoming",
    start30MinSession: "Start 30-Min Lesson",
    aiTeacherPlanTitle: "Teacher's Daily Study Plan (30 Minutes)",
    aiTeacherPlanLoading: "Generating tailored study guidance...",
    learningObjectivesTitle: "Core Learning Objectives",
    keyTextToMemorizeTitle: "Key Text to Memorize",
    markAsCompleteBtn: "Mark Day as Completed",
    markAsIncompleteBtn: "Mark as Incomplete",
    startDailyTestBtn: "Begin Day 1-4 Test",
    curriculumOverview: "Curriculum Overview",

    // Test & Quiz View
    testTitle: "1-4 Multiple Choice Examination",
    questionOf: "Question",
    selectPrompt: "Select the single best answer (1, 2, 3, or 4):",
    option1: "1.",
    option2: "2.",
    option3: "3.",
    option4: "4.",
    submitAnswer: "Confirm Answer",
    nextQuestion: "Next Question →",
    finishTest: "Finish & Calculate Score",
    correctBadge: "Correct!",
    incorrectBadge: "Incorrect",
    explanationTitle: "Catechetical Explanation",
    memoryTipTitle: "Memory & Retention Mnemonic",
    askAiTeacher: "Ask Teacher Assistant for In-Depth Explanation",
    testCompletedTitle: "Test Examination Completed!",
    testScore: "Your Score",
    perfectScoreMsg: "Outstanding! Perfect 100% mastery achieved. Deo Gratias!",
    goodScoreMsg: "Great work! Any missed questions have been queued for spaced mistake drills.",
    reviewMistakesBtn: "Drill Missed Questions",
    retakeTestBtn: "Retake Test",
    backToCurriculumBtn: "Back to Curriculum",

    // Mistake Drill View
    mistakeDrillTitle: "Automated Spaced Mistake Drills",
    mistakeDrillSubtitle: "Review and master questions you missed until you achieve 2 consecutive correct answers.",
    activeMistakesCount: "Active Missed Questions",
    masteredMistakesCount: "Mastered Questions",
    startDrillBtn: "Start Mistake Practice Session",
    noMistakesMsg: "No active mistakes in your queue! Keep testing your knowledge in the curriculum.",
    masteryGoalMsg: "Answer correctly twice in a row to achieve permanent mastery.",
    consecutiveCorrect: "Consecutive Correct",
    timesFailed: "Times Failed",
    addStudentNote: "Add Personal Study Note",
    saveNote: "Save Note",

    // Memorization View
    memorizationTitle: "Sacred Texts Memorization Studio",
    memorizationSubtitle: "Commit Catholic prayers, commandments, sacraments, and Latin chants to heart with cloze deletion flashcards.",
    clozeMode: "Fill-in-the-Blanks (Cloze)",
    fullTextMode: "Full Text View",
    latinMode: "Latin Text",
    practiceRecall: "Test Recall",
    listenAudio: "Listen Audio",
    markMemorized: "Mark as Memorized",
    memorizedBadge: "Memorized",

    // Confession Guide View
    confessionTitle: "Sacrament of Penance Guide & Examination of Conscience",
    confessionSubtitle: "Prepare a devout Confession with 10 Commandments examination, the 5 conditions for a good confession, and the Act of Contrition.",
    examOfConscience: "Examination of Conscience",
    fiveStepsTitle: "5 Steps for a Holy Confession",
    contritionPrayer: "Act of Contrition",
    absolutionFormula: "Formula of Absolution",

    // Liturgical Calendar View
    calendarTitle: "Traditional Catholic Liturgical Calendar",
    calendarSubtitle: "Track liturgical seasons, liturgical colors, feast days, Ember Days, and fasting obligations throughout the Church year.",
    currentSeason: "Current Season",
    todayLiturgical: "Today in the Liturgy",
    colorVestments: "Liturgical Color",
    fastingObligation: "Fasting & Abstinence",

    // Common UI
    close: "Close",
    save: "Save",
    copied: "Copied to clipboard!",
    searchPlaceholder: "Search by keyword...",
    filterAll: "All",
    readAloud: "Read Aloud",
    stopAudio: "Stop Audio",
  },
  de: {
    // Navigation & Tabs
    appName: "Sanctuary",
    appSubtitle: "Katholische Schrift, Gebete, Katechismus & Bibellese",
    teacherMode: "Studienleiter",
    tagline: "Katholische Schrift & Gebete • Penny-Katechismus • Bibellese",
    tabHub: "Bibliotheks-Hub",
    tabCurriculum: "Lehrplan (14 Tage)",
    tabBible: "Katholische Bibel (DE / EN)",
    tabPenny: "Penny-Katechismus",
    tabRosary: "Rosenkranz-Anleitung",
    tabTest: "1-4 Test",
    tabMistakes: "Fehlertraining",
    tabMemorize: "Auswendiglernen",
    tabPrayers: "Tägliche Gebete",
    tabCalendar: "Liturgischer Kalender",
    tabConfession: "Beichtspiegel & Beichte",
    tabLatin: "Latein-Leser",
    tabSheets: "Lernblätter",
    tabScores: "Fortschritt & Noten",

    // Header & Timer
    timerTooltipStart: "30-Minuten Lerntimer starten",
    timerTooltipPause: "30-Minuten Lerntimer pausieren",
    dailyGoal: "Tagesziel: 30 Min.",
    streakDays: "Tage Serie",
    mistakesBadge: "Aktive Fehler",
    soundOn: "Toneffekte: EIN",
    soundOff: "Toneffekte: AUS",
    langEn: "English",
    langDe: "Deutsch",

    // Curriculum View
    curriculumHeaderTitle: "14-Tage Strukturierter Katholischer Lehrplan",
    curriculumHeaderSubtitle: "Ein disziplinierter 30-minütiger Tagesablauf: Grundgebete, die Zehn Gebote, die Sieben Sakramente, der Ablauf der Heiligen Messe und Tugenden.",
    teacherPedagogyBadge: "Klassische Katholische Pädagogik",
    selectDay: "Tag auswählen",
    dayBadge: "Tag",
    statusCompleted: "Abgeschlossen",
    statusCurrent: "Aktuelle Lektion",
    statusLocked: "Kommend",
    start30MinSession: "30-Minuten Lektion starten",
    aiTeacherPlanTitle: "Täglicher Studienplan des Lehrers (30 Minuten)",
    aiTeacherPlanLoading: "Erstelle individuellen Studienplan...",
    learningObjectivesTitle: "Wesentliche Lernziele",
    keyTextToMemorizeTitle: "Wichtiger Merktext zum Einprägen",
    markAsCompleteBtn: "Tag als abgeschlossen markieren",
    markAsIncompleteBtn: "Als unvollständig markieren",
    startDailyTestBtn: "1-4 Test für heute starten",
    curriculumOverview: "Lehrplan-Übersicht",

    // Test & Quiz View
    testTitle: "1-4 Multiple-Choice Prüfung",
    questionOf: "Frage",
    selectPrompt: "Wähle die einzig richtige Antwort (1, 2, 3 oder 4):",
    option1: "1.",
    option2: "2.",
    option3: "3.",
    option4: "4.",
    submitAnswer: "Antwort bestätigen",
    nextQuestion: "Nächste Frage →",
    finishTest: "Prüfung beenden & Auswertung",
    correctBadge: "Richtig!",
    incorrectBadge: "Falsch",
    explanationTitle: "Katechetische Erklärung",
    memoryTipTitle: "Gedächtnisstütze & Merksatz",
    askAiTeacher: "Lehrer-Assistent um Vertiefung bitten",
    testCompletedTitle: "Prüfung erfolgreich beendet!",
    testScore: "Dein Ergebnis",
    perfectScoreMsg: "Hervorragend! Perfekte 100% Meisterleistung erzielt. Deo Gratias!",
    goodScoreMsg: "Sehr gute Arbeit! Falsch beantwortete Fragen wurden automatisch für gezielte Fehlertrainings vorgemerkt.",
    reviewMistakesBtn: "Fehler gezielt wiederholen",
    retakeTestBtn: "Test wiederholen",
    backToCurriculumBtn: "Zurück zum Lehrplan",

    // Mistake Drill View
    mistakeDrillTitle: "Automatisiertes Fehlertraining (Spaced Repetition)",
    mistakeDrillSubtitle: "Wiederhole fehlerhafte Fragen, bis du sie 2-mal hintereinander fehlerfrei beherrschst.",
    activeMistakesCount: "Aktive Fehler in der Warteschlange",
    masteredMistakesCount: "Gemeisterte Fragen",
    startDrillBtn: "Fehler-Trainingseinheit starten",
    noMistakesMsg: "Keine offenen Fehler in der Warteschlange! Teste dein Wissen weiter im Lehrplan.",
    masteryGoalMsg: "Zweimal in Folge richtig antworten für dauerhaften Lernerfolg.",
    consecutiveCorrect: "Hintereinander Richtig",
    timesFailed: "Fehlversuche",
    addStudentNote: "Eigene Notiz hinzufügen",
    saveNote: "Notiz speichern",

    // Memorization View
    memorizationTitle: "Studio zum Auswendiglernen Heiliger Texte",
    memorizationSubtitle: "Präge dir katholische Grundgebete, Gebote, Sakramente und lateinische Gesänge mit Lückentext-Karten (Cloze) dauerhaft ein.",
    clozeMode: "Lückentext-Modus (Cloze)",
    fullTextMode: "Volltext-Ansicht",
    latinMode: "Lateinischer Text",
    practiceRecall: "Gedächtnis prüfen",
    listenAudio: "Audio anhören",
    markMemorized: "Als gelernt markieren",
    memorizedBadge: "Auswendig gelernt",

    // Confession Guide View
    confessionTitle: "Beichtspiegel & Leitfaden zum Sakrament der Buße",
    confessionSubtitle: "Gute Vorbereitung auf die heilige Beichte mit Gewissenserforschung anhand der 10 Gebote, den 5 Schritten zur guten Beichte und dem Reueakt.",
    examOfConscience: "Gewissenserforschung",
    fiveStepsTitle: "5 Schritte zu einer guten Beichte",
    contritionPrayer: "Akt der Reue",
    absolutionFormula: "Lossprechungsformel (Absolution)",

    // Liturgical Calendar View
    calendarTitle: "Traditioneller Katholischer Liturgischer Kalender",
    calendarSubtitle: "Behalte liturgische Zeiten, Gewandfarben, Heiligenfeste, Quatembertage sowie Fast- und Abstinenztage stets im Blick.",
    currentSeason: "Aktuelle liturgische Zeit",
    todayLiturgical: "Heute in der Liturgie",
    colorVestments: "Liturgische Farbe",
    fastingObligation: "Fasten- & Abstinenzgebot",

    // Common UI
    close: "Schließen",
    save: "Speichern",
    copied: "In die Zwischenablage kopiert!",
    searchPlaceholder: "Nach Stichwort suchen...",
    filterAll: "Alle",
    readAloud: "Vorlesen",
    stopAudio: "Audio anhalten",
  }
};
