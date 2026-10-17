"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { popularSearches, slides, type ExperienceType } from "@/lib/experiences";
import { btnLight, btnPrimary, Wrap } from "./ui";
import { cn } from "cn";

const heroCtas = [
  { href: "/football", label: "Explore football tickets" },
  { href: "/formula-1", label: "Explore Formula 1 tickets" },
  { href: "/concerts", label: "Explore concert tickets" },
] as const;

export function HeroCarousel({ onCategory }: { onCategory: (type: ExperienceType) => void }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="hero-stage relative flex min-h-[52vh] max-h-[78vh] items-center overflow-hidden bg-ink pt-8 pb-16 text-white sm:min-h-[56vh] sm:pt-10 sm:pb-[4.5rem] md:pt-11 md:pb-20 xl:min-h-[60vh] xl:pt-14 xl:pb-24"
    >
      {slides.map((item, i) => (
        <Image
          key={item.image}
          src={item.image}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#1a1512ed,#1a15126b_65%,#1a15121a)]" />

      <Wrap className="relative">
        <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-gold-soft uppercase">
          Your connection to the occasion
        </span>
        <h1
          key={`title-${index}`}
          aria-live="polite"
          className="hero-fade-up my-3 max-w-[650px] font-tech text-[40px] leading-[1.05] font-bold tracking-[-2px] sm:my-3.5 sm:text-[clamp(40px,3.8vw,58px)] sm:tracking-[-3px] xl:my-4 xl:text-[clamp(48px,4.2vw,68px)]"
        >
          {slide.title}
          {slide.accent.map((line) => (
            <span key={line} className="block text-gold-soft">
              {line}
            </span>
          ))}
        </h1>
        <p
          key={`desc-${index}`}
          className="hero-fade-up hero-fade-up-1 hero-lead mb-4 max-w-[460px] text-[14px] leading-[1.55] text-[#e2e7ed] sm:mb-5 sm:text-[15px] sm:leading-[1.6] xl:mb-6"
        >
          {slide.desc}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href={heroCtas[index]?.href ?? "/#discover"} className={btnPrimary}>
            {heroCtas[index]?.label ?? "Explore experiences"}
            <ArrowUpRight className="size-3.5" />
          </Link>
          <a href="#services" className={btnLight}>
            Speak to a specialist
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-5">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#d5c8b9] sm:gap-[15px]">
            <span>Popular searches</span>
            {popularSearches.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="border-b border-brand-orange pb-[3px] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href="#discover"
                  onClick={() => onCategory(item.category)}
                  className="border-b border-brand-orange pb-[3px] transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-3 text-[10px] text-line">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous featured collection"
              className="flex size-[34px] items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-brand-cta"
            >
              <ArrowLeft className="size-3.5" />
            </button>
            <span className="tabular-nums">
              0{index + 1} / 0{slides.length}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next featured collection"
              className="flex size-[34px] items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-brand-cta"
            >
              <ArrowRight className="size-3.5" />
            </button>
            {slides.map((item, i) => (
              <button
                key={item.image}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show featured collection ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  i === index ? "bg-brand-orange" : "bg-white/35 hover:bg-white/60",
                )}
              />
            ))}
          </div>

          <span className="ml-auto hidden text-[10px] tracking-[2.2px] text-white/80 uppercase md:inline">
            The atmosphere. The occasion. The connection.
          </span>
        </div>
      </Wrap>
    </section>
  );
}
