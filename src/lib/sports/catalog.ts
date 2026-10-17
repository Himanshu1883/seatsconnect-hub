import { packagesForVenue } from "./data/packages";
import { extraClubs, extraCompetitions, extraFixtures, extraVenues } from "./data/extra";
import type { Club, Competition, FaqGroup, FixtureView, PricedPackage, Venue } from "./types";
import { getVertical, type Vertical, type VerticalId } from "./verticals";

const timeZones: Record<string, string> = {
  Monaco: "Europe/Paris",
  "United Kingdom": "Europe/London",
  Italy: "Europe/Rome",
  Belgium: "Europe/Brussels",
  "United Arab Emirates": "Asia/Dubai",
  France: "Europe/Paris",
  Ireland: "Europe/Dublin",
  Australia: "Australia/Melbourne",
};

const cityZones: Record<string, string> = {
  "Las Vegas": "America/Los_Angeles",
  "New York": "America/New_York",
};

const clubMap = new Map(extraClubs.map((club) => [club.slug, club]));
const venueMap = new Map(extraVenues.map((venue) => [venue.slug, venue]));
const competitionMap = new Map(extraCompetitions.map((item) => [item.slug, item]));

function hash(value: string) {
  let h = 0;
  for (const char of value) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

function toView(vertical: Vertical, fixture: (typeof extraFixtures)[number]): FixtureView {
  const homeClub = clubMap.get(fixture.home)!;
  const awayClub = clubMap.get(fixture.away)!;
  const venue = venueMap.get(homeClub.venue ?? "")!;
  const competitionInfo = competitionMap.get(fixture.competition)!;
  return {
    ...fixture,
    homeClub,
    awayClub,
    venue,
    competitionInfo,
    title: fixture.headline ?? `${homeClub.name} vs ${awayClub.name}`,
    href: `${vertical.path}/${fixture.competition}/${fixture.slug}`,
    timeZone: cityZones[venue.city] ?? timeZones[homeClub.country] ?? timeZones[venue.country] ?? "Europe/London",
    format: fixture.format ?? "event",
  };
}

function allViews(id: VerticalId): FixtureView[] {
  const vertical = getVertical(id)!;
  return extraFixtures
    .filter((fixture) => fixture.sport === id)
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
    .map((fixture) => toView(vertical, fixture));
}

export async function listVerticalFixtures(
  id: VerticalId,
  filter: { competition?: string; club?: string } = {},
): Promise<FixtureView[]> {
  return allViews(id).filter(
    (view) =>
      (!filter.competition || view.competition === filter.competition) &&
      (!filter.club || view.home === filter.club || view.away === filter.club),
  );
}

export async function getVerticalCompetitions(id: VerticalId): Promise<(Competition & { sport: VerticalId })[]> {
  return extraCompetitions.filter((item) => item.sport === id);
}

export async function getVerticalCompetition(id: VerticalId, slug: string) {
  const item = competitionMap.get(slug);
  return item && item.sport === id ? item : null;
}

export async function getVerticalFixture(id: VerticalId, competition: string, slug: string): Promise<FixtureView | null> {
  const fixture = extraFixtures.find((item) => item.sport === id && item.competition === competition && item.slug === slug);
  const vertical = getVertical(id);
  return fixture && vertical ? toView(vertical, fixture) : null;
}

export async function getVerticalHosts(id: VerticalId): Promise<(Club & { venueInfo: Venue; next?: FixtureView; count: number })[]> {
  const views = allViews(id);
  return extraClubs
    .filter((club) => club.venue && views.some((view) => view.home === club.slug))
    .map((club) => {
      const own = views.filter((view) => view.home === club.slug);
      return { ...club, venueInfo: venueMap.get(club.venue!)!, next: own[0], count: own.length };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getVerticalHost(id: VerticalId, slug: string) {
  const hosts = await getVerticalHosts(id);
  return hosts.find((host) => host.slug === slug) ?? null;
}

export async function getVerticalPackages(fixture: FixtureView): Promise<PricedPackage[]> {
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

export async function getVerticalOtherDates(id: VerticalId, fixture: FixtureView): Promise<FixtureView[]> {
  return allViews(id).filter((view) => view.home === fixture.home);
}

export async function getVerticalRelated(id: VerticalId, fixture: FixtureView, limit = 4): Promise<FixtureView[]> {
  const views = allViews(id).filter((view) => view.slug !== fixture.slug && view.availability !== "sold-out");
  const sameHost = views.filter((view) => view.home === fixture.home || view.away === fixture.home);
  const sameCompetition = views.filter((view) => view.competition === fixture.competition && !sameHost.includes(view));
  return [...sameHost, ...sameCompetition].slice(0, limit);
}

export async function getVerticalFaqs(fixture: FixtureView): Promise<FaqGroup[]> {
  const { homeClub, venue, competitionInfo } = fixture;
  return [
    {
      label: "Tickets",
      items: [
        { q: "Can I pick my seat number?", a: "Seats are allocated by the organiser within the block or area described in your package. Seats are always guaranteed together when you book two or more." },
        { q: "When will my tickets arrive?", a: "Mobile tickets are delivered 2–5 days before the event, via the official app or email." },
        { q: "How many tickets can I buy?", a: "There is no fixed limit for hospitality. For groups of 10 or more, a specialist will help arrange a private table or box." },
      ],
    },
    {
      label: "Hospitality",
      items: [
        { q: `What is the dress code for ${competitionInfo.short} hospitality?`, a: "Smart casual in most lounges; premium suites and boxes ask for smart dress. Event branding is welcome unless the organiser states otherwise." },
        { q: "Are children allowed?", a: "Families and children are welcome in most hospitality areas. Under-16s must be accompanied by an adult." },
      ],
    },
    {
      label: "Travel",
      items: [
        { q: `Where is ${venue.name}?`, a: `${venue.address}, ${venue.country}.` },
        { q: "Can you arrange hotels?", a: `Yes — we can add a hotel near ${venue.name} or in ${venue.city} to any package.` },
      ],
    },
    {
      label: "Venue",
      items: [
        { q: `What is the capacity of ${venue.name}?`, a: `${venue.name} holds approximately ${venue.capacity.toLocaleString("en-GB")} guests and opened in ${venue.opened}.` },
        ...venue.guide.map((item) => ({ q: `${item.label} at ${venue.name}`, a: item.value })),
        { q: `Tell me about ${homeClub.name}.`, a: homeClub.about?.[0] ?? `${homeClub.name} hosts official ${competitionInfo.short} hospitality at ${venue.name}.` },
      ],
    },
  ];
}

export function hostHref(vertical: Vertical, slug: string) {
  return `${vertical.path}/${vertical.hostKey}/${slug}`;
}
