import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail, MessageCircle, Phone, Trophy } from "lucide-react";
import {
  getVerticalFaqs,
  getVerticalHost,
  getVerticalHosts,
  getVerticalPackages,
  listVerticalFixtures,
} from "@/lib/sports/catalog";
import { money } from "@/lib/sports/format";
import type { Vertical } from "@/lib/sports/verticals";
import { Icon3D } from "@/components/experience/icons-3d";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { ClubDirectory } from "./club-directory";
import { FaqTabs } from "./faq-tabs";
import { FixtureExplorer } from "./fixture-explorer";
import { PackageGuide } from "./package-guide";
import { Breadcrumbs, ClubBadge, RatingBadge, SectionTitle, SportShell, TrustStrip } from "./primitives";
import { VenueSection } from "./venue-section";

export async function VerticalHostsIndex({ vertical }: { vertical: Vertical }) {
  const hosts = await getVerticalHosts(vertical.id);
  return (
    <SportShell>
      <section className="border-b border-line bg-paper py-12">
        <Wrap>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: vertical.name, href: vertical.path }, { label: vertical.hostPlural }]} />
          <h1 className="mt-6 font-tech text-[40px] leading-[1.05] font-bold tracking-[-1.8px] text-ink md:text-[56px]">
            {vertical.name} {vertical.hostPlural.toLowerCase()} <span className="text-gold-deep">A–Z</span>
          </h1>
          <p className="mt-4 max-w-[620px] text-[17px] leading-[1.65] text-taupe">
            {hosts.length} {vertical.hostPlural.toLowerCase()} with official tickets and hospitality on sale. Choose one to see every {vertical.eventSingular}, lounge, seat map and venue guide.
          </p>
        </Wrap>
      </section>
      <section className="py-12">
        <Wrap>
          <SectionTitle eyebrow={vertical.name} title={`Find your ${vertical.hostSingular.toLowerCase()}`} />
          <ClubDirectory
            clubs={hosts}
            hrefBase={`${vertical.path}/${vertical.hostKey}`}
            countLabel={vertical.eventSingular}
            countLabelPlural={vertical.eventPlural}
            allLabel={`All ${vertical.hostPlural.toLowerCase()}`}
            inLabel={`Top ${vertical.hostPlural.toLowerCase()} in`}
            searchPlaceholder={`Search ${vertical.hostPlural.toLowerCase()}`}
          />
        </Wrap>
      </section>
      <TrustStrip />
    </SportShell>
  );
}

export async function VerticalHost({ vertical, slug }: { vertical: Vertical; slug: string }) {
  const host = await getVerticalHost(vertical.id, slug);
  if (!host) notFound();

  const fixtures = await listVerticalFixtures(vertical.id, { club: host.slug });
  const next = host.next ?? fixtures[0];
  const packages = next ? await getVerticalPackages(next) : [];
  const faqs = next ? await getVerticalFaqs(next) : [];
  const cheapest = fixtures.filter((item) => item.availability === "available" || item.availability === "limited");
  const from = cheapest.length ? Math.min(...cheapest.map((item) => item.fromPrice)) : null;

  return (
    <SportShell>
      <section className="relative overflow-hidden bg-night text-white">
        <Image src={host.venueInfo.image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#120f0df2_12%,#120f0db0_60%,#120f0d55)]" />
        <Wrap className="relative py-12 md:py-16">
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: vertical.name, href: vertical.path },
              { label: vertical.hostPlural, href: `${vertical.path}/${vertical.hostKey}` },
              { label: host.name },
            ]}
          />
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-5">
              <ClubBadge club={host} className="size-[72px]" />
              <div>
                {host.nickname ? <span className="over text-gold-soft">{host.nickname}</span> : null}
                <h1 className="mt-2 font-tech text-[40px] leading-[1.04] font-bold tracking-[-1.8px] md:text-[56px]">
                  {host.name}
                  <span className="block text-gold-soft">Tickets & hospitality</span>
                </h1>
                <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-white/80">
                  {host.about?.[0] ?? `Official ${host.name} tickets and hospitality at ${host.venueInfo.name}.`}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge dark />
              {from ? (
                <a href="#fixtures" className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-tech text-[13px] font-bold text-brand-cta">
                  {host.count} upcoming {host.count === 1 ? vertical.eventSingular : vertical.eventPlural} · from {money(from)} <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
          <dl className="mt-10 grid gap-3 sm:grid-cols-4">
            {[
              { label: vertical.hostSingular, value: host.venueInfo.name },
              { label: "Capacity", value: host.venueInfo.capacity.toLocaleString("en-GB") },
              { label: "Opened", value: String(host.venueInfo.opened) },
              { label: "City", value: `${host.city}, ${host.country}` },
            ].map((fact) => (
              <div key={fact.label} className="rounded-[20px] border border-white/12 bg-white/[0.07] p-4 backdrop-blur">
                <dt className="text-[11px] font-bold tracking-[.14em] text-white/55 uppercase">{fact.label}</dt>
                <dd className="mt-1 font-tech text-[18px] font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      <section id="fixtures" className="scroll-mt-[100px] py-16">
        <Wrap>
          <SectionTitle eyebrow={`${host.short} hospitality`} title="Upcoming fixtures" />
          <FixtureExplorer
            fixtures={fixtures}
            title={`${host.short} events`}
            homeLabel={vertical.hostSingular}
          />
        </Wrap>
      </section>

      <TrustStrip />

      {next && packages.length ? (
        <section className="py-16">
          <Wrap>
            <SectionTitle eyebrow="Hospitality packages" title={`${host.name} experiences`} body="Compare packages for the next available date. Inclusions can vary by event." />
            <PackageGuide fixture={next} packages={packages} />
          </Wrap>
        </section>
      ) : null}

      {host.honours?.length || host.highlights?.length ? (
        <section className="border-t border-line bg-paper py-16">
          <Wrap className="grid gap-8 lg:grid-cols-2">
            {host.highlights?.length ? (
              <div>
                <SectionTitle eyebrow={`About ${host.short}`} title="History & highlights" />
                <ul className="space-y-3">
                  {host.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-taupe">
                      <Trophy className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <SectionTitle eyebrow={`About ${host.short}`} title={host.name} body={host.about?.[0]} />
              </div>
            )}
            {host.honours?.length ? (
              <div className="flex flex-wrap gap-2">
                {host.honours.map((item) => (
                  <span key={item} className="rounded-full bg-sand px-3 py-1.5 text-[13px] font-semibold text-ink">{item}</span>
                ))}
              </div>
            ) : null}
          </Wrap>
        </section>
      ) : host.about?.[0] ? (
        <section className="border-t border-line bg-paper py-16">
          <Wrap>
            <SectionTitle eyebrow={`About ${host.short}`} title={host.name} body={host.about[0]} />
          </Wrap>
        </section>
      ) : null}

      <section className="py-16">
        <Wrap>
          <SectionTitle eyebrow="Venue guide" title={`Visiting ${host.venueInfo.name}`} />
          <VenueSection venue={host.venueInfo} />
        </Wrap>
      </section>

      {faqs.length ? (
        <section className="border-t border-line bg-paper py-16">
          <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <SectionTitle eyebrow="Frequently asked questions" title={`Good to know about ${host.short}`} />
              <FaqTabs groups={faqs} />
            </div>
            <Reveal delay={120} className="h-fit rounded-[30px] bg-ink p-7 text-white lg:mt-[92px]">
              <Icon3D name="headset" tone="light" className="size-12" />
              <h3 className="mt-4 font-tech text-[22px] font-bold">Need a specialist?</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-[#d0c6bb]">We confirm seats before any payment.</p>
              <ul className="mt-5 space-y-3 text-[14px]">
                <li className="flex items-center gap-3"><Phone className="size-4 text-gold-soft" /> +44 (0)20 4538 7700</li>
                <li className="flex items-center gap-3"><Mail className="size-4 text-gold-soft" /> specialists@seatsconnect.com</li>
                <li className="flex items-center gap-3"><MessageCircle className="size-4 text-gold-soft" /> WhatsApp concierge</li>
              </ul>
              <Link href="/#request" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-tech text-[13px] font-bold text-brand-cta">
                Speak to a specialist <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </Wrap>
        </section>
      ) : null}
    </SportShell>
  );
}
