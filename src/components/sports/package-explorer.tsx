"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Images,
  LayoutGrid,
  ListChecks,
  Minus,
  Plus,
  Rows3,
  Smartphone,
  Users,
  X,
} from "lucide-react";
import type { FeatureKey, FixtureView, PricedPackage, StandId } from "@/lib/sports/types";
import { dateParts, money, tierLabel, timeAt } from "@/lib/sports/format";
import { featureLabels } from "@/lib/sports/data/packages";
import { Modal, RequestDialog, type RequestIntent } from "./modal";
import { StadiumMap } from "./stadium-map";
import { cn } from "cn";

const BOOKING_FEE = 0.025;

type TierFilter = "all" | PricedPackage["tier"];

function standName(fixture: FixtureView, stand: StandId) {
  const corners: Record<string, string> = { nw: "North-West corner", ne: "North-East corner", sw: "South-West corner", se: "South-East corner" };
  return corners[stand] ?? fixture.venue.stands[stand as keyof FixtureView["venue"]["stands"]];
}

function dateOptionLabel(item: FixtureView) {
  const parts = dateParts(item.kickoff, item.timeZone);
  const who = item.format === "match" ? `vs ${item.awayClub.short}` : item.homeClub.short;
  return `${parts.short} · ${parts.time} — ${who}`;
}

function LevelDots({ level, dark = false }: { level: number; dark?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cn("text-[12px] font-bold tracking-[.12em] uppercase", dark ? "text-gold-soft" : "text-gold-deep")}>VIP level {level}</span>
      <span className="flex gap-1" aria-hidden>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={cn("size-2 rotate-45 rounded-[2px]", index < level ? "bg-gold-deep" : dark ? "bg-white/20" : "bg-line-strong")}
          />
        ))}
      </span>
    </span>
  );
}

function PackageCard({
  pkg,
  fixture,
  selected,
  onSelect,
  onGallery,
  onItinerary,
  onSeatView,
  onWaitlist,
}: {
  pkg: PricedPackage;
  fixture: FixtureView;
  selected: boolean;
  onSelect: () => void;
  onGallery: (index: number) => void;
  onItinerary: () => void;
  onSeatView: () => void;
  onWaitlist: () => void;
}) {
  const [details, setDetails] = useState(false);
  const discount = pkg.wasPrice ? Math.round((1 - pkg.price / pkg.wasPrice) * 100) : 0;
  const soon = fixture.availability === "coming-soon";
  const groups = [
    { label: "Seating", items: pkg.seating },
    { label: "Hospitality", items: pkg.hospitality },
    { label: "Extras", items: pkg.extras },
  ].filter((group) => group.items.length);

  return (
    <article
      id={`package-${pkg.id}`}
      className={cn(
        "scroll-mt-[120px] overflow-hidden rounded-[30px] border bg-paper transition-all duration-300",
        selected
          ? "border-brand-cta shadow-[0_30px_60px_-34px_rgba(6,50,70,0.6)] ring-1 ring-brand-cta"
          : "border-line shadow-[0_1px_2px_rgba(26,21,18,0.04)] hover:border-line-strong",
        pkg.soldOut && "opacity-80",
      )}
    >
      <div className="grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="p-2.5 pb-0 xl:pb-2.5">
          <button
            type="button"
            onClick={() => onGallery(0)}
            className="group relative block h-[230px] w-full overflow-hidden rounded-[22px] bg-[#283f51] sm:h-[270px]"
            aria-label={`Open ${pkg.name} gallery`}
          >
            <Image
              src={pkg.media[0].src}
              alt={pkg.media[0].alt}
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 60vw, 92vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#1a1512aa)]" />
            <span className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/92 px-3 py-1 text-[11.5px] font-bold text-brand-cta backdrop-blur">{tierLabel[pkg.tier]}</span>
              {pkg.badge ? <span className="rounded-full bg-[#063246] px-3 py-1 text-[11.5px] font-bold text-white">{pkg.badge}</span> : null}
            </span>
            {discount ? (
              <span className="absolute top-3 right-3 flex size-14 flex-col items-center justify-center rounded-[16px] bg-gold-deep text-white shadow-lg">
                <span className="font-tech text-[17px] leading-none font-extrabold">{discount}%</span>
                <span className="text-[9px] font-bold uppercase">off</span>
              </span>
            ) : null}
            <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur">
              <Images className="size-3.5" />
              All media ({pkg.media.length})
            </span>
          </button>
          <div className="mt-2 grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={onSeatView}
              className="relative flex h-[62px] items-center justify-center overflow-hidden rounded-[14px] border border-line bg-sand p-1 transition-colors hover:border-brand-cta"
              aria-label="View seating location"
            >
              <StadiumMap venue={fixture.venue} available={[pkg.stand]} active={pkg.stand} compact className="w-full" />
            </button>
            {pkg.media.slice(1, 4).map((media, index) => (
              <button
                key={media.src + index}
                type="button"
                onClick={() => onGallery(index + 1)}
                className="relative h-[62px] overflow-hidden rounded-[14px] bg-[#283f51]"
                aria-label={`Open image ${index + 2}: ${media.alt}`}
              >
                <Image src={media.src} alt="" fill sizes="120px" className="object-cover transition-transform duration-500 hover:scale-110" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <LevelDots level={pkg.level} />
            {pkg.soldOut ? (
              <span className="rounded-full bg-[#f1e7e4] px-3 py-1 text-[12px] font-bold text-[#8b3a2c]">Sold out</span>
            ) : pkg.remaining ? (
              <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-white uppercase">
                Only {pkg.remaining} tickets remaining
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 font-tech text-[22px] leading-[1.18] font-bold tracking-[-0.5px] text-ink">{pkg.name}</h3>
          <p className="mt-1 text-[14px] font-semibold text-brand-cta">{pkg.location}</p>
          <p className="mt-2.5 text-[15px] leading-[1.6] text-taupe">{pkg.description}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.label} className={cn(group.label === "Hospitality" && "sm:col-span-2 sm:order-first")}>
                <span className="text-[11px] font-bold tracking-[.14em] text-taupe uppercase">{group.label}</span>
                <ul className="mt-1.5 space-y-1">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-[14px] leading-[1.45] text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1f8a4c]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-bold text-brand-cta">
            <button type="button" onClick={onItinerary} className="flex items-center gap-1.5 hover:underline">
              <Clock3 className="size-4" /> View itinerary
            </button>
            <button type="button" onClick={onSeatView} className="flex items-center gap-1.5 hover:underline">
              <Eye className="size-4" /> View from seat
            </button>
            <button type="button" onClick={() => setDetails((v) => !v)} aria-expanded={details} className="flex items-center gap-1.5 hover:underline">
              <ListChecks className="size-4" /> {details ? "Hide details" : "Full package details"}
              <ChevronDown className={cn("size-3.5 transition-transform", details && "rotate-180")} />
            </button>
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4 max-xl:mt-5">
            <div>
              <span className="block text-[11px] font-bold tracking-[.14em] text-taupe uppercase">{soon ? "Expected from" : "From"}</span>
              <span className="flex items-baseline gap-2">
                {pkg.wasPrice ? <s className="text-[14px] text-taupe">{money(pkg.wasPrice)}</s> : null}
                <span className="font-tech text-[28px] leading-none font-extrabold text-ink">{money(pkg.price)}</span>
                <span className="text-[13px] text-taupe">p.p.</span>
              </span>
            </div>
            {pkg.soldOut ? (
              <button
                type="button"
                onClick={onWaitlist}
                className="rounded-full border border-line-strong bg-white px-5 py-3 font-tech text-[13px] font-bold text-brand-cta hover:border-brand-cta"
              >
                Notify me
              </button>
            ) : (
              <button
                type="button"
                onClick={onSelect}
                aria-pressed={selected}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-3 font-tech text-[13px] font-bold transition-all",
                  selected
                    ? "bg-[#e6f2ea] text-[#1f6b3a]"
                    : "bg-brand-cta text-white shadow-[0_10px_22px_-10px_rgba(6,50,70,0.7)] hover:bg-brand-cta-hover",
                )}
              >
                {selected ? <Check className="size-4" /> : null}
                {selected ? "Selected" : soon ? "Pre-register" : "Book now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {details ? (
        <dl className="grid gap-x-8 gap-y-3 border-t border-line bg-cream px-6 py-5 sm:grid-cols-2">
          {pkg.details.map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] font-bold tracking-[.14em] text-gold-deep uppercase">{item.label}</dt>
              <dd className="mt-1 text-[14px] leading-[1.55] text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}

function CompareTable({
  packages,
  selectedId,
  onSelect,
}: {
  packages: PricedPackage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const keys = Object.keys(featureLabels) as FeatureKey[];
  return (
    <div className="overflow-x-auto rounded-[28px] border border-line bg-paper">
      <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-line">
            <th className="sticky left-0 z-10 w-[190px] bg-paper p-4 align-bottom text-[12px] font-bold tracking-[.14em] text-taupe uppercase">Compare</th>
            {packages.map((pkg) => (
              <th key={pkg.id} className={cn("min-w-[170px] p-4 align-top", selectedId === pkg.id && "bg-[#eef3f5]")}>
                <span className="block text-[11px] font-bold tracking-[.12em] text-gold-deep uppercase">{tierLabel[pkg.tier]}</span>
                <span className="mt-1 block font-tech text-[15px] leading-[1.25] font-bold text-ink">{pkg.name}</span>
                <span className="mt-2 block font-tech text-[22px] font-extrabold text-ink">
                  {money(pkg.price)} <span className="text-[12px] font-medium text-taupe">p.p.</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <th className="sticky left-0 bg-paper p-4 font-semibold text-ink">Location</th>
            {packages.map((pkg) => (
              <td key={pkg.id} className={cn("p-4 text-taupe", selectedId === pkg.id && "bg-[#eef3f5]")}>
                {pkg.location}
              </td>
            ))}
          </tr>
          <tr className="border-b border-line">
            <th className="sticky left-0 bg-paper p-4 font-semibold text-ink">VIP level</th>
            {packages.map((pkg) => (
              <td key={pkg.id} className={cn("p-4", selectedId === pkg.id && "bg-[#eef3f5]")}>
                <span className="flex gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={cn("size-2 rotate-45 rounded-[2px]", index < pkg.level ? "bg-gold-deep" : "bg-line-strong")} />
                  ))}
                </span>
              </td>
            ))}
          </tr>
          {keys.map((key) => (
            <tr key={key} className="border-b border-line last:border-0">
              <th className="sticky left-0 bg-paper p-4 font-medium text-ink">{featureLabels[key]}</th>
              {packages.map((pkg) => (
                <td key={pkg.id} className={cn("p-4", selectedId === pkg.id && "bg-[#eef3f5]")}>
                  {pkg.features.includes(key) ? (
                    <span className="flex size-6 items-center justify-center rounded-full bg-[#e6f2ea] text-[#1f6b3a]">
                      <Check className="size-3.5" />
                    </span>
                  ) : (
                    <span className="flex size-6 items-center justify-center rounded-full bg-sand text-taupe/60">
                      <X className="size-3.5" />
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th className="sticky left-0 bg-paper p-4" />
            {packages.map((pkg) => (
              <td key={pkg.id} className={cn("p-4", selectedId === pkg.id && "bg-[#eef3f5]")}>
                {pkg.soldOut ? (
                  <span className="text-[13px] font-semibold text-[#8b3a2c]">Sold out</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelect(pkg.id)}
                    className={cn(
                      "rounded-full px-4 py-2.5 font-tech text-[12.5px] font-bold",
                      selectedId === pkg.id ? "bg-[#e6f2ea] text-[#1f6b3a]" : "bg-brand-cta text-white hover:bg-brand-cta-hover",
                    )}
                  >
                    {selectedId === pkg.id ? "Selected" : "Select"}
                  </button>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const button =
    "flex size-10 items-center justify-center rounded-full border border-line-strong bg-white text-brand-cta transition-colors hover:border-brand-cta disabled:opacity-40";
  return (
    <div className="flex items-center justify-between rounded-full border border-line bg-cream p-1">
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Fewer tickets">
        <Minus className="size-4" />
      </button>
      <output aria-live="polite" className="font-tech text-[18px] font-bold text-ink">
        {value}
        <span className="ml-1 text-[13px] font-medium text-taupe">{value === 1 ? "ticket" : "tickets"}</span>
      </output>
      <button type="button" className={button} onClick={() => onChange(value + 1)} disabled={value >= 12} aria-label="More tickets">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function PackageExplorer({
  fixture,
  packages,
  otherDates,
}: {
  fixture: FixtureView;
  packages: PricedPackage[];
  otherDates: FixtureView[];
}) {
  const router = useRouter();
  const firstOpen = packages.find((pkg) => !pkg.soldOut) ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(firstOpen?.id ?? null);
  const [qty, setQty] = useState(2);
  const [tier, setTier] = useState<TierFilter>("all");
  const [stand, setStand] = useState<StandId | null>(null);
  const [view, setView] = useState<"list" | "compare">("list");
  const [gallery, setGallery] = useState<{ id: string; index: number } | null>(null);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [seatView, setSeatView] = useState<string | null>(null);
  const [request, setRequest] = useState<{ intent: RequestIntent; pkg: PricedPackage | null } | null>(null);

  const selected = packages.find((pkg) => pkg.id === selectedId) ?? null;
  const stands = useMemo(() => [...new Set(packages.map((pkg) => pkg.stand))], [packages]);
  const tiers = useMemo(
    () => (["ticket", "hospitality", "premium", "box"] as const).filter((t) => packages.some((pkg) => pkg.tier === t)),
    [packages],
  );
  const shown = packages.filter((pkg) => (tier === "all" || pkg.tier === tier) && (!stand || pkg.stand === stand));
  const date = dateParts(fixture.kickoff, fixture.timeZone);
  const intent: RequestIntent =
    fixture.availability === "sold-out" ? "notify" : fixture.availability === "coming-soon" ? "preregister" : "reserve";

  const subtotal = selected ? selected.price * qty : 0;
  const fee = Math.round(subtotal * BOOKING_FEE * 100) / 100;
  const total = subtotal + fee;
  const galleryPkg = packages.find((pkg) => pkg.id === gallery?.id);
  const itineraryPkg = packages.find((pkg) => pkg.id === itinerary);
  const seatPkg = packages.find((pkg) => pkg.id === seatView);

  function select(id: string) {
    setSelectedId(id);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      document.getElementById("booking-summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function requestLines(pkg: PricedPackage | null) {
    return [
      `${fixture.title} — ${fixture.competitionInfo.name}`,
      `${date.full} · ${date.time} at ${fixture.venue.name}`,
      ...(pkg
        ? [
            `${pkg.name} (${pkg.location})`,
            intent === "reserve"
              ? `${qty} × ${money(pkg.price)} + ${money(fee)} booking fee = ${money(total)}`
              : `${qty} ${qty === 1 ? "guest" : "guests"} · from ${money(pkg.price)} p.p.`,
          ]
        : [`${qty} ${qty === 1 ? "guest" : "guests"} · any package`]),
    ];
  }

  const chip = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 font-tech text-[13px] font-bold whitespace-nowrap transition-colors",
      active ? "bg-brand-cta text-white" : "border border-line bg-white text-ink hover:border-brand-cta hover:text-brand-cta",
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            <button type="button" className={chip(tier === "all")} onClick={() => setTier("all")}>
              All packages ({packages.length})
            </button>
            {tiers.map((t) => (
              <button key={t} type="button" className={chip(tier === t)} onClick={() => setTier(t)}>
                {tierLabel[t]}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 rounded-full border border-line bg-white p-1" role="group" aria-label="Package view">
            {(
              [
                { id: "list", label: "Packages", icon: Rows3 },
                { id: "compare", label: "Compare packages", icon: LayoutGrid },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={view === item.id}
                onClick={() => setView(item.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-bold transition-colors",
                  view === item.id ? "bg-brand-cta text-white" : "text-brand-cta hover:bg-sand",
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {stand ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-[18px] bg-[#eef3f5] px-4 py-3 text-[14px] text-brand-cta">
            <span>
              Showing packages in the <strong>{standName(fixture, stand)}</strong>
            </span>
            <button type="button" onClick={() => setStand(null)} className="flex items-center gap-1 font-bold hover:underline">
              <X className="size-4" /> Clear
            </button>
          </div>
        ) : null}

        <div className="mt-5">
          {view === "compare" ? (
            <CompareTable packages={shown} selectedId={selectedId} onSelect={select} />
          ) : (
            <div className="space-y-5">
              {shown.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  fixture={fixture}
                  selected={selectedId === pkg.id}
                  onSelect={() => select(pkg.id)}
                  onGallery={(index) => setGallery({ id: pkg.id, index })}
                  onItinerary={() => setItinerary(pkg.id)}
                  onSeatView={() => setSeatView(pkg.id)}
                  onWaitlist={() => setRequest({ intent: "notify", pkg })}
                />
              ))}
              {shown.length === 0 ? (
                <p className="rounded-[24px] border border-dashed border-line-strong p-8 text-center text-taupe">
                  No packages in this category. Try another stand or tier.
                </p>
              ) : null}
            </div>
          )}
        </div>
        <p className="mt-5 flex gap-2 text-[13px] leading-relaxed text-taupe">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-taupe text-[10px] font-bold">i</span>
          Prices are per person and subject to availability and demand at the time of booking. Inclusions may vary for
          specific matches — your specialist confirms everything before any payment.
        </p>
      </div>

      <aside id="booking-summary" className="scroll-mt-[110px] lg:sticky lg:top-[110px] lg:self-start">
        <div className="space-y-4">
          <div className="rounded-[28px] border border-line bg-paper p-4">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="font-tech text-[14px] font-bold text-ink">Seating plan</span>
              <span className="text-[12px] text-taupe">Tap a stand to filter</span>
            </div>
            <StadiumMap
              venue={fixture.venue}
              available={stands}
              active={stand ?? selected?.stand ?? null}
              onSelect={(id) => setStand((current) => (current === id ? null : id))}
            />
          </div>

          <div className="rounded-[28px] border border-brand-cta/25 bg-paper p-5 shadow-[0_30px_60px_-40px_rgba(6,50,70,0.65)]">
            <label className="block">
              <span className="flex items-center gap-1.5 text-[12px] font-bold tracking-[.12em] text-taupe uppercase">
                <CalendarDays className="size-3.5" /> Change date
              </span>
              <span className="relative mt-2 block">
                <select
                  value={fixture.href}
                  onChange={(event) => router.push(event.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-[14px] border border-line bg-white py-3 pr-10 pl-4 text-[14px] font-semibold text-ink outline-none focus:border-brand-cta"
                >
                  {otherDates.map((item) => (
                    <option key={item.href} value={item.href}>
                      {dateOptionLabel(item)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-brand-cta" />
              </span>
            </label>

            <div className="mt-5 rounded-[20px] bg-sand p-4">
              {selected ? (
                <>
                  <span className="text-[11px] font-bold tracking-[.14em] text-gold-deep uppercase">{tierLabel[selected.tier]}</span>
                  <strong className="mt-1 block font-tech text-[17px] leading-[1.25] text-ink">{selected.name}</strong>
                  <span className="mt-1 block text-[13px] text-taupe">{selected.location}</span>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-tech text-[22px] font-extrabold text-ink">
                      {money(selected.price)} <span className="text-[12px] font-medium text-taupe">per person</span>
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-brand-cta">
                      <Smartphone className="size-3.5" /> E-ticket
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-[14px] text-taupe">
                  {fixture.availability === "sold-out" ? "All packages are currently sold out." : "Select a package to see your total."}
                </span>
              )}
            </div>

            <div className="mt-4">
              <Stepper value={qty} onChange={setQty} />
              {qty > 1 ? (
                <p className="mt-2 flex items-center gap-2 rounded-[12px] bg-[#eef3f5] px-3 py-2 text-[12.5px] text-brand-cta">
                  <Users className="size-4 shrink-0" /> You will be seated together when buying two or more tickets.
                </p>
              ) : null}
            </div>

            {selected && intent === "reserve" ? (
              <dl className="mt-4 space-y-2 text-[14px]">
                <div className="flex justify-between text-taupe">
                  <dt>
                    {qty} × {money(selected.price)}
                  </dt>
                  <dd className="text-ink">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-taupe">
                  <dt>Booking fee (2.5%)</dt>
                  <dd className="text-ink">{money(fee)}</dd>
                </div>
                <div className="flex justify-between text-taupe">
                  <dt>Delivery</dt>
                  <dd className="font-semibold text-[#1f6b3a]">Free</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-line pt-3">
                  <dt className="font-tech font-bold text-ink">Total (GBP)</dt>
                  <dd className="font-tech text-[26px] font-extrabold text-ink">{money(total)}</dd>
                </div>
              </dl>
            ) : null}

            <button
              type="button"
              onClick={() => setRequest({ intent, pkg: selected })}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-cta px-6 py-4 font-tech text-[14px] font-bold text-white shadow-[0_14px_28px_-12px_rgba(6,50,70,0.8)] transition-all hover:-translate-y-0.5 hover:bg-brand-cta-hover"
            >
              {intent === "notify" ? "Join the waitlist" : intent === "preregister" ? "Pre-register interest" : "Reserve these seats"}
              <ArrowUpRight className="size-4" />
            </button>
            <p className="mt-3 text-center text-[12px] leading-relaxed text-taupe">Nothing is charged until your seats are confirmed.</p>
          </div>
        </div>
      </aside>

      {selected && intent === "reserve" ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 shadow-[0_-12px_30px_-18px_rgba(26,21,18,0.5)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[700px] items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="block truncate text-[12px] text-taupe">
                {qty} × {selected.name}
              </span>
              <strong className="font-tech text-[20px] text-ink">{money(total)}</strong>
            </div>
            <button
              type="button"
              onClick={() => setRequest({ intent, pkg: selected })}
              className="shrink-0 rounded-full bg-brand-cta px-5 py-3 font-tech text-[13px] font-bold text-white"
            >
              Reserve
            </button>
          </div>
        </div>
      ) : null}

      <Modal
        open={Boolean(galleryPkg)}
        onClose={() => setGallery(null)}
        eyebrow={`Gallery · ${galleryPkg?.media.length ?? 0} images`}
        title={galleryPkg?.name ?? ""}
        wide
      >
        {galleryPkg && gallery ? (
          <div>
            <div className="relative h-[52vh] max-h-[560px] min-h-[260px] overflow-hidden rounded-[22px] bg-[#283f51]">
              <Image src={galleryPkg.media[gallery.index].src} alt={galleryPkg.media[gallery.index].alt} fill sizes="90vw" className="object-cover" />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-[13px] text-white backdrop-blur">
                {galleryPkg.media[gallery.index].alt}
              </span>
              {(
                [
                  { dir: -1, icon: ChevronLeft, cls: "left-3", label: "Previous image" },
                  { dir: 1, icon: ChevronRight, cls: "right-3", label: "Next image" },
                ] as const
              ).map((arrow) => (
                <button
                  key={arrow.dir}
                  type="button"
                  aria-label={arrow.label}
                  onClick={() =>
                    setGallery((g) => g && { ...g, index: (g.index + arrow.dir + galleryPkg.media.length) % galleryPkg.media.length })
                  }
                  className={cn(
                    "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-cta shadow-lg transition-colors hover:bg-brand-cta hover:text-white",
                    arrow.cls,
                  )}
                >
                  <arrow.icon className="size-5" />
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {galleryPkg.media.map((media, index) => (
                <button
                  key={media.src + index}
                  type="button"
                  onClick={() => setGallery({ id: galleryPkg.id, index })}
                  aria-label={`Show ${media.alt}`}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-[12px] ring-2 transition-all",
                    index === gallery.index ? "ring-brand-cta" : "opacity-70 ring-transparent hover:opacity-100",
                  )}
                >
                  <Image src={media.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={Boolean(itineraryPkg)} onClose={() => setItinerary(null)} eyebrow="Package itinerary" title={itineraryPkg?.name ?? ""}>
        {itineraryPkg ? (
          <>
            <ol className="relative space-y-4 border-l-2 border-line pl-6">
              {itineraryPkg.itinerary.map((step) => (
                <li key={step.title} className="relative">
                  <span
                    className={cn(
                      "absolute top-1 -left-[33px] size-4 rounded-full border-[3px] border-paper",
                      step.offset === 0 ? "bg-gold-deep" : "bg-brand-cta",
                    )}
                  />
                  <span className="font-tech text-[15px] font-extrabold text-brand-cta">{timeAt(fixture.kickoff, fixture.timeZone, step.offset)}</span>
                  <strong className="ml-2 font-tech text-[15px] text-ink">{step.title}</strong>
                  {step.detail ? <p className="mt-0.5 text-[14px] leading-[1.55] text-taupe">{step.detail}</p> : null}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[12.5px] text-taupe">Times are local and based on a {date.time} kick-off. Exact timings are confirmed with your tickets.</p>
          </>
        ) : null}
      </Modal>

      <Modal open={Boolean(seatPkg)} onClose={() => setSeatView(null)} eyebrow="View from your seat" title={seatPkg?.location ?? ""} wide>
        {seatPkg ? (
          <div className="grid gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="relative h-[300px] overflow-hidden rounded-[22px] bg-[#283f51] md:h-full md:min-h-[320px]">
              <Image
                src={(seatPkg.media.find((media) => media.kind === "view") ?? seatPkg.media[0]).src}
                alt={`Illustrative view from ${seatPkg.location}`}
                fill
                sizes="(min-width: 768px) 55vw, 90vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-[12.5px] text-white backdrop-blur">
                Illustrative view — exact seats allocated by the club
              </span>
            </div>
            <div>
              <StadiumMap venue={fixture.venue} available={[seatPkg.stand]} active={seatPkg.stand} />
              <dl className="mt-4 space-y-2 text-[14px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-taupe">Stand</dt>
                  <dd className="text-right font-semibold text-ink">{standName(fixture, seatPkg.stand)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-taupe">Package</dt>
                  <dd className="text-right font-semibold text-ink">{seatPkg.name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-taupe">Seats</dt>
                  <dd className="text-right font-semibold text-ink">Guaranteed together</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : null}
      </Modal>

      <RequestDialog
        open={request != null}
        onClose={() => setRequest(null)}
        intent={request?.intent ?? "reserve"}
        title={fixture.title}
        lines={requestLines(request?.pkg ?? null)}
      />
    </div>
  );
}
