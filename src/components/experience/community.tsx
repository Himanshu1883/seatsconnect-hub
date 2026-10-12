"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Plus, Star } from "lucide-react";
import { faqs, socialFilters, socialPosts, type SocialKind } from "@/lib/experiences";
import { Reveal } from "./reveal";
import { SectionHead, Wrap } from "./ui";
import { cn } from "cn";

export function SocialEdit({ onOpen }: { onOpen: (caption: string) => void }) {
  const [media, setMedia] = useState<SocialKind | "all">("all");
  const posts = socialPosts.filter((post) => media === "all" || post.kind === media);

  return (
    <section id="social" className="scroll-mt-[100px] bg-ink py-[60px] text-cream md:py-[84px]">
      <Wrap>
        <SectionHead
          dark
          eyebrow="The SeatsConnect social edit"
          lines={["Feel the atmosphere.", "Before you get there."]}
          body="Event-day photographs, behind-the-scenes moments and reels from the world of live experiences."
        />
        <Reveal className="mb-8">
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter social media">
            {socialFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={media === item.value}
                onClick={() => setMedia(item.value)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors",
                  media === item.value
                    ? "border-white bg-white text-brand-cta"
                    : "border-[#655448] bg-white/[0.03] text-line hover:border-line",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 min-[701px]:grid-cols-4 min-[701px]:gap-5">
          {posts.map((post, index) => (
            <Reveal key={post.caption} delay={index * 90}>
              <button
                type="button"
                onClick={() => onOpen(post.caption)}
                className="group relative flex aspect-[9/13] w-full flex-col justify-between overflow-hidden rounded-[26px] border border-[#514337] bg-[#36291e] p-4 text-left text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1.5 min-[701px]:p-6"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 701px) 25vw, 50vw"
                  className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(transparent_35%,#1a1512f0)]" />
                <span className="relative z-10 w-max rounded-full border border-white/15 bg-[#1a151299] px-3 py-1.5 text-[10px] font-semibold tracking-[1px] uppercase backdrop-blur">
                  {post.label}
                </span>
                {post.kind === "reel" ? (
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid size-[60px] place-items-center self-center rounded-full border border-white/40 bg-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-brand-cta"
                  >
                    <Play className="ml-0.5 size-5 fill-current" />
                  </span>
                ) : (
                  <span />
                )}
                <div className="relative z-10">
                  <strong className="block font-tech text-[22px] leading-[1.08] font-bold tracking-[-1px] min-[701px]:text-[27px]">
                    {post.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </strong>
                  <small className="mt-3 block text-xs text-[#ddd0c2]">{post.detail}</small>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[#bfb0a1]">
          Instagram · Social posts · Reels · Event galleries — illustrative media slots awaiting your
          approved posts and videos.
        </p>
      </Wrap>
    </section>
  );
}

export function Reviews() {
  const panels = [
    {
      brand: (
        <span className="flex items-center gap-2 text-[#00845c]">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#19b07f,#00845c)] text-white shadow-[0_8px_18px_-8px_rgba(0,132,92,0.8),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <Star className="size-5 fill-current" />
          </span>
          Trustpilot
        </span>
      ),
      title: "Client stories, in their own words.",
      body: "Your genuine Trustpilot reviews and current rating will appear here once your business profile is connected.",
      status: "Trustpilot profile awaiting connection",
    },
    {
      brand: (
        <span className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white font-tech text-xl font-extrabold text-[#4285f4] shadow-[0_8px_18px_-8px_rgba(66,133,244,0.6),inset_0_-2px_0_rgba(0,0,0,0.06)] ring-1 ring-line">
            G
          </span>
          <span className="text-[#4285f4]">
            Google <span className="text-ink">Reviews</span>
          </span>
        </span>
      ),
      title: "Feedback you can explore.",
      body: "Your authentic Google Business reviews will appear here, with a link to the original profile and feedback.",
      status: "Google Business Profile awaiting connection",
    },
  ];

  return (
    <section id="reviews" className="scroll-mt-[100px] py-[60px] md:py-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="Independent client feedback"
          lines={["Great occasions.", "Shared experiences."]}
          body="Dedicated spaces for verified feedback from the people who book with SeatsConnect."
        />
        <div className="grid gap-6 min-[701px]:grid-cols-2">
          {panels.map((panel, index) => (
            <Reveal key={panel.title} delay={index * 120} className="h-full">
              <article className="h-full rounded-[28px] border border-line bg-paper p-7 transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(26,21,18,0.45)] min-[701px]:p-10">
                <div className="font-tech text-[25px] font-bold">{panel.brand}</div>
                <h3 className="mt-7 mb-3 font-tech text-[22px] font-bold text-ink">{panel.title}</h3>
                <p className="max-w-[440px] text-[15px] leading-[1.65] text-taupe">{panel.body}</p>
                <div className="mt-7 flex items-center gap-2 border-t border-line pt-5 text-xs text-[#8c7a68]">
                  <span className="size-2 rounded-full bg-gold-deep/60" />
                  {panel.status}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-taupe">
          Review layout preview. No customer quotes, star ratings or review counts have been invented.
        </p>
      </Wrap>
    </section>
  );
}

export function Faqs() {
  return (
    <section className="py-[60px] md:py-[84px]">
      <Wrap>
        <Reveal>
          <span className="over text-gold-deep">A few useful answers</span>
          <h2 className="mt-3 mb-8 font-tech text-[36px] font-bold tracking-[-1px] text-ink">
            Plan with confidence.
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <details
                open={index === 0}
                className="group rounded-[22px] border border-line bg-paper px-6 py-5 transition-shadow open:shadow-[0_18px_40px_-28px_rgba(26,21,18,0.45)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-tech text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand text-brand-cta transition-all group-open:rotate-45 group-open:bg-brand-cta group-open:text-white">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="max-w-[900px] pt-4 text-[15px] leading-[1.7] text-taupe">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
