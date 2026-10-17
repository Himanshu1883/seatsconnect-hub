import { fixtureHeroImage, venueImage } from "../../experience-images";
import type { VenueMapLayout } from "../types";
import type { Availability, Club, Competition, Faq, Fixture, TravelTip, Venue } from "../types";
import type { VerticalId } from "../verticals";
import { img } from "./media";

const faqs: Faq[] = [
  {
    q: "Are these official tickets?",
    a: "Yes. Every seat and hospitality package is sourced through official organisers, venues and rights-holders, with 100% guaranteed access.",
  },
  {
    q: "When will I receive my tickets?",
    a: "Most organisers deliver mobile tickets two to five days before the event. Your specialist confirms the exact method for your booking.",
  },
  {
    q: "What happens if the date or time changes?",
    a: "If the organiser moves the event, your booking transfers automatically to the new date and time, and we notify you as soon as it is confirmed.",
  },
];

const guide = [
  { label: "Payments", value: "Cashless venue — bring a bank card or phone wallet" },
  { label: "Bags", value: "Small bags only; cloakroom is not guaranteed" },
  { label: "Accessibility", value: "Accessible seating and step-free routes available on request" },
  { label: "Gates open", value: "Usually 90 minutes before the advertised start" },
];

function travel(city: string, name: string): TravelTip[] {
  return [
    { mode: "air", title: "By air", text: `Fly into ${city}'s main international airport and allow around an hour to reach ${name}.` },
    { mode: "train", title: "By public transport", text: `Local rail and metro services run extra journeys on event days. Expect busy platforms afterwards.` },
    { mode: "car", title: "By car", text: "Road closures apply around the venue. Parking is limited and not included unless stated." },
  ];
}

function venue(
  slug: string,
  name: string,
  city: string,
  country: string,
  address: string,
  capacity: number,
  opened: number,
  stands: Venue["stands"],
  mapLayout: VenueMapLayout = "pitch",
): Venue {
  return {
    slug,
    name,
    city,
    country,
    address,
    capacity,
    opened,
    image: venueImage(slug),
    mapLayout,
    stands,
    travel: travel(city, name),
    hotels: [
      { name: `${city} Grand Hotel`, distance: "0.6 miles" },
      { name: `${name} Lodge`, distance: "0.3 miles" },
    ],
    guide,
  };
}

function host(
  slug: string,
  name: string,
  short: string,
  code: string,
  colors: [string, string],
  city: string,
  country: string,
  venueSlug: string,
  extra: Partial<Club> = {},
): Club {
  return { slug, name, short, code, colors, city, country, venue: venueSlug, ...extra };
}

function series(
  slug: string,
  name: string,
  short: string,
  season: string,
  country: string,
  region: Competition["region"],
  tagline: string,
  image: string,
  facts: Competition["facts"],
  about: string[],
): Competition {
  return { slug, name, short, season, country, region, tagline, about, image, facts, faqs };
}

type FxOptions = {
  was?: number;
  status?: Availability;
  confirmed?: boolean;
  stage?: string;
  highlight?: string;
  about?: string;
  format?: Fixture["format"];
  headline?: string;
  rules?: string[];
  heroImage?: string;
};

function iso(local: string, offset: string) {
  return `${local.replace(" ", "T")}:00${offset}`;
}

function fx(
  competition: string,
  home: string,
  away: string,
  local: string,
  offset: string,
  fromPrice: number,
  options: FxOptions = {},
): Fixture {
  const slug = options.headline
    ? options.headline.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : `${home}-vs-${away}`;
  return {
    slug,
    competition,
    home,
    away,
    kickoff: iso(local, offset),
    dateConfirmed: options.confirmed ?? true,
    fromPrice,
    wasPrice: options.was,
    availability: options.status ?? "available",
    stage: options.stage,
    highlight: options.highlight,
    about: options.about,
    rules: options.rules ?? [],
    format: options.format ?? "event",
    headline: options.headline,
    heroImage: options.heroImage ?? fixtureHeroImage(slug),
  };
}

export const extraVenues: Venue[] = [
  venue("circuit-de-monaco", "Circuit de Monaco", "Monte Carlo", "Monaco", "Boulevard Albert 1er, 98000 Monaco", 37000, 1929, {
    north: "Portier", east: "Casino Square", south: "Swimming Pool", west: "Rascasse",
  }, "circuit"),
  venue("silverstone", "Silverstone Circuit", "Silverstone", "United Kingdom", "Silverstone, Towcester NN12 8TN", 150000, 1948, {
    north: "Wing", east: "Village", south: "Stowe", west: "Club",
  }, "circuit"),
  venue("monza", "Autodromo Nazionale Monza", "Monza", "Italy", "Via Vedano 5, 20900 Monza", 118865, 1922, {
    north: "Ascari", east: "Parabolica", south: "First chicane", west: "Main grandstand",
  }, "circuit"),
  venue("spa-francorchamps", "Circuit de Spa-Francorchamps", "Stavelot", "Belgium", "Route du Circuit 55, 4970 Stavelot", 70000, 1921, {
    north: "Eau Rouge", east: "Bus Stop", south: "La Source", west: "Raidillon",
  }, "circuit"),
  venue("yas-marina", "Yas Marina Circuit", "Abu Dhabi", "United Arab Emirates", "Yas Island, Abu Dhabi", 60000, 2009, {
    north: "North grandstand", east: "Marina", south: "South grandstand", west: "Main grandstand",
  }, "circuit"),
  venue("all-england-club", "All England Lawn Tennis Club", "London", "United Kingdom", "Church Road, Wimbledon, London SW19 5AE", 14979, 1877, {
    north: "Centre Court", east: "No.1 Court", south: "No.2 Court", west: "Henman Hill",
  }, "court"),
  venue("roland-garros", "Stade Roland-Garros", "Paris", "France", "2 Avenue Gordon-Bennett, 75016 Paris", 15000, 1928, {
    north: "Philippe-Chatrier", east: "Suzanne-Lenglen", south: "Simonne-Mathieu", west: "Outside courts",
  }, "court"),
  venue("ustas-billie-jean-king", "USTA Billie Jean King National Tennis Center", "New York", "United States", "Flushing Meadows, Queens, NY 11368", 23771, 1978, {
    north: "Arthur Ashe", east: "Louis Armstrong", south: "Grandstand", west: "Outer courts",
  }, "court"),
  venue("melbourne-park", "Melbourne Park", "Melbourne", "Australia", "Olympic Blvd, Melbourne VIC 3000", 15000, 1988, {
    north: "Rod Laver Arena", east: "Margaret Court", south: "John Cain Arena", west: "Show courts",
  }, "court"),
  venue("pala-alpitour", "Pala Alpitour", "Turin", "Italy", "Corso Sebastopoli 123, 10137 Torino", 13200, 2005, {
    north: "North stand", east: "East stand", south: "South stand", west: "West stand",
  }, "court"),
  venue("wembley-stadium", "Wembley Stadium", "London", "United Kingdom", "Wembley, London HA9 0WS", 90000, 2007, {
    north: "Pitch standing", east: "East tier", south: "South tier", west: "West tier",
  }, "bowl"),
  venue("the-o2", "The O2", "London", "United Kingdom", "Peninsula Square, London SE10 0DX", 20000, 2007, {
    north: "Floor", east: "East bowl", south: "South bowl", west: "West bowl",
  }, "bowl"),
  venue("worthy-farm", "Worthy Farm", "Pilton", "United Kingdom", "Worthy Farm, Pilton, Somerset BA4 4BY", 210000, 1970, {
    north: "Pyramid", east: "Other Stage", south: "West Holts", west: "Woodsies",
  }, "bowl"),
  venue("sphere-las-vegas", "Sphere", "Las Vegas", "United States", "The Sphere, 255 Sands Ave, Las Vegas, NV 89169", 18600, 2023, {
    north: "Floor", east: "300 level", south: "200 level", west: "VIP suites",
  }, "bowl"),
  venue("theatre-royal-drury-lane", "Theatre Royal Drury Lane", "London", "United Kingdom", "Catherine Street, London WC2B 5JF", 2196, 1812, {
    north: "Stalls", east: "Royal Circle", south: "Grand Circle", west: "Balcony",
  }, "bowl"),
  venue("twickenham", "Twickenham Stadium", "London", "United Kingdom", "Whitton Road, Twickenham TW2 7BA", 82223, 1909, {
    north: "North Stand", east: "East Stand", south: "South Stand", west: "West Stand",
  }, "pitch"),
  venue("aviva-stadium", "Aviva Stadium", "Dublin", "Ireland", "Lansdowne Road, Dublin 4", 51700, 2010, {
    north: "North Stand", east: "East Stand", south: "South Stand", west: "West Stand",
  }, "pitch"),
  venue("stonex-stadium", "StoneX Stadium", "London", "United Kingdom", "Greenlands Lane, Hendon, London NW4 1RL", 10500, 1997, {
    north: "North terrace", east: "East stand", south: "South stand", west: "West stand",
  }, "pitch"),
  venue("aviva-rds", "RDS Arena", "Dublin", "Ireland", "Ballsbridge, Dublin 4", 18500, 1927, {
    north: "Anglesea", east: "East stand", south: "South terrace", west: "Grandstand",
  }, "pitch"),
  venue("franklins-gardens", "cinch Stadium at Franklin's Gardens", "Northampton", "United Kingdom", "Weedon Road, Northampton NN5 5BG", 15249, 1880, {
    north: "Church's Stand", east: "Barwell Stand", south: "Tetley's Stand", west: "Sturtridge Pavilion",
  }, "pitch"),
  venue("t-mobile-arena", "T-Mobile Arena", "Las Vegas", "United States", "3780 S Las Vegas Blvd, Las Vegas, NV 89158", 20000, 2016, {
    north: "Floor", east: "200 level", south: "Lower bowl", west: "Suites",
  }, "bowl"),
  venue("madison-square-garden", "Madison Square Garden", "New York", "United States", "4 Pennsylvania Plaza, New York, NY 10001", 19812, 1968, {
    north: "Floor", east: "Madison suite", south: "Lower bowl", west: "Fifth Avenue",
  }, "bowl"),
  venue("royal-birkdale", "Royal Birkdale Golf Club", "Southport", "United Kingdom", "Waterloo Road, Southport PR8 2LX", 40000, 1889, {
    north: "1st tee", east: "Clubhouse", south: "18th green", west: "Hospitality village",
  }, "course"),
  venue("mcg", "Melbourne Cricket Ground", "Melbourne", "Australia", "Brunton Avenue, Richmond VIC 3002", 100024, 1853, {
    north: "Great Southern Stand", east: "Shane Warne Stand", south: "Ponsford Stand", west: "MCC Members",
  }, "pitch"),
];

const F1: [string, string] = ["#e10600", "#15151e"];
const TEN: [string, string] = ["#4a7c2b", "#c9a227"];
const MUS: [string, string] = ["#063246", "#c69f68"];

export const extraClubs: Club[] = [
  host("monaco", "Monaco Grand Prix", "Monaco", "MON", F1, "Monte Carlo", "Monaco", "circuit-de-monaco", { nickname: "The streets", founded: 1929, about: ["The Monaco Grand Prix is the jewel of the calendar — a harbour-side street circuit where hospitality suites look over the swimming pool and Rascasse."] }),
  host("british-gp", "British Grand Prix", "Silverstone", "GBR", ["#c8102e", "#012169"], "Silverstone", "United Kingdom", "silverstone", { nickname: "Home of British motorsport", founded: 1950, about: ["Silverstone is the home of the British Grand Prix, with the Wing and Village grandstands offering the classic F1 weekend."] }),
  host("italian-gp", "Italian Grand Prix", "Monza", "ITA", ["#009246", "#ce2b37"], "Monza", "Italy", "monza", { nickname: "The Temple of Speed", founded: 1922, about: ["Monza is the Temple of Speed. Hospitality on the main straight and Parabolica is the most reliable way to sit together."] }),
  host("belgian-gp", "Belgian Grand Prix", "Spa", "BEL", ["#000000", "#fdda24"], "Stavelot", "Belgium", "spa-francorchamps", { nickname: "Eau Rouge", founded: 1921, about: ["Spa-Francorchamps is the drivers' favourite — Eau Rouge, Raidillon and weather that can change twice in a lap."] }),
  host("abu-dhabi-gp", "Abu Dhabi Grand Prix", "Yas Marina", "UAE", ["#c8102e", "#15151e"], "Abu Dhabi", "United Arab Emirates", "yas-marina", { nickname: "Season finale", founded: 2009, about: ["Yas Marina hosts the season finale under lights, with marina-side suites and a twilight race start."] }),
  host("f1-grid", "Formula 1 field", "F1", "F1", F1, "Worldwide", "United Kingdom", "silverstone"),

  host("wimbledon", "Wimbledon", "Wimbledon", "WIM", TEN, "London", "United Kingdom", "all-england-club", { nickname: "The Championships", founded: 1877, about: ["The Championships at Wimbledon remain the most famous fortnight in tennis. Centre Court hospitality is allocated by the club."] }),
  host("roland-garros", "Roland-Garros", "Roland-Garros", "RG", ["#ce5825", "#3b2414"], "Paris", "France", "roland-garros", { founded: 1891, about: ["Clay-court tennis in the 16th arrondissement, with Philippe-Chatrier the centrepiece of the Parisian fortnight."] }),
  host("us-open", "US Open", "US Open", "USO", ["#002f6c", "#c41230"], "New York", "United States", "ustas-billie-jean-king", { founded: 1881, about: ["Flushing Meadows in late summer — Arthur Ashe Stadium and night sessions under the lights."] }),
  host("australian-open", "Australian Open", "Australian Open", "AO", ["#1b3a6b", "#7ac142"], "Melbourne", "Australia", "melbourne-park", { founded: 1905, about: ["The first Grand Slam of the year, played in Melbourne heat on Rod Laver Arena."] }),
  host("atp-finals", "ATP Finals", "ATP Finals", "ATP", ["#00285e", "#c5a572"], "Turin", "Italy", "pala-alpitour", { founded: 1970, about: ["The season-ending ATP Finals bring the top eight to Turin for a week of indoor tennis."] }),
  host("tennis-draw", "Championship draw", "Draw", "DRW", TEN, "Worldwide", "United Kingdom", "all-england-club"),

  host("wembley-live", "Wembley Stadium", "Wembley", "WEM", MUS, "London", "United Kingdom", "wembley-stadium", { about: ["Wembley hosts the biggest stadium tours in the UK, with pitch standing, tiered seating and hospitality boxes."] }),
  host("the-o2", "The O2", "The O2", "O2", MUS, "London", "United Kingdom", "the-o2", { about: ["The O2 is London's arena flagship — 20,000 seats, VIP lounges and floor standing for the biggest indoor tours."] }),
  host("glastonbury", "Glastonbury", "Glastonbury", "GLA", ["#2e5a1c", "#e2c36b"], "Pilton", "United Kingdom", "worthy-farm", { about: ["Worthy Farm in June — Pyramid Stage hospitality and guest camping are allocated by the festival."] }),
  host("sphere-vegas", "Sphere Las Vegas", "Sphere", "SPH", ["#6b21a8", "#111111"], "Las Vegas", "United States", "sphere-las-vegas", { about: ["A residency inside the Sphere is a once-a-season production with immersive seating and VIP suites."] }),
  host("drury-lane", "Theatre Royal Drury Lane", "Drury Lane", "DRU", MUS, "London", "United Kingdom", "theatre-royal-drury-lane", { about: ["Drury Lane is the grandest room in the West End, with royal-circle hospitality and stalls seating."] }),
  host("live-bill", "Live entertainment", "Live", "LVE", MUS, "Worldwide", "United Kingdom", "the-o2"),

  host("england-rugby", "England", "England", "ENG", ["#ffffff", "#d3200d"], "London", "United Kingdom", "twickenham", { nickname: "The Rose", founded: 1871, about: ["England at Twickenham is the centrepiece of the Six Nations — 82,000 supporters and hospitality on all four sides."] }),
  host("wales-rugby", "Wales", "Wales", "WAL", ["#ea1a1a", "#ffffff"], "Cardiff", "United Kingdom", "twickenham"),
  host("ireland-rugby", "Ireland", "Ireland", "IRE", ["#169b62", "#ff883e"], "Dublin", "Ireland", "aviva-stadium", { founded: 1879, about: ["Ireland at the Aviva is one of the loudest rooms in world rugby."] }),
  host("france-rugby", "France", "France", "FRA", ["#002395", "#ed2939"], "Paris", "France", "aviva-stadium"),
  host("saracens", "Saracens", "Saracens", "SAR", ["#000000", "#c5a572"], "London", "United Kingdom", "stonex-stadium", { founded: 1876, about: ["Saracens at StoneX Stadium — a compact, loud club ground with hospitality on the west side."] }),
  host("leicester-tigers", "Leicester Tigers", "Tigers", "LEI", ["#006630", "#cc2200"], "Leicester", "United Kingdom", "stonex-stadium"),
  host("leinster", "Leinster", "Leinster", "LEI", ["#003d7c", "#ffffff"], "Dublin", "Ireland", "aviva-rds", { founded: 1879, about: ["Leinster at the RDS is the heartbeat of Irish club rugby."] }),
  host("munster", "Munster", "Munster", "MUN", ["#cc0000", "#ffffff"], "Limerick", "Ireland", "aviva-rds"),
  host("northampton", "Northampton Saints", "Saints", "NOR", ["#009639", "#000000"], "Northampton", "United Kingdom", "franklins-gardens", { founded: 1880, about: ["Franklin's Gardens is one of the most atmospheric club grounds in England."] }),
  host("toulouse", "Stade Toulousain", "Toulouse", "TOU", ["#e30613", "#000000"], "Toulouse", "France", "franklins-gardens"),

  host("vegas-boxing", "World title boxing", "Boxing", "BOX", ["#111111", "#c9a227"], "Las Vegas", "United States", "t-mobile-arena", { about: ["A world-title fight night on the Strip — floor seats, suite hospitality and a late Vegas finish."] }),
  host("nfl-london", "NFL London", "NFL", "NFL", ["#013369", "#d50a0a"], "London", "United Kingdom", "wembley-stadium", { about: ["The NFL's London games at Wembley are a full American matchday in a British stadium."] }),
  host("ny-knicks", "New York Knicks", "Knicks", "NYK", ["#006bb6", "#f58426"], "New York", "United States", "madison-square-garden", { about: ["Madison Square Garden on a Knicks night is still the most famous indoor sporting room in the world."] }),
  host("the-open", "The Open", "The Open", "TO", ["#00205b", "#c5a572"], "Southport", "United Kingdom", "royal-birkdale", { about: ["The Open at Royal Birkdale — links golf, hospitality villages and the 18th green as theatre."] }),
  host("australia-cricket", "Australia", "Australia", "AUS", ["#ffcd00", "#00843d"], "Melbourne", "Australia", "mcg", { about: ["The MCG on Boxing Day is cricket's biggest stage, with 100,000 seats around the arena."] }),
  host("england-cricket", "England", "England", "ENG", ["#1c2c5b", "#c8102e"], "London", "United Kingdom", "mcg"),
  host("field", "The field", "Field", "FLD", ["#063246", "#c69f68"], "Worldwide", "United Kingdom", "wembley-stadium"),
];

export const extraCompetitions: (Competition & { sport: VerticalId })[] = [
  { ...series("formula-1-world-championship", "FIA Formula 1 World Championship", "Formula 1", "2026", "Worldwide", "international", "Lights out for the 2026 World Championship — official grandstands and paddock hospitality.", img.racing, [{ label: "Rounds", value: "24" }, { label: "Season", value: "Mar – Dec 2026" }, { label: "Finale", value: "Abu Dhabi, 6 Dec" }, { label: "Practice", value: "Fri – Sat" }], ["The 2026 Formula 1 season visits historic street circuits and purpose-built tracks. Hospitality is the most reliable way to sit together for Monaco, Silverstone and the finale."]), sport: "formula-1" },
  { ...series("grand-slams", "Grand Slam Championships", "Grand Slams", "2026/27", "Worldwide", "international", "The four championships that define the tennis year, plus premium courtside hospitality.", img.tennis, [{ label: "Majors", value: "4" }, { label: "Surface", value: "Grass, clay, hard" }, { label: "Season", value: "Jan – Sep" }, { label: "Centre courts", value: "Official allocation" }], ["Wimbledon, Roland-Garros, the US Open and the Australian Open remain the most requested tennis occasions we arrange."]), sport: "tennis" },
  { ...series("atp-finals-week", "ATP Finals", "ATP Finals", "2026", "Italy", "international", "The season-ending indoor championships in Turin.", img.tennis, [{ label: "Players", value: "8" }, { label: "City", value: "Turin" }, { label: "When", value: "Nov 2026" }, { label: "Venue", value: "Pala Alpitour" }], ["The ATP Finals bring the top eight to Turin for a week of indoor tennis and hospitality suites above the baseline."]), sport: "tennis" },
  { ...series("stadium-tours", "Stadium tours", "Stadium tours", "2026", "Worldwide", "international", "The biggest live acts in 90,000-seat rooms, with official VIP and hospitality.", img.concert, [{ label: "Capacity", value: "Up to 90,000" }, { label: "Season", value: "Summer 2026" }, { label: "Seating", value: "Pitch & tiers" }, { label: "VIP", value: "Official only" }], ["Stadium tours sell out in minutes. Official hospitality and VIP are the most reliable way to sit together."]), sport: "concerts" },
  { ...series("arenas-and-theatre", "Arenas, residencies & theatre", "Arenas & theatre", "2026", "Worldwide", "international", "Indoor tours, Las Vegas residencies and West End nights.", img.concert, [{ label: "Rooms", value: "Arena to theatre" }, { label: "Season", value: "Year round" }, { label: "VIP", value: "Official suites" }, { label: "Cities", value: "London & Las Vegas" }], ["From The O2 to Drury Lane and the Sphere — we source official VIP rather than the secondary market."]), sport: "concerts" },
  { ...series("six-nations", "Guinness Six Nations", "Six Nations", "2027", "Europe", "european", "The championship that fills Twickenham, Dublin and the rest of the old rugby nations.", img.rugby, [{ label: "Teams", value: "6" }, { label: "When", value: "Feb – Mar 2027" }, { label: "Venues", value: "Home stadiums" }, { label: "Format", value: "Round robin" }], ["The Six Nations remains the most requested rugby occasion we arrange. Home hospitality is allocated by the unions."]), sport: "rugby" },
  { ...series("club-rugby", "Club rugby", "Club rugby", "2026/27", "Europe", "domestic", "Premiership, URC and Champions Cup nights in the loudest club grounds.", img.rugby, [{ label: "Competitions", value: "3" }, { label: "Season", value: "2026/27" }, { label: "Kick-off", value: "Weekend" }, { label: "Hospitality", value: "Club allocated" }], ["Club rugby hospitality is often the best-value way to sit together — especially for European knockout nights."]), sport: "rugby" },
  { ...series("world-title-boxing", "World title boxing", "Boxing", "2026", "United States", "international", "A Las Vegas fight night with floor seats and suite hospitality.", img.boxing, [{ label: "City", value: "Las Vegas" }, { label: "Venue", value: "T-Mobile Arena" }, { label: "When", value: "Aug 2026" }, { label: "Seating", value: "Floor & suites" }], ["World-title fight weeks on the Strip sell in layers — floor seats first, then suites. We source the official allocation."]), sport: "more-sports" },
  { ...series("nfl-international", "NFL International Series", "NFL", "2026", "United Kingdom", "international", "NFL matchdays at Wembley — a full American occasion in London.", img.bowlDay, [{ label: "Venue", value: "Wembley" }, { label: "When", value: "Oct 2026" }, { label: "Kick-off", value: "Sunday" }, { label: "Hospitality", value: "Club & suites" }], ["The NFL's London games are among the most requested American-sport occasions we arrange from the UK."]), sport: "more-sports" },
  { ...series("nba-regular-season", "NBA", "NBA", "2026/27", "United States", "international", "A night at Madison Square Garden with the Knicks.", img.basketball, [{ label: "Venue", value: "MSG" }, { label: "When", value: "Nov 2026" }, { label: "Seating", value: "Lower bowl & suites" }, { label: "City", value: "New York" }], ["Madison Square Garden on a Knicks night is still the most famous indoor sporting room in the world."]), sport: "more-sports" },
  { ...series("the-open", "The Open", "The Open", "2026", "United Kingdom", "international", "Links golf at Royal Birkdale, with hospitality on the 18th.", img.golf, [{ label: "Course", value: "Royal Birkdale" }, { label: "When", value: "Jul 2026" }, { label: "Days", value: "Thu – Sun" }, { label: "Hospitality", value: "Village & 18th" }], ["The Open remains golf's original championship. Hospitality villages are the most reliable way to host a group."]), sport: "more-sports" },
  { ...series("the-ashes", "The Ashes", "The Ashes", "2026/27", "Australia", "international", "Boxing Day at the MCG — 100,000 seats around the arena.", img.cricket, [{ label: "Venue", value: "MCG" }, { label: "When", value: "26 Dec 2026" }, { label: "Format", value: "Test match" }, { label: "Capacity", value: "100,024" }], ["Boxing Day at the MCG is cricket's biggest stage. Official hospitality sits in the Members and Great Southern Stand."]), sport: "more-sports" },
];

export const extraFixtures: (Fixture & { sport: VerticalId })[] = [
  { ...fx("formula-1-world-championship", "monaco", "f1-grid", "2026-06-07 15:00", "+02:00", 890, { was: 1290, highlight: "Harbour views", headline: "Monaco Grand Prix", stage: "Race day", about: "Sunday in Monaco — the swimming-pool complex, Rascasse and harbour-side suites. Practice and qualifying packages are listed alongside race day." }), sport: "formula-1" },
  { ...fx("formula-1-world-championship", "british-gp", "f1-grid", "2026-07-05 15:00", "+01:00", 420, { was: 590, headline: "British Grand Prix", stage: "Race day", highlight: "Home Grand Prix", about: "Silverstone on the first Sunday in July. The Wing, Village and Stowe grandstands are allocated by the circuit." }), sport: "formula-1" },
  { ...fx("formula-1-world-championship", "belgian-gp", "f1-grid", "2026-07-26 15:00", "+02:00", 395, { headline: "Belgian Grand Prix", stage: "Race day", about: "Spa-Francorchamps in late July — Eau Rouge, Raidillon and weather that can change twice in a lap." }), sport: "formula-1" },
  { ...fx("formula-1-world-championship", "italian-gp", "f1-grid", "2026-09-06 15:00", "+02:00", 455, { headline: "Italian Grand Prix", stage: "Race day", highlight: "Temple of Speed", about: "Monza is the Temple of Speed. Main-straight hospitality is the most reliable way to sit together." }), sport: "formula-1" },
  { ...fx("formula-1-world-championship", "abu-dhabi-gp", "f1-grid", "2026-12-06 17:00", "+04:00", 720, { was: 980, headline: "Abu Dhabi Grand Prix", stage: "Season finale", highlight: "Under lights", about: "The season finale under lights at Yas Marina, with marina-side suites and a twilight race start.", status: "limited" }), sport: "formula-1" },

  { ...fx("grand-slams", "roland-garros", "tennis-draw", "2026-06-07 15:00", "+02:00", 640, { headline: "Roland-Garros finals weekend", stage: "Finals weekend", about: "Philippe-Chatrier on finals weekend. Clay, late Paris light and official suite hospitality above the baseline." }), sport: "tennis" },
  { ...fx("grand-slams", "wimbledon", "tennis-draw", "2026-07-12 14:00", "+01:00", 1250, { was: 1890, headline: "Wimbledon finals weekend", stage: "Gentlemen's final", highlight: "Centre Court", about: "Centre Court on finals Sunday remains the most requested tennis occasion we arrange. Hospitality is allocated by the All England Club." }), sport: "tennis" },
  { ...fx("grand-slams", "us-open", "tennis-draw", "2026-09-13 16:00", "-04:00", 780, { headline: "US Open finals weekend", stage: "Finals weekend", about: "Arthur Ashe Stadium for the US Open final — night-session atmosphere in Flushing Meadows." }), sport: "tennis" },
  { ...fx("atp-finals-week", "atp-finals", "tennis-draw", "2026-11-22 15:00", "+01:00", 310, { headline: "ATP Finals — finals day", stage: "Final", about: "The season-ending indoor final at the Pala Alpitour in Turin." }), sport: "tennis" },
  { ...fx("grand-slams", "australian-open", "tennis-draw", "2027-01-31 19:30", "+11:00", 540, { headline: "Australian Open finals weekend", stage: "Finals weekend", about: "Rod Laver Arena at the Australian Open — the first Grand Slam final of 2027.", status: "coming-soon" }), sport: "tennis" },

  { ...fx("stadium-tours", "wembley-live", "live-bill", "2026-06-20 19:30", "+01:00", 199, { was: 275, headline: "Wembley Stadium tour", stage: "Stadium show", highlight: "Pitch standing", about: "A full stadium production at Wembley, with pitch standing, tiered seating and official VIP boxes." }), sport: "concerts" },
  { ...fx("arenas-and-theatre", "the-o2", "live-bill", "2026-09-18 19:30", "+01:00", 145, { headline: "The O2 arena show", stage: "Arena show", about: "An official arena night at The O2 — floor standing, bowl seating and lounge hospitality." }), sport: "concerts" },
  { ...fx("stadium-tours", "glastonbury", "live-bill", "2026-06-27 16:00", "+01:00", 380, { headline: "Glastonbury Festival", stage: "Pyramid Stage", highlight: "Weekend hospitality", about: "Worthy Farm in late June. Guest hospitality and viewing platforms are allocated by the festival.", status: "limited" }), sport: "concerts" },
  { ...fx("arenas-and-theatre", "sphere-vegas", "live-bill", "2026-10-10 20:30", "-07:00", 490, { was: 640, headline: "Las Vegas residency", stage: "Residency", about: "A Sphere residency in Las Vegas — immersive seating and VIP suites for a once-a-season production." }), sport: "concerts" },
  { ...fx("arenas-and-theatre", "drury-lane", "live-bill", "2026-12-05 19:30", "+00:00", 165, { headline: "West End at Drury Lane", stage: "Evening performance", about: "Theatre Royal Drury Lane — stalls, royal circle and hospitality before an evening performance." }), sport: "concerts" },

  { ...fx("six-nations", "england-rugby", "wales-rugby", "2027-03-06 16:45", "+00:00", 295, { was: 420, format: "match", stage: "Round 4", highlight: "Twickenham Saturday", about: "England welcome Wales to Twickenham in the 2027 Six Nations. Home hospitality is allocated by the RFU." }), sport: "rugby" },
  { ...fx("six-nations", "ireland-rugby", "france-rugby", "2027-03-13 14:15", "+00:00", 265, { format: "match", stage: "Round 5", about: "Ireland against France at the Aviva — one of the loudest rooms in world rugby." }), sport: "rugby" },
  { ...fx("club-rugby", "saracens", "leicester-tigers", "2026-10-24 15:00", "+01:00", 85, { format: "match", about: "Saracens against Leicester Tigers at StoneX Stadium — a compact, loud Premiership Saturday." }), sport: "rugby" },
  { ...fx("club-rugby", "leinster", "munster", "2026-12-26 17:30", "+00:00", 95, { format: "match", highlight: "Interpro derby", about: "Leinster against Munster at the RDS on Boxing Day — the interpro that always sells." }), sport: "rugby" },
  { ...fx("club-rugby", "northampton", "toulouse", "2027-04-10 17:30", "+01:00", 120, { format: "match", stage: "Champions Cup", about: "Northampton Saints against Toulouse at Franklin's Gardens in the Champions Cup knockout rounds.", status: "limited" }), sport: "rugby" },

  { ...fx("world-title-boxing", "vegas-boxing", "field", "2026-08-15 20:00", "-07:00", 650, { was: 890, headline: "World title fight — Las Vegas", stage: "Championship night", highlight: "Floor seats", about: "A world-title fight night at T-Mobile Arena — floor seats, suite hospitality and a late Vegas finish." }), sport: "more-sports" },
  { ...fx("nfl-international", "nfl-london", "field", "2026-10-25 14:30", "+00:00", 275, { was: 360, headline: "NFL London at Wembley", stage: "Regular season", highlight: "Wembley Sunday", about: "The NFL's London game at Wembley — a full American matchday in a British stadium, with club-level hospitality." }), sport: "more-sports" },
  { ...fx("nba-regular-season", "ny-knicks", "field", "2026-11-19 19:30", "-05:00", 420, { headline: "New York Knicks at MSG", stage: "Regular season", about: "Madison Square Garden on a Knicks night — lower-bowl seating and suite hospitality above the floor." }), sport: "more-sports" },
  { ...fx("the-open", "the-open", "field", "2026-07-19 08:00", "+01:00", 540, { headline: "The Open — final round", stage: "Sunday", about: "Final round at Royal Birkdale. Hospitality villages and 18th-green viewing are allocated by The R&A." }), sport: "more-sports" },
  { ...fx("the-ashes", "australia-cricket", "england-cricket", "2026-12-26 10:30", "+11:00", 310, { format: "match", stage: "Boxing Day Test", highlight: "MCG Boxing Day", about: "Australia against England at the MCG on Boxing Day — 100,000 seats around the arena and official MCC hospitality." }), sport: "more-sports" },
];
