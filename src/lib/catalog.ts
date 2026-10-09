export type Sport = "football" | "rugby" | "tennis" | "motorsport" | "nfl";

export type Rail = "upcoming" | "european" | "liverpool" | "celtic";

export type Currency = "usd" | "eur" | "gbp" | "chf";

export type Fixture = {
  id: string;
  home: string;
  away: string;
  competition: string;
  sport: Sport;
  rails: Rail[];
  dateLabel: string;
  city: string;
  venue: string;
  priceUsd: number | null;
  soldOut?: boolean;
  image: string;
};

export const currencies: Record<
  Currency,
  { code: string; symbol: string; rate: number }
> = {
  usd: { code: "USD", symbol: "$", rate: 1 },
  eur: { code: "EUR", symbol: "€", rate: 0.92 },
  gbp: { code: "GBP", symbol: "£", rate: 0.78 },
  chf: { code: "CHF", symbol: "Fr", rate: 0.88 },
};

const photo = {
  stadium:
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
  pitch:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80",
  crowd:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80",
  night:
    "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1400&q=80",
  seats:
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1400&q=80",
  f1: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=1400&q=80",
  tennis:
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1400&q=80",
  nfl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1400&q=80",
  rugby:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1400&q=80",
};

export const heroPhotos = {
  left: photo.stadium,
  right: photo.pitch,
};

export const fixtures: Fixture[] = [
  {
    id: "villa-brentford",
    home: "Aston Villa",
    away: "Brentford",
    competition: "Premier League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "10 Oct 2026",
    city: "Birmingham",
    venue: "Villa Park",
    priceUsd: 133,
    soldOut: true,
    image: photo.pitch,
  },
  {
    id: "chelsea-bournemouth",
    home: "Chelsea",
    away: "Bournemouth",
    competition: "Premier League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "10 Oct 2026",
    city: "London",
    venue: "Stamford Bridge",
    priceUsd: 562,
    image: photo.night,
  },
  {
    id: "united-spurs",
    home: "Manchester United",
    away: "Tottenham Hotspur",
    competition: "Premier League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "10 Oct 2026",
    city: "Manchester",
    venue: "Old Trafford",
    priceUsd: 232,
    image: photo.crowd,
  },
  {
    id: "arsenal-lille",
    home: "Arsenal",
    away: "Lille",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "13 Oct 2026",
    city: "London",
    venue: "Emirates Stadium",
    priceUsd: 430,
    image: photo.stadium,
  },
  {
    id: "villa-fenerbahce",
    home: "Aston Villa",
    away: "Fenerbahce",
    competition: "Europa League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "14 Oct 2026",
    city: "Birmingham",
    venue: "Villa Park",
    priceUsd: 199,
    image: photo.seats,
  },
  {
    id: "shakhtar-aek",
    home: "Shakhtar Donetsk",
    away: "AEK Athens",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "14 Oct 2026",
    city: "Europe",
    venue: "Neutral venue",
    priceUsd: 67,
    image: photo.night,
  },
  {
    id: "city-psg",
    home: "Manchester City",
    away: "Paris Saint-Germain",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "14 Oct 2026",
    city: "Manchester",
    venue: "Etihad Stadium",
    priceUsd: 265,
    image: photo.stadium,
  },
  {
    id: "liverpool-villarreal",
    home: "Liverpool",
    away: "Villarreal CF",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming", "liverpool"],
    dateLabel: "20 Oct 2026",
    city: "Liverpool",
    venue: "Anfield",
    priceUsd: 251,
    image: photo.crowd,
  },
  {
    id: "madrid-leipzig",
    home: "Real Madrid",
    away: "RB Leipzig",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming", "european"],
    dateLabel: "21 Oct 2026",
    city: "Madrid",
    venue: "Santiago Bernabéu",
    priceUsd: 811,
    image: photo.night,
  },
  {
    id: "arsenal-dortmund",
    home: "Arsenal",
    away: "Borussia Dortmund",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "24 Nov 2026",
    city: "London",
    venue: "Emirates Stadium",
    priceUsd: 640,
    image: photo.stadium,
  },
  {
    id: "bayern-slavia",
    home: "FC Bayern Munich",
    away: "Slavia Prague",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming", "european"],
    dateLabel: "8 Dec 2026",
    city: "Munich",
    venue: "Allianz Arena",
    priceUsd: 308,
    image: photo.pitch,
  },
  {
    id: "liverpool-porto",
    home: "Liverpool",
    away: "Porto",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming", "liverpool"],
    dateLabel: "9 Dec 2026",
    city: "Liverpool",
    venue: "Anfield",
    priceUsd: 317,
    image: photo.crowd,
  },
  {
    id: "united-bayern",
    home: "Manchester United",
    away: "FC Bayern Munich",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "20 Jan 2027",
    city: "Manchester",
    venue: "Old Trafford",
    priceUsd: 364,
    image: photo.night,
  },
  {
    id: "shakhtar-madrid",
    home: "Shakhtar Donetsk",
    away: "Real Madrid",
    competition: "Champions League",
    sport: "football",
    rails: ["upcoming"],
    dateLabel: "27 Jan 2027",
    city: "Europe",
    venue: "Neutral venue",
    priceUsd: 420,
    image: photo.seats,
  },
  {
    id: "milan-atalanta",
    home: "AC Milan",
    away: "Atalanta",
    competition: "Serie A",
    sport: "football",
    rails: ["european"],
    dateLabel: "18 Oct 2026",
    city: "Milan",
    venue: "San Siro",
    priceUsd: 196,
    image: photo.stadium,
  },
  {
    id: "barca-alaves",
    home: "FC Barcelona",
    away: "Deportivo Alavés",
    competition: "La Liga",
    sport: "football",
    rails: ["european"],
    dateLabel: "31 Oct 2026",
    city: "Barcelona",
    venue: "Spotify Camp Nou",
    priceUsd: 252,
    image: photo.pitch,
  },
  {
    id: "bayern-koln",
    home: "FC Bayern Munich",
    away: "FC Köln",
    competition: "Bundesliga",
    sport: "football",
    rails: ["european"],
    dateLabel: "20 Nov 2026",
    city: "Munich",
    venue: "Allianz Arena",
    priceUsd: 476,
    image: photo.crowd,
  },
  {
    id: "madrid-celta",
    home: "Real Madrid",
    away: "Celta de Vigo",
    competition: "La Liga",
    sport: "football",
    rails: ["european"],
    dateLabel: "22 Nov 2026",
    city: "Madrid",
    venue: "Santiago Bernabéu",
    priceUsd: 540,
    image: photo.night,
  },
  {
    id: "liverpool-brighton",
    home: "Liverpool",
    away: "Brighton & Hove Albion",
    competition: "Premier League",
    sport: "football",
    rails: ["liverpool"],
    dateLabel: "25 Oct 2026",
    city: "Liverpool",
    venue: "Anfield",
    priceUsd: 548,
    image: photo.crowd,
  },
  {
    id: "liverpool-sunderland",
    home: "Liverpool",
    away: "Sunderland",
    competition: "Premier League",
    sport: "football",
    rails: ["liverpool"],
    dateLabel: "2 Dec 2026",
    city: "Liverpool",
    venue: "Anfield",
    priceUsd: 350,
    image: photo.pitch,
  },
  {
    id: "liverpool-leeds",
    home: "Liverpool",
    away: "Leeds United",
    competition: "Premier League",
    sport: "football",
    rails: ["liverpool"],
    dateLabel: "12 Dec 2026",
    city: "Liverpool",
    venue: "Anfield",
    priceUsd: 383,
    image: photo.stadium,
  },
  {
    id: "liverpool-coventry",
    home: "Liverpool",
    away: "Coventry City",
    competition: "FA Cup",
    sport: "football",
    rails: ["liverpool"],
    dateLabel: "2 Jan 2027",
    city: "Liverpool",
    venue: "Anfield",
    priceUsd: 290,
    image: photo.seats,
  },
  {
    id: "celtic-hearts",
    home: "Celtic",
    away: "Hearts",
    competition: "Scottish Premiership",
    sport: "football",
    rails: ["celtic"],
    dateLabel: "18 Oct 2026",
    city: "Glasgow",
    venue: "Celtic Park",
    priceUsd: 199,
    image: photo.pitch,
  },
  {
    id: "celtic-celta",
    home: "Celtic",
    away: "Celta Vigo",
    competition: "Europa League",
    sport: "football",
    rails: ["celtic"],
    dateLabel: "22 Oct 2026",
    city: "Glasgow",
    venue: "Celtic Park",
    priceUsd: 166,
    image: photo.night,
  },
  {
    id: "celtic-dundee",
    home: "Celtic",
    away: "Dundee United",
    competition: "Scottish Premiership",
    sport: "football",
    rails: ["celtic"],
    dateLabel: "28 Oct 2026",
    city: "Glasgow",
    venue: "Celtic Park",
    priceUsd: 119,
    image: photo.crowd,
  },
  {
    id: "celtic-stmirren",
    home: "Celtic",
    away: "St Mirren",
    competition: "Scottish Premiership",
    sport: "football",
    rails: ["celtic"],
    dateLabel: "21 Nov 2026",
    city: "Glasgow",
    venue: "Celtic Park",
    priceUsd: 109,
    image: photo.seats,
  },
  {
    id: "monaco-gp",
    home: "Formula 1",
    away: "Monaco Grand Prix",
    competition: "Formula 1 2026",
    sport: "motorsport",
    rails: ["upcoming"],
    dateLabel: "5–7 Jun 2026",
    city: "Monaco",
    venue: "Circuit de Monaco",
    priceUsd: 890,
    image: photo.f1,
  },
  {
    id: "silverstone-gp",
    home: "Formula 1",
    away: "British Grand Prix",
    competition: "Formula 1 2026",
    sport: "motorsport",
    rails: ["upcoming"],
    dateLabel: "3–5 Jul 2026",
    city: "Silverstone",
    venue: "Silverstone Circuit",
    priceUsd: 640,
    image: photo.f1,
  },
  {
    id: "six-nations",
    home: "England",
    away: "France",
    competition: "Six Nations 2027",
    sport: "rugby",
    rails: ["upcoming"],
    dateLabel: "13 Mar 2027",
    city: "London",
    venue: "Twickenham",
    priceUsd: 275,
    image: photo.rugby,
  },
  {
    id: "nations-champ",
    home: "Nations Championship",
    away: "Opening weekend",
    competition: "Nations Championship 2026",
    sport: "rugby",
    rails: ["upcoming"],
    dateLabel: "Nov 2026",
    city: "Europe",
    venue: "Host stadium",
    priceUsd: 188,
    image: photo.rugby,
  },
  {
    id: "wimbledon",
    home: "Wimbledon",
    away: "Centre Court",
    competition: "Wimbledon 2027",
    sport: "tennis",
    rails: ["upcoming"],
    dateLabel: "Jun 2027",
    city: "London",
    venue: "All England Club",
    priceUsd: 720,
    image: photo.tennis,
  },
  {
    id: "nfl-colts",
    home: "Indianapolis Colts",
    away: "Washington Commanders",
    competition: "NFL London",
    sport: "nfl",
    rails: ["upcoming"],
    dateLabel: "Oct 2026",
    city: "London",
    venue: "Tottenham Hotspur Stadium",
    priceUsd: 310,
    image: photo.nfl,
  },
  {
    id: "nfl-eagles",
    home: "Philadelphia Eagles",
    away: "Jacksonville Jaguars",
    competition: "NFL London",
    sport: "nfl",
    rails: ["upcoming"],
    dateLabel: "Oct 2026",
    city: "London",
    venue: "Wembley Stadium",
    priceUsd: 295,
    image: photo.nfl,
  },
];

export const rails: { id: Rail | "all"; label: string }[] = [
  { id: "all", label: "All fixtures" },
  { id: "upcoming", label: "Upcoming" },
  { id: "european", label: "European football" },
  { id: "liverpool", label: "Liverpool" },
  { id: "celtic", label: "Celtic" },
];

export const hotSearches = [
  "Arsenal",
  "Chelsea",
  "FC Barcelona",
  "Liverpool",
  "Manchester United",
  "Tottenham Hotspur",
  "Premier League",
  "La Liga",
  "Formula 1",
];

export const footballMenu = [
  {
    title: "Premier League",
    competition: "Premier League",
    clubs: [
      "Arsenal",
      "Aston Villa",
      "Brentford",
      "Chelsea",
      "Crystal Palace",
      "Fulham",
      "Leeds United",
      "Liverpool",
      "Manchester City",
      "Manchester United",
      "Tottenham Hotspur",
    ],
  },
  {
    title: "La Liga",
    competition: "La Liga",
    clubs: ["FC Barcelona", "Real Madrid"],
  },
  {
    title: "Bundesliga",
    competition: "Bundesliga",
    clubs: ["FC Bayern Munich"],
  },
  {
    title: "Serie A",
    competition: "Serie A",
    clubs: ["AC Milan"],
  },
  {
    title: "Scottish Premiership",
    competition: "Scottish Premiership",
    clubs: ["Celtic"],
  },
  {
    title: "European competitions",
    competition: "Champions League",
    clubs: ["Champions League", "Europa League"],
  },
];

export const competitions = [
  {
    name: "Premier League 2026–27",
    filter: "Premier League",
    sport: "football" as Sport,
    image: photo.pitch,
    blurb: "Match tickets and hospitality across the English season.",
  },
  {
    name: "La Liga 2026–27",
    filter: "La Liga",
    sport: "football" as Sport,
    image: photo.night,
    blurb: "Barcelona, Madrid and the nights that fill the away end.",
  },
  {
    name: "Champions League",
    filter: "Champions League",
    sport: "football" as Sport,
    image: photo.stadium,
    blurb: "Knockout ties and group nights with lounge options.",
  },
  {
    name: "Bundesliga 2026–27",
    filter: "Bundesliga",
    sport: "football" as Sport,
    image: photo.crowd,
    blurb: "Bayern Munich and the loudest Saturday in Germany.",
  },
  {
    name: "Scottish Premiership",
    filter: "Scottish Premiership",
    sport: "football" as Sport,
    image: photo.seats,
    blurb: "Celtic Park packages, from the stand to hospitality.",
  },
  {
    name: "Formula 1 2026",
    filter: "Formula 1",
    sport: "motorsport" as Sport,
    image: photo.f1,
    blurb: "Grand Prix weekends, grandstands and paddock hospitality.",
  },
];

export const clubs = [
  "Liverpool",
  "Arsenal",
  "Manchester United",
  "Chelsea",
  "Tottenham Hotspur",
  "FC Barcelona",
  "Real Madrid",
  "Celtic",
  "FC Bayern Munich",
  "AC Milan",
];

export const sports = [
  {
    id: "football" as Sport,
    name: "Football tickets",
    detail: "Premier League, La Liga, Europe and the domestic cups.",
    image: photo.pitch,
  },
  {
    id: "nfl" as Sport,
    name: "NFL tickets",
    detail: "London games, with seats and hospitality blocks.",
    image: photo.nfl,
  },
  {
    id: "rugby" as Sport,
    name: "Rugby tickets",
    detail: "Six Nations 2027 and the Nations Championship.",
    image: photo.rugby,
  },
  {
    id: "motorsport" as Sport,
    name: "Motorsport tickets",
    detail: "Formula 1 grands prix and race-weekend hospitality.",
    image: photo.f1,
  },
  {
    id: "tennis" as Sport,
    name: "Tennis tickets",
    detail: "Wimbledon 2027, including Centre Court.",
    image: photo.tennis,
  },
];

export const steps = [
  {
    n: "01",
    title: "Search the fixture",
    body: "Look up the club, competition or city your group is travelling for.",
  },
  {
    n: "02",
    title: "Choose a category",
    body: "Compare official seats, from standard categories to the better blocks.",
  },
  {
    n: "03",
    title: "Add hospitality",
    body: "Lounge access, dining and a hosted arrival when the match calls for it.",
  },
  {
    n: "04",
    title: "Build the package",
    body: "Pair the tickets with a hotel night and send one price to the group.",
  },
  {
    n: "05",
    title: "Confirm the booking",
    body: "We check availability, then confirm seats, names and delivery.",
  },
  {
    n: "06",
    title: "Matchday",
    body: "Tickets, hospitality and the travel note land before you leave home.",
  },
];

export const circlePerks = [
  "Free with any ticket or hospitality package",
  "Partner discounts that arrive on the email you book with",
  "Early access to seasonal sales and short-run releases",
  "Priority when a package can be upgraded",
  "A private channel for competitions, signed pieces and partner prizes",
  "Birthday rewards, travel vouchers and the odd thing money does not buy",
];

export function formatPrice(usd: number | null, currency: Currency) {
  if (usd == null) return "Price on request";
  const { symbol, rate } = currencies[currency];
  const value = Math.round(usd * rate);
  return `${symbol}${value.toLocaleString("en-US")}`;
}

export function fixtureTitle(fixture: Fixture) {
  if (fixture.sport === "motorsport" || fixture.sport === "tennis") {
    return fixture.away;
  }
  return `${fixture.home} v ${fixture.away}`;
}

export function packagesFor(fixture: Fixture) {
  if (fixture.priceUsd == null) return [];
  return [
    {
      id: "ticket",
      name: "Match ticket",
      detail: "An official category seat for this fixture.",
      priceUsd: fixture.priceUsd,
    },
    {
      id: "hospitality",
      name: "Hospitality package",
      detail: "Ticket, lounge access and a matchday meal.",
      priceUsd: Math.round(fixture.priceUsd * 2.35),
    },
    {
      id: "hotel",
      name: "Ticket and hotel",
      detail: "The match ticket with a central hotel night.",
      priceUsd: Math.round(fixture.priceUsd * 3.1),
    },
  ];
}
