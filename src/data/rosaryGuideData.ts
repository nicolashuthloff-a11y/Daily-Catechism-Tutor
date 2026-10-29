export interface RosaryInstructionStep {
  stepNumber: number;
  beadNameEn: string;
  beadNameDe: string;
  prayerNameEn: string;
  prayerNameDe: string;
  prayerTextEn: string;
  prayerTextDe: string;
  prayerTextLa?: string;
  instructionEn: string;
  instructionDe: string;
}

export interface RosaryMysteryDetail {
  number: number;
  nameEn: string;
  nameDe: string;
  nameLa: string;
  fruitEn: string;
  fruitDe: string;
  scriptureRef: string;
  meditationEn: string;
  meditationDe: string;
  clausuleDe: string; // German custom insertion into the Hail Mary (e.g. "...Jesus, den du, o Jungfrau, vom Heiligen Geist empfangen hast.")
}

export interface RosaryMysterySet {
  id: "joyful" | "luminous" | "sorrowful" | "glorious";
  titleEn: string;
  titleDe: string;
  titleLa: string;
  daysEn: string;
  daysDe: string;
  mysteries: RosaryMysteryDetail[];
}

export const ROSARY_INSTRUCTION_STEPS: RosaryInstructionStep[] = [
  {
    stepNumber: 1,
    beadNameEn: "Crucifix",
    beadNameDe: "Kruzifix (Kreuz)",
    prayerNameEn: "Sign of the Cross & Apostles' Creed",
    prayerNameDe: "Kreuzzeichen & Apostolisches Glaubensbekenntnis",
    prayerTextEn: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nI believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord: Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He arose again from the dead; He ascended into heaven, sitteth at the right hand of God the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Ghost, the Holy Catholic Church, the communion of Saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
    prayerTextDe: "Im Namen des Vaters und des Sohnes und des Heiligen Geistes. Amen.\n\nIch glaube an Gott, den Vater, den Allmächtigen, den Schöpfer des Himmels und der Erde, und an Jesus Christus, seinen eingeborenen Sohn, unsern Herrn, empfangen durch den Heiligen Geist, geboren von der Jungfrau Maria, gelitten unter Pontius Pilatus, gekreuzigt, gestorben und begraben, hinabgestiegen in das Reich des Todes, am dritten Tage auferstanden von den Toten, aufgefahren in den Himmel; er sitzt zur Rechten Gottes, des allmächtigen Vaters; von dort wird er kommen, zu richten die Lebenden und die Toten. Ich glaube an den Heiligen Geist, die heilige katholische Kirche, Gemeinschaft der Heiligen, Vergebung der Sünden, Auferstehung der Toten und das ewige Leben. Amen.",
    prayerTextLa: "In nómine Patris, et Fílii, et Spíritus Sancti. Amen.\n\nCredo in Deum Patrem omnipoténtem, Creatórem cæli et terræ...",
    instructionEn: "Hold the crucifix, make the Sign of the Cross devoutly, and recite the Apostles' Creed.",
    instructionDe: "Halte das Kreuz des Rosenkranzes, mache das Kreuzzeichen und bete das Apostolische Glaubensbekenntnis."
  },
  {
    stepNumber: 2,
    beadNameEn: "First Large Bead",
    beadNameDe: "Erste große Perle",
    prayerNameEn: "The Our Father (Pater Noster)",
    prayerNameDe: "Das Vaterunser",
    prayerTextEn: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
    prayerTextDe: "Vater unser im Himmel, geheiligt werde dein Name. Dein Reich komme. Dein Wille geschehe, wie im Himmel so auf Erden. Unser tägliches Brot gib uns heute. Und vergib uns unsere Schuld, wie auch wir vergeben unseren Schuldigern. Und führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Amen.",
    prayerTextLa: "Pater noster, qui es in cælis, sanctificétur nomen tuum...",
    instructionEn: "Pray one Our Father for the intentions of the Holy Father (the Pope).",
    instructionDe: "Bete ein Vaterunser in den Meinungen des Heiligen Vaters."
  },
  {
    stepNumber: 3,
    beadNameEn: "Next 3 Small Beads",
    beadNameDe: "Drei kleine Perlen",
    prayerNameEn: "3 Hail Marys (For Faith, Hope, and Charity)",
    prayerNameDe: "Drei Ave Maria (für Glaube, Hoffnung und Liebe)",
    prayerTextEn: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.\n1. Who may increase our Faith.\n2. Who may strengthen our Hope.\n3. Who may enkindle in us the virtue of Charity.\nHoly Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
    prayerTextDe: "Gegrüßet seist du, Maria, voll der Gnade, der Herr ist mit dir. Du bist gebenedeit unter den Frauen, und gebenedeit ist die Frucht deines Leibes, Jesus...\n1. ...der in uns den Glauben vermehre.\n2. ...der in uns die Hoffnung stärke.\n3. ...der in uns die Liebe entzünde.\nHeilige Maria, Mutter Gottes, bitte für uns Sünder jetzt und in der Stunde unseres Todes. Amen.",
    instructionEn: "Pray 3 Hail Marys for an increase in the theological virtues of Faith, Hope, and Charity.",
    instructionDe: "Bete drei Ave Maria um die göttlichen Tugenden: Glaube, Hoffnung und Liebe."
  },
  {
    stepNumber: 4,
    beadNameEn: "Chain / Large Bead Gap",
    beadNameDe: "Kettenglied vor dem Medaillon",
    prayerNameEn: "Glory Be & Fatima Decade Prayer",
    prayerNameDe: "Ehre sei dem Vater & Fatima-Gebet",
    prayerTextEn: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen.",
    prayerTextDe: "Ehre sei dem Vater und dem Sohn und dem Heiligen Geist, wie im Anfang, so auch jetzt und alle Zeit und in Ewigkeit. Amen.\n\nO mein Jesus, verzeih uns unsere Sünden, bewahre uns vor dem Feuer der Hölle, führe alle Seelen in den Himmel, besonders jene, die deiner Barmherzigkeit am meisten bedürfen. Amen.",
    instructionEn: "Conclude the introductory prayers with the Glory Be and the Fatima Prayer given by Our Lady to the children in 1917.",
    instructionDe: "Schließe die Eröffnungsgebete mit dem Ehre sei dem Vater und dem Fatima-Gebet ab."
  },
  {
    stepNumber: 5,
    beadNameEn: "The 5 Decades (10 Beads each)",
    beadNameDe: "Die 5 Gesätze (je 10 Perlen)",
    prayerNameEn: "Decade Structure: Mystery Announcement, 1 Our Father, 10 Hail Marys, 1 Glory Be, 1 Fatima Prayer",
    prayerNameDe: "Aufbau eines Gesätzes: Geheimnis, 1 Vaterunser, 10 Ave Maria, 1 Ehre sei dem Vater, 1 Fatima-Gebet",
    prayerTextEn: "For each of the 5 decades:\n1. Announce the Mystery and meditate upon the fruit.\n2. Pray 1 Our Father on the large bead.\n3. Pray 10 Hail Marys on the small beads while contemplating the mystery.\n4. Conclude with 1 Glory Be and 1 Fatima Prayer.",
    prayerTextDe: "Für jedes der 5 Gesätze:\n1. Kündige das Geheimnis an und betrachte die geistliche Frucht.\n2. Bete 1 Vaterunser auf der großen Perle.\n3. Bete 10 Ave Maria auf den kleinen Perlen (mit dem jeweiligen Geheimnis-Einschub).\n4. Schließe mit 1 Ehre sei dem Vater und dem Fatima-Gebet ab.",
    instructionEn: "Repeat this rhythm for all 5 decades of the chosen Mystery group (Joyful, Luminous, Sorrowful, or Glorious).",
    instructionDe: "Wiederhole diese Abfolge für alle 5 Gesätze der ausgewählten Geheimnisse."
  },
  {
    stepNumber: 6,
    beadNameEn: "Medal / Conclusion",
    beadNameDe: "Medaillon & Abschluss",
    prayerNameEn: "Hail Holy Queen (Salve Regina) & Concluding Prayer",
    prayerNameDe: "Salve Regina (Gegrüßet seist du, Königin) & Schlussgebet",
    prayerTextEn: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.\n\nV. Pray for us, O Holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray: O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.",
    prayerTextDe: "Sei gegrüßt, o Königin, Mutter der Barmherzigkeit, unser Leben, unsre Wonne und unsre Hoffnung, sei gegrüßt! Zu dir rufen wir verbannte Kinder Evas; zu dir seufzen wir trauernd und weinend in diesem Tal der Tränen. Wohlan denn, unsre Fürsprecherin, wende deine barmherzigen Augen uns zu, und nach diesem Elend zeige uns Jesus, die gebenedeite Frucht deines Leibes. O gütige, o milde, o süße Jungfrau Maria!\n\nV. Bitte für uns, o heilige Gottesmutter.\nR. Auf dass wir würdig werden der Verheißungen Christi.\n\nLasset uns beten: O Gott, dessen eingeborener Sohn durch sein Leben, seinen Tod und seine Auferstehung uns die Belohnung des ewigen Heiles erworben hat; verleihe uns, wir bitten dich, dass wir, indem wir diese Geheimnisse im heiligsten Rosenkranze der seligsten Jungfrau Maria betrachten, nachahmen, was sie enthalten, und erlangen, was sie verheißen. Durch denselben Christus, unsern Herrn. Amen.",
    instructionEn: "Hold the central medal, recite the Salve Regina, the versicle, and the final collect prayer.",
    instructionDe: "Halte das Medaillon und bete das Salve Regina sowie das offizielle liturgische Schlussgebet."
  }
];

export const ROSARY_MYSTERY_SETS: RosaryMysterySet[] = [
  // 1. JOYFUL MYSTERIES
  {
    id: "joyful",
    titleEn: "The Joyful Mysteries",
    titleDe: "Die freudenreichen Geheimnisse",
    titleLa: "Mystéria Gaudiósa",
    daysEn: "Mondays & Saturdays (and Sundays during Advent & Christmastide)",
    daysDe: "Montag und Samstag (sowie Sonntage im Advent und in der Weihnachtszeit)",
    mysteries: [
      {
        number: 1,
        nameEn: "The Annunciation",
        nameDe: "Die Verkündigung des Herrn",
        nameLa: "Annuntiátio",
        fruitEn: "Humility",
        fruitDe: "Demut",
        scriptureRef: "Luke 1:26-38",
        meditationEn: "The Archangel Gabriel announces to Mary that she will conceive the Son of the Most High by the Holy Spirit. Mary responds in humble submission: 'Fiat mihi secundum verbum tuum.'",
        meditationDe: "Der Erzengel Gabriel verkündet Maria die Botschaft der Menschwerdung. Maria spricht ihr demütiges Ja-Wort.",
        clausuleDe: "...Jesus, den du, o Jungfrau, vom Heiligen Geist empfangen hast."
      },
      {
        number: 2,
        nameEn: "The Visitation",
        nameDe: "Die Heimsuchung Mariens",
        nameLa: "Visitátio",
        fruitEn: "Love of Neighbor & Charity",
        fruitDe: "Nächstenliebe und Hilfsbereitschaft",
        scriptureRef: "Luke 1:39-56",
        meditationEn: "Mary travels in haste to the hill country of Judea to serve her cousin Elizabeth, carrying the unborn Savior in her womb.",
        meditationDe: "Maria eilt zu ihrer Cousine Elisabeth ins Gebirge, um ihr beizustehen. Johannes der Täufer hüpft vor Freude im Mutterleib.",
        clausuleDe: "...Jesus, den du, o Jungfrau, zu Elisabeth getragen hast."
      },
      {
        number: 3,
        nameEn: "The Nativity of Our Lord",
        nameDe: "Die Geburt Christi in Bethlehem",
        nameLa: "Natívitas",
        fruitEn: "Poverty of Spirit & Detachment",
        fruitDe: "Armut im Geiste und Loslösung von der Welt",
        scriptureRef: "Luke 2:1-20",
        meditationEn: "The Son of God is born in a humble stable in Bethlehem, wrapped in swaddling clothes and laid in a manger.",
        meditationDe: "Der Erlöser der Welt wird in vollkommener Armut in einem Stall zu Bethlehem geboren.",
        clausuleDe: "...Jesus, den du, o Jungfrau, zu Bethlehem geboren hast."
      },
      {
        number: 4,
        nameEn: "The Presentation in the Temple",
        nameDe: "Die Darstellung Jesu im Tempel",
        nameLa: "Præsentátio",
        fruitEn: "Purity & Obedience to the Law",
        fruitDe: "Reinheit des Herzens und Gehorsam",
        scriptureRef: "Luke 2:22-38",
        meditationEn: "Mary and Joseph present the Child Jesus in the Temple. Holy Simeon prophesies that a sword will pierce Mary's soul.",
        meditationDe: "Maria und Josef bringen das göttliche Kind in den Tempel dar. Der greise Simeon preist das Heil für alle Völker.",
        clausuleDe: "...Jesus, den du, o Jungfrau, im Tempel aufgeopfert hast."
      },
      {
        number: 5,
        nameEn: "The Finding of the Child Jesus in the Temple",
        nameDe: "Das Wiederfinden Jesu im Tempel",
        nameLa: "Invéntio in Templo",
        fruitEn: "Piety & Seeking God Above All",
        fruitDe: "Eifer im Suchen des göttlichen Willens",
        scriptureRef: "Luke 2:41-52",
        meditationEn: "After three days of anxious seeking, Mary and Joseph find the 12-year-old Jesus in the Temple, sitting among the teachers.",
        meditationDe: "Nach drei schmerzvollen Tagen finden Maria und Josef den zwölfjährigen Jesus im Hause seines Vaters wieder.",
        clausuleDe: "...Jesus, den du, o Jungfrau, im Tempel wiedergefunden hast."
      }
    ]
  },

  // 2. LUMINOUS MYSTERIES
  {
    id: "luminous",
    titleEn: "The Luminous Mysteries (Mysteries of Light)",
    titleDe: "Die lichtreichen Geheimnisse",
    titleLa: "Mystéria Luminósa",
    daysEn: "Thursdays",
    daysDe: "Donnerstag",
    mysteries: [
      {
        number: 1,
        nameEn: "The Baptism in the Jordan",
        nameDe: "Die Taufe Jesu im Jordan",
        nameLa: "Baptísma apud Iordánem",
        fruitEn: "Openness to the Holy Spirit",
        fruitDe: "Erneuerung des Taufbundes und Geistoffenheit",
        scriptureRef: "Matthew 3:13-17",
        meditationEn: "Jesus is baptized by John; the heavens open and the Father proclaims: 'This is my beloved Son, in whom I am well pleased.'",
        meditationDe: "Johannes tauft Jesus im Jordan. Der Heilige Geist schwebt wie eine Taube herab und der Vater bezeugt seinen geliebten Sohn.",
        clausuleDe: "...Jesus, der von Johannes getauft worden ist."
      },
      {
        number: 2,
        nameEn: "The Wedding at Cana",
        nameDe: "Die Selbstoffenbarung bei der Hochzeit zu Kana",
        nameLa: "Auto-revelátio ad Canæ Nuptias",
        fruitEn: "To Jesus through Mary & Marital Fidelity",
        fruitDe: "Treue und Vertrauen auf Mariens Fürsprache",
        scriptureRef: "John 2:1-11",
        meditationEn: "At Mary's intercession ('Do whatever He tells you'), Christ performs His first public miracle, turning water into choice wine.",
        meditationDe: "Auf die Bitte Marias hin vollbringt Jesus sein erstes Wunder und verwandelt Wasser in kostbaren Wein.",
        clausuleDe: "...Jesus, der sich bei der Hochzeit zu Kana offenbart hat."
      },
      {
        number: 3,
        nameEn: "The Proclamation of the Kingdom of God",
        nameDe: "Die Verkündigung des Reiches Gottes und Ruf zur Umkehr",
        nameLa: "Regni Dei Proclamátio",
        fruitEn: "Repentance & Trust in God",
        fruitDe: "Aufrichtige Buße und Umkehr des Herzens",
        scriptureRef: "Mark 1:14-15",
        meditationEn: "Jesus preaches the Good News, forgives sins, and invites all people to repent and believe in the Gospel.",
        meditationDe: "Jesus ruft die Menschen zur Bekehrung auf und schenkt den Sündern Vergebung und Heil.",
        clausuleDe: "...Jesus, der uns das Reich Gottes verkündet hat."
      },
      {
        number: 4,
        nameEn: "The Transfiguration",
        nameDe: "Die Verklärung Christi auf dem Berg Tabor",
        nameLa: "Transfigurátio",
        fruitEn: "Desire for Holiness & Heavenly Glory",
        fruitDe: "Sehnsucht nach der himmlischen Herrlichkeit",
        scriptureRef: "Luke 9:28-36",
        meditationEn: "Christ is transfigured with dazzling light on Mount Tabor before Peter, James, and John, with Moses and Elijah.",
        meditationDe: "Auf dem Berg Tabor erstrahlt Jesu Antlitz wie die Sonne; Petrus, Jakobus und Johannes schauen seine göttliche Herrlichkeit.",
        clausuleDe: "...Jesus, der auf dem Berg verklärt worden ist."
      },
      {
        number: 5,
        nameEn: "The Institution of the Holy Eucharist",
        nameDe: "Die Einsetzung der Heiligsten Eucharistie",
        nameLa: "Eucharístiæ Institútio",
        fruitEn: "Eucharistic Adoration & Sacramental Devotion",
        fruitDe: "Ehrfurcht vor dem Allerheiligsten Altarsakrament",
        scriptureRef: "Matthew 26:26-30",
        meditationEn: "At the Last Supper, Christ institutes the Holy Sacrifice of the Mass and the Priesthood, giving His Body and Blood as true food.",
        meditationDe: "Am Gründonnerstag schenkt Jesus sich selbst im heiligsten Sakrament des Altares als Speise für das ewige Leben.",
        clausuleDe: "...Jesus, der uns die Eucharistie geschenkt hat."
      }
    ]
  },

  // 3. SORROWFUL MYSTERIES
  {
    id: "sorrowful",
    titleEn: "The Sorrowful Mysteries",
    titleDe: "Die schmerzhaften Geheimnisse",
    titleLa: "Mystéria Dolorósa",
    daysEn: "Tuesdays & Fridays (and daily during Lent)",
    daysDe: "Dienstag und Freitag (sowie täglich in der Fastenzeit)",
    mysteries: [
      {
        number: 1,
        nameEn: "The Agony in the Garden (Gethsemane)",
        nameDe: "Die Todesangst Jesu am Ölberg",
        nameLa: "Agonía in Horto",
        fruitEn: "Contrition for Sin & Conformity to God's Will",
        fruitDe: "Reue über die Sünden und Ergebung in Gottes Willen",
        scriptureRef: "Luke 22:39-46",
        meditationEn: "Jesus sweats blood in the Garden of Olives, taking upon Himself the weight of all human sin: 'Not my will, but Thine be done.'",
        meditationDe: "Im Garten Getsemani schwitzt Jesus Blut und betet voll Ergebung: 'Nicht mein, sondern dein Wille geschehe.'",
        clausuleDe: "...Jesus, der für uns Blut geschwitzt hat."
      },
      {
        number: 2,
        nameEn: "The Scourging at the Pillar",
        nameDe: "Die Geißelung Jesu an der Säule",
        nameLa: "Flagellátio",
        fruitEn: "Mortification of the Senses & Purity",
        fruitDe: "Abtötung der Sinne und Reinheit des Leibes",
        scriptureRef: "John 19:1",
        meditationEn: "Pilate orders Jesus to be tied to a stone pillar and mercilessly scourged with Roman whips to satisfy the mob.",
        meditationDe: "Jesus lässt sich an die Martersäule binden und grausam geißeln zur Sühne für unsere fleischlichen Sünden.",
        clausuleDe: "...Jesus, der für uns gegeißelt worden ist."
      },
      {
        number: 3,
        nameEn: "The Crowning with Thorns",
        nameDe: "Die Dornenkrönung Jesu",
        nameLa: "Coronátio Spinis",
        fruitEn: "Moral Courage & Humility Against Pride",
        fruitDe: "Demut und Überwindung des Hochmuts",
        scriptureRef: "Matthew 27:27-31",
        meditationEn: "Soldiers twist a crown of sharp thorns and press it into Christ's sacred head, draping Him in mock purple and spitting on Him.",
        meditationDe: "Die Soldaten flechten eine scharfe Dornenkrone, drücken sie auf sein Haupt und verspotten den König der Könige.",
        clausuleDe: "...Jesus, der für uns mit Dornen gekrönt worden ist."
      },
      {
        number: 4,
        nameEn: "The Carrying of the Cross",
        nameDe: "Das schwere Kreuztragen nach Golgota",
        nameLa: "Baiulátio Crucis",
        fruitEn: "Patience in Suffering & Bearing Crosses",
        fruitDe: "Geduld im Leiden und standhaftes Kreuztragen",
        scriptureRef: "John 19:16-17",
        meditationEn: "Jesus carries the heavy timber of the Cross along the Via Dolorosa to Calvary, falling three times beneath its crushing weight.",
        meditationDe: "Mit zerfleischtem Leibe schleppt der Herr das schwere Kreuz durch die Straßen Jerusalems hinauf nach Golgota.",
        clausuleDe: "...Jesus, der für uns das schwere Kreuz getragen hat."
      },
      {
        number: 5,
        nameEn: "The Crucifixion and Death of Our Lord",
        nameDe: "Die Kreuzigung und der Tod Jesu am Kreuz",
        nameLa: "Crucifíxio",
        fruitEn: "Self-Sacrifice, Forgiveness & Salvation of Souls",
        fruitDe: "Hingebungsvolle Liebe und Vergebung den Feinden",
        scriptureRef: "Luke 23:33-46",
        meditationEn: "Nailed to the Cross between two thieves, Christ forgives His executioners, gives Mary to St. John as Mother, and yields up His Spirit.",
        meditationDe: "Jesus wird ans Kreuz geschlagen. Er betet für seine Henker, schenkt uns Maria zur Mutter und stirbt für unser ewiges Heil.",
        clausuleDe: "...Jesus, der für uns am Kreuz gestorben ist."
      }
    ]
  },

  // 4. GLORIOUS MYSTERIES
  {
    id: "glorious",
    titleEn: "The Glorious Mysteries",
    titleDe: "Die glorreichen Geheimnisse",
    titleLa: "Mystéria Gloriósa",
    daysEn: "Wednesdays & Sundays (and throughout Eastertide)",
    daysDe: "Mittwoch und Sonntag (sowie in der gesamten Osterzeit)",
    mysteries: [
      {
        number: 1,
        nameEn: "The Resurrection of Jesus from the Dead",
        nameDe: "Die glorreiche Auferstehung von den Toten",
        nameLa: "Resurréctio",
        fruitEn: "Living Faith",
        fruitDe: "Lebendiger Glaube und geistliche Auferstehung",
        scriptureRef: "Matthew 28:1-10",
        meditationEn: "On the third day, Christ breaks the bonds of death and rises glorious and immortal from the sealed tomb.",
        meditationDe: "Am dritten Tage ersteht Christus siegreich und unsterblich aus dem versiegelten Grabe auf.",
        clausuleDe: "...Jesus, der von den Toten auferstanden ist."
      },
      {
        number: 2,
        nameEn: "The Ascension of Jesus into Heaven",
        nameDe: "Die Himmelfahrt Christi",
        nameLa: "Ascénsio",
        fruitEn: "Christian Hope & Longing for Heaven",
        fruitDe: "Christliche Hoffnung und Verlangen nach dem Himmel",
        scriptureRef: "Acts 1:6-11",
        meditationEn: "Forty days after Easter, Christ ascends bodily into heaven in the sight of His Apostles to sit at the right hand of the Father.",
        meditationDe: "Vor den Augen seiner Jünger fährt Christus auf in den Himmel, um uns eine ewige Wohnung zu bereiten.",
        clausuleDe: "...Jesus, der in den Himmel aufgefahren ist."
      },
      {
        number: 3,
        nameEn: "The Descent of the Holy Spirit (Pentecost)",
        nameDe: "Die Ausgießung des Heiligen Geistes an Pfingsten",
        nameLa: "Descénsus Spíritus Sancti",
        fruitEn: "Zeal, Wisdom & Love of God",
        fruitDe: "Apostolischer Eifer und Liebe zum Gebet",
        scriptureRef: "Acts 2:1-4",
        meditationEn: "The Holy Spirit descends in the form of tongues of fire upon Our Lady and the Apostles gathered in the Upper Room.",
        meditationDe: "Im Abendmahlssaal erfüllt der Heilige Geist in Feuerzungen Maria und die Apostel mit himmlischer Kraft und Weisheit.",
        clausuleDe: "...Jesus, der uns den Heiligen Geist gesandt hat."
      },
      {
        number: 4,
        nameEn: "The Assumption of the Blessed Virgin Mary",
        nameDe: "Die leibliche Aufnahme Mariens in den Himmel",
        nameLa: "Assúmptio",
        fruitEn: "Grace of a Happy Death & Devotion to Mary",
        fruitDe: "Gnade einer seligen Sterbestunde",
        scriptureRef: "Revelation 12:1",
        meditationEn: "At the end of her earthly life, the Immaculate Virgin Mary is taken up body and soul into heavenly glory by Almighty God.",
        meditationDe: "Die unbefleckte Gottesmutter wird mit Leib und Seele in die himmlische Herrlichkeit aufgenommen.",
        clausuleDe: "...Jesus, der dich, o Jungfrau, in den Himmel aufgenommen hat."
      },
      {
        number: 5,
        nameEn: "The Coronation of Mary as Queen of Heaven",
        nameDe: "Die Krönung Mariens zur Königin des Himmels und der Erde",
        nameLa: "Coronátio Mariæ",
        fruitEn: "Final Perseverance & Trust in Mary's Intercession",
        fruitDe: "Beharrlichkeit bis zum Ende und Vertrauen auf Maria",
        scriptureRef: "Revelation 12:1; Judith 15:10",
        meditationEn: "Mary is crowned by the Most Holy Trinity as Queen of Angels and Saints, standing as our perpetual advocate before Christ.",
        meditationDe: "Die Heiligste Dreifaltigkeit krönt Maria zur Himmelskönigin; sie tritt unaufhörlich als unsere Mittlerin vor Gott ein.",
        clausuleDe: "...Jesus, der dich, o Jungfrau, im Himmel gekrönt hat."
      }
    ]
  }
];
