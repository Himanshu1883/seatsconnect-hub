"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqGroup } from "@/lib/sports/types";
import { cn } from "cn";

export function FaqTabs({ groups }: { groups: FaqGroup[] }) {
  const [tab, setTab] = useState(0);
  const current = groups[tab] ?? groups[0];

  return (
    <div>
      {groups.length > 1 ? (
        <div role="tablist" aria-label="FAQ topics" className="mb-5 flex flex-wrap gap-2">
          {groups.map((group, index) => (
            <button
              key={group.label}
              type="button"
              role="tab"
              aria-selected={index === tab}
              onClick={() => setTab(index)}
              className={cn(
                "rounded-full px-4 py-2 font-tech text-[13px] font-bold transition-colors",
                index === tab ? "bg-brand-cta text-white" : "border border-line bg-white text-ink hover:border-brand-cta hover:text-brand-cta",
              )}
            >
              {group.label}
              <span className={cn("ml-1.5 text-[11px]", index === tab ? "text-white/70" : "text-taupe")}>{group.items.length}</span>
            </button>
          ))}
        </div>
      ) : null}
      <div role="tabpanel" className="grid gap-3 md:grid-cols-2">
        {current.items.map((item) => (
          <details
            key={item.q}
            className="group h-fit rounded-[22px] border border-line bg-paper px-5 py-4 transition-shadow open:shadow-[0_18px_40px_-28px_rgba(26,21,18,0.45)]"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-tech text-[15.5px] leading-[1.4] font-bold text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-sand text-brand-cta transition-transform group-open:rotate-45">
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-[1.65] text-taupe">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
