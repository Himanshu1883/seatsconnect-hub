import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail, MessageCircle, Phone, Trophy } from "lucide-react";
import { getClub, getClubFaqs, getHostClubs, getPackages, getVenue, listFixtures } from "@/lib/sports/api";
import { money } from "@/lib/sports/format";
import { Icon3D } from "@/components/experience/icons-3d";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { Breadcrumbs, ClubBadge, RatingBadge, SectionTitle, SportShell, TrustStrip } from "@/components/sports/primitives";
import { FaqTabs } from "@/components/sports/faq-tabs";
import { FixtureExplorer } from "@/components/sports/fixture-explorer";
import { PackageGuide } from "@/components/sports/package-guide";
import { VenueSection } from "@/components/sports/venue-section";

export async function generateStaticParams() {
  const clubs = await getHostClubs();
  return clubs.map((club) => ({ club: club.slug }));
}

export async function generateMetadata({ params }: PageProps<"/football/clubs/[club]">): Promise<Metadata> {
  const { club } = await params;
  const info = await getClub(club);
  if (!info) return {};
  return {
    title: `${info.name} Tickets 2026/27 | ${info.name} Hospitality & VIP Tickets | SeatsConnect`,
    description: `Official ${info.name} tickets and hospitality for the 2026/27 season. Compare packages, seat maps and stadium information.`,
  };
}

const included = [
  "Premium match seating in selected areas of the stadium",
  "Access to hospitality lounges or dedicated matchday spaces",
  "Food and drink options before or after the game",
  "Complimentary drinks on selected packages",
  "Matchday programmes on selected experiences",
  "Museum or stadium tour entry on selected experiences",
  "Family-friendly hospitality for supporters with children",
  "Corporate-friendly settings for hosting clients",
  "Digital ticket delivery through the official club app",
];

const steps = [
  "Browse upcoming fixtures below",
  "Select your preferred match",
  "Choose your hospitality package",
  "Reserve securely — nothing is charged until confirmed",
  "Receive your tickets and event details before matchday",
];

export const instant = false;

export default function ClubPage({ params }: PageProps<"/football/clubs/[club]">) {
  return (
    <Suspense
      fallback={
        <SportShell>
          <section className="min-h-[50vh] bg-night" />
        </SportShell>
      }
    >
      <ClubRoute params={params} />
    </Suspense>
  );
}

async function ClubRoute({
  params,
}: {
  params: PageProps<"/football/clubs/[club]">["params"];
}) {
  const { club: slug } = await params;
  const club = await getClub(slug);
  if (!club?.venue) notFound();
  const venue = await getVenue(club.venue);
  if (!venue) notFound();

  const [fixtures, faqs] = await Promise.all([listFixtures({ club: club.slug }), getClubFaqs(club)]);
  const homeFixtures = fixtures.filter((fixture) => fixture.home === club.slug);
  const nextHome = homeFixtures.find((fixture) => fixture.availability !== "sold-out") ?? homeFixtures[0];
  const packages = nextHome ? await getPackages(nextHome) : [];
  const from = packages.length ? Math.min(...packages.map((pkg) => pkg.price)) : null;
  const [primary, secondary] = club.colors;

  const anchors = [
    { id: "fixtures", label: "Fixtures" },
    { id: "overview", label: "Overview" },
    ...(packages.length ? [{ id: "packages", label: "Hospitality packages" }] : []),
    ...(club.about ? [{ id: "about", label: `About ${club.short}` }] : []),
    { id: "venue", label: "Stadium guide" },
    { id: "faq", label: "FAQ" },
  ];

  const overview = [
    { label: "Stadium name", value: venue.name },
    { label: "Capacity", value: venue.capacity.toLocaleString("en-GB") },
    { label: "Address", value: venue.address },
    { label: "Dress code", value: "Smart casual in lounges. Away colours are not permitted in home areas." },
    { label: "Audience", value: "Home supporters, families, groups of friends, corporate guests and football travellers" },
  ];

  return (
    <SportShell>
      <section className="relative overflow-hidden bg-night text-white">
        <Image src={venue.image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, #120f0df5 20%, ${primary}99 70%, ${secondary === "#ffffff" ? primary : secondary}66)` }}
        />
        <Wrap className="relative py-12 md:py-16">
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Football", href: "/football" },
              { label: "Clubs", href: "/football/clubs" },
              { label: club.name },
            ]}
          />
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              <ClubBadge club={club} className="size-24 md:size-28" />
              <div>
                {club.nickname ? <span className="over text-gold-soft">{club.nickname}</span> : null}
                <h1 className="mt-2 font-tech text-[38px] leading-[1.04] font-bold tracking-[-1.6px] md:text-[56px] md:tracking-[-2.2px]">
                  {club.name}
                  <span className="block text-[0.6em] tracking-[-1px] text-white/85">Tickets & hospitality 2026/27</span>
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <RatingBadge dark />
              <a href="#fixtures" className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-tech text-[13px] font-bold text-brand-cta">
                {fixtures.length} upcoming matches {from ? `· from ${money(from)}` : ""} <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Stadium", value: venue.name },
              { label: "Capacity", value: venue.capacity.toLocaleString("en-GB") },
              { label: "Founded", value: club.founded ? String(club.founded) : "—" },
              { label: "City", value: `${club.city}, ${club.country}` },
            ].map((fact) => (
              <div key={fact.label} className="rounded-[20px] border border-white/12 bg-white/[0.07] p-4 backdrop-blur">
                <dt className="text-[11px] font-bold tracking-[.14em] text-white/60 uppercase">{fact.label}</dt>
                <dd className="mt-1 truncate font-tech text-[18px] font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      <nav aria-label="On this page" className="sticky top-[68px] z-30 border-b border-line bg-paper/95 backdrop-blur md:top-[76px] [@media(min-height:901px)]:top-[75px] [@media(min-height:901px)]:md:top-[86px]">
        <Wrap className="flex gap-6 overflow-x-auto [scrollbar-width:none]">
          {anchors.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="border-b-2 border-transparent py-4 text-[14px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-brand-cta hover:text-brand-cta"
            >
              {item.label}
            </a>
          ))}
        </Wrap>
      </nav>

      <section id="fixtures" className="scroll-mt-[140px] bg-sand/40 py-14">
        <Wrap>
          <SectionTitle eyebrow={`${club.name} hospitality`} title="Upcoming fixtures" body="Home and away matches across every competition. Filter by date, price or opponent." />
          <FixtureExplorer fixtures={fixtures} title={`${club.short} events`} />
        </Wrap>
      </section>

      <TrustStrip />

      <section id="overview" className="scroll-mt-[140px] py-16">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="over text-gold-deep">{club.name} overview</span>
            <h2 className="mt-2.5 font-tech text-[30px] leading-[1.12] font-bold tracking-[-1px] text-ink md:text-[36px]">
              Watch {club.short} at {venue.name} in premium comfort
            </h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-taupe">
              {club.name} hospitality gives you the chance to enjoy {venue.name} with added comfort, premium seating and access to
              selected hospitality spaces. Whether you are attending with family, entertaining clients or marking a special
              occasion, SeatsConnect gives you a secure way to book official {club.name} hospitality.
            </p>
            <dl className="mt-6 overflow-hidden rounded-[24px] border border-line bg-paper">
              {overview.map((item) => (
                <div key={item.label} className="grid gap-1 border-b border-line px-5 py-3.5 last:border-0 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[12px] font-bold tracking-[.12em] text-gold-deep uppercase">{item.label}</dt>
                  <dd className="text-[14.5px] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="grid gap-5">
            <Reveal delay={80} className="rounded-[28px] border border-line bg-paper p-6">
              <h3 className="font-tech text-[19px] font-bold text-ink">What&apos;s included in {club.short} hospitality</h3>
              <ul className="mt-4 grid gap-2.5">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-[14.5px] leading-[1.5] text-ink">
                    <Icon3D name="check" className="size-6 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140} className="rounded-[28px] bg-ink p-6 text-white">
              <h3 className="font-tech text-[19px] font-bold">How to book {club.short} hospitality</h3>
              <ol className="mt-4 space-y-3">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3 text-[14.5px] text-[#e8ddd1]">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-deep font-tech text-[13px] font-bold text-white">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {nextHome && packages.length ? (
        <section id="packages" className="scroll-mt-[140px] border-t border-line bg-paper py-16">
          <Wrap>
            <SectionTitle
              eyebrow={`${club.name} hospitality packages`}
              title={`Hospitality at ${venue.name}`}
              body={`${packages.length} packages across ${venue.name}, from ticket-plus upgrades to private suites. Prices shown for the next home match.`}
            />
            <PackageGuide packages={packages} fixture={nextHome} />
          </Wrap>
        </section>
      ) : null}

      {club.about ? (
        <section id="about" className="scroll-mt-[140px] py-16">
          <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Reveal>
              <span className="over text-gold-deep">About {club.name}</span>
              <h2 className="mt-2.5 font-tech text-[30px] leading-[1.12] font-bold tracking-[-1px] text-ink md:text-[36px]">
                History, honours & rivalries
              </h2>
              {club.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 text-[16px] leading-[1.75] text-taupe">
                  {paragraph}
                </p>
              ))}
              {club.highlights ? (
                <div className="mt-6 rounded-[24px] border border-line bg-paper p-5">
                  <h3 className="font-tech text-[17px] font-bold text-ink">{club.short} highlights</h3>
                  <ul className="mt-3 space-y-2">
                    {club.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[14.5px] text-ink">
                        <Trophy className="mt-0.5 size-4 shrink-0 text-gold-deep" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Reveal>
            <Reveal delay={100} className="grid h-fit gap-4">
              {[
                { label: "Year founded", items: club.founded ? [String(club.founded)] : [] },
                { label: "Major honours", items: club.honours ?? [] },
                { label: "Rivalries", items: club.rivals ?? [] },
                { label: "Famous players", items: club.legends ?? [] },
              ]
                .filter((group) => group.items.length)
                .map((group) => (
                  <div key={group.label} className="rounded-[22px] border border-line bg-paper p-5">
                    <span className="text-[11px] font-bold tracking-[.14em] text-gold-deep uppercase">{group.label}</span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full bg-sand px-3 py-1.5 text-[13px] font-semibold text-ink">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </Reveal>
          </Wrap>
        </section>
      ) : null}

      <section id="venue" className="scroll-mt-[140px] border-t border-line bg-sand/40 py-16">
        <Wrap>
          <SectionTitle eyebrow="Stadium guide" title={`Visiting ${venue.name}`} body="Getting there, stadium rules and where to stay." />
          <VenueSection venue={venue} />
        </Wrap>
      </section>

      <section id="faq" className="scroll-mt-[140px] py-16">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <SectionTitle eyebrow={`More information about ${club.name}`} title="Hospitality, travel, tickets & venue" />
            <FaqTabs groups={faqs} />
          </div>
          <Reveal delay={120} className="h-fit rounded-[30px] bg-ink p-7 text-white lg:mt-[92px]">
            <Icon3D name="headset" tone="light" className="size-12" />
            <h3 className="mt-4 font-tech text-[22px] font-bold">Can&apos;t find what you&apos;re looking for?</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-[#d0c6bb]">Call, email or message a specialist — we&apos;ll source seats for any {club.short} fixture.</p>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-gold-soft" /> +44 (0)20 4538 7700
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-gold-soft" /> specialists@seatsconnect.com
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="size-4 text-gold-soft" /> WhatsApp concierge
              </li>
            </ul>
            <Link href="/#request" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-tech text-[13px] font-bold text-brand-cta">
              Speak to a specialist <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </Wrap>
      </section>
    </SportShell>
  );
}
