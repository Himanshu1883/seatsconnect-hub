import type { Availability, Fixture } from "../types";

const ukClubs = new Set(["England", "Scotland", "Wales"]);

function zoned(local: string, country: string) {
  const [day] = local.split(" ");
  const summer = day < "2026-10-25" || day >= "2027-03-28";
  const base = ukClubs.has(country) ? 0 : 1;
  const offset = base + (summer ? 1 : 0);
  return `${local.replace(" ", "T")}:00+0${offset}:00`;
}

type Options = {
  was?: number;
  status?: Availability;
  confirmed?: boolean;
  stage?: string;
  highlight?: string;
  about?: string;
  awayFans?: boolean;
  heroImage?: string;
};

function fx(
  competition: string,
  home: string,
  away: string,
  local: string,
  fromPrice: number,
  options: Options = {},
  country = "England",
): Fixture {
  return {
    slug: `${home}-vs-${away}`,
    competition,
    home,
    away,
    kickoff: zoned(local, country),
    dateConfirmed: options.confirmed ?? true,
    fromPrice,
    wasPrice: options.was,
    availability: options.status ?? "available",
    stage: options.stage,
    highlight: options.highlight,
    about: options.about,
    rules: options.awayFans ? [] : ["No away fans allowed"],
    heroImage: options.heroImage,
  };
}

const pl = (home: string, away: string, local: string, from: number, options?: Options) =>
  fx("premier-league", home, away, local, from, options);

export const fixtures: Fixture[] = [
  pl("everton", "chelsea", "2026-10-17 12:30", 165, { status: "sold-out" }),
  pl("manchester-city", "ipswich-town", "2026-10-17 15:00", 52, {
    was: 129,
    highlight: "Great VIP options",
    about:
      "Manchester City welcome Ipswich Town to the Etihad Stadium. The Tractor Boys, as the club from Suffolk are known, are back at the top level and will rely mainly on effort and organisation against one of England's strongest sides.",
    heroImage: "/matches/manchester-city-vs-ipswich-town.jpg",
  }),
  pl("fulham", "hull-city", "2026-10-17 15:00", 95, { status: "sold-out" }),
  pl("bournemouth", "sunderland", "2026-10-18 14:00", 120, { status: "coming-soon" }),
  pl("tottenham-hotspur", "coventry-city", "2026-10-19 20:00", 199, {
    status: "limited",
    highlight: "Fantastic atmosphere",
    about:
      "Monday Night Football in N17. Newly promoted Coventry City make the short trip to the Tottenham Hotspur Stadium for one of the most atmospheric nights of the autumn — with Spurs' famous single-tier South Stand in full voice under the lights.",
  }),
  pl("aston-villa", "manchester-city", "2026-10-24 12:30", 179, { status: "limited" }),
  pl("arsenal", "everton", "2026-10-24 15:00", 509, { highlight: "Unforgettable experience" }),
  pl("chelsea", "tottenham-hotspur", "2026-10-24 17:30", 689, {
    highlight: "London derby",
    heroImage: "/matches/chelsea-vs-tottenham-hotspur.jpg",
  }),
  pl("manchester-united", "bournemouth", "2026-10-25 14:00", 189, { highlight: "A must-visit stadium" }),
  pl("crystal-palace", "newcastle-united", "2026-10-25 14:00", 139, { status: "coming-soon" }),
  pl("liverpool", "brighton", "2026-10-25 14:00", 349),
  pl("aston-villa", "fulham", "2026-10-31 20:00", 129),
  pl("brentford", "nottingham-forest", "2026-10-31 15:00", 279),
  pl("chelsea", "manchester-united", "2026-10-31 12:30", 509, { highlight: "Big six clash" }),
  pl("tottenham-hotspur", "crystal-palace", "2026-10-31 17:30", 155),
  pl("liverpool", "arsenal", "2026-11-01 16:30", 525, {
    highlight: "Title six-pointer",
    confirmed: false,
    heroImage: "/matches/liverpool-vs-arsenal.jpg",
  }),
  pl("arsenal", "hull-city", "2026-11-07 15:00", 509),
  pl("fulham", "newcastle-united", "2026-11-07 15:00", 179),
  pl("leeds-united", "tottenham-hotspur", "2026-11-07 12:30", 435, { status: "limited" }),
  pl("manchester-united", "aston-villa", "2026-11-08 16:30", 189),
  pl("crystal-palace", "liverpool", "2026-11-08 14:00", 265),
  pl("aston-villa", "sunderland", "2026-11-21 15:00", 89, { confirmed: false }),
  pl("chelsea", "leeds-united", "2026-11-21 15:00", 305, { confirmed: false }),
  pl("tottenham-hotspur", "ipswich-town", "2026-11-21 15:00", 95, { confirmed: false }),
  pl("liverpool", "manchester-united", "2026-11-22 16:30", 755, { status: "limited", highlight: "North-west derby", confirmed: false }),
  pl("brentford", "everton", "2026-11-23 20:00", 279, { confirmed: false }),
  pl("manchester-united", "brentford", "2026-11-28 15:00", 189, { confirmed: false }),
  pl("manchester-city", "liverpool", "2026-11-28 17:30", 295, { status: "limited", highlight: "Title six-pointer", confirmed: false }),
  pl("manchester-united", "coventry-city", "2026-12-05 15:00", 159, { confirmed: false }),
  pl("arsenal", "tottenham-hotspur", "2026-12-12 17:30", 845, { status: "coming-soon", highlight: "North London derby", confirmed: false }),
  pl("manchester-city", "manchester-united", "2026-12-19 12:30", 375, { status: "coming-soon", highlight: "Manchester derby", confirmed: false }),
  pl("manchester-united", "newcastle-united", "2026-12-30 19:30", 189, { confirmed: false }),
  pl("tottenham-hotspur", "arsenal", "2027-01-16 17:30", 595, { status: "coming-soon", highlight: "North London derby", confirmed: false }),
  pl("manchester-united", "leeds-united", "2027-05-15 15:00", 219, { highlight: "Roses rivalry", confirmed: false }),
  pl("manchester-united", "fulham", "2027-05-30 16:00", 189, { highlight: "Final day", confirmed: false }),

  fx("champions-league", "manchester-city", "aek-athens", "2026-10-20 20:00", 59, { stage: "League phase", awayFans: true }),
  fx("champions-league", "liverpool", "villarreal", "2026-10-20 20:00", 169, { stage: "League phase", awayFans: true }),
  fx("champions-league", "napoli", "bodo-glimt", "2026-10-20 21:00", 69, { stage: "League phase", awayFans: true }, "Italy"),
  fx("champions-league", "bayern-munich", "arsenal", "2026-10-21 21:00", 605, {
    stage: "League phase",
    status: "limited",
    awayFans: true,
    heroImage: "/matches/bayern-munich-vs-arsenal.jpg",
  }, "Germany"),
  fx("champions-league", "aston-villa", "viking-fk", "2026-10-21 20:00", 115, {
    stage: "League phase",
    awayFans: true,
    heroImage: "/matches/aston-villa-vs-viking-fk.jpg",
  }),
  fx("champions-league", "manchester-united", "as-roma", "2026-11-03 20:00", 259, { stage: "League phase", awayFans: true }),
  fx("champions-league", "manchester-united", "rb-leipzig", "2026-12-08 20:00", 179, { stage: "League phase", awayFans: true }),
  fx("champions-league", "tottenham-hotspur", "real-madrid", "2026-11-25 20:00", 495, {
    stage: "League phase",
    status: "coming-soon",
    awayFans: true,
    heroImage: "/matches/tottenham-hotspur-vs-real-madrid.jpg",
  }),

  fx("europa-league", "celtic", "celta-vigo", "2026-10-22 20:00", 79, { stage: "League phase", awayFans: true }, "Scotland"),

  fx("serie-a", "bologna", "inter", "2026-10-17 18:00", 85, { heroImage: "/matches/bologna-vs-inter.jpg" }, "Italy"),
  fx("serie-a", "juventus", "lazio", "2026-10-18 20:45", 32, { heroImage: "/matches/juventus-vs-lazio.jpg" }, "Italy"),
  fx("serie-a", "monza", "cagliari", "2026-10-19 18:30", 85, {}, "Italy"),
  fx("bundesliga", "bayer-leverkusen", "freiburg", "2026-10-18 15:30", 60, { heroImage: "/matches/bayer-leverkusen-vs-freiburg.jpg" }, "Germany"),
  fx("bundesliga", "borussia-monchengladbach", "hoffenheim", "2026-10-18 17:30", 48, {
    heroImage: "/matches/borussia-monchengladbach-vs-hoffenheim.jpg",
  }, "Germany"),
  fx("ligue-1", "olympique-lyonnais", "ogc-nice", "2026-10-18 20:45", 22, { was: 45 }, "France"),
  fx("la-liga", "real-madrid", "getafe", "2026-10-18 21:00", 149, { heroImage: "/matches/real-madrid-vs-getafe.jpg" }, "Spain"),
  fx("la-liga", "atletico-madrid", "sevilla", "2026-10-24 18:30", 95, { heroImage: "/matches/atletico-madrid-vs-sevilla.jpg" }, "Spain"),
  fx("la-liga", "fc-barcelona", "real-betis", "2026-10-25 16:15", 129, {
    highlight: "Camp Nou is back",
    heroImage: "/matches/fc-barcelona-vs-real-betis.jpg",
  }, "Spain"),

  fx("championship", "southampton", "bolton-wanderers", "2026-10-17 15:00", 22, { was: 55 }),
  fx("championship", "queens-park-rangers", "swansea-city", "2026-10-24 15:00", 55, { status: "limited" }),
  fx("championship", "west-ham-united", "southampton", "2026-10-24 15:00", 42),
];
