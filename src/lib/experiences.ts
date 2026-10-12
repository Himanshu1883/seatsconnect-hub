export type ExperienceType = "football" | "motorsport" | "tennis" | "music" | "rugby" | "other";

export type EventItem = {
  id: string;
  title: string;
  place: string;
  when: string;
  image: string;
};

export type Collection = {
  title: string;
  type: ExperienceType;
  place: string;
  image: string;
  tag: string;
  desc: string;
  events: EventItem[];
};

const shot = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const photos = {
  stadium: "/experiences/stadium.jpg",
  racing: "/experiences/racing.jpg",
  concert: "/experiences/concert.jpg",
  tennis: "/experiences/tennis.jpg",
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
  { label: "Explore events", href: "#discover" },
  { label: "Hospitality", href: "#hospitality" },
  { label: "VIP & concierge", href: "#services" },
  { label: "Why SeatsConnect", href: "#why" },
];

export const quickLinks: { label: string; href: string; category?: ExperienceType }[] = [
  { label: "Football", href: "#discover", category: "football" },
  { label: "Formula 1", href: "#discover", category: "motorsport" },
  { label: "Tennis", href: "#discover", category: "tennis" },
  { label: "Concerts & entertainment", href: "#discover", category: "music" },
  { label: "Hospitality & private boxes", href: "#hospitality" },
  { label: "VIP & concierge", href: "#services" },
  { label: "Reviews", href: "#reviews" },
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

export const popularSearches: { label: string; category: ExperienceType }[] = [
  { label: "Premier League", category: "football" },
  { label: "Formula 1", category: "motorsport" },
  { label: "Concerts", category: "music" },
];

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
    events: [
      { id: "pl", title: "Premier League", place: "England", when: "Aug 2026 – May 2027", image: shot("photo-1522778119026-d647f0596c20") },
      { id: "ucl", title: "UEFA Champions League", place: "Europe", when: "Knockout stages 2027", image: shot("photo-1489944440615-453fc2b6a9a9") },
      { id: "laliga", title: "La Liga", place: "Spain", when: "2026/27 season", image: shot("photo-1574629810360-7efbbe195018") },
      { id: "seriea", title: "Serie A", place: "Italy", when: "2026/27 season", image: shot("photo-1570498839593-e565b39455fc") },
      { id: "bundesliga", title: "Bundesliga", place: "Germany", when: "2026/27 season", image: shot("photo-1459865264687-595d652de67e") },
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
    events: [
      { id: "monaco", title: "Monaco Grand Prix", place: "Monte Carlo", when: "Jun 2026", image: shot("photo-1503376780353-7e6692767b70") },
      { id: "silverstone", title: "British Grand Prix", place: "Silverstone", when: "Jul 2026", image: shot("photo-1568605117036-5fe5e7bab0b7") },
      { id: "monza", title: "Italian Grand Prix", place: "Monza", when: "Sep 2026", image: shot("photo-1541447271487-09612b3f49f7") },
      { id: "spa", title: "Belgian Grand Prix", place: "Spa-Francorchamps", when: "Aug 2026", image: shot("photo-1517153295259-74eb0b416cee") },
      { id: "abudhabi", title: "Abu Dhabi Grand Prix", place: "Yas Marina", when: "Dec 2026", image: shot("photo-1533106497176-45ae19e68ba2") },
      { id: "austin", title: "United States Grand Prix", place: "Austin", when: "Oct 2026", image: shot("photo-1511919884226-fd3cad34687c") },
    ],
  },
  {
    title: "Tennis",
    type: "tennis",
    place: "International tournaments",
    image: photos.tennis,
    tag: "Courtside occasions",
    desc: "Explore major tournaments, premium seating and hospitality enquiries.",
    events: [
      { id: "wimbledon", title: "Wimbledon", place: "London", when: "Jun – Jul 2026", image: shot("photo-1622279457486-62dcc4a431d6") },
      { id: "rolandgarros", title: "Roland-Garros", place: "Paris", when: "May – Jun 2026", image: shot("photo-1554068865-24cecd4e34b8") },
      { id: "usopen", title: "US Open", place: "New York", when: "Aug – Sep 2026", image: shot("photo-1595435934249-5df7ed86e1c0") },
      { id: "ausopen", title: "Australian Open", place: "Melbourne", when: "Jan 2027", image: shot("photo-1626224583764-f87db24ac4ea") },
      { id: "atpfinals", title: "ATP Finals", place: "Turin", when: "Nov 2026", image: shot("photo-1587280501635-68a0e82cd5ff") },
      { id: "lavercup", title: "Laver Cup", place: "Europe", when: "Sep 2026", image: shot("photo-1542144582-1ba00456b5e3") },
    ],
  },
  {
    title: "Concerts & entertainment",
    type: "music",
    place: "Global tours & live stages",
    image: photos.concert,
    tag: "Live entertainment",
    desc: "Your favourite artists, live performances and premium event packages.",
    events: [
      { id: "stadium-tours", title: "Stadium tours", place: "Worldwide", when: "2026 dates", image: shot("photo-1501386761578-eac5c94b800a") },
      { id: "arena", title: "Arena shows", place: "UK & Europe", when: "2026 season", image: shot("photo-1470229722913-7c0e2dbbafd3") },
      { id: "festivals", title: "Summer festivals", place: "Europe", when: "Jun – Aug 2026", image: shot("photo-1533174072545-7a4b6ad7a6c3") },
      { id: "residency", title: "Las Vegas residencies", place: "Las Vegas", when: "2026 season", image: shot("photo-1514525253161-7a46d19cd819") },
      { id: "westend", title: "West End & theatre", place: "London", when: "Year round", image: shot("photo-1507676184212-d03ab07a01bf") },
      { id: "openair", title: "Open-air concerts", place: "Worldwide", when: "Summer 2026", image: shot("photo-1493225457124-a3eb161ffa5f") },
    ],
  },
  {
    title: "Rugby",
    type: "rugby",
    place: "UK & international",
    image: photos.stadium,
    tag: "Matchday experiences",
    desc: "International rugby and club occasions, with ticket and hosting options.",
    events: [
      { id: "sixnations", title: "Six Nations", place: "UK, Ireland, France & Italy", when: "Feb – Mar 2027", image: shot("photo-1517466787929-bc90951d0974") },
      { id: "premiership", title: "Gallagher Premiership", place: "England", when: "2026/27 season", image: shot("photo-1517466787929-bc90951d0974") },
      { id: "urc", title: "United Rugby Championship", place: "Europe & South Africa", when: "2026/27 season", image: shot("photo-1431324155629-1a6deb1dec8d") },
      { id: "autumn", title: "Autumn internationals", place: "Twickenham & beyond", when: "Nov 2026", image: shot("photo-1480099225005-2513c8947aec") },
      { id: "championscup", title: "Champions Cup", place: "Europe", when: "Finals 2027", image: shot("photo-1570498839593-e565b39455fc") },
      { id: "lions", title: "British & Irish Lions", place: "Tour venues", when: "Summer 2027", image: shot("photo-1577223625816-7546f13df25d") },
    ],
  },
  {
    title: "More sporting occasions",
    type: "other",
    place: "Events worldwide",
    image: photos.stadium,
    tag: "Specialist requests",
    desc: "Boxing, NFL and other sporting occasions. Tell us your preferred event.",
    events: [
      { id: "boxing", title: "World title boxing", place: "Las Vegas & London", when: "2026 cards", image: shot("photo-1549719386-74dfcbf7dbed") },
      { id: "nfl", title: "NFL London", place: "Wembley & Tottenham", when: "Oct 2026", image: shot("photo-1566577134770-3d85bb3a9cc4") },
      { id: "nba", title: "NBA", place: "USA", when: "2026/27 season", image: shot("photo-1574623452334-1e0ac2b3ccb4") },
      { id: "golf", title: "The Open", place: "Royal Birkdale", when: "Jul 2026", image: shot("photo-1587174486073-ae5e5cff23aa") },
      { id: "cricket", title: "The Ashes", place: "Australia", when: "Nov 2026 – Jan 2027", image: shot("photo-1531415074968-036ba1b575da") },
      { id: "olympics", title: "Winter Olympics", place: "Milano Cortina", when: "Feb 2026", image: shot("photo-1551698618-1dfe5d97d256") },
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
  { label: "Explore events", href: "#discover" },
  { label: "Hospitality", href: "#hospitality" },
  { label: "VIP services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Social edit", href: "#social" },
  { label: "Contact our team", href: "#request" },
];
