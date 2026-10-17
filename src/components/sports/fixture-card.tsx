import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BellRing, CalendarClock, Clock3, MapPin, Smartphone, Sparkles } from "lucide-react";
import type { FixtureView } from "@/lib/sports/types";
import { availabilityCopy, dateParts, money } from "@/lib/sports/format";
import { ClubBadge, Chip } from "./primitives";
import { cn } from "cn";

function Cta({ fixture }: { fixture: FixtureView }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-tech text-[13px] font-bold whitespace-nowrap transition-all";
  if (fixture.availability === "sold-out") {
    return (
      <span className={cn(base, "border border-line-strong bg-white text-brand-cta group-hover:border-brand-cta")}>
        <BellRing className="size-4" />
        Notify me
      </span>
    );
  }
  if (fixture.availability === "coming-soon") {
    return (
      <span className={cn(base, "border border-brand-cta bg-white text-brand-cta group-hover:bg-[#eef3f5]")}>
        <CalendarClock className="size-4" />
        Pre-register
      </span>
    );
  }
  return (
    <span className={cn(base, "bg-brand-cta text-white shadow-[0_10px_22px_-10px_rgba(6,50,70,0.7)] group-hover:bg-brand-cta-hover")}>
      View packages
      <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
    </span>
  );
}

export function FixtureRow({ fixture, showCompetition = true }: { fixture: FixtureView; showCompetition?: boolean }) {
  const date = dateParts(fixture.kickoff, fixture.timeZone);
  const status = availabilityCopy[fixture.availability];
  const discount = fixture.wasPrice ? Math.round((1 - fixture.fromPrice / fixture.wasPrice) * 100) : 0;
  const unavailable = fixture.availability === "sold-out";

  return (
    <Link
      href={fixture.href}
      className="group grid gap-4 rounded-[26px] border border-line bg-paper p-3 shadow-[0_1px_2px_rgba(26,21,18,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_50px_-30px_rgba(26,21,18,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cta sm:grid-cols-[86px_minmax(0,1fr)] lg:grid-cols-[86px_minmax(0,1fr)_auto] lg:items-center"
    >
      <div className="flex items-center gap-3 sm:block">
        <div className="flex h-[86px] w-[86px] flex-col items-center justify-center rounded-[20px] bg-sand text-center">
          <span className="text-[11px] font-bold tracking-[.14em] text-gold-deep uppercase">{date.weekday}</span>
          <span className="font-tech text-[30px] leading-none font-extrabold text-ink">{date.day}</span>
          <span className="text-[12px] font-semibold text-taupe uppercase">{date.month}</span>
        </div>
        <div className="flex -space-x-2 sm:hidden">
          <ClubBadge club={fixture.homeClub} className="size-10" />
          {fixture.format === "match" ? <ClubBadge club={fixture.awayClub} className="size-10" /> : null}
        </div>
      </div>

      <div className="min-w-0 px-1 sm:px-0">
        <div className="flex flex-wrap items-center gap-2">
          {showCompetition ? (
            <Chip className="bg-[#eef3f5] text-brand-cta">{fixture.competitionInfo.short}</Chip>
          ) : null}
          {fixture.stage ? <Chip className="bg-sand text-gold-deep">{fixture.stage}</Chip> : null}
          <Chip className={status.tone}>{status.label}</Chip>
          {!fixture.dateConfirmed ? <Chip className="bg-white text-taupe ring-1 ring-line">Date TBC</Chip> : null}
        </div>
        <div className="mt-2.5 flex items-center gap-3">
          <div className="hidden -space-x-2.5 sm:flex">
            <ClubBadge club={fixture.homeClub} className="size-10" />
            {fixture.format === "match" ? <ClubBadge club={fixture.awayClub} className="size-10" /> : null}
          </div>
          <h3 className="font-tech text-[19px] leading-[1.2] font-bold tracking-[-0.4px] text-ink md:text-[21px]">
            {fixture.format === "match" ? (
              <>
                {fixture.homeClub.name} <span className="font-medium text-taupe">vs</span> {fixture.awayClub.name}
              </>
            ) : (
              fixture.title
            )}
          </h3>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-taupe">
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5 text-gold-deep" />
            {date.time} local
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-gold-deep" />
            {fixture.venue.name}, {fixture.venue.city}
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <Smartphone className="size-3.5 text-gold-deep" />
            Mobile tickets
          </span>
          {fixture.highlight ? (
            <span className="flex items-center gap-1.5 font-semibold text-gold-deep">
              <Sparkles className="size-3.5" />
              {fixture.highlight}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line px-1 pt-3 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-end lg:border-0 lg:pt-0 lg:pr-3 lg:pl-6">
        <div className="lg:text-right">
          {unavailable ? (
            <span className="text-[13px] text-taupe">Tickets are sold out</span>
          ) : fixture.availability === "coming-soon" ? (
            <span className="text-[13px] text-taupe">Sign up for ticket updates</span>
          ) : (
            <>
              <span className="block text-[11px] font-bold tracking-[.14em] text-taupe uppercase">From</span>
              <span className="flex items-baseline gap-2 lg:justify-end">
                {fixture.wasPrice ? <s className="text-[14px] text-taupe">{money(fixture.wasPrice)}</s> : null}
                <span className="font-tech text-[26px] leading-none font-extrabold text-ink">{money(fixture.fromPrice)}</span>
                {discount ? (
                  <span className="rounded-full bg-gold-deep px-2 py-0.5 text-[11px] font-bold text-white">−{discount}%</span>
                ) : null}
              </span>
              <span className="text-[12px] text-taupe">per person</span>
            </>
          )}
        </div>
        <Cta fixture={fixture} />
      </div>
    </Link>
  );
}

export function FixtureTile({ fixture, image }: { fixture: FixtureView; image?: string }) {
  const date = dateParts(fixture.kickoff, fixture.timeZone);
  const discount = fixture.wasPrice ? Math.round((1 - fixture.fromPrice / fixture.wasPrice) * 100) : 0;
  return (
    <Link
      href={fixture.href}
      className="group flex h-full flex-col rounded-[28px] border border-line bg-paper p-2 shadow-[0_1px_2px_rgba(26,21,18,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(26,21,18,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cta"
    >
      <span className="relative block h-[170px] overflow-hidden rounded-[22px] bg-[#283f51]">
        <Image
          src={image ?? fixture.heroImage ?? fixture.venue.image}
          alt={`${fixture.venue.name} — illustrative stadium photography`}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(transparent_35%,#1a1512d9)]" />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand-cta backdrop-blur">
          {fixture.competitionInfo.short}
        </span>
        {discount ? (
          <span className="absolute top-3 right-3 rounded-full bg-gold-deep px-2.5 py-1 text-[11px] font-bold text-white">−{discount}%</span>
        ) : null}
        <span className="absolute bottom-3 left-3 flex -space-x-2">
          <ClubBadge club={fixture.homeClub} className="size-9" />
          {fixture.format === "match" ? <ClubBadge club={fixture.awayClub} className="size-9" /> : null}
        </span>
        <span className="absolute right-3 bottom-3 rounded-full bg-black/35 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur">
          {date.weekday} {date.day} {date.month} · {date.time}
        </span>
      </span>
      <span className="flex flex-1 flex-col px-3.5 pt-3.5 pb-2.5">
        <span className="font-tech text-[17px] leading-[1.25] font-bold tracking-[-0.3px] text-ink">{fixture.title}</span>
        <span className="mt-1.5 flex items-center gap-1.5 text-[13px] text-taupe">
          <MapPin className="size-3.5 shrink-0 text-gold-deep" />
          {fixture.venue.name} · {fixture.venue.city}
        </span>
        <span className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="text-[13px] text-taupe">
            {fixture.availability === "sold-out" ? (
              "Sold out"
            ) : fixture.availability === "coming-soon" ? (
              "Available soon"
            ) : (
              <>
                From <strong className="font-tech text-[17px] text-ink">{money(fixture.fromPrice)}</strong>
              </>
            )}
          </span>
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-cta text-white shadow-[0_8px_18px_-8px_rgba(6,50,70,0.8)] transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </span>
    </Link>
  );
}
