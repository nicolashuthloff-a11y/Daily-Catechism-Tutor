export interface ConfessionCheckItem {
  id: string;
  category: "First 3 Commandments (God)" | "4th-6th Commandments (Family, Life & Purity)" | "7th-10th Commandments (Justice & Truth)" | "Precepts of the Church";
  commandmentTitle: string;
  question: string;
  biblicalRoot: string;
}

export const EXAMINATION_OF_CONSCIENCE_ITEMS: ConfessionCheckItem[] = [
  // God
  {
    id: "sin-1",
    category: "First 3 Commandments (God)",
    commandmentTitle: "1st Commandment: I am the Lord your God, you shall not have strange gods before Me",
    question: "Did I neglect daily prayer, indulge in superstitious practices, put career/money/pleasure before God, or doubt divine truth?",
    biblicalRoot: "Exodus 20:2-3; Matthew 4:10"
  },
  {
    id: "sin-2",
    category: "First 3 Commandments (God)",
    commandmentTitle: "2nd Commandment: You shall not take the name of the Lord your God in vain",
    question: "Did I speak the holy name of God, Jesus Christ, Mary, or the Saints casually, angrily, or blasphemously? Did I make false oaths?",
    biblicalRoot: "Exodus 20:7; James 5:12"
  },
  {
    id: "sin-3",
    category: "First 3 Commandments (God)",
    commandmentTitle: "3rd Commandment: Remember to keep holy the Sabbath day",
    question: "Did I miss Holy Mass on Sunday or a Holy Day of Obligation through my own fault? Did I engage in unnecessary servile work on Sunday?",
    biblicalRoot: "Exodus 20:8; Catechism §2180"
  },

  // Family, Life, Purity
  {
    id: "sin-4",
    category: "4th-6th Commandments (Family, Life & Purity)",
    commandmentTitle: "4th Commandment: Honor your father and your mother",
    question: "Was I disrespectful, disobedient, impatient, or ungrateful to parents, family elders, or legitimate church and civic authorities?",
    biblicalRoot: "Exodus 20:12; Ephesians 6:1-3"
  },
  {
    id: "sin-5",
    category: "4th-6th Commandments (Family, Life & Purity)",
    commandmentTitle: "5th Commandment: You shall not kill",
    question: "Did I harbor hatred, unjust anger, grudge, or desire for revenge? Did I injure my body with excessive alcohol, drugs, or road rage?",
    biblicalRoot: "Matthew 5:21-22; 1 John 3:15"
  },
  {
    id: "sin-6",
    category: "4th-6th Commandments (Family, Life & Purity)",
    commandmentTitle: "6th & 9th Commandments: You shall not commit adultery / covet your neighbor's spouse",
    question: "Did I deliberately consent to impure thoughts, look at pornography, indulge in unchaste behavior, or lead others into sin?",
    biblicalRoot: "Matthew 5:27-28; 1 Corinthians 6:18-20"
  },

  // Justice & Truth
  {
    id: "sin-7",
    category: "7th-10th Commandments (Justice & Truth)",
    commandmentTitle: "7th & 10th Commandments: You shall not steal / covet your neighbor's goods",
    question: "Did I steal, cheat in school/business, neglect to pay debts, waste company time, or envy someone else's possessions and blessings?",
    biblicalRoot: "Exodus 20:15,17; Luke 12:15"
  },
  {
    id: "sin-8",
    category: "7th-10th Commandments (Justice & Truth)",
    commandmentTitle: "8th Commandment: You shall not bear false witness against your neighbor",
    question: "Did I tell lies, engage in gossip, slander, detraction (revealing another's faults without necessity), or break confidentiality?",
    biblicalRoot: "Exodus 20:16; Ephesians 4:29"
  },

  // Precepts
  {
    id: "sin-9",
    category: "Precepts of the Church",
    commandmentTitle: "Precepts of the Church: Penance & Fasting",
    question: "Did I observe the prescribed days of fasting and abstinence (Ash Wednesday, Good Friday, Fridays of Lent)? Did I support the Church's needs?",
    biblicalRoot: "Canon Law 1249-1253"
  }
];

export interface ConfessionStep {
  stepNumber: number;
  actor: "Priest" | "Penitent (You)";
  latinPhrase?: string;
  dialogue: string;
  notes: string;
}

export const CONFESSION_RITE_STEPS: ConfessionStep[] = [
  {
    stepNumber: 1,
    actor: "Penitent (You)",
    latinPhrase: "Signum Crucis",
    dialogue: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen. Bless me, Father, for I have sinned. It has been [X weeks/months] since my last confession.",
    notes: "Kneel behind the screen or sit face-to-face. State the approximate time since your last valid sacramental confession."
  },
  {
    stepNumber: 2,
    actor: "Penitent (You)",
    dialogue: "These are my sins: [State your mortal and venial sins clearly by kind and approximate frequency, without giving names of third parties]. For these and all the sins of my past life, I am truly sorry.",
    notes: "Honest, clear, and humble confession. Do not conceal any mortal sin knowingly."
  },
  {
    stepNumber: 3,
    actor: "Priest",
    dialogue: "The priest gives you fatherly spiritual counsel and assigns your penance (e.g. 3 Hail Marys or Psalm 51).",
    notes: "Listen attentively and accept the penance willingly."
  },
  {
    stepNumber: 4,
    actor: "Penitent (You)",
    latinPhrase: "Actus Contritionis",
    dialogue: `O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.`,
    notes: "Recite the Act of Contrition with sincere sorrow for having offended God."
  },
  {
    stepNumber: 5,
    actor: "Priest",
    latinPhrase: "Formula Absolutionis",
    dialogue: `"God, the Father of mercies, through the death and resurrection of His Son has reconciled the world to Himself and sent the Holy Spirit among us for the forgiveness of sins; through the ministry of the Church may God give you pardon and peace, AND I ABSOLVE YOU FROM YOUR SINS IN THE NAME OF THE FATHER, AND OF THE SON, AND OF THE HOLY SPIRIT."`,
    notes: "Make the Sign of the Cross as the priest pronounces the sacramental words of absolution."
  },
  {
    stepNumber: 6,
    actor: "Penitent (You)",
    dialogue: "Priest: 'Give thanks to the Lord, for He is good.'\nYou: 'For His mercy endures forever.'\nPriest: 'The Lord has freed you from your sins. Go in peace.'\nYou: 'Thanks be to God.'",
    notes: "Leave the confessional, find a quiet pew in church, and perform your assigned penance immediately with thanksgiving."
  }
];
