import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import type { Club } from "@/lib/sports/types";
import { SiteNav } from "@/components/experience/site-nav";
import { Footer } from "@/components/experience/enquiry";
import { Icon3D, type Icon3DName } from "@/components/experience/icons-3d";
import { Reveal } from "@/components/experience/reveal";
import { Wrap } from "@/components/experience/ui";
import { cn } from "cn";

export function SportShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

type Crumb = { label: string; href?: string };

function collapseCrumbs(items: Crumb[]): Crumb[] {
  const crumbs: Crumb[] = [];
  for (const item of items) {
    const previous = crumbs[crumbs.length - 1];
    if (previous && previous.label.toLowerCase() === item.label.toLowerCase()) {
      if (!item.href) previous.href = undefined;
      continue;
    }
    crumbs.push({ ...item });
  }
  return crumbs;
}

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const crumbs = collapseCrumbs(items);
  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((item, index) => (
          <li key={`${index}-${item.href ?? "current"}-${item.label}`} className="flex items-center gap-1.5">
            {index > 0 ? <ChevronRight className={cn("size-3.5", dark ? "text-white/40" : "text-taupe/60")} /> : null}
            {item.href ? (
              <Link
                href={item.href}
                className={cn("transition-colors", dark ? "text-white/70 hover:text-white" : "text-taupe hover:text-brand-cta")}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn("font-semibold", dark ? "text-white" : "text-ink")}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ClubBadge({ club, className }: { club: Pick<Club, "code" | "colors" | "name">; className?: string }) {
  const [primary, secondary] = club.colors;
  return (
    <svg viewBox="0 0 40 44" role="img" aria-label={`${club.name} crest`} className={cn("size-12 shrink-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.22)]", className)}>
      <path d="M20 2 36 7v13c0 11-7 17.5-16 22C11 37.5 4 31 4 20V7z" fill={primary} stroke="rgba(0,0,0,.18)" strokeWidth="1" />
      <path d="M20 2 36 7v13c0 11-7 17.5-16 22z" fill={secondary} opacity=".9" />
      <path d="M20 4.4 33.8 8.7v11.2c0 9.6-6 15.4-13.8 19.6" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
      <rect x="2" y="16.5" width="36" height="10" rx="2.5" fill="#fffdfa" stroke="rgba(0,0,0,.12)" strokeWidth=".6" />
      <text x="20" y="24.1" textAnchor="middle" fontSize="7.4" fontWeight="800" letterSpacing=".4" fill="#1a1512" fontFamily="var(--font-mona), sans-serif">
        {club.code}
      </text>
    </svg>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
  action,
  id,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  action?: ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <span className={cn("over", dark ? "text-gold-soft" : "text-gold-deep")}>{eyebrow}</span>
        <h2
          id={id}
          className={cn(
            "mt-2.5 font-tech text-[28px] leading-[1.12] font-bold tracking-[-1px] md:text-[36px] md:tracking-[-1.4px]",
            dark ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {body ? (
          <p className={cn("mt-3 max-w-[620px] text-[15px] leading-[1.65]", dark ? "text-[#c9bcae]" : "text-taupe")}>{body}</p>
        ) : null}
      </div>
      {action}
    </Reveal>
  );
}

const trust: { icon: Icon3DName; title: string; text: string }[] = [
  { icon: "shield", title: "Official tickets", text: "100% guaranteed access, sourced directly from clubs and organisers." },
  { icon: "ticket", title: "Secure booking 24/7", text: "Reserve online any time — nothing is charged until seats are confirmed." },
  { icon: "seat", title: "Seats together", text: "Every group booking is guaranteed to be seated side by side." },
  { icon: "headset", title: "Personal specialist", text: "A dedicated ticket specialist from enquiry to final whistle." },
];

export function TrustStrip({ className }: { className?: string }) {
  return (
    <section className={cn("border-y border-line bg-paper py-8", className)}>
      <Wrap className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((item, index) => (
          <Reveal key={item.title} delay={index * 70} className="flex gap-4">
            <Icon3D name={item.icon} className="size-12 shrink-0" />
            <div>
              <strong className="font-tech text-[15px] font-bold text-ink">{item.title}</strong>
              <p className="mt-1 text-[14px] leading-[1.55] text-taupe">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </Wrap>
    </section>
  );
}

export function RatingBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[13px] font-semibold",
        dark ? "bg-white/10 text-white backdrop-blur" : "bg-white text-ink shadow-[0_6px_18px_-10px_rgba(26,21,18,0.35)]",
      )}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="size-3.5 fill-[#00b67a] text-[#00b67a]" />
        ))}
      </span>
      Excellent · 4.8 out of 5
    </span>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold", className)}>
      {children}
    </span>
  );
}
