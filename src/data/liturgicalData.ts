export interface LiturgicalDayInfo {
  date: string;
  season: "Advent" | "Christmas" | "Lent" | "Triduum" | "Easter" | "Ordinary Time";
  color: "Green" | "Purple" | "White" | "Red" | "Rose";
  colorHex: string;
  celebrationTitle: string;
  rank: "Solemnity" | "Feast" | "Memorial" | "Optional Memorial" | "Weekday";
  saintOfTheDay?: {
    name: string;
    title: string;
    patronage: string;
    biography: string;
    quote?: string;
  };
  readings: {
    firstReading: string;
    firstReadingText: string;
    psalm: string;
    psalmResponse: string;
    gospel: string;
    gospelText: string;
  };
  seasonalMarianAntiphon: {
    title: string;
    latinTitle: string;
    english: string;
    latin: string;
    seasonContext: string;
  };
}

export function getTodayLiturgicalInfo(customDate?: Date): LiturgicalDayInfo {
  const d = customDate || new Date();
  const month = d.getMonth() + 1; // 1-12
  const day = d.getDate();

  // Determine standard Marian Antiphon & liturgical season approximation for year round
  let season: LiturgicalDayInfo["season"] = "Ordinary Time";
  let color: LiturgicalDayInfo["color"] = "Green";
  let colorHex = "#16a34a"; // emerald-600

  // Quick season logic
  if (month === 12 && day <= 24) {
    season = "Advent";
    color = "Purple";
    colorHex = "#9333ea";
  } else if ((month === 12 && day >= 25) || (month === 1 && day <= 13)) {
    season = "Christmas";
    color = "White";
    colorHex = "#eab308";
  } else if (month === 3 || (month === 4 && day <= 10)) {
    season = "Lent";
    color = "Purple";
    colorHex = "#9333ea";
  } else if (month === 4 || month === 5) {
    season = "Easter";
    color = "White";
    colorHex = "#eab308";
  }

  // Choose Seasonal Antiphon
  let seasonalMarianAntiphon = {
    title: "Hail, Holy Queen",
    latinTitle: "Salve Regina",
    seasonContext: "Ordinary Time (Pentecost through Advent)",
    english: `Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.`,
    latin: `Salve, Regína, Mater misericórdiæ, vita, dulcédo, et spes nostra, salve. Ad te clamámus éxsules fílii Hevæ, ad te suspirámus, geméntes et flentes in hac lacrimárum valle. Eia, ergo, advocáta nostra, illos tuos misericórdes óculos ad nos convérte; et Iesum, benedíctum fructum ventris tui, nobis post hoc exsílium osténde. O clemens, O pia, O dulcis Virgo María.`
  };

  if (season === "Easter") {
    seasonalMarianAntiphon = {
      title: "Queen of Heaven, Rejoice",
      latinTitle: "Regina Caeli",
      seasonContext: "Eastertide (Easter Sunday through Pentecost)",
      english: `Queen of Heaven, rejoice, alleluia. For He whom you did merit to bear, alleluia, has risen, as He said, alleluia. Pray for us to God, alleluia. Rejoice and be glad, O Virgin Mary, alleluia. For the Lord has truly risen, alleluia.`,
      latin: `Regína cæli, lætáre, allelúia. Quia quem meruísti portáre, allelúia, resurréxit, sicut dixit, allelúia. Ora pro nobis Deum, allelúia. Gaude et lætáre, Virgo María, allelúia. Quia surréxit Dóminus vere, allelúia.`
    };
  } else if (season === "Advent") {
    seasonalMarianAntiphon = {
      title: "Loving Mother of the Redeemer",
      latinTitle: "Alma Redemptoris Mater",
      seasonContext: "Advent through Feast of the Presentation (Feb 2)",
      english: `Loving Mother of our Redeemer, gate of heaven, star of the sea, assist your people who have fallen yet strive to rise again. To the wonderment of nature you bore your Creator, yet remained a virgin after as before. You who received Gabriel's joyful greeting, have pity on us poor sinners.`,
      latin: `Alma Redemptóris Mater, quæ pérvia cæli porta manes, et stella maris, succúrre cadénti, súrgere qui curat, pópulo: tu quæ genuísti, natúra miránte, tuum sanctum Genitórem, Virgo prius ac postérius, Gabriélis ab ore sumens illud Ave, peccatórum miserére.`
    };
  } else if (season === "Lent") {
    seasonalMarianAntiphon = {
      title: "Hail, O Queen of Heaven",
      latinTitle: "Ave Regina Caelorum",
      seasonContext: "Candlemas (Feb 2) through Holy Wednesday",
      english: `Hail, O Queen of Heaven! Hail, O Lady of Angels! Hail, sacred root, hail, gate from whom unto the world a light has arisen. Rejoice, O glorious Virgin, lovely beyond all others. Farewell, most gracious Maiden, and pray for us to Christ.`,
      latin: `Ave, Regína cælórum, Ave, Dómina Angelórum: Salve, radix, salve, porta, ex qua mundo lux est orta: Gaude, Virgo gloriósa, super omnes speciósa, vale, o valde decóra, et pro nobis Christum exóra.`
    };
  }

  // Saints repository for current day or illustrative devotional saint
  const saintsList = [
    {
      name: "St. Augustine of Hippo",
      title: "Bishop, Confessor, and Doctor of Grace",
      patronage: "Theologians, Printers, and Seekers of Truth",
      biography: "One of the greatest Fathers and Doctors of the Church. Born in Thagaste (North Africa), he was led to the Catholic faith through the tireless tears and prayers of his mother, Saint Monica, and the preaching of Saint Ambrose. His monumental works, 'Confessions' and 'City of God', define Christian theology.",
      quote: "You have made us for Yourself, O Lord, and our hearts are restless until they rest in You."
    },
    {
      name: "St. Thomas Aquinas",
      title: "Dominican Priest, The Angelic Doctor",
      patronage: "Students, Academics, Catholic Schools",
      biography: "The premier philosopher and theologian of the Catholic Church. Mastermind of the 'Summa Theologiae' and composer of the magnificent Eucharistic hymns 'Tantum Ergo' and 'Panis Angelicus'.",
      quote: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible."
    },
    {
      name: "St. Thérèse of Lisieux",
      title: "The Little Flower, Doctor of the Church",
      patronage: "Missions, Florists, Priests",
      biography: "A Discalced Carmelite nun who taught the world the 'Little Way' of spiritual childhood—offering simple, daily, humble acts with immense divine love.",
      quote: "Miss no single opportunity of making some small sacrifice, here by a smiling look, there by a kindly word; always doing the smallest right and doing it all for love."
    },
    {
      name: "St. Francis of Assisi",
      title: "Confessor, Founder of the Franciscans",
      patronage: "Animals, Ecology, Peace",
      biography: "Renounced worldly riches to live in absolute Gospel poverty and simplicity, bearing the holy Stigmata of Christ.",
      quote: "Sanctify yourself and you will sanctify society."
    }
  ];

  const saintOfTheDay = saintsList[(day + month) % saintsList.length];

  return {
    date: d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    season,
    color,
    colorHex,
    celebrationTitle: `Memorial of ${saintOfTheDay.name}`,
    rank: "Memorial",
    saintOfTheDay,
    readings: {
      firstReading: "1 Thessalonians 4:1-8",
      firstReadingText: "Brothers and sisters: We ask and urge you in the Lord Jesus that, as you learned from us how you ought to live and to please God, you do so more and more. For this is the will of God, your sanctification...",
      psalm: "Psalm 97:1, 2b, 5-6, 10, 11-12",
      psalmResponse: "Rejoice in the Lord, you just!",
      gospel: "Matthew 25:1-13",
      gospelText: "Jesus told his disciples this parable: 'The Kingdom of heaven will be like ten virgins who took their lamps and went out to meet the bridegroom. Five of them were foolish and five were wise... Therefore, stay awake, for you know neither the day nor the hour.'"
    },
    seasonalMarianAntiphon
  };
}
