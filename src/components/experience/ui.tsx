import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { cn } from "cn";

export const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[3px] px-[21px] py-[14px] font-tech text-xs font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

export const btnPrimary = cn(
  btnBase,
  "bg-brand-cta text-white hover:bg-brand-cta-hover focus-visible:outline-brand-cta",
);

export const btnLight = cn(
  btnBase,
  "border border-white bg-white text-brand-cta hover:bg-[#eef3f5] focus-visible:outline-white",
);

const soft =
  "rounded-full px-6 py-[15px] text-[13px] shadow-[0_10px_24px_-10px_rgba(6,50,70,0.55)] transition-all hover:-translate-y-0.5";

export const btnPrimarySoft = cn(btnPrimary, soft);
export const btnLightSoft = cn(btnLight, soft, "shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]");

export function SectionHead({
  eyebrow,
  lines,
  body,
  dark = false,
  className,
}: {
  eyebrow: string;
  lines: string[];
  body?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-[30px]",
        className,
      )}
    >
      <div>
        <span className={cn("over", dark ? "text-gold-soft" : "text-gold-deep")}>{eyebrow}</span>
        <h2
          className={cn(
            "mt-3 font-tech text-[35px] leading-[1.12] font-bold tracking-[-1.5px] md:text-[44px] md:tracking-[-1.8px]",
            dark ? "text-cream" : "text-ink",
          )}
        >
          {lines.map((line, index) => (
            <span key={line} className="block">
              {line}
              {index < lines.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
      </div>
      {body ? (
        <p className={cn("max-w-[380px] text-[15px] leading-[1.65]", dark ? "text-[#c9bcae]" : "text-taupe")}>
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-[5%]", className)}>{children}</div>;
}
