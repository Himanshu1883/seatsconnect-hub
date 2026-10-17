"use client";

import type { KeyboardEvent } from "react";
import type { StandId, Venue, VenueMapLayout } from "@/lib/sports/types";
import { cn } from "cn";

type Shape = { id: StandId; d: string; label: { x: number; y: number; rotate?: number }; tiers: string[] };

const shapes: Shape[] = [
  { id: "north", d: "M102 22h196v54H102z", label: { x: 200, y: 52 }, tiers: ["M102 42h196", "M102 60h196"] },
  { id: "south", d: "M102 224h196v54H102z", label: { x: 200, y: 254 }, tiers: ["M102 240h196", "M102 258h196"] },
  { id: "west", d: "M30 82h64v136H30z", label: { x: 62, y: 150, rotate: -90 }, tiers: ["M52 82v136", "M72 82v136"] },
  { id: "east", d: "M306 82h64v136h-64z", label: { x: 338, y: 150, rotate: 90 }, tiers: ["M328 82v136", "M348 82v136"] },
  { id: "nw", d: "M30 76V58c0-20 16-36 36-36h30v54z", label: { x: 63, y: 53 }, tiers: [] },
  { id: "ne", d: "M304 22h30c20 0 36 16 36 36v18h-66z", label: { x: 337, y: 53 }, tiers: [] },
  { id: "sw", d: "M30 224h66v54H66c-20 0-36-16-36-36z", label: { x: 63, y: 255 }, tiers: [] },
  { id: "se", d: "M304 224h66v18c0 20-16 36-36 36h-30z", label: { x: 337, y: 255 }, tiers: [] },
];

const corners: Record<string, string> = { nw: "NW", ne: "NE", sw: "SW", se: "SE" };

function MapCenter({ layout }: { layout: VenueMapLayout }) {
  if (layout === "circuit") {
    return (
      <g>
        <ellipse cx="200" cy="150" rx="88" ry="52" fill="none" stroke="#3a3a3a" strokeWidth="24" />
        <ellipse cx="200" cy="150" rx="88" ry="52" fill="none" stroke="#5c5c5c" strokeWidth="3" strokeDasharray="6 5" opacity="0.55" />
        <path d="M200 98 L228 118 L238 150 L220 182 L200 202 L168 188 L158 150 L172 112 Z" fill="#2d2d2d" opacity="0.35" />
      </g>
    );
  }
  if (layout === "court") {
    return (
      <g>
        <rect x="118" y="98" width="164" height="104" rx="2" fill="#2d6b4f" />
        <g fill="none" stroke="#e8f0ea" strokeWidth="1.6">
          <rect x="126" y="106" width="148" height="88" />
          <path d="M200 106v88" />
          <rect x="126" y="124" width="22" height="52" />
          <rect x="252" y="124" width="22" height="52" />
        </g>
      </g>
    );
  }
  if (layout === "bowl") {
    return (
      <g>
        <rect x="118" y="108" width="164" height="84" rx="8" fill="#1a1512" opacity="0.92" />
        <rect x="138" y="128" width="124" height="44" rx="4" fill="#2a2220" />
        <ellipse cx="200" cy="150" rx="18" ry="10" fill="#c69f68" opacity="0.55" />
      </g>
    );
  }
  if (layout === "course") {
    return (
      <g>
        <rect x="102" y="84" width="196" height="132" rx="6" fill="#3d6b45" />
        <ellipse cx="155" cy="130" rx="28" ry="18" fill="#4a7c52" opacity="0.7" />
        <ellipse cx="245" cy="168" rx="32" ry="20" fill="#4a7c52" opacity="0.7" />
        <circle cx="268" cy="175" r="3" fill="#fff" />
        <circle cx="162" cy="128" r="3" fill="#fff" />
      </g>
    );
  }
  return (
    <g>
      <rect x="102" y="84" width="196" height="132" rx="6" fill="#4f8f4f" />
      {Array.from({ length: 7 }, (_, index) => (
        <rect key={index} x={102 + index * 28} y="84" width="14" height="132" fill="#5a9a58" />
      ))}
      <g fill="none" stroke="#ffffffcc" strokeWidth="1.4">
        <rect x="110" y="92" width="180" height="116" rx="1" />
        <path d="M200 92v116" />
        <circle cx="200" cy="150" r="17" />
        <rect x="110" y="122" width="26" height="56" />
        <rect x="264" y="122" width="26" height="56" />
        <rect x="110" y="137" width="9" height="26" />
        <rect x="281" y="137" width="9" height="26" />
      </g>
      <circle cx="200" cy="150" r="2" fill="#fff" />
    </g>
  );
}

export function StadiumMap({
  venue,
  available,
  active,
  onSelect,
  className,
  compact = false,
}: {
  venue: Venue;
  available: StandId[];
  active?: StandId | null;
  onSelect?: (stand: StandId) => void;
  className?: string;
  compact?: boolean;
}) {
  function keyDown(event: KeyboardEvent, id: StandId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(id);
    }
  }

  return (
    <figure className={cn("relative", className)}>
      <svg viewBox="0 0 400 300" className="h-auto w-full" role="group" aria-label={`${venue.name} seating map`}>
        <rect x="14" y="8" width="372" height="284" rx="64" fill="#efe5da" />
        <rect x="22" y="15" width="356" height="270" rx="58" fill="none" stroke="#dacbbd" strokeDasharray="3 4" />
        {shapes.map((shape) => {
          const isActive = active === shape.id;
          const isAvailable = available.includes(shape.id);
          const name = corners[shape.id] ?? venue.stands[shape.id as keyof Venue["stands"]];
          const interactive = Boolean(onSelect) && isAvailable;
          return (
            <g
              key={shape.id}
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-pressed={interactive ? isActive : undefined}
              aria-label={interactive ? `${name} — show packages` : undefined}
              onClick={interactive ? () => onSelect?.(shape.id) : undefined}
              onKeyDown={interactive ? (event) => keyDown(event, shape.id) : undefined}
              className={cn("outline-none", interactive && "cursor-pointer [&:focus-visible>path:first-child]:stroke-brand-cta")}
            >
              <path
                d={shape.d}
                className="transition-[fill] duration-300"
                fill={isActive ? "#063246" : isAvailable ? "#bcd3de" : "#dacbbd"}
                stroke={isActive ? "#063246" : "#fffdfa"}
                strokeWidth="2.5"
              />
              {shape.tiers.map((tier) => (
                <path key={tier} d={tier} stroke={isActive ? "#ffffff40" : "#ffffff90"} strokeWidth="1" />
              ))}
              {!compact || corners[shape.id] ? (
                <text
                  x={shape.label.x}
                  y={shape.label.y}
                  transform={shape.label.rotate ? `rotate(${shape.label.rotate} ${shape.label.x} ${shape.label.y})` : undefined}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={corners[shape.id] ? 10 : 9.5}
                  fontWeight="700"
                  fill={isActive ? "#ffffff" : "#1a1512"}
                  className="pointer-events-none select-none"
                  style={{ fontFamily: "var(--font-mona), sans-serif" }}
                >
                  {name}
                </text>
              ) : null}
            </g>
          );
        })}
        <MapCenter layout={venue.mapLayout ?? "pitch"} />
      </svg>
      {!compact ? (
        <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-taupe">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-[4px] bg-brand-cta" /> Selected package
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-[4px] bg-[#bcd3de]" /> Packages available
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-[4px] bg-line-strong" /> Not offered
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
