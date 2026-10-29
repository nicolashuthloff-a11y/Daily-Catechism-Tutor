export interface PrayerEntry {
  id: string;
  number: string;
  title: string;
  latinTitle?: string;
  purpose: string;
  meditationPrompt?: string;
  text: string;
  latinText?: string;
  scriptureReference?: string;
  memorizationId?: string;
}

export interface PrayerSessionBlock {
  id: "morning" | "afternoon" | "evening";
  emoji: string;
  name: string;
  tagline: string;
  recommendedTime: string;
  theologicalTheme: string;
  estimatedMinutes: number;
  introduction: string;
  prayers: PrayerEntry[];
}

export interface RosaryMystery {
  name: string;
  scripture: string;
  fruitOfMystery: string;
  description: string;
}

export interface RosaryMysteryGroup {
  groupName: string;
  days: string;
  mysteries: RosaryMystery[];
}

export const ROSARY_MYSTERY_GROUPS: RosaryMysteryGroup[] = [
  {
    groupName: "The Joyful Mysteries",
    days: "Mondays & Saturdays",
    mysteries: [
      {
        name: "1. The Annunciation",
        scripture: "Luke 1:26-38",
        fruitOfMystery: "Humility",
        description: "The Archangel Gabriel announces to Mary that she will be the Mother of God, and Mary responds with her Fiat: 'Let it be done to me according to your word.'"
      },
      {
        name: "2. The Visitation",
        scripture: "Luke 1:39-56",
        fruitOfMystery: "Love of Neighbor & Charity",
        description: "Mary visits her cousin Elizabeth who is pregnant with John the Baptist. Elizabeth exclaims: 'Blessed are you among women!'"
      },
      {
        name: "3. The Nativity",
        scripture: "Luke 2:1-20",
        fruitOfMystery: "Poverty of Spirit & Detachment",
        description: "Jesus is born in a humble manger in Bethlehem while angels sing 'Gloria in Excelsis Deo' to shepherds in the fields."
      },
      {
        name: "4. The Presentation in the Temple",
        scripture: "Luke 2:22-38",
        fruitOfMystery: "Obedience & Purity",
        description: "Mary and Joseph present the infant Jesus in the Temple, where the devout Simeon proclaims Him the Light to the Gentiles."
      },
      {
        name: "5. Finding Jesus in the Temple",
        scripture: "Luke 2:41-52",
        fruitOfMystery: "Piety & Joy in Finding God",
        description: "After three days of anxious searching, Mary and Joseph find the young Jesus teaching among the doctors in the Jerusalem Temple."
      }
    ]
  },
  {
    groupName: "The Luminous Mysteries (Mysteries of Light)",
    days: "Thursdays",
    mysteries: [
      {
        name: "1. The Baptism in the Jordan",
        scripture: "Matthew 3:13-17",
        fruitOfMystery: "Openness to the Holy Spirit",
        description: "John baptizes Jesus in the River Jordan, the heavens open, the Holy Spirit descends like a dove, and the Father's voice speaks: 'This is my beloved Son.'"
      },
      {
        name: "2. The Wedding at Cana",
        scripture: "John 2:1-11",
        fruitOfMystery: "To Jesus through Mary & Fidelity",
        description: "At Mary's intercession ('Do whatever He tells you'), Jesus performs His first public miracle by changing water into wine."
      },
      {
        name: "3. The Proclamation of the Kingdom",
        scripture: "Mark 1:14-15",
        fruitOfMystery: "Repentance & Trust in God",
        description: "Jesus preaches the Good News of salvation, calling all souls to repentance, forgiveness, and conversion of heart."
      },
      {
        name: "4. The Transfiguration",
        scripture: "Matthew 17:1-8",
        fruitOfMystery: "Desire for Holiness",
        description: "Jesus is transfigured on Mount Tabor before Peter, James, and John, His face shining like the sun and garments dazzling white."
      },
      {
        name: "5. The Institution of the Holy Eucharist",
        scripture: "Matthew 26:26-30",
        fruitOfMystery: "Eucharistic Adoration & Thanksgiving",
        description: "At the Last Supper, Jesus gives us His true Body and Blood in the Holy Eucharist: 'Take, eat; this is my body... this is my blood of the covenant.'"
      }
    ]
  },
  {
    groupName: "The Sorrowful Mysteries",
    days: "Tuesdays & Fridays",
    mysteries: [
      {
        name: "1. The Agony in the Garden",
        scripture: "Matthew 26:36-46",
        fruitOfMystery: "Sorrow for Sin & Conformity to God's Will",
        description: "Jesus prays in anguish in the Garden of Gethsemane, sweating drops of blood as He accepts the Father's will: 'Not my will, but Thine be done.'"
      },
      {
        name: "2. The Scourging at the Pillar",
        scripture: "John 19:1",
        fruitOfMystery: "Mortification & Purity of the Senses",
        description: "Pilate orders Jesus to be brutally scourged with whips, enduring intense physical torment in reparation for human sins of the flesh."
      },
      {
        name: "3. The Crowning with Thorns",
        scripture: "Matthew 27:27-31",
        fruitOfMystery: "Moral Courage & Humility of Mind",
        description: "Soldiers mock Jesus as King, driving a sharp crown of thorns into His sacred head and striking Him with a reed."
      },
      {
        name: "4. The Carrying of the Cross",
        scripture: "John 19:16-17",
        fruitOfMystery: "Patience in Sufferings & Perseverance",
        description: "Jesus carries the heavy wooden cross through the streets of Jerusalem to Calvary, falling three times along the Way of Sorrows."
      },
      {
        name: "5. The Crucifixion and Death of Jesus",
        scripture: "Luke 23:33-46",
        fruitOfMystery: "Self-Sacrificing Love & Forgiveness",
        description: "Jesus is nailed to the cross and hangs in agony for three hours before crying out 'It is finished' and offering His Spirit to the Father."
      }
    ]
  },
  {
    groupName: "The Glorious Mysteries",
    days: "Wednesdays & Sundays",
    mysteries: [
      {
        name: "1. The Resurrection",
        scripture: "Matthew 28:1-10",
        fruitOfMystery: "Faith & Spiritual Rebirth",
        description: "On the third day, Christ triumphs over sin and death, rising gloriously from the tomb as Lord of Heaven and Earth."
      },
      {
        name: "2. The Ascension into Heaven",
        scripture: "Acts 1:6-11",
        fruitOfMystery: "Hope & Longing for Heaven",
        description: "Forty days after Easter, Jesus ascends into Heaven in the sight of the Apostles, taking His seat at the right hand of the Father."
      },
      {
        name: "3. The Descent of the Holy Spirit (Pentecost)",
        scripture: "Acts 2:1-4",
        fruitOfMystery: "Wisdom & Zeal for the Gospel",
        description: "The Holy Spirit descends as tongues of fire upon Mary and the Apostles gathered in the Upper Room, igniting the mission of the Church."
      },
      {
        name: "4. The Assumption of Mary into Heaven",
        scripture: "Revelation 12:1",
        fruitOfMystery: "Grace of a Happy Death & Devotion to Mary",
        description: "At the end of her earthly life, the Immaculate Virgin Mary is taken up body and soul into heavenly glory by Almighty God."
      },
      {
        name: "5. The Coronation of Mary as Queen of Heaven and Earth",
        scripture: "Revelation 12:1-2",
        fruitOfMystery: "Trust in Mary's Intercession & Eternal Crown",
        description: "The Holy Trinity crowns the Blessed Virgin Mary Queen of the Angels, Saints, and the entire Cosmos."
      }
    ]
  }
];

export const DAILY_PRAYER_SESSIONS: PrayerSessionBlock[] = [
  // ==========================================
  // MORNING PRAYER SESSION
  // ==========================================
  {
    id: "morning",
    emoji: "🌅",
    name: "Morning Prayer Session",
    tagline: "Foundation, Declaration of Faith & Daily Offering",
    recommendedTime: "6:00 AM – 8:30 AM",
    theologicalTheme: "Consecration of the day's works, anchoring identity in Christ, and invoking the Holy Trinity.",
    estimatedMinutes: 8,
    introduction: "Begin your day by grounding your mind in the eternal truths of the Catholic faith and offering every breath, action, and thought of this day to Almighty God.",
    prayers: [
      {
        id: "m-sign-of-cross",
        number: "1",
        title: "The Sign of the Cross",
        latinTitle: "Signum Crucis",
        purpose: "The ancient seal of Christians invoking the Holy and Undivided Trinity.",
        meditationPrompt: "Touch your forehead, chest, left shoulder, then right shoulder, dedicating your mind, heart, and strength to God.",
        text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
        latinText: "In nómine Patris, et Fílii, et Spíritus Sancti. Amen.",
        memorizationId: "prayer-sign-of-cross"
      },
      {
        id: "m-morning-offering",
        number: "2",
        title: "The Morning Offering",
        latinTitle: "Oblatio Matutina",
        purpose: "Consecrates all thoughts, prayers, labors, joys, and crosses of this day to Jesus through Mary's Immaculate Heart.",
        meditationPrompt: "Offer up even ordinary tasks as prayers in union with the Holy Sacrifice of the Mass celebrated across the world.",
        text: `O Jesus, through the Immaculate Heart of Mary,
I offer Thee my prayers, works, joys, and sufferings of this day
for all the intentions of Thy Sacred Heart,
in union with the Holy Sacrifice of the Mass throughout the world,
for the salvation of souls, the reparation of sins,
the reunion of all Christians,
and in particular for the intentions of the Holy Father this month.
Amen.`,
        memorizationId: "prayer-morning-offering"
      },
      {
        id: "m-apostles-creed",
        number: "3",
        title: "The Apostles' Creed",
        latinTitle: "Symbolum Apostolorum",
        purpose: "Start by declaring what you believe. This grounds your identity in Christ for the day.",
        meditationPrompt: "Every clause summarizes the apostolic faith received from Christ and defended through the centuries.",
        text: `I believe in God, the Father Almighty,
Creator of heaven and earth,
and in Jesus Christ, His only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
He descended into hell;
on the third day He rose again from the dead;
He ascended into heaven,
and is seated at the right hand of God the Father Almighty;
from there He will come to judge the living and the dead.
I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting.
Amen.`,
        latinText: `Credo in Deum Patrem omnipoténtem, Creatórem cæli et terræ.
Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum,
qui concéptus est de Spíritu Sancto, natus ex María Vírgine,
passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus,
descéndit ad ínferos, tértia die resurréxit a mórtuis,
ascéndit ad cælos, sedet ad déxteram Dei Patris omnipoténtis,
inde ventúrus est iudicáre vivos et mórtuos.
Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam,
sanctórum communiónem, remissiónem peccatórum,
carnis resurrectiónem, vitam ætérnam. Amen.`,
        memorizationId: "prayer-apostles-creed"
      },
      {
        id: "m-our-father",
        number: "4",
        title: "The Lord's Prayer (Our Father)",
        latinTitle: "Pater Noster",
        purpose: "The foundational prayer taught by Jesus Christ Himself to His disciples.",
        meditationPrompt: "Pray with special attention to 'Thy will be done' as you face today's schedule, duties, and encounters.",
        text: `Our Father, who art in heaven,
hallowed be Thy name;
Thy kingdom come;
Thy will be done
on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil.
Amen.`,
        latinText: `Pater noster, qui es in cælis,
sanctificétur nomen tuum.
Advéniat regnum tuum.
Fiat volúntas tua, sicut in cælo et in terra.
Panem nostrum cotidiánum da nobis hódie,
et dimítte nobis débita nostra sicut et nos dimíttimus debitóribus nostris.
Et ne nos indúcas in tentatiónem,
sed líbera nos a malo. Amen.`,
        memorizationId: "prayer-our-father"
      },
      {
        id: "m-hail-mary",
        number: "5",
        title: "The Hail Mary",
        latinTitle: "Ave Maria",
        purpose: "Ask for the intercession and maternal protection of the Blessed Mother.",
        meditationPrompt: "Echo the Archangel Gabriel's heavenly greeting and Elizabeth's blessing under the inspiration of the Holy Spirit.",
        text: `Hail Mary, full of grace, the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`,
        latinText: `Ave María, grátia plena, Dóminus tecum.
Benedícta tu in muliéribus,
et benedíctus fructus ventris tui, Iesus.
Sancta María, Mater Dei,
ora pro nobis peccatóribus,
nunc et in hora mortis nostræ. Amen.`,
        memorizationId: "prayer-hail-mary"
      },
      {
        id: "m-glory-be",
        number: "6",
        title: "Glory Be (Doxology)",
        latinTitle: "Gloria Patri",
        purpose: "A final burst of praise to the Holy Trinity before starting your tasks.",
        meditationPrompt: "Give God glory for all the successes, trials, and blessings this new morning holds.",
        text: `Glory be to the Father, and to the Son, and to the Holy Spirit.
As it was in the beginning, is now, and ever shall be,
world without end. Amen.`,
        latinText: `Glória Patri, et Fílio, et Spirítui Sancto.
Sicut erat in princípio, et nunc, et semper,
et in sǽcula sæculórum. Amen.`,
        memorizationId: "prayer-glory-be"
      },
      {
        id: "m-guardian-angel",
        number: "7",
        title: "Prayer to Guardian Angel",
        latinTitle: "Angele Dei",
        purpose: "Invokes your personal guardian angel assigned by God to guide and guard you today.",
        meditationPrompt: "Acknowledge the loving presence of your celestial protector throughout the hours ahead.",
        text: `Angel of God, my guardian dear,
to whom God's love commits me here,
ever this day be at my side,
to light and guard, to rule and guide.
Amen.`,
        latinText: `Angele Dei, qui custos es mei,
me, tibi commíssum pietáte supérna,
illúmina, custódi, rege et gubérna. Amen.`,
        memorizationId: "prayer-guardian-angel"
      }
    ]
  },

  // ==========================================
  // AFTERNOON PRAYER SESSION
  // ==========================================
  {
    id: "afternoon",
    emoji: "☀️",
    name: "Afternoon Prayer Session",
    tagline: "Intercession, Fatima Reparation & The Holy Rosary",
    recommendedTime: "12:00 PM – 3:30 PM",
    theologicalTheme: "Deep meditative prayer, Marian intercession, reparation for sinners, and meditation on the mysteries of salvation.",
    estimatedMinutes: 15,
    introduction: "Use your afternoon session for deeper, meditative prayer. This is the perfect time to pray the Angelus, offer the Fatima Prayers, and pray the Holy Rosary (or a single decade if short on time).",
    prayers: [
      {
        id: "a-the-angelus",
        number: "1",
        title: "The Angelus",
        latinTitle: "Angelus Domini",
        purpose: "Traditional midday commemoration of the Incarnation of Jesus Christ in the womb of the Virgin Mary.",
        meditationPrompt: "Pause the bustle of the day to venerate the moment God became Man for our salvation.",
        text: `V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.
(Hail Mary...)

V. Behold the handmaid of the Lord.
R. Be it done unto me according to Thy word.
(Hail Mary...)

V. And the Word was made flesh.
R. And dwelt among us.
(Hail Mary...)

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray:
Pour forth, we beseech Thee, O Lord, Thy grace into our hearts,
that we, to whom the Incarnation of Christ Thy Son was made known by the message of an angel,
may by His Passion and Cross be brought to the glory of His Resurrection.
Through the same Christ our Lord.
Amen.`,
        memorizationId: "prayer-the-angelus"
      },
      {
        id: "a-fatima-pardon",
        number: "2",
        title: "The Fatima Pardon Prayer",
        latinTitle: "Oratio Fatimae de Venia",
        purpose: "A beautiful prayer given by the Angel of Peace at Fatima (1916) to repeat throughout the day to re-center your heart.",
        meditationPrompt: "Pray this on behalf of family members, friends, or those throughout the world who do not yet believe or love God.",
        text: `My God, I believe, I adore, I hope and I love Thee!
I ask pardon for those who do not believe,
do not adore,
do not hope,
and do not love Thee.`,
        memorizationId: "prayer-fatima-pardon"
      },
      {
        id: "a-fatima-decade",
        number: "3",
        title: "The Fatima Decade Prayer",
        latinTitle: "Oratio Fatimae ad Decadam",
        purpose: "Taught by Our Lady of Fatima (July 13, 1917) to be recited at the end of each decade of the Rosary, right after the Glory Be.",
        meditationPrompt: "Intercede for poor souls, especially those near death or facing severe spiritual crisis.",
        text: `O my Jesus, forgive us our sins,
save us from the fires of hell,
lead all souls to Heaven,
especially those most in need of Thy mercy.
Amen.`,
        memorizationId: "prayer-fatima-decade"
      },
      {
        id: "a-fatima-angel",
        number: "4",
        title: "The Fatima Angel Prayer (Reparation)",
        latinTitle: "Oratio Reparationis Fatimae",
        purpose: "An offering of profound adoration and reparation before the Holy Eucharist present in tabernacles across the world.",
        meditationPrompt: "Unite your heart with all the neglected tabernacles of the earth, consoling the Sacred Heart of Jesus.",
        text: `Most Holy Trinity, Father, Son, and Holy Spirit,
I adore Thee profoundly,
and I offer Thee the most precious Body, Blood, Soul, and Divinity of Jesus Christ,
present in all the tabernacles of the world,
in reparation for the outrages, sacrileges, and indifference
with which He Himself is offended.
And, through the infinite merits of His Most Sacred Heart,
and the Immaculate Heart of Mary,
I beg of Thee the conversion of poor sinners.
Amen.`,
        memorizationId: "prayer-fatima-angel"
      },
      {
        id: "a-fatima-sacrifice",
        number: "5",
        title: "The Fatima Sacrifice Prayer",
        purpose: "To be prayed whenever offering up a daily hardship, suffering, inconvenience, or sacrifice.",
        meditationPrompt: "Transform daily inconveniences and headaches into spiritual currency for the conversion of sinners.",
        text: `O Jesus, it is for love of Thee,
for the conversion of sinners,
and in reparation for the sins committed against the Immaculate Heart of Mary.
Amen.`,
        memorizationId: "prayer-fatima-sacrifice"
      },
      {
        id: "a-fatima-eucharistic",
        number: "6",
        title: "The Fatima Eucharistic Prayer",
        purpose: "A joyful interior prayer of adoration taught to the three shepherd children.",
        meditationPrompt: "Express pure, childlike love to the Blessed Sacrament.",
        text: `Most Holy Trinity, I adore Thee!
My God, my God, I love Thee in the Most Blessed Sacrament.
Amen.`,
        memorizationId: "prayer-fatima-eucharistic"
      },
      {
        id: "a-memorare",
        number: "7",
        title: "The Memorare",
        latinTitle: "Memorare",
        purpose: "Prayer of unshakeable confidence in Our Lady's maternal intercession, attributed to St. Bernard of Clairvaux.",
        meditationPrompt: "Bring your most pressing petition or sorrow to Mary with total trust.",
        text: `Remember, O most gracious Virgin Mary,
that never was it known that anyone who fled to thy protection,
implored thy help, or sought thy intercession was left unaided.
Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother.
To thee do I come, before thee I stand, sinful and sorrowful.
O Mother of the Word Incarnate, despise not my petitions,
but in thy mercy hear and answer me.
Amen.`,
        memorizationId: "prayer-memorare"
      }
    ]
  },

  // ==========================================
  // EVENING PRAYER SESSION
  // ==========================================
  {
    id: "evening",
    emoji: "🌌",
    name: "Evening Prayer Session",
    tagline: "Examination of Conscience, Contrition & Night Protection",
    recommendedTime: "8:30 PM – 10:30 PM",
    theologicalTheme: "Examination of the day's actions against God's Commandments, sincere contrition, seeking divine mercy, and peaceful surrender into God's hands.",
    estimatedMinutes: 10,
    introduction: "Before you sleep, quiet your soul, examine your day honestly in light of God's love, seek forgiveness for failings, and place your rest under the protection of Christ, Our Lady, and St. Michael.",
    prayers: [
      {
        id: "e-examination",
        number: "1",
        title: "Guarding the Commandments (Daily Examination of Conscience)",
        purpose: "Your handouts emphasize the Two Greatest Commandments: Loving God with all your heart, and loving your neighbor as yourself. Spend 2 minutes reflecting on how you lived these out today.",
        meditationPrompt: "Ask the Holy Spirit for light to see your virtues and failings today with clarity and humility.",
        text: `✝️ Light from the Holy Spirit:
"Come Holy Spirit, enlighten my mind to see my sins, and soften my heart to be truly contrite."

1. The First Greatest Commandment (Love God above all things):
• Did I pray with reverence today, or rush through distraction?
• Did I place anything (pride, comfort, screen time, vanity) before God?
• Did I take God's Holy Name in vain or speak disrespectfully of holy things?

2. The Second Greatest Commandment (Love your neighbor as yourself):
• Was I impatient, angry, harsh, or unkind to family, coworkers, or strangers?
• Did I speak gossip, falsehoods, or uncharitable words about others?
• Did I harbor grudges, resentment, or fail to forgive someone who offended me?
• Did I guard my thoughts, eyes, and purity with holy reverence?
• Did I practice generosity and help those in need around me?`,
        memorizationId: "commandments-two-great"
      },
      {
        id: "e-act-of-contrition",
        number: "2",
        title: "The Act of Contrition",
        latinTitle: "Actus Contritionis",
        purpose: "Examine your day honestly, then pray this to ask God for His forgiving mercy with a firm resolution to avoid sin tomorrow.",
        meditationPrompt: "Sorrow arising not just from fear of punishment, but primarily because sin offends God Who is all good.",
        text: `O my God, I am heartily sorry for having offended Thee,
and I detest all my sins because of Thy just punishments,
but most of all because they offend Thee, my God,
who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasions of sin.
Amen.`,
        latinText: `Deus meus, ex toto corde pǽnitet me ómnium meórum peccatórum,
eaque detéstor, quia peccándo,
non solum pœnas a te iuste statútas proméritus sum,
sed præsértim quia offéndi te, summum bonum,
ac dignum qui super ómnia diligáris.
Ideo fírmiter propóno, adiuvánte grátia tua,
de cétero me non peccatúrum peccandíque occasiónes próximas fugitúrum.
Amen.`,
        memorizationId: "prayer-act-of-contrition"
      },
      {
        id: "e-salve-regina",
        number: "3",
        title: "Hail, Holy Queen (Salve Regina)",
        latinTitle: "Salve Regina",
        purpose: "Conclude your day under the maternal mantle of Mary's protection and tender care.",
        meditationPrompt: "The traditional night antiphon of the Church, looking toward Jesus after our earthly exile.",
        text: `Hail, Holy Queen, Mother of Mercy,
our life, our sweetness and our hope.
To thee do we cry, poor banished children of Eve.
To thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
thine eyes of mercy toward us,
and after this our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.
Amen.`,
        latinText: `Salve, Regína, Mater misericórdiæ,
vita, dulcédo, et spes nostra, salve.
Ad te clamámus éxsules fílii Hevæ,
ad te suspirámus, geméntes et flentes in hac lacrimárum valle.
Eia, ergo, advocáta nostra, illos tuos misericórdes óculos ad nos convérte;
et Iesum, benedíctum fructum ventris tui,
nobis post hoc exsílium osténde.
O clemens, O pia, O dulcis Virgo María. Amen.`,
        memorizationId: "prayer-hail-holy-queen"
      },
      {
        id: "e-st-michael",
        number: "4",
        title: "Prayer to Saint Michael the Archangel",
        latinTitle: "Sancte Michael Archangele",
        purpose: "Spiritual armor and protection through the hours of darkness and sleep.",
        meditationPrompt: "Call upon the Prince of the Heavenly Host to drive away all evil spirits and nightmares.",
        text: `Saint Michael the Archangel, defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray;
and do thou, O Prince of the Heavenly Host,
by the power of God,
cast into hell Satan and all the evil spirits
who prowl about the world seeking the ruin of souls.
Amen.`,
        latinText: `Sancte Míchael Archángele, defénde nos in prœ́lio;
contra nequítiam et insídias diáboli esto præsídium.
Ímperet illi Deus, súpplices deprecámur:
tuque, Princeps milítiæ cæléstis,
Sátanam aliósque spíritus malígnos,
qui ad perditiónem animárum pervagántur in mundo,
divína virtúte, in inférnum detrúde. Amen.`,
        memorizationId: "prayer-st-michael"
      },
      {
        id: "e-nunc-dimittis",
        number: "5",
        title: "Canticle of Simeon (Nunc Dimittis) & Night Blessing",
        latinTitle: "Canticum Simeonis",
        purpose: "The Church's ancient night prayer from Compline, surrendering into God's peaceful embrace.",
        meditationPrompt: "Resting peacefully in the knowledge that Christ our Savior is with us through the night.",
        text: `Lord, now let Your servant depart in peace,
according to Your word.
For mine eyes have seen Your salvation,
which You have prepared in the sight of all peoples:
a light to reveal You to the nations
and the glory of Your people Israel.

Antiphon:
Protect us, Lord, as we stay awake; watch over us as we sleep,
that awake, we may keep watch with Christ, and asleep, rest in His peace.

May the all-powerful Lord grant us a restful night and a peaceful death.
Amen.`
      }
    ]
  }
];

export interface RosaryStep {
  stepNumber: number;
  beadName: string;
  prayerName: string;
  instruction: string;
}

export const ROSARY_STEP_GUIDE: RosaryStep[] = [
  {
    stepNumber: 1,
    beadName: "The Crucifix",
    prayerName: "Sign of the Cross & Apostles' Creed",
    instruction: "Holding the crucifix, make the Sign of the Cross and devoutly recite the Apostles' Creed to declare your faith."
  },
  {
    stepNumber: 2,
    beadName: "First Large Bead",
    prayerName: "The Lord's Prayer (Our Father)",
    instruction: "Pray the Our Father for the intentions of the Holy Father (the Pope)."
  },
  {
    stepNumber: 3,
    beadName: "Next 3 Small Beads",
    prayerName: "Three Hail Marys (Faith, Hope, and Charity)",
    instruction: "Recite 3 Hail Marys asking for an increase in the theological virtues of Faith, Hope, and Divine Charity."
  },
  {
    stepNumber: 4,
    beadName: "Chain / Space",
    prayerName: "Glory Be & Fatima Decade Prayer",
    instruction: "Recite the Glory Be followed by 'O my Jesus, forgive us our sins, save us from the fires of hell...'"
  },
  {
    stepNumber: 5,
    beadName: "Decades 1 through 5 (Each Decade)",
    prayerName: "Announce Mystery + 1 Our Father + 10 Hail Marys + Glory Be + Fatima Decade Prayer",
    instruction: "1. Announce the Mystery and meditate on the fruit of the mystery. 2. Pray 1 Our Father on the large bead. 3. Pray 10 Hail Marys on the 10 small beads while meditating. 4. Conclude with Glory Be and the Fatima Decade Prayer."
  },
  {
    stepNumber: 6,
    beadName: "The Medal / Centerpiece",
    prayerName: "Hail Holy Queen (Salve Regina) & Concluding Prayer",
    instruction: "Recite the Hail, Holy Queen, followed by: 'O God, whose only-begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life...'"
  }
];
