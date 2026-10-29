import { MemorizationItem } from "../types";

export const MEMORIZATION_ITEMS: MemorizationItem[] = [
  // ==================== CHIEF PRAYERS ====================
  {
    id: "prayer-sign-of-cross",
    category: "prayers",
    title: "The Sign of the Cross",
    latinTitle: "Signum Crucis",
    subtitle: "The fundamental invocation of the Holy Trinity",
    fullText: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
    lines: [
      "In the name of the Father,",
      "and of the Son,",
      "and of the Holy Spirit.",
      "Amen."
    ],
    clozeBlanks: [
      {
        sentence: "In the name of the Father, and of the ___, and of the Holy Spirit.",
        missingWord: "Son",
        options: ["Son", "Lord", "Creator", "King"],
        correctIndex: 1
      },
      {
        sentence: "In the name of the Father, and of the Son, and of the Holy ___.",
        missingWord: "Spirit",
        options: ["Ghost", "Spirit", "Mother", "Angel"],
        correctIndex: 2
      }
    ],
    notes: "Made touching forehead, breast, left shoulder, then right shoulder."
  },
  {
    id: "prayer-our-father",
    category: "prayers",
    title: "The Lord's Prayer (Our Father)",
    latinTitle: "Pater Noster",
    subtitle: "Given directly by Christ to His disciples (Matthew 6:9-13)",
    fullText: `Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come;
thy will be done
on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil.
Amen.`,
    lines: [
      "Our Father, who art in heaven,",
      "hallowed be thy name;",
      "thy kingdom come;",
      "thy will be done on earth as it is in heaven.",
      "Give us this day our daily bread;",
      "and forgive us our trespasses as we forgive those who trespass against us;",
      "and lead us not into temptation,",
      "but deliver us from evil.",
      "Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Our Father, who art in heaven, ___ be thy name.",
        missingWord: "hallowed",
        options: ["glorified", "hallowed", "exalted", "honored"],
        correctIndex: 2
      },
      {
        sentence: "Give us this day our ___ bread.",
        missingWord: "daily",
        options: ["heavenly", "daily", "holy", "living"],
        correctIndex: 2
      },
      {
        sentence: "And forgive us our ___ as we forgive those who trespass against us.",
        missingWord: "trespasses",
        options: ["sins", "debts", "trespasses", "faults"],
        correctIndex: 3
      },
      {
        sentence: "And lead us not into temptation, but deliver us from ___.",
        missingWord: "evil",
        options: ["darkness", "harm", "sin", "evil"],
        correctIndex: 4
      }
    ]
  },
  {
    id: "prayer-hail-mary",
    category: "prayers",
    title: "The Hail Mary",
    latinTitle: "Ave Maria",
    subtitle: "The Angelic Salutation (Luke 1:28, 42)",
    fullText: `Hail Mary, full of grace, the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`,
    lines: [
      "Hail Mary, full of grace, the Lord is with thee.",
      "Blessed art thou among women,",
      "and blessed is the fruit of thy womb, Jesus.",
      "Holy Mary, Mother of God,",
      "pray for us sinners,",
      "now and at the hour of our death.",
      "Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Hail Mary, full of ___, the Lord is with thee.",
        missingWord: "grace",
        options: ["mercy", "peace", "grace", "light"],
        correctIndex: 3
      },
      {
        sentence: "Blessed art thou among women, and blessed is the fruit of thy womb, ___.",
        missingWord: "Jesus",
        options: ["Christ", "Jesus", "our Lord", "the Savior"],
        correctIndex: 2
      },
      {
        sentence: "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our ___.",
        missingWord: "death",
        options: ["need", "death", "passing", "trial"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-glory-be",
    category: "prayers",
    title: "The Glory Be (Doxology)",
    latinTitle: "Gloria Patri",
    subtitle: "Praise to the Holy and Undivided Trinity",
    fullText: `Glory be to the Father, and to the Son, and to the Holy Spirit.
As it was in the beginning, is now, and ever shall be,
world without end. Amen.`,
    lines: [
      "Glory be to the Father, and to the Son, and to the Holy Spirit.",
      "As it was in the beginning, is now, and ever shall be,",
      "world without end. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the ___, is now, and ever shall be...",
        missingWord: "beginning",
        options: ["heavens", "beginning", "creation", "past"],
        correctIndex: 2
      },
      {
        sentence: "As it was in the beginning, is now, and ever shall be, world without ___.",
        missingWord: "end",
        options: ["sorrow", "sin", "end", "fear"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "prayer-apostles-creed",
    category: "prayers",
    title: "The Apostles' Creed",
    latinTitle: "Symbolum Apostolorum",
    subtitle: "The ancient baptismal creed of the Church of Rome",
    fullText: `I believe in God, the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.
I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting. Amen.`,
    lines: [
      "I believe in God, the Father almighty, Creator of heaven and earth,",
      "and in Jesus Christ, his only Son, our Lord,",
      "who was conceived by the Holy Spirit, born of the Virgin Mary,",
      "suffered under Pontius Pilate, was crucified, died and was buried;",
      "he descended into hell; on the third day he rose again from the dead;",
      "he ascended into heaven, and is seated at the right hand of God the Father almighty;",
      "from there he will come to judge the living and the dead.",
      "I believe in the Holy Spirit, the holy catholic Church,",
      "the communion of saints, the forgiveness of sins,",
      "the resurrection of the body, and life everlasting. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Suffered under ___, was crucified, died and was buried.",
        missingWord: "Pontius Pilate",
        options: ["King Herod", "Pontius Pilate", "Caesar Augustus", "Caiaphas"],
        correctIndex: 2
      },
      {
        sentence: "On the ___ day he rose again from the dead.",
        missingWord: "third",
        options: ["seventh", "second", "third", "first"],
        correctIndex: 3
      },
      {
        sentence: "The communion of saints, the forgiveness of sins, the resurrection of the ___, and life everlasting.",
        missingWord: "body",
        options: ["soul", "spirit", "body", "just"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "prayer-hail-holy-queen",
    category: "prayers",
    title: "Hail, Holy Queen",
    latinTitle: "Salve Regina",
    subtitle: "Traditional Marian antiphon recited at the conclusion of the Rosary",
    fullText: `Hail, holy Queen, Mother of mercy,
our life, our sweetness, and our hope.
To thee do we cry, poor banished children of Eve;
to thee do we send up our sighs, mourning and weeping in this valley of tears.
Turn then, most gracious advocate, thine eyes of mercy toward us,
and after this our exile, show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.
Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.`,
    lines: [
      "Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope.",
      "To thee do we cry, poor banished children of Eve;",
      "to thee do we send up our sighs, mourning and weeping in this valley of tears.",
      "Turn then, most gracious advocate, thine eyes of mercy toward us,",
      "and after this our exile, show unto us the blessed fruit of thy womb, Jesus.",
      "O clement, O loving, O sweet Virgin Mary.",
      "Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Hail, holy Queen, Mother of mercy, our life, our ___, and our hope.",
        missingWord: "sweetness",
        options: ["strength", "refuge", "sweetness", "joy"],
        correctIndex: 3
      },
      {
        sentence: "Mourning and weeping in this valley of ___.",
        missingWord: "tears",
        options: ["sorrow", "tears", "shadows", "darkness"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-act-of-contrition",
    category: "prayers",
    title: "The Act of Contrition",
    latinTitle: "Actus Contritionis",
    subtitle: "Prayer of repentance in the Sacrament of Penance",
    fullText: `O my God, I am heartily sorry for having offended Thee,
and I detest all my sins because of thy just punishments,
but most of all because they offend Thee, my God,
who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasion of sin. Amen.`,
    lines: [
      "O my God, I am heartily sorry for having offended Thee,",
      "and I detest all my sins because of thy just punishments,",
      "but most of all because they offend Thee, my God, who art all good and deserving of all my love.",
      "I firmly resolve, with the help of Thy grace,",
      "to sin no more and to avoid the near occasion of sin. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "O my God, I am ___ sorry for having offended Thee.",
        missingWord: "heartily",
        options: ["deeply", "truly", "heartily", "sincerely"],
        correctIndex: 3
      },
      {
        sentence: "I firmly resolve, with the help of Thy grace, to sin no more and to avoid the ___ of sin.",
        missingWord: "near occasion",
        options: ["near occasion", "temptation", "shadow", "presence"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "prayer-memorare",
    category: "prayers",
    title: "The Memorare",
    latinTitle: "Memorare",
    subtitle: "Prayer of confidence in Mary attributed to St. Bernard of Clairvaux",
    fullText: `Remember, O most gracious Virgin Mary,
that never was it known that anyone who fled to thy protection,
implored thy help, or sought thy intercession was left unaided.
Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother.
To thee do I come, before thee I stand, sinful and sorrowful.
O Mother of the Word Incarnate, despise not my petitions,
but in thy mercy hear and answer me. Amen.`,
    lines: [
      "Remember, O most gracious Virgin Mary,",
      "that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided.",
      "Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother.",
      "To thee do I come, before thee I stand, sinful and sorrowful.",
      "O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Never was it known that anyone who fled to thy protection... was left ___.",
        missingWord: "unaided",
        options: ["forsaken", "alone", "unaided", "abandoned"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "prayer-st-michael",
    category: "prayers",
    title: "Prayer to Saint Michael the Archangel",
    latinTitle: "Sancte Michael Archangele",
    subtitle: "Composed by Pope Leo XIII for spiritual battle and protection",
    fullText: `Saint Michael the Archangel, defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray;
and do thou, O Prince of the Heavenly Host,
by the power of God,
cast into hell Satan and all the evil spirits
who prowl about the world seeking the ruin of souls.
Amen.`,
    lines: [
      "Saint Michael the Archangel, defend us in battle.",
      "Be our protection against the wickedness and snares of the devil.",
      "May God rebuke him, we humbly pray;",
      "and do thou, O Prince of the Heavenly Host,",
      "by the power of God,",
      "cast into hell Satan and all the evil spirits",
      "who prowl about the world seeking the ruin of souls.",
      "Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Saint Michael the Archangel, defend us in ___.",
        missingWord: "battle",
        options: ["trials", "battle", "danger", "strife"],
        correctIndex: 2
      },
      {
        sentence: "And do thou, O Prince of the ___ Host, by the power of God, cast into hell Satan...",
        missingWord: "Heavenly",
        options: ["Angelic", "Heavenly", "Glorious", "Eternal"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-morning-offering",
    category: "prayers",
    title: "The Morning Offering",
    latinTitle: "Oblatio Matutina",
    subtitle: "Daily consecration of all prayers, works, joys, and sufferings",
    fullText: `O Jesus, through the Immaculate Heart of Mary,
I offer Thee my prayers, works, joys, and sufferings of this day
for all the intentions of Thy Sacred Heart,
in union with the Holy Sacrifice of the Mass throughout the world,
for the salvation of souls, the reparation of sins,
the reunion of all Christians,
and in particular for the intentions of the Holy Father.
Amen.`,
    lines: [
      "O Jesus, through the Immaculate Heart of Mary,",
      "I offer Thee my prayers, works, joys, and sufferings of this day",
      "for all the intentions of Thy Sacred Heart,",
      "in union with the Holy Sacrifice of the Mass throughout the world,",
      "for the salvation of souls, the reparation of sins,",
      "the reunion of all Christians,",
      "and in particular for the intentions of the Holy Father. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "O Jesus, through the ___ Heart of Mary, I offer Thee my prayers, works, joys, and sufferings...",
        missingWord: "Immaculate",
        options: ["Sorrowful", "Immaculate", "Sacred", "Pure"],
        correctIndex: 2
      },
      {
        sentence: "In union with the Holy Sacrifice of the ___ throughout the world.",
        missingWord: "Mass",
        options: ["Cross", "Church", "Mass", "Altar"],
        correctIndex: 3
      }
    ]
  },
  {
    id: "prayer-guardian-angel",
    category: "prayers",
    title: "Prayer to Guardian Angel",
    latinTitle: "Angele Dei",
    subtitle: "Traditional prayer invoking celestial guardianship and guidance",
    fullText: `Angel of God, my guardian dear,
to whom God's love commits me here,
ever this day be at my side,
to light and guard, to rule and guide.
Amen.`,
    lines: [
      "Angel of God, my guardian dear,",
      "to whom God's love commits me here,",
      "ever this day be at my side,",
      "to light and guard, to rule and guide. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my ___, to light and guard...",
        missingWord: "side",
        options: ["heart", "side", "door", "soul"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-fatima-pardon",
    category: "prayers",
    title: "The Fatima Pardon Prayer",
    latinTitle: "Oratio Fatimae de Venia",
    subtitle: "Taught by the Angel of Peace at Fatima (1916)",
    fullText: `My God, I believe, I adore, I hope and I love Thee!
I ask pardon for those who do not believe,
do not adore,
do not hope,
and do not love Thee.`,
    lines: [
      "My God, I believe, I adore, I hope and I love Thee!",
      "I ask pardon for those who do not believe,",
      "do not adore,",
      "do not hope,",
      "and do not love Thee."
    ],
    clozeBlanks: [
      {
        sentence: "My God, I believe, I adore, I hope and I ___ Thee!",
        missingWord: "love",
        options: ["praise", "serve", "love", "honor"],
        correctIndex: 3
      },
      {
        sentence: "I ask pardon for those who do not believe, do not adore, do not hope, and do not ___ Thee.",
        missingWord: "love",
        options: ["fear", "love", "know", "seek"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-fatima-decade",
    category: "prayers",
    title: "The Fatima Decade Prayer",
    latinTitle: "Oratio Fatimae ad Decadam",
    subtitle: "Recited at the conclusion of each Rosary decade after the Glory Be",
    fullText: `O my Jesus, forgive us our sins,
save us from the fires of hell,
lead all souls to Heaven,
especially those most in need of Thy mercy.
Amen.`,
    lines: [
      "O my Jesus, forgive us our sins,",
      "save us from the fires of hell,",
      "lead all souls to Heaven,",
      "especially those most in need of Thy mercy. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "O my Jesus, forgive us our sins, save us from the fires of ___, lead all souls to Heaven...",
        missingWord: "hell",
        options: ["purgatory", "hell", "darkness", "evil"],
        correctIndex: 2
      },
      {
        sentence: "Especially those most in need of Thy ___.",
        missingWord: "mercy",
        options: ["grace", "light", "peace", "mercy"],
        correctIndex: 4
      }
    ]
  },
  {
    id: "prayer-fatima-angel",
    category: "prayers",
    title: "The Fatima Angel Prayer (Reparation)",
    latinTitle: "Oratio Reparationis Fatimae",
    subtitle: "Prayer of Eucharistic Adoration and Reparation for Sinners",
    fullText: `Most Holy Trinity, Father, Son, and Holy Spirit,
I adore Thee profoundly,
and I offer Thee the most precious Body, Blood, Soul, and Divinity of Jesus Christ,
present in all the tabernacles of the world,
in reparation for the outrages, sacrileges, and indifference
with which He Himself is offended.
And, through the infinite merits of His Most Sacred Heart,
and the Immaculate Heart of Mary,
I beg of Thee the conversion of poor sinners.
Amen.`,
    lines: [
      "Most Holy Trinity, Father, Son, and Holy Spirit, I adore Thee profoundly,",
      "and I offer Thee the most precious Body, Blood, Soul, and Divinity of Jesus Christ,",
      "present in all the tabernacles of the world,",
      "in reparation for the outrages, sacrileges, and indifference with which He Himself is offended.",
      "And, through the infinite merits of His Most Sacred Heart, and the Immaculate Heart of Mary,",
      "I beg of Thee the conversion of poor sinners. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "I offer Thee the most precious Body, Blood, Soul, and ___ of Jesus Christ, present in all the tabernacles of the world.",
        missingWord: "Divinity",
        options: ["Grace", "Majesty", "Divinity", "Glory"],
        correctIndex: 3
      },
      {
        sentence: "In reparation for the outrages, ___, and indifference with which He Himself is offended.",
        missingWord: "sacrileges",
        options: ["blasphemies", "sacrileges", "rebellions", "neglect"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-fatima-sacrifice",
    category: "prayers",
    title: "The Fatima Sacrifice Prayer",
    subtitle: "Prayer recited when offering daily sacrifices and difficulties",
    fullText: `O Jesus, it is for love of Thee,
for the conversion of sinners,
and in reparation for the sins committed against the Immaculate Heart of Mary.
Amen.`,
    lines: [
      "O Jesus, it is for love of Thee,",
      "for the conversion of sinners,",
      "and in reparation for the sins committed against the Immaculate Heart of Mary. Amen."
    ],
    clozeBlanks: [
      {
        sentence: "O Jesus, it is for love of Thee, for the conversion of sinners, and in reparation for the sins committed against the ___ Heart of Mary.",
        missingWord: "Immaculate",
        options: ["Sorrowful", "Immaculate", "Sacred", "Pure"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "prayer-the-angelus",
    category: "prayers",
    title: "The Angelus",
    latinTitle: "Angelus Domini",
    subtitle: "Midday prayer commemorating the Incarnation of Christ",
    fullText: `V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit. (Hail Mary...)
V. Behold the handmaid of the Lord.
R. Be it done unto me according to Thy word. (Hail Mary...)
V. And the Word was made flesh.
R. And dwelt among us. (Hail Mary...)
V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.
Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts... Amen.`,
    lines: [
      "V. The Angel of the Lord declared unto Mary. R. And she conceived of the Holy Spirit.",
      "V. Behold the handmaid of the Lord. R. Be it done unto me according to Thy word.",
      "V. And the Word was made flesh. R. And dwelt among us.",
      "V. Pray for us, O holy Mother of God. R. That we may be made worthy of the promises of Christ.",
      "Pour forth, we beseech Thee, O Lord, Thy grace into our hearts... Amen."
    ],
    clozeBlanks: [
      {
        sentence: "And the Word was made ___, and dwelt among us.",
        missingWord: "flesh",
        options: ["King", "flesh", "light", "holy"],
        correctIndex: 2
      }
    ]
  },

  // ==================== TEN COMMANDMENTS ====================
  {
    id: "commandments-decalogue",
    category: "commandments",
    title: "The Ten Commandments (The Decalogue)",
    latinTitle: "Decalogus",
    subtitle: "Given by God to Moses on Mount Sinai (Exodus 20:1-17, Deuteronomy 5:6-21)",
    fullText: `1. I am the Lord your God: you shall not have strange Gods before me.
2. You shall not take the name of the Lord your God in vain.
3. Remember to keep holy the Lord's Day.
4. Honor your father and your mother.
5. You shall not kill.
6. You shall not commit adultery.
7. You shall not steal.
8. You shall not bear false witness against your neighbor.
9. You shall not covet your neighbor's wife.
10. You shall not covet your neighbor's goods.`,
    lines: [
      "1. I am the Lord your God: you shall not have strange Gods before me.",
      "2. You shall not take the name of the Lord your God in vain.",
      "3. Remember to keep holy the Lord's Day.",
      "4. Honor your father and your mother.",
      "5. You shall not kill.",
      "6. You shall not commit adultery.",
      "7. You shall not steal.",
      "8. You shall not bear false witness against your neighbor.",
      "9. You shall not covet your neighbor's wife.",
      "10. You shall not covet your neighbor's goods."
    ],
    stepsOrParts: [
      { title: "First Commandment", description: "I am the Lord your God: you shall not have strange Gods before me." },
      { title: "Second Commandment", description: "You shall not take the name of the Lord your God in vain." },
      { title: "Third Commandment", description: "Remember to keep holy the Lord's Day." },
      { title: "Fourth Commandment", description: "Honor your father and your mother." },
      { title: "Fifth Commandment", description: "You shall not kill." },
      { title: "Sixth Commandment", description: "You shall not commit adultery." },
      { title: "Seventh Commandment", description: "You shall not steal." },
      { title: "Eighth Commandment", description: "You shall not bear false witness against your neighbor." },
      { title: "Ninth Commandment", description: "You shall not covet your neighbor's wife." },
      { title: "Tenth Commandment", description: "You shall not covet your neighbor's goods." }
    ],
    clozeBlanks: [
      {
        sentence: "The First Commandment: I am the Lord your God: you shall not have ___ Gods before me.",
        missingWord: "strange",
        options: ["false", "other", "strange", "foreign"],
        correctIndex: 3
      },
      {
        sentence: "The Third Commandment: Remember to keep holy the ___.",
        missingWord: "Lord's Day",
        options: ["Sabbath", "Lord's Day", "Holy Days", "Altar"],
        correctIndex: 2
      },
      {
        sentence: "The Eighth Commandment: You shall not bear false ___ against your neighbor.",
        missingWord: "witness",
        options: ["judgment", "witness", "testimony", "rumor"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "commandments-two-great",
    category: "commandments",
    title: "The Two Great Commandments of Love",
    subtitle: "The sum of the Law and the Prophets taught by Christ (Matthew 22:37-40)",
    fullText: `1. You shall love the Lord your God with all your heart, and with all your soul, and with all your mind.
2. You shall love your neighbor as yourself.`,
    lines: [
      "1. You shall love the Lord your God with all your heart, with all your soul, and with all your mind.",
      "2. You shall love your neighbor as yourself."
    ],
    clozeBlanks: [
      {
        sentence: "You shall love your neighbor as ___.",
        missingWord: "yourself",
        options: ["a brother", "yourself", "Christ loved you", "your friend"],
        correctIndex: 2
      }
    ]
  },

  // ==================== SEVEN SACRAMENTS ====================
  {
    id: "sacraments-seven",
    category: "sacraments",
    title: "The Seven Sacraments of the Church",
    latinTitle: "Septem Sacramenta",
    subtitle: "Efficacious signs of grace, instituted by Christ and entrusted to the Church",
    fullText: `Three Sacraments of Christian Initiation:
1. Baptism
2. Confirmation
3. Holy Eucharist

Two Sacraments of Healing:
4. Penance and Reconciliation (Confession)
5. Anointing of the Sick

Two Sacraments at the Service of Communion:
6. Holy Orders (Diaconate, Presbyterate, Episcopate)
7. Holy Matrimony`,
    lines: [
      "Sacraments of Christian Initiation: 1. Baptism, 2. Confirmation, 3. Holy Eucharist.",
      "Sacraments of Healing: 4. Penance and Reconciliation, 5. Anointing of the Sick.",
      "Sacraments at the Service of Communion: 6. Holy Orders, 7. Holy Matrimony."
    ],
    stepsOrParts: [
      {
        title: "1. Baptism",
        description: "Door to spiritual life. Matter: Water. Form: 'I baptize you in the name of the Father, and of the Son, and of the Holy Spirit.' Effect: Cleanses original and personal sin, imparts indelible character."
      },
      {
        title: "2. Confirmation",
        description: "Completes baptismal grace. Matter: Sacred Chrism & imposition of hands. Form: 'Be sealed with the Gift of the Holy Spirit.' Effect: Special outpouring of Holy Spirit to witness for Christ."
      },
      {
        title: "3. Holy Eucharist",
        description: "The source and summit of Christian life. Matter: Unleavened wheat bread and grape wine. Form: Words of Consecration ('This is my Body... This is the chalice of my Blood...'). Effect: Transubstantiation into the true Body, Blood, Soul, and Divinity of Christ."
      },
      {
        title: "4. Penance (Reconciliation)",
        description: "Restores sanctifying grace lost by mortal sin. Matter: Contrition, confession, satisfaction. Form: Words of Absolution ('I absolve you from your sins in the name of the Father...')."
      },
      {
        title: "5. Anointing of the Sick",
        description: "Spiritual and bodily strength in grave illness or old age. Matter: Oil of the Sick. Form: 'Through this holy anointing may the Lord in his love and mercy help you with the grace of the Holy Spirit...'"
      },
      {
        title: "6. Holy Orders",
        description: "Consecrates men to the ministerial priesthood in three degrees: Deacon, Priest, Bishop. Matter: Laying on of hands by Bishop. Form: Consecratory prayer of ordination."
      },
      {
        title: "7. Holy Matrimony",
        description: "Covenant partnership of life and love between one man and one woman. Ministers: The spouses themselves in presence of Church witness. Form: Mutual exchange of marital consent."
      }
    ],
    clozeBlanks: [
      {
        sentence: "The three Sacraments of Christian Initiation are Baptism, Confirmation, and ___.",
        missingWord: "Holy Eucharist",
        options: ["Holy Orders", "Holy Eucharist", "Penance", "Matrimony"],
        correctIndex: 2
      },
      {
        sentence: "The two Sacraments of Healing are Anointing of the Sick and ___.",
        missingWord: "Penance",
        options: ["Baptism", "Penance", "Confirmation", "Holy Orders"],
        correctIndex: 2
      }
    ]
  },

  // ==================== ORDER OF THE MASS ====================
  {
    id: "mass-order",
    category: "mass",
    title: "The Order of the Mass (Ordo Missae)",
    latinTitle: "Ordo Missae",
    subtitle: "The four main parts of the Holy Sacrifice of the Mass and congregation responses",
    fullText: `I. Introductory Rites
- Entrance Procession and Chant
- Sign of the Cross and Greeting ("And with your spirit")
- Penitential Act (Confiteor / Kyrie Eleison: "Lord, have mercy")
- Gloria in Excelsis Deo (Glory to God in the highest)
- Collect (Opening Prayer)

II. Liturgy of the Word
- First Reading (usually Old Testament) -> "Thanks be to God"
- Responsorial Psalm
- Second Reading (New Testament Epistles) -> "Thanks be to God"
- Gospel Acclamation (Alleluia)
- Holy Gospel -> "Glory to you, O Lord" / "Praise to you, Lord Jesus Christ"
- Homily
- Profession of Faith (Nicene or Apostles' Creed)
- Universal Prayer (Prayer of the Faithful) -> "Lord, hear our prayer"

III. Liturgy of the Eucharist
- Presentation and Preparation of the Gifts (Offertory)
- Prayer over the Offerings
- Eucharistic Prayer:
  * Preface Dialogue ("Lift up your hearts" -> "We lift them up to the Lord")
  * Sanctus ("Holy, Holy, Holy Lord God of hosts...")
  * Epiclesis (Calling down the Holy Spirit)
  * Words of Consecration / Institution
  * Mystery of Faith ("We proclaim your Death, O Lord, and profess your Resurrection until you come again")
  * Doxology & The Great Amen
- Communion Rite:
  * The Lord's Prayer (Our Father)
  * Rite of Peace ("Peace be with you")
  * Agnus Dei ("Lamb of God, you take away the sins of the world, have mercy on us...")
  * "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed."
  * Reception of Holy Communion
  * Prayer after Communion

IV. Concluding Rites
- Brief Announcements
- Priest's Greeting and Final Blessing
- Dismissal ("Go forth, the Mass is ended" -> "Thanks be to God")`,
    lines: [
      "I. Introductory Rites: Entrance, Greeting, Penitential Act, Gloria, Collect.",
      "II. Liturgy of the Word: 1st Reading, Psalm, 2nd Reading, Gospel, Homily, Creed, Intercessions.",
      "III. Liturgy of the Eucharist: Offertory, Eucharistic Prayer, Consecration, Mystery of Faith, Amen, Communion Rite.",
      "IV. Concluding Rites: Final Blessing and Dismissal ('Thanks be to God')."
    ],
    stepsOrParts: [
      {
        title: "1. Introductory Rites",
        description: "Gathers the faithful into one body and prepares hearts to hear God's Word and celebrate the Eucharist.",
        congregationResponse: "Priest: 'The Lord be with you.' -> Response: 'And with your spirit.'"
      },
      {
        title: "2. Liturgy of the Word",
        description: "God speaks to His people through Sacred Scripture, followed by the Homily and Profession of Faith.",
        congregationResponse: "After Gospel: 'The Gospel of the Lord.' -> Response: 'Praise to you, Lord Jesus Christ.'"
      },
      {
        title: "3. Liturgy of the Eucharist",
        description: "The bread and wine become the real Body and Blood of Christ through the Eucharistic Prayer and are received in Communion.",
        congregationResponse: "'Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.'"
      },
      {
        title: "4. Concluding Rites",
        description: "Sends forth the faithful with God's blessing to love and serve the Lord in daily life.",
        congregationResponse: "Deacon/Priest: 'Go forth, the Mass is ended.' -> Response: 'Thanks be to God.'"
      }
    ],
    clozeBlanks: [
      {
        sentence: "When the priest says 'The Lord be with you', the congregation responds: 'And with your ___.'",
        missingWord: "spirit",
        options: ["heart", "spirit", "soul", "mind"],
        correctIndex: 2
      },
      {
        sentence: "Before Holy Communion: 'Lord, I am not worthy that you should enter under my ___, but only say the word and my soul shall be healed.'",
        missingWord: "roof",
        options: ["house", "heart", "roof", "dwelling"],
        correctIndex: 3
      },
      {
        sentence: "The Eucharistic Prayer concludes with the Doxology and the congregation's Great ___.",
        missingWord: "Amen",
        options: ["Alleluia", "Gloria", "Amen", "Sanctus"],
        correctIndex: 3
      }
    ]
  }
];
