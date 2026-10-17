"use client";

import { useEffect, useState } from "react";

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
  };
}

export function Countdown({
  kickoff,
  variant = "default",
}: {
  kickoff: string;
  variant?: "default" | "match-card";
}) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(kickoff).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [kickoff]);

  if (left == null) return <div className="h-[62px]" aria-hidden />;

  if (left <= 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#1f8a4c] px-4 py-2 text-[13px] font-bold text-white">
        <span className="live-ping size-2 rounded-full bg-white" /> Match day — kick-off reached
      </span>
    );
  }

  const parts = split(left);
  const rows = [
    ["days", "DAYS", parts.days],
    ["hrs", "HRS", parts.hours],
    ["min", "MIN", parts.mins],
    ["sec", "SEC", parts.secs],
  ] as const;

  const isCard = variant === "match-card";

  return (
    <div className={isCard ? "flex w-full gap-2" : "flex gap-2"} role="timer" aria-label="Time until kick-off">
      {rows.map(([key, label, value]) => (
        <span
          key={key}
          className={
            isCard
              ? "flex min-w-0 flex-1 flex-col items-center rounded-[12px] border border-white/35 bg-white/15 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md"
              : "flex w-[60px] flex-col items-center rounded-[16px] border border-white/15 bg-white/10 py-2 backdrop-blur"
          }
        >
          <span className={isCard ? "font-tech text-[18px] leading-none font-extrabold text-white tabular-nums" : "font-tech text-[22px] leading-none font-extrabold text-white tabular-nums"}>{String(value).padStart(2, "0")}</span>
          <span className={isCard ? "mt-0.5 text-[8px] font-bold tracking-[.14em] text-white/60 uppercase" : "mt-1 text-[9px] font-bold tracking-[.16em] text-white/55 uppercase"}>{label}</span>
        </span>
      ))}
    </div>
  );
}
