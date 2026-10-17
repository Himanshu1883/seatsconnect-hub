"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Shield, Ticket, Trophy } from "lucide-react";
import { useDebouncedValue } from "@/lib/use-debounced-value";

export type SearchItem = { label: string; sub: string; href: string; kind: "competition" | "club" | "match" };

const icons = { competition: Trophy, club: Shield, match: Ticket };
const kinds = { competition: "Competition", club: "Club", match: "Match" };

export function HubSearch({ items, popular }: { items: SearchItem[]; popular: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const term = useDebouncedValue(query, 150).trim().toLowerCase();
  const results = term ? items.filter((item) => `${item.label} ${item.sub}`.toLowerCase().includes(term)).slice(0, 7) : [];

  return (
    <div className="relative">
      <label className="relative block">
        <span className="sr-only">Search football tickets</span>
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-taupe" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          placeholder="Search a club, match or competition"
          className="w-full rounded-full border border-white/20 bg-white py-4 pr-5 pl-13 text-[15px] text-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] outline-none placeholder:text-taupe focus:ring-4 focus:ring-white/25"
          aria-autocomplete="list"
          aria-controls="hub-search-results"
        />
      </label>
      {focused && term ? (
        <ul
          id="hub-search-results"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[24px] border border-line bg-paper p-2 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
        >
          {results.length ? (
            results.map((item) => {
              const Icon = icons[item.kind];
              return (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center gap-3 rounded-[16px] px-3 py-2.5 transition-colors hover:bg-sand">
                    <span className="flex size-9 items-center justify-center rounded-[12px] bg-[#eef3f5] text-brand-cta">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-[14.5px]">{item.label}</strong>
                      <span className="block truncate text-[12.5px] text-taupe">
                        {kinds[item.kind]} · {item.sub}
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-brand-cta" />
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-3 text-[14px] text-taupe">No matches — a specialist can still source tickets for you.</li>
          )}
        </ul>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
        <span className="text-white/60">Popular:</span>
        {popular.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-brand-cta"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
