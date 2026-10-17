import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FixtureView } from "@/lib/sports/types";
import { money } from "@/lib/sports/format";
import { Icon3D } from "@/components/experience/icons-3d";
import { Countdown } from "./countdown";
import { cn } from "cn";

export function MatchHeroCard({ fixture }: { fixture: FixtureView }) {
  const hasImage = Boolean(fixture.heroImage);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[24px] border border-white/25",
        !hasImage && "bg-white/[0.08] backdrop-blur-xl",
      )}
    >
      {hasImage ? (
        <Image
          src={fixture.heroImage!}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover object-[center_46%]"
        />
      ) : null}

      <div className="relative z-[1] flex aspect-[4/3] min-h-[280px] flex-col p-3 md:min-h-[320px]">
        <div className="mr-16 flex items-center gap-2 self-start rounded-[16px] border border-white/40 bg-white/16 px-2.5 py-1.5 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white/95">
            <Icon3D name="shield" className="size-6" />
          </span>
          <div className="min-w-0">
            <strong className="block font-tech text-[12.5px] leading-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">Official tickets</strong>
            <p className="text-[10.5px] leading-snug text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
              100% guaranteed access. Tickets directly from the organiser.
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <span className="text-[10px] font-bold tracking-[.2em] text-white uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]">Kick-off in</span>
          <div className="mt-1.5 max-w-[72%]">
            <Countdown kickoff={fixture.kickoff} variant="match-card" />
          </div>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold tracking-[.16em] text-white uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.65)]">
                {fixture.availability === "sold-out" ? "Status" : "Packages from"}
              </span>
              {fixture.availability === "sold-out" ? (
                <strong className="mt-0.5 block font-tech text-[24px] leading-none text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">Sold out</strong>
              ) : (
                <strong className="mt-0.5 block font-tech text-[26px] leading-none text-white tabular-nums [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
                  {money(fixture.fromPrice)}
                </strong>
              )}
            </div>
            <Link
              href="#packages"
              className="flex shrink-0 items-center gap-1 rounded-full bg-white/95 px-4 py-2.5 font-tech text-[12px] font-bold text-brand-cta shadow-[0_8px_20px_-8px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
            >
              {fixture.availability === "sold-out" ? "Join waitlist" : "Buy tickets"}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
