import { Question } from "../types";
import { MASTER_QUESTION_BANK, CURRICULUM_DAYS } from "../data/curriculumData";
import { ALL_PENNY_QUESTIONS, PennyQuestion } from "../data/penny";
import { ROSARY_MYSTERY_SETS, ROSARY_INSTRUCTION_STEPS } from "../data/rosaryGuideData";

export type TestContentCategory =
  | "all_content"
  | "curriculum_daily"
  | "penny_all"
  | "penny_section_1"
  | "penny_section_2"
  | "penny_section_3"
  | "penny_section_4"
  | "penny_section_5"
  | "rosary_mysteries"
  | "holy_mass_liturgy"
  | "seven_sacraments"
  | "ten_commandments"
  | "sacred_scripture"
  | "confession_morality";

export interface ContentCategoryMeta {
  id: TestContentCategory;
  name: string;
  description: string;
  badge: string;
  totalPoolEstimate: number;
}

export const TEST_CONTENT_CATEGORIES: ContentCategoryMeta[] = [
  {
    id: "all_content",
    name: "All-Content Comprehensive Grand Exam",
    description: "Multi-discipline 1-to-4 test spanning Catechism, Rosary, Scripture, Holy Mass, Sacraments, and Commandments.",
    badge: "Full Syllabus",
    totalPoolEstimate: 500,
  },
  {
    id: "curriculum_daily",
    name: "Daily Program Curriculum (Days 1–14)",
    description: "Tests aligned directly with your 14-day formation cycle lessons.",
    badge: "14 Days",
    totalPoolEstimate: 120,
  },
  {
    id: "penny_all",
    name: "The Complete Penny Catechism (All 370 Qs)",
    description: "Every single doctrine and answer from the 370 questions in the Penny Catechism.",
    badge: "Q. 1–370",
    totalPoolEstimate: 370,
  },
  {
    id: "penny_section_1",
    name: "Penny Catechism: Faith & The Creed (Q. 1–139)",
    description: "On God, the Trinity, Creation, Fall, Incarnation, Church, Grace, and the 12 Articles of the Creed.",
    badge: "Section 1",
    totalPoolEstimate: 139,
  },
  {
    id: "penny_section_2",
    name: "Penny Catechism: Hope & Prayer (Q. 140–169)",
    description: "On the theological virtue of Hope, daily prayer, Our Father, and Hail Mary.",
    badge: "Section 2",
    totalPoolEstimate: 30,
  },
  {
    id: "penny_section_3",
    name: "Penny Catechism: Commandments & Precepts (Q. 170–248)",
    description: "The 10 Commandments of God on Mount Sinai and the 6 Precepts of the Holy Church.",
    badge: "Section 3",
    totalPoolEstimate: 79,
  },
  {
    id: "penny_section_4",
    name: "Penny Catechism: Sacraments & The Mass (Q. 249–321)",
    description: "The Seven Sacraments and the Holy Sacrifice of the Mass.",
    badge: "Section 4",
    totalPoolEstimate: 73,
  },
  {
    id: "penny_section_5",
    name: "Penny Catechism: Virtues, Sins & Last Things (Q. 322–370)",
    description: "Theological & Cardinal Virtues, Gifts of the Holy Ghost, 8 Beatitudes, 7 Capital Sins, Works of Mercy, and 4 Last Things.",
    badge: "Section 5",
    totalPoolEstimate: 49,
  },
  {
    id: "rosary_mysteries",
    name: "The Holy Rosary & 20 Mysteries",
    description: "Joyful, Luminous, Sorrowful, Glorious Mysteries, fruits of contemplation, and prayers of the Rosary.",
    badge: "20 Mysteries",
    totalPoolEstimate: 40,
  },
  {
    id: "holy_mass_liturgy",
    name: "The Holy Mass & Sacred Liturgy",
    description: "Order of the Mass, Liturgy of the Word, Eucharistic Canon, Consecration, vestments, and liturgical seasons.",
    badge: "Liturgy",
    totalPoolEstimate: 35,
  },
  {
    id: "seven_sacraments",
    name: "The Seven Sacraments & Divine Grace",
    description: "Matter, Form, Minister, and sacramental graces of Baptism, Confirmation, Holy Eucharist, Penance, Anointing, Orders, and Matrimony.",
    badge: "7 Sacraments",
    totalPoolEstimate: 35,
  },
  {
    id: "ten_commandments",
    name: "The Ten Commandments & Moral Law",
    description: "The Two Great Commandments, Commandments 1 through 10, and their specific moral prohibitions and precepts.",
    badge: "Decalogue",
    totalPoolEstimate: 35,
  },
  {
    id: "sacred_scripture",
    name: "Sacred Scripture & The Holy Gospels",
    description: "Key passages, Old Testament prophecies, Gospel narratives of Christ, and Epistles.",
    badge: "Scripture",
    totalPoolEstimate: 35,
  },
  {
    id: "confession_morality",
    name: "Confession & Examination of Conscience",
    description: "Conditions for mortal sin, contrition, confession, satisfaction, and the Sacrament of Penance.",
    badge: "Confession",
    totalPoolEstimate: 30,
  },
];

// Helper to convert a PennyQuestion into a 1-to-4 Question object
export function convertPennyToQuestion(
  penny: PennyQuestion,
  pool: PennyQuestion[]
): Question {
  // Collect 3 distractors from the pool
  const distractors = pool
    .filter((q) => q.number !== penny.number && q.answer !== penny.answer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((q) => q.answer);

  // If not enough distractors in pool, fallback to standard doctrinal statements
  const fallbackDistractors = [
    "It is a supernatural gift of God which enlightens our minds and moves our wills.",
    "Through the merits of Jesus Christ and the operation of the Holy Ghost.",
    "By observing all the commandments of God and of the Holy Church.",
  ];
  while (distractors.length < 3) {
    distractors.push(fallbackDistractors[distractors.length] || "None of the above.");
  }

  // Shuffle options and find 1-based index (1, 2, 3, or 4)
  const optionsRaw = [penny.answer, ...distractors].sort(() => Math.random() - 0.5);
  const correctIndex = (optionsRaw.indexOf(penny.answer) + 1) as 1 | 2 | 3 | 4;

  return {
    id: `penny-q-${penny.number}`,
    category: "doctrine",
    categoryLabel: `Penny Catechism Q. ${penny.number}`,
    question: `Q. ${penny.number}: ${penny.question}`,
    options: [optionsRaw[0], optionsRaw[1], optionsRaw[2], optionsRaw[3]],
    correctAnswer: correctIndex,
    explanation: `Penny Catechism Q. ${penny.number} (${penny.chapter}): "${penny.answer}"${penny.scriptureRef ? ` (Ref: ${penny.scriptureRef})` : ""}`,
    memoryTip: penny.scriptureRef ? `Scripture: ${penny.scriptureRef}` : `Chapter: ${penny.chapter}`,
  };
}

// Specialized 1-to-4 Questions for Rosary, Mass, Sacraments, Commandments, Scripture, Confession
const ROSARY_SPECIALIZED_QUESTIONS: Question[] = [
  {
    id: "ros-1",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    question: "What is the spiritual fruit associated with the First Joyful Mystery (The Annunciation)?",
    options: [
      "Humility",
      "Love of Neighbor",
      "Poverty of Spirit",
      "Purity of Mind and Body"
    ],
    correctAnswer: 1,
    explanation: "The traditional fruit of the Annunciation is Humility, imitating Our Lady's humble response: 'Ecce ancilla Domini' (Luke 1:38).",
    memoryTip: "Mary's total surrender to God's will is the supreme model of holy humility."
  },
  {
    id: "ros-2",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    question: "Which of the following is the Third Luminous Mystery instituted by Pope St. John Paul II?",
    options: [
      "The Proclamation of the Kingdom of God and the Call to Conversion",
      "The Baptism of the Lord in the Jordan River",
      "The Wedding Feast at Cana",
      "The Transfiguration of Our Lord on Mount Tabor"
    ],
    correctAnswer: 1,
    explanation: "The 3rd Luminous Mystery is the Proclamation of the Kingdom with the call to conversion (Mark 1:15).",
    memoryTip: "Sequence: 1. Baptism, 2. Cana, 3. Proclamation of Kingdom, 4. Transfiguration, 5. Institution of Eucharist."
  },
  {
    id: "ros-3",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    question: "What prayer did Our Lady of Fatima request to be recited after each decade of the Rosary?",
    options: [
      "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy.",
      "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope.",
      "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection was left unaided.",
      "Saint Michael the Archangel, defend us in battle, be our protection against the malice and snares of the devil."
    ],
    correctAnswer: 1,
    explanation: "In July 1917, Our Lady taught the children at Fatima this prayer for the salvation of souls.",
    memoryTip: "Begins with 'O my Jesus, forgive us our sins...'"
  },
  {
    id: "ros-4",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    question: "On which traditional days of the week are the Sorrowful Mysteries prayed?",
    options: [
      "Tuesdays and Fridays",
      "Mondays and Saturdays",
      "Wednesdays and Sundays",
      "Thursdays and Sundays"
    ],
    correctAnswer: 1,
    explanation: "The Sorrowful Mysteries are traditionally prayed on Tuesdays and Fridays (commemorating the Passion on Good Friday).",
    memoryTip: "Joyful: Mon/Sat; Sorrowful: Tue/Fri; Glorious: Wed/Sun; Luminous: Thu."
  },
  {
    id: "ros-5",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    question: "What is the spiritual fruit of the First Glorious Mystery (The Resurrection)?",
    options: [
      "Faith in Christ and the Truth of Divine Revelation",
      "Hope and Desire for Heaven",
      "Zeal for the Glory of God",
      "The Grace of a Happy Death"
    ],
    correctAnswer: 1,
    explanation: "The fruit of the Resurrection is Faith (1 Cor 15:14: 'If Christ be not risen again, then is our preaching vain, and your faith is also vain').",
    memoryTip: "Christ conquering death confirms our supernatural Faith."
  },
  {
    id: "ros-6",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    question: "What are the three small beads on the initial pendant of the Rosary traditionally prayed for?",
    options: [
      "An increase in the theological virtues of Faith, Hope, and Charity",
      "The souls in Purgatory, the sick, and the dying",
      "The Pope, the local Bishop, and all clergy",
      "Contrition, confession, and satisfaction for sins"
    ],
    correctAnswer: 1,
    explanation: "The three opening Hail Marys are devoutly offered for an increase in Faith, Hope, and Charity (1 Cor 13:13).",
    memoryTip: "The 3 Theological Virtues: Faith, Hope, and Charity."
  }
];

const MASS_LITURGY_QUESTIONS: Question[] = [
  {
    id: "mass-1",
    category: "mass",
    categoryLabel: "The Holy Mass",
    question: "What is the Catholic dogma regarding what occurs at the Consecration in the Holy Mass?",
    options: [
      "Transubstantiation: The entire substance of bread and wine becomes the Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Consubstantiation: Christ's presence joins alongside the continuing substance of the bread and wine.",
      "Symbolic memorial: The bread and wine remain unchanged but represent Christ's historical Last Supper.",
      "Spiritual illumination: The elements become blessed reminders without changing in substance."
    ],
    correctAnswer: 1,
    explanation: "The Council of Trent defined Transubstantiation: the whole substance of the bread becomes the Body, and the whole substance of the wine becomes the Blood of Christ.",
    memoryTip: "Substance changes; species (accidents/appearances) remain."
  },
  {
    id: "mass-2",
    category: "mass",
    categoryLabel: "The Holy Mass",
    question: "What liturgical vestment symbolizes the sweet yoke of Jesus Christ and is worn around the neck and crossed over the chest?",
    options: [
      "The Stole",
      "The Alb",
      "The Cincture",
      "The Maniple"
    ],
    correctAnswer: 1,
    explanation: "The priest kisses the stole before vesting, praying that he may worthily serve Christ whose yoke is sweet (Matt 11:30).",
    memoryTip: "The Stole is the badge of priestly authority and Christ's yoke."
  },
  {
    id: "mass-3",
    category: "mass",
    categoryLabel: "The Holy Mass",
    question: "What liturgical color is prescribed for the seasons of Advent and Lent to signify penance and preparation?",
    options: [
      "Violet (Purple)",
      "Green",
      "Red",
      "Rose"
    ],
    correctAnswer: 1,
    explanation: "Violet symbolizes penance, mortification, and sorrowful preparation during Advent and Lent.",
    memoryTip: "Violet = Penance; White/Gold = Joy; Red = Blood/Holy Spirit; Green = Hope/Life."
  },
  {
    id: "mass-4",
    category: "mass",
    categoryLabel: "The Holy Mass",
    question: "What are the two principal parts of the Holy Sacrifice of the Mass?",
    options: [
      "The Liturgy of the Word and the Liturgy of the Eucharist",
      "The Confiteor and the Concluding Blessing",
      "The Singing of Hymns and the Sermon",
      "The Offertory and the Ablutions"
    ],
    correctAnswer: 1,
    explanation: "The Mass consists of two complementary halves forming one single act of worship: The Liturgy of the Word and the Liturgy of the Eucharist.",
    memoryTip: "Word (instruction from Scripture) and Eucharist (Sacrifice and Banquet)."
  },
  {
    id: "mass-5",
    category: "mass",
    categoryLabel: "The Holy Mass",
    question: "What ancient Greek invocation meaning 'Lord, have mercy' is retained in the Order of the Mass?",
    options: [
      "Kyrie eleison; Christe eleison",
      "Gloria in excelsis Deo",
      "Sanctus, Sanctus, Sanctus",
      "Agnus Dei, qui tollis peccata mundi"
    ],
    correctAnswer: 1,
    explanation: "The Kyrie eleison ('Lord have mercy') is an ancient Greek litany retained within the Western Latin Rite.",
    memoryTip: "Kyrie = Lord, Eleison = have mercy."
  }
];

const SACRAMENTS_QUESTIONS: Question[] = [
  {
    id: "sac-1",
    category: "sacraments",
    categoryLabel: "The Seven Sacraments",
    question: "What is the essential matter and form of the Sacrament of Baptism?",
    options: [
      "Immersion or pouring of true natural water while saying: 'I baptize thee in the name of the Father, and of the Son, and of the Holy Ghost.'",
      "Anointing with chrism while placing hands upon the head and invoking the Holy Spirit.",
      "Offering unleavened bread and saying the words of the Last Supper.",
      "Confession of sins with true sorrow and recitation of an Act of Contrition."
    ],
    correctAnswer: 1,
    explanation: "Matter: Natural water poured upon the head. Form: 'I baptize thee in the name of the Father, and of the Son, and of the Holy Ghost.'",
    memoryTip: "Water + Trinitarian formula (Matt 28:19)."
  },
  {
    id: "sac-2",
    category: "sacraments",
    categoryLabel: "The Seven Sacraments",
    question: "Which of the Seven Sacraments imprint an indelible spiritual character and can never be repeated?",
    options: [
      "Baptism, Confirmation, and Holy Orders",
      "Holy Eucharist and Penance",
      "Matrimony and Extreme Unction",
      "Confirmation, Penance, and Anointing of the Sick"
    ],
    correctAnswer: 1,
    explanation: "Only Baptism, Confirmation, and Holy Orders imprint an indelible mark (seal) upon the soul that remains for all eternity.",
    memoryTip: "B-C-O: Baptism, Confirmation, Orders (imprinted once forever)."
  },
  {
    id: "sac-3",
    category: "sacraments",
    categoryLabel: "The Seven Sacraments",
    question: "Who are the ministers of the Sacrament of Holy Matrimony in the Latin Catholic Church?",
    options: [
      "The bridegroom and the bride conferring consent upon each other in the presence of an authorized priest and witnesses.",
      "The bishop alone by apostolic delegation.",
      "The officiating priest who pronounces the marriage into existence.",
      "The parents and godparents of the bridal couple."
    ],
    correctAnswer: 1,
    explanation: "In the Latin Rite, the baptized spouses themselves are the ministers of the sacrament through their mutual, irrevocable consent.",
    memoryTip: "The couple ministers the sacrament to one another before the Church's witness."
  }
];

const COMMANDMENTS_QUESTIONS: Question[] = [
  {
    id: "cmd-1",
    category: "commandments",
    categoryLabel: "The Ten Commandments",
    question: "What are the two Great Precepts of Charity on which all the Law and the Prophets hang?",
    options: [
      "Thou shalt love the Lord thy God with thy whole heart; and thou shalt love thy neighbor as thyself.",
      "Thou shalt not kill; and thou shalt not steal.",
      "Keep holy the Sabbath; and honor thy father and mother.",
      "Fast during Lent; and confess thy sins at least once a year."
    ],
    correctAnswer: 1,
    explanation: "Our Lord revealed in Matthew 22:37-40 that loving God above all things and loving one's neighbor as oneself fulfills the entire Law.",
    memoryTip: "Love of God (Table 1) + Love of Neighbor (Table 2)."
  },
  {
    id: "cmd-2",
    category: "commandments",
    categoryLabel: "The Ten Commandments",
    question: "What sins are specifically forbidden by the First Commandment ('I am the Lord thy God, thou shalt not have strange gods before Me')?",
    options: [
      "Idolatry, superstition, sacrilege, heresy, apostasy, and spiritism/divination.",
      "Blasphemy, cursing, profane swearing, and perjury.",
      "Missing Mass on Sundays and Holy Days of Obligation.",
      "Murder, abortion, suicide, hatred, and unjust anger."
    ],
    correctAnswer: 1,
    explanation: "The 1st Commandment forbids all sins against the virtue of Religion and faith in the one true God.",
    memoryTip: "Strange gods = idolatry, superstition, heresy, and occultism."
  },
  {
    id: "cmd-3",
    category: "commandments",
    categoryLabel: "The Ten Commandments",
    question: "Which commandment commands us to honor and obey our lawful parents, superiors, and legitimate civil authority?",
    options: [
      "The Fourth Commandment: 'Honor thy father and thy mother.'",
      "The First Commandment: 'Thou shalt not have strange gods before Me.'",
      "The Fifth Commandment: 'Thou shalt not kill.'",
      "The Seventh Commandment: 'Thou shalt not steal.'"
    ],
    correctAnswer: 1,
    explanation: "The Fourth Commandment is the first commandment with a promise, enjoining duties toward parents and lawful superiors.",
    memoryTip: "4th Commandment = Honor parents, teachers, and legitimate superiors."
  }
];

const SCRIPTURE_QUESTIONS: Question[] = [
  {
    id: "scr-1",
    category: "scripture",
    categoryLabel: "Sacred Scripture",
    question: "In which chapter of the Holy Gospel according to Saint Matthew does Christ deliver the Beatitudes?",
    options: [
      "Matthew Chapter 5 (The Sermon on the Mount)",
      "Matthew Chapter 1",
      "Matthew Chapter 16",
      "Matthew Chapter 28"
    ],
    correctAnswer: 1,
    explanation: "Matthew 5:1-12 contains the Eight Beatitudes, opening the great Sermon on the Mount.",
    memoryTip: "Matthew 5 = The Beatitudes."
  },
  {
    id: "scr-2",
    category: "scripture",
    categoryLabel: "Sacred Scripture",
    question: "In John Chapter 6 (The Bread of Life Discourse), what did Jesus declare regarding His flesh?",
    options: [
      "'My flesh is meat indeed, and my blood is drink indeed. He that eateth my flesh and drinketh my blood abideth in me, and I in him.'",
      "'The flesh profiteth nothing; these are mere symbolic parables for your remembrance.'",
      "'Moses gave you bread from heaven, and no further bread shall ever be given.'",
      "'Man shall not live by bread alone, but by every stone made into bread.'"
    ],
    correctAnswer: 1,
    explanation: "In John 6:55-56, Christ explicitly taught the literal reality of the Holy Eucharist.",
    memoryTip: "John 6:55: 'My flesh is meat indeed, and my blood is drink indeed.'"
  },
  {
    id: "scr-3",
    category: "scripture",
    categoryLabel: "Sacred Scripture",
    question: "What words were spoken by the Archangel Gabriel to the Blessed Virgin Mary at the Annunciation (Luke 1:28)?",
    options: [
      "'Hail, full of grace, the Lord is with thee: blessed art thou among women.'",
      "'Blessed art thou that hast believed, because those things shall be accomplished.'",
      "'My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour.'",
      "'Behold the handmaid of the Lord: be it done to me according to thy word.'"
    ],
    correctAnswer: 1,
    explanation: "The Archangel Gabriel proclaimed the angelic salutation: 'Ave gratia plena, Dominus tecum' (Luke 1:28).",
    memoryTip: "Angel Gabriel's greeting forms the opening of the Hail Mary."
  }
];

const CONFESSION_QUESTIONS: Question[] = [
  {
    id: "conf-1",
    category: "doctrine",
    categoryLabel: "Confession & Morality",
    question: "What three conditions must be present simultaneously for a sin to be mortal?",
    options: [
      "Grave matter, full knowledge of its sinful malice, and deliberate consent of the will.",
      "Bad intention, verbal admission, and causing public scandal.",
      "Committing an act three times without going to Mass on Sunday.",
      "A sinful thought accompanied by an emotion of anger."
    ],
    correctAnswer: 1,
    explanation: "Mortal sin requires: 1. Grave Matter, 2. Full Knowledge (awareness), 3. Deliberate Consent (free will).",
    memoryTip: "Matter + Knowledge + Consent."
  },
  {
    id: "conf-2",
    category: "doctrine",
    categoryLabel: "Confession & Morality",
    question: "What is Perfect Contrition?",
    options: [
      "Sorrow for sin arising from the pure love of God, who is infinitely good in Himself, accompanied by the resolve to go to sacramental confession.",
      "Sorrow for sin arising solely from the fear of the eternal pains of hell.",
      "Reciting ten Our Fathers and ten Hail Marys after doing wrong.",
      "Feeling emotionally weepy when remembering mistakes."
    ],
    correctAnswer: 1,
    explanation: "Perfect contrition flows from love of God (Charity). Imperfect contrition (attrition) arises from fear of hell or realization of sin's ugliness.",
    memoryTip: "Perfect contrition = love of God above all else."
  }
];

/**
 * Generates a unified 1-to-4 multiple-choice test for ANY category of content in the application.
 */
export function generateCategoryQuestions(
  category: TestContentCategory,
  count: number = 10,
  dayNumber?: number
): Question[] {
  let pool: Question[] = [];

  switch (category) {
    case "curriculum_daily": {
      if (dayNumber) {
        const day = CURRICULUM_DAYS.find((d) => d.day === dayNumber);
        if (day) {
          pool = day.questionIds
            .map((id) => MASTER_QUESTION_BANK[id])
            .filter((q): q is Question => Boolean(q));
        }
      }
      if (pool.length === 0) {
        // All curriculum questions
        pool = Object.values(MASTER_QUESTION_BANK);
      }
      break;
    }

    case "penny_all": {
      pool = ALL_PENNY_QUESTIONS.map((p) => convertPennyToQuestion(p, ALL_PENNY_QUESTIONS));
      break;
    }

    case "penny_section_1": {
      const sectionQs = ALL_PENNY_QUESTIONS.filter((q) => q.number >= 1 && q.number <= 139);
      pool = sectionQs.map((p) => convertPennyToQuestion(p, sectionQs));
      break;
    }

    case "penny_section_2": {
      const sectionQs = ALL_PENNY_QUESTIONS.filter((q) => q.number >= 140 && q.number <= 169);
      pool = sectionQs.map((p) => convertPennyToQuestion(p, sectionQs));
      break;
    }

    case "penny_section_3": {
      const sectionQs = ALL_PENNY_QUESTIONS.filter((q) => q.number >= 170 && q.number <= 248);
      pool = sectionQs.map((p) => convertPennyToQuestion(p, sectionQs));
      break;
    }

    case "penny_section_4": {
      const sectionQs = ALL_PENNY_QUESTIONS.filter((q) => q.number >= 249 && q.number <= 321);
      pool = sectionQs.map((p) => convertPennyToQuestion(p, sectionQs));
      break;
    }

    case "penny_section_5": {
      const sectionQs = ALL_PENNY_QUESTIONS.filter((q) => q.number >= 322 && q.number <= 370);
      pool = sectionQs.map((p) => convertPennyToQuestion(p, sectionQs));
      break;
    }

    case "rosary_mysteries": {
      pool = [...ROSARY_SPECIALIZED_QUESTIONS];
      break;
    }

    case "holy_mass_liturgy": {
      pool = [...MASS_LITURGY_QUESTIONS];
      break;
    }

    case "seven_sacraments": {
      pool = [...SACRAMENTS_QUESTIONS];
      break;
    }

    case "ten_commandments": {
      pool = [...COMMANDMENTS_QUESTIONS];
      break;
    }

    case "sacred_scripture": {
      pool = [...SCRIPTURE_QUESTIONS];
      break;
    }

    case "confession_morality": {
      pool = [...CONFESSION_QUESTIONS];
      break;
    }

    case "all_content":
    default: {
      const curriculumAll = Object.values(MASTER_QUESTION_BANK);
      const samplePenny = ALL_PENNY_QUESTIONS.slice(0, 100).map((p) =>
        convertPennyToQuestion(p, ALL_PENNY_QUESTIONS)
      );
      pool = [
        ...curriculumAll,
        ...samplePenny,
        ...ROSARY_SPECIALIZED_QUESTIONS,
        ...MASS_LITURGY_QUESTIONS,
        ...SACRAMENTS_QUESTIONS,
        ...COMMANDMENTS_QUESTIONS,
        ...SCRIPTURE_QUESTIONS,
        ...CONFESSION_QUESTIONS,
      ];
      break;
    }
  }

  // Shuffle and pick requested count
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
