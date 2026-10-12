"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Clock,
  CornerDownLeft,
  Loader2,
  MapPin,
  Search,
  SearchX,
  TrendingUp,
  X,
} from "lucide-react";
import {
  fixtures as catalog,
  fixtureTitle,
  formatPrice,
  hotSearches,
  type Currency,
  type Fixture,
} from "@/lib/catalog";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { cn } from "cn";

const recentKey = "seatsconnect:recent-searches";
const maxResults = 8;
const trending = catalog.filter((fixture) => !fixture.soldOut).slice(0, 4);

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function searchFixtures(term: string) {
  const tokens = normalize(term).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return catalog
    .flatMap((fixture) => {
      const title = normalize(fixtureTitle(fixture));
      const haystack = normalize(
        [
          fixture.home,
          fixture.away,
          fixture.competition,
          fixture.city,
          fixture.venue,
          fixture.sport,
          fixture.dateLabel,
        ].join(" "),
      );
      if (!tokens.every((token) => haystack.includes(token))) return [];

      const words = title.split(/\s+/);
      let score = fixture.soldOut ? -1 : 0;
      for (const token of tokens) {
        if (title.startsWith(token)) score += 6;
        else if (words.some((word) => word.startsWith(token))) score += 4;
        else if (title.includes(token)) score += 3;
        else score += 1;
      }
      return [{ fixture, score }];
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.fixture);
}

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(recentKey) ?? "[]");
    return Array.isArray(stored) ? stored.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function Highlight({ text, term }: { text: string; term: string }) {
  const tokens = term.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);
  if (tokens.length === 0) return <>{text}</>;
  const parts = text.split(new RegExp(`(${tokens.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark key={index} className="rounded-sm bg-[#f3e4c8] px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function ResultRow({
  fixture,
  term,
  currency,
  active,
  onHover,
  onSelect,
}: {
  fixture: Fixture;
  term: string;
  currency: Currency;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        data-active={active}
        onMouseMove={onHover}
        onClick={onSelect}
        className={cn(
          "flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 text-left transition-colors",
          active ? "bg-[#f8f2e8]" : "hover:bg-[#faf7f2]",
        )}
      >
        <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#efe8de]">
          <Image src={fixture.image} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-tech text-[15px] font-bold text-[#171717]">
            <Highlight text={fixtureTitle(fixture)} term={term} />
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#7a746c]">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {fixture.dateLabel}
            </span>
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">
                {fixture.venue}, {fixture.city}
              </span>
            </span>
          </span>
          <span className="mt-1.5 inline-flex rounded-full border border-[#ece4d8] px-2 py-0.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-[#8d7350] uppercase">
            {fixture.competition}
          </span>
        </span>
        <span className="hidden shrink-0 text-right sm:block">
          {fixture.soldOut ? (
            <span className="rounded-full bg-[#17130e] px-2.5 py-1 text-[11px] font-semibold text-white">
              Sold out
            </span>
          ) : (
            <>
              <span className="block font-mono text-[9px] tracking-[0.14em] text-[#8a847c] uppercase">
                From
              </span>
              <span className="block font-tech text-base font-bold text-[#171717]">
                {formatPrice(fixture.priceUsd, currency)}
              </span>
            </>
          )}
        </span>
        <ArrowRight
          className={cn(
            "size-4 shrink-0 transition-all",
            active ? "translate-x-0 text-[#063246] opacity-100" : "-translate-x-1 opacity-0",
          )}
        />
      </button>
    </li>
  );
}

function SkeletonRow() {
  return (
    <li className="flex items-center gap-3.5 px-3 py-2.5">
      <span className="size-14 shrink-0 animate-pulse rounded-xl bg-[#f1ece5]" />
      <span className="flex-1 space-y-2">
        <span className="block h-3.5 w-2/3 animate-pulse rounded-full bg-[#f1ece5]" />
        <span className="block h-3 w-1/2 animate-pulse rounded-full bg-[#f4f0ea]" />
      </span>
    </li>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-[#e6ded2] bg-white px-1 font-mono text-[10px] font-semibold text-[#6d6458] shadow-[0_1px_0_#e6ded2]">
      {children}
    </kbd>
  );
}

export function SearchDialog({
  open,
  onOpenChange,
  currency,
  onSelect,
  onSeeAll,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currency: Currency;
  onSelect: (fixture: Fixture) => void;
  onSeeAll: (term: string) => void;
}) {
  const [term, setTerm] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>(readRecent);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debounced = useDebouncedValue(term, 250);
  const query = term.trim() === "" ? "" : debounced.trim();
  const pending = term.trim() !== query;
  const results = useMemo(() => searchFixtures(query), [query]);
  const shown = query ? results.slice(0, maxResults) : trending;
  const activeIndex = Math.min(active, Math.max(shown.length - 1, 0));

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function remember(value: string) {
    const cleaned = value.trim();
    if (!cleaned) return;
    const next = [cleaned, ...recent.filter((item) => item.toLowerCase() !== cleaned.toLowerCase())].slice(0, 5);
    setRecent(next);
    try {
      window.localStorage.setItem(recentKey, JSON.stringify(next));
    } catch {}
  }

  function clearRecent() {
    setRecent([]);
    try {
      window.localStorage.removeItem(recentKey);
    } catch {}
  }

  function close() {
    onOpenChange(false);
    setTerm("");
    setActive(0);
  }

  function select(fixture: Fixture) {
    remember(query || fixtureTitle(fixture));
    close();
    onSelect(fixture);
  }

  function seeAll(value = query) {
    if (!value.trim()) return;
    remember(value);
    close();
    onSeeAll(value.trim());
  }

  function updateTerm(value: string) {
    setTerm(value);
    setActive(0);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (shown.length) setActive((activeIndex + 1) % shown.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (shown.length) setActive((activeIndex - 1 + shown.length) % shown.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (pending) return;
      const fixture = shown[activeIndex];
      if (fixture) select(fixture);
      else seeAll();
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (next) onOpenChange(true);
        else close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#110f0c]/60 backdrop-blur-sm duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Popup
          initialFocus={inputRef}
          className="fixed top-[8vh] left-1/2 z-50 flex max-h-[84vh] w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_40px_120px_rgba(10,8,6,0.45)] ring-1 ring-black/5 outline-none duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <Dialog.Title className="sr-only">Search fixtures</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search matches, clubs, competitions, venues and cities.
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b border-[#f0ebe4] px-5">
            {pending ? (
              <Loader2 className="size-5 shrink-0 animate-spin text-[#063246]" />
            ) : (
              <Search className="size-5 shrink-0 text-[#063246]" />
            )}
            <input
              ref={inputRef}
              value={term}
              onChange={(event) => updateTerm(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search clubs, matches, venues, cities…"
              aria-label="Search fixtures"
              role="combobox"
              aria-expanded={shown.length > 0}
              aria-controls="search-dialog-results"
              autoComplete="off"
              spellCheck={false}
              className="h-16 min-w-0 flex-1 bg-transparent font-tech text-base text-[#171717] outline-none placeholder:text-[#a59d92] sm:text-lg"
            />
            {term ? (
              <button
                type="button"
                onClick={() => {
                  updateTerm("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="flex size-8 items-center justify-center rounded-full text-[#8a847c] transition-colors hover:bg-[#f6f1ea] hover:text-[#171717]"
              >
                <X className="size-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={close}
              className="hidden rounded-md border border-[#e6ded2] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#6d6458] hover:bg-[#faf7f2] sm:block"
            >
              ESC
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-3">
            {!query ? (
              <>
                {recent.length ? (
                  <div className="px-2.5 pb-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#8a847c] uppercase">
                        Recent searches
                      </p>
                      <button
                        type="button"
                        onClick={clearRecent}
                        className="text-xs font-medium text-[#8a847c] hover:text-[#171717]"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recent.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => updateTerm(item)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#ece4d8] bg-white px-3 py-1.5 text-xs font-medium text-[#3f3a33] transition-colors hover:border-[#063246]"
                        >
                          <Clock className="size-3.5 text-[#063246]" />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="px-2.5 pb-3">
                  <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#8a847c] uppercase">
                    Popular searches
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hotSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => updateTerm(item)}
                        className="rounded-full bg-[#faf6f0] px-3 py-1.5 text-xs font-semibold text-[#5c5142] transition-colors hover:bg-[#f3e4c8] hover:text-[#171717]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="flex items-center gap-1.5 px-2.5 pt-2 pb-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-[#8a847c] uppercase">
                  <TrendingUp className="size-3.5 text-[#063246]" />
                  Trending fixtures
                </p>
                <ul ref={listRef} id="search-dialog-results" role="listbox" className="space-y-0.5">
                  {trending.map((fixture, index) => (
                    <ResultRow
                      key={fixture.id}
                      fixture={fixture}
                      term=""
                      currency={currency}
                      active={index === activeIndex}
                      onHover={() => setActive(index)}
                      onSelect={() => select(fixture)}
                    />
                  ))}
                </ul>
              </>
            ) : results.length === 0 && !pending ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#eef3f5] text-[#063246]">
                  <SearchX className="size-5" />
                </span>
                <p className="mt-4 font-tech text-lg font-bold text-[#171717]">
                  No fixtures match “{query}”
                </p>
                <p className="mt-1 text-sm text-[#7a746c]">
                  Try a club, competition or city instead.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {hotSearches.slice(0, 5).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => updateTerm(item)}
                      className="rounded-full bg-[#faf6f0] px-3 py-1.5 text-xs font-semibold text-[#5c5142] hover:bg-[#f3e4c8]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="px-2.5 pt-1 pb-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-[#8a847c] uppercase">
                  {pending && results.length === 0
                    ? "Searching…"
                    : `${results.length} ${results.length === 1 ? "fixture" : "fixtures"}`}
                </p>
                <ul ref={listRef} id="search-dialog-results" role="listbox" className="space-y-0.5">
                  {pending && results.length === 0
                    ? Array.from({ length: 3 }, (_, index) => <SkeletonRow key={index} />)
                    : shown.map((fixture, index) => (
                        <ResultRow
                          key={fixture.id}
                          fixture={fixture}
                          term={query}
                          currency={currency}
                          active={index === activeIndex}
                          onHover={() => setActive(index)}
                          onSelect={() => select(fixture)}
                        />
                      ))}
                </ul>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#f0ebe4] bg-[#fcfaf7] px-5 py-3">
            <div className="hidden items-center gap-4 text-[11px] text-[#8a847c] sm:flex">
              <span className="inline-flex items-center gap-1.5">
                <Kbd>
                  <ArrowUp className="size-3" />
                </Kbd>
                <Kbd>
                  <ArrowDown className="size-3" />
                </Kbd>
                Navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeft className="size-3" />
                </Kbd>
                Open
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Kbd>Esc</Kbd>
                Close
              </span>
            </div>
            {query && results.length > 0 ? (
              <button
                type="button"
                onClick={() => seeAll()}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#063246] px-4 py-2 font-tech text-xs font-semibold text-white transition-colors hover:bg-[#0a4560]"
              >
                See all {results.length} results
                <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <span className="ml-auto text-[11px] text-[#a59d92]">Official tickets & hospitality</span>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
