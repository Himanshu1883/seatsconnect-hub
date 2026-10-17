import { collectionEventImage } from "./experience-images";

export type ExperienceType = "football" | "motorsport" | "tennis" | "music" | "rugby" | "other";

export type EventItem = {
  id: string;
  title: string;
  place: string;
  when: string;
  image: string;
  href?: string;
};

export type Collection = {
  title: string;
  type: ExperienceType;
  place: string;
  image: string;
  tag: string;
  desc: string;
  events: EventItem[];
  href?: string;
};

const shot = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const photos = {
  stadium: "/experiences/stadium.jpg",
  racing: "/experiences/racing.jpg",
  concert: "/experiences/concert.jpg",
  tennis: "/experiences/tennis.jpg",
  rugby: "/experiences/rugby.jpg",
  more: "/experiences/more-sports.jpg",
};

export const services = [
  "Official tickets",
  "Hospitality & private boxes",
  "Ticket sourcing",
  "VIP & concierge",
  "Group or corporate booking",
] as const;

export type Service = (typeof services)[number];

export const navLinks = [
  { label: "Football tickets", href: "/football" },
  { label: "Explore events", href: "/#discover" },
  { label: "Hospitality", href: "/#hospitality" },
  { label: "VIP & concierge", href: "/#services" },
  { label: "Why SeatsConnect", href: "/#why" },
];

export const quickLinks: { label: string; href: string; category?: ExperienceType }[] = [
  { label: "Football", href: "/football" },
  { label: "Premier League", href: "/football/premier-league" },
  { label: "Champions League", href: "/football/champions-league" },
  { label: "Clubs", href: "/football/clubs" },
  { label: "Formula 1", href: "/formula-1" },
  { label: "Tennis", href: "/tennis" },
  { label: "Concerts", href: "/concerts" },
  { label: "Rugby", href: "/rugby" },
  { label: "More sports", href: "/more-sports" },
  { label: "Hospitality & private boxes", href: "/#hospitality" },
  { label: "VIP & concierge", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
];

export const slides = [
  {
    title: "Your next",
    accent: ["unforgettable", "moment."],
    desc: "Official tickets and premium hospitality for the sport, music and live events you love. Find your occasion. Choose your experience. Be there.",
    image: photos.stadium,
  },
  {
    title: "The race weekend.",
    accent: ["Made", "exceptional."],
    desc: "Explore grandstand tickets and official hospitality, with personal guidance for your next motorsport occasion.",
    image: photos.racing,
  },
  {
    title: "The lights.",
    accent: ["The crowd.", "Your moment."],
    desc: "Concerts, live entertainment and premium event experiences. Tell us the artist or occasion you have in mind.",
    image: photos.concert,
  },
];

export const popularSearches: { label: string; category: ExperienceType; href?: string }[] = [
  { label: "Premier League", category: "football", href: "/football/premier-league" },
  { label: "Formula 1", category: "motorsport", href: "/formula-1" },
  { label: "Wimbledon", category: "tennis", href: "/tennis/grand-slams/wimbledon-finals-weekend" },
  { label: "Concerts", category: "music", href: "/concerts" },
];

const footballSearchRoutes: { needle: string; href: string }[] = [
  { needle: "manchester united", href: "/football/clubs/manchester-united" },
  { needle: "man united", href: "/football/clubs/manchester-united" },
  { needle: "manchester city", href: "/football/clubs/manchester-city" },
  { needle: "man city", href: "/football/clubs/manchester-city" },
  { needle: "tottenham", href: "/football/clubs/tottenham-hotspur" },
  { needle: "spurs", href: "/football/clubs/tottenham-hotspur" },
  { needle: "champions league", href: "/football/champions-league" },
  { needle: "europa league", href: "/football/europa-league" },
  { needle: "premier league", href: "/football/premier-league" },
  { needle: "la liga", href: "/football/la-liga" },
  { needle: "serie a", href: "/football/serie-a" },
  { needle: "bundesliga", href: "/football/bundesliga" },
  { needle: "ligue 1", href: "/football/ligue-1" },
  { needle: "championship", href: "/football/championship" },
  { needle: "liverpool", href: "/football/clubs/liverpool" },
  { needle: "arsenal", href: "/football/clubs/arsenal" },
  { needle: "chelsea", href: "/football/clubs/chelsea" },
  { needle: "premier", href: "/football/premier-league" },
  { needle: "champions", href: "/football/champions-league" },
  { needle: "football", href: "/football" },
  { needle: "formula 1", href: "/formula-1" },
  { needle: "formula1", href: "/formula-1" },
  { needle: "monaco", href: "/formula-1/formula-1-world-championship/monaco-grand-prix" },
  { needle: "silverstone", href: "/formula-1/formula-1-world-championship/british-grand-prix" },
  { needle: "wimbledon", href: "/tennis/grand-slams/wimbledon-finals-weekend" },
  { needle: "roland", href: "/tennis/grand-slams/roland-garros-finals-weekend" },
  { needle: "tennis", href: "/tennis" },
  { needle: "concert", href: "/concerts" },
  { needle: "wembley", href: "/concerts/stadium-tours/wembley-stadium-tour" },
  { needle: "glastonbury", href: "/concerts/stadium-tours/glastonbury-festival" },
  { needle: "rugby", href: "/rugby" },
  { needle: "six nations", href: "/rugby/six-nations" },
  { needle: "nfl", href: "/more-sports/nfl-international/nfl-london-at-wembley" },
  { needle: "boxing", href: "/more-sports/world-title-boxing/world-title-fight-las-vegas" },
  { needle: "ashes", href: "/more-sports/the-ashes/australia-cricket-vs-england-cricket" },
];

export function resolveHomeSearch(query: string, filter: ExperienceType | "all"): string | null {
  const q = query.trim().toLowerCase();
  const hit = footballSearchRoutes.find((item) => q.includes(item.needle));
  if (hit) return hit.href;
  if (filter === "football") return "/football";
  if (filter === "motorsport") return "/formula-1";
  if (filter === "tennis") return "/tennis";
  if (filter === "music") return "/concerts";
  if (filter === "rugby") return "/rugby";
  if (filter === "other") return "/more-sports";
  return null;
}

export const experienceOptions: { value: ExperienceType | "all"; label: string; tab: string }[] = [
  { value: "all", label: "All experiences", tab: "All experiences" },
  { value: "football", label: "Football", tab: "Football" },
  { value: "motorsport", label: "Motorsport", tab: "Formula 1" },
  { value: "tennis", label: "Tennis", tab: "Tennis" },
  { value: "music", label: "Music & entertainment", tab: "Concerts" },
  { value: "rugby", label: "Rugby", tab: "Rugby" },
  { value: "other", label: "Other sports", tab: "More sports" },
];

export const trustPoints = [
  { title: "Official supply", detail: "Tickets through authorised channels" },
  { title: "Premium hospitality", detail: "Lounges, suites & private boxes" },
  { title: "International experiences", detail: "Sport, music & live entertainment" },
  { title: "Ticket specialists", detail: "Personal guidance for your plans" },
];

export const collections: Collection[] = [
  {
    title: "Football",
    type: "football",
    place: "UK & Europe",
    image: photos.stadium,
    tag: "Tickets & hospitality",
    desc: "Premier League, European club football and international tournaments.",
    href: "/football",
    events: [
      { id: "pl", title: "Premier League", place: "England", when: "Aug 2026 – May 2027", image: "/matches/liverpool-vs-arsenal.jpg", href: "/football/premier-league" },
      { id: "ucl", title: "UEFA Champions League", place: "Europe", when: "Knockout stages 2027", image: "/matches/bayern-munich-vs-arsenal.jpg", href: "/football/champions-league" },
      { id: "laliga", title: "La Liga", place: "Spain", when: "2026/27 season", image: "/matches/real-madrid-vs-getafe.jpg", href: "/football/la-liga" },
      { id: "seriea", title: "Serie A", place: "Italy", when: "2026/27 season", image: "/matches/juventus-vs-lazio.jpg", href: "/football/serie-a" },
      { id: "bundesliga", title: "Bundesliga", place: "Germany", when: "2026/27 season", image: "/matches/bayer-leverkusen-vs-freiburg.jpg", href: "/football/bundesliga" },
      { id: "worldcup", title: "FIFA World Cup", place: "USA, Canada & Mexico", when: "Jun – Jul 2026", image: shot("photo-1431324155629-1a6deb1dec8d") },
    ],
  },
  {
    title: "Formula 1",
    type: "motorsport",
    place: "Race weekends worldwide",
    image: photos.racing,
    tag: "Race weekend experiences",
    desc: "Grandstand tickets and official hospitality across the race calendar.",
    href: "/formula-1",
    events: [
      { id: "monaco", title: "Monaco Grand Prix", place: "Monte Carlo", when: "Jun 2026", image: collectionEventImage("monaco"), href: "/formula-1/formula-1-world-championship/monaco-grand-prix" },
      { id: "silverstone", title: "British Grand Prix", place: "Silverstone", when: "Jul 2026", image: collectionEventImage("silverstone"), href: "/formula-1/formula-1-world-championship/british-grand-prix" },
      { id: "monza", title: "Italian Grand Prix", place: "Monza", when: "Sep 2026", image: collectionEventImage("monza"), href: "/formula-1/formula-1-world-championship/italian-grand-prix" },
      { id: "spa", title: "Belgian Grand Prix", place: "Spa-Francorchamps", when: "Aug 2026", image: collectionEventImage("spa"), href: "/formula-1/formula-1-world-championship/belgian-grand-prix" },
      { id: "abudhabi", title: "Abu Dhabi Grand Prix", place: "Yas Marina", when: "Dec 2026", image: collectionEventImage("abudhabi"), href: "/formula-1/formula-1-world-championship/abu-dhabi-grand-prix" },
      { id: "austin", title: "United States Grand Prix", place: "Austin", when: "Oct 2026", image: collectionEventImage("austin") },
    ],
  },
  {
    title: "Tennis",
    type: "tennis",
    place: "International tournaments",
    image: photos.tennis,
    tag: "Courtside occasions",
    desc: "Explore major tournaments, premium seating and hospitality enquiries.",
    href: "/tennis",
    events: [
      { id: "wimbledon", title: "Wimbledon", place: "London", when: "Jun – Jul 2026", image: collectionEventImage("wimbledon"), href: "/tennis/grand-slams/wimbledon-finals-weekend" },
      { id: "rolandgarros", title: "Roland-Garros", place: "Paris", when: "May – Jun 2026", image: collectionEventImage("rolandgarros"), href: "/tennis/grand-slams/roland-garros-finals-weekend" },
      { id: "usopen", title: "US Open", place: "New York", when: "Aug – Sep 2026", image: collectionEventImage("usopen"), href: "/tennis/grand-slams/us-open-finals-weekend" },
      { id: "ausopen", title: "Australian Open", place: "Melbourne", when: "Jan 2027", image: collectionEventImage("ausopen"), href: "/tennis/grand-slams/australian-open-finals-weekend" },
      { id: "atpfinals", title: "ATP Finals", place: "Turin", when: "Nov 2026", image: collectionEventImage("atpfinals"), href: "/tennis/atp-finals-week/atp-finals-finals-day" },
      { id: "lavercup", title: "Laver Cup", place: "Europe", when: "Sep 2026", image: collectionEventImage("lavercup") },
    ],
  },
  {
    title: "Concerts & entertainment",
    type: "music",
    place: "Global tours & live stages",
    image: photos.concert,
    tag: "Live entertainment",
    desc: "Your favourite artists, live performances and premium event packages.",
    href: "/concerts",
    events: [
      { id: "stadium-tours", title: "Stadium tours", place: "Worldwide", when: "2026 dates", image: collectionEventImage("stadium-tours"), href: "/concerts/stadium-tours/wembley-stadium-tour" },
      { id: "arena", title: "Arena shows", place: "UK & Europe", when: "2026 season", image: collectionEventImage("arena"), href: "/concerts/arenas-and-theatre/the-o2-arena-show" },
      { id: "festivals", title: "Summer festivals", place: "Europe", when: "Jun – Aug 2026", image: collectionEventImage("festivals"), href: "/concerts/stadium-tours/glastonbury-festival" },
      { id: "residency", title: "Las Vegas residencies", place: "Las Vegas", when: "2026 season", image: collectionEventImage("residency"), href: "/concerts/arenas-and-theatre/las-vegas-residency" },
      { id: "westend", title: "West End & theatre", place: "London", when: "Year round", image: collectionEventImage("westend"), href: "/concerts/arenas-and-theatre/west-end-at-drury-lane" },
      { id: "openair", title: "Open-air concerts", place: "Worldwide", when: "Summer 2026", image: collectionEventImage("openair") },
    ],
  },
  {
    title: "Rugby",
    type: "rugby",
    place: "UK & international",
    image: photos.rugby,
    tag: "Matchday experiences",
    desc: "International rugby and club occasions, with ticket and hosting options.",
    href: "/rugby",
    events: [
      { id: "sixnations", title: "Six Nations", place: "UK, Ireland, France & Italy", when: "Feb – Mar 2027", image: collectionEventImage("sixnations"), href: "/rugby/six-nations" },
      { id: "premiership", title: "Gallagher Premiership", place: "England", when: "2026/27 season", image: collectionEventImage("premiership"), href: "/rugby/club-rugby/saracens-vs-leicester-tigers" },
      { id: "urc", title: "United Rugby Championship", place: "Europe & South Africa", when: "2026/27 season", image: collectionEventImage("urc"), href: "/rugby/club-rugby/leinster-vs-munster" },
      { id: "autumn", title: "Autumn internationals", place: "Twickenham & beyond", when: "Nov 2026", image: collectionEventImage("autumn"), href: "/rugby/six-nations/ireland-rugby-vs-france-rugby" },
      { id: "championscup", title: "Champions Cup", place: "Europe", when: "Finals 2027", image: collectionEventImage("championscup"), href: "/rugby/club-rugby/northampton-vs-toulouse" },
      { id: "lions", title: "British & Irish Lions", place: "Tour venues", when: "Summer 2027", image: collectionEventImage("lions") },
    ],
  },
  {
    title: "More sporting occasions",
    type: "other",
    place: "Events worldwide",
    image: photos.more,
    tag: "Specialist requests",
    desc: "Boxing, NFL and other sporting occasions. Tell us your preferred event.",
    href: "/more-sports",
    events: [
      { id: "boxing", title: "World title boxing", place: "Las Vegas & London", when: "2026 cards", image: collectionEventImage("boxing"), href: "/more-sports/world-title-boxing/world-title-fight-las-vegas" },
      { id: "nfl", title: "NFL London", place: "Wembley & Tottenham", when: "Oct 2026", image: collectionEventImage("nfl"), href: "/more-sports/nfl-international/nfl-london-at-wembley" },
      { id: "nba", title: "NBA", place: "USA", when: "2026/27 season", image: collectionEventImage("nba"), href: "/more-sports/nba-regular-season/new-york-knicks-at-msg" },
      { id: "golf", title: "The Open", place: "Royal Birkdale", when: "Jul 2026", image: collectionEventImage("golf"), href: "/more-sports/the-open/the-open-final-round" },
      { id: "cricket", title: "The Ashes", place: "Australia", when: "Nov 2026 – Jan 2027", image: collectionEventImage("cricket"), href: "/more-sports/the-ashes/australia-cricket-vs-england-cricket" },
      { id: "olympics", title: "Winter Olympics", place: "Milano Cortina", when: "Feb 2026", image: collectionEventImage("olympics") },
    ],
  },
];

export const editorials: {
  eyebrow: string;
  lines: string[];
  link: string;
  service: Service;
  image: string;
}[] = [
  {
    eyebrow: "Motorsport & hospitality",
    lines: ["The race.", "The atmosphere.", "The whole experience."],
    link: "Discuss a race weekend",
    service: "Hospitality & private boxes",
    image: photos.racing,
  },
  {
    eyebrow: "Music & live entertainment",
    lines: ["Your favourite artist.", "An unforgettable night."],
    link: "Find your concert experience",
    service: "Ticket sourcing",
    image: photos.concert,
  },
];

export const destinations = [
  { label: "London", value: "London" },
  { label: "Manchester", value: "Manchester" },
  { label: "Madrid", value: "Madrid" },
  { label: "Abu Dhabi", value: "Abu Dhabi" },
  { label: "Monaco", value: "Monaco" },
  { label: "Explore worldwide", value: "International event" },
];

export const inclusions = [
  { title: "Premium seating", detail: "Choose the view and category that suit you." },
  { title: "Hospitality lounges", detail: "Dining and hosting, with package-specific inclusions." },
  { title: "Private boxes & suites", detail: "Dedicated spaces for your group or business." },
  { title: "Group experiences", detail: "A single specialist for your guest requirements." },
];

export const specialistServices: {
  eyebrow: string;
  lines: string[];
  body: string;
  points: string[];
  cta: string;
  service: Service;
  dark: boolean;
}[] = [
  {
    eyebrow: "01 / Ticket sourcing",
    lines: ["The event you want.", "The options you need."],
    body: "Cannot find your event or preferred package? Our specialists explore authorised ticket and hospitality supply to find suitable options.",
    points: [
      "Specific seating and hospitality requests",
      "International events and group requirements",
      "Clear inclusions and pricing before you decide",
    ],
    cta: "Request ticket sourcing",
    service: "Ticket sourcing",
    dark: false,
  },
  {
    eyebrow: "02 / VIP & concierge",
    lines: ["An exceptional experience.", "Personally considered."],
    body: "A discreet service for private clients, high-profile guests, their representatives and corporate hosts.",
    points: [
      "VIP hospitality, private boxes and suites",
      "Personal guidance for you and your guests",
      "Hotel and transfer requests, confirmed separately",
    ],
    cta: "Discuss your VIP plans",
    service: "VIP & concierge",
    dark: true,
  },
];

export const differences = [
  {
    label: "01 / Official channels",
    title: "Confidence in the source.",
    body: "We sell official tickets and hospitality sourced through authorised channels. Each offer identifies the event, ticket category and package details.",
  },
  {
    label: "02 / Clear choices",
    title: "Know your experience.",
    body: "Understand the seating, hospitality inclusions, delivery arrangements and applicable terms before confirming your booking.",
  },
  {
    label: "03 / Personal support",
    title: "A specialist on your side.",
    body: "From one seat to a hosted group, our team helps you explore your requirements and coordinate the confirmed arrangements.",
  },
];

export type SocialKind = "reel" | "photo";

export const socialPosts: {
  kind: SocialKind;
  label: string;
  lines: string[];
  detail: string;
  caption: string;
  image: string;
  alt: string;
}[] = [
  {
    kind: "reel",
    label: "Reel / preview",
    lines: ["Matchday.", "Up close."],
    detail: "Football & stadium hospitality",
    caption: "Matchday, up close",
    image: photos.stadium,
    alt: "Illustrative matchday photograph",
  },
  {
    kind: "reel",
    label: "Video / preview",
    lines: ["A weekend", "at the races."],
    detail: "Motorsport & VIP experiences",
    caption: "A weekend at the races",
    image: photos.racing,
    alt: "Illustrative motorsport photograph",
  },
  {
    kind: "photo",
    label: "Post / preview",
    lines: ["The lights.", "The crowd.", "The moment."],
    detail: "Concerts & live entertainment",
    caption: "The lights. The crowd. The moment.",
    image: photos.concert,
    alt: "Illustrative concert photograph",
  },
  {
    kind: "photo",
    label: "Photo / preview",
    lines: ["A different kind", "of courtside."],
    detail: "Tennis & premium occasions",
    caption: "A different kind of courtside",
    image: photos.tennis,
    alt: "Illustrative tennis photograph",
  },
];

export const socialFilters: { value: SocialKind | "all"; label: string }[] = [
  { value: "all", label: "All moments" },
  { value: "reel", label: "Reels & videos" },
  { value: "photo", label: "Photos & posts" },
];

export const faqs = [
  {
    q: "Are your tickets and hospitality official?",
    a: "SeatsConnect sells official tickets and hospitality through authorised supply channels. The specific supplier, category, inclusions and applicable terms are confirmed for each offer. Authorisation is specific to the relevant event or product.",
  },
  {
    q: "Can you source an event that is not listed?",
    a: "Yes. Share your event, destination, dates and preferences. Our specialists will explore official supply options. Availability is subject to confirmation.",
  },
  {
    q: "What does hospitality include?",
    a: "It varies by event and package. Options may include premium seating, lounge access, dining or a private box. Your quotation will set out the precise inclusions.",
  },
  {
    q: "Can you arrange a group or corporate occasion?",
    a: "We welcome group and corporate hospitality enquiries. Share your guest numbers, preferred event and hosting requirements so we can explore suitable packages.",
  },
  {
    q: "Do VIP requests include hotels and transfers?",
    a: "Hotels and transfers can be requested as part of your plans. They are separately quoted and confirmed, and are included only where expressly stated.",
  },
];

export const footerLinks = [
  { label: "Football tickets", href: "/football" },
  { label: "Formula 1", href: "/formula-1" },
  { label: "Tennis", href: "/tennis" },
  { label: "Concerts", href: "/concerts" },
  { label: "Rugby", href: "/rugby" },
  { label: "More sports", href: "/more-sports" },
  { label: "Explore events", href: "/#discover" },
  { label: "Hospitality", href: "/#hospitality" },
  { label: "Contact our team", href: "/#request" },
];
