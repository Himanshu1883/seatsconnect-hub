"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  collections,
  experienceOptions,
  trustPoints,
  type Collection,
  type ExperienceType,
} from "@/lib/experiences";
import { Icon3D, type Icon3DName } from "./icons-3d";
import { Reveal } from "./reveal";
import { btnPrimarySoft, SectionHead, Wrap } from "./ui";
import { cn } from "cn";

export type Filter = ExperienceType | "all";

const trustIcons: Icon3DName[] = ["shield", "star", "globe", "headset"];

export function filterCollections(filter: Filter, query: string) {
  const needle = query.trim().toLowerCase();
  return collections.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (!needle) return true;
    return `${item.title} ${item.place} ${item.desc}`.toLowerCase().includes(needle);
  });
}

export function EventFinder({
  query,
  filter,
  onQuery,
  onFilter,
  onSubmit,
}: {
  query: string;
  filter: Filter;
  onQuery: (value: string) => void;
  onFilter: (value: Filter) => void;
  onSubmit: () => void;
}) {
  return (
    <Wrap>
      <form
        id="search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="relative z-10 -mt-10 grid items-end gap-4 rounded-[24px] border border-line bg-paper p-5 shadow-[0_24px_60px_-20px_rgba(26,21,18,0.28)] min-[501px]:grid-cols-[1fr_150px] md:grid-cols-[1fr_220px_auto] md:gap-6 md:p-7"
      >
        <div>
          <label htmlFor="query" className="mb-2 block text-[11px] font-semibold tracking-[1px] text-taupe uppercase">
            Where do you want to be?
          </label>
          <input
            id="query"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search a sport, event or destination…"
            autoComplete="off"
            className="w-full border-b border-line-strong bg-transparent py-3 text-base text-ink outline-none transition-colors placeholder:text-taupe/80 focus:border-brand-cta"
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-2 block text-[11px] font-semibold tracking-[1px] text-taupe uppercase">
            Experience
          </label>
          <select
            id="category"
            value={filter}
            onChange={(event) => onFilter(event.target.value as Filter)}
            className="w-full cursor-pointer border-b border-line-strong bg-transparent py-3 text-base text-ink outline-none focus:border-brand-cta"
          >
            {experienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={cn(btnPrimarySoft, "min-[501px]:max-md:col-span-2")}>
          Find events
          <ArrowUpRight className="size-4" />
        </button>
      </form>

      <div className="grid grid-cols-1 gap-6 border-b border-line py-10 min-[501px]:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {trustPoints.map((point, index) => (
          <Reveal key={point.title} delay={index * 90} className="flex items-center gap-4">
            <Icon3D name={trustIcons[index]} className="size-[52px]" />
            <div>
              <b className="block font-tech text-[15px] text-ink">{point.title}</b>
              <span className="mt-0.5 block text-[13px] leading-snug text-taupe">{point.detail}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Wrap>
  );
}

export function CategoryRow({ onPick }: { onPick: (type: ExperienceType) => void }) {
  return (
    <section className="pt-[60px] pb-2.5 md:pt-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="One world of live experiences"
          lines={["What brings you here?"]}
          body="Explore the events you love, from matchday seats to an exceptional weekend away."
        />
        <div className="grid grid-cols-2 gap-4 min-[701px]:grid-cols-3 min-[1001px]:grid-cols-6">
          {collections.map((item, index) => (
            <Reveal key={item.type} delay={index * 70}>
              <button
                type="button"
                onClick={() => onPick(item.type)}
                className="group relative flex h-[150px] w-full items-end overflow-hidden rounded-[22px] bg-ink p-5 text-left text-white shadow-[0_18px_40px_-24px_rgba(26,21,18,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-22px_rgba(26,21,18,0.75)] min-[701px]:h-[170px] min-[1001px]:h-[200px]"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1001px) 16vw, (min-width: 701px) 33vw, 50vw"
                  className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(transparent_30%,#1a1512d9)]" />
                <strong className="relative z-10 font-tech text-[17px] leading-[1.2] font-bold">
                  {item.title}
                  <span className="mt-2 flex items-center gap-1 text-xs font-medium text-line">
                    Explore experiences
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </strong>
              </button>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function CollectionCard({ item, onOpen }: { item: Collection; onOpen: (item: Collection) => void }) {
  return (
    <article className="group flex h-full flex-col rounded-[28px] border border-line bg-paper p-2 shadow-[0_1px_2px_rgba(26,21,18,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_28px_60px_-28px_rgba(26,21,18,0.4)]">
      <div className="relative h-[230px] overflow-hidden rounded-[22px] bg-[#283f51]">
        <Image
          src={item.image}
          alt={`${item.title} collection — illustrative event photography`}
          fill
          sizes="(min-width: 851px) 33vw, (min-width: 501px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-bold tracking-[0.7px] text-ink uppercase shadow-sm backdrop-blur">
          {item.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pt-5 pb-3">
        <span className="text-[11px] font-semibold tracking-[1px] text-taupe uppercase">{item.place}</span>
        <h3 className="mt-2 mb-2 font-tech text-[23px] font-bold tracking-[-0.6px] text-ink">{item.title}</h3>
        <p className="text-sm leading-[1.65] text-taupe">{item.desc}</p>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-auto flex w-full items-center justify-between border-t border-line pt-4 text-left font-tech text-[13px] font-bold text-brand-cta transition-colors hover:text-brand-cta-hover"
        >
          <span className="mt-1">Explore options</span>
          <span className="mt-1 flex size-9 items-center justify-center rounded-full bg-brand-cta text-white shadow-[0_8px_18px_-8px_rgba(6,50,70,0.8)] transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </button>
      </div>
    </article>
  );
}

export function Collections({
  filter,
  items,
  onFilter,
  onOpen,
}: {
  filter: Filter;
  items: Collection[];
  onFilter: (value: Filter) => void;
  onOpen: (item: Collection) => void;
}) {
  return (
    <section id="discover" className="py-[60px] md:py-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="Explore the collections"
          lines={["Your favourites.", "Extraordinary experiences."]}
          body="Discover event collections, then explore official seating and hospitality options with a specialist."
        />
        <Reveal className="mb-8">
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Event categories">
          {experienceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => onFilter(option.value)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all",
                filter === option.value
                  ? "border-brand-cta bg-brand-cta text-white shadow-[0_10px_22px_-10px_rgba(6,50,70,0.7)]"
                  : "border-line-strong bg-paper/60 text-taupe hover:border-brand-cta hover:text-brand-cta",
              )}
            >
              {option.tab}
            </button>
          ))}
          </div>
        </Reveal>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 min-[501px]:grid-cols-2 min-[851px]:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.type} delay={(index % 3) * 90} className="h-full">
                <CollectionCard item={item} onOpen={onOpen} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-4 rounded-[24px] border border-line bg-sand p-8 text-[15px] text-ink">
            <Icon3D name="compass" className="size-12" />
            <span>
              No matching collection yet.{" "}
              <a href="#request" className="inline-flex items-center gap-1 font-semibold text-brand-cta">
                Ask our specialists about your event
                <ArrowUpRight className="size-4" />
              </a>
            </span>
          </div>
        )}
        <p className="mt-6 text-[13px] text-taupe">
          Explore our event collections. Specific fixtures, authorised packages, pricing and
          availability are confirmed on enquiry.
        </p>
      </Wrap>
    </section>
  );
}
