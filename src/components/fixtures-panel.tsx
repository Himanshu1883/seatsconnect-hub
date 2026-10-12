"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SearchX,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  currencies,
  fixtureTitle,
  formatPrice,
  hotSearches,
  rails,
  type Currency,
  type Fixture,
  type Sport,
} from "@/lib/catalog";
import { cn } from "cn";

const sportTabs: { id: Sport | ""; label: string }[] = [
  { id: "", label: "All sports" },
  { id: "football", label: "Football" },
  { id: "rugby", label: "Rugby" },
  { id: "tennis", label: "Tennis" },
  { id: "motorsport", label: "Formula 1" },
  { id: "nfl", label: "NFL" },
];

function dateParts(label: string) {
  const parts = label.split(" ");
  if (parts.length === 3) return { month: parts[1], day: parts[0] };
  return { month: parts[1] ?? "", day: parts[0].slice(0, 3) };
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
  const date = dateParts(fixture.dateLabel);

  return (
    <button
      type="button"
      onClick={() => onOpen(fixture)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-[#ece6de] bg-white text-left shadow-[0_1px_2px_rgba(23,23,23,0.04),0_12px_32px_rgba(23,23,23,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#063246]/25 hover:shadow-[0_24px_48px_rgba(6,50,70,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#063246]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-[#efe8de]">
        <Image
          src={fixture.image}
          alt=""
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
        <span className="absolute top-3 left-3 flex min-w-12 flex-col items-center rounded-xl bg-white px-2 py-1.5 text-center shadow-sm">
          <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-[#a77d43] uppercase">
            {date.month}
          </span>
          <span className="font-tech text-lg leading-none font-bold text-[#171717]">{date.day}</span>
        </span>
        {fixture.soldOut ? (
          <span className="absolute top-3 right-3 rounded-full bg-[#17130e]/85 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            Sold out
          </span>
        ) : null}
        <span className="absolute right-3 bottom-3 left-3 truncate font-mono text-[10px] font-semibold tracking-[0.14em] text-white/90 uppercase">
          {fixture.competition}
        </span>
      </span>

      <span className="flex flex-1 flex-col p-4">
        <span className="line-clamp-2 min-h-[2.6em] font-tech text-[1.05rem] leading-[1.3] font-bold text-[#171717]">
          {fixtureTitle(fixture)}
        </span>
        <span className="mt-2 flex items-center gap-1.5 text-xs text-[#7a746c]">
          <MapPin className="size-3.5 shrink-0 text-[#063246]" />
          <span className="truncate">
            {fixture.venue}, {fixture.city}
          </span>
        </span>

        <span className="mt-auto flex items-end justify-between gap-3 border-t border-[#f0ebe4] pt-3.5">
          <span>
            <span className="block font-mono text-[9px] tracking-[0.14em] text-[#8a847c] uppercase">
              {fixture.priceUsd == null ? "Price" : "From"}
            </span>
            <span className="mt-0.5 block font-tech text-lg leading-none font-bold text-[#171717]">
              {fixture.priceUsd == null ? "On request" : formatPrice(fixture.priceUsd, currency)}
            </span>
          </span>
          <span
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 font-tech text-xs font-semibold transition-colors",
              fixture.soldOut
                ? "border border-[#063246]/20 bg-white text-[#063246] group-hover:border-[#063246]"
                : "bg-[#063246] text-white group-hover:bg-[#0a4560]",
            )}
          >
            {fixture.soldOut ? "Join waitlist" : "View tickets"}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </button>
  );
}

function FixtureRow({
  id,
  label,
  fixtures,
  currency,
  onOpen,
}: {
  id: string;
  label: string;
  fixtures: Fixture[];
  currency: Currency;
  onOpen: (fixture: Fixture) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [edges, setEdges] = useState({ prev: false, next: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const prev = el.scrollLeft > 4;
    const next = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setEdges((current) =>
      current.prev === prev && current.next === next ? current : { prev, next },
    );
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el || expanded) return;
    el.scrollTo({ left: 0 });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded, fixtures, measure]);

  function slide(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 280) + 16;
    const perPage = Math.max(1, Math.floor((el.clientWidth + 16) / step));
    el.scrollBy({ left: direction * step * perPage, behavior: "smooth" });
  }

  const canExpand = fixtures.length > 4;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h3 className="font-tech text-xl font-bold tracking-tight text-[#171717] sm:text-2xl">
            {label}
          </h3>
          <span className="rounded-full bg-[#faf6f0] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#8d7350]">
            {fixtures.length}
          </span>
        </div>
        {canExpand ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={`row-${id}`}
            className="group inline-flex shrink-0 items-center gap-1.5 font-tech text-sm font-semibold text-[#063246] transition-colors hover:text-[#0a4560]"
          >
            {expanded ? "Show less" : "View all"}
            <span className="flex size-7 items-center justify-center rounded-full bg-[#063246] text-white transition-colors group-hover:bg-[#0a4560]">
              <ArrowRight
                className={cn("size-3.5 transition-transform", expanded && "-rotate-90")}
              />
            </span>
          </button>
        ) : null}
      </div>

      {expanded ? (
        <div
          id={`row-${id}`}
          className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} currency={currency} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="group/row relative mt-5">
          <div
            id={`row-${id}`}
            ref={scroller}
            onScroll={measure}
            className="-my-3 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {fixtures.map((fixture) => (
              <div
                key={fixture.id}
                className="w-[80%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]"
              >
                <FixtureCard fixture={fixture} currency={currency} onOpen={onOpen} />
              </div>
            ))}
          </div>

          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent transition-opacity",
              edges.prev ? "opacity-100" : "opacity-0",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent transition-opacity",
              edges.next ? "opacity-100" : "opacity-0",
            )}
          />

          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label={`Previous ${label} fixtures`}
            aria-controls={`row-${id}`}
            disabled={!edges.prev}
            className={cn(
              "absolute top-[34%] left-1 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#063246]/15 bg-white text-[#063246] shadow-[0_10px_24px_rgba(6,50,70,0.16)] transition-all hover:border-[#063246] hover:bg-[#063246] hover:text-white sm:left-0 sm:-translate-x-1/2",
              edges.prev ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label={`Next ${label} fixtures`}
            aria-controls={`row-${id}`}
            disabled={!edges.next}
            className={cn(
              "absolute top-[34%] right-1 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#063246] bg-[#063246] text-white shadow-[0_10px_24px_rgba(6,50,70,0.3)] transition-all hover:bg-[#0a4560] sm:right-0 sm:translate-x-1/2",
              edges.next ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export function FixturesPanel({
  fixtures,
  query,
  competition,
  sport,
  currency,
  onQuery,
  onCompetition,
  onSport,
  onCurrency,
  onOpen,
}: {
  fixtures: Fixture[];
  query: string;
  competition: string;
  sport: Sport | "";
  currency: Currency;
  onQuery: (value: string) => void;
  onCompetition: (value: string) => void;
  onSport: (value: Sport | "") => void;
  onCurrency: (value: Currency) => void;
  onOpen: (fixture: Fixture) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = Boolean(query || competition || sport);

  const groups = rails
    .map((item) => {
      if (item.id === "all") return { ...item, fixtures };
      const rail = item.id;
      return { ...item, fixtures: fixtures.filter((fixture) => fixture.rails.includes(rail)) };
    })
    .filter((group) => group.fixtures.length > 0);

  function clearAll() {
    onQuery("");
    onCompetition("");
    onSport("");
  }

  return (
    <section
      id="fixtures"
      className="section-band scroll-mt-24 bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
          <div>
            <span className="eyebrow">
              <span className="relative flex size-1.5">
                <span className="live-ping absolute inset-0 rounded-full bg-[#063246]" />
                <span className="relative size-1.5 rounded-full bg-[#063246]" />
              </span>
              Upcoming events
            </span>
            <h2 className="mt-3 max-w-2xl font-tech text-3xl leading-[1.08] font-bold tracking-[-0.03em] text-[#171717] sm:text-4xl lg:text-[2.75rem]">
              The fixtures fans{" "}
              <span className="text-[#b58b53]">cross borders</span> to see.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-sm leading-6 text-[#6d6458]">
              Premier League, Champions League, La Liga, rugby, tennis and Formula 1. Prices are
              from the published package.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#5c5142]">
              <ShieldCheck className="size-4 text-[#063246]" />
              Seat confirmed before anything is charged
            </p>
          </div>
        </div>

        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            inputRef.current?.blur();
            document
              .getElementById("fixture-results")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="mt-9 rounded-[2rem] border border-[#ece4d8] bg-[#faf7f2] p-2 shadow-[0_18px_50px_rgba(198,159,104,0.14)]"
        >
          <div className="flex flex-col gap-2 rounded-[1.6rem] bg-white p-2 ring-1 ring-[#efe8de] transition-shadow focus-within:ring-2 focus-within:ring-[#063246]/40 md:flex-row md:items-center md:gap-0 md:p-1.5">
            <label className="relative flex min-w-0 flex-1 items-center">
              <Search className="pointer-events-none absolute left-4 size-5 text-[#063246]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                placeholder="Search by club, match, competition, venue or city"
                aria-label="Search fixtures"
                type="search"
                autoComplete="off"
                className="h-14 w-full min-w-0 rounded-[1.25rem] bg-transparent pr-12 pl-12 font-tech text-base text-[#171717] outline-none placeholder:text-[#a59d92] md:h-16 md:text-[17px] [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    onQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 flex size-8 items-center justify-center rounded-full text-[#8a847c] transition-colors hover:bg-[#f6f1ea] hover:text-[#171717]"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </label>

            <div className="flex items-center gap-2 md:pl-2">
              <span className="hidden h-9 w-px bg-[#ece4d8] md:block" aria-hidden="true" />
              <label className="flex h-12 flex-1 items-center gap-2 rounded-full border border-[#ece4d8] px-4 md:h-12 md:flex-none md:border-0">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#8a847c] uppercase">
                  Currency
                </span>
                <select
                  value={currency}
                  onChange={(event) => onCurrency(event.target.value as Currency)}
                  className="cursor-pointer bg-transparent font-tech text-sm font-semibold text-[#171717] outline-none"
                >
                  {(Object.keys(currencies) as Currency[]).map((code) => (
                    <option key={code} value={code}>
                      {currencies[code].symbol} {currencies[code].code}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#063246] px-6 font-tech text-sm font-semibold text-white shadow-[0_8px_20px_rgba(6,50,70,0.3)] transition-all hover:bg-[#0a4560] md:h-[3.25rem] md:px-7"
              >
                <Search className="size-4" />
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto px-3 pt-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 font-mono text-[10px] font-semibold tracking-[0.14em] text-[#8a847c] uppercase">
              Popular
            </span>
            {hotSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onQuery(query === term ? "" : term)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 font-tech text-xs font-semibold transition-colors",
                  query === term
                    ? "border-[#063246] bg-[#063246] text-white"
                    : "border-[#ece4d8] bg-white text-[#063246] hover:border-[#063246]",
                )}
              >
                {term}
              </button>
            ))}
          </div>
        </form>

        <div
          id="fixture-results"
          className="mt-8 flex scroll-mt-28 flex-col gap-4 border-b border-[#f0ebe4] pb-5 md:flex-row md:items-center md:justify-between"
        >
          <div
            role="tablist"
            aria-label="Filter by sport"
            className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sportTabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={sport === tab.id}
                onClick={() => onSport(tab.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 font-tech text-sm font-semibold transition-colors",
                  sport === tab.id
                    ? "bg-[#063246] text-white shadow-[0_8px_20px_rgba(6,50,70,0.25)]"
                    : "text-[#6d6458] hover:bg-[#faf6f0] hover:text-[#171717]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[#6d6458]">
              <span className="font-tech font-bold text-[#171717]">{fixtures.length}</span>{" "}
              {fixtures.length === 1 ? "fixture" : "fixtures"}
            </span>
            {competition ? (
              <button
                type="button"
                onClick={() => onCompetition("")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#faf6f0] px-3 py-1 text-xs font-semibold text-[#5c5142] hover:bg-[#f3e4c8]"
              >
                {competition}
                <X className="size-3" />
              </button>
            ) : null}
            {filtered ? (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-[#063246] underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-[1.75rem] border border-dashed border-[#e6ded2] bg-[#fcfaf7] px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-white text-[#063246] shadow-sm">
              <SearchX className="size-6" />
            </span>
            <p className="mt-5 font-tech text-xl font-bold text-[#171717]">
              Nothing matches that search.
            </p>
            <p className="mt-2 max-w-sm text-sm text-[#7a746c]">
              Try a club, a city, or a different sport. Our team can also source fixtures that
              aren&apos;t listed yet.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#063246] px-6 font-tech text-sm font-semibold text-white transition-colors hover:bg-[#0a4560]"
            >
              Show every fixture
              <ArrowRight className="size-4" />
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            {groups.map((group) => (
              <FixtureRow
                key={group.id}
                id={group.id}
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
