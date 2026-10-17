"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import type { FixtureView } from "@/lib/sports/types";
import { dateParts } from "@/lib/sports/format";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { FixtureRow } from "./fixture-card";
import { cn } from "cn";

type Sort = "date-asc" | "date-desc" | "price-asc" | "price-desc";
type Preset = "any" | "week" | "month" | "quarter" | "custom";

const sorts: { id: Sort; label: string }[] = [
  { id: "date-asc", label: "Date: soonest first" },
  { id: "date-desc", label: "Date: latest first" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const presets: { id: Preset; label: string; days?: number }[] = [
  { id: "any", label: "Any date" },
  { id: "week", label: "This week", days: 7 },
  { id: "month", label: "This month", days: 31 },
  { id: "quarter", label: "Next 3 months", days: 92 },
];

const PAGE = 10;

type Facet = { key: string; label: string; count: number };

function facet(list: FixtureView[], pick: (fixture: FixtureView) => [string, string]): Facet[] {
  const map = new Map<string, Facet>();
  for (const fixture of list) {
    const [key, label] = pick(fixture);
    const entry = map.get(key) ?? { key, label, count: 0 };
    entry.count += 1;
    map.set(key, entry);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function toggle(list: string[], key: string) {
  return list.includes(key) ? list.filter((item) => item !== key) : [...list, key];
}

function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-line py-4 last:border-0">
      <summary className="flex cursor-pointer list-none items-center justify-between font-tech text-[14px] font-bold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 text-taupe transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function CheckList({ items, selected, onToggle }: { items: Facet[]; selected: string[]; onToggle: (key: string) => void }) {
  const [all, setAll] = useState(false);
  const visible = all ? items : items.slice(0, 6);
  return (
    <div className="space-y-1">
      {visible.map((item) => (
        <label
          key={item.key}
          className="flex cursor-pointer items-center gap-3 rounded-[12px] px-2 py-1.5 text-[14px] text-ink transition-colors hover:bg-sand"
        >
          <input
            type="checkbox"
            checked={selected.includes(item.key)}
            onChange={() => onToggle(item.key)}
            className="size-4 rounded accent-brand-cta"
          />
          <span className="flex-1 truncate">{item.label}</span>
          <span className="text-[12px] text-taupe">({item.count})</span>
        </label>
      ))}
      {items.length > 6 ? (
        <button
          type="button"
          onClick={() => setAll((value) => !value)}
          className="mt-1 px-2 text-[13px] font-bold text-brand-cta hover:underline"
        >
          {all ? "Show less" : `Show ${items.length - 6} more`}
        </button>
      ) : null}
    </div>
  );
}

const input =
  "w-full rounded-[12px] border border-line bg-white px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-brand-cta";

export function FixtureExplorer({
  fixtures,
  showCompetition = true,
  title = "Upcoming events",
  emptyHint,
  homeLabel = "Home team",
  opponentLabel = "Opponent",
}: {
  fixtures: FixtureView[];
  showCompetition?: boolean;
  title?: string;
  emptyHint?: string;
  homeLabel?: string;
  opponentLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 200);
  const [sort, setSort] = useState<Sort>("date-asc");
  const [preset, setPreset] = useState<Preset>("any");
  const [range, setRange] = useState<{ from: string; to: string }>({ from: "", to: "" });
  const [price, setPrice] = useState<{ min: string; max: string }>({ min: "", max: "" });
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [homes, setHomes] = useState<string[]>([]);
  const [opponents, setOpponents] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [panel, setPanel] = useState(false);

  const facets = useMemo(
    () => ({
      competitions: facet(fixtures, (f) => [f.competition, f.competitionInfo.short]),
      homes: facet(fixtures, (f) => [f.home, f.homeClub.name]),
      opponents: facet(fixtures, (f) => [f.away, f.awayClub.name]),
      cities: facet(fixtures, (f) => [f.venue.city, f.venue.city]),
    }),
    [fixtures],
  );

  function choosePreset(id: Preset) {
    setPreset(id);
    setLimit(PAGE);
    const days = presets.find((item) => item.id === id)?.days;
    if (!days) {
      setRange({ from: "", to: "" });
      return;
    }
    const from = new Date();
    const to = new Date(from.getTime() + days * 86_400_000);
    setRange({ from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) });
  }

  const results = useMemo(() => {
    const text = debounced.trim().toLowerCase();
    const min = Number(price.min) || 0;
    const max = Number(price.max) || Infinity;
    const list = fixtures.filter((f) => {
      const day = f.kickoff.slice(0, 10);
      if (text && !`${f.title} ${f.venue.name} ${f.venue.city} ${f.competitionInfo.name}`.toLowerCase().includes(text)) return false;
      if (range.from && day < range.from) return false;
      if (range.to && day > range.to) return false;
      if (f.fromPrice < min || f.fromPrice > max) return false;
      if (competitions.length && !competitions.includes(f.competition)) return false;
      if (homes.length && !homes.includes(f.home)) return false;
      if (opponents.length && !opponents.includes(f.away)) return false;
      if (cities.length && !cities.includes(f.venue.city)) return false;
      if (hideSoldOut && f.availability === "sold-out") return false;
      if (onSaleOnly && (f.availability === "sold-out" || f.availability === "coming-soon")) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "date-desc") sorted.reverse();
    if (sort === "price-asc") sorted.sort((a, b) => a.fromPrice - b.fromPrice);
    if (sort === "price-desc") sorted.sort((a, b) => b.fromPrice - a.fromPrice);
    return sorted;
  }, [fixtures, debounced, range, price, competitions, homes, opponents, cities, hideSoldOut, onSaleOnly, sort]);

  const visible = results.slice(0, limit);
  const groups = useMemo(() => {
    if (sort.startsWith("price")) return [{ label: "", items: visible }];
    const map = new Map<string, FixtureView[]>();
    for (const fixture of visible) {
      const label = dateParts(fixture.kickoff, fixture.timeZone).monthLong;
      map.set(label, [...(map.get(label) ?? []), fixture]);
    }
    return [...map.entries()].map(([label, items]) => ({ label, items }));
  }, [visible, sort]);

  const active: { label: string; clear: () => void }[] = [
    ...(preset !== "any" && preset !== "custom" ? [{ label: presets.find((p) => p.id === preset)!.label, clear: () => choosePreset("any") }] : []),
    ...(preset === "custom" && (range.from || range.to)
      ? [{ label: `${range.from || "…"} → ${range.to || "…"}`, clear: () => choosePreset("any") }]
      : []),
    ...(price.min || price.max ? [{ label: `£${price.min || 0} – £${price.max || "any"}`, clear: () => setPrice({ min: "", max: "" }) }] : []),
    ...competitions.map((key) => ({ label: facets.competitions.find((f) => f.key === key)?.label ?? key, clear: () => setCompetitions((l) => toggle(l, key)) })),
    ...homes.map((key) => ({ label: facets.homes.find((f) => f.key === key)?.label ?? key, clear: () => setHomes((l) => toggle(l, key)) })),
    ...opponents.map((key) => ({ label: `vs ${facets.opponents.find((f) => f.key === key)?.label ?? key}`, clear: () => setOpponents((l) => toggle(l, key)) })),
    ...cities.map((key) => ({ label: key, clear: () => setCities((l) => toggle(l, key)) })),
    ...(hideSoldOut ? [{ label: "Hide sold out", clear: () => setHideSoldOut(false) }] : []),
    ...(onSaleOnly ? [{ label: "On sale now", clear: () => setOnSaleOnly(false) }] : []),
  ];

  function clearAll() {
    choosePreset("any");
    setPrice({ min: "", max: "" });
    setCompetitions([]);
    setHomes([]);
    setOpponents([]);
    setCities([]);
    setHideSoldOut(false);
    setOnSaleOnly(false);
    setQuery("");
  }

  const filters = (
    <div className="rounded-[26px] border border-line bg-paper px-5 py-2 shadow-[0_1px_2px_rgba(26,21,18,0.04)]">
      <FilterGroup title="Date">
        <div className="flex flex-wrap gap-2">
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => choosePreset(item.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
                preset === item.id ? "bg-brand-cta text-white" : "bg-sand text-ink hover:bg-line",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="text-[12px] font-semibold text-taupe">
            From date
            <input
              type="date"
              value={range.from}
              onChange={(e) => {
                setPreset("custom");
                setRange((r) => ({ ...r, from: e.target.value }));
              }}
              className={cn(input, "mt-1")}
            />
          </label>
          <label className="text-[12px] font-semibold text-taupe">
            To date
            <input
              type="date"
              value={range.to}
              onChange={(e) => {
                setPreset("custom");
                setRange((r) => ({ ...r, to: e.target.value }));
              }}
              className={cn(input, "mt-1")}
            />
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="Price per person">
        <div className="grid grid-cols-2 gap-2">
          <label className="text-[12px] font-semibold text-taupe">
            From £
            <input inputMode="numeric" placeholder="0" value={price.min} onChange={(e) => setPrice((p) => ({ ...p, min: e.target.value.replace(/\D/g, "") }))} className={cn(input, "mt-1")} />
          </label>
          <label className="text-[12px] font-semibold text-taupe">
            To £
            <input inputMode="numeric" placeholder="Any" value={price.max} onChange={(e) => setPrice((p) => ({ ...p, max: e.target.value.replace(/\D/g, "") }))} className={cn(input, "mt-1")} />
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="flex cursor-pointer items-center gap-3 px-2 py-1.5 text-[14px]">
          <input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} className="size-4 accent-brand-cta" />
          On sale now
        </label>
        <label className="flex cursor-pointer items-center gap-3 px-2 py-1.5 text-[14px]">
          <input type="checkbox" checked={hideSoldOut} onChange={(e) => setHideSoldOut(e.target.checked)} className="size-4 accent-brand-cta" />
          Hide sold-out events
        </label>
      </FilterGroup>
      {showCompetition && facets.competitions.length > 1 ? (
        <FilterGroup title="Competition">
          <CheckList items={facets.competitions} selected={competitions} onToggle={(key) => setCompetitions((l) => toggle(l, key))} />
        </FilterGroup>
      ) : null}
      {facets.homes.length > 1 ? (
        <FilterGroup title={homeLabel}>
          <CheckList items={facets.homes} selected={homes} onToggle={(key) => setHomes((l) => toggle(l, key))} />
        </FilterGroup>
      ) : null}
      {facets.opponents.length > 1 && fixtures.some((fixture) => fixture.format === "match") ? (
        <FilterGroup title={opponentLabel} defaultOpen={false}>
          <CheckList items={facets.opponents} selected={opponents} onToggle={(key) => setOpponents((l) => toggle(l, key))} />
        </FilterGroup>
      ) : null}
      {facets.cities.length > 1 ? (
        <FilterGroup title="Location" defaultOpen={false}>
          <CheckList items={facets.cities} selected={cities} onToggle={(key) => setCities((l) => toggle(l, key))} />
        </FilterGroup>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className={cn("lg:sticky lg:top-[110px] lg:block lg:self-start", panel ? "block" : "hidden")}>{filters}</aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 rounded-[24px] border border-line bg-paper p-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search events</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-taupe" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Search team, stadium or city"
              className="w-full rounded-full bg-cream py-3 pr-4 pl-11 text-[14px] outline-none placeholder:text-taupe focus:ring-2 focus:ring-brand-cta/30"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPanel((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-3 text-[13px] font-bold text-brand-cta lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Filters{active.length ? ` (${active.length})` : ""}
            </button>
            <label className="relative">
              <span className="sr-only">Sort events</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="cursor-pointer appearance-none rounded-full border border-line-strong bg-white py-3 pr-10 pl-4 text-[13px] font-bold text-brand-cta outline-none"
              >
                {sorts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-brand-cta" />
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 font-tech text-[18px] font-bold text-ink">
            {title} <span className="font-medium text-taupe">· {results.length} events</span>
          </h2>
          {active.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.clear}
              className="flex items-center gap-1.5 rounded-full bg-[#eef3f5] px-3 py-1.5 text-[12.5px] font-semibold text-brand-cta hover:bg-[#dfe9ee]"
            >
              {item.label}
              <X className="size-3.5" />
            </button>
          ))}
          {active.length ? (
            <button type="button" onClick={clearAll} className="text-[13px] font-bold text-taupe underline-offset-2 hover:underline">
              Clear all
            </button>
          ) : null}
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded-[26px] border border-dashed border-line-strong bg-paper p-10 text-center">
            <strong className="font-tech text-[20px] text-ink">No events match these filters</strong>
            <p className="mx-auto mt-2 max-w-[420px] text-[15px] text-taupe">
              {emptyHint ?? "Try widening the dates or clearing a filter — or ask a specialist to source seats for you."}
            </p>
            <button type="button" onClick={clearAll} className="mt-5 rounded-full bg-brand-cta px-5 py-3 font-tech text-[13px] font-bold text-white">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-8">
            {groups.map((group) => (
              <section key={group.label || "all"} aria-label={group.label || "Results"}>
                {group.label ? (
                  <div className="mb-3 flex items-center gap-3">
                    <span className="over text-gold-deep">{group.label}</span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="text-[12px] text-taupe">{group.items.length} events</span>
                  </div>
                ) : null}
                <div className="space-y-3">
                  {group.items.map((fixture) => (
                    <FixtureRow key={`${fixture.competition}-${fixture.slug}`} fixture={fixture} showCompetition={showCompetition} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {results.length > PAGE ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-[13px] text-taupe">
              {Math.min(limit, results.length)} of {results.length} events seen
            </span>
            <span className="h-1.5 w-56 overflow-hidden rounded-full bg-line">
              <span className="block h-full rounded-full bg-brand-cta" style={{ width: `${(Math.min(limit, results.length) / results.length) * 100}%` }} />
            </span>
            {limit < results.length ? (
              <button
                type="button"
                onClick={() => setLimit((value) => value + PAGE)}
                className="mt-1 rounded-full border border-brand-cta bg-white px-6 py-3 font-tech text-[13px] font-bold text-brand-cta transition-colors hover:bg-brand-cta hover:text-white"
              >
                Show more events
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
