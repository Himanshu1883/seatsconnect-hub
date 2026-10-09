import Image from "next/image";
import { cn } from "cn";

export function Wordmark({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <Image
        src="/seatsconnect-mark.png"
        alt=""
        width={80}
        height={48}
        className={cn(
          "w-auto shrink-0 object-contain",
          compact ? "h-5 sm:h-6" : "h-9 sm:h-10",
        )}
      />
      <span className="inline-block shrink-0 text-left leading-none">
        <span
          className={cn(
            "block whitespace-nowrap font-tech font-bold uppercase tracking-[0.05em]",
            compact ? "text-[12px]" : "text-[14px] sm:text-[15px]",
            light ? "text-white" : "text-brand-dark",
          )}
        >
          SEATS<span className="text-brand-orange">CONNECT</span>™
        </span>
        {compact ? null : (
          <span
            className={cn(
              "mt-1.5 block whitespace-nowrap font-tech text-[6.9px] font-medium uppercase leading-none tracking-[0.01em] sm:text-[8.1px]",
              light ? "text-white/70" : "text-brand-gray",
            )}
          >
            Premium Supply. Global Reach.
          </span>
        )}
      </span>
    </span>
  );
}
