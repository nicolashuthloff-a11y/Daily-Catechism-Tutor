import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  BookOpen,
  Volume2,
  VolumeX,
  Search,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Type,
  Sun,
  Moon,
  Scroll,
  Book,
  Grid,
  X,
  List
} from "lucide-react";
import {
  CATHOLIC_BIBLE_BOOKS,
  BibleBook,
  BibleChapter,
  BibleVerse,
  getBibleChapter
} from "../data/bibleData";
import { devotionalAudio } from "../services/devotionalAudioService";

interface BibleReaderViewProps {
  onAddMinutes?: (mins: number) => void;
}

type ReaderTheme = "parchment" | "light" | "night";
type ReaderMode = "ebook" | "scroll";
type FontStyle = "serif" | "sans";

export const BibleReaderView: React.FC<BibleReaderViewProps> = ({ onAddMinutes }) => {
  // State: Book and Chapter
  const [selectedBookId, setSelectedBookId] = useState<string>(() => {
    return localStorage.getItem("virtuepath_last_bible_book") || "genesis";
  });
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(() => {
    const saved = localStorage.getItem("virtuepath_last_bible_chapter");
    return saved ? parseInt(saved, 10) || 1 : 1;
  });

  // Category filter for books
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Reader Settings
  const [readerMode, setReaderMode] = useState<ReaderMode>(() => {
    return (localStorage.getItem("virtuepath_reader_mode") as ReaderMode) || "ebook";
  });
  const [theme, setTheme] = useState<ReaderTheme>(() => {
    return (localStorage.getItem("virtuepath_reader_theme") as ReaderTheme) || "parchment";
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("virtuepath_reader_font_size");
    return saved ? parseInt(saved, 10) || 18 : 18;
  });
  const [fontStyle, setFontStyle] = useState<FontStyle>("serif");
  const [versesPerPage, setVersesPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals & Search
  const [showChapterPicker, setShowChapterPicker] = useState<boolean>(false);
  const [showBookPicker, setShowBookPicker] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("virtuepath_bible_bookmarks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // "Read to Me" Continuous Audio Engine
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [currentReadingVerseIndex, setCurrentReadingVerseIndex] = useState<number>(-1);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // 0.9x = devotional, prayerful pace
  const readingCancelledRef = useRef<boolean>(false);

  // Derive Current Book
  const currentBook: BibleBook = useMemo(() => {
    return CATHOLIC_BIBLE_BOOKS.find((b) => b.id === selectedBookId) || CATHOLIC_BIBLE_BOOKS[0];
  }, [selectedBookId]);

  // Derive Current Chapter with all verses
  const currentChapter: BibleChapter = useMemo(() => {
    return getBibleChapter(currentBook, selectedChapterNum);
  }, [currentBook, selectedChapterNum]);

  // Persist selections
  useEffect(() => {
    try {
      localStorage.setItem("virtuepath_last_bible_ref", `${currentBook.nameEn} ${selectedChapterNum}`);
      localStorage.setItem("virtuepath_last_bible_book", selectedBookId);
      localStorage.setItem("virtuepath_last_bible_chapter", String(selectedChapterNum));
      localStorage.setItem("virtuepath_reader_mode", readerMode);
      localStorage.setItem("virtuepath_reader_theme", theme);
      localStorage.setItem("virtuepath_reader_font_size", String(fontSize));
    } catch {
      // ignore
    }
  }, [currentBook, selectedChapterNum, selectedBookId, readerMode, theme, fontSize]);

  // Save Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem("virtuepath_bible_bookmarks", JSON.stringify(bookmarkedVerses));
    } catch {
      // ignore
    }
  }, [bookmarkedVerses]);

  // Reset page when chapter or book changes
  useEffect(() => {
    setCurrentPage(1);
    stopAudioReading();
  }, [selectedBookId, selectedChapterNum]);

  // Keyboard navigation for eBook page-turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (readerMode === "ebook") {
        if (e.key === "ArrowRight") {
          handleNextPage();
        } else if (e.key === "ArrowLeft") {
          handlePrevPage();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Calculate Paginated Verses for eBook Mode
  const totalVerses = currentChapter.verses.length;
  const totalPages = Math.max(1, Math.ceil(totalVerses / versesPerPage));

  const paginatedVerses = useMemo(() => {
    if (readerMode === "scroll") {
      return currentChapter.verses;
    }
    const startIndex = (currentPage - 1) * versesPerPage;
    return currentChapter.verses.slice(startIndex, startIndex + versesPerPage);
  }, [currentChapter.verses, readerMode, currentPage, versesPerPage]);

  // Auto page-turn during "Read to Me"
  useEffect(() => {
    if (isReadingAloud && readerMode === "ebook" && currentReadingVerseIndex >= 0) {
      const pageOfVerse = Math.floor(currentReadingVerseIndex / versesPerPage) + 1;
      if (pageOfVerse !== currentPage && pageOfVerse <= totalPages) {
        setCurrentPage(pageOfVerse);
      }
    }
  }, [currentReadingVerseIndex, isReadingAloud, readerMode, versesPerPage, currentPage, totalPages]);

  // Audio Engine: Stop reading
  const stopAudioReading = () => {
    readingCancelledRef.current = true;
    devotionalAudio.stop();
    setIsReadingAloud(false);
    setCurrentReadingVerseIndex(-1);
  };

  // Audio Engine: Read verse-by-verse continuously
  const startReadingFromIndex = (startIndex: number) => {
    readingCancelledRef.current = false;
    setIsReadingAloud(true);
    setCurrentReadingVerseIndex(startIndex);

    const speakNext = (idx: number) => {
      if (readingCancelledRef.current) return;
      if (idx >= currentChapter.verses.length) {
        // Chapter complete!
        setIsReadingAloud(false);
        setCurrentReadingVerseIndex(-1);
        if (onAddMinutes) onAddMinutes(5);
        return;
      }

      setCurrentReadingVerseIndex(idx);
      const verse = currentChapter.verses[idx];
      const spokenText = `Verse ${verse.verseNumber}. ${verse.textEn}`;

      devotionalAudio.speakText(
        spokenText,
        "en",
        speechRate,
        () => {
          if (!readingCancelledRef.current) {
            // Small pause between verses for prayerful cadence
            setTimeout(() => {
              if (!readingCancelledRef.current) {
                speakNext(idx + 1);
              }
            }, 600);
          }
        },
        () => {
          setIsReadingAloud(false);
          setCurrentReadingVerseIndex(-1);
        }
      );
    };

    speakNext(startIndex);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAudioReading();
    };
  }, []);

  // Handlers for Chapter Selection
  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setSelectedChapterNum(1);
    setShowBookPicker(false);
  };

  const handleSelectChapter = (chapterNum: number) => {
    setSelectedChapterNum(chapterNum);
    setShowChapterPicker(false);
  };

  const handleNextChapter = () => {
    if (selectedChapterNum < currentBook.totalChapters) {
      setSelectedChapterNum((prev) => prev + 1);
    } else {
      // Advance to next book if available
      const currentIndex = CATHOLIC_BIBLE_BOOKS.findIndex((b) => b.id === currentBook.id);
      if (currentIndex < CATHOLIC_BIBLE_BOOKS.length - 1) {
        setSelectedBookId(CATHOLIC_BIBLE_BOOKS[currentIndex + 1].id);
        setSelectedChapterNum(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapterNum > 1) {
      setSelectedChapterNum((prev) => prev - 1);
    } else {
      // Go to previous book
      const currentIndex = CATHOLIC_BIBLE_BOOKS.findIndex((b) => b.id === currentBook.id);
      if (currentIndex > 0) {
        const prevBook = CATHOLIC_BIBLE_BOOKS[currentIndex - 1];
        setSelectedBookId(prevBook.id);
        setSelectedChapterNum(prevBook.totalChapters);
      }
    }
  };

  // Handlers for eBook Page Navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (selectedChapterNum < currentBook.totalChapters) {
      // Automatically advance to next chapter page 1 if at end
      handleNextChapter();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (selectedChapterNum > 1) {
      // Go to previous chapter
      handlePrevChapter();
    }
  };

  // Bookmarking
  const toggleBookmark = (verseKey: string) => {
    setBookmarkedVerses((prev) => ({
      ...prev,
      [verseKey]: !prev[verseKey]
    }));
  };

  // Copy Verse
  const handleCopyVerse = (verse: BibleVerse, key: string) => {
    const text = `${currentBook.nameEn} ${currentChapter.chapterNumber}:${verse.verseNumber} (Douay-Rheims)\n"${verse.textEn}"`;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Book Categories
  const categories = ["All", "Pentateuch", "Historical", "Wisdom & Psalms", "Prophets", "Gospels", "Epistles", "Revelation"];
  const filteredBooks = useMemo(() => {
    return CATHOLIC_BIBLE_BOOKS.filter((book) => {
      const matchesCat = selectedCategory === "All" || book.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        book.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.nameLa.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Theme Styling Classes
  const getThemeClasses = () => {
    switch (theme) {
      case "night":
        return {
          container: "bg-slate-900 border-slate-800 text-slate-100 shadow-2xl shadow-black/60",
          pageBg: "bg-slate-950/80 border-slate-800",
          verseHover: "hover:bg-slate-900/90",
          activeVerse: "bg-amber-950/50 border-l-4 border-amber-400 text-amber-100",
          secondaryText: "text-slate-400",
          heading: "text-amber-300",
          tag: "bg-slate-800 text-slate-300 border-slate-700",
          controlBtn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
        };
      case "light":
        return {
          container: "bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50",
          pageBg: "bg-slate-50/70 border-slate-200",
          verseHover: "hover:bg-blue-50/50",
          activeVerse: "bg-amber-50 border-l-4 border-amber-500 text-slate-950",
          secondaryText: "text-slate-500",
          heading: "text-slate-900",
          tag: "bg-slate-100 text-slate-700 border-slate-200",
          controlBtn: "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
        };
      case "parchment":
      default:
        return {
          container: "bg-[#FAF7F0] border-[#E8E1D3] text-[#2C2416] shadow-xl shadow-amber-900/5",
          pageBg: "bg-[#FFFDF9] border-[#E8DFC8]",
          verseHover: "hover:bg-[#F4EDE0]",
          activeVerse: "bg-[#F7EDD6] border-l-4 border-[#C89B3C] text-[#2C2416]",
          secondaryText: "text-[#7A6B56]",
          heading: "text-[#4A3720]",
          tag: "bg-[#EFE7D8] text-[#5A4833] border-[#DFD5C2]",
          controlBtn: "bg-[#FFFDF9] hover:bg-[#F2ECE0] text-[#4A3720] border-[#E0D7C5]"
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* 1. TOP HEADER & NAVIGATION BAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Catholic Holy Bible • English Douay-Rheims
              </span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                73-Book Canonical Edition
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-2 flex items-center gap-3">
              <span>{currentBook.nameEn}</span>
              <span className="text-blue-600 font-serif">Chapter {selectedChapterNum}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {currentChapter.titleEn} — {currentChapter.descriptionEn}
            </p>
          </div>

          {/* Book & Chapter Navigation Buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* Book Selector Button */}
            <button
              id="bible-book-selector-btn"
              onClick={() => setShowBookPicker(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-200 shadow-xs transition-all"
            >
              <Book className="w-4 h-4 text-blue-600" />
              <span>{currentBook.nameEn}</span>
              <span className="text-xs text-slate-400">▾</span>
            </button>

            {/* Chapter Selector Button */}
            <button
              id="bible-chapter-selector-btn"
              onClick={() => setShowChapterPicker(true)}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
            >
              <Grid className="w-4 h-4" />
              <span>Chapter {selectedChapterNum} of {currentBook.totalChapters}</span>
              <span className="text-xs text-blue-200">▾</span>
            </button>

            {/* Prev / Next Chapter Buttons */}
            <div className="flex items-center rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <button
                id="bible-prev-chapter-btn"
                onClick={handlePrevChapter}
                disabled={selectedChapterNum === 1 && currentBook.id === CATHOLIC_BIBLE_BOOKS[0].id}
                title="Previous Chapter"
                className="p-2.5 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-6 bg-slate-200" />
              <button
                id="bible-next-chapter-btn"
                onClick={handleNextChapter}
                disabled={selectedChapterNum === currentBook.totalChapters && currentBook.id === CATHOLIC_BIBLE_BOOKS[CATHOLIC_BIBLE_BOOKS.length - 1].id}
                title="Next Chapter"
                className="p-2.5 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. AUDIO "READ TO ME" BAR & CONTROLS */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50/60 p-4 rounded-2xl border border-blue-100/60">
          <div className="flex items-center gap-3">
            {!isReadingAloud ? (
              <button
                id="bible-read-aloud-start-btn"
                onClick={() => startReadingFromIndex(0)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Read Chapter to Me</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="bible-read-aloud-stop-btn"
                  onClick={stopAudioReading}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  <Pause className="w-4 h-4" />
                  <span>Stop Reading</span>
                </button>
                <span className="text-xs font-semibold text-blue-900 bg-blue-100/80 px-2.5 py-1 rounded-lg animate-pulse">
                  Speaking verse {currentReadingVerseIndex >= 0 ? currentChapter.verses[currentReadingVerseIndex]?.verseNumber : ""}...
                </span>
              </div>
            )}

            {/* Speed Control */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold pl-2">
              <span>Pace:</span>
              <select
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value={0.75}>0.75x (Reverent)</option>
                <option value={0.9}>0.9x (Standard)</option>
                <option value={1.0}>1.0x (Normal)</option>
                <option value={1.2}>1.2x (Brisk)</option>
              </select>
            </div>
          </div>

          {/* Reader Preferences Ribbon */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* eBook vs Continuous Scroll Mode Toggle */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
              <button
                id="reader-mode-ebook-btn"
                onClick={() => setReaderMode("ebook")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  readerMode === "ebook"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Book className="w-3.5 h-3.5" />
                <span>Page by Page</span>
              </button>
              <button
                id="reader-mode-scroll-btn"
                onClick={() => setReaderMode("scroll")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  readerMode === "scroll"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Scroll className="w-3.5 h-3.5" />
                <span>Full Chapter</span>
              </button>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
              <button
                onClick={() => setTheme("parchment")}
                title="Classic Parchment"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  theme === "parchment" ? "bg-amber-100 text-amber-900" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                📜
              </button>
              <button
                onClick={() => setTheme("light")}
                title="Pristine Light"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  theme === "light" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("night")}
                title="Night Reading"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  theme === "night" ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs gap-1">
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                title="Decrease Font Size"
                className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded"
              >
                A-
              </button>
              <span className="text-[11px] font-mono font-bold text-slate-500 w-5 text-center">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                title="Increase Font Size"
                className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded"
              >
                A+
              </button>
            </div>

            {/* Font Style Toggle */}
            <button
              onClick={() => setFontStyle((f) => (f === "serif" ? "sans" : "serif"))}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
            >
              <Type className="w-3.5 h-3.5 text-slate-500" />
              <span>{fontStyle === "serif" ? "Classic Serif" : "Modern Sans"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN EBOOK / SCRIPTURE READER CONTAINER */}
      <div
        className={`rounded-3xl p-6 sm:p-10 border transition-all duration-300 relative ${themeClasses.container}`}
      >
        {/* eBook Page Banner in eBook Mode */}
        {readerMode === "ebook" && (
          <div className="flex items-center justify-between border-b pb-4 mb-6 text-xs font-semibold" style={{ borderColor: "currentColor", opacity: 0.25 }}>
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider">
                {currentBook.nameEn} {selectedChapterNum}
              </span>
              <span>•</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{totalVerses} Verses in Chapter</span>
              <span className="text-[11px] opacity-75">(Use ← and → keys to turn pages)</span>
            </div>
          </div>
        )}

        {/* Verses Render */}
        <div
          className={`space-y-6 ${fontStyle === "serif" ? "font-serif" : "font-sans"}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          {paginatedVerses.map((verse, index) => {
            const actualIndex = readerMode === "ebook" ? (currentPage - 1) * versesPerPage + index : index;
            const isCurrentlyRead = isReadingAloud && currentReadingVerseIndex === actualIndex;
            const verseKey = `${currentBook.id}-${selectedChapterNum}-${verse.verseNumber}`;
            const isBookmarked = !!bookmarkedVerses[verseKey];

            return (
              <div
                key={verse.verseNumber}
                id={`verse-${verse.verseNumber}`}
                className={`p-4 rounded-2xl transition-all relative group ${
                  isCurrentlyRead ? themeClasses.activeVerse : themeClasses.verseHover
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Verse Number Pill & Text */}
                    <p className="leading-relaxed">
                      <span
                        className={`inline-block font-mono font-bold text-xs uppercase px-2 py-0.5 rounded-md mr-2.5 align-middle select-none ${themeClasses.tag}`}
                      >
                        v. {verse.verseNumber}
                      </span>
                      <span>{verse.textEn}</span>
                    </p>

                    {/* Theological Notes if present */}
                    {verse.notes && (
                      <div className="mt-2.5 text-xs opacity-75 italic flex items-center gap-1.5 pl-1">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>{verse.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Individual Verse Action Buttons */}
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 pt-0.5">
                    {/* Read Single Verse Aloud */}
                    <button
                      onClick={() => startReadingFromIndex(actualIndex)}
                      title="Read from this verse"
                      className={`p-1.5 rounded-lg border transition-all ${themeClasses.controlBtn}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Bookmark Verse */}
                    <button
                      onClick={() => toggleBookmark(verseKey)}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Verse"}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isBookmarked
                          ? "bg-amber-500 text-white border-amber-600"
                          : themeClasses.controlBtn
                      }`}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>

                    {/* Copy Verse */}
                    <button
                      onClick={() => handleCopyVerse(verse, verseKey)}
                      title="Copy verse"
                      className={`p-1.5 rounded-lg border transition-all ${themeClasses.controlBtn}`}
                    >
                      {copiedKey === verseKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. EBOOK PAGE-TURNING CONTROLS (BOTTOM OF READER) */}
        {readerMode === "ebook" ? (
          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "currentColor", opacity: 0.9 }}>
            <button
              id="ebook-prev-page-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1 && selectedChapterNum === 1}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 border transition-all disabled:opacity-30 cursor-pointer ${themeClasses.controlBtn}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Page Slider / Indicator */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold opacity-75">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-600 scale-125"
                        : "bg-slate-300 hover:bg-slate-400 opacity-60"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              id="ebook-next-page-btn"
              onClick={handleNextPage}
              className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>{currentPage === totalPages ? "Next Chapter" : "Next Page"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="mt-8 pt-6 border-t flex items-center justify-between" style={{ borderColor: "currentColor", opacity: 0.25 }}>
            <button
              onClick={handlePrevChapter}
              disabled={selectedChapterNum === 1}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all disabled:opacity-30 ${themeClasses.controlBtn}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>
            <button
              onClick={handleNextChapter}
              disabled={selectedChapterNum === currentBook.totalChapters}
              className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-blue-600 text-white shadow-md"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ===================== MODAL: CHAPTER PICKER ===================== */}
      {showChapterPicker && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                  Select Chapter
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {currentBook.nameEn} ({currentBook.totalChapters} Chapters)
                </h3>
              </div>
              <button
                onClick={() => setShowChapterPicker(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick jump to chapter input */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Jump to Chapter:</span>
              <input
                type="number"
                min={1}
                max={currentBook.totalChapters}
                value={selectedChapterNum}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (val >= 1 && val <= currentBook.totalChapters) {
                    setSelectedChapterNum(val);
                  }
                }}
                className="w-20 px-3 py-1.5 border border-slate-200 rounded-xl text-sm font-bold text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Grid of all chapters */}
            <div className="max-h-72 overflow-y-auto pr-1 grid grid-cols-5 sm:grid-cols-8 gap-2">
              {Array.from({ length: currentBook.totalChapters }).map((_, i) => {
                const chapNum = i + 1;
                const isSelected = chapNum === selectedChapterNum;
                return (
                  <button
                    key={chapNum}
                    onClick={() => handleSelectChapter(chapNum)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                        : "bg-slate-50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-slate-800 border-slate-200"
                    }`}
                  >
                    {chapNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: BOOK PICKER (73 BOOKS) ===================== */}
      {showBookPicker && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                  Catholic Canon
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Select a Book (73 Books)
                </h3>
              </div>
              <button
                onClick={() => setShowBookPicker(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search books (e.g., Genesis, Matthew, Tobit, Wisdom)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap border transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List of Books */}
            <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredBooks.map((book) => {
                const isSelected = book.id === selectedBookId;
                return (
                  <button
                    key={book.id}
                    onClick={() => handleSelectBook(book.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50 border-blue-400 text-blue-950 ring-2 ring-blue-400/20"
                        : "bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{book.nameEn}</span>
                        {book.deuterocanonical && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                            Deut
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 italic mt-0.5">
                        {book.nameLa} • {book.totalChapters} ch
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
