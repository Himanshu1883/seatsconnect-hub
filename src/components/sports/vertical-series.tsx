import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  getVerticalCompetition,
  getVerticalCompetitions,
  getVerticalHosts,
  hostHref,
  listVerticalFixtures,
} from "@/lib/sports/catalog";
import { money } from "@/lib/sports/format";
import type { Vertical } from "@/lib/sports/verticals";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { FaqTabs } from "./faq-tabs";
import { FixtureExplorer } from "./fixture-explorer";
import { FixtureTile } from "./fixture-card";
import { HowItWorks } from "./how-it-works";
import { Breadcrumbs, ClubBadge, RatingBadge, SectionTitle, SportShell, TrustStrip } from "./primitives";

export async function VerticalSeries({ vertical, slug }: { vertical: Vertical; slug: string }) {
  const info = await getVerticalCompetition(vertical.id, slug);
  if (!info) notFound();

  const [fixtures, competitions, hosts] = await Promise.all([
    listVerticalFixtures(vertical.id, { competition: slug }),
    getVerticalCompetitions(vertical.id),
    getVerticalHosts(vertical.id),
  ]);
  const relatedHosts = hosts.filter((host) => fixtures.some((fixture) => fixture.home === host.slug));
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
              { label: vertical.name, href: vertical.path },
              { label: `${info.name} ${info.season}` },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-[720px]">
              <span className="over text-gold-soft">
                {info.country} · {info.season}
              </span>
              <h1 className="mt-3 font-tech text-[40px] leading-[1.04] font-bold tracking-[-1.8px] md:text-[60px] md:tracking-[-2.4px]">
                {info.name} tickets
                <span className="block text-gold-soft">& hospitality {info.season}</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-white/80">{info.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#fixtures" className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-tech text-[13px] font-bold text-brand-cta">
                  View {fixtures.length} {fixtures.length === 1 ? vertical.eventSingular : vertical.eventPlural} <ArrowUpRight className="size-4" />
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
                  <dt className="text-[11px] font-bold tracking-[.14em] text-white/55 uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-tech text-[22px] font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Wrap>
      </section>

      {featured.length ? (
        <section className="border-b border-line bg-paper py-16">
          <Wrap>
            <SectionTitle eyebrow="Featured" title="The occasions everyone wants" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map((fixture, index) => (
                <Reveal key={fixture.href} delay={index * 60}>
                  <FixtureTile fixture={fixture} />
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}

      <section id="fixtures" className="scroll-mt-[100px] py-16">
        <Wrap>
          <SectionTitle eyebrow={`${info.short} ${info.season}`} title={`All ${info.short} ${vertical.eventPlural}`} />
          <FixtureExplorer
            fixtures={fixtures}
            showCompetition={false}
            title={`${info.short} events`}
            homeLabel={vertical.hostSingular}
          />
        </Wrap>
      </section>

      {relatedHosts.length ? (
        <section className="border-t border-line bg-sand/40 py-16">
          <Wrap>
            <SectionTitle eyebrow={vertical.hostPlural} title={`${info.short} ${vertical.hostPlural.toLowerCase()}`} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedHosts.map((host) => (
                <Link
                  key={host.slug}
                  href={hostHref(vertical, host.slug)}
                  className="flex items-center gap-4 rounded-[22px] border border-line bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-line-strong"
                >
                  <ClubBadge club={host} className="size-12" />
                  <span className="min-w-0">
                    <strong className="block font-tech text-[16px] text-ink">{host.name}</strong>
                    <span className="text-[13px] text-taupe">{host.venueInfo.name} · {host.count} {host.count === 1 ? vertical.eventSingular : vertical.eventPlural}</span>
                  </span>
                </Link>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}

      <TrustStrip />

      <section className="py-16">
        <Wrap className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow={`About ${info.short}`} title={info.name} body={info.about[0]} />
            {info.about.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[16px] leading-[1.75] text-taupe">{paragraph}</p>
            ))}
          </div>
          <HowItWorks />
        </Wrap>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <Wrap>
          <SectionTitle eyebrow="Frequently asked questions" title={`Good to know about ${info.short}`} />
          <FaqTabs groups={[{ label: "General", items: info.faqs }]} />
        </Wrap>
      </section>

      {competitions.length > 1 ? (
        <section className="py-16">
          <Wrap>
            <SectionTitle eyebrow="More collections" title={`Other ${vertical.name.toLowerCase()} series`} />
            <div className="flex flex-wrap gap-3">
              {competitions.filter((item) => item.slug !== info.slug).map((item) => (
                <Link key={item.slug} href={`${vertical.path}/${item.slug}`} className="rounded-full border border-line bg-paper px-5 py-2.5 font-tech text-[14px] font-bold text-brand-cta hover:border-brand-cta">
                  {item.short}
                </Link>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}
    </SportShell>
  );
}
