export interface LatinEnglishVerse {
  latin: string;
  phonetic: string;
  english: string;
  literalBreakdown?: { word: string; translation: string }[];
}

export interface ParallelPrayerGuide {
  id: string;
  title: string;
  latinTitle: string;
  category: string;
  rubrics?: string;
  verses: LatinEnglishVerse[];
}

export const LATIN_PARALLEL_PRAYERS: ParallelPrayerGuide[] = [
  {
    id: "pater-noster",
    title: "The Lord's Prayer",
    latinTitle: "Pater Noster",
    category: "Fundamental Prayers",
    rubrics: "Taught by Jesus Christ in the Gospel of Matthew (6:9-13).",
    verses: [
      {
        latin: "Pater noster, qui es in cælis,",
        phonetic: "PAH-tair NOH-stair, kwee ess in CHE-leess,",
        english: "Our Father, who art in heaven,",
        literalBreakdown: [
          { word: "Pater", translation: "Father" },
          { word: "noster", translation: "our" },
          { word: "qui", translation: "who" },
          { word: "es", translation: "are" },
          { word: "in cælis", translation: "in the heavens" }
        ]
      },
      {
        latin: "sanctificétur nomen tuum.",
        phonetic: "sahnk-tee-fee-CHAY-toor NOH-men TOO-oom.",
        english: "hallowed be Thy name.",
        literalBreakdown: [
          { word: "sanctificetur", translation: "may be sanctified / hallowed" },
          { word: "nomen", translation: "name" },
          { word: "tuum", translation: "Thy / your" }
        ]
      },
      {
        latin: "Advéniat regnum tuum.",
        phonetic: "ahd-VAY-nee-aht RANE-yoom TOO-oom.",
        english: "Thy kingdom come.",
        literalBreakdown: [
          { word: "Adveniat", translation: "may arrive / come" },
          { word: "regnum", translation: "kingdom" },
          { word: "tuum", translation: "Thy" }
        ]
      },
      {
        latin: "Fiat volúntas tua, sicut in cælo et in terra.",
        phonetic: "FEE-aht voh-LOON-tahs TOO-ah, SEE-koot in CHE-loh et in TAIR-rah.",
        english: "Thy will be done, on earth as it is in heaven.",
        literalBreakdown: [
          { word: "Fiat", translation: "let it be done" },
          { word: "voluntas", translation: "will" },
          { word: "sicut", translation: "just as" },
          { word: "in terra", translation: "on earth" }
        ]
      },
      {
        latin: "Panem nostrum cotidiánum da nobis hódie,",
        phonetic: "PAH-nem NOH-stroom koh-tee-dee-AH-noom dah NOH-beess HOH-dee-ay,",
        english: "Give us this day our daily bread,",
        literalBreakdown: [
          { word: "Panem", translation: "bread" },
          { word: "cotidianum", translation: "daily / supersubstantial" },
          { word: "da", translation: "give" },
          { word: "nobis", translation: "to us" },
          { word: "hodie", translation: "today" }
        ]
      },
      {
        latin: "et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris.",
        phonetic: "et dee-MEET-tay NOH-beess DAY-bee-tah NOH-strah, SEE-koot et nohs dee-MEET-tee-moos day-bee-TOH-ree-boos NOH-strees.",
        english: "and forgive us our trespasses, as we forgive those who trespass against us.",
        literalBreakdown: [
          { word: "dimitte", translation: "forgive / release" },
          { word: "debita", translation: "debts / sins" },
          { word: "debitoribus", translation: "to our debtors" }
        ]
      },
      {
        latin: "Et ne nos indúcas in tentatiónem,",
        phonetic: "Et nay nohs een-DOO-kahs een ten-tah-tsee-OH-nem,",
        english: "And lead us not into temptation,",
        literalBreakdown: [
          { word: "ne", translation: "not / lest" },
          { word: "inducas", translation: "lead into" },
          { word: "tentationem", translation: "temptation / trial" }
        ]
      },
      {
        latin: "sed líbera nos a malo. Amen.",
        phonetic: "sed LEE-beh-rah nohs ah MAH-loh. AH-men.",
        english: "but deliver us from evil. Amen.",
        literalBreakdown: [
          { word: "sed", translation: "but" },
          { word: "libera", translation: "free / deliver" },
          { word: "a malo", translation: "from the evil one / evil" }
        ]
      }
    ]
  },
  {
    id: "ave-maria",
    title: "The Hail Mary",
    latinTitle: "Ave Maria",
    category: "Marian Devotion",
    rubrics: "Derived from the Annunciation by Archangel Gabriel (Luke 1:28) and Visitation of Elizabeth (Luke 1:42).",
    verses: [
      {
        latin: "Ave María, grátia plena, Dóminus tecum.",
        phonetic: "AH-vay mah-REE-ah, GRAH-tsee-ah PLAY-nah, DOH-mee-noos TAY-koom.",
        english: "Hail Mary, full of grace, the Lord is with thee.",
        literalBreakdown: [
          { word: "Ave", translation: "Hail / Rejoice" },
          { word: "gratia plena", translation: "full of grace" },
          { word: "Dominus tecum", translation: "the Lord is with you" }
        ]
      },
      {
        latin: "Benedícta tu in muliéribus,",
        phonetic: "beh-nay-DEEK-tah too een moo-lee-EH-ree-boos,",
        english: "Blessed art thou among women,",
        literalBreakdown: [
          { word: "Benedicta", translation: "Blessed" },
          { word: "in mulieribus", translation: "among women" }
        ]
      },
      {
        latin: "et benedíctus fructus ventris tui, Iesus.",
        phonetic: "et beh-nay-DEEK-toos FROOK-toos VEN-trees TOO-ee, YAY-soos.",
        english: "and blessed is the fruit of thy womb, Jesus.",
        literalBreakdown: [
          { word: "fructus", translation: "fruit" },
          { word: "ventris tui", translation: "of thy womb" }
        ]
      },
      {
        latin: "Sancta María, Mater Dei,",
        phonetic: "SAHNK-tah mah-REE-ah, MAH-tair DAY-ee,",
        english: "Holy Mary, Mother of God,",
        literalBreakdown: [
          { word: "Mater Dei", translation: "Mother of God (Theotokos)" }
        ]
      },
      {
        latin: "ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen.",
        phonetic: "OH-rah proh NOH-beess pek-kah-TOH-ree-boos, noonk et een OH-rah MOR-tees NOH-stray. AH-men.",
        english: "pray for us sinners, now and at the hour of our death. Amen.",
        literalBreakdown: [
          { word: "ora", translation: "pray" },
          { word: "pro nobis", translation: "for us" },
          { word: "peccatoribus", translation: "sinners" },
          { word: "nunc", translation: "now" },
          { word: "in hora mortis", translation: "at the hour of death" }
        ]
      }
    ]
  },
  {
    id: "gloria-patri",
    title: "Glory Be (Minor Doxology)",
    latinTitle: "Gloria Patri",
    category: "Trinitarian Praise",
    rubrics: "The ancient doxology of praise to the Three Divine Persons of the Trinity.",
    verses: [
      {
        latin: "Glória Patri, et Fílio, et Spirítui Sancto.",
        phonetic: "GLOH-ree-ah PAH-tree, et FEE-lee-oh, et spee-REE-too-ee SAHNK-toh.",
        english: "Glory be to the Father, and to the Son, and to the Holy Spirit.",
        literalBreakdown: [
          { word: "Gloria", translation: "Glory" },
          { word: "Patri", translation: "to the Father" },
          { word: "Filio", translation: "to the Son" },
          { word: "Spiritui Sancto", translation: "to the Holy Spirit" }
        ]
      },
      {
        latin: "Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.",
        phonetic: "SEE-koot EH-raht een preen-CHEE-pee-oh, et noonk, et SEM-pair, et een SAY-koo-lah say-koo-LOH-room. AH-men.",
        english: "As it was in the beginning, is now, and ever shall be, world without end. Amen.",
        literalBreakdown: [
          { word: "principio", translation: "beginning" },
          { word: "semper", translation: "always" },
          { word: "saecula saeculorum", translation: "ages of ages / eternity" }
        ]
      }
    ]
  },
  {
    id: "sancte-michael",
    title: "Prayer to Saint Michael the Archangel",
    latinTitle: "Sancte Michael Archangele",
    category: "Spiritual Warfare",
    rubrics: "Composed by Pope Leo XIII in 1884 for the protection of the Church.",
    verses: [
      {
        latin: "Sancte Míchael Archángele, defénde nos in prœ́lio;",
        phonetic: "SAHNK-tay MEE-kah-el ar-KAHN-jay-lay, day-FEN-day nohs een PRAY-lee-oh;",
        english: "Saint Michael the Archangel, defend us in battle;",
        literalBreakdown: [
          { word: "defende", translation: "defend" },
          { word: "in proelio", translation: "in battle" }
        ]
      },
      {
        latin: "contra nequítiam et insídias diáboli esto præsídium.",
        phonetic: "KOHN-trah nay-KWEE-tsee-ahm et een-SEE-dee-ahs dee-AH-boh-lee ESS-toh pray-SEE-dee-oom.",
        english: "be our protection against the wickedness and snares of the devil.",
        literalBreakdown: [
          { word: "nequitiam", translation: "wickedness / malice" },
          { word: "insidias", translation: "traps / ambushes" },
          { word: "praesidium", translation: "fortress / defense" }
        ]
      },
      {
        latin: "Ímperet illi Deus, súpplices deprecámur:",
        phonetic: "EEM-peh-ret EEL-lee DAY-oos, SOOP-plee-chess day-pray-KAH-moor:",
        english: "May God rebuke him, we humbly pray:",
        literalBreakdown: [
          { word: "Imperet", translation: "command / rebuke" },
          { word: "supplices", translation: "as humble suppliants" }
        ]
      },
      {
        latin: "tuque, Princeps milítiæ cæléstis, Sátanam aliósque spíritus malígnos,",
        phonetic: "TOO-kway, PREEN-cheps mee-LEE-tsee-ay chay-LESS-tees, SAH-tah-nahm ah-lee-OHS-kway SPEE-ree-toos mah-LEEN-yohs,",
        english: "and do thou, O Prince of the Heavenly Host, cast Satan and all evil spirits,",
        literalBreakdown: [
          { word: "Princeps", translation: "Prince / Leader" },
          { word: "militiae caelestis", translation: "of the heavenly army" }
        ]
      },
      {
        latin: "qui ad perditiónem animárum pervagántur in mundo, divína virtúte, in inférnum detrúde. Amen.",
        phonetic: "kwee ahd pair-dee-tsee-OH-nem ah-nee-MAH-room pair-vah-GAHN-toor een MOON-doh, dee-VEE-nah veer-TOO-tay, een een-FAIR-noom day-TROO-day. AH-men.",
        english: "who prowl about the world seeking the ruin of souls, by the divine power of God, cast into hell. Amen.",
        literalBreakdown: [
          { word: "perditionem animarum", translation: "ruin / loss of souls" },
          { word: "divina virtute", translation: "by divine power" },
          { word: "detrude", translation: "thrust / cast down" }
        ]
      }
    ]
  }
];
