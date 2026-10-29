import { CurriculumDay, Question } from "../types";

export const CURRICULUM_DAYS: CurriculumDay[] = [
  {
    day: 1,
    title: "Chief Prayers: Sign of the Cross, Our Father & Hail Mary",
    subtitle: "The Foundation of Daily Christian Prayer",
    category: "prayers",
    estimatedMinutes: 30,
    summary: "Today we begin our 30-minute daily curriculum by mastering the fundamental prayers given by Christ and Sacred Scripture: The Sign of the Cross, The Lord's Prayer (Pater Noster), and the Hail Mary (Ave Maria).",
    learningPoints: [
      "The Sign of the Cross professes faith in the Holy Trinity and Christ's redeeming sacrifice.",
      "The Lord's Prayer contains seven petitions taught directly by Jesus in the Gospel of Matthew.",
      "The Hail Mary unites the Archangel Gabriel's greeting with Saint Elizabeth's blessing.",
      "Memorization goal: Perfect recitation without hesitation."
    ],
    keyTextToMemorize: "Our Father, who art in heaven, hallowed be thy name...",
    questionIds: ["q-day1-1", "q-day1-2", "q-day1-3", "q-day1-4", "q-day1-5", "q-day1-6", "q-day1-7", "q-day1-8"]
  },
  {
    day: 2,
    title: "Chief Prayers: Glory Be & The Apostles' Creed",
    subtitle: "Doxology and the Rule of Faith",
    category: "prayers",
    estimatedMinutes: 30,
    summary: "Today we study the Doxology (Glory Be) and the twelve fundamental articles of the Apostles' Creed, summarizing our core Catholic faith received from the Apostles.",
    learningPoints: [
      "The Glory Be offers eternal adoration to the three Divine Persons.",
      "The Apostles' Creed is divided into three main parts: God the Father, God the Son, and God the Holy Spirit.",
      "Key articles include the Incarnation, Passion, Resurrection, Ascension, and Holy Catholic Church.",
      "Memorization goal: Exact recall of the Creed's 12 articles."
    ],
    keyTextToMemorize: "I believe in God, the Father almighty, Creator of heaven and earth...",
    questionIds: ["q-day2-1", "q-day2-2", "q-day2-3", "q-day2-4", "q-day2-5", "q-day2-6", "q-day2-7", "q-day2-8"]
  },
  {
    day: 3,
    title: "Chief Prayers: Hail Holy Queen, Act of Contrition & Memorare",
    subtitle: "Prayers of Repentance and Marian Intercession",
    category: "prayers",
    estimatedMinutes: 30,
    summary: "Mastering the traditional prayers for forgiveness and recourse to Our Lady: The Salve Regina, the essential Act of Contrition for Confession, and the Memorare.",
    learningPoints: [
      "The Act of Contrition expresses hearty sorrow, detestation of sin, and a firm purpose of amendment.",
      "The Hail Holy Queen invokes Mary as Mother of Mercy and our advocate.",
      "The Memorare of St. Bernard expresses boundless trust in Mary's intercession.",
      "Memorization goal: Reciting the Act of Contrition by heart for the Sacrament of Penance."
    ],
    keyTextToMemorize: "O my God, I am heartily sorry for having offended Thee...",
    questionIds: ["q-day3-1", "q-day3-2", "q-day3-3", "q-day3-4", "q-day3-5", "q-day3-6", "q-day3-7", "q-day3-8"]
  },
  {
    day: 4,
    title: "The Ten Commandments: Part I (Commandments 1 - 4)",
    subtitle: "Duties toward God and the Fourth Commandment",
    category: "commandments",
    estimatedMinutes: 30,
    summary: "The first tablet of the Decalogue governs our relationship with Almighty God—His supreme worship, the sanctity of His Holy Name, keeping the Lord's Day, and honoring parents.",
    learningPoints: [
      "1st Commandment: Prohibition of idolatry, superstition, and false worship.",
      "2nd Commandment: Reverence for God's Holy Name against blasphemy and false oaths.",
      "3rd Commandment: Sanctifying Sundays and Holy Days of Obligation with the Holy Mass.",
      "4th Commandment: Honoring and obeying parents and lawful authorities."
    ],
    keyTextToMemorize: "1. I am the Lord your God: you shall not have strange Gods before me...",
    questionIds: ["q-day4-1", "q-day4-2", "q-day4-3", "q-day4-4", "q-day4-5", "q-day4-6", "q-day4-7", "q-day4-8"]
  },
  {
    day: 5,
    title: "The Ten Commandments: Part II (Commandments 5 - 10)",
    subtitle: "Moral Law, Sanctity of Life, and Purity of Heart",
    category: "commandments",
    estimatedMinutes: 30,
    summary: "The second tablet of the Decalogue: preserving human life, matrimonial fidelity and chastity, justice and property, truthfulness, and purity in thought and desire.",
    learningPoints: [
      "5th Commandment: Defense of human life from conception to natural death.",
      "6th & 9th Commandments: Chastity in deeds and purity in thoughts/desires.",
      "7th & 10th Commandments: Respect for the goods of others and detachment from covetousness.",
      "8th Commandment: Living in truth, forbidding lies, detraction, and calumny."
    ],
    keyTextToMemorize: "5. You shall not kill. 6. You shall not commit adultery. 7. You shall not steal...",
    questionIds: ["q-day5-1", "q-day5-2", "q-day5-3", "q-day5-4", "q-day5-5", "q-day5-6", "q-day5-7", "q-day5-8"]
  },
  {
    day: 6,
    title: "The Seven Sacraments: Sacraments of Initiation",
    subtitle: "Baptism, Confirmation, and the Most Holy Eucharist",
    category: "sacraments",
    estimatedMinutes: 30,
    summary: "Exploring the foundational sacraments that lay the foundations of every Christian life: Baptism for new birth, Confirmation for spiritual strengthening, and Eucharist as food for eternal life.",
    learningPoints: [
      "Baptism: Matter (water), Form (Trinitarian formula), and cleansing from original sin.",
      "Confirmation: Imparting the indelible seal and seven Gifts of the Holy Spirit.",
      "Holy Eucharist: The Real Presence through transubstantiation of bread and wine.",
      "Understanding Matter, Form, and Minister for each sacrament."
    ],
    keyTextToMemorize: "The three Sacraments of Initiation: Baptism, Confirmation, Holy Eucharist.",
    questionIds: ["q-day6-1", "q-day6-2", "q-day6-3", "q-day6-4", "q-day6-5", "q-day6-6", "q-day6-7", "q-day6-8"]
  },
  {
    day: 7,
    title: "The Seven Sacraments: Healing & Service",
    subtitle: "Penance, Anointing, Holy Orders, and Holy Matrimony",
    category: "sacraments",
    estimatedMinutes: 30,
    summary: "Understanding the Sacraments of Healing (Confession, Anointing) and the Sacraments at the Service of Communion and Mission (Holy Orders, Matrimony).",
    learningPoints: [
      "Penance: The four elements (contrition, confession, satisfaction, absolution).",
      "Anointing of the Sick: Spiritual comfort and forgiveness during serious illness or infirmity.",
      "Holy Orders: Three degrees (Bishops, Priests, Deacons) for ministerial priesthood.",
      "Holy Matrimony: Indissoluble covenant between baptized man and woman."
    ],
    keyTextToMemorize: "Sacraments of Healing (Penance, Anointing); Sacraments of Service (Holy Orders, Matrimony).",
    questionIds: ["q-day7-1", "q-day7-2", "q-day7-3", "q-day7-4", "q-day7-5", "q-day7-6", "q-day7-7", "q-day7-8"]
  },
  {
    day: 8,
    title: "The Order of the Mass: Part I (Introductory Rites & Word)",
    subtitle: "Gathering, Penitence, and the Table of God's Word",
    category: "mass",
    estimatedMinutes: 30,
    summary: "Studying the structure and responses of the first half of the Mass: Entrance, Penitential Act, Gloria, Readings, Psalm, Gospel, Homily, Creed, and Universal Prayer.",
    learningPoints: [
      "Introductory Rites gather the faithful as the Mystical Body of Christ.",
      "Penitential Act purifies our hearts through the Confiteor and Kyrie.",
      "Liturgy of the Word feeds the soul from the treasures of Sacred Scripture.",
      "Memorization of congregation responses (e.g., 'And with your spirit', 'Thanks be to God')."
    ],
    keyTextToMemorize: "Priest: 'The Lord be with you.' Response: 'And with your spirit.'",
    questionIds: ["q-day8-1", "q-day8-2", "q-day8-3", "q-day8-4", "q-day8-5", "q-day8-6", "q-day8-7", "q-day8-8"]
  },
  {
    day: 9,
    title: "The Order of the Mass: Part II (Eucharist & Concluding Rites)",
    subtitle: "The Eucharistic Sacrifice, Communion, and Dismissal",
    category: "mass",
    estimatedMinutes: 30,
    summary: "Mastering the sacred heart of the Mass: Preparation of Gifts, Eucharistic Prayer, Consecration, Great Amen, Communion Rite, Agnus Dei, and the Dismissal.",
    learningPoints: [
      "The Eucharistic Prayer offers Christ's one sacrifice on Calvary in an unbloody manner.",
      "The Consecration: Transubstantiation occurs through the words of Christ.",
      "Communion Rite preparation: The Lord's Prayer, Sign of Peace, and Lamb of God.",
      "Concluding Rites send us into the world to bear witness."
    ],
    keyTextToMemorize: "'Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.'",
    questionIds: ["q-day9-1", "q-day9-2", "q-day9-3", "q-day9-4", "q-day9-5", "q-day9-6", "q-day9-7", "q-day9-8"]
  },
  {
    day: 10,
    title: "The Four Last Things & The Virtues",
    subtitle: "Death, Judgment, Heaven, Hell; Theological & Cardinal Virtues",
    category: "doctrine",
    estimatedMinutes: 30,
    summary: "Today we memorize the Four Last Things (Novissima), the 3 Theological Virtues (Faith, Hope, Charity), and the 4 Cardinal Virtues (Prudence, Justice, Fortitude, Temperance).",
    learningPoints: [
      "The Four Last Things: Death, Particular & General Judgment, Heaven, Hell.",
      "Theological Virtues: Infused directly by God (Faith, Hope, Charity).",
      "Cardinal Virtues: The four hinge moral virtues guiding human conduct.",
      "Application to daily spiritual examination and growth."
    ],
    keyTextToMemorize: "Theological: Faith, Hope, Charity. Cardinal: Prudence, Justice, Fortitude, Temperance.",
    questionIds: ["q-day10-1", "q-day10-2", "q-day10-3", "q-day10-4", "q-day10-5", "q-day10-6", "q-day10-7", "q-day10-8"]
  },
  {
    day: 11,
    title: "Precepts of the Church & Holy Days",
    subtitle: "Obligations of the Faithful for Spiritual Nourishment",
    category: "doctrine",
    estimatedMinutes: 30,
    summary: "Mastering the five essential Precepts of the Catholic Church and the universal Holy Days of Obligation.",
    learningPoints: [
      "1. Attend Mass on Sundays and Holy Days of Obligation.",
      "2. Confess sins at least once a year.",
      "3. Receive the Eucharist at least during the Easter season.",
      "4. Observe days of fasting and abstinence established by the Church.",
      "5. Provide for the material needs of the Church."
    ],
    keyTextToMemorize: "The Five Precepts of the Church guarantee the indispensable minimum in prayer and moral effort.",
    questionIds: ["q-day11-1", "q-day11-2", "q-day11-3", "q-day11-4", "q-day11-5", "q-day11-6", "q-day11-7", "q-day11-8"]
  },
  {
    day: 12,
    title: "The Works of Mercy & Gifts of the Holy Spirit",
    subtitle: "Living Charity and Spiritual Wisdom",
    category: "doctrine",
    estimatedMinutes: 30,
    summary: "Memorizing the 7 Corporal Works of Mercy, the 7 Spiritual Works of Mercy, and the 7 Gifts of the Holy Spirit received in Baptism and Confirmation.",
    learningPoints: [
      "Corporal Works of Mercy: Feeding the hungry, clothing the naked, sheltering the homeless, visiting the sick/imprisoned, burying the dead.",
      "Spiritual Works of Mercy: Instructing the ignorant, counseling the doubtful, admonishing sinners, bearing wrongs patiently, forgiving offenses, comforting the afflicted, praying for living and dead.",
      "7 Gifts of the Holy Spirit: Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, Fear of the Lord."
    ],
    keyTextToMemorize: "Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, and Fear of the Lord.",
    questionIds: ["q-day12-1", "q-day12-2", "q-day12-3", "q-day12-4", "q-day12-5", "q-day12-6", "q-day12-7", "q-day12-8"]
  },
  {
    day: 13,
    title: "The Mysteries of the Most Holy Rosary",
    subtitle: "Contemplating the Life of Christ with Mary",
    category: "prayers",
    estimatedMinutes: 30,
    summary: "Memorizing the 20 mysteries of the Holy Rosary across the four groups: Joyful, Luminous, Sorrowful, and Glorious Mysteries.",
    learningPoints: [
      "Joyful Mysteries: Annunciation, Visitation, Nativity, Presentation, Finding in the Temple.",
      "Luminous Mysteries: Baptism in Jordan, Wedding at Cana, Proclamation of Kingdom, Transfiguration, Institution of Eucharist.",
      "Sorrowful Mysteries: Agony in Garden, Scourging at Pillar, Crowning with Thorns, Carrying of Cross, Crucifixion.",
      "Glorious Mysteries: Resurrection, Ascension, Descent of Holy Spirit, Assumption, Coronation of Our Lady."
    ],
    keyTextToMemorize: "The Rosary is a scriptural meditation on the life, death, and glory of our Lord Jesus Christ.",
    questionIds: ["q-day13-1", "q-day13-2", "q-day13-3", "q-day13-4", "q-day13-5", "q-day13-6", "q-day13-7", "q-day13-8"]
  },
  {
    day: 14,
    title: "Grand Comprehensive Review & Mastery Examination",
    subtitle: "30-Minute Synthesis of Prayers, Decalogue, Sacraments & Mass",
    category: "prayers",
    estimatedMinutes: 30,
    summary: "A rigorous 30-minute cumulative exam testing total recall of Chief Prayers, Ten Commandments, Seven Sacraments, and the Order of the Mass.",
    learningPoints: [
      "Synthesizing complete doctrinal and liturgical knowledge.",
      "Reinforcing fast, accurate multiple-choice identification.",
      "Testing retention across all previous 13 days of study."
    ],
    keyTextToMemorize: "Mastery achieved through deliberate daily study and persistent correction of mistakes.",
    questionIds: ["q-day14-1", "q-day14-2", "q-day14-3", "q-day14-4", "q-day14-5", "q-day14-6", "q-day14-7", "q-day14-8", "q-day14-9", "q-day14-10"]
  }
];

export const MASTER_QUESTION_BANK: Record<string, Question> = {
  // --- DAY 1: CHIEF PRAYERS I ---
  "q-day1-1": {
    id: "q-day1-1",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "What are the exact words spoken when making the Sign of the Cross?",
    options: [
      "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      "Glory be to the Father, and to the Son, and to the Holy Ghost. Amen.",
      "In the grace of Jesus Christ, and of God, and of the Spirit. Amen.",
      "Holy God, Holy Mighty One, Holy Immortal One. Amen."
    ],
    correctAnswer: 1,
    explanation: "Option 1 is the universal and ancient formula invoking the Most Holy Trinity.",
    memoryTip: "Remember: Father (forehead), Son (breast), Holy Spirit (left to right shoulder)."
  },
  "q-day1-2": {
    id: "q-day1-2",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "Which petition in the Lord's Prayer immediately follows 'Thy kingdom come'?",
    options: [
      "Give us this day our daily bread",
      "Thy will be done on earth as it is in heaven",
      "And forgive us our trespasses",
      "And lead us not into temptation"
    ],
    correctAnswer: 2,
    explanation: "Option 2 ('Thy will be done on earth as it is in heaven') is the third petition of the Lord's Prayer.",
    memoryTip: "Pater sequence: Name (hallowed) -> Kingdom (come) -> Will (done)."
  },
  "q-day1-3": {
    id: "q-day1-3",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "In the Hail Mary, what is the exact second sentence spoken after 'the Lord is with thee'?",
    options: [
      "Holy Mary, Mother of God, pray for us sinners",
      "Now and at the hour of our death",
      "Blessed art thou among women, and blessed is the fruit of thy womb, Jesus",
      "Full of grace, queen of the angels"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is Saint Elizabeth's inspired salutation from the Gospel of Luke (Luke 1:42).",
    memoryTip: "Gabriel's greeting comes first ('Hail Mary, full of grace...'), then Elizabeth's ('Blessed art thou...')."
  },
  "q-day1-4": {
    id: "q-day1-4",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "How many distinct petitions are contained in the Lord's Prayer?",
    options: [
      "5 petitions",
      "7 petitions",
      "10 petitions",
      "12 petitions"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Lord's Prayer contains exactly 7 petitions (3 directed to God's glory, 4 for human needs).",
    memoryTip: "Think of 7, the biblical number of spiritual completeness."
  },
  "q-day1-5": {
    id: "q-day1-5",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "What is the final petition of the Our Father?",
    options: [
      "Forgive us our trespasses",
      "And lead us not into temptation",
      "But deliver us from evil",
      "Give us this day our daily bread"
    ],
    correctAnswer: 3,
    explanation: "Option 3 ('But deliver us from evil') concludes the seven petitions of the Lord's Prayer.",
    memoryTip: "The prayer culminates in our plea for total deliverance from the Evil One."
  },
  "q-day1-6": {
    id: "q-day1-6",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "Who addressed Mary with the words: 'Hail, full of grace, the Lord is with thee'?",
    options: [
      "The Archangel Michael",
      "The Archangel Raphael",
      "The Archangel Gabriel",
      "Saint John the Baptist"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is correct. Archangel Gabriel spoke these words at the Annunciation (Luke 1:28).",
    memoryTip: "Gabriel announced the Incarnation to Mary."
  },
  "q-day1-7": {
    id: "q-day1-7",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "In the second half of the Hail Mary, what title is Mary explicitly given?",
    options: [
      "Mother of the Church",
      "Mother of God",
      "Queen of Heaven",
      "Tower of David"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'Holy Mary, Mother of God, pray for us sinners...'",
    memoryTip: "The Council of Ephesus (431 AD) affirmed the title Theotokos (Mother of God)."
  },
  "q-day1-8": {
    id: "q-day1-8",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 1,
    question: "What condition does Jesus place on receiving God's forgiveness in the Lord's Prayer?",
    options: [
      "Making an animal offering at the altar",
      "Forgiving those who trespass against us",
      "Fasting for forty days and nights",
      "Reciting seventy psalms"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'and forgive us our trespasses as we forgive those who trespass against us'.",
    memoryTip: "Our receipt of divine mercy is directly linked to our willingness to forgive others."
  },

  // --- DAY 2: CHIEF PRAYERS II ---
  "q-day2-1": {
    id: "q-day2-1",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "What is the complete traditional phrasing of the Glory Be (Gloria Patri)?",
    options: [
      "Glory to God in the highest, and peace to His people on earth.",
      "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      "Praise Father, Son, and Holy Ghost, all creatures here below.",
      "Glory to the Lord Jesus Christ now and forevermore. Amen."
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the traditional Doxology expressing praise to the Trinity through past, present, and eternity.",
    memoryTip: "Beginning -> Now -> Ever shall be -> World without end."
  },
  "q-day2-2": {
    id: "q-day2-2",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "According to the Apostles' Creed, under whom did Jesus suffer and was crucified?",
    options: [
      "Caesar Augustus",
      "King Herod Agrippa",
      "Pontius Pilate",
      "Caiaphas the High Priest"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is correct: 'suffered under Pontius Pilate, was crucified, died and was buried'.",
    memoryTip: "Pontius Pilate grounds Christ's passion in concrete historical time."
  },
  "q-day2-3": {
    id: "q-day2-3",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "In the Apostles' Creed, what happened on the third day after Jesus died and was buried?",
    options: [
      "He ascended directly into heaven",
      "He rose again from the dead",
      "He sent the Holy Spirit upon the Apostles",
      "He appeared on the Mount of Olives"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'on the third day he rose again from the dead'.",
    memoryTip: "Good Friday (1) -> Holy Saturday (2) -> Easter Sunday (3rd day Resurrection)."
  },
  "q-day2-4": {
    id: "q-day2-4",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "Where is Jesus seated after His Ascension according to the Creed?",
    options: [
      "At the right hand of God the Father almighty",
      "Above the cherubim and seraphim",
      "In the heavenly tabernacle with Moses",
      "Upon the throne of King David"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct: 'he ascended into heaven, and is seated at the right hand of God the Father almighty'.",
    memoryTip: "'Right hand' signifies equal power, majesty, and divine authority."
  },
  "q-day2-5": {
    id: "q-day2-5",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "How many articles of faith are traditionally counted in the Apostles' Creed?",
    options: [
      "7 articles",
      "10 articles",
      "12 articles",
      "14 articles"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is correct. Tradition attributes one of the 12 articles of faith to each of the Twelve Apostles.",
    memoryTip: "12 Apostles = 12 articles of the Creed."
  },
  "q-day2-6": {
    id: "q-day2-6",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "What does the Latin word 'Credo' mean at the beginning of the Creed?",
    options: [
      "I hope",
      "I believe",
      "I promise",
      "I love"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'Credo' translates to 'I believe'.",
    memoryTip: "Credo -> Creed -> Belief."
  },
  "q-day2-7": {
    id: "q-day2-7",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "Which of the following lines appears near the conclusion of the Apostles' Creed?",
    options: [
      "The communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting.",
      "Deliver us from all evil and grant us peace in our days.",
      "Holy God, Holy Mighty One, have mercy on us.",
      "May the souls of the faithful departed rest in peace."
    ],
    correctAnswer: 1,
    explanation: "Option 1 summarizes the four closing affirmations regarding the Church, grace, bodily resurrection, and eternity.",
    memoryTip: "Church -> Communion of Saints -> Forgiveness -> Resurrection -> Life Everlasting."
  },
  "q-day2-8": {
    id: "q-day2-8",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 2,
    question: "What does the Creed profess regarding Christ's future return?",
    options: [
      "He will come to dissolve the physical earth in fire",
      "From there he will come to judge the living and the dead",
      "He will establish an earthly empire in Jerusalem",
      "He will return secretly without notice"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'from there he will come to judge the living and the dead'.",
    memoryTip: "The Parousia is the universal judgment of all souls by Christ."
  },

  // --- DAY 3: CHIEF PRAYERS III ---
  "q-day3-1": {
    id: "q-day3-1",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "In the Hail, Holy Queen (Salve Regina), how do we describe our present earthly life?",
    options: [
      "In this garden of delights",
      "Mourning and weeping in this valley of tears",
      "Wandering through a sea of confusion",
      "Resting beside quiet waters"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'to thee do we send up our sighs, mourning and weeping in this valley of tears'.",
    memoryTip: "Valley of tears symbolizes our earthly exile before heavenly home."
  },
  "q-day3-2": {
    id: "q-day3-2",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "What are the two essential motives for sorrow expressed in the Act of Contrition?",
    options: [
      "Fear of human law and shame before friends",
      "Fear of God's just punishments and love of God who is all good",
      "Loss of wealth and physical illness",
      "Boredom with sin and desire for praise"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: imperfect contrition (fear of punishment) and perfect contrition (loving God above all else).",
    memoryTip: "Contrition arises from filial love for God and healthy holy fear of punishment."
  },
  "q-day3-3": {
    id: "q-day3-3",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "In the Act of Contrition, what firm resolution must the penitent make?",
    options: [
      "To read three chapters of scripture daily",
      "To sin no more and to avoid the near occasion of sin",
      "To make a pilgrimage to Rome",
      "To donate all possessions to charity"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the essential purpose of amendment: 'I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasion of sin.'",
    memoryTip: "A valid confession requires a firm purpose not to repeat the sin."
  },
  "q-day3-4": {
    id: "q-day3-4",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "Which saint is traditionally associated with the Marian prayer 'The Memorare'?",
    options: [
      "Saint Thomas Aquinas",
      "Saint Bernard of Clairvaux",
      "Saint Francis of Assisi",
      "Saint Dominic"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Memorare is attributed to St. Bernard of Clairvaux.",
    memoryTip: "Memorare -> St. Bernard of Clairvaux."
  },
  "q-day3-5": {
    id: "q-day3-5",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "What is the opening assertion of confidence in the Memorare?",
    options: [
      "That Mary is the Queen of the highest heavens",
      "That never was it known that anyone who fled to her protection was left unaided",
      "That all angels bow down before the throne of God",
      "That through fasting we obtain every grace"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection... was left unaided.'",
    memoryTip: "'Never was it known' - absolute confidence in maternal intercession."
  },
  "q-day3-6": {
    id: "q-day3-6",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "Which Pope composed the Prayer to Saint Michael the Archangel after a prophetic vision?",
    options: [
      "Pope Saint Gregory the Great",
      "Pope Leo XIII",
      "Pope Pius X",
      "Pope Saint Peter"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Pope Leo XIII composed it in 1886 for spiritual protection.",
    memoryTip: "Leo XIII composed the St. Michael prayer."
  },
  "q-day3-7": {
    id: "q-day3-7",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "In the Prayer to St. Michael, what title is given to the Archangel?",
    options: [
      "Herald of the Incarnation",
      "Prince of the Heavenly Host",
      "Guardian of the Sacred Heart",
      "Patron of the Apostles"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'and do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan...'",
    memoryTip: "Michael leads the heavenly army as Prince of the Heavenly Host."
  },
  "q-day3-8": {
    id: "q-day3-8",
    category: "prayers",
    categoryLabel: "Chief Prayers",
    day: 3,
    question: "What prayer is traditionally recited three times a day (morning, noon, evening) commemorating the Incarnation?",
    options: [
      "The Anima Christi",
      "The Angelus",
      "The Te Deum",
      "The Magnificat"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Angelus is prayed at 6 AM, 12 Noon, and 6 PM to honor the Annunciation and Incarnation.",
    memoryTip: "Angelus Domini nuntiavit Mariae."
  },

  // --- DAY 4: TEN COMMANDMENTS I ---
  "q-day4-1": {
    id: "q-day4-1",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "What is the First Commandment of God?",
    options: [
      "You shall not take the name of the Lord your God in vain.",
      "I am the Lord your God: you shall not have strange Gods before me.",
      "Honor your father and your mother.",
      "Remember to keep holy the Lord's Day."
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the First Commandment, commanding the worship of the one true God alone.",
    memoryTip: "Commandment 1 puts God first above all idols and false gods."
  },
  "q-day4-2": {
    id: "q-day4-2",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "What does the Second Commandment explicitly forbid?",
    options: [
      "Missing Sunday Mass without serious reason",
      "Taking the name of the Lord your God in vain (blasphemy, cursing, false oaths)",
      "Stealing private property",
      "Bearing false witness against a neighbor"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Second Commandment protects the holy reverence due to God's Name.",
    memoryTip: "2nd Commandment = Reverence for God's Name."
  },
  "q-day4-3": {
    id: "q-day4-3",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "How do Catholics primarily fulfill the Third Commandment ('Remember to keep holy the Lord's Day')?",
    options: [
      "By resting from unnecessary servile work and actively participating in the Holy Sacrifice of the Mass",
      "By doing 8 hours of community service",
      "By reading the entire New Testament every Sunday",
      "By fasting from all solid foods until sundown"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. Catholics keep the Lord's Day holy through Sunday Mass attendance and holy rest from servile labor.",
    memoryTip: "3rd Commandment = Sunday Mass & Holy Rest."
  },
  "q-day4-4": {
    id: "q-day4-4",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "What is the Fourth Commandment?",
    options: [
      "You shall not kill.",
      "Honor your father and your mother.",
      "You shall not commit adultery.",
      "You shall not steal."
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Fourth Commandment, head of the second tablet governing family and social order.",
    memoryTip: "Commandment 4 honors parents and legitimate civil/spiritual authority."
  },
  "q-day4-5": {
    id: "q-day4-5",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "Which grave sin is a direct violation of the First Commandment?",
    options: [
      "Idolatry, divination, and sorcery/superstition",
      "Perjury in a civil court",
      "Slander and gossip",
      "Theft of ecclesiastical vessels"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. Idolatry and superstition attribute divine power to created things, violating the 1st Commandment.",
    memoryTip: "First Commandment = Only God is divine."
  },
  "q-day4-6": {
    id: "q-day4-6",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "On which mountain did God deliver the Ten Commandments to Moses on stone tablets?",
    options: [
      "Mount Carmel",
      "Mount Sinai (Mount Horeb)",
      "Mount Tabor",
      "Mount of Olives"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. God revealed the Decalogue to Moses on Mount Sinai (Exodus 20).",
    memoryTip: "Moses received the Law on Mount Sinai."
  },
  "q-day4-7": {
    id: "q-day4-7",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "What is the theological distinction between the first 3 commandments and the last 7?",
    options: [
      "The first 3 are optional, while the last 7 are binding",
      "The first 3 relate to our duties toward God; the last 7 relate to our duties toward our neighbor",
      "The first 3 apply only to clergy; the last 7 apply to the laity",
      "The first 3 were repealed in the New Covenant"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Tablet I (1-3) governs love of God; Tablet II (4-10) governs love of neighbor.",
    memoryTip: "Table 1 (1-3) = God; Table 2 (4-10) = Neighbor."
  },
  "q-day4-8": {
    id: "q-day4-8",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 4,
    question: "What promise is specifically attached to keeping the Fourth Commandment in Sacred Scripture?",
    options: [
      "You will receive boundless earthly riches",
      "That your days may be long in the land the Lord your God gives you",
      "You will never suffer physical illness",
      "You will become a ruler over nations"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct (Exodus 20:12, Ephesians 6:2-3). It is the first commandment with an explicit promise.",
    memoryTip: "Honor father and mother -> Long life and blessing."
  },

  // --- DAY 5: TEN COMMANDMENTS II ---
  "q-day5-1": {
    id: "q-day5-1",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What is the Fifth Commandment?",
    options: [
      "You shall not commit adultery.",
      "You shall not steal.",
      "You shall not kill.",
      "You shall not bear false witness."
    ],
    correctAnswer: 3,
    explanation: "Option 3 is the Fifth Commandment, commanding reverence for the sacredness of human life from conception to natural death.",
    memoryTip: "Commandment 5 = Protect human life ('You shall not kill')."
  },
  "q-day5-2": {
    id: "q-day5-2",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "Which two commandments specifically guard the sanctity of marriage and sexual purity in deed and in thought?",
    options: [
      "The 4th and 5th Commandments",
      "The 6th and 9th Commandments",
      "The 7th and 8th Commandments",
      "The 1st and 3rd Commandments"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: The 6th ('You shall not commit adultery') and the 9th ('You shall not covet your neighbor's wife').",
    memoryTip: "6th (chastity in action) & 9th (purity in heart/desire)."
  },
  "q-day5-3": {
    id: "q-day5-3",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What is the Seventh Commandment?",
    options: [
      "You shall not steal.",
      "You shall not bear false witness against your neighbor.",
      "You shall not covet your neighbor's goods.",
      "Remember to keep holy the Lord's Day."
    ],
    correctAnswer: 1,
    explanation: "Option 1 is the Seventh Commandment: 'You shall not steal.' It protects private property, justice, and fair labor.",
    memoryTip: "7th = Respect for others' property ('You shall not steal')."
  },
  "q-day5-4": {
    id: "q-day5-4",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What does the Eighth Commandment ('You shall not bear false witness against your neighbor') require of us?",
    options: [
      "To always speak with flowery rhetoric",
      "To be truthful in word and deed, avoiding lying, slander, detraction, and calumny",
      "To agree with everything others say",
      "To reveal every secret to the public"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The 8th Commandment binds us to truth, forbids lying, detraction, calumny, and rash judgment.",
    memoryTip: "8th Commandment = Love and defend the truth."
  },
  "q-day5-5": {
    id: "q-day5-5",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What is the difference between the 7th and the 10th Commandment?",
    options: [
      "The 7th forbids the external act of taking another's property; the 10th forbids the internal greedy coveting of another's goods",
      "The 7th applies only to animals; the 10th applies to money",
      "The 7th is a civil law; the 10th is a liturgical custom",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. The 7th governs external theft, while the 10th purifies the interior heart from envy and avarice.",
    memoryTip: "7 = Action (Stealing), 10 = Interior desire (Coveting goods)."
  },
  "q-day5-6": {
    id: "q-day5-6",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What did Jesus proclaim as the Greatest Commandment when questioned by the Pharisees (Matthew 22:37)?",
    options: [
      "Build a magnificent temple in Jerusalem",
      "You shall love the Lord your God with all your heart, with all your soul, and with all your mind",
      "Give forty percent of your income to the poor",
      "Offer incense every morning"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the First and Greatest Commandment of Love (the Shema Yisrael fulfilled in Christ).",
    memoryTip: "Heart + Soul + Mind = Total love of God."
  },
  "q-day5-7": {
    id: "q-day5-7",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What is the Second Great Commandment proclaimed by Christ, which is like the first?",
    options: [
      "You shall judge all nations with righteousness",
      "You shall fast on all Fridays",
      "You shall love your neighbor as yourself",
      "You shall build monasteries across the world"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is correct: 'You shall love your neighbor as yourself.' On these two commandments hang all the Law and the Prophets.",
    memoryTip: "Love God above all, and love neighbor as yourself."
  },
  "q-day5-8": {
    id: "q-day5-8",
    category: "commandments",
    categoryLabel: "Ten Commandments",
    day: 5,
    question: "What is the sin of 'calumny' (or slander) forbidden by the Eighth Commandment?",
    options: [
      "Revealing someone's hidden real faults without just reason",
      "Making false statements that harm another person's good reputation",
      "Borrowing an object without returning it",
      "Speaking God's name without reverence"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Calumny is telling untrue falsehoods to destroy someone's reputation.",
    memoryTip: "Calumny = Spreading lies/falsehoods about someone."
  },

  // --- DAY 6: SACRAMENTS I ---
  "q-day6-1": {
    id: "q-day6-1",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "What is the definition of a Sacrament in the Catholic Church?",
    options: [
      "A symbolic human ritual created by bishops in the Middle Ages",
      "An outward sign instituted by Christ to give inward sanctifying grace",
      "A personal promise made privately in one's mind",
      "A legal agreement between church members"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the classic Baltimore/Catechism definition: An outward sign instituted by Christ to give grace.",
    memoryTip: "3 components: Outward Sign + Instituted by Christ + Gives Grace."
  },
  "q-day6-2": {
    id: "q-day6-2",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "Which are the three Sacraments of Christian Initiation?",
    options: [
      "Baptism, Penance, and Holy Eucharist",
      "Baptism, Confirmation, and Holy Eucharist",
      "Baptism, Confirmation, and Holy Orders",
      "Confirmation, Matrimony, and Anointing of the Sick"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Baptism, Confirmation, and Eucharist initiate a believer fully into the Body of Christ.",
    memoryTip: "Initiation = Born (Baptism), Strengthened (Confirmation), Fed (Eucharist)."
  },
  "q-day6-3": {
    id: "q-day6-3",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "What is the essential 'Matter' and 'Form' for the Sacrament of Baptism?",
    options: [
      "Matter: Holy Oil; Form: 'Receive the Holy Spirit.'",
      "Matter: Natural Water; Form: 'I baptize you in the name of the Father, and of the Son, and of the Holy Spirit.'",
      "Matter: Unleavened Bread; Form: 'This is my Body.'",
      "Matter: Imposition of hands; Form: 'Be sealed with Christ.'"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The matter is water (immersion or pouring) and the form is the Trinitarian formula commanded by Jesus (Matthew 28:19).",
    memoryTip: "Water + Trinitarian Words = Valid Baptism."
  },
  "q-day6-4": {
    id: "q-day6-4",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "What permanent spiritual mark is imprinted upon the soul in Baptism, Confirmation, and Holy Orders?",
    options: [
      "A visible halo",
      "An indelible character (spiritual seal) that can never be repeated or removed",
      "An ecclesiastical certificate",
      "A temporary blessing lasting seven years"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. These three sacraments impart an indelible sacramental character; hence they cannot be repeated.",
    memoryTip: "Indelible Character = Baptism, Confirmation, Holy Orders."
  },
  "q-day6-5": {
    id: "q-day6-5",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "What is the essential matter used by the Bishop in the Sacrament of Confirmation?",
    options: [
      "Natural spring water",
      "Sacred Chrism (consecrated olive oil scented with balsam)",
      "Unleavened wheat wafer",
      "White baptismal garment"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Sacred Chrism represents the fragrance of Christ and the anointing of the Holy Spirit.",
    memoryTip: "Confirmation = Sacred Chrism oil on the forehead."
  },
  "q-day6-6": {
    id: "q-day6-6",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "What theological term describes the conversion of the entire substance of bread and wine into the Body and Blood of Christ?",
    options: [
      "Consubstantiation",
      "Symbolization",
      "Transubstantiation",
      "Metamorphosis"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is correct. Transubstantiation affirms that the substance becomes truly Christ, while outward species/appearances remain.",
    memoryTip: "Trans (change) + Substantia (substance) = Transubstantiation."
  },
  "q-day6-7": {
    id: "q-day6-7",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "Who is the ordinary minister of the Sacrament of Confirmation in the Latin Rite?",
    options: [
      "The Bishop",
      "The Deacon",
      "Any baptized Catholic",
      "The parish catechist"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. The Bishop is the original and ordinary minister of Confirmation, linking the confirmandi to the Apostles.",
    memoryTip: "Confirmation ordinary minister = Bishop."
  },
  "q-day6-8": {
    id: "q-day6-8",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 6,
    question: "Why is the Holy Eucharist called 'the Source and Summit of the Christian life' (Lumen Gentium)?",
    options: [
      "Because it takes place at the highest point of the church building",
      "Because it contains Christ Himself, the source of all grace and the goal of our faith",
      "Because it was the last sacrament to be invented",
      "Because it is only celebrated on mountains"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Eucharist contains Christ truly, substantially, and sacramentally present.",
    memoryTip: "The Eucharist contains Jesus Himself, not merely a gift of grace."
  },

  // --- DAY 7: SACRAMENTS II ---
  "q-day7-1": {
    id: "q-day7-1",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "What are the two Sacraments of Healing in the Catholic Church?",
    options: [
      "Baptism and Confirmation",
      "Penance (Reconciliation) and Anointing of the Sick",
      "Holy Orders and Holy Matrimony",
      "Holy Eucharist and Baptism"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Penance heals spiritual wounds and sin; Anointing provides healing and fortitude in serious physical illness.",
    memoryTip: "Healing = Penance (soul) & Anointing of the Sick (body & soul)."
  },
  "q-day7-2": {
    id: "q-day7-2",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "What are the four required actions for a complete and worthy Sacrament of Penance?",
    options: [
      "Contrition, Confession, Satisfaction (Penance), and Absolution",
      "Fasting, Almsgiving, Pilgrimage, and Meditation",
      "Reading the Bible, lighting candles, singing, and greeting the priest",
      "Baptism, confirmation, blessing, and dismissal"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. Three acts by the penitent (contrition, confession, satisfaction) + priestly absolution.",
    memoryTip: "CCSA: Contrition -> Confession -> Satisfaction -> Absolution."
  },
  "q-day7-3": {
    id: "q-day7-3",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "What is the absolute obligation of the Priest regarding sins heard in Confession called?",
    options: [
      "The Clerical Privilege",
      "The Seal of Confession (Sacramental Seal)",
      "The Canon Law Exception",
      "The Pastor's Discretion"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Seal of Confession is inviolable; under penalty of excommunication, a priest may never reveal any sin heard in confession.",
    memoryTip: "The Sacramental Seal can NEVER be broken under any circumstance."
  },
  "q-day7-4": {
    id: "q-day7-4",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "Who can validly receive the Sacrament of the Anointing of the Sick?",
    options: [
      "Anyone who has a minor cold or headache",
      "Any baptized Catholic who begins to be in danger of death from sickness or old age",
      "Only persons after physical death has occurred",
      "Only ordained bishops"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct (James 5:14-15). It is administered to the living facing grave illness, serious surgery, or frail old age.",
    memoryTip: "Anointing is for the living facing serious illness or danger of death."
  },
  "q-day7-5": {
    id: "q-day7-5",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "What are the three degrees of the Sacrament of Holy Orders?",
    options: [
      "Monk, Abbot, Cardinal",
      "Deacon (Diaconate), Priest (Presbyterate), Bishop (Episcopate)",
      "Lector, Acolyte, Cantor",
      "Pope, Patriarch, Monsignor"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The three holy orders are Diaconate (service), Presbyterate (priesthood), and Episcopate (fullness of priesthood).",
    memoryTip: "Deacon -> Priest -> Bishop."
  },
  "q-day7-6": {
    id: "q-day7-6",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "Who are the actual ministers of the Sacrament of Holy Matrimony in the Latin Church?",
    options: [
      "The presiding priest or deacon alone",
      "The bride and groom themselves (conferring grace mutually through their consent)",
      "The best man and maid of honor",
      "The parents of the bride"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The baptized spouses minister the sacrament to each other; the priest/deacon witnesses and blesses on behalf of the Church.",
    memoryTip: "The spouses minister Matrimony to one another through mutual consent."
  },
  "q-day7-7": {
    id: "q-day7-7",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "What are the two essential properties and ends of Christian Matrimony?",
    options: [
      "Wealth and social status",
      "Unity (one man with one woman) and Indissolubility (until death), ordered to the good of the spouses and the procreation of children",
      "Temporary contract and mutual convenience",
      "Legal partnership and tax benefits"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct (Catechism 1601). Marriage is lifelong, faithful, fruitful, and indissoluble.",
    memoryTip: "Unity + Indissolubility + Openness to Life."
  },
  "q-day7-8": {
    id: "q-day7-8",
    category: "sacraments",
    categoryLabel: "Seven Sacraments",
    day: 7,
    question: "Who alone has the authority to validly ordain deacons, priests, and bishops?",
    options: [
      "A parish council",
      "A validly consecrated Catholic Bishop in apostolic succession",
      "Any senior priest",
      "A panel of theology professors"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Only a Bishop in apostolic succession has the power to impart Holy Orders through the laying on of hands.",
    memoryTip: "Only Bishops can confer Holy Orders."
  },

  // --- DAY 8: ORDER OF THE MASS I ---
  "q-day8-1": {
    id: "q-day8-1",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "What are the four main overarching parts of the Holy Sacrifice of the Mass in order?",
    options: [
      "1. Introductory Rites, 2. Liturgy of the Word, 3. Liturgy of the Eucharist, 4. Concluding Rites",
      "1. Homily, 2. Offertory, 3. Readings, 4. Dismissal",
      "1. Confession, 2. Rosary, 3. Communion, 4. Blessing",
      "1. Procession, 2. Sermon, 3. Collection, 4. Benediction"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is the official four-part structure of the Roman Missal.",
    memoryTip: "Introductory Rites -> Liturgy of the Word -> Liturgy of the Eucharist -> Concluding Rites."
  },
  "q-day8-2": {
    id: "q-day8-2",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "When the priest greets the people with 'The Lord be with you', what is the exact response?",
    options: [
      "And also with you",
      "And with your spirit",
      "Praise be to God",
      "Amen, Alleluia"
    ],
    correctAnswer: 2,
    explanation: "Option 2 ('And with your spirit' / Et cum spiritu tuo) addresses the spirit of the priest ordained for Christ.",
    memoryTip: "'Et cum spiritu tuo' -> 'And with your spirit'."
  },
  "q-day8-3": {
    id: "q-day8-3",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "What ancient Greek invocation meaning 'Lord, have mercy' is retained in the Penitential Act?",
    options: [
      "Maranatha",
      "Kyrie, eleison",
      "Hosanna in excelsis",
      "Agios o Theos"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. 'Kyrie, eleison; Christe, eleison; Kyrie, eleison' is Greek for 'Lord have mercy; Christ have mercy'.",
    memoryTip: "Kyrie eleison = Lord have mercy."
  },
  "q-day8-4": {
    id: "q-day8-4",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "From which testament of the Bible is the First Reading at Sunday Mass usually taken (outside the Easter Season)?",
    options: [
      "The Old Testament",
      "The Epistles of Saint Paul",
      "The Book of Revelation",
      "The Gospel of Saint John"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. The First Reading is from the Old Testament (prophets, wisdom, or law), paired with the Gospel.",
    memoryTip: "1st Reading = Old Testament; 2nd Reading = New Testament Epistles."
  },
  "q-day8-5": {
    id: "q-day8-5",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "What word of praise is omitted from the Mass throughout the penitential season of Lent?",
    options: [
      "Amen",
      "Alleluia",
      "Holy",
      "Hosanna"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. 'Alleluia' (Praise the Lord) is set aside during Lent until the joy of the Easter Vigil.",
    memoryTip: "No Alleluia during Lent."
  },
  "q-day8-6": {
    id: "q-day8-6",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "What posture do the faithful adopt during the proclamation of the Holy Gospel?",
    options: [
      "Sitting in quiet meditation",
      "Standing in reverence and attentiveness",
      "Kneeling with eyes closed",
      "Prostrating in the aisle"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Standing shows active reverence for Christ who speaks directly in the Gospel.",
    memoryTip: "Stand for the Gospel."
  },
  "q-day8-7": {
    id: "q-day8-7",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "When the priest introduces the Gospel ('A reading from the holy Gospel according to...'), what is the congregation's response?",
    options: [
      "Glory to you, O Lord",
      "Thanks be to God",
      "Praise to you, Lord Jesus Christ",
      "Blessed be God forever"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct: 'Glory to you, O Lord' while tracing the small cross on forehead, lips, and breast.",
    memoryTip: "Before Gospel: 'Glory to you, O Lord'. After Gospel: 'Praise to you, Lord Jesus Christ'."
  },
  "q-day8-8": {
    id: "q-day8-8",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 8,
    question: "What is the concluding response of the congregation after the 1st and 2nd Scripture Readings?",
    options: [
      "Amen",
      "Thanks be to God",
      "Praise to the Lord",
      "Lord hear our prayer"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Reader: 'The word of the Lord.' -> All: 'Thanks be to God.' (Deo gratias).",
    memoryTip: "Word of the Lord -> Thanks be to God."
  },

  // --- DAY 9: ORDER OF THE MASS II ---
  "q-day9-1": {
    id: "q-day9-1",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "In the Preface dialogue, when the priest says 'Lift up your hearts', what do the faithful reply?",
    options: [
      "Lord hear our prayer",
      "We lift them up to the Lord",
      "It is right and just",
      "Holy, Holy, Holy"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'Sursum corda' -> 'Habemus ad Dominum' ('We lift them up to the Lord').",
    memoryTip: "Lift up your hearts -> We lift them up to the Lord."
  },
  "q-day9-2": {
    id: "q-day9-2",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "What is the invocation of the Holy Spirit upon the bread and wine called?",
    options: [
      "The Anamnesis",
      "The Epiclesis",
      "The Doxology",
      "The Sanctus"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Epiclesis (calling down) is the prayer extending hands over the gifts asking the Holy Spirit to transform them.",
    memoryTip: "Epiclesis = Calling down the Holy Spirit."
  },
  "q-day9-3": {
    id: "q-day9-3",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "What are the Words of Consecration over the bread spoken by the priest in persona Christi?",
    options: [
      "This represents the spirit of Jesus Christ",
      "Take this, all of you, and eat of it, for this is my Body, which will be given up for you.",
      "May this bread be blessed in memory of the Last Supper",
      "Eat this bread in peace with one another"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the form of the Eucharist: 'Take this, all of you, and eat of it, for this is my Body...'",
    memoryTip: "Christ's exact words at the Last Supper."
  },
  "q-day9-4": {
    id: "q-day9-4",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "What is the great climax and affirmation of the Eucharistic Prayer where the faithful sing the most important word of the liturgy?",
    options: [
      "The Opening Hymn",
      "The Great Amen (after the Doxology)",
      "The Sign of Peace",
      "The Final Blessing"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The Great Amen affirms the entire Eucharistic sacrifice offered to the Father.",
    memoryTip: "Through Him, with Him, in Him... -> The Great AMEN!"
  },
  "q-day9-5": {
    id: "q-day9-5",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "What prayer immediately precedes the reception of Holy Communion echoing the Roman Centurion (Matthew 8:8)?",
    options: [
      "Glory be to the Father...",
      "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.",
      "Saint Michael the Archangel, defend us in battle...",
      "Remember, O most gracious Virgin Mary..."
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the centurion's prayer of humility and faith before Christ.",
    memoryTip: "'Lord, I am not worthy that you should enter under my roof...'"
  },
  "q-day9-6": {
    id: "q-day9-6",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "What title is chanted during the Fraction of the Bread: '___ of God, you take away the sins of the world'?",
    options: [
      "Lion",
      "Lamb",
      "King",
      "Son"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: Agnus Dei ('Lamb of God, you take away the sins of the world, have mercy on us / grant us peace').",
    memoryTip: "Agnus Dei = Lamb of God."
  },
  "q-day9-7": {
    id: "q-day9-7",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "When receiving Holy Communion on the tongue or in hand, what single word does the communicant say in response to 'The Body of Christ'?",
    options: [
      "Thank you",
      "Amen",
      "I believe",
      "Praise God"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'Amen' signifies 'I believe it is true; I profess Christ's real presence.'",
    memoryTip: "'The Body of Christ.' -> 'Amen.'"
  },
  "q-day9-8": {
    id: "q-day9-8",
    category: "mass",
    categoryLabel: "Order of the Mass",
    day: 9,
    question: "What is the final dismissal spoken by the deacon or priest at the end of Mass?",
    options: [
      "The meeting is adjourned",
      "Go forth, the Mass is ended (or 'Go and announce the Gospel of the Lord') -> All: 'Thanks be to God'",
      "Have a safe journey home",
      "May your day be filled with peace"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the liturgical dismissal ('Ite, missa est'), sending us on Christ's mission into the world.",
    memoryTip: "Ite, missa est -> Thanks be to God."
  },

  // --- DAY 10: DOCTRINE & VIRTUES ---
  "q-day10-1": {
    id: "q-day10-1",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "What are the traditional Four Last Things (Novissima) of human destiny?",
    options: [
      "Birth, Youth, Adulthood, Old Age",
      "Death, Judgment, Heaven, Hell",
      "Faith, Hope, Love, Truth",
      "Creation, Flood, Exile, Restoration"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: Death, Judgment (Particular and Final), Heaven (Purgatory transition), and Hell.",
    memoryTip: "Four Last Things = Death, Judgment, Heaven, Hell."
  },
  "q-day10-2": {
    id: "q-day10-2",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "What are the three Theological Virtues infused by God into the soul at Baptism?",
    options: [
      "Prudence, Justice, Fortitude",
      "Faith, Hope, and Charity (Love)",
      "Poverty, Chastity, and Obedience",
      "Wisdom, Knowledge, and Understanding"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct (1 Corinthians 13:13). Faith, Hope, and Charity relate directly to God.",
    memoryTip: "Theological Virtues = Faith, Hope, Charity (Love)."
  },
  "q-day10-3": {
    id: "q-day10-3",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "What are the four Cardinal (hinge) Virtues?",
    options: [
      "Joy, Peace, Patience, Kindness",
      "Prudence, Justice, Fortitude, and Temperance",
      "Faith, Fasting, Prayer, Almsgiving",
      "Humility, Generosity, Meekness, Zeal"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. 'Cardo' means hinge; all human moral virtues hinge upon Prudence, Justice, Fortitude, and Temperance.",
    memoryTip: "PJFT: Prudence, Justice, Fortitude, Temperance."
  },
  "q-day10-4": {
    id: "q-day10-4",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "Which virtue is defined as 'discerning our true good in every circumstance and choosing the right means of achieving it'?",
    options: [
      "Fortitude",
      "Prudence",
      "Temperance",
      "Justice"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is Prudence (auriga virtutum - the charioteer of the virtues).",
    memoryTip: "Prudence directs practical reason to good choices."
  },
  "q-day10-5": {
    id: "q-day10-5",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "Which Cardinal Virtue ensures firmness in difficulties and constancy in the pursuit of the good?",
    options: [
      "Fortitude (Courage)",
      "Temperance",
      "Justice",
      "Prudence"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is Fortitude, enabling endurance against fear, persecution, and death.",
    memoryTip: "Fortitude = Courage and spiritual strength."
  },
  "q-day10-6": {
    id: "q-day10-6",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "Which Theological Virtue remains for all eternity in Heaven?",
    options: [
      "Faith",
      "Hope",
      "Charity (Love)",
      "All three disappear"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is correct. Faith becomes sight, Hope becomes possession, but Charity/Love endures forever (1 Cor 13:13).",
    memoryTip: "The greatest of these is Charity."
  },
  "q-day10-7": {
    id: "q-day10-7",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "What is the Cardinal Virtue of Temperance?",
    options: [
      "Giving everyone their strict legal rights",
      "Moderating the attraction of pleasures and providing balance in the use of created goods",
      "Taking bold physical risks",
      "Studying philosophy books"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Temperance masters instincts and keeps desires within honorable bounds.",
    memoryTip: "Temperance = Moderation and self-mastery."
  },
  "q-day10-8": {
    id: "q-day10-8",
    category: "doctrine",
    categoryLabel: "Doctrine & Virtues",
    day: 10,
    question: "What is the Particular Judgment?",
    options: [
      "The judgment of all nations collectively at the end of time",
      "The eternal retribution which each soul receives immediately at death in reference to its faith and works",
      "A trial conducted by the civil courts",
      "An annual assessment by a bishop"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Immediately upon bodily death, each individual soul is judged by Christ (Particular Judgment).",
    memoryTip: "Particular Judgment happens immediately at death."
  },

  // --- DAY 11: PRECEPTS OF THE CHURCH ---
  "q-day11-1": {
    id: "q-day11-1",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "What is the First Precept of the Catholic Church?",
    options: [
      "You shall attend Mass on Sundays and holy days of obligation and rest from servile labor.",
      "You shall fast during the entire month of August.",
      "You shall read 10 pages of theology daily.",
      "You shall make a vow of perpetual silence."
    ],
    correctAnswer: 1,
    explanation: "Option 1 is the 1st Precept, sanctifying the day commemorating the Lord's Resurrection.",
    memoryTip: "1st Precept = Mass on Sundays and Holy Days."
  },
  "q-day11-2": {
    id: "q-day11-2",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "How often does the Second Precept require Catholics to confess their grave sins?",
    options: [
      "At least once a month",
      "At least once a year",
      "Every five years",
      "Only on one's deathbed"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'You shall confess your sins at least once a year.' (especially if conscious of mortal sin).",
    memoryTip: "2nd Precept = Confession at least once a year."
  },
  "q-day11-3": {
    id: "q-day11-3",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "According to the Third Precept, during which liturgical season is receiving Holy Communion strictly mandatory at minimum?",
    options: [
      "During Advent",
      "At least during the Easter season (The Easter Duty)",
      "On Pentecost Sunday only",
      "During the month of November"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the 'Easter Duty', requiring reception of Holy Communion in a state of grace during the Easter season.",
    memoryTip: "3rd Precept = Easter Duty Eucharist."
  },
  "q-day11-4": {
    id: "q-day11-4",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "What does the Fourth Precept of the Church require regarding Fasting and Abstinence?",
    options: [
      "To observe the days of fasting and abstinence established by the Church (such as Ash Wednesday and Good Friday)",
      "To abstain from all water for 40 consecutive days",
      "To eat only bread and water throughout the whole year",
      "To fast on every Tuesday"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. We observe established penitential days (fasting on Ash Wednesday & Good Friday, abstinence from meat on Fridays).",
    memoryTip: "4th Precept = Fast & Abstinence."
  },
  "q-day11-5": {
    id: "q-day11-5",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "What is the Fifth Precept of the Church?",
    options: [
      "You shall become an ordained priest",
      "You shall help to provide for the needs of the Church according to your abilities",
      "You shall build a new church building every decade",
      "You shall wear formal clerical robes"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. The faithful assist with material needs, charitable works, and support of pastors.",
    memoryTip: "5th Precept = Support the Church's needs."
  },
  "q-day11-6": {
    id: "q-day11-6",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "Which Marian solemnity celebrated on August 15th is a universal Holy Day of Obligation?",
    options: [
      "The Annunciation",
      "The Assumption of the Blessed Virgin Mary into Heaven",
      "The Presentation in the Temple",
      "Our Lady of Mount Carmel"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Solemnity of the Assumption (August 15).",
    memoryTip: "August 15 = Assumption of Mary."
  },
  "q-day11-7": {
    id: "q-day11-7",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "On which date is the Solemnity of All Saints celebrated as a Holy Day of Obligation?",
    options: [
      "December 25th",
      "November 1st",
      "January 1st",
      "March 19th"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. November 1st is All Saints Day.",
    memoryTip: "Nov 1 = All Saints Day."
  },
  "q-day11-8": {
    id: "q-day11-8",
    category: "doctrine",
    categoryLabel: "Precepts of the Church",
    day: 11,
    question: "Which solemnity on December 8th celebrates Mary being preserved from original sin from the first instant of her conception?",
    options: [
      "The Immaculate Conception",
      "The Nativity of the Blessed Virgin",
      "The Visitation",
      "The Assumption"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. December 8th is the Solemnity of the Immaculate Conception.",
    memoryTip: "Dec 8 = Immaculate Conception."
  },

  // --- DAY 12: WORKS OF MERCY & GIFTS ---
  "q-day12-1": {
    id: "q-day12-1",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "Which of the following is one of the 7 Corporal Works of Mercy?",
    options: [
      "Counseling the doubtful",
      "Instructing the ignorant",
      "Feeding the hungry",
      "Admonishing the sinner"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is a Corporal Work of Mercy (bodily aid based on Matthew 25:35-40). The others are Spiritual Works.",
    memoryTip: "Corporal = Body (Food, Drink, Clothing, Shelter, Sick, Imprisoned, Burial)."
  },
  "q-day12-2": {
    id: "q-day12-2",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "Which of the following is one of the 7 Spiritual Works of Mercy?",
    options: [
      "Giving drink to the thirsty",
      "Sheltering the homeless",
      "Forgiving offenses willingly and bearing wrongs patiently",
      "Burying the dead"
    ],
    correctAnswer: 3,
    explanation: "Option 3 is a Spiritual Work of Mercy aimed at the spiritual needs and eternal salvation of neighbor.",
    memoryTip: "Spiritual Works = Mind & Soul (Teach, Counsel, Admonish, Forgive, Bear Wrongs, Comfort, Pray)."
  },
  "q-day12-3": {
    id: "q-day12-3",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "How many Gifts of the Holy Spirit are enumerated by the Prophet Isaiah (Isaiah 11:2)?",
    options: [
      "3 gifts",
      "7 gifts",
      "10 gifts",
      "12 gifts"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. There are 7 Gifts of the Holy Spirit.",
    memoryTip: "7 Gifts of the Holy Spirit."
  },
  "q-day12-4": {
    id: "q-day12-4",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "Which Gift of the Holy Spirit gives us a loving filial affection and deep reverence toward God as our loving Father?",
    options: [
      "Fortitude",
      "Piety (Reverence)",
      "Counsel",
      "Knowledge"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is Piety, which fills the heart with tender affection for God and reverence for sacred things.",
    memoryTip: "Piety = Filial love for God."
  },
  "q-day12-5": {
    id: "q-day12-5",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "Which Gift of the Holy Spirit enables us to see the world and all creation from God's divine perspective?",
    options: [
      "Wisdom (Sapientia)",
      "Fear of the Lord",
      "Fortitude",
      "Human ingenuity"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is Wisdom, the highest gift of the Holy Spirit tasting divine things.",
    memoryTip: "Wisdom = Divine taste and perspective."
  },
  "q-day12-6": {
    id: "q-day12-6",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "What does the Gift of the 'Fear of the Lord' (Filial Fear) actually mean?",
    options: [
      "Being terrified that God wants to destroy us",
      "A profound holy reverence and dread of offending God because He is so good and loving",
      "Fear of ghosts and earthly monsters",
      "Despair of salvation"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Filial fear is the loving dread of ever separating oneself from our beloved Heavenly Father.",
    memoryTip: "Holy Fear = Deep reverence and dread of sin."
  },
  "q-day12-7": {
    id: "q-day12-7",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "What is the final Spiritual Work of Mercy that encompasses both our earthly community and souls in Purgatory?",
    options: [
      "To criticize public figures",
      "To pray for the living and the dead",
      "To build physical stone tombs",
      "To collect antique relics"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: Praying for the living and the dead.",
    memoryTip: "Pray for the living and the holy souls in Purgatory."
  },
  "q-day12-8": {
    id: "q-day12-8",
    category: "doctrine",
    categoryLabel: "Works of Mercy",
    day: 12,
    question: "Which Gift of the Holy Spirit guides the soul in making good moral choices and advising others in difficult situations?",
    options: [
      "Counsel (Right Judgment)",
      "Fear of the Lord",
      "Temperance",
      "Zeal"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is Counsel, prompting prompt and right moral judgment in concrete circumstances.",
    memoryTip: "Counsel = Right Judgment in moral action."
  },

  // --- DAY 13: ROSARY MYSTERIES ---
  "q-day13-1": {
    id: "q-day13-1",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the First Joyful Mystery of the Holy Rosary?",
    options: [
      "The Visitation",
      "The Annunciation",
      "The Nativity",
      "The Presentation in the Temple"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Annunciation of the Lord by the Angel Gabriel to the Virgin Mary.",
    memoryTip: "Joyful 1 = Annunciation."
  },
  "q-day13-2": {
    id: "q-day13-2",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the First Sorrowful Mystery of the Holy Rosary?",
    options: [
      "The Scourging at the Pillar",
      "The Agony in the Garden of Gethsemane",
      "The Crowning with Thorns",
      "The Carrying of the Cross"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Agony in Gethsemane where Christ sweated drops of blood in prayer.",
    memoryTip: "Sorrowful 1 = Agony in the Garden."
  },
  "q-day13-3": {
    id: "q-day13-3",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the First Glorious Mystery of the Holy Rosary?",
    options: [
      "The Ascension of Jesus",
      "The Resurrection of Jesus from the dead",
      "The Descent of the Holy Spirit",
      "The Assumption of Mary"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the glorious Resurrection of Jesus Christ on the third day.",
    memoryTip: "Glorious 1 = The Resurrection."
  },
  "q-day13-4": {
    id: "q-day13-4",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "Which Pope instituted the Luminous Mysteries (Mysteries of Light) in 2002?",
    options: [
      "Pope Saint Pius X",
      "Pope Saint John Paul II (in Rosarium Virginis Mariae)",
      "Pope Benedict XVI",
      "Pope Leo XIII"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. St. John Paul II introduced the 5 Luminous Mysteries highlighting Christ's public ministry.",
    memoryTip: "St. John Paul II -> Luminous Mysteries."
  },
  "q-day13-5": {
    id: "q-day13-5",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the Second Luminous Mystery where Christ performed His first public miracle?",
    options: [
      "The Baptism in the Jordan",
      "The Wedding at Cana",
      "The Proclamation of the Kingdom",
      "The Transfiguration"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Wedding at Cana, turning water into wine at Mary's intercession.",
    memoryTip: "Luminous 2 = Wedding at Cana."
  },
  "q-day13-6": {
    id: "q-day13-6",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the Fifth Sorrowful Mystery of the Holy Rosary?",
    options: [
      "The Scourging at the Pillar",
      "The Crucifixion and Death of Jesus",
      "The Finding in the Temple",
      "The Crowning with Thorns"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Crucifixion and Death of Our Lord on Mount Calvary.",
    memoryTip: "Sorrowful 5 = Crucifixion."
  },
  "q-day13-7": {
    id: "q-day13-7",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the Third Glorious Mystery commemorating the birthday of the Church?",
    options: [
      "The Ascension",
      "The Descent of the Holy Spirit upon the Apostles (Pentecost)",
      "The Coronation of Mary",
      "The Transfiguration"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is Pentecost (Descent of the Holy Spirit in tongues of fire).",
    memoryTip: "Glorious 3 = Pentecost."
  },
  "q-day13-8": {
    id: "q-day13-8",
    category: "prayers",
    categoryLabel: "The Holy Rosary",
    day: 13,
    question: "What is the Fifth Luminous Mystery?",
    options: [
      "The Transfiguration on Mount Tabor",
      "The Institution of the Holy Eucharist at the Last Supper",
      "The Multiplication of Loaves",
      "The Resurrection of Lazarus"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Institution of the Most Blessed Sacrament of the Eucharist.",
    memoryTip: "Luminous 5 = Institution of the Eucharist."
  },

  // --- DAY 14: CUMULATIVE MASTERY EXAM ---
  "q-day14-1": {
    id: "q-day14-1",
    category: "prayers",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "In the Apostles' Creed, which phrase describes Christ's descent prior to His Resurrection?",
    options: [
      "He ascended into heaven",
      "He descended into hell (the realm of the dead / Limbo of the Fathers)",
      "He walked upon the waters",
      "He preached to the nations"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'he descended into hell; on the third day he rose again from the dead' to liberate the righteous souls waiting for redemption.",
    memoryTip: "Descended into hell -> Rose on third day."
  },
  "q-day14-2": {
    id: "q-day14-2",
    category: "commandments",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "Which commandment is violated by perjury (lying under solemn oath)?",
    options: [
      "The 1st and 3rd Commandments",
      "The 2nd Commandment (taking God's name in vain) and the 8th Commandment (false witness)",
      "The 5th Commandment alone",
      "The 10th Commandment alone"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct. Perjury invokes God as witness to a lie, violating both 2nd and 8th commandments.",
    memoryTip: "Perjury = False Oath (2nd) + Lie (8th)."
  },
  "q-day14-3": {
    id: "q-day14-3",
    category: "sacraments",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "Which sacrament imparts the character that configures a man to Christ the Head and Shepherd?",
    options: [
      "Confirmation",
      "Holy Orders",
      "Baptism",
      "Matrimony"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is Holy Orders, granting sacred power to act in persona Christi Capitis.",
    memoryTip: "Holy Orders configures to Christ the Head and Priest."
  },
  "q-day14-4": {
    id: "q-day14-4",
    category: "mass",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "What is the response of the faithful after the priest announces the Mystery of Faith (Mysterium Fidei)?",
    options: [
      "Glory to God in the highest",
      "We proclaim your Death, O Lord, and profess your Resurrection until you come again.",
      "Thanks be to God forever",
      "Holy, Holy, Holy Lord God of hosts"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the primary Memorial Acclamation (Mystery of Faith).",
    memoryTip: "We proclaim your Death, O Lord, and profess your Resurrection..."
  },
  "q-day14-5": {
    id: "q-day14-5",
    category: "prayers",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "In the Salve Regina, what are the three final invocations addressed to the Virgin Mary?",
    options: [
      "O holy, O mighty, O eternal Virgin",
      "O clement, O loving, O sweet Virgin Mary",
      "O powerful, O glorious, O majestic Queen",
      "O refuge, O tower, O ark of the covenant"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is correct: 'O clemens, O pia, O dulcis Virgo Maria' (O clement, O loving, O sweet Virgin Mary).",
    memoryTip: "Clement, Loving, Sweet Virgin Mary."
  },
  "q-day14-6": {
    id: "q-day14-6",
    category: "commandments",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "Which commandment forbids hatred, unjust anger, murder, and abortion?",
    options: [
      "The 4th Commandment",
      "The 5th Commandment",
      "The 6th Commandment",
      "The 7th Commandment"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the 5th Commandment ('You shall not kill'), defending all human life.",
    memoryTip: "5th Commandment defends life from conception."
  },
  "q-day14-7": {
    id: "q-day14-7",
    category: "sacraments",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "What is the required disposition to receive Holy Communion worthily without committing the grave sacrilege warned by St. Paul (1 Cor 11:27-29)?",
    options: [
      "Being free from mortal sin (in a state of sanctifying grace) and observing the 1-hour Eucharistic fast",
      "Having memorized the entire Gospel of Matthew",
      "Being an ordained minister",
      "Giving all one's money to the parish"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is correct. State of grace (confession of mortal sins first) and 1-hour Eucharistic fast from food and drink (water and medicine excepted).",
    memoryTip: "State of Grace + 1-Hour Fast."
  },
  "q-day14-8": {
    id: "q-day14-8",
    category: "mass",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "During which part of the Mass does the priest break the consecrated host and place a particle into the chalice (commingling)?",
    options: [
      "The Offertory",
      "The Fraction of the Bread (during the Agnus Dei)",
      "The Collect",
      "The Final Blessing"
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the Fraction rite, signifying the unity of the Body and Blood of the Lord in the work of salvation.",
    memoryTip: "Fraction of Bread + Lamb of God."
  },
  "q-day14-9": {
    id: "q-day14-9",
    category: "doctrine",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "What are the three conditions required for a sin to be considered mortal (deadly)?",
    options: [
      "Grave matter, full knowledge, and deliberate consent of the will",
      "Happening on a Sunday, seen by others, and breaking a civil statute",
      "Minor matter, confusion, and accidental action",
      "Being committed three times in a row"
    ],
    correctAnswer: 1,
    explanation: "Option 1 is the strict Catholic requirement: 1. Grave Matter, 2. Full Knowledge, 3. Complete Consent.",
    memoryTip: "Mortal Sin: Grave Matter + Full Knowledge + Deliberate Consent."
  },
  "q-day14-10": {
    id: "q-day14-10",
    category: "prayers",
    categoryLabel: "Comprehensive Mastery",
    day: 14,
    question: "What is the ancient prayer 'Anima Christi' often recited after receiving Holy Communion?",
    options: [
      "Hail Holy Queen...",
      "Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me...",
      "Our Father, who art in heaven...",
      "Glory be to the Father, and to the Son..."
    ],
    correctAnswer: 2,
    explanation: "Option 2 is the beloved post-communion prayer Anima Christi.",
    memoryTip: "Soul of Christ, sanctify me..."
  }
};
