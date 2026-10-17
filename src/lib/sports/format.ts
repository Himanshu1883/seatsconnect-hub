import type { Availability } from "./types";

const formatter = (timeZone: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone, ...options });

export function dateParts(iso: string, timeZone: string) {
  const date = new Date(iso);
  return {
    weekday: formatter(timeZone, { weekday: "short" }).format(date),
    day: formatter(timeZone, { day: "2-digit" }).format(date),
    month: formatter(timeZone, { month: "short" }).format(date),
    monthLong: formatter(timeZone, { month: "long", year: "numeric" }).format(date),
    time: formatter(timeZone, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date),
    full: formatter(timeZone, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date),
    short: formatter(timeZone, { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(date),
  };
}

export function timeAt(iso: string, timeZone: string, offsetMinutes: number) {
  const date = new Date(new Date(iso).getTime() + offsetMinutes * 60_000);
  return formatter(timeZone, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}

export const money = (value: number) => {
  const digits = Number.isInteger(value) ? 0 : 2;
  return `£${value.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
};

export const availabilityCopy: Record<Availability, { label: string; tone: string }> = {
  available: { label: "On sale", tone: "bg-[#e6f2ea] text-[#1f6b3a]" },
  limited: { label: "Low ticket warning", tone: "bg-[#fbeedd] text-[#9a5a12]" },
  "sold-out": { label: "Sold out", tone: "bg-[#f1e7e4] text-[#8b3a2c]" },
  "coming-soon": { label: "Available soon", tone: "bg-[#e6eef3] text-brand-cta" },
};

export const tierLabel = {
  ticket: "Ticket plus",
  hospitality: "Hospitality",
  premium: "Premium hospitality",
  box: "VIP & private",
} as const;
