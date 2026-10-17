"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { FixtureView, PricedPackage } from "@/lib/sports/types";
import { money, tierLabel } from "@/lib/sports/format";
import { StadiumMap } from "./stadium-map";
import { cn } from "cn";

export function PackageGuide({ packages, fixture }: { packages: PricedPackage[]; fixture: FixtureView }) {
  const [openId, setOpenId] = useState<string | null>(packages[0]?.id ?? null);
  const active = packages.find((pkg) => pkg.id === openId) ?? packages[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <div className="space-y-3">
        {packages.map((pkg) => {
          const open = pkg.id === openId;
          return (
            <article key={pkg.id} className={cn("overflow-hidden rounded-[24px] border bg-paper transition-shadow", open ? "border-brand-cta/40 shadow-[0_24px_50px_-34px_rgba(6,50,70,0.6)]" : "border-line")}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : pkg.id)}
                aria-expanded={open}
                className="flex w-full items-center gap-4 p-3 text-left"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-[16px] bg-[#283f51]">
                  <Image src={pkg.media[0].src} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold tracking-[.12em] text-gold-deep uppercase">{tierLabel[pkg.tier]}</span>
                  <strong className="block truncate font-tech text-[16.5px] text-ink">{pkg.name}</strong>
                  <span className="block truncate text-[13px] text-taupe">{pkg.location}</span>
                </span>
                <span className="hidden text-right sm:block">
                  <span className="block text-[11px] text-taupe">From</span>
                  <strong className="font-tech text-[18px] text-ink">{money(pkg.price)}</strong>
                </span>
                <ChevronDown className={cn("size-5 shrink-0 text-brand-cta transition-transform", open && "rotate-180")} />
              </button>
              {open ? (
                <div className="border-t border-line px-5 pt-4 pb-5">
                  <p className="text-[15px] leading-[1.65] text-taupe">{pkg.description}</p>
                  <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {pkg.details.map((item) => (
                      <div key={item.label}>
                        <dt className="text-[11px] font-bold tracking-[.12em] text-gold-deep uppercase">{item.label}</dt>
                        <dd className="mt-0.5 text-[14px] leading-[1.5] text-ink">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={`${fixture.href}#package-${pkg.id}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-cta px-5 py-3 font-tech text-[13px] font-bold text-white hover:bg-brand-cta-hover"
                  >
                    Book for {fixture.format === "event" ? fixture.title : `${fixture.homeClub.short} vs ${fixture.awayClub.short}`} <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              ) : null}
            </article>
          );
        })}
        <p className="px-1 text-[13px] text-taupe">Note: inclusions may vary for specific matches — always check your individual event details before booking.</p>
      </div>
      <aside className="lg:sticky lg:top-[110px] lg:self-start">
        <div className="rounded-[28px] border border-line bg-paper p-5">
          <span className="over text-gold-deep">Seat map</span>
          <strong className="mt-1.5 block font-tech text-[17px] text-ink">
            {fixture.venue.name} — {active?.name}
          </strong>
          <StadiumMap venue={fixture.venue} available={packages.map((pkg) => pkg.stand)} active={active?.stand} className="mt-4" />
        </div>
      </aside>
    </div>
  );
}
