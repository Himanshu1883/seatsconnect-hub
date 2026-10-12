import Image from "next/image";
import {
  ArrowRight,
  Flag,
  Globe2,
  Music2,
  Plane,
  Search,
  ShieldCheck,
  Star,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroPhotos } from "@/lib/catalog";

const features = [
  {
    icon: ShieldCheck,
    title: "Official Tickets",
    detail: "Verified & secure",
  },
  {
    icon: Ticket,
    title: "Matchday Hospitality",
    detail: "Premium experiences",
  },
  {
    icon: Globe2,
    title: "100+ Countries",
    detail: "Global access",
  },
  {
    icon: Users,
    title: "Fans Worldwide",
    detail: "Trusted by millions",
  },
];

const experiences = [
  {
    icon: Trophy,
    title: "Top Leagues & Clubs",
    detail: "From the Premier League to global tournaments.",
    image: heroPhotos.left,
    imagePosition: "center",
  },
  {
    icon: Music2,
    title: "Concerts & Shows",
    detail: "Live music, festivals and world tours.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    imagePosition: "center",
  },
  {
    icon: Flag,
    title: "Motorsport & More",
    detail: "F1, MotoGP and major sporting events.",
    image:
      "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=900&q=80",
    imagePosition: "center",
  },
  {
    icon: Plane,
    title: "Plan Your Trip",
    detail: "Explore cities, venues and events together.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    imagePosition: "center",
  },
];

const stats = [
  { icon: Ticket, value: "50,000+", label: "Events every year" },
  { icon: Users, value: "2M+", label: "Fans served globally" },
  { icon: Globe2, value: "100+", label: "Countries" },
  { icon: Star, value: "4.8/5", label: "Customer rating" },
];

export function Hero({
  onFind,
  onGroups,
  onSearch,
}: {
  onFind: () => void;
  onGroups: () => void;
  onSearch: () => void;
}) {
  return (
    <section className="relative flex flex-col bg-white text-[#171717] lg:h-[calc(100dvh-4.25rem)] lg:overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[72%] sm:h-[74%]"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 50%, rgba(0,0,0,0.45) 78%, transparent 88%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 50%, rgba(0,0,0,0.45) 74%, transparent 86%)",
        }}
      >
        <div className="absolute inset-y-0 left-0 w-[65%]">
          <Image
            src={heroPhotos.left}
            alt=""
            fill
            priority
            sizes="65vw"
            className="object-cover object-[25%_center]"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-y-0 right-0 w-[65%] bg-gradient-to-r from-transparent via-[#11100e]/55 to-[#11100e]" />
        </div>
        <div className="absolute inset-y-0 right-0 w-[58%]">
          <Image
            src={heroPhotos.right}
            alt=""
            fill
            priority
            sizes="58vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-l from-transparent via-[#11100e]/60 to-[#11100e]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,9,0.82)_0%,rgba(10,10,9,0.5)_38%,rgba(10,10,9,0.12)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,transparent_32%,rgba(17,16,14,0.2)_70%,rgba(17,16,14,0.45)_100%)]" />
      </div>

      <div className="relative z-10 lg:min-h-0 lg:flex-1">
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-5 pt-10 pb-20 text-center sm:px-8 lg:px-8 lg:pt-6 lg:pb-24">
          <p className="mb-2 flex items-center gap-3 font-mono text-[10px] font-medium tracking-[0.32em] text-white/75 uppercase sm:text-xs">
            <span className="h-px w-7 bg-[#c69b60]/80" />
            Official tickets
            <span className="h-px w-7 bg-[#c69b60]/80" />
          </p>

          <h1 className="max-w-5xl font-tech text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[0.99] font-bold tracking-[-0.055em] text-white [text-shadow:0_3px_28px_rgba(0,0,0,0.5)]">
            Matchday{" "}
            <span className="bg-gradient-to-r from-[#b88a4b] via-[#f1d4a0] to-[#b88a4b] bg-clip-text text-transparent">
              hospitality.
            </span>
          </h1>

          <p className="mt-4 max-w-xl font-tech text-sm leading-relaxed text-white/85 sm:text-base">
            Football, rugby, tennis and Formula 1. Trusted by sports fans
            in over 100 countries.
          </p>

          <ul className="mt-5 grid w-full max-w-4xl grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 sm:gap-x-3 lg:mt-6">
            {features.map((item) => (
              <li key={item.title} className="flex items-center gap-3 text-left">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-[#063246] shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                  <item.icon className="size-[18px]" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block font-tech text-[12px] leading-tight font-semibold text-white sm:text-[13px]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-4 text-white/65">
                    {item.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center lg:mt-6">
            <Button
              onClick={onFind}
              className="h-12 flex-1 rounded-full border border-[#063246] bg-[#063246] px-6 font-tech text-sm font-semibold text-white shadow-[0_8px_24px_rgba(6,50,70,0.35)] transition-all hover:bg-[#0a4560]"
            >
              Browse fixtures
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onGroups}
              className="h-12 flex-1 rounded-full border border-white bg-white px-6 font-tech text-sm font-semibold text-[#063246] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all hover:border-[#eef3f5] hover:bg-[#eef3f5] hover:text-[#063246]"
            >
              Group bookings
            </Button>
          </div>

          <button
            type="button"
            onClick={onSearch}
            aria-haspopup="dialog"
            className="group mt-4 flex h-12 w-full max-w-xl items-center gap-3 rounded-full border border-[#ece4d8] bg-white pr-1.5 pl-5 text-left shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-all hover:border-[#063246]/40 hover:shadow-[0_14px_36px_rgba(6,50,70,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#063246] lg:mt-5"
          >
            <Search className="size-[18px] shrink-0 text-[#063246]" />
            <span className="min-w-0 flex-1 truncate font-tech text-sm text-[#8a847c] group-hover:text-[#5c5142]">
              Search clubs, matches, cities…
            </span>
            <kbd className="hidden h-6 items-center rounded-md border border-[#e6ded2] bg-[#faf7f2] px-2 font-mono text-[10px] font-semibold text-[#6d6458] sm:inline-flex">
              Ctrl K
            </kbd>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#063246] text-white transition-colors group-hover:bg-[#0a4560]">
              <ArrowRight className="size-4" />
            </span>
          </button>
        </div>
      </div>

      <div
        id="hero-experience"
        className="relative z-10 -mt-16 flex shrink-0 flex-col justify-center bg-gradient-to-b from-transparent via-white/55 to-white px-4 pt-10 pb-4 sm:-mt-20 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14 lg:pb-3.5 xl:px-10"
      >
        <div className="mx-auto grid w-full max-w-7xl items-stretch gap-4 lg:grid-cols-[minmax(22rem,0.9fr)_minmax(0,1.2fr)] lg:gap-6 xl:gap-8">
          <div className="flex flex-col">
            <p className="inline-flex w-fit items-center rounded-full border border-[#e6d7c0] bg-white px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.16em] text-[#8d7350] uppercase">
              Plan · Book · Experience
            </p>
            <h2 className="mt-3 font-tech text-[1.45rem] leading-[1.08] font-bold tracking-[-0.04em] text-[#171717] sm:text-[1.65rem] xl:text-[1.8rem]">
              More Than Tickets.
              <br />
              It&apos;s a{" "}
              <span className="whitespace-nowrap text-[#c4a36a]">Complete Experience.</span>
            </h2>
            <p className="mt-2.5 max-w-[20rem] text-[12px] leading-5 text-[#7a746c] sm:text-[13px] sm:leading-[1.45]">
              From iconic stadiums to world-class events, we make it easy
              to plan your next trip around the matches, concerts, or races
              you love.
            </p>

            <ul className="mt-4 flex flex-wrap items-center gap-y-3 lg:flex-nowrap">
              {stats.map((item, index) => (
                <li key={item.label} className="flex items-center">
                  {index > 0 ? (
                    <span className="mx-2.5 hidden h-8 w-px bg-[#eadfce] sm:block xl:mx-3" aria-hidden="true" />
                  ) : null}
                  <span className="flex items-center gap-2 pr-1">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#063246]/15 bg-[#eef3f5] text-[#063246]">
                      <item.icon className="size-3.5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-tech text-[13px] leading-none font-bold tracking-tight text-[#171717] xl:text-sm">
                        {item.value}
                      </span>
                      <span className="mt-1 block text-[10px] leading-3 text-[#8a847c]">
                        {item.label}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
            {experiences.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={onFind}
                className="group flex h-full min-h-0 min-w-0 flex-col rounded-[1.15rem] border border-[#efeae4] bg-white p-1.5 text-left shadow-[0_10px_28px_rgba(23,23,23,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c69b60]/45 hover:shadow-[0_14px_32px_rgba(23,23,23,0.08)]"
              >
                <span className="relative block h-24 overflow-hidden rounded-xl sm:h-28 lg:h-[7.25rem] xl:h-32">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 45vw, 18vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ objectPosition: item.imagePosition }}
                  />
                  <span className="absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full border border-white bg-white text-[#063246] shadow-sm">
                    <item.icon className="size-3.5" strokeWidth={1.75} />
                  </span>
                </span>
                <span className="flex items-center gap-1.5 px-1.5 pt-2 pb-1">
                  <span className="min-w-0 flex-1">
                    <span className="block font-tech text-[12px] leading-tight font-bold text-[#202020] xl:text-[13px]">
                      {item.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[10px] leading-[1.35] text-[#8a847c] xl:text-[11px]">
                      {item.detail}
                    </span>
                  </span>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#ece7e1] text-[#063246] transition-colors group-hover:border-[#063246] group-hover:bg-[#063246] group-hover:text-white">
                    <ArrowRight className="size-3" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
