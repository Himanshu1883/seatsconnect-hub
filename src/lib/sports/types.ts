export type Availability = "available" | "limited" | "sold-out" | "coming-soon";

export type StandId = "north" | "east" | "south" | "west" | "nw" | "ne" | "se" | "sw";

export type Region = "domestic" | "european" | "international";

export type Media = {
  src: string;
  alt: string;
  kind: "stadium" | "lounge" | "dining" | "view" | "city";
};

export type Faq = { q: string; a: string };

export type FaqGroup = { label: string; items: Faq[] };

export type TravelTip = {
  mode: "train" | "car" | "bus" | "air" | "walk";
  title: string;
  text: string;
};

export type VenueMapLayout = "pitch" | "circuit" | "court" | "bowl" | "course";

export type Venue = {
  slug: string;
  name: string;
  city: string;
  country: string;
  address: string;
  capacity: number;
  opened: number;
  image: string;
  /** Drives the seating diagram in package explorer (football = pitch). */
  mapLayout?: VenueMapLayout;
  stands: Record<"north" | "east" | "south" | "west", string>;
  travel: TravelTip[];
  hotels: { name: string; distance: string }[];
  guide: { label: string; value: string }[];
};

export type Club = {
  slug: string;
  name: string;
  short: string;
  code: string;
  colors: [string, string];
  city: string;
  country: string;
  venue?: string;
  founded?: number;
  nickname?: string;
  honours?: string[];
  rivals?: string[];
  legends?: string[];
  about?: string[];
  highlights?: string[];
};

export type Competition = {
  slug: string;
  name: string;
  short: string;
  season: string;
  country: string;
  region: Region;
  tagline: string;
  about: string[];
  image: string;
  facts: { label: string; value: string }[];
  faqs: Faq[];
};

export type FeatureKey =
  | "padded"
  | "lounge"
  | "dining"
  | "drinks"
  | "programme"
  | "halfway"
  | "post"
  | "gift"
  | "transport"
  | "host";

export type PackageTier = "ticket" | "hospitality" | "premium" | "box";

export type ItineraryStep = { offset: number; title: string; detail?: string };

export type Package = {
  id: string;
  name: string;
  tier: PackageTier;
  level: 1 | 2 | 3 | 4 | 5;
  stand: StandId;
  location: string;
  summary: string;
  description: string;
  media: Media[];
  seating: string[];
  hospitality: string[];
  extras: string[];
  details: { label: string; value: string }[];
  features: FeatureKey[];
  itinerary: ItineraryStep[];
  basePrice: number;
  badge?: string;
};

export type EventFormat = "match" | "event";

export type Fixture = {
  slug: string;
  competition: string;
  home: string;
  away: string;
  kickoff: string;
  dateConfirmed: boolean;
  fromPrice: number;
  wasPrice?: number;
  availability: Availability;
  stage?: string;
  highlight?: string;
  about?: string;
  rules: string[];
  format?: EventFormat;
  headline?: string;
  heroImage?: string;
};

export type PricedPackage = Package & {
  price: number;
  wasPrice?: number;
  remaining?: number;
  soldOut: boolean;
};

export type FixtureView = Fixture & {
  homeClub: Club;
  awayClub: Club;
  venue: Venue;
  competitionInfo: Competition;
  title: string;
  href: string;
  timeZone: string;
  format: EventFormat;
};
