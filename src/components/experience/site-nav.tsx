import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, quickLinks, type ExperienceType } from "@/lib/experiences";
import { btnPrimarySoft } from "./ui";
import { cn } from "cn";

export function Logo({ dark = false, withMark = true }: { dark?: boolean; withMark?: boolean }) {
  return (
    <span className="flex items-center gap-[9px]">
      {withMark ? (
        <Image
          src="/seatsconnect-mark.png"
          alt=""
          width={42}
          height={35}
          className="h-[30px] w-[36px] object-contain sm:h-[35px] sm:w-[42px]"
        />
      ) : null}
      <span className="leading-none">
        <span
          className={cn(
            "block font-tech text-[20px] font-extrabold tracking-[-1px] sm:text-[23px]",
            dark ? "text-cream" : "text-ink",
          )}
        >
          Seats<span className="text-[#a37a43]">Connect</span>
        </span>
        {withMark ? (
          <small
            className={cn(
              "mt-1 block text-[8px] font-medium tracking-[1px] uppercase",
              dark ? "text-[#b6a99a]" : "text-ink",
            )}
          >
            Official tickets. Extraordinary moments.
          </small>
        ) : null}
      </span>
    </span>
  );
}

export function SiteNav({ onCategory }: { onCategory?: (type: ExperienceType) => void }) {
  return (
    <>
      <div className="bg-ink px-4 py-1.5 text-center text-[11px] tracking-[0.8px] text-line uppercase [@media(min-height:901px)]:py-2.5">
        Official tickets &amp; hospitality · International events · Specialist personal service
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-cream">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-[25px] px-[5%] md:h-[76px] [@media(min-height:901px)]:h-[75px] [@media(min-height:901px)]:md:h-[86px]">
          <Link href="/" aria-label="SeatsConnect home">
            <Logo />
          </Link>
          <nav className="flex items-center gap-[26px] text-[13px] font-bold text-ink">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn("hidden transition-colors hover:text-brand-cta", index === 0 ? "md:inline" : "xl:inline")}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#request" className={cn(btnPrimarySoft, "max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[11px]")}>
              Request an event
              <ArrowUpRight className="size-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Quick event navigation"
        className="fold-quick flex justify-start gap-7 overflow-x-auto border-b border-line bg-paper px-[5%] py-3 text-[13px] font-medium text-ink [scrollbar-width:none] lg:justify-between lg:gap-5 [@media(min-height:901px)]:py-[17px] [&::-webkit-scrollbar]:hidden"
      >
        {quickLinks.map(({ label, href, category }) => (
          <Link
            key={label}
            href={href}
            onClick={category && onCategory ? () => onCategory(category) : undefined}
            className="whitespace-nowrap transition-colors hover:text-brand-cta"
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
