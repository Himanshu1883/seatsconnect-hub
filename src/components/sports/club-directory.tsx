"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import type { Club, FixtureView, Venue } from "@/lib/sports/types";
import { dateParts } from "@/lib/sports/format";
import { ClubBadge } from "./primitives";
import { cn } from "cn";

export type DirectoryClub = Club & { venueInfo: Venue; next?: FixtureView; count: number };

export function ClubDirectory({
  clubs,
  grouped = true,
  hrefBase,
  countLabel = "match",
  countLabelPlural = "matches",
  allLabel = "All clubs",
  inLabel = "Top clubs in",
  searchPlaceholder = "Search clubs or stadiums",
}: {
  clubs: DirectoryClub[];
  grouped?: boolean;
  hrefBase?: string;
  countLabel?: string;
  countLabelPlural?: string;
  allLabel?: string;
  inLabel?: string;
  searchPlaceholder?: string;
}) {
  const countries = useMemo(() => {
    const counts = new Map<string, number>();
    for (const club of clubs) counts.set(club.country, (counts.get(club.country) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [clubs]);
  const [country, setCountry] = useState<string>(grouped ? "All" : (countries[0]?.[0] ?? "All"));
  const [query, setQuery] = useState("");

  const list = clubs.filter(
    (club) =>
      (country === "All" || club.country === country) &&
      `${club.name} ${club.venueInfo.name} ${club.city}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const letters = grouped
    ? [...new Set(list.map((club) => club.name[0].toUpperCase()))].map((letter) => ({
        letter,
        items: list.filter((club) => club.name[0].toUpperCase() === letter),
      }))
    : [{ letter: "", items: list }];

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filter clubs by country" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {[...(grouped ? [["All", clubs.length] as const] : []), ...countries].map(([name, count]) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={country === name}
              onClick={() => setCountry(name)}
              className={cn(
                "rounded-full px-4 py-2 font-tech text-[13px] font-bold whitespace-nowrap transition-colors",
                country === name ? "bg-brand-cta text-white" : "border border-line bg-white text-ink hover:border-brand-cta hover:text-brand-cta",
              )}
            >
              {name === "All" ? allLabel : `${inLabel} ${name}`}
              <span className={cn("ml-1.5 text-[11px]", country === name ? "text-white/70" : "text-taupe")}>{count}</span>
            </button>
          ))}
        </div>
        {grouped ? (
          <label className="relative md:w-[300px]">
            <span className="sr-only">Search clubs</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-taupe" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-line bg-white py-3 pr-4 pl-11 text-[14px] outline-none focus:border-brand-cta"
            />
          </label>
        ) : null}
      </div>

      <div className="mt-6 space-y-8">
        {letters.map((group) => (
          <div key={group.letter || "all"}>
            {group.letter ? (
              <div className="mb-3 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[12px] bg-ink font-tech text-[16px] font-bold text-white">{group.letter}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.items.map((club) => {
                const next = club.next ? dateParts(club.next.kickoff, club.next.timeZone) : null;
                return (
                  <Link
                    key={club.slug}
                    href={hrefBase ? `${hrefBase}/${club.slug}` : `/football/clubs/${club.slug}`}
                    className="group flex items-center gap-4 rounded-[22px] border border-line bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_20px_40px_-28px_rgba(26,21,18,0.45)]"
                  >
                    <ClubBadge club={club} className="size-12" />
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate font-tech text-[15.5px] text-ink">{club.name}</strong>
                      <span className="block truncate text-[13px] text-taupe">
                        {club.venueInfo.name} · {club.city}
                      </span>
                      {next ? (
                        <span className="mt-1 block text-[12px] font-semibold text-gold-deep">
                          {next.day} {next.month} onwards · {club.count} {club.count === 1 ? countLabel : countLabelPlural}
                        </span>
                      ) : null}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-brand-cta transition-transform group-hover:rotate-45" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        {list.length === 0 ? <p className="rounded-[22px] border border-dashed border-line-strong p-8 text-center text-taupe">No clubs match your search.</p> : null}
      </div>
    </div>
  );
}
