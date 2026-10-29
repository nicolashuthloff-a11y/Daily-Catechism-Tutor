export interface DailyProgramSchedule {
  day: number;
  title: string;
  subtitle: string;
  theme: string;
  targetMinutes: number;
  pennyRange: {
    start: number;
    end: number;
    label: string;
    sectionId: number;
  };
  scripture: {
    book: string;
    chapter: number;
    label: string;
    keyVerse: string;
  };
  rosary: {
    mysterySetId: "joyful" | "luminous" | "sorrowful" | "glorious";
    mysteryName: string;
    decadeNumber: number;
    fruit: string;
  };
  keyTextToMemorize: string;
  checkpoints: {
    id: string;
    label: string;
    description: string;
    tab: "curriculum" | "penny" | "bible" | "rosary" | "memorize" | "test";
  }[];
}

export const DAILY_PROGRAM_DAYS: DailyProgramSchedule[] = [
  {
    day: 1,
    title: "The Sign of the Cross & Chief Prayers",
    subtitle: "Foundations of Catholic Prayer & God's Perfections",
    theme: "The Holy Trinity & Divine Perfections",
    targetMinutes: 30,
    pennyRange: {
      start: 1,
      end: 25,
      label: "Q. 1–25: God & His Perfections",
      sectionId: 1,
    },
    scripture: {
      book: "Matthew",
      chapter: 6,
      label: "Matthew Chapter 6 (The Lord's Prayer & Seeking First the Kingdom)",
      keyVerse: "Our Father who art in heaven, hallowed be thy name... (Matt 6:9)",
    },
    rosary: {
      mysterySetId: "joyful",
      mysteryName: "1st Joyful Mystery: The Annunciation",
      decadeNumber: 1,
      fruit: "Humility",
    },
    keyTextToMemorize: "Our Father, who art in heaven, hallowed be thy name...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Review Day 1 doctrine on the Holy Trinity & Chief Prayers", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Read Questions 1 to 25 on God and His Perfections", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Matthew Chapter 6 in the Bible Reader", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Annunciation on the interactive Rosary", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 1 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 2,
    title: "Glory Be & The Apostles' Creed",
    subtitle: "The Twelve Articles of Faith & The Incarnation",
    theme: "The Rule of Apostolic Faith",
    targetMinutes: 30,
    pennyRange: {
      start: 26,
      end: 50,
      label: "Q. 26–50: The Holy Trinity & Creation",
      sectionId: 1,
    },
    scripture: {
      book: "John",
      chapter: 1,
      label: "John Chapter 1 (The Word Made Flesh)",
      keyVerse: "In the beginning was the Word, and the Word was with God, and the Word was God. (John 1:1)",
    },
    rosary: {
      mysterySetId: "joyful",
      mysteryName: "2nd Joyful Mystery: The Visitation",
      decadeNumber: 2,
      fruit: "Love of Neighbor & Charity",
    },
    keyTextToMemorize: "I believe in God, the Father Almighty, Creator of heaven and earth...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Study the 12 Articles of the Apostles' Creed", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Read Questions 26 to 50 on Creation and the Angels", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read the Prologue of St. John's Gospel", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Visitation of Mary to Elizabeth", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Complete the Day 2 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 3,
    title: "Hail Holy Queen & Act of Contrition",
    subtitle: "Prayers of Repentance & Marian Intercession",
    theme: "Contrition & Sacred Recourse",
    targetMinutes: 30,
    pennyRange: {
      start: 51,
      end: 75,
      label: "Q. 51–75: The Fall of Man & Original Sin",
      sectionId: 1,
    },
    scripture: {
      book: "Luke",
      chapter: 1,
      label: "Luke Chapter 1 (The Annunciation & The Magnificat)",
      keyVerse: "My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour. (Luke 1:46-47)",
    },
    rosary: {
      mysterySetId: "joyful",
      mysteryName: "3rd Joyful Mystery: The Nativity of Jesus",
      decadeNumber: 3,
      fruit: "Poverty of Spirit & Detachment",
    },
    keyTextToMemorize: "O my God, I am heartily sorry for having offended Thee...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Master the Act of Contrition and Salve Regina", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Read Questions 51 to 75 on the Fall and original sin", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Luke Chapter 1", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Pray the Nativity decade on the step-by-step Rosary", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Complete the Day 3 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 4,
    title: "The Ten Commandments: Part I (1–4)",
    subtitle: "Duties toward Almighty God & Honoring Parents",
    theme: "The First Tablet of the Decalogue",
    targetMinutes: 30,
    pennyRange: {
      start: 76,
      end: 105,
      label: "Q. 76–105: The Incarnation & Redemption",
      sectionId: 1,
    },
    scripture: {
      book: "Exodus",
      chapter: 20,
      label: "Exodus Chapter 20 (The Ten Commandments on Mount Sinai)",
      keyVerse: "I am the Lord thy God... Thou shalt not have strange gods before Me. (Ex 20:2-3)",
    },
    rosary: {
      mysterySetId: "joyful",
      mysteryName: "4th Joyful Mystery: The Presentation in the Temple",
      decadeNumber: 4,
      fruit: "Obedience and Purity",
    },
    keyTextToMemorize: "I am the Lord thy God, who brought thee out of the land of Egypt...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Examine Commandments 1 to 4 and sins forbidden", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 76 to 105 on the Incarnation", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Exodus 20 in the Bible Reader", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Pray the Presentation decade", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 4 Decalogue test", tab: "test" },
    ],
  },
  {
    day: 5,
    title: "The Ten Commandments: Part II (5–10)",
    subtitle: "Duties toward Neighbor, Life, Purity & Truth",
    theme: "The Second Tablet of the Decalogue",
    targetMinutes: 30,
    pennyRange: {
      start: 106,
      end: 139,
      label: "Q. 106–139: The Holy Ghost & The Catholic Church",
      sectionId: 1,
    },
    scripture: {
      book: "Matthew",
      chapter: 5,
      label: "Matthew Chapter 5 (The Beatitudes & The Higher Law of Charity)",
      keyVerse: "Be you therefore perfect, as also your heavenly Father is perfect. (Matt 5:48)",
    },
    rosary: {
      mysterySetId: "joyful",
      mysteryName: "5th Joyful Mystery: The Finding in the Temple",
      decadeNumber: 5,
      fruit: "Piety and Joy in Finding Jesus",
    },
    keyTextToMemorize: "Thou shalt not kill. Thou shalt not commit adultery. Thou shalt not steal...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Commandments 5 to 10 and moral purity", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 106 to 139 on the Holy Ghost and Church", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Matthew Chapter 5", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate Finding Jesus in the Temple", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 5 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 6,
    title: "The Theological Virtue of Hope & Daily Prayer",
    subtitle: "The Lord's Prayer Petitions & The Angelic Salutation",
    theme: "Supernatural Hope & Supplication",
    targetMinutes: 30,
    pennyRange: {
      start: 140,
      end: 169,
      label: "Q. 140–169: Hope, Prayer & The Hail Mary",
      sectionId: 2,
    },
    scripture: {
      book: "Romans",
      chapter: 8,
      label: "Romans Chapter 8 (Life in the Spirit & Unbreakable Hope)",
      keyVerse: "For I am sure that neither death, nor life... shall be able to separate us from the love of God. (Rom 8:38-39)",
    },
    rosary: {
      mysterySetId: "luminous",
      mysteryName: "1st Luminous Mystery: The Baptism in the Jordan",
      decadeNumber: 1,
      fruit: "Openness to the Holy Spirit",
    },
    keyTextToMemorize: "O my God, relying on Thy infinite goodness and promises, I hope to obtain pardon of my sins...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Study the seven petitions of the Our Father", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Penny Catechism Section 2 on Hope and Prayer", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Romans Chapter 8", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Baptism of Christ", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 6 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 7,
    title: "The Precepts of Charity & Commandments 1–3",
    subtitle: "The Precepts of the Church & Sanctifying the Lord's Day",
    theme: "Worship in Spirit & Truth",
    targetMinutes: 30,
    pennyRange: {
      start: 170,
      end: 205,
      label: "Q. 170–205: Charity & Commandments 1 to 3",
      sectionId: 3,
    },
    scripture: {
      book: "Deuteronomy",
      chapter: 6,
      label: "Deuteronomy Chapter 6 (The Shema & Loving God with All Thy Heart)",
      keyVerse: "Thou shalt love the Lord thy God with thy whole heart, and with thy whole soul. (Deut 6:5)",
    },
    rosary: {
      mysterySetId: "luminous",
      mysteryName: "2nd Luminous Mystery: The Wedding at Cana",
      decadeNumber: 2,
      fruit: "To Jesus through Mary",
    },
    keyTextToMemorize: "Remember that thou keep holy the Sabbath day.",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Review duties of Sunday worship and holy days", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 170 to 205 on the Decalogue", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Deuteronomy 6", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Miracle at Cana", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 7 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 8,
    title: "Commandments 4 to 7 & Social Justice",
    subtitle: "Respect for Authority, Human Life, Purity & Property",
    theme: "Living Charity in Society",
    targetMinutes: 30,
    pennyRange: {
      start: 206,
      end: 230,
      label: "Q. 206–230: Commandments 4 to 7",
      sectionId: 3,
    },
    scripture: {
      book: "1 Corinthians",
      chapter: 13,
      label: "1 Corinthians Chapter 13 (The Hymn to Charity)",
      keyVerse: "And now there remain faith, hope, and charity, these three: but the greatest of these is charity. (1 Cor 13:13)",
    },
    rosary: {
      mysterySetId: "luminous",
      mysteryName: "3rd Luminous Mystery: Proclamation of the Kingdom",
      decadeNumber: 3,
      fruit: "Repentance and Trust in God",
    },
    keyTextToMemorize: "Charity is patient, is kind: charity envieth not, dealeth not perversely...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Study duties of justice and reparation for theft", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 206 to 230 on Commandments 4 to 7", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read 1 Corinthians 13", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Proclamation of the Kingdom", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 8 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 9,
    title: "Commandments 8–10 & Precepts of the Church",
    subtitle: "Truthfulness, Guarding the Heart & Church Laws",
    theme: "Truth, Purity of Heart & Church Discipline",
    targetMinutes: 30,
    pennyRange: {
      start: 231,
      end: 248,
      label: "Q. 231–248: Commandments 8–10 & Precepts of the Church",
      sectionId: 3,
    },
    scripture: {
      book: "James",
      chapter: 3,
      label: "James Chapter 3 (Guarding the Tongue & Heavenly Wisdom)",
      keyVerse: "The tongue also is a fire, a world of iniquity... (Jas 3:6)",
    },
    rosary: {
      mysterySetId: "luminous",
      mysteryName: "4th Luminous Mystery: The Transfiguration",
      decadeNumber: 4,
      fruit: "Desire for Holiness",
    },
    keyTextToMemorize: "To assist at Mass on all Sundays and Holydays of Obligation...",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Learn the 6 Precepts of the Church", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 231 to 248 on Church Precepts", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read James 3 on truthfulness", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Transfiguration", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 9 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 10,
    title: "The Sacraments: Baptism & Confirmation",
    subtitle: "Spiritual Rebirth & Soldiers of Jesus Christ",
    theme: "Sacraments of Christian Initiation",
    targetMinutes: 30,
    pennyRange: {
      start: 249,
      end: 280,
      label: "Q. 249–280: Sacraments in General, Baptism & Confirmation",
      sectionId: 4,
    },
    scripture: {
      book: "Acts",
      chapter: 2,
      label: "Acts Chapter 2 (The Coming of the Holy Ghost at Pentecost)",
      keyVerse: "They were all filled with the Holy Ghost, and began to speak with diverse tongues... (Acts 2:4)",
    },
    rosary: {
      mysterySetId: "sorrowful",
      mysteryName: "1st Sorrowful Mystery: The Agony in the Garden",
      decadeNumber: 1,
      fruit: "Sorrow for Sin & Conformity to God's Will",
    },
    keyTextToMemorize: "Baptism is a Sacrament which cleanses us from original sin, makes us Christians, children of God, and members of the Church.",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Learn Matter, Form, and Effects of Baptism & Confirmation", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 249 to 280 on Sacraments and Baptism", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Acts Chapter 2", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Agony in Gethsemane", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 10 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 11,
    title: "The Holy Eucharist & The Holy Sacrifice of the Mass",
    subtitle: "The True Body and Blood of Christ & Transubstantiation",
    theme: "The Blessed Sacrament of the Altar",
    targetMinutes: 30,
    pennyRange: {
      start: 281,
      end: 305,
      label: "Q. 281–305: The Holy Eucharist & The Holy Mass",
      sectionId: 4,
    },
    scripture: {
      book: "John",
      chapter: 6,
      label: "John Chapter 6 (The Bread of Life Discourse)",
      keyVerse: "He that eateth my flesh, and drinketh my blood, hath everlasting life: and I will raise him up in the last day. (John 6:55)",
    },
    rosary: {
      mysterySetId: "sorrowful",
      mysteryName: "5th Sorrowful Mystery: The Crucifixion and Death of Jesus",
      decadeNumber: 5,
      fruit: "Pardon and Salvation",
    },
    keyTextToMemorize: "The Holy Eucharist is the true Body and Blood of Jesus Christ, together with His Soul and Divinity, under the appearances of bread and wine.",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Study Transubstantiation and Holy Communion requirements", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 281 to 305 on the Holy Mass", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read John 6 (Bread of Life)", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Crucifixion on the step-by-step Rosary", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 11 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 12,
    title: "Penance, Extreme Unction, Holy Orders & Matrimony",
    subtitle: "Sacraments of Healing & Service of Communion",
    theme: "Sacramental Healing & Vocations",
    targetMinutes: 30,
    pennyRange: {
      start: 306,
      end: 321,
      label: "Q. 306–321: Penance, Extreme Unction, Orders & Matrimony",
      sectionId: 4,
    },
    scripture: {
      book: "John",
      chapter: 20,
      label: "John Chapter 20 (The Apostles Given the Power to Forgive Sins)",
      keyVerse: "Receive ye the Holy Ghost: Whose sins you shall forgive, they are forgiven them. (John 20:22-23)",
    },
    rosary: {
      mysterySetId: "glorious",
      mysteryName: "1st Glorious Mystery: The Resurrection of Jesus",
      decadeNumber: 1,
      fruit: "Faith and Newness of Life",
    },
    keyTextToMemorize: "Whose sins you shall forgive, they are forgiven them; and whose sins you shall retain, they are retained.",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Master the 5 elements of a good Confession", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 306 to 321 on Penance and Vocations", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read John 20 (Institution of Confession)", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Glorious Resurrection", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 12 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 13,
    title: "Virtues, Vices, Beatitudes & Works of Mercy",
    subtitle: "The Moral Life, 7 Capital Sins & Corporal/Spiritual Mercy",
    theme: "Christian Perfection & Works of Mercy",
    targetMinutes: 30,
    pennyRange: {
      start: 322,
      end: 345,
      label: "Q. 322–345: Theological & Cardinal Virtues, Gifts & Sins",
      sectionId: 5,
    },
    scripture: {
      book: "Matthew",
      chapter: 25,
      label: "Matthew Chapter 25 (The Corporal Works of Mercy & The Judgment)",
      keyVerse: "Amen I say to you, as long as you did it to one of these my least brethren, you did it to me. (Matt 25:40)",
    },
    rosary: {
      mysterySetId: "glorious",
      mysteryName: "4th Glorious Mystery: The Assumption of the Blessed Virgin",
      decadeNumber: 4,
      fruit: "Grace of a Happy Death & Devotion to Mary",
    },
    keyTextToMemorize: "Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, and Fear of the Lord.",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Review 7 Gifts of the Holy Ghost and 14 Works of Mercy", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 322 to 345 on Virtues and Sins", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Matthew 25 (Judgment of the Nations)", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Assumption of Our Lady", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Day 13 Multiple-Choice Test", tab: "test" },
    ],
  },
  {
    day: 14,
    title: "The Four Last Things & Grand Synthesis Examination",
    subtitle: "Death, Judgment, Hell, Heaven & 370-Question Mastery",
    theme: "Eternity & Final Doctrinal Synthesis",
    targetMinutes: 30,
    pennyRange: {
      start: 346,
      end: 370,
      label: "Q. 346–370: The Four Last Things",
      sectionId: 5,
    },
    scripture: {
      book: "Revelation",
      chapter: 21,
      label: "Revelation Chapter 21 (A New Heaven and A New Earth)",
      keyVerse: "And God shall wipe away all tears from their eyes: and death shall be no more. (Rev 21:4)",
    },
    rosary: {
      mysterySetId: "glorious",
      mysteryName: "5th Glorious Mystery: The Coronation of Our Lady",
      decadeNumber: 5,
      fruit: "Trust in Mary's Intercession & Crown of Glory",
    },
    keyTextToMemorize: "Remember thy last end, and thou shalt never sin. (Ecclesiasticus 7:40)",
    checkpoints: [
      { id: "c-1", label: "Curriculum Lesson", description: "Synthesize all 14 days of Catholic doctrine and prayers", tab: "curriculum" },
      { id: "c-2", label: "Penny Catechism", description: "Questions 346 to 370 on the Four Last Things", tab: "penny" },
      { id: "c-3", label: "Scripture Reading", description: "Read Revelation 21", tab: "bible" },
      { id: "c-4", label: "Animated Rosary", description: "Contemplate the Coronation of Mary as Queen of Heaven", tab: "rosary" },
      { id: "c-5", label: "1-to-4 Examination", description: "Pass the Grand Cumulative Mastery Test", tab: "test" },
    ],
  },
];
