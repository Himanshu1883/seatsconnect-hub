import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { getCompetitions, getHostClubs, listFixtures } from "@/lib/sports/api";
import { dateParts, money } from "@/lib/sports/format";
import { Icon3D } from "@/components/experience/icons-3d";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { Breadcrumbs, ClubBadge, RatingBadge, SectionTitle, SportShell, TrustStrip } from "@/components/sports/primitives";
import { ClubDirectory } from "@/components/sports/club-directory";
import { FaqTabs } from "@/components/sports/faq-tabs";
import { FixtureExplorer } from "@/components/sports/fixture-explorer";
import { FixtureTile } from "@/components/sports/fixture-card";
import { HowItWorks } from "@/components/sports/how-it-works";
import { HubSearch, type SearchItem } from "@/components/sports/hub-search";

export const metadata: Metadata = {
  title: "Football Tickets & Hospitality 2026/27 | Official | SeatsConnect",
  description: "From Europe's biggest clubs to the top leagues — official football tickets, VIP hospitality and travel packages.",
};

const packageTypes = [
  {
    title: "Tickets",
    text: "Official match tickets for every budget, sourced directly from clubs and organisers with 100% guaranteed access. Many come upgraded with padded seats, a meal voucher or a matchday programme.",
  },
  {
    title: "Hospitality packages",
    text: "Upgrade your matchday with lounge access, dining, complimentary drinks and premium seats. Build the perfect package — from relaxed street-food lounges to fine-dining restaurants and halfway-line views.",
  },
  {
    title: "VIP & private boxes",
    text: "Host clients, family or friends in a private executive box with a dedicated host, fine dining and balcony seats — or meet a club legend in the Tunnel Club.",
  },
  {
    title: "Travel packages",
    text: "Combine your tickets with a hand-picked hotel, transfers or flights. Your specialist builds the weekend around kick-off.",
  },
];

export default async function FootballPage() {
  const [fixtures, competitions, clubs] = await Promise.all([listFixtures(), getCompetitions(), getHostClubs()]);
  const onSale = fixtures.filter((fixture) => fixture.availability === "available" || fixture.availability === "limited");
  const upcoming = onSale.slice(0, 8);
  const spotlight = fixtures.find((fixture) => fixture.slug === "tottenham-hotspur-vs-coventry-city") ?? onSale[0];
  const spotlightDate = spotlight ? dateParts(spotlight.kickoff, spotlight.timeZone) : null;
  const european = competitions.filter((item) => item.region === "european");

  const stats = competitions.map((competition) => {
    const list = fixtures.filter((fixture) => fixture.competition === competition.slug);
    const open = list.filter((fixture) => fixture.availability !== "sold-out" && fixture.availability !== "coming-soon");
    return { competition, count: list.length, from: open.length ? Math.min(...open.map((fixture) => fixture.fromPrice)) : null };
  });

  const searchItems: SearchItem[] = [
    ...competitions.map((item) => ({ label: item.name, sub: `${item.country} · ${item.season}`, href: `/football/${item.slug}`, kind: "competition" as const })),
    ...clubs.map((club) => ({ label: club.name, sub: club.venueInfo.name, href: `/football/clubs/${club.slug}`, kind: "club" as const })),
    ...fixtures.map((fixture) => ({
      label: fixture.title,
      sub: `${dateParts(fixture.kickoff, fixture.timeZone).short} · ${fixture.competitionInfo.short}`,
      href: fixture.href,
      kind: "match" as const,
    })),
  ];
  const popular = [
    searchItems.find((item) => item.href === "/football/premier-league"),
    searchItems.find((item) => item.href === "/football/champions-league"),
    searchItems.find((item) => item.href === "/football/clubs/manchester-united"),
    searchItems.find((item) => item.href === "/football/clubs/tottenham-hotspur"),
    searchItems.find((item) => item.href === "/football/clubs/manchester-city"),
  ].filter((item): item is SearchItem => Boolean(item));

  return (
    <SportShell>
      <section className="relative bg-night text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={competitions[0].image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#120f0df5_15%,#120f0db0_55%,#120f0d55)]" />
        </div>
        <Wrap className="relative py-12 md:py-20">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Football" }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="max-w-[720px]">
              <span className="over text-gold-soft">Football tickets · Season 2026/27</span>
              <h1 className="mt-3 font-tech text-[42px] leading-[1.03] font-bold tracking-[-1.8px] md:text-[64px] md:tracking-[-2.6px]">
                Every matchday matters.
                <span className="block text-gold-soft">Experience it live.</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-white/80">
                From Europe&apos;s biggest clubs to the top leagues — official football tickets, VIP hospitality and travel
                packages, confirmed by a personal specialist.
              </p>
              <div className="mt-7 max-w-[620px]">
                <HubSearch items={searchItems} popular={popular} />
              </div>
            </div>

            {spotlight && spotlightDate ? (
              <Link
                href={spotlight.href}
                className="group hidden rounded-[28px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl transition-colors hover:bg-white/[0.11] lg:block"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11px] font-bold tracking-[.16em] text-gold-soft uppercase">
                    <span className="live-ping size-2 rounded-full bg-gold-soft" /> Next big match
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold">{spotlight.competitionInfo.short}</span>
                </div>
                <div className="mt-6 flex items-center justify-center gap-5">
                  <ClubBadge club={spotlight.homeClub} className="size-16" />
                  <span className="font-tech text-[13px] font-bold text-white/50">VS</span>
                  <ClubBadge club={spotlight.awayClub} className="size-16" />
                </div>
                <strong className="mt-5 block text-center font-tech text-[21px] leading-tight">{spotlight.title}</strong>
                <div className="mt-3 flex flex-col items-center gap-1 text-[13.5px] text-white/70">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" /> {spotlightDate.short} · {spotlightDate.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> {spotlight.venue.name}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span>
                    <span className="block text-[11px] font-bold tracking-[.14em] text-white/55 uppercase">From</span>
                    <strong className="font-tech text-[26px]">{money(spotlight.fromPrice)}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-white px-5 py-3 font-tech text-[13px] font-bold text-brand-cta">
                    View packages <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            ) : null}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[14px] text-white/75">
            <RatingBadge dark />
            <span>
              <strong className="font-tech text-white">{fixtures.length}</strong> matches listed
            </span>
            <span>
              <strong className="font-tech text-white">{clubs.length}</strong> clubs
            </span>
            <span>
              <strong className="font-tech text-white">{competitions.length}</strong> competitions
            </span>
          </div>
        </Wrap>
      </section>

      <section className="py-16">
        <Wrap>
          <SectionTitle eyebrow="Popular competitions" title="Choose your competition" body="Every matchday matters. Experience it live from the stands and secure your tickets." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ competition, count, from }, index) => (
              <Reveal key={competition.slug} delay={(index % 4) * 60}>
                <Link
                  href={`/football/${competition.slug}`}
                  className="group relative flex h-[230px] flex-col justify-end overflow-hidden rounded-[28px] bg-[#283f51] p-5 text-white"
                >
                  <Image
                    src={competition.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(transparent_20%,#120f0de6)]" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-bold text-brand-cta">{competition.country}</span>
                  <span className="relative">
                    <strong className="block font-tech text-[22px] leading-tight font-bold tracking-[-0.5px]">{competition.name}</strong>
                    <span className="mt-1.5 flex items-center justify-between text-[13px] text-white/75">
                      <span>
                        {count} {count === 1 ? "match" : "matches"}
                        {from ? ` · from ${money(from)}` : ""}
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full bg-white text-brand-cta transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <Wrap>
          <SectionTitle
            eyebrow="Upcoming football events"
            title="Book your next matchday"
            body="On sale now with official mobile tickets. Discounts and low-availability fixtures are flagged."
            action={
              <a href="#all-fixtures" className="flex items-center gap-1.5 font-tech text-[14px] font-bold text-brand-cta hover:underline">
                View all tickets <ArrowUpRight className="size-4" />
              </a>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {upcoming.map((fixture, index) => (
              <Reveal key={fixture.href} delay={(index % 4) * 60}>
                <FixtureTile fixture={fixture} />
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="py-16">
        <Wrap>
          <SectionTitle eyebrow="Top clubs" title="Follow your club" body="Every home fixture, hospitality lounge and stadium guide, organised by club." action={
            <Link href="/football/clubs" className="flex items-center gap-1.5 font-tech text-[14px] font-bold text-brand-cta hover:underline">
              All clubs A–Z <ArrowUpRight className="size-4" />
            </Link>
          } />
          <ClubDirectory clubs={clubs} grouped={false} />
        </Wrap>
      </section>

      <section className="relative overflow-hidden bg-ink py-16 text-white">
        <Image src={european[0]?.image ?? competitions[0].image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <Wrap className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <Reveal>
            <span className="over text-gold-soft">European competitions</span>
            <h2 className="mt-3 font-tech text-[34px] leading-[1.08] font-bold tracking-[-1.2px] md:text-[44px]">Experience magical European nights live</h2>
            <p className="mt-4 max-w-[480px] text-[16px] leading-[1.7] text-[#d0c6bb]">
              Midweek kick-offs under the lights, from the league phase to the final. Hospitality is the most reliable way to
              secure seats for the biggest nights.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {european.map((competition, index) => {
              const stat = stats.find((item) => item.competition.slug === competition.slug);
              return (
                <Reveal key={competition.slug} delay={index * 80}>
                  <Link
                    href={`/football/${competition.slug}`}
                    className="group flex h-full flex-col rounded-[26px] border border-white/12 bg-white/[0.06] p-6 backdrop-blur transition-colors hover:bg-white/[0.11]"
                  >
                    <Icon3D name="star" tone="light" className="size-12" />
                    <strong className="mt-4 font-tech text-[21px]">{competition.name}</strong>
                    <span className="mt-1 text-[14px] text-white/65">{competition.facts.find((fact) => fact.label === "Final")?.value}</span>
                    <span className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[13.5px]">
                      <span>
                        {stat?.count ?? 0} matches{stat?.from ? ` · from ${money(stat.from)}` : ""}
                      </span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Wrap>
      </section>

      <section id="all-fixtures" className="scroll-mt-[100px] bg-sand/40 py-16">
        <Wrap>
          <SectionTitle eyebrow="Football events" title="All football tickets & travel packages" />
          <FixtureExplorer fixtures={fixtures} title="Football events" />
        </Wrap>
      </section>

      <TrustStrip />

      <section className="py-16">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal>
            <HowItWorks dark />
          </Reveal>
          <div>
            <SectionTitle eyebrow="Tickets & package options" title="Unleash the ultimate football experience" />
            <div className="grid gap-4 sm:grid-cols-2">
              {packageTypes.map((item, index) => (
                <Reveal key={item.title} delay={index * 60} className="rounded-[24px] border border-line bg-paper p-5">
                  <Icon3D name={(["ticket", "glass", "crown", "globe"] as const)[index]} className="size-11" />
                  <strong className="mt-3 block font-tech text-[17px] text-ink">{item.title}</strong>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-taupe">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <Wrap>
          <SectionTitle eyebrow="Frequently asked questions" title="Buying football tickets with SeatsConnect" />
          <FaqTabs groups={[{ label: "General", items: competitions[0].faqs }]} />
        </Wrap>
      </section>
    </SportShell>
  );
}
