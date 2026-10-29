export interface PennyCatechismItem {
  number: number;
  section: string;
  subSection: string;
  questionEn: string;
  questionDe: string;
  answerEn: string;
  answerDe: string;
  scriptureRef?: string;
  category: "Faith & Creed" | "Hope & Prayer" | "Commandments" | "Sacraments" | "Virtues & Last Things";
}

export const PENNY_CATECHISM_ITEMS: PennyCatechismItem[] = [
  // 1. FAITH & CREED
  {
    number: 1,
    section: "Faith",
    subSection: "The Purpose of Man",
    questionEn: "Who made you?",
    questionDe: "Wer hat dich erschaffen?",
    answerEn: "God made me.",
    answerDe: "Gott hat mich erschaffen.",
    scriptureRef: "Genesis 1:27",
    category: "Faith & Creed"
  },
  {
    number: 2,
    section: "Faith",
    subSection: "The Purpose of Man",
    questionEn: "Why did God make you?",
    questionDe: "Warum hat Gott dich erschaffen?",
    answerEn: "God made me to know Him, to love Him, and to serve Him in this world, and to be happy with Him forever in the next.",
    answerDe: "Gott hat mich erschaffen, um Ihn zu erkennen, Ihn zu lieben, Ihm in dieser Welt zu dienen und auf ewig mit Ihm in der kommenden Welt selig zu sein.",
    scriptureRef: "John 17:3; Matthew 25:34",
    category: "Faith & Creed"
  },
  {
    number: 3,
    section: "Faith",
    subSection: "The Nature of God",
    questionEn: "To whose image and likeness did God make you?",
    questionDe: "Nach wessen Bild und Gleichnis hat Gott dich geschaffen?",
    answerEn: "God made me to His own image and likeness.",
    answerDe: "Gott hat mich nach Seinem eigenen Bild und Gleichnis geschaffen.",
    scriptureRef: "Genesis 1:26-27",
    category: "Faith & Creed"
  },
  {
    number: 4,
    section: "Faith",
    subSection: "The Soul",
    questionEn: "Is this likeness to God in your body, or in your soul?",
    questionDe: "Besteht diese Ähnlichkeit mit Gott in deinem Leib oder in deiner Seele?",
    answerEn: "This likeness to God is chiefly in my soul.",
    answerDe: "Diese Ähnlichkeit mit Gott besteht vornehmlich in meiner Seele.",
    scriptureRef: "Matthew 10:28",
    category: "Faith & Creed"
  },
  {
    number: 5,
    section: "Faith",
    subSection: "The Soul",
    questionEn: "How is your soul like to God?",
    questionDe: "Inwiefern ist deine Seele Gott ähnlich?",
    answerEn: "My soul is like to God because it is a spirit, and is immortal.",
    answerDe: "Meine Seele ist Gott ähnlich, weil sie ein Geist und unsterblich ist.",
    scriptureRef: "Wisdom 2:23",
    category: "Faith & Creed"
  },
  {
    number: 9,
    section: "Faith",
    subSection: "The Blessed Trinity",
    questionEn: "How many Persons are there in God?",
    questionDe: "Wie viele Personen gibt es in Gott?",
    answerEn: "In God there are three Persons, really distinct, and equal in all things: the Father, the Son, and the Holy Ghost.",
    answerDe: "In Gott sind drei Personen, wahrhaft verschieden und in allem gleich: der Vater, der Sohn und der Heilige Geist.",
    scriptureRef: "Matthew 28:19; 1 John 5:7",
    category: "Faith & Creed"
  },
  {
    number: 10,
    section: "Faith",
    subSection: "The Blessed Trinity",
    questionEn: "Is the Father God?",
    questionDe: "Ist der Vater Gott?",
    answerEn: "The Father is God and the first Person of the Blessed Trinity.",
    answerDe: "Der Vater ist Gott und die erste Person der Heiligsten Dreifaltigkeit.",
    category: "Faith & Creed"
  },
  {
    number: 11,
    section: "Faith",
    subSection: "The Blessed Trinity",
    questionEn: "Is the Son God?",
    questionDe: "Ist der Sohn Gott?",
    answerEn: "The Son is God and the second Person of the Blessed Trinity.",
    answerDe: "Der Sohn ist Gott und die zweite Person der Heiligsten Dreifaltigkeit.",
    scriptureRef: "John 1:1; John 20:28",
    category: "Faith & Creed"
  },
  {
    number: 12,
    section: "Faith",
    subSection: "The Blessed Trinity",
    questionEn: "Is the Holy Ghost God?",
    questionDe: "Ist der Heilige Geist Gott?",
    answerEn: "The Holy Ghost is God and the third Person of the Blessed Trinity.",
    answerDe: "Der Heilige Geist ist Gott und die dritte Person der Heiligsten Dreifaltigkeit.",
    scriptureRef: "Acts 5:3-4",
    category: "Faith & Creed"
  },
  {
    number: 13,
    section: "Faith",
    subSection: "The Blessed Trinity",
    questionEn: "What is the mystery of the three Persons in one God called?",
    questionDe: "Wie nennt man das Geheimnis der drei Personen in einem Gott?",
    answerEn: "The mystery of the three Persons in one God is called the mystery of the Blessed Trinity.",
    answerDe: "Das Geheimnis der drei Personen in einem Gott nennt man das Geheimnis der Heiligsten Dreifaltigkeit (Trinität).",
    category: "Faith & Creed"
  },
  {
    number: 30,
    section: "Faith",
    subSection: "The Incarnation",
    questionEn: "What is the mystery of the Second Person of the Blessed Trinity being made man called?",
    questionDe: "Wie nennt man das Geheimnis, dass die Zweite Person der Heiligsten Dreifaltigkeit Mensch geworden ist?",
    answerEn: "The mystery of the Second Person of the Blessed Trinity being made man is called the Incarnation.",
    answerDe: "Das Geheimnis, dass die Zweite Person der Heiligsten Dreifaltigkeit Mensch wurde, nennt man die Menschwerdung (Inkarnation).",
    scriptureRef: "John 1:14",
    category: "Faith & Creed"
  },
  {
    number: 82,
    section: "Faith",
    subSection: "The Catholic Church",
    questionEn: "What is the Catholic Church?",
    questionDe: "Was ist die katholische Kirche?",
    answerEn: "The Catholic Church is the union of all the faithful under one visible head.",
    answerDe: "Die katholische Kirche ist die Gemeinschaft aller Gläubigen unter einem sichtbaren Oberhaupt.",
    scriptureRef: "1 Corinthians 12:12-27",
    category: "Faith & Creed"
  },
  {
    number: 83,
    section: "Faith",
    subSection: "The Catholic Church",
    questionEn: "Who is the invisible Head of the Church?",
    questionDe: "Wer ist das unsichtbare Haupt der Kirche?",
    answerEn: "Jesus Christ is the invisible Head of the Church.",
    answerDe: "Jesus Christus ist das unsichtbare Haupt der Kirche.",
    scriptureRef: "Colossians 1:18",
    category: "Faith & Creed"
  },
  {
    number: 84,
    section: "Faith",
    subSection: "The Catholic Church",
    questionEn: "Who is the visible Head of the Church?",
    questionDe: "Wer ist das sichtbare Haupt der Kirche?",
    answerEn: "The Pope, the Bishop of Rome, who is the Vicar of Christ and the Successor of St. Peter.",
    answerDe: "Der Papst, der Bischof von Rom, welcher der Stellvertreter Christi und der Nachfolger des heiligen Petrus ist.",
    scriptureRef: "Matthew 16:18-19",
    category: "Faith & Creed"
  },
  {
    number: 88,
    section: "Faith",
    subSection: "Marks of the Church",
    questionEn: "What are the four marks of the Church?",
    questionDe: "Was sind die vier Kennzeichen der wahren Kirche?",
    answerEn: "The Church is One, Holy, Catholic, and Apostolic.",
    answerDe: "Die Kirche ist Einig, Heilig, Katholisch (Allumfassend) und Apostolisch.",
    category: "Faith & Creed"
  },

  // 2. HOPE & PRAYER
  {
    number: 140,
    section: "Hope & Prayer",
    subSection: "Nature of Prayer",
    questionEn: "What is prayer?",
    questionDe: "Was ist das Gebet?",
    answerEn: "Prayer is the raising up of the mind and heart to God.",
    answerDe: "Das Gebet ist das Erheben des Geistes und des Herzens zu Gott.",
    scriptureRef: "Psalm 141:2; Philippians 4:6",
    category: "Hope & Prayer"
  },
  {
    number: 142,
    section: "Hope & Prayer",
    subSection: "The Lord's Prayer",
    questionEn: "Which is the best of all prayers?",
    questionDe: "Welches ist das beste aller Gebete?",
    answerEn: "The best of all prayers is the Lord's Prayer, or Our Father.",
    answerDe: "Das beste aller Gebete ist das Gebet des Herrn, oder das Vaterunser.",
    scriptureRef: "Matthew 6:9-13",
    category: "Hope & Prayer"
  },
  {
    number: 143,
    section: "Hope & Prayer",
    subSection: "The Lord's Prayer",
    questionEn: "Who made the Lord's Prayer?",
    questionDe: "Wer hat das Vaterunser gelehrt?",
    answerEn: "Jesus Christ Himself made the Lord's Prayer.",
    answerDe: "Jesus Christus selbst hat das Vaterunser gelehrt.",
    category: "Hope & Prayer"
  },
  {
    number: 153,
    section: "Hope & Prayer",
    subSection: "The Hail Mary",
    questionEn: "Who made the first part of the Hail Mary?",
    questionDe: "Wer verfasste den ersten Teil des Ave Maria?",
    answerEn: "The Angel Gabriel and St. Elizabeth, inspired by the Holy Ghost.",
    answerDe: "Der Erzengel Gabriel und die heilige Elisabeth, inspiriert vom Heiligen Geist.",
    scriptureRef: "Luke 1:28, 42",
    category: "Hope & Prayer"
  },
  {
    number: 154,
    section: "Hope & Prayer",
    subSection: "The Hail Mary",
    questionEn: "Who made the second part of the Hail Mary?",
    questionDe: "Wer verfasste den zweiten Teil des Ave Maria?",
    answerEn: "The Church of God, guided by the Holy Ghost.",
    answerDe: "Die Kirche Gottes, geleitet vom Heiligen Geist.",
    category: "Hope & Prayer"
  },

  // 3. COMMANDMENTS OF GOD & CHURCH
  {
    number: 170,
    section: "Commandments",
    subSection: "The Two Great Precepts of Charity",
    questionEn: "What are the two great Commandments of Charity?",
    questionDe: "Was sind die zwei großen Hauptgebote der Gottes- und Nächstenliebe?",
    answerEn: "1. Thou shalt love the Lord thy God with thy whole heart, and with thy whole soul, and with thy whole mind, and with thy whole strength. 2. Thou shalt love thy neighbour as thyself.",
    answerDe: "1. Du sollst den Herrn, deinen Gott, lieben von ganzem Herzen, mit ganzer Seele, mit all deinen Gedanken und mit all deiner Kraft. 2. Du sollst deinen Nächsten lieben wie dich selbst.",
    scriptureRef: "Mark 12:30-31",
    category: "Commandments"
  },
  {
    number: 172,
    section: "Commandments",
    subSection: "First Commandment",
    questionEn: "What is the First Commandment?",
    questionDe: "Was ist das erste Gebot?",
    answerEn: "The First Commandment is: I am the Lord thy God, who brought thee out of the land of Egypt, out of the house of bondage. Thou shalt not have strange gods before Me.",
    answerDe: "Das erste Gebot lautet: Ich bin der Herr, dein Gott. Du sollst keine fremden Götter neben Mir haben.",
    scriptureRef: "Exodus 20:2-3",
    category: "Commandments"
  },
  {
    number: 226,
    section: "Commandments",
    subSection: "Precepts of the Church",
    questionEn: "What are the Chief Precepts of the Church?",
    questionDe: "Was sind die fünf Gebote der Kirche?",
    answerEn: "1. To assist at Mass on all Sundays and Holydays of Obligation. 2. To fast and abstain on the days appointed. 3. To confess our sins at least once a year. 4. To receive the Blessed Sacrament at least once a year, and that at Easter. 5. To contribute to the support of our pastors.",
    answerDe: "1. Die Sonn- und Feiertage heiligzuhalten (Sonntagsmesse). 2. Die gebotenen Fast- und Abstinenztage einzuhalten. 3. Wenigstens einmal im Jahr die Beichte abzulegen. 4. Zur österlichen Zeit das heiligste Sakrament des Altares zu empfangen. 5. Zur materiellen Unterstützung der Kirche beizutragen.",
    category: "Commandments"
  },

  // 4. THE SACRAMENTS
  {
    number: 249,
    section: "Sacraments",
    subSection: "Nature of Sacraments",
    questionEn: "What is a Sacrament?",
    questionDe: "Was ist ein Sakrament?",
    answerEn: "A Sacrament is an outward sign of inward grace, ordained by Jesus Christ, by which grace is given to our souls.",
    answerDe: "Ein Sakrament ist ein sichtbares Zeichen einer unsichtbaren Gnade, eingesetzt von Jesus Christus, durch welches unseren Seelen Gnade mitgeteilt wird.",
    category: "Sacraments"
  },
  {
    number: 250,
    section: "Sacraments",
    subSection: "Number of Sacraments",
    questionEn: "How many Sacraments are there?",
    questionDe: "Wie viele Sakramente gibt es?",
    answerEn: "There are seven Sacraments: Baptism, Confirmation, Holy Eucharist, Penance, Extreme Unction, Holy Order, and Matrimony.",
    answerDe: "Es gibt sieben Sakramente: Taufe, Firmung, Heilige Eucharistie, Buße (Beichte), Krankensalbung, Priesterweihe und Ehe.",
    category: "Sacraments"
  },
  {
    number: 253,
    section: "Sacraments",
    subSection: "Sacramental Character",
    questionEn: "Which Sacraments can be received only once?",
    questionDe: "Welche Sakramente können nur ein einziges Mal empfangen werden?",
    answerEn: "Baptism, Confirmation, and Holy Order can be received only once, because they imprint an indelible character on the soul.",
    answerDe: "Die Taufe, die Firmung und die Priesterweihe können nur einmal empfangen werden, weil sie der Seele ein unzerstörbares Prägemal (Character indelebilis) einprägen.",
    category: "Sacraments"
  },
  {
    number: 263,
    section: "Sacraments",
    subSection: "Holy Eucharist",
    questionEn: "What is the Holy Eucharist?",
    questionDe: "Was ist die Heilige Eucharistie?",
    answerEn: "The Holy Eucharist is the true Body and Blood of Jesus Christ, together with His Soul and His Divinity, under the appearances of bread and wine.",
    answerDe: "Die Heilige Eucharistie ist der wahre Leib und das wahre Blut Jesu Christi, zugleich mit Seiner Seele und Seiner Gottheit, unter den Gestalten von Brot und Wein.",
    scriptureRef: "Matthew 26:26-28; 1 Corinthians 11:23-29",
    category: "Sacraments"
  },
  {
    number: 264,
    section: "Sacraments",
    subSection: "Transubstantiation",
    questionEn: "How are the bread and wine changed into the Body and Blood of Christ?",
    questionDe: "Wie werden Brot und Wein in den Leib und das Blut Christi verwandelt?",
    answerEn: "By the power of God, through the words of consecration spoken by the priest at Holy Mass.",
    answerDe: "Durch die allmächtige Kraft Gottes vermöge der Wandlungsworte, die der Priester in der heiligen Messe spricht (Transsubstantiation / Wesensverwandlung).",
    category: "Sacraments"
  },
  {
    number: 279,
    section: "Sacraments",
    subSection: "The Holy Sacrifice of the Mass",
    questionEn: "What is the Holy Mass?",
    questionDe: "Was ist die Heilige Messe?",
    answerEn: "The Holy Mass is the Sacrifice of the Body and Blood of Jesus Christ, really present on the altar under the appearances of bread and wine, and offered to God for the living and the dead.",
    answerDe: "Die Heilige Messe ist das unblutige Opfer des Leibes und Blutes Jesu Christi, der auf dem Altar unter den Gestalten von Brot und Wein wahrhaft gegenwärtig ist und Gott für die Lebenden und die Toten dargebracht wird.",
    category: "Sacraments"
  },
  {
    number: 285,
    section: "Sacraments",
    subSection: "Penance",
    questionEn: "What is the Sacrament of Penance?",
    questionDe: "Was ist das Sakrament der Buße (Beichte)?",
    answerEn: "Penance is a Sacrament by which the sins committed after Baptism are forgiven to those who are truly contrite.",
    answerDe: "Die Buße ist ein Sakrament, durch welches die nach der Taufe begangenen Sünden dem aufrichtig Reuigen vergeben werden.",
    scriptureRef: "John 20:22-23",
    category: "Sacraments"
  },

  // 5. VIRTUES & LAST THINGS
  {
    number: 322,
    section: "Virtues & Vices",
    subSection: "Theological Virtues",
    questionEn: "What are the three Theological Virtues?",
    questionDe: "Was sind die drei göttlichen (theologischen) Tugenden?",
    answerEn: "The three Theological Virtues are Faith, Hope, and Charity.",
    answerDe: "Die drei göttlichen Tugenden sind Glaube, Hoffnung und Liebe.",
    scriptureRef: "1 Corinthians 13:13",
    category: "Virtues & Last Things"
  },
  {
    number: 323,
    section: "Virtues & Vices",
    subSection: "Cardinal Virtues",
    questionEn: "What are the four Cardinal Virtues?",
    questionDe: "Was sind die vier Kardinaltugenden?",
    answerEn: "The four Cardinal Virtues are Prudence, Justice, Fortitude, and Temperance.",
    answerDe: "Die vier Kardinaltugenden sind Klugheit, Gerechtigkeit, Tapferkeit und Mäßigung.",
    category: "Virtues & Last Things"
  },
  {
    number: 324,
    section: "Virtues & Vices",
    subSection: "The Seven Capital Sins",
    questionEn: "What are the seven Capital (Deadly) Sins?",
    questionDe: "Was sind die sieben Hauptsünden (Todsünden)?",
    answerEn: "Pride, Covetousness (Greed), Lust, Anger, Gluttony, Envy, and Sloth.",
    answerDe: "Hochmut (Stolz), Geiz, Unkeuschheit, Zorn, Völlerei (Unmäßigkeit), Neid und Trägheit (Überdruss).",
    category: "Virtues & Last Things"
  },
  {
    number: 366,
    section: "The Last Things",
    subSection: "The Four Last Things",
    questionEn: "What are the Four Last Things to be ever remembered?",
    questionDe: "Was sind die vier Letzten Dinge des Menschen?",
    answerEn: "The Four Last Things are Death, Judgement, Hell, and Heaven.",
    answerDe: "Die vier Letzten Dinge sind Tod, Gericht, Hölle und Himmel.",
    scriptureRef: "Sirach 7:40; Hebrews 9:27",
    category: "Virtues & Last Things"
  }
];
