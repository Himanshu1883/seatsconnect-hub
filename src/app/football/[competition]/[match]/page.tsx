import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowUpRight, BadgeCheck, CalendarDays, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getFixture, getMatchFaqs, getOtherDates, getPackages, getRelated, listFixtures } from "@/lib/sports/api";
import { dateParts, money } from "@/lib/sports/format";
import type { Media } from "@/lib/sports/types";
import { img, m } from "@/lib/sports/data/media";
import { Icon3D, type Icon3DName } from "@/components/experience/icons-3d";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { Breadcrumbs, ClubBadge, SectionTitle, SportShell, TrustStrip } from "@/components/sports/primitives";
import { MatchHeroCard } from "@/components/sports/match-hero-card";
import { FaqTabs } from "@/components/sports/faq-tabs";
import { FixtureTile } from "@/components/sports/fixture-card";
import { PackageExplorer } from "@/components/sports/package-explorer";
import { PhotoGallery } from "@/components/sports/photo-gallery";
import { VenueSection } from "@/components/sports/venue-section";

export async function generateStaticParams() {
  const fixtures = await listFixtures();
  return fixtures.map((fixture) => ({ competition: fixture.competition, match: fixture.slug }));
}

export async function generateMetadata({ params }: PageProps<"/football/[competition]/[match]">): Promise<Metadata> {
  const { competition, match } = await params;
  const fixture = await getFixture(competition, match);
  if (!fixture) return {};
  const date = dateParts(fixture.kickoff, fixture.timeZone);
  return {
    title: `${fixture.title} Tickets & Hospitality | ${date.short} | SeatsConnect`,
    description: `Official ${fixture.title} tickets and VIP hospitality at ${fixture.venue.name}. Compare packages from ${money(fixture.fromPrice)} per person.`,
  };
}

const subnav = [
  { id: "packages", label: "Tickets & hospitality" },
  { id: "info", label: "Event info" },
  { id: "venue", label: "Venue & travel" },
  { id: "gallery", label: "Gallery" },
  { id: "faq", label: "FAQ" },
];

export const instant = false;

export default function MatchPage({ params }: PageProps<"/football/[competition]/[match]">) {
  return (
    <Suspense
      fallback={
        <SportShell>
          <section className="min-h-[50vh] bg-night" />
        </SportShell>
      }
    >
      <MatchRoute params={params} />
    </Suspense>
  );
}

async function MatchRoute({
  params,
}: {
  params: PageProps<"/football/[competition]/[match]">["params"];
}) {
  const { competition, match } = await params;
  const fixture = await getFixture(competition, match);
  if (!fixture) notFound();

  const [packages, otherDates, related, faqs] = await Promise.all([
    getPackages(fixture),
    getOtherDates(fixture),
    getRelated(fixture),
    getMatchFaqs(fixture),
  ]);

  const date = dateParts(fixture.kickoff, fixture.timeZone);
  const { homeClub, awayClub, venue, competitionInfo } = fixture;
  const seen = new Set<string>();
  const gallery: Media[] = [m(venue.image, `${venue.name} on matchday`, "stadium"), ...packages.flatMap((pkg) => pkg.media), m(img.guests, "Hospitality guests", "lounge")].filter(
    (item) => (seen.has(item.src) ? false : (seen.add(item.src), true)),
  );

  const guarantees: { icon: Icon3DName; title: string; text: string }[] = [
    { icon: "seat", title: "Seats together", text: "All seats guaranteed together" },
    { icon: "ticket", title: "Mobile tickets", text: "Digital delivery via the club app" },
    { icon: "check", title: "Early delivery", text: "3–5 days before the event" },
    {
      icon: "shield",
      title: fixture.rules.length ? "Home areas only" : "Official allocation",
      text: fixture.rules.length ? "No away fans in these sections" : "Neutral & home seating available",
    },
  ];

  const facts = [
    { label: "Competition", value: `${competitionInfo.name} ${competitionInfo.season}` },
    ...(fixture.stage ? [{ label: "Stage", value: fixture.stage }] : []),
    { label: "Match", value: fixture.title },
    { label: "Date", value: date.full },
    { label: "Kick-off", value: `${date.time} local time${fixture.dateConfirmed ? "" : " (to be confirmed)"}` },
    { label: "Stadium", value: venue.name },
    { label: "Location", value: `${venue.city}, ${venue.country}` },
    { label: "Ticket type", value: "Official mobile tickets & hospitality" },
  ];

  return (
    <SportShell>
      <section className="relative overflow-hidden bg-night text-white">
        <Image src={venue.image} alt="" fill priority sizes="100vw" className="object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,#120f0dcc_0%,#120f0d66_42%,#120f0d22_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(transparent,#120f0d99)]" />
        <Wrap className="relative py-8 md:py-11">
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Football", href: "/football" },
              { label: competitionInfo.short, href: `/football/${competitionInfo.slug}` },
              { label: homeClub.name, href: `/football/clubs/${homeClub.slug}` },
              { label: fixture.title },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/12 px-3 py-1 text-[12px] font-bold text-gold-soft backdrop-blur">
                  {competitionInfo.name} {competitionInfo.season}
                </span>
                {fixture.stage ? <span className="rounded-full bg-white/12 px-3 py-1 text-[12px] font-bold text-white backdrop-blur">{fixture.stage}</span> : null}
                {fixture.dateConfirmed ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-[#1f8a4c]/90 px-3 py-1 text-[12px] font-bold text-white">
                    <BadgeCheck className="size-3.5" /> Date confirmed
                  </span>
                ) : (
                  <span className="rounded-full bg-[#9a5a12]/90 px-3 py-1 text-[12px] font-bold text-white">Date & time TBC for TV</span>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4 md:gap-6">
                <ClubBadge club={homeClub} className="size-16 md:size-20" />
                <span className="font-tech text-[15px] font-bold text-white/50">VS</span>
                <ClubBadge club={awayClub} className="size-16 md:size-20" />
              </div>
              <h1 className="mt-5 max-w-[760px] font-tech text-[38px] leading-[1.04] font-bold tracking-[-1.6px] md:text-[56px] md:tracking-[-2.2px]">
                {homeClub.name} <span className="text-gold-soft">vs</span> {awayClub.name}
              </h1>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/80">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-gold-soft" /> {date.full}
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 className="size-4 text-gold-soft" /> {date.time} local
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-gold-soft" /> {venue.name}, {venue.city}
                </span>
              </div>
              {fixture.rules.length ? (
                <p className="mt-5 inline-flex items-center gap-2 rounded-[14px] border border-[#e5c697]/30 bg-[#e5c697]/10 px-4 py-2.5 text-[13.5px] text-gold-soft">
                  <AlertTriangle className="size-4 shrink-0" /> Organiser regulations: {fixture.rules.join(" · ")}
                </p>
              ) : null}
            </div>

            <MatchHeroCard fixture={fixture} />
          </div>
        </Wrap>
      </section>

      <nav aria-label="On this page" className="sticky top-[68px] z-30 border-b border-line bg-paper/95 backdrop-blur md:top-[76px] [@media(min-height:901px)]:top-[75px] [@media(min-height:901px)]:md:top-[86px]">
        <Wrap className="flex gap-6 overflow-x-auto [scrollbar-width:none]">
          {subnav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="border-b-2 border-transparent py-4 text-[14px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-brand-cta hover:text-brand-cta"
            >
              {item.label}
              {item.id === "packages" ? <span className="ml-1 text-taupe">({packages.length})</span> : null}
            </a>
          ))}
        </Wrap>
      </nav>

      <Wrap className="py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="flex items-center gap-3.5 rounded-[22px] border border-line bg-paper p-4">
              <Icon3D name={item.icon} className="size-11 shrink-0" />
              <div>
                <strong className="font-tech text-[14.5px] text-ink">{item.title}</strong>
                <p className="text-[13px] text-taupe">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>

      <section id="packages" className="scroll-mt-[140px] pb-16">
        <Wrap>
          <SectionTitle
            eyebrow="Tickets & hospitality"
            title={`Choose your ${fixture.title} experience`}
            body="Compare official ticket-plus, hospitality and VIP packages. Select a package to see your total — seats are always guaranteed together."
          />
          <PackageExplorer fixture={fixture} packages={packages} otherDates={otherDates} />
        </Wrap>
      </section>

      <section id="info" className="scroll-mt-[140px] border-t border-line bg-paper py-16">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="over text-gold-deep">Event information</span>
            <h2 className="mt-2.5 font-tech text-[30px] leading-[1.12] font-bold tracking-[-1px] text-ink md:text-[36px]">About {fixture.title}</h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-taupe">
              {fixture.about ??
                `${homeClub.name} welcome ${awayClub.name} to ${venue.name} for this ${competitionInfo.short} fixture. Expect a sell-out crowd in ${venue.city} — hospitality guests enjoy the build-up in comfort, with premium seats and dining included.`}
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-taupe">
              Kick-off is scheduled for {date.time} local time on {date.full}. Fixture dates and times can change for TV — if
              this happens your booking automatically moves with it.
            </p>
            <p className="mt-6 text-[15px] text-ink">
              Want to visit other matches?{" "}
              <Link href={`/football/clubs/${homeClub.slug}`} className="font-bold text-brand-cta underline-offset-2 hover:underline">
                Check out all {homeClub.name} tickets
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={100}>
            <dl className="overflow-hidden rounded-[28px] border border-line bg-cream">
              {facts.map((item) => (
                <div key={item.label} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 border-b border-line px-5 py-3.5 last:border-0">
                  <dt className="text-[12px] font-bold tracking-[.12em] text-gold-deep uppercase">{item.label}</dt>
                  <dd className="text-[14.5px] font-semibold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Wrap>
      </section>

      <section id="venue" className="scroll-mt-[140px] py-16">
        <Wrap>
          <SectionTitle eyebrow="Venue & travel" title={`Your matchday at ${venue.name}`} body="Everything you need to plan the day — from the nearest station to the stadium rules." />
          <VenueSection venue={venue} />
        </Wrap>
      </section>

      <section id="gallery" className="scroll-mt-[140px] pb-16">
        <Wrap>
          <SectionTitle eyebrow="Gallery" title="Inside the experience" body="Illustrative photography of the stadium, lounges and dining included across packages." />
          <Reveal>
            <PhotoGallery media={gallery} title={`${fixture.title} — gallery`} />
          </Reveal>
        </Wrap>
      </section>

      <TrustStrip />

      <section id="faq" className="scroll-mt-[140px] py-16">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <SectionTitle eyebrow="Frequently asked questions" title="Good to know before you book" />
            <FaqTabs groups={faqs} />
          </div>
          <Reveal delay={120} className="h-fit rounded-[30px] bg-ink p-7 text-white lg:mt-[92px]">
            <Icon3D name="headset" tone="light" className="size-12" />
            <h3 className="mt-4 font-tech text-[22px] font-bold">Can&apos;t find what you&apos;re looking for?</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-[#d0c6bb]">Our specialists answer within the hour, seven days a week.</p>
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

      {related.length ? (
        <section className="border-t border-line bg-sand/60 py-16">
          <Wrap>
            <SectionTitle
              eyebrow="Other events you may like"
              title={`More from ${homeClub.name} & ${competitionInfo.short}`}
              action={
                <Link href={`/football/${competitionInfo.slug}`} className="flex items-center gap-1.5 font-tech text-[14px] font-bold text-brand-cta hover:underline">
                  View all {competitionInfo.short} <ArrowUpRight className="size-4" />
                </Link>
              }
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.href} delay={index * 70}>
                  <FixtureTile fixture={item} />
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}
      <div className="h-20 lg:hidden" />
    </SportShell>
  );
}
