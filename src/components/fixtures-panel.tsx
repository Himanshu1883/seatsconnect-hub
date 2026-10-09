"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  currencies,
  fixtureTitle,
  formatPrice,
  hotSearches,
  rails,
  type Currency,
  type Fixture,
} from "@/lib/catalog";
import { cn } from "cn";

const previewCount = 4;

function FixtureGroup({
  label,
  fixtures,
  currency,
  onOpen,
}: {
  label: string;
  fixtures: Fixture[];
  currency: Currency;
  onOpen: (fixture: Fixture) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasMore = fixtures.length > previewCount;
  const shown = open || !hasMore ? fixtures : fixtures.slice(0, previewCount);
  const hidden = fixtures.length - previewCount;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h3 className="font-tech text-2xl font-bold tracking-tight text-brand-dark">{label}</h3>
        <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-brand-gray uppercase">
          {fixtures.length} {fixtures.length === 1 ? "fixture" : "fixtures"}
        </p>
      </div>
      <div
        className={cn(
          "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          hasMore ? "xl:grid-cols-5" : "xl:grid-cols-4",
        )}
      >
        {shown.map((fixture) => (
          <FixtureCard
            key={fixture.id}
            fixture={fixture}
            currency={currency}
            onOpen={onOpen}
          />
        ))}
        {hasMore ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="group flex min-h-72 flex-col items-start justify-between rounded-2xl border border-[#e6dccf] bg-[#faf7f2] p-5 text-left transition-colors hover:border-[#c69b60] hover:bg-white"
          >
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#8d7350] uppercase">
              {open ? "Show less" : "See more"}
            </span>
            <span>
              <span className="block font-tech text-3xl leading-none font-bold tracking-tight text-brand-dark">
                {open ? "4" : `+${hidden}`}
              </span>
              <span className="mt-2 block text-sm text-brand-gray">
                {open ? "Back to the first four" : "More fixtures in this list"}
              </span>
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-[#c69b60] text-[#17130e] transition-transform group-hover:translate-x-0.5">
              <ArrowRight className={cn("size-4", open && "rotate-180")} />
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

function FixtureCard({
  fixture,
  currency,
  onOpen,
}: {
  fixture: Fixture;
  currency: Currency;
  onOpen: (fixture: Fixture) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(fixture)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ece7e1] bg-white text-left shadow-[0_10px_28px_rgba(23,23,23,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c69b60]/55 hover:shadow-[0_16px_36px_rgba(23,23,23,0.08)]"
    >
      <span className="relative block h-40 overflow-hidden">
        <Image
          src={fixture.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        <span className="absolute top-3 left-3 max-w-[70%] truncate rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-brand-dark uppercase">
          {fixture.competition}
        </span>
        {fixture.soldOut ? (
          <span className="absolute top-3 right-3 rounded-full bg-[#17130e]/85 px-2.5 py-1 text-[10px] font-semibold text-white">
            Sold out
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#8d7350] uppercase">
          {fixture.dateLabel}
        </span>
        <span className="mt-1.5 line-clamp-2 font-tech text-[1.05rem] leading-snug font-bold text-brand-dark">
          {fixtureTitle(fixture)}
        </span>
        <span className="mt-1.5 line-clamp-1 text-xs text-brand-gray">
          {fixture.venue}, {fixture.city}
        </span>
        <span className="mt-4 flex items-end justify-between gap-3 border-t border-[#efeae4] pt-3">
          <span>
            <span className="block font-mono text-[9px] tracking-[0.14em] text-brand-gray uppercase">
              {fixture.priceUsd == null ? "Price" : "From"}
            </span>
            <span className="mt-1 block font-tech text-base font-bold text-brand-dark">
              {fixture.priceUsd == null ? "On request" : formatPrice(fixture.priceUsd, currency)}
            </span>
          </span>
          <span className="flex size-8 items-center justify-center rounded-full border border-[#e8e5e0] text-[#5c5142] transition-colors group-hover:border-[#c69b60] group-hover:bg-[#c69b60] group-hover:text-[#17130e]">
            <ArrowRight className="size-3.5" />
          </span>
        </span>
      </span>
    </button>
  );
}

export function FixturesPanel({
  fixtures,
  query,
  competition,
  currency,
  onQuery,
  onCompetition,
  onCurrency,
  onOpen,
}: {
  fixtures: Fixture[];
  query: string;
  competition: string;
  currency: Currency;
  onQuery: (value: string) => void;
  onCompetition: (value: string) => void;
  onCurrency: (value: Currency) => void;
  onOpen: (fixture: Fixture) => void;
}) {
  const groups = rails
    .map((item) => {
      if (item.id === "all") {
        return { ...item, fixtures };
      }
      const rail = item.id;
      return {
        ...item,
        fixtures: fixtures.filter((fixture) => fixture.rails.includes(rail)),
      };
    })
    .filter((group) => group.fixtures.length > 0);
  return (
    <section id="fixtures" className="section-band scroll-mt-24 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <span className="eyebrow">
              <span className="relative flex size-1.5">
                <span className="live-ping absolute inset-0 rounded-full bg-brand-cta" />
                <span className="relative size-1.5 rounded-full bg-brand-cta" />
              </span>
              Upcoming events
            </span>
            <h2 className="mt-3 max-w-2xl font-tech text-3xl leading-[1.1] font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.65rem]">
              The fixtures fans cross borders to see.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-brand-gray lg:justify-self-end">
            Premier League, Champions League, La Liga, rugby, tennis and Formula 1. Prices are
            from the published package. We confirm the seat before anything is charged.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {hotSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onQuery(term)}
              className={cn(
                "rounded-full border px-3 py-1 font-tech text-xs font-semibold transition-colors",
                query === term
                  ? "border-brand-cta bg-brand-cta text-white"
                  : "border-brand-cta/15 bg-cream text-brand-gray hover:border-brand-orange hover:text-brand-dark",
              )}
            >
              {term}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-brand-gray" />
              <Input
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Search clubs, competitions, cities…"
                aria-label="Search fixtures"
                className="h-11 rounded-xl border-brand-cta/15 bg-white pl-9 font-tech text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-brand-gray">
              Currency
              <select
                value={currency}
                onChange={(event) => onCurrency(event.target.value as Currency)}
                className="h-11 rounded-xl border border-brand-cta/15 bg-white px-3 font-tech text-sm text-brand-dark"
              >
                {(Object.keys(currencies) as Currency[]).map((code) => (
                  <option key={code} value={code}>
                    {currencies[code].code}
                  </option>
                ))}
              </select>
            </label>
        </div>

        {competition ? (
          <button
            type="button"
            onClick={() => onCompetition("")}
            className="mt-4 rounded-full bg-brand-cta px-3 py-1.5 font-tech text-xs font-semibold text-white"
          >
            {competition} ×
          </button>
        ) : null}

        {groups.length === 0 ? (
          <div className="mt-8 px-5 py-14 text-center">
            <p className="font-tech text-lg font-bold text-brand-dark">Nothing matches that search.</p>
            <p className="mt-2 text-sm text-brand-gray">
              Try a club, a city, or clear the competition filter.
            </p>
            <button
              type="button"
              className="mt-4 font-tech text-sm font-semibold text-brand-cta hover:text-brand-orange"
              onClick={() => {
                onQuery("");
                onCompetition("");
              }}
            >
              Show every fixture
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {groups.map((group) => (
              <FixtureGroup
                key={group.id}
                label={group.label}
                fixtures={group.fixtures}
                currency={currency}
                onOpen={onOpen}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
