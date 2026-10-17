import { clubs } from "./data/clubs";
import { competitions } from "./data/competitions";
import { fixtures } from "./data/fixtures";
import { packagesForVenue } from "./data/packages";
import { venues } from "./data/venues";
import type { Club, Competition, FaqGroup, Fixture, FixtureView, PricedPackage, Venue } from "./types";

// Static demo catalogue. Each getter is async so it can be swapped for a real API call without
// changing any page code.

const timeZones: Record<string, string> = {
  England: "Europe/London",
  Scotland: "Europe/London",
  Wales: "Europe/London",
  Italy: "Europe/Rome",
  Germany: "Europe/Berlin",
  France: "Europe/Paris",
  Spain: "Europe/Madrid",
};

const clubMap = new Map(clubs.map((club) => [club.slug, club]));
const venueMap = new Map(venues.map((venue) => [venue.slug, venue]));
const competitionMap = new Map(competitions.map((competition) => [competition.slug, competition]));

function hash(value: string) {
  let h = 0;
  for (const char of value) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

function toView(fixture: Fixture): FixtureView {
  const homeClub = clubMap.get(fixture.home)!;
  const awayClub = clubMap.get(fixture.away)!;
  return {
    ...fixture,
    homeClub,
    awayClub,
    venue: venueMap.get(homeClub.venue ?? "")!,
    competitionInfo: competitionMap.get(fixture.competition)!,
    title: fixture.headline ?? `${homeClub.name} vs ${awayClub.name}`,
    href: `/football/${fixture.competition}/${fixture.slug}`,
    timeZone: timeZones[homeClub.country] ?? "Europe/London",
    format: fixture.format ?? "match",
  };
}

const byKickoff = (a: Fixture, b: Fixture) => a.kickoff.localeCompare(b.kickoff);
const allViews = () => [...fixtures].sort(byKickoff).map(toView);

export async function getCompetitions(): Promise<Competition[]> {
  return competitions;
}

export async function getCompetition(slug: string): Promise<Competition | null> {
  return competitionMap.get(slug) ?? null;
}

export async function getClub(slug: string): Promise<Club | null> {
  return clubMap.get(slug) ?? null;
}

export async function getVenue(slug: string): Promise<Venue | null> {
  return venueMap.get(slug) ?? null;
}

export async function getHostClubs(): Promise<(Club & { venueInfo: Venue; next?: FixtureView; count: number })[]> {
  const views = allViews();
  return clubs
    .filter((club) => club.venue && views.some((view) => view.home === club.slug))
    .map((club) => {
      const own = views.filter((view) => view.home === club.slug);
      return { ...club, venueInfo: venueMap.get(club.venue!)!, next: own[0], count: own.length };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function listFixtures(filter: { competition?: string; club?: string } = {}): Promise<FixtureView[]> {
  return allViews().filter(
    (view) =>
      (!filter.competition || view.competition === filter.competition) &&
      (!filter.club || view.home === filter.club || view.away === filter.club),
  );
}

export async function getFixture(competition: string, slug: string): Promise<FixtureView | null> {
  const fixture = fixtures.find((item) => item.competition === competition && item.slug === slug);
  return fixture ? toView(fixture) : null;
}

export async function getPackages(fixture: FixtureView): Promise<PricedPackage[]> {
  const base = packagesForVenue(fixture.venue);
  const floor = Math.min(...base.map((item) => item.basePrice));
  const factor = fixture.fromPrice / floor;
  const discount = fixture.wasPrice ? fixture.wasPrice / fixture.fromPrice : undefined;

  return base
    .map((item, index) => {
      const price = Math.round(item.basePrice * factor);
      const seed = hash(`${fixture.slug}:${item.id}`);
      const soldOut =
        fixture.availability === "sold-out" ||
        (fixture.availability !== "coming-soon" && index > 0 && seed % 9 === 0);
      const scarce = fixture.availability === "limited" ? seed % 2 === 0 : seed % 4 === 0;
      return {
        ...item,
        price,
        wasPrice: discount ? Math.round(price * discount) : undefined,
        remaining: !soldOut && scarce ? 2 + (seed % 7) : undefined,
        soldOut,
      };
    })
    .sort((a, b) => a.price - b.price);
}

export async function getOtherDates(fixture: FixtureView): Promise<FixtureView[]> {
  return allViews().filter((view) => view.home === fixture.home);
}

export async function getRelated(fixture: FixtureView, limit = 4): Promise<FixtureView[]> {
  const views = allViews().filter((view) => view.slug !== fixture.slug && view.availability !== "sold-out");
  const sameClub = views.filter((view) => view.home === fixture.home || view.away === fixture.home);
  const sameCompetition = views.filter((view) => view.competition === fixture.competition && !sameClub.includes(view));
  return [...sameClub, ...sameCompetition].slice(0, limit);
}

export async function getMatchFaqs(fixture: FixtureView): Promise<FaqGroup[]> {
  return faqsFor(fixture.homeClub, fixture.venue);
}

export async function getClubFaqs(club: Club): Promise<FaqGroup[]> {
  const venue = venueMap.get(club.venue ?? "");
  return venue ? faqsFor(club, venue) : [];
}

function faqsFor(homeClub: Club, venue: Venue): FaqGroup[] {
  const airport = venue.travel.find((tip) => tip.mode === "air");
  const train = venue.travel.find((tip) => tip.mode === "train");
  return [
    {
      label: "Tickets",
      items: [
        { q: "Can I pick my seat number?", a: "Seats are allocated by the club within the block or area described in your package. Seats are always guaranteed together when you book two or more." },
        { q: "Do you only offer tickets for the home sections?", a: `Yes. ${homeClub.name} hospitality is located in home areas, and away colours are not permitted.` },
        { q: "When will my tickets arrive?", a: "Mobile tickets are delivered 2–5 days before the event, via the official club app or email." },
        { q: "How many tickets can I buy?", a: "There is no fixed limit for hospitality. For groups of 10 or more, a specialist will help arrange a private table or box." },
      ],
    },
    {
      label: "Hospitality",
      items: [
        { q: `What is the dress code for ${homeClub.name} hospitality?`, a: "Smart casual in most lounges; premium suites and boxes ask for smart dress — no sportswear. Away team colours are not permitted." },
        { q: "Are children allowed?", a: "Families and children are welcome in most hospitality areas. Under-16s must be accompanied by an adult." },
        { q: "How much is the Uber voucher worth?", a: "Packages that include an Uber voucher come with £20 per booking, delivered by email the week of the match." },
        { q: "Does hospitality include parking?", a: "Parking is not included unless stated. Your specialist can arrange it on request for executive boxes." },
      ],
    },
    {
      label: "Travel",
      items: [
        ...(airport ? [{ q: `Which airport is best for travelling to ${venue.name}?`, a: airport.text }] : []),
        ...(train ? [{ q: `What is the nearest station to ${venue.name}?`, a: train.text }] : []),
        { q: "Can you arrange hotels?", a: `Yes — we can add a hotel near ${venue.name} or in ${venue.city} city centre to any package.` },
      ],
    },
    {
      label: "Venue",
      items: [
        { q: `Where is ${venue.name}?`, a: `${venue.address}, ${venue.country}.` },
        { q: `What is the capacity of ${venue.name}?`, a: `${venue.name} holds approximately ${venue.capacity.toLocaleString("en-GB")} spectators and opened in ${venue.opened}.` },
        ...venue.guide.map((item) => ({ q: `${item.label} at ${venue.name}`, a: item.value })),
      ],
    },
  ];
}
