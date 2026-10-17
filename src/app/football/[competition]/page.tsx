import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getCompetition, getCompetitions, getHostClubs, listFixtures } from "@/lib/sports/api";
import { money } from "@/lib/sports/format";
import { Icon3D } from "@/components/experience/icons-3d";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { Breadcrumbs, ClubBadge, RatingBadge, SectionTitle, SportShell, TrustStrip } from "@/components/sports/primitives";
import { FaqTabs } from "@/components/sports/faq-tabs";
import { FixtureExplorer } from "@/components/sports/fixture-explorer";
import { FixtureTile } from "@/components/sports/fixture-card";
import { HowItWorks } from "@/components/sports/how-it-works";

export async function generateStaticParams() {
  const competitions = await getCompetitions();
  return competitions.map((competition) => ({ competition: competition.slug }));
}

export async function generateMetadata({ params }: PageProps<"/football/[competition]">): Promise<Metadata> {
  const { competition } = await params;
  const info = await getCompetition(competition);
  if (!info) return {};
  return {
    title: `${info.name} Tickets & Hospitality ${info.season} | SeatsConnect`,
    description: `Official ${info.name} ${info.season} tickets and VIP hospitality. ${info.tagline}`,
  };
}

export const instant = false;

export default function CompetitionPage({ params }: PageProps<"/football/[competition]">) {
  return (
    <Suspense
      fallback={
        <SportShell>
          <section className="min-h-[50vh] bg-night" />
        </SportShell>
      }
    >
      <CompetitionRoute params={params} />
    </Suspense>
  );
}

async function CompetitionRoute({
  params,
}: {
  params: PageProps<"/football/[competition]">["params"];
}) {
  const { competition } = await params;
  const info = await getCompetition(competition);
  if (!info) notFound();

  const [fixtures, competitions, hosts] = await Promise.all([listFixtures({ competition }), getCompetitions(), getHostClubs()]);
  const clubs = hosts.filter((club) => fixtures.some((fixture) => fixture.home === club.slug));
  const onSale = fixtures.filter((fixture) => fixture.availability === "available" || fixture.availability === "limited");
  const featured = fixtures.filter((fixture) => fixture.highlight && fixture.availability !== "sold-out").slice(0, 4);
  const cheapest = onSale.length ? Math.min(...onSale.map((fixture) => fixture.fromPrice)) : null;

  return (
    <SportShell>
      <section className="relative overflow-hidden bg-night text-white">
        <Image src={info.image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,#120f0df0_15%,#120f0d99_60%,#120f0d40)]" />
        <Wrap className="relative py-12 md:py-16">
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Football", href: "/football" },
              { label: `${info.name} ${info.season}` },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-[720px]">
              <span className="over text-gold-soft">
                {info.country} · Season {info.season}
              </span>
              <h1 className="mt-3 font-tech text-[40px] leading-[1.04] font-bold tracking-[-1.8px] md:text-[60px] md:tracking-[-2.4px]">
                {info.name} tickets
                <span className="block text-gold-soft">& hospitality {info.season}</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-white/80">{info.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#fixtures" className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-tech text-[13px] font-bold text-brand-cta">
                  View {fixtures.length} matches <ArrowUpRight className="size-4" />
                </a>
                <RatingBadge dark />
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[460px] lg:grid-cols-2">
              {[
                ...info.facts.slice(0, 2),
                { label: "On sale now", value: String(onSale.length) },
                { label: "Packages from", value: cheapest ? money(cheapest) : "—" },
              ].map((fact) => (
                <div key={fact.label} className="rounded-[20px] border border-white/12 bg-white/[0.07] p-4 backdrop-blur">
                  <dd className="font-tech text-[24px] leading-none font-extrabold">{fact.value}</dd>
                  <dt className="mt-1.5 text-[11px] font-bold tracking-[.14em] text-white/60 uppercase">{fact.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Wrap>
      </section>

      {featured.length ? (
        <section className="py-14">
          <Wrap>
            <SectionTitle eyebrow="Featured matches" title="The fixtures everyone wants" body="Derbies, title clashes and the biggest nights of the season — limited hospitality remains." />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map((fixture, index) => (
                <Reveal key={fixture.href} delay={index * 70}>
                  <FixtureTile fixture={fixture} />
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}

      <section id="fixtures" className="scroll-mt-[100px] border-t border-line bg-sand/40 py-14">
        <Wrap>
          <SectionTitle eyebrow={`${info.name} ${info.season}`} title="All events" />
          <FixtureExplorer fixtures={fixtures} showCompetition={false} title={`${info.short} events`} />
        </Wrap>
      </section>

      {clubs.length ? (
        <section className="py-14">
          <Wrap>
            <SectionTitle eyebrow="Popular teams" title={`${info.short} clubs`} body="Browse every home fixture, hospitality lounge and stadium guide by club." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clubs.map((club, index) => (
                <Reveal key={club.slug} delay={(index % 4) * 50}>
                  <Link
                    href={`/football/clubs/${club.slug}`}
                    className="group flex items-center gap-4 rounded-[22px] border border-line bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_20px_40px_-28px_rgba(26,21,18,0.45)]"
                  >
                    <ClubBadge club={club} className="size-12" />
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate font-tech text-[15.5px] text-ink">{club.name}</strong>
                      <span className="block truncate text-[13px] text-taupe">{club.venueInfo.name}</span>
                    </span>
                    <span className="rounded-full bg-sand px-2.5 py-1 text-[11.5px] font-bold text-brand-cta">{club.count}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}

      <TrustStrip />

      <section className="py-16">
        <Wrap className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="over text-gold-deep">About the competition</span>
            <h2 className="mt-2.5 font-tech text-[30px] leading-[1.12] font-bold tracking-[-1px] text-ink md:text-[36px]">
              {info.name} {info.season}
            </h2>
            {info.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-[16px] leading-[1.75] text-taupe">
                {paragraph}
              </p>
            ))}
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {info.facts.map((fact) => (
                <div key={fact.label} className="rounded-[18px] border border-line bg-paper px-4 py-3">
                  <dt className="text-[11px] font-bold tracking-[.12em] text-gold-deep uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-tech text-[16px] font-bold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={100}>
            <HowItWorks />
          </Reveal>
        </Wrap>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <Wrap>
          <SectionTitle eyebrow="Frequently asked questions" title={`${info.short} tickets — your questions answered`} />
          <FaqTabs groups={[{ label: "General", items: info.faqs }]} />
        </Wrap>
      </section>

      <section className="py-14">
        <Wrap>
          <SectionTitle eyebrow="Explore more competitions" title="Domestic leagues & European nights" />
          <div className="flex flex-wrap gap-3">
            {competitions
              .filter((item) => item.slug !== info.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/football/${item.slug}`}
                  className="flex items-center gap-2.5 rounded-full border border-line bg-paper py-2 pr-5 pl-2 font-tech text-[14px] font-bold text-ink transition-colors hover:border-brand-cta hover:text-brand-cta"
                >
                  <Icon3D name={item.region === "european" ? "star" : "ticket"} className="size-8" />
                  {item.name}
                </Link>
              ))}
          </div>
        </Wrap>
      </section>
    </SportShell>
  );
}
