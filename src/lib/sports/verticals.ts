export type VerticalId = "formula-1" | "tennis" | "concerts" | "rugby" | "more-sports";

export type Vertical = {
  id: VerticalId;
  path: string;
  name: string;
  short: string;
  hostKey: string;
  hostSingular: string;
  hostPlural: string;
  eventSingular: string;
  eventPlural: string;
  seasonLabel: string;
  eyebrow: string;
  heroTitle: [string, string];
  heroBody: string;
  competitionsTitle: string;
  upcomingTitle: string;
  hostsTitle: string;
  hostsBody: string;
  bandEyebrow: string;
  bandTitle: string;
  bandBody: string;
  bandSlugs: string[];
  allTitle: string;
  packageTitle: string;
  faqTitle: string;
  spotlight?: string;
};

export const verticals: Record<VerticalId, Vertical> = {
  "formula-1": {
    id: "formula-1",
    path: "/formula-1",
    name: "Formula 1",
    short: "F1",
    hostKey: "circuits",
    hostSingular: "Circuit",
    hostPlural: "Circuits",
    eventSingular: "race",
    eventPlural: "races",
    seasonLabel: "Season 2026",
    eyebrow: "Formula 1 tickets · Season 2026",
    heroTitle: ["Lights out.", "The whole weekend."],
    heroBody:
      "Official grandstand tickets and paddock hospitality for the 2026 Formula 1 World Championship, confirmed by a personal specialist.",
    competitionsTitle: "Choose your championship",
    upcomingTitle: "Book your next race weekend",
    hostsTitle: "Follow the circuit",
    hostsBody: "Grandstand maps, hospitality lounges and travel notes for every destination on the calendar.",
    bandEyebrow: "Signature race weekends",
    bandTitle: "The races everyone wants",
    bandBody: "Harbour views, historic tarmac and season finales. Hospitality is the most reliable way to secure a seat.",
    bandSlugs: ["formula-1-world-championship"],
    allTitle: "All Formula 1 tickets & hospitality",
    packageTitle: "Unleash the ultimate race weekend",
    faqTitle: "Buying Formula 1 tickets with SeatsConnect",
    spotlight: "monaco-grand-prix",
  },
  tennis: {
    id: "tennis",
    path: "/tennis",
    name: "Tennis",
    short: "Tennis",
    hostKey: "tournaments",
    hostSingular: "Tournament",
    hostPlural: "Tournaments",
    eventSingular: "session",
    eventPlural: "sessions",
    seasonLabel: "2026/27 calendar",
    eyebrow: "Tennis tickets · 2026/27",
    heroTitle: ["Centre court.", "Your occasion."],
    heroBody:
      "Official tickets and hospitality for the Grand Slams and season-ending finals, with personal guidance from a specialist.",
    competitionsTitle: "Choose your tour",
    upcomingTitle: "Book your next courtside day",
    hostsTitle: "Follow the tournament",
    hostsBody: "Seat maps, hospitality suites and travel notes for every championship on the calendar.",
    bandEyebrow: "Grand Slam occasions",
    bandTitle: "The championships that define the year",
    bandBody: "From Centre Court to Philippe-Chatrier — hospitality is the most reliable way to secure a seat.",
    bandSlugs: ["grand-slams"],
    allTitle: "All tennis tickets & hospitality",
    packageTitle: "Unleash the ultimate tennis experience",
    faqTitle: "Buying tennis tickets with SeatsConnect",
    spotlight: "wimbledon-finals-weekend",
  },
  concerts: {
    id: "concerts",
    path: "/concerts",
    name: "Concerts & entertainment",
    short: "Concerts",
    hostKey: "venues",
    hostSingular: "Venue",
    hostPlural: "Venues",
    eventSingular: "show",
    eventPlural: "shows",
    seasonLabel: "2026 season",
    eyebrow: "Concerts & live entertainment · 2026",
    heroTitle: ["The lights.", "Your moment."],
    heroBody:
      "Official tickets and VIP hospitality for stadium tours, residencies and nights at the theatre, confirmed by a personal specialist.",
    competitionsTitle: "Choose your stage",
    upcomingTitle: "Book your next night out",
    hostsTitle: "Follow the venue",
    hostsBody: "Seat maps, lounge access and city notes for the rooms that host the biggest nights.",
    bandEyebrow: "Headline nights",
    bandTitle: "Stadiums, arenas and once-in-a-season shows",
    bandBody: "Hospitality and official VIP are the most reliable way to sit together for the biggest tours.",
    bandSlugs: ["stadium-tours"],
    allTitle: "All concert tickets & VIP packages",
    packageTitle: "Unleash the ultimate live experience",
    faqTitle: "Buying concert tickets with SeatsConnect",
    spotlight: "wembley-stadium-tour",
  },
  rugby: {
    id: "rugby",
    path: "/rugby",
    name: "Rugby",
    short: "Rugby",
    hostKey: "clubs",
    hostSingular: "Club",
    hostPlural: "Clubs",
    eventSingular: "match",
    eventPlural: "matches",
    seasonLabel: "Season 2026/27",
    eyebrow: "Rugby tickets · Season 2026/27",
    heroTitle: ["The roar.", "The whole weekend."],
    heroBody:
      "Official tickets and hospitality for the Six Nations, club rugby and Europe’s knockout nights, confirmed by a personal specialist.",
    competitionsTitle: "Choose your competition",
    upcomingTitle: "Book your next matchday",
    hostsTitle: "Follow your club",
    hostsBody: "Every home fixture, hospitality lounge and stadium guide, organised by club.",
    bandEyebrow: "International rugby",
    bandTitle: "The championships that fill the stands",
    bandBody: "Twickenham, Dublin and the knockout nights in Europe. Hospitality is the most reliable way to sit together.",
    bandSlugs: ["six-nations"],
    allTitle: "All rugby tickets & hospitality",
    packageTitle: "Unleash the ultimate rugby experience",
    faqTitle: "Buying rugby tickets with SeatsConnect",
    spotlight: "england-rugby-vs-wales-rugby",
  },
  "more-sports": {
    id: "more-sports",
    path: "/more-sports",
    name: "More sports",
    short: "More sports",
    hostKey: "venues",
    hostSingular: "Venue",
    hostPlural: "Venues",
    eventSingular: "event",
    eventPlural: "events",
    seasonLabel: "2026 calendar",
    eyebrow: "World sport tickets · 2026",
    heroTitle: ["The occasion.", "Wherever it is."],
    heroBody:
      "Official tickets and hospitality for boxing, NFL, NBA, golf and cricket — specialist sourcing for the events you actually want.",
    competitionsTitle: "Choose your sport",
    upcomingTitle: "Book your next occasion",
    hostsTitle: "Follow the venue",
    hostsBody: "Seat maps, hospitality and travel notes for the world’s landmark sporting rooms.",
    bandEyebrow: "Once-a-year occasions",
    bandTitle: "The events that sell out first",
    bandBody: "From a world-title fight to The Open. Hospitality is the most reliable way to secure a seat together.",
    bandSlugs: ["world-title-boxing", "the-open"],
    allTitle: "All specialist sports tickets",
    packageTitle: "Unleash the ultimate sporting occasion",
    faqTitle: "Buying specialist sports tickets with SeatsConnect",
    spotlight: "nfl-london-at-wembley",
  },
};

export function getVertical(id: string): Vertical | null {
  return (verticals as Record<string, Vertical>)[id] ?? null;
}

export const verticalIds = Object.keys(verticals) as VerticalId[];
