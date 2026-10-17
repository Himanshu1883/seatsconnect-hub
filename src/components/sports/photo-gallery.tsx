"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { Media } from "@/lib/sports/types";
import { Modal } from "./modal";
import { cn } from "cn";

export function PhotoGallery({ media, title }: { media: Media[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const tiles = media.slice(0, 5);

  return (
    <>
      <div className="grid h-[420px] grid-cols-2 grid-rows-2 gap-2.5 md:h-[460px] md:grid-cols-4">
        {tiles.map((item, position) => (
          <button
            key={item.src + position}
            type="button"
            onClick={() => setIndex(position)}
            aria-label={`Open photo: ${item.alt}`}
            className={cn(
              "group relative overflow-hidden rounded-[22px] bg-[#283f51]",
              position === 0 && "col-span-2 row-span-2",
              position > 2 && "hidden md:block",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={position === 0 ? "(min-width: 768px) 50vw, 100vw" : "25vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-[linear-gradient(transparent_60%,#1a1512aa)] opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              {item.alt}
            </span>
            {position === tiles.length - 1 ? (
              <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-brand-cta shadow">
                <Expand className="size-3.5" /> All photos ({media.length})
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <Modal open={index != null} onClose={() => setIndex(null)} eyebrow={`Gallery · ${media.length} photos`} title={title} wide>
        {index != null ? (
          <div>
            <div className="relative h-[55vh] max-h-[580px] min-h-[260px] overflow-hidden rounded-[22px] bg-[#283f51]">
              <Image src={media[index].src} alt={media[index].alt} fill sizes="90vw" className="object-cover" />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-[13px] text-white backdrop-blur">
                {index + 1} / {media.length} · {media[index].alt}
              </span>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setIndex((i) => ((i ?? 0) - 1 + media.length) % media.length)}
                className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-cta shadow-lg hover:bg-brand-cta hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setIndex((i) => ((i ?? 0) + 1) % media.length)}
                className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-cta text-white shadow-lg hover:bg-brand-cta-hover"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {media.map((item, position) => (
                <button
                  key={item.src + position}
                  type="button"
                  onClick={() => setIndex(position)}
                  aria-label={`Show ${item.alt}`}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-[12px] ring-2 transition-all",
                    position === index ? "ring-brand-cta" : "opacity-70 ring-transparent hover:opacity-100",
                  )}
                >
                  <Image src={item.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
