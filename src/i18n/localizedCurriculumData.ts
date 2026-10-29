import { CurriculumDay, Question } from "../types";
import { CURRICULUM_DAYS, MASTER_QUESTION_BANK } from "../data/curriculumData";
import { Language } from "./translations";

// German translations for the 14 curriculum days
export const GERMAN_CURRICULUM_DAYS: Record<number, Partial<CurriculumDay>> = {
  1: {
    title: "Grundgebete: Kreuzzeichen, Vaterunser & Ave Maria",
    subtitle: "Das Fundament des täglichen christlichen Gebets",
    summary: "Heute beginnen wir unseren 30-minütigen täglichen Lehrplan mit dem Erlernen der grundlegenden Gebete aus der Heiligen Schrift und der kirchlichen Überlieferung: Das Kreuzzeichen, das Gebet des Herrn (Vaterunser / Pater Noster) und der Englische Gruß (Ave Maria).",
    learningPoints: [
      "Das Kreuzzeichen bekennt den Glauben an die Allerheiligste Dreifaltigkeit und das Erlösungswerk Christi.",
      "Das Vaterunser enthält sieben Bitten, die Jesus Seine Jünger im Matthäusevangelium lehrte.",
      "Das Ave Maria verbindet den Gruß des Erzengels Gabriel mit dem Lobpreis der heiligen Elisabeth.",
      "Lernziel: Fehlerfreies und andächtiges Auswendigaufsagen ohne Zögern."
    ],
    keyTextToMemorize: "Vater unser im Himmel, geheiligt werde dein Name, dein Reich komme...",
  },
  2: {
    title: "Grundgebete: Ehre sei dem Vater & Das Apostolische Glaubensbekenntnis",
    subtitle: "Doxologie und die Richtschnur des Glaubens (Credo)",
    summary: "Heute vertiefen wir den Lobpreis der Dreifaltigkeit (Ehre sei dem Vater) und die zwölf Glaubensartikel des Apostolischen Glaubensbekenntnisses, welche die wesentlichen Glaubenswahrheiten zusammenfassen.",
    learningPoints: [
      "Das 'Ehre sei dem Vater' schenkt den drei göttlichen Personen ewige Anbetung.",
      "Das Apostolikum gliedert sich in drei Hauptteile: Gott Vater, Gott Sohn und Gott Heiliger Geist.",
      "Zentrale Glaubensartikel: Menschwerdung, Leiden, Auferstehung, Himmelfahrt und die Heilige Katholische Kirche.",
      "Lernziel: Exakte Kenntnis der 12 Artikel des Glaubensbekenntnisses."
    ],
    keyTextToMemorize: "Ich glaube an Gott, den Vater, den Allmächtigen, den Schöpfer des Himmels und der Erde...",
  },
  3: {
    title: "Grundgebete: Salve Regina, Reuegebet & Memorare",
    subtitle: "Gebete der Buße und der marianischen Fürsprache",
    summary: "Vertiefung traditioneller Gebete zur Vergebung der Sünden und der Zuflucht zur Gottesmutter: Das Salve Regina (Sei gegrüßt, o Königin), der wesentliche Akt der Reue für die Beichte und das Memorare des hl. Bernhard.",
    learningPoints: [
      "Der Akt der Reue drückt innigen Schmerz über begangene Sünden, Abscheu vor dem Bösen und den festen Vorsatz zur Besserung aus.",
      "Das Salve Regina ruft Maria als Mutter der Barmherzigkeit und Fürsprecherin an.",
      "Das Memorare bezeugt unerschütterliches Vertrauen in den Schutz Mariens.",
      "Lernziel: Auswendiglernen des Reueaktes für den Empfang des Bußsakramentes."
    ],
    keyTextToMemorize: "O mein Gott, von ganzem Herzen bereue ich alle meine Sünden...",
  },
  4: {
    title: "Die Zehn Gebote: Teil I (Gebote 1 bis 4)",
    subtitle: "Pflichten gegenüber Gott und das vierte Gebot",
    summary: "Die erste Tafel des Dekalogs regelt unsere Beziehung zum allmächtigen Gott: Seine ausschließliche Anbetung, die Heiligkeit Seines Namens, die Heiligung des Sonntags sowie die Ehrung der Eltern.",
    learningPoints: [
      "1. Gebot: Verbot von Götzendienst, Aberglauben und falschem Kult.",
      "2. Gebot: Ehrfurcht vor dem heiligsten Namen Gottes; Verbot von Gotteslästerung und Meineid.",
      "3. Gebot: Heiligung des Sonntags und der gebotenen Feiertage durch die Mitfeier der Heiligen Messe.",
      "4. Gebot: Achtung, Gehorsam und Dankbarkeit gegenüber Eltern und rechtmäßiger Autorität."
    ],
    keyTextToMemorize: "1. Ich bin der Herr, dein Gott. Du sollst keine fremden Götter neben mir haben...",
  },
  5: {
    title: "Die Zehn Gebote: Teil II (Gebote 5 bis 10)",
    subtitle: "Das Sittengesetz, der Schutz des Lebens und die Reinheit des Herzens",
    summary: "Die zweite Tafel des Dekalogs: Schutz des menschlichen Lebens, eheliche Treue und Keuschheit, Gerechtigkeit und Eigentum, Wahrhaftigkeit sowie Reinheit der Gedanken und Begierden.",
    learningPoints: [
      "5. Gebot: Schutz des menschlichen Lebens von der Empfängnis bis zum natürlichen Tod.",
      "6. & 9. Gebot: Keuschheit in Taten und Reinheit des Herzens in Gedanken und Begierden.",
      "7. & 10. Gebot: Achtung fremden Eigentums, ehrlicher Handel und Überwindung von Neid und Habsucht.",
      "8. Gebot: Leben in der Wahrheit, Verbot von Lüge, Verleumdung und falschem Zeugnis."
    ],
    keyTextToMemorize: "5. Du sollst nicht töten. 6. Du sollst nicht ehebrechen. 7. Du sollst nicht stehlen...",
  },
  6: {
    title: "Die Sieben Sakramente: Die Initiationssakramente",
    subtitle: "Taufe, Firmung und die Heiligste Eucharistie",
    summary: "Erkundung der grundlegenden Sakramente, die das Fundament jedes christlichen Lebens bilden: Die Taufe zur Wiedergeburt, die Firmung zur Stärkung im Heiligen Geist und die Eucharistie als himmlische Speise.",
    learningPoints: [
      "Taufe: Materie (Wasser), Form (Trinitarische Taufformel) und Tilgung der Erbsünde.",
      "Firmung: Einprägung des unauslöschlichen Siegels und Empfang der sieben Gaben des Heiligen Geistes.",
      "Heiligste Eucharistie: Die Realpräsenz Christi durch die Wesensverwandlung (Transsubstantiation) von Brot und Wein.",
      "Verständnis von Materie, Form und Spender jedes Sakramentes."
    ],
    keyTextToMemorize: "Die drei Sakramente der christlichen Initiation: Taufe, Firmung, Heiligste Eucharistie.",
  },
  7: {
    title: "Die Sieben Sakramente: Heilung & Sendung",
    subtitle: "Buße, Krankensalbung, Weihesakrament und die Ehe",
    summary: "Vertiefung der Sakramente zur geistigen und leiblichen Heilung (Buße & Krankensalbung) sowie der Sakramente im Dienst der Gemeinschaft (Priesterweihe & Christliche Ehe).",
    learningPoints: [
      "Sakrament der Buße: Die 5 Erfordernisse für eine gültige Beichte (Gewissenserforschung, Reue, Vorsatz, Bekenntnis, Genugtuung).",
      "Krankensalbung: Stärkung in schwerer Krankheit und Vorbereitung auf die Ewigkeit.",
      "Weihesakrament: Die drei Stufen Diakonat, Presbyterat (Priester) und Episkopat (Bischof).",
      "Ehesakrament: Unauflösliches Bündnis zwischen Mann und Frau zur gegenseitigen Heiligung und Weitergabe des Lebens."
    ],
    keyTextToMemorize: "Die 5 Schritte zur guten Beichte: Gewissenserforschung, Reue, guter Vorsatz, Bekenntnis, Genugtuung.",
  },
  8: {
    title: "Der Ablauf der Heiligen Messe: Eröffnung & Wortgottesdienst",
    subtitle: "Vom Stufengebet bis zum Credo",
    summary: "Verständnis der tiefen liturgischen und opferbezogenen Struktur des ersten Teils der Heiligen Messe: Eröffnung, Schuldbekenntnis (Confiteor), Kyrie, Gloria, Lesungen, Evangelium und Glaubensbekenntnis.",
    learningPoints: [
      "Eingangsränge und Confiteor: Wir erkennen unsere Sündhaftigkeit vor Gott und Seinen Heiligen.",
      "Gloria in Excelsis Deo: Der feierliche Engelshymnus zum Lobe der Heiligsten Dreifaltigkeit.",
      "Die Liturgie des Wortes: Gott spricht durch Altes Testament, Apostelbriefe und Evangelium zu Seinem Volk.",
      "Das Credo: Die gläubige Antwort der versammelten Gemeinde auf das verkündete Wort Gottes."
    ],
    keyTextToMemorize: "Gloria in excelsis Deo et in terra pax hominibus bonae voluntatis...",
  },
  9: {
    title: "Der Ablauf der Heiligen Messe: Die Eucharistische Opferfeier",
    subtitle: "Offertorium, Kanon, Wandlung, Kommunion und Entlassung",
    summary: "Der Höhepunkt der katholischen Liturgie: Die Darbringung der Gaben, das eucharistische Hochgebet, die heilige Wandlung (Konsekration), die heilige Kommunion und der Schlusssegen.",
    learningPoints: [
      "Offertorium: Darbringung von Brot und Wein gemischt mit einem Tropfen Wasser.",
      "Der Kanon / Das Hochgebet: Das feierliche Gebet der Wandlung; Vergegenwärtigung des Kreuzesopfers Christi.",
      "Transsubstantiation: Wesensverwandlung von Brot und Wein in Leib und Blut Christi.",
      "Kommunion und Ite Missa Est: Würdiger Empfang des Herrn und Sendung in die Welt."
    ],
    keyTextToMemorize: "Hoc est enim Corpus Meum... Hic est enim Calix Sanguinis Mei...",
  },
  10: {
    title: "Die Theologischen & Kardinaltugenden",
    subtitle: "Glaube, Hoffnung, Liebe und Klugheit, Gerechtigkeit, Tapferkeit, Mäßigung",
    summary: "Das moralische und geistliche Rüstzeug des Christen: Die drei göttlichen Tugenden (Glaube, Hoffnung, Liebe) und die vier menschlichen Kardinaltugenden, die das tugendhafte Leben tragen.",
    learningPoints: [
      "Die 3 göttlichen (theologischen) Tugenden: Glaube (Fides), Hoffnung (Spes), Liebe (Caritas).",
      "Die Liebe (Caritas) ist die größte aller Tugenden und vollendet das Gesetz.",
      "Die 4 Kardinaltugenden: Klugheit (Prudentia), Gerechtigkeit (Iustitia), Tapferkeit (Fortitudo), Mäßigung (Temperantia).",
      "Wie Tugenden durch Gebet, Sakramentenempfang und beständige Übung wachsen."
    ],
    keyTextToMemorize: "Die 3 göttlichen Tugenden: Glaube, Hoffnung, Liebe. Die 4 Kardinaltugenden: Klugheit, Gerechtigkeit, Tapferkeit, Mäßigung.",
  },
  11: {
    title: "Die 7 Todsünden & Ihre Gegen-Tugenden",
    subtitle: "Geistlicher Kampf und die Tugenden zur Überwindung des Lasters",
    summary: "Erkennen der Wurzeln aller Sünden (Stolz, Geiz, Unkeuschheit, Neid, Unmäßigkeit, Zorn, Trägheit) und ihrer heilenden Gegentugenden im christlichen Seelenkampf.",
    learningPoints: [
      "Hochmut/Stolz vs. Demut (die Wurzel aller christlichen Heiligkeit).",
      "Geiz vs. Freigiebigkeit & Barmherzigkeit; Neid vs. Wohlwollen.",
      "Zorn vs. Sanftmut & Geduld; Unkeuschheit vs. Keuschheit & Reinheit.",
      "Unmäßigkeit vs. Mäßigung; Geistliche Trägheit (Acedia) vs. Eifer im Dienste Gottes."
    ],
    keyTextToMemorize: "Gegen Stolz: Demut. Gegen Geiz: Freigiebigkeit. Gegen Unkeuschheit: Keuschheit. Gegen Neid: Wohlwollen...",
  },
  12: {
    title: "Die Letzten Dinge (Eschatologie)",
    subtitle: "Tod, Gericht, Himmel, Hölle und das Fegefeuer",
    summary: "Die vier letzten Dinge jedes Menschen: Der leibliche Tod, das Partikulargericht unmittelbar nach dem Hinschied, die ewige Seligkeit im Himmel, die ewige Verdammnis der Hölle sowie die Läuterung im Fegefeuer.",
    learningPoints: [
      "Der Tod: Das Ende der irdischen Prüfungszeit und die Trennung von Leib und Seele.",
      "Das Partikulargericht und das Jüngste Gericht am Ende der Zeiten.",
      "Das Fegefeuer (Purgatorium): Zeitliche Läuterung der Seelen, die in Gottes Gnade sterben.",
      "Der Himmel als ewige Anschauung Gottes (Visio beatifica) und die Hölle als ewige Trennung von Gott."
    ],
    keyTextToMemorize: "Die vier letzten Dinge: Tod, Gericht, Himmel, Hölle.",
  },
  13: {
    title: "Die Gebote der Kirche & Werke der Barmherzigkeit",
    subtitle: "Kirchliche Pflichten und tätige christliche Nächstenliebe",
    summary: "Die fünf Gebote der Kirche für das praktische geistliche Leben sowie die sieben leiblichen und sieben geistigen Werke der Barmherzigkeit zur Ausübung wahrer Nächstenliebe.",
    learningPoints: [
      "Die 5 Kirchengebote: Sonntagsmesse, jährliche Beichte, österliche Kommunion, Fasttage halten, Beitrag zur Kirche.",
      "Die 7 leiblichen Werke der Barmherzigkeit: Hungrige speisen, Durstige tränken, Nackte bekleiden, Fremde beherbergen, Kranke besuchen, Gefangene erlösen, Tote begraben.",
      "Die 7 geistigen Werke der Barmherzigkeit: Unwissende lehren, Zweifelnden raten, Sünder zurechtweisen, Betrübte trösten, Beleidigungen verzeihen, Lästige geduldig ertragen, für Lebende und Verstorbene beten.",
      "Praktische Anwendung im Alltag."
    ],
    keyTextToMemorize: "Die 5 Gebote der Kirche leiten unsere regelmäßige sakramentale Praxis.",
  },
  14: {
    title: "Gesamtwiederholung & Umfassende Katechismus-Prüfung",
    subtitle: "Synthese aller 14 Tage: Fester katholischer Glaube fürs Leben",
    summary: "Der feierliche Abschluss unseres 14-tägigen Lehrplans! Wiederholung aller Hauptthemen: Gebete, Zehn Gebote, Sakramente, Heilige Messe, Tugenden und die Letzten Dinge mit einer umfassenden 1-4 Multiple-Choice Prüfung.",
    learningPoints: [
      "Sichere Verankerung der katholischen Glaubenslehre im Gedächtnis.",
      "Reflexion des geistlichen Wachstums und der täglichen Gebetsdisziplin.",
      "Vorbereitung auf den weiteren täglichen Weg mit Bibel, Katechismus und Rosenkranz.",
      "Abschlussziel: 100% Meisterschaft in der Gesamtprüfung."
    ],
    keyTextToMemorize: "Credo in unum Deum, Patrem omnipotentem... Deo Gratias!",
  },
};

export function getLocalizedCurriculumDay(day: CurriculumDay, lang: Language): CurriculumDay {
  if (lang === "en") return day;
  const deData = GERMAN_CURRICULUM_DAYS[day.day];
  if (!deData) return day;

  return {
    ...day,
    title: deData.title || day.title,
    subtitle: deData.subtitle || day.subtitle,
    summary: deData.summary || day.summary,
    learningPoints: deData.learningPoints || day.learningPoints,
    keyTextToMemorize: deData.keyTextToMemorize || day.keyTextToMemorize,
  };
}

export function getLocalizedQuestion(question: Question, lang: Language): Question {
  if (lang === "en") return question;
  // If a German translation exists in our extended dictionary or translated mapping, return it:
  const deQuestion = GERMAN_QUESTIONS_MAP[question.id];
  if (deQuestion) {
    return {
      ...question,
      question: deQuestion.question || question.question,
      options: deQuestion.options || question.options,
      explanation: deQuestion.explanation || question.explanation,
      memoryTip: deQuestion.memoryTip || question.memoryTip,
      categoryLabel: deQuestion.categoryLabel || question.categoryLabel,
    };
  }
  return question;
}

// Sample of translated core questions in German for seamless test practice
export const GERMAN_QUESTIONS_MAP: Record<string, Partial<Question>> = {
  "q-day1-1": {
    question: "Welches ist die richtige Formel für das katholische Kreuzzeichen?",
    options: [
      "Im Namen des Vaters und des Sohnes und des Heiligen Geistes. Amen.",
      "Im Namen des Herrn, des Vaters und aller Engel. Amen.",
      "Ehre sei dem Vater und der Kirche für immer. Amen.",
      "Herr Jesus Christus, erbarme dich meiner, eines Sünders. Amen."
    ],
    explanation: "Das Kreuzzeichen bekennt die Allerheiligste Dreifaltigkeit: Vater, Sohn und Heiliger Geist.",
    memoryTip: "Kopf (Vater) → Brust (Sohn) → Linke Schulter (Heiliger) → Rechte Schulter (Geist)."
  },
  "q-day1-2": {
    question: "Wie viele Bitten enthält das Vaterunser (Gebet des Herrn)?",
    options: [
      "5 Bitten",
      "7 Bitten",
      "10 Bitten",
      "12 Bitten"
    ],
    explanation: "Das Vaterunser enthält genau 7 Bitten (3 für Gottes Ehre, 4 für unsere irdischen und geistlichen Nöte).",
    memoryTip: "Die Zahl 7 steht in der Heiligen Schrift für Vollkommenheit und Fülle."
  },
  "q-day1-3": {
    question: "Aus welchen zwei biblischen Quellen stammt der erste Teil des Ave Maria?",
    options: [
      "Der Gruß des Engels Gabriel (Lk 1,28) und der Lobpreis der hl. Elisabeth (Lk 1,42)",
      "Dem Magnificat und dem Gesang des Zacharias",
      "Der Verkündigung an Josef und der Hochzeit zu Kana",
      "Der Prophezeiung Jesajas und dem Psalm 23"
    ],
    explanation: "Das Ave Maria vereinigt Gabriels 'Sei gegrüßt, du Begnadete' und Elisabeths 'Gebenedeit bist du unter den Frauen'.",
    memoryTip: "Beide Grußworte stehen im 1. Kapitel des Lukasevangeliums."
  },
  "q-day2-1": {
    question: "Wie viele Glaubensartikel enthält das Apostolische Glaubensbekenntnis traditionell?",
    options: [
      "7 Artikel",
      "10 Artikel",
      "12 Artikel",
      "14 Artikel"
    ],
    explanation: "Traditionell wird das Apostolikum den 12 Aposteln zugeschrieben und in 12 Artikel gegliedert.",
    memoryTip: "12 Apostel = 12 Glaubensartikel im Credo."
  },
  "q-day4-1": {
    question: "Welches Gebot verbietet Götzendienst, Okkultismus und Aberglauben?",
    options: [
      "Das Erste Gebot (Ich bin der Herr, dein Gott; du sollst keine fremden Götter neben mir haben)",
      "Das Zweite Gebot (Du sollst den Namen des Herrn nicht missbrauchen)",
      "Das Vierte Gebot (Du sollst Vater und Mutter ehren)",
      "Das Siebte Gebot (Du sollst nicht stehlen)"
    ],
    explanation: "Das erste Gebot verlangt die ausschließliche Anbetung des einen wahren Gottes und schließt allen Götzendienst aus.",
    memoryTip: "Gott steht immer an 1. Stelle!"
  },
  "q-day6-1": {
    question: "Welches sind die drei Sakramente der christlichen Initiation?",
    options: [
      "Taufe, Firmung und Heiligste Eucharistie",
      "Taufe, Buße und Krankensalbung",
      "Ehe, Weihesakrament und Firmung",
      "Taufe, Buße und Erstkommunion"
    ],
    explanation: "Die christliche Initiation wird durch Taufe, Firmung und den Empfang der Heiligen Eucharistie vollendet.",
    memoryTip: "Initiation = Fundament: Wasser der Taufe, Öl der Firmung, Brot & Wein der Eucharistie."
  },
  "q-day8-1": {
    question: "Wie lautet der theologische Fachbegriff für die Wesensverwandlung von Brot und Wein in Leib und Blut Christi?",
    options: [
      "Transsubstantiation (Wesensverwandlung)",
      "Konsubstantiation",
      "Symbolische Rezeption",
      "Metamorphose"
    ],
    explanation: "Das Konzil von Trient lehrt verbindlich das Dogma der Transsubstantiation (vollständige Wesensverwandlung bei Beibehaltung der Gestalten).",
    memoryTip: "Trans = Hinüber/Verwandlung, Substantia = Wesen."
  }
};
