import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  X,
  BookOpen,
  Book,
  Heart,
  Languages,
  Calendar,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
  GraduationCap
} from "lucide-react";
import { NavTabType } from "./Header";
import { PENNY_CATECHISM_ITEMS } from "../data/pennyCatechismData";
import { CATHOLIC_BIBLE_BOOKS } from "../data/bibleData";
import { DAILY_PRAYER_SESSIONS, PrayerEntry } from "../data/prayerGuideData";
import { LATIN_PARALLEL_PRAYERS } from "../data/latinParallelData";
import { CURRICULUM_DAYS } from "../data/curriculumData";
import { useLanguage } from "../i18n/LanguageContext";

export interface SearchResultItem {
  id: string;
  category: "catechism" | "bible" | "prayer" | "latin" | "curriculum";
  targetTab: NavTabType;
  title: string;
  subtitle: string;
  snippet: string;
  payload?: any;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tab: NavTabType, payload?: any) => void;
}

type FilterCategory = "all" | "catechism" | "bible" | "prayer" | "latin";

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Index and compute matching results
  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const items: SearchResultItem[] = [];

    // 1. Penny Catechism
    if (filter === "all" || filter === "catechism") {
      for (const item of PENNY_CATECHISM_ITEMS) {
        const qText = language === "de" ? item.questionDe : item.questionEn;
        const aText = language === "de" ? item.answerDe : item.answerEn;
        const matchQ = qText.toLowerCase().includes(q);
        const matchA = aText.toLowerCase().includes(q);
        const matchNum = String(item.number) === q;

        if (matchQ || matchA || matchNum) {
          items.push({
            id: `penny-${item.number}`,
            category: "catechism",
            targetTab: "penny",
            title: `Q. ${item.number}: ${qText}`,
            subtitle: `${item.section} • ${item.subSection}`,
            snippet: aText,
            payload: { questionNumber: item.number },
          });
          if (items.length > 40) break;
        }
      }
    }

    // 2. Catholic Bible Books & Verses
    if (filter === "all" || filter === "bible") {
      for (const book of CATHOLIC_BIBLE_BOOKS) {
        if (
          book.nameEn.toLowerCase().includes(q) ||
          book.nameLa.toLowerCase().includes(q)
        ) {
          items.push({
            id: `bible-book-${book.id}`,
            category: "bible",
            targetTab: "bible",
            title: `${book.nameEn} (${book.nameLa})`,
            subtitle: `${book.testament} Testament • ${book.category} (${book.totalChapters} Chapters)`,
            snippet: `Full Catholic Scripture book. Select to read in Douay-Rheims & Latin Vulgate.`,
            payload: { bookId: book.id, chapter: 1 },
          });
        }

        // Search verses in sample chapters
        for (const ch of book.chapters) {
          for (const v of ch.verses) {
            const vEn = v.textEn.toLowerCase();
            const vLa = (v.textLa || "").toLowerCase();
            if (vEn.includes(q) || vLa.includes(q)) {
              items.push({
                id: `bible-${book.id}-${ch.chapterNumber}-${v.verseNumber}`,
                category: "bible",
                targetTab: "bible",
                title: `${book.nameEn} ${ch.chapterNumber}:${v.verseNumber}`,
                subtitle: ch.titleEn,
                snippet: v.textEn,
                payload: { bookId: book.id, chapter: ch.chapterNumber },
              });
              if (items.length > 50) break;
            }
          }
        }
      }
    }

    // 3. Daily Prayers
    if (filter === "all" || filter === "prayer") {
      const allPrayers: PrayerEntry[] = [];
      DAILY_PRAYER_SESSIONS.forEach((session) => {
        allPrayers.push(...session.prayers);
      });

      for (const prayer of allPrayers) {
        const titleMatch = prayer.title.toLowerCase().includes(q);
        const latinMatch = (prayer.latinTitle || "").toLowerCase().includes(q);
        const textMatch = prayer.text.toLowerCase().includes(q);

        if (titleMatch || latinMatch || textMatch) {
          items.push({
            id: `prayer-${prayer.id}`,
            category: "prayer",
            targetTab: "prayers",
            title: prayer.title,
            subtitle: prayer.latinTitle ? `Latin: ${prayer.latinTitle}` : prayer.purpose,
            snippet: prayer.text.slice(0, 140) + "...",
            payload: { prayerId: prayer.id },
          });
        }
      }
    }

    // 4. Latin Parallel Liturgical Texts
    if (filter === "all" || filter === "latin") {
      for (const p of LATIN_PARALLEL_PRAYERS) {
        const titleMatch = p.title.toLowerCase().includes(q);
        const latinTitleMatch = p.latinTitle.toLowerCase().includes(q);
        let verseMatch = false;
        let matchedSnippet = "";

        for (const v of p.verses) {
          if (v.latin.toLowerCase().includes(q) || v.english.toLowerCase().includes(q)) {
            verseMatch = true;
            matchedSnippet = `${v.latin} — ${v.english}`;
            break;
          }
        }

        if (titleMatch || latinTitleMatch || verseMatch) {
          items.push({
            id: `latin-${p.id}`,
            category: "latin",
            targetTab: "latin",
            title: `${p.latinTitle} (${p.title})`,
            subtitle: p.category,
            snippet: matchedSnippet || p.rubrics || "Parallel Latin & English prayer with literal vocabulary breakdown.",
            payload: { prayerId: p.id },
          });
        }
      }
    }

    // 5. Curriculum Days
    if (filter === "all") {
      for (const day of CURRICULUM_DAYS) {
        if (
          day.title.toLowerCase().includes(q) ||
          day.summary.toLowerCase().includes(q) ||
          day.subtitle.toLowerCase().includes(q)
        ) {
          items.push({
            id: `curriculum-day-${day.day}`,
            category: "curriculum",
            targetTab: "curriculum",
            title: `Curriculum Day ${day.day}: ${day.title}`,
            subtitle: day.subtitle,
            snippet: day.summary,
            payload: { dayNumber: day.day },
          });
        }
      }
    }

    return items.slice(0, 30);
  }, [query, filter, language]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, filter]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    onSelectResult(item.targetTab, item.payload);
    onClose();
  };

  if (!isOpen) return null;

  const getCategoryBadge = (category: SearchResultItem["category"]) => {
    switch (category) {
      case "catechism":
        return { label: "Catechism", icon: Book, color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "bible":
        return { label: "Holy Scripture", icon: BookOpen, color: "bg-amber-50 text-amber-800 border-amber-200" };
      case "prayer":
        return { label: "Daily Prayer", icon: Heart, color: "bg-rose-50 text-rose-700 border-rose-200" };
      case "latin":
        return { label: "Latin Liturgy", icon: Languages, color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "curriculum":
        return { label: "Curriculum", icon: GraduationCap, color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-900/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 370 Catechism Q&As, Bible verses, Prayers, Latin texts..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
            ESC
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 overflow-x-auto text-xs font-semibold">
          <span className="text-[11px] text-slate-400 mr-1 shrink-0">Filter:</span>
          {(
            [
              { id: "all", label: "All Items" },
              { id: "catechism", label: "Catechism Q&A" },
              { id: "bible", label: "Catholic Bible" },
              { id: "prayer", label: "Prayers" },
              { id: "latin", label: "Latin Liturgy" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1 rounded-xl transition-all shrink-0 ${
                filter === tab.id
                  ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-2"
        >
          {query.trim().length < 2 ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800/50">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Universal Catholic Library Search
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Type a topic, doctrine, verse, or Latin prayer name (e.g. <em>Eucharist</em>, <em>Genesis 1</em>, <em>Pater Noster</em>, <em>Ten Commandments</em>).
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-slate-400">
                Try searching for related words or select "All Items" in the filter tab.
              </p>
            </div>
          ) : (
            results.map((item, index) => {
              const badge = getCategoryBadge(item.category);
              const IconComp = badge.icon;
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-amber-500/10 dark:bg-amber-500/20 border border-amber-400/40"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border flex items-center gap-1 ${badge.color}`}
                      >
                        <IconComp className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {item.subtitle}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 text-slate-400 group-hover:text-amber-500">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
                        Jump <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Use <strong className="font-semibold text-slate-600 dark:text-slate-300">↑ ↓</strong> to navigate
            </span>
            <span>
              <strong className="font-semibold text-slate-600 dark:text-slate-300">ENTER</strong> to open
            </span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
