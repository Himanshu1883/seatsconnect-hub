import { useId, type ReactNode } from "react";
import { cn } from "cn";

export type Icon3DName =
  | "check"
  | "shield"
  | "star"
  | "globe"
  | "headset"
  | "seat"
  | "glass"
  | "suite"
  | "group"
  | "ticket"
  | "crown"
  | "compass";

const tones = {
  blue: { from: "#2a86ad", via: "#0b4a66", to: "#063246", depth: "#021a26", glyphFrom: "#ffffff", glyphTo: "#cfe3ee" },
  light: { from: "#ffffff", via: "#f3f7f9", to: "#dde8ee", depth: "#9fb6c3", glyphFrom: "#0d5577", glyphTo: "#063246" },
};

function glyph(name: Icon3DName, paint: string, cut: string): ReactNode {
  const stroke = {
    fill: "none",
    stroke: paint,
    strokeWidth: 3.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "check":
      return <path d="M15.5 23.5l5.5 5.5 11.5-12" {...stroke} strokeWidth={3.8} />;
    case "shield":
      return (
        <>
          <path d="M24 11.5l10 3.8v6.9c0 6.4-4.2 10.6-10 12.8-5.8-2.2-10-6.4-10-12.8v-6.9z" fill={paint} />
          <path d="M19.4 22.8l3.4 3.4 6.2-6.6" fill="none" stroke={cut} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "star":
      return (
        <path
          d="M24 11.5l3.7 7.6 8.3 1.2-6 5.9 1.4 8.3L24 30.6l-7.4 3.9 1.4-8.3-6-5.9 8.3-1.2z"
          fill={paint}
          stroke={paint}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      );
    case "globe":
      return (
        <>
          <circle cx="24" cy="23" r="11" {...stroke} strokeWidth={2.8} />
          <path d="M13 23h22M24 12c3.2 3.2 4.6 7 4.6 11s-1.4 7.8-4.6 11c-3.2-3.2-4.6-7-4.6-11s1.4-7.8 4.6-11z" {...stroke} strokeWidth={2.4} />
        </>
      );
    case "headset":
      return (
        <>
          <path d="M14.5 26v-3a9.5 9.5 0 0119 0v3" {...stroke} strokeWidth={2.8} />
          <rect x="12" y="23.5" width="6" height="9" rx="2.6" fill={paint} />
          <rect x="30" y="23.5" width="6" height="9" rx="2.6" fill={paint} />
          <path d="M33 32.5c0 2.4-2.6 3.5-6 3.5" {...stroke} strokeWidth={2.2} />
        </>
      );
    case "seat":
      return (
        <>
          <path d="M17 12.5h14a2.5 2.5 0 012.5 2.5v9.5h-19V15a2.5 2.5 0 012.5-2.5z" fill={paint} />
          <rect x="12" y="23" width="24" height="6.5" rx="2.6" fill={paint} />
          <path d="M16 29.5v5M32 29.5v5" {...stroke} strokeWidth={2.8} />
        </>
      );
    case "glass":
      return (
        <>
          <path d="M16.5 12h15c0 7-3.2 11.6-7.5 11.6S16.5 19 16.5 12z" fill={paint} />
          <path d="M24 23.6v9.4M18.5 34h11" {...stroke} strokeWidth={2.8} />
          <circle cx="21" cy="16" r="1.2" fill={cut} />
          <circle cx="25.5" cy="18.4" r="0.9" fill={cut} />
        </>
      );
    case "suite":
      return (
        <>
          <path d="M14 34V16.5a2 2 0 011.2-1.8l8-3.6a2 2 0 011.6 0l8 3.6a2 2 0 011.2 1.8V34z" fill={paint} />
          <rect x="18.5" y="18" width="3.6" height="3.6" rx="0.8" fill={cut} />
          <rect x="25.9" y="18" width="3.6" height="3.6" rx="0.8" fill={cut} />
          <rect x="21.6" y="26" width="4.8" height="8" rx="1" fill={cut} />
        </>
      );
    case "group":
      return (
        <>
          <circle cx="19" cy="18.5" r="4.6" fill={paint} />
          <path d="M10.5 33.5c0-5 3.8-8.4 8.5-8.4s8.5 3.4 8.5 8.4z" fill={paint} />
          <circle cx="30" cy="17.5" r="3.8" fill={paint} opacity={0.85} />
          <path d="M28.2 24.4c.6-.1 1.2-.2 1.8-.2 4 0 7.5 3 7.5 7.5v1.8h-7.6" fill={paint} opacity={0.85} />
        </>
      );
    case "ticket":
      return (
        <>
          <path
            d="M12 17.5a2.5 2.5 0 012.5-2.5h19a2.5 2.5 0 012.5 2.5v3a3 3 0 000 6v3a2.5 2.5 0 01-2.5 2.5h-19a2.5 2.5 0 01-2.5-2.5v-3a3 3 0 000-6z"
            fill={paint}
          />
          <path d="M28 16.5v15" fill="none" stroke={cut} strokeWidth={1.6} strokeDasharray="2 2.2" />
          <path d="M17 21h7M17 25.5h5" fill="none" stroke={cut} strokeWidth={2} strokeLinecap="round" />
        </>
      );
    case "crown":
      return (
        <>
          <path d="M12.5 18l6 4.8L24 13.5l5.5 9.3 6-4.8-2.4 12.5H14.9z" fill={paint} strokeLinejoin="round" />
          <rect x="14.6" y="32" width="18.8" height="3" rx="1.5" fill={paint} />
          <circle cx="24" cy="25.5" r="1.7" fill={cut} />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="24" cy="23.5" r="11" {...stroke} strokeWidth={2.8} />
          <path d="M28.8 18.7l-2.6 7.7-7.7 2.6 2.6-7.7z" fill={paint} />
          <circle cx="24" cy="23.8" r="1.4" fill={cut} />
        </>
      );
  }
}

export function Icon3D({
  name,
  tone = "blue",
  className,
}: {
  name: Icon3DName;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const t = tones[tone];

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("size-12 shrink-0", className)}>
      <defs>
        <linearGradient id={`${id}-tile`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={t.from} />
          <stop offset="0.55" stopColor={t.via} />
          <stop offset="1" stopColor={t.to} />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-glyph`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.glyphFrom} />
          <stop offset="1" stopColor={t.glyphTo} />
        </linearGradient>
        <filter id={`${id}-lift`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="1.1" floodColor={t.depth} floodOpacity="0.55" />
        </filter>
      </defs>
      <rect x="4" y="6.5" width="40" height="38.5" rx="12.5" fill={t.depth} opacity="0.35" />
      <rect x="4" y="3" width="40" height="40" rx="12.5" fill={`url(#${id}-tile)`} />
      <path d="M16.5 3.6h15a12 12 0 0112 12v.4C36 13 30 12 24 12s-12 1-19.5 4v-.4a12 12 0 0112-12z" fill={`url(#${id}-gloss)`} />
      <rect x="4.6" y="3.6" width="38.8" height="38.8" rx="12" fill="none" stroke="#fff" strokeOpacity={tone === "blue" ? 0.18 : 0.9} />
      <g filter={`url(#${id}-lift)`}>{glyph(name, `url(#${id}-glyph)`, tone === "blue" ? t.to : "#ffffff")}</g>
    </svg>
  );
}
