import { PennyQuestion, PennySection } from "./types";
import { PENNY_SECTION_1 } from "./section1_faith";
import { PENNY_SECTION_2 } from "./section2_prayer";
import { PENNY_SECTION_3 } from "./section3_commandments";
import { PENNY_SECTION_4 } from "./section4_sacraments";
import { PENNY_SECTION_5 } from "./section5_virtues";

export * from "./types";

export const PENNY_SECTIONS: PennySection[] = [
  {
    id: 1,
    title: "Faith & The Apostles' Creed",
    range: "Questions 1–139",
    description: "On God, the Trinity, Creation, the Fall of Man, the Incarnation, Redemption, the Holy Ghost, the Catholic Church, Grace, and the Creed.",
    startNum: 1,
    endNum: 139,
    chapters: [
      "All Chapters",
      "On God and His Perfections",
      "Creation & The Angels",
      "The Fall of Man",
      "The Incarnation & Redemption",
      "The Holy Ghost & The Church",
      "Sins & Grace"
    ]
  },
  {
    id: 2,
    title: "Hope & Prayer",
    range: "Questions 140–169",
    description: "On the theological virtue of Hope, prayer in Christian life, the Lord's Prayer (Our Father), and the Hail Mary.",
    startNum: 140,
    endNum: 169,
    chapters: [
      "All Chapters",
      "The Virtue of Hope",
      "On Prayer",
      "The Lord's Prayer",
      "The Hail Mary"
    ]
  },
  {
    id: 3,
    title: "The Commandments of God & The Church",
    range: "Questions 170–248",
    description: "The two great Precepts of Charity, the Ten Commandments of God given on Mount Sinai, and the Precepts of the Holy Church.",
    startNum: 170,
    endNum: 248,
    chapters: [
      "All Chapters",
      "The Precepts of Charity",
      "The Ten Commandments",
      "First Commandment",
      "Second Commandment",
      "Third Commandment",
      "Fourth Commandment",
      "Fifth Commandment",
      "Sixth & Ninth Commandments",
      "Seventh & Tenth Commandments",
      "Eighth Commandment",
      "Precepts of the Church"
    ]
  },
  {
    id: 4,
    title: "The Seven Sacraments & The Holy Mass",
    range: "Questions 249–321",
    description: "Sacraments in general, Baptism, Confirmation, the Holy Eucharist and the Holy Sacrifice of the Mass, Penance, Extreme Unction, Holy Orders, and Matrimony.",
    startNum: 249,
    endNum: 321,
    chapters: [
      "All Chapters",
      "The Sacraments in General",
      "Baptism",
      "Confirmation",
      "The Holy Eucharist",
      "Penance",
      "Extreme Unction",
      "Holy Orders",
      "Matrimony"
    ]
  },
  {
    id: 5,
    title: "Virtues, Vices, Works of Mercy & Last Things",
    range: "Questions 322–370",
    description: "Theological and Cardinal Virtues, Gifts and Fruits of the Holy Ghost, the Eight Beatitudes, Capital Sins, Corporal and Spiritual Works of Mercy, and the Four Last Things.",
    startNum: 322,
    endNum: 370,
    chapters: [
      "All Chapters",
      "Theological & Cardinal Virtues",
      "Gifts & Fruits of the Holy Ghost",
      "The Eight Beatitudes",
      "The Capital Sins",
      "Works of Mercy",
      "The Four Last Things"
    ]
  }
];

export const ALL_PENNY_QUESTIONS: PennyQuestion[] = [
  ...PENNY_SECTION_1,
  ...PENNY_SECTION_2,
  ...PENNY_SECTION_3,
  ...PENNY_SECTION_4,
  ...PENNY_SECTION_5
];

export interface PennyQuizQuestion {
  sourceQuestion: PennyQuestion;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/**
 * Generates an authentic multiple-choice test for any array of Penny Catechism questions.
 * Uses realistic distractor answers drawn from the same section or category.
 */
export function generatePennyMultipleChoiceQuiz(
  questionPool: PennyQuestion[],
  count: number = 10
): PennyQuizQuestion[] {
  if (questionPool.length === 0) return [];

  // Shuffle pool to pick questions
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((item) => {
    // Collect potential distractors from the same section, falling back to all questions
    const sameSectionAnswers = questionPool
      .filter((q) => q.number !== item.number && q.answer !== item.answer)
      .map((q) => q.answer);

    const fallbackAnswers = ALL_PENNY_QUESTIONS
      .filter((q) => q.number !== item.number && q.answer !== item.answer)
      .map((q) => q.answer);

    const pool = sameSectionAnswers.length >= 3 ? sameSectionAnswers : fallbackAnswers;
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const chosenDistractors = shuffledPool.slice(0, 3);

    // Combine and shuffle options
    const allOptions = [item.answer, ...chosenDistractors].sort(() => Math.random() - 0.5);
    const correctIndex = allOptions.indexOf(item.answer);

    return {
      sourceQuestion: item,
      questionText: `Q. ${item.number}: ${item.question}`,
      options: allOptions,
      correctIndex,
      explanation: `Penny Catechism Q. ${item.number} (${item.chapter}): "${item.answer}"${item.scriptureRef ? ` (Ref: ${item.scriptureRef})` : ""}`
    };
  });
}
