"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { collections, type EventItem } from "@/lib/experiences";
import { Reveal } from "./reveal";
import { SectionHead, Wrap } from "./ui";
import { cn } from "cn";

function EventCard({ event, onEnquire }: { event: EventItem; onEnquire: (title: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onEnquire(event.title)}
      className="group flex h-full w-full flex-col rounded-[28px] border border-line bg-paper p-2 text-left shadow-[0_1px_2px_rgba(26,21,18,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(26,21,18,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cta"
    >
      <span className="relative block h-[190px] overflow-hidden rounded-[22px] bg-[#283f51]">
        <Image
          src={event.image}
          alt={`${event.title} — illustrative event photography`}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(transparent_55%,#1a1512c7)]" />
        <span className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs font-semibold text-white">
          <CalendarDays className="size-3.5 text-gold-soft" />
          {event.when}
        </span>
      </span>
      <span className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <span className="font-tech text-[19px] leading-[1.2] font-bold tracking-[-0.4px] text-ink">
          {event.title}
        </span>
        <span className="mt-2 flex items-center gap-1.5 text-[13px] text-taupe">
          <MapPin className="size-3.5 shrink-0 text-gold-deep" />
          {event.place}
        </span>
        <span className="mt-auto flex items-center justify-between border-t border-line pt-3.5">
          <span className="font-tech text-[13px] font-bold text-brand-cta">Enquire</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-cta text-white shadow-[0_8px_18px_-8px_rgba(6,50,70,0.8)] transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </span>
    </button>
  );
}

function EventRow({
  events,
  label,
  onEnquire,
}: {
  events: EventItem[];
  label: string;
  onEnquire: (title: string) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const prev = el.scrollLeft > 4;
    const next = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setEdges((current) => (current.prev === prev && current.next === next ? current : { prev, next }));
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  function slide(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + 20;
    const perPage = Math.max(1, Math.floor((el.clientWidth + 20) / step));
    el.scrollBy({ left: direction * step * perPage, behavior: "smooth" });
  }

  const arrow =
    "absolute top-[34%] z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_10px_24px_rgba(6,50,70,0.22)] transition-all disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="group/row relative mt-6">
      <div
        ref={scroller}
        onScroll={measure}
        className="-my-3 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
          >
            <EventCard event={event} onEnquire={onEnquire} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => slide(-1)}
        aria-label={`Previous ${label} events`}
        disabled={!edges.prev}
        className={cn(arrow, "left-1 border border-brand-cta/15 bg-white text-brand-cta hover:bg-brand-cta hover:text-white sm:left-0 sm:-translate-x-1/2")}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => slide(1)}
        aria-label={`Next ${label} events`}
        disabled={!edges.next}
        className={cn(arrow, "right-1 border border-brand-cta bg-brand-cta text-white hover:bg-brand-cta-hover sm:right-0 sm:translate-x-1/2")}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function CollectionEvents({ onEnquire }: { onEnquire: (title: string) => void }) {
  return (
    <section id="events" className="scroll-mt-[100px] py-[60px] md:py-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="The events inside each collection"
          lines={["Pick the occasion.", "We'll find the seats."]}
          body="Six events in every collection, from the Premier League to the grands prix. Choose one and a specialist confirms what's available."
        />
        <div className="space-y-16">
          {collections.map((collection) => (
            <Reveal key={collection.type}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="over text-gold-deep">{collection.place}</span>
                  <h3 className="mt-2 font-tech text-[26px] font-bold tracking-[-0.8px] text-ink md:text-[30px]">
                    {collection.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-sand px-3 py-1 font-tech text-xs font-bold text-brand-cta">
                  {collection.events.length} events
                </span>
              </div>
              <EventRow events={collection.events} label={collection.title} onEnquire={onEnquire} />
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
