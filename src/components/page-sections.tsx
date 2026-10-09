"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  circlePerks,
  clubs,
  competitions,
  sports,
  steps,
  type Sport,
} from "@/lib/catalog";
import { cn } from "cn";

export function HowItWorks() {
  const [active, setActive] = useState(3);
  const step = steps[active];

  return (
    <section className="section-band bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <span className="eyebrow">
            <span className="relative flex size-1.5">
              <span className="live-ping absolute inset-0 rounded-full bg-brand-cta" />
              <span className="relative size-1.5 rounded-full bg-brand-cta" />
            </span>
            How a matchday is booked
          </span>
          <h2 className="mt-3 font-tech text-3xl leading-tight font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.75rem]">
            From the fixture to the gate.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-brand-gray">
            One path for the seat, the lounge and the hotel night. The same desk confirms it.
          </p>
          <ol className="relative mt-8 space-y-1">
            <span className="absolute top-6 bottom-6 left-[21px] w-px bg-brand-cta/18" aria-hidden="true" />
            {steps.map((item, index) => {
              const selected = index === active;
              return (
                <li key={item.n}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-all",
                      selected
                        ? "bg-white shadow-[0_10px_28px_rgba(40,30,20,0.08)] ring-1 ring-brand-cta/25"
                        : "hover:bg-white/70",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border font-tech text-xs font-bold",
                        selected
                          ? "border-brand-cta bg-brand-cta text-white"
                          : "border-brand-cta/20 bg-cream text-brand-cta",
                      )}
                    >
                      {item.n}
                    </span>
                    <span>
                      <span className="block font-tech text-sm font-bold text-brand-dark">{item.title}</span>
                      <span className="mt-0.5 block text-sm leading-5 text-brand-gray">{item.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="overflow-hidden rounded-[1.35rem] border border-brand-cta/15 bg-sand shadow-[0_12px_32px_rgba(198,159,104,0.14)]">
          <div className="flex items-center justify-between border-b border-brand-cta/15 bg-cream px-5 py-3">
            <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-brand-gray uppercase">
              Step {step.n}
            </p>
            <p className="font-tech text-xs font-semibold text-brand-cta">{step.title}</p>
          </div>
          <div className="space-y-4 bg-white p-5 sm:p-7">
            <p className="font-tech text-2xl font-bold tracking-tight text-brand-dark">{step.title}</p>
            <p className="max-w-md text-sm leading-6 text-brand-gray">{step.body}</p>
            <div className="rounded-2xl border border-brand-cta/15 bg-cream p-4">
              <p className="font-mono text-[10px] tracking-[0.14em] text-brand-gray uppercase">
                Illustrative package
              </p>
              <p className="mt-2 font-tech text-lg font-bold text-brand-dark">Chelsea v Bournemouth</p>
              <p className="text-sm text-brand-gray">Stamford Bridge · 10 Oct 2026 · Hospitality</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-brand-gray">2 guests</p>
                  <p className="font-tech text-2xl font-bold text-brand-cta">€2,450</p>
                </div>
                <span className="rounded-full bg-brand-cta px-3 py-1 font-tech text-xs font-semibold text-white">
                  Ready to confirm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Competitions({
  onPick,
}: {
  onPick: (competition: string, sport: Sport) => void;
}) {
  return (
    <section id="football" className="section-band scroll-mt-24 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Best selling competitions</span>
        <h2 className="mt-3 max-w-2xl font-tech text-3xl leading-[1.1] font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.65rem]">
          Seasons worth planning the trip around.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onPick(item.filter, item.sport)}
              className="group relative block h-56 overflow-hidden rounded-[1.35rem] border border-brand-cta/15 text-left"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#1a1512] via-[#1a1512]/35 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="block font-tech text-xl font-bold text-white">{item.name}</span>
                <span className="mt-1 block text-sm text-white/80">{item.blurb}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Clubs({ onPick }: { onPick: (club: string) => void }) {
  return (
    <section className="section-band bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Best selling clubs</span>
        <h2 className="mt-3 font-tech text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Start with the shirt you travel for.
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clubs.map((club) => (
            <button
              key={club}
              type="button"
              onClick={() => onPick(club)}
              className="group flex min-h-28 flex-col justify-between rounded-[1.35rem] border border-brand-cta/15 bg-cream px-4 py-4 text-left transition-all hover:border-brand-cta/40 hover:bg-white hover:shadow-[0_10px_28px_rgba(40,30,20,0.08)]"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-white font-tech text-xs font-bold text-brand-cta transition-colors group-hover:bg-brand-cta group-hover:text-white">
                {club.slice(0, 1)}
              </span>
              <span className="font-tech text-sm font-bold text-brand-dark">{club}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PopularSports({ onPick }: { onPick: (sport: Sport) => void }) {
  return (
    <section className="section-band bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Popular sports</span>
        <h2 className="mt-3 max-w-xl font-tech text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Five calendars. One place to book them.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {sports.map((sport) => (
            <button
              key={sport.id}
              id={sport.id}
              type="button"
              onClick={() => onPick(sport.id)}
              className="group relative h-64 overflow-hidden rounded-[1.35rem] border border-brand-cta/15 text-left scroll-mt-28"
            >
              <Image
                src={sport.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#1a1512] via-[#1a1512]/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-tech text-lg font-bold text-white">{sport.name}</span>
                <span className="mt-1 block text-xs leading-5 text-white/80">{sport.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Partnerships() {
  const points = [
    {
      title: "Official partnerships",
      body: "Ticket and package partnerships with the clubs and events people actually fly for. Book the category, not a rumour.",
    },
    {
      title: "Experienced experts",
      body: "More than 15 years of sports-event work, from the first enquiry to the name on the ticket.",
    },
    {
      title: "Happy customers",
      body: "Supporters in over 100 countries use the same desk for a single seat or a hosted table.",
    },
  ];

  return (
    <section id="about" className="section-band scroll-mt-24 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Why fans book here</span>
        <h2 className="mt-3 max-w-3xl font-tech text-3xl leading-[1.1] font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.65rem]">
          Proud to handle official tickets for the biggest clubs and events.
        </h2>
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {points.map((point, index) => (
            <article
              key={point.title}
              className="rounded-[1.35rem] border border-brand-cta/15 bg-cream p-6"
            >
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brand-cta uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-tech text-xl font-bold text-brand-dark">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-gray">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Circle({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section id="circle" className="section-band scroll-mt-24 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-[1.75rem] border border-brand-cta/15 bg-[#1a1512] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-10">
          <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brand-orange uppercase">
            The Seats Circle
          </span>
          <h2 className="mt-3 font-tech text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
            The more football you travel for, the more it opens.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/75">
            Straightforward rewards. No points maze. Everything sits on the email you book with,
            so discounts, early releases and the odd upgrade find you.
          </p>
          <Button
            className="mt-6 h-auto rounded-full bg-white px-5 py-2.5 font-tech text-sm font-semibold text-brand-cta hover:bg-cream"
            onClick={onBrowse}
          >
            Browse a package
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
        <ul className="grid gap-2 p-6 sm:p-10 lg:pl-0">
          {circlePerks.map((perk) => (
            <li
              key={perk}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-tech text-sm font-semibold text-white"
            >
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GiftAndGroups() {
  const [voucher, setVoucher] = useState<number | null>(null);
  const [voucherSent, setVoucherSent] = useState(false);
  const [groupSent, setGroupSent] = useState(false);
  const amounts = [100, 250, 500, 1000];

  return (
    <section className="section-band bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
        <form
          id="gift"
          className="scroll-mt-28 rounded-[1.35rem] border border-brand-cta/15 bg-cream p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            if (!voucher) return;
            setVoucherSent(true);
          }}
        >
          <span className="eyebrow">Gift voucher</span>
          <h2 className="mt-3 font-tech text-3xl font-bold tracking-tight text-brand-dark">
            Give the match, not another jumper.
          </h2>
          <p className="mt-2 text-sm leading-6 text-brand-gray">
            A SeatsConnect voucher spends on tickets, hospitality or a ticket-and-hotel package.
          </p>
          {voucherSent ? (
            <p className="mt-6 rounded-2xl bg-white px-4 py-4 font-tech text-sm font-semibold text-brand-cta">
              Voucher reserved. We will email the code once the recipient details are confirmed.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setVoucher(amount)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-tech text-sm font-semibold",
                      voucher === amount
                        ? "border-brand-cta bg-brand-cta text-white"
                        : "border-brand-cta/15 bg-white text-brand-dark",
                    )}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <Input
                required
                type="email"
                placeholder="Recipient email"
                aria-label="Recipient email"
                className="h-11 rounded-xl bg-white"
              />
              <Input
                required
                placeholder="Your name"
                aria-label="Your name"
                className="h-11 rounded-xl bg-white"
              />
              <Button
                type="submit"
                disabled={!voucher}
                className="h-auto rounded-full px-5 py-2.5 font-tech"
              >
                Send voucher
              </Button>
            </div>
          )}
        </form>

        <form
          id="groups"
          className="scroll-mt-28 rounded-[1.35rem] border border-brand-cta/15 bg-white p-6 shadow-[0_12px_32px_rgba(198,159,104,0.12)] sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setGroupSent(true);
          }}
        >
          <span className="eyebrow">Group bookings</span>
          <h2 className="mt-3 font-tech text-3xl font-bold tracking-tight text-brand-dark">
            Ten mates. One fixture. One quote.
          </h2>
          <p className="mt-2 text-sm leading-6 text-brand-gray">
            Tell us the match, the headcount and whether you want seats, a lounge or rooms.
          </p>
          {groupSent ? (
            <p className="mt-6 rounded-2xl bg-cream px-4 py-4 font-tech text-sm font-semibold text-brand-cta">
              Request received. A specialist will come back with options for the group.
            </p>
          ) : (
            <div className="mt-6 grid gap-3">
              <Input required placeholder="Name" aria-label="Name" className="h-11 rounded-xl" />
              <Input required type="email" placeholder="Email" aria-label="Email" className="h-11 rounded-xl" />
              <Input required placeholder="Fixture or club" aria-label="Fixture" className="h-11 rounded-xl" />
              <Input
                required
                type="number"
                min={6}
                placeholder="Number of guests"
                aria-label="Number of guests"
                className="h-11 rounded-xl"
              />
              <Button type="submit" className="h-auto w-fit rounded-full px-5 py-2.5 font-tech">
                Request a group quote
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export function Closing({ onFind }: { onFind: () => void }) {
  return (
    <section className="section-band bg-[#1a1512] px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-brand-orange uppercase">
          Next fixture
        </p>
        <h2 className="mt-3 font-tech text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl">
          Official tickets.
          <br />
          <span className="text-brand-orange">Matchday hospitality.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/75">
          Premier League, La Liga, rugby, Wimbledon and the grands prix. One SeatsConnect desk
          for the seat and the stay.
        </p>
        <Button
          className="mt-6 h-auto rounded-full bg-white px-5 py-2.5 font-tech text-brand-cta hover:bg-cream"
          onClick={onFind}
        >
          Browse fixtures
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </section>
  );
}
