"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { footerLinks, services, type Service } from "@/lib/experiences";
import { Icon3D, type Icon3DName } from "./icons-3d";
import { Reveal } from "./reveal";
import { Logo } from "./site-nav";
import { btnLightSoft, Wrap } from "./ui";
import { cn } from "cn";

const field =
  "mt-2 block w-full rounded-[14px] border border-[#51473e] bg-[#2e2620] px-4 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-[#9c8f82] focus:border-line focus:bg-[#342b24]";

const label = "text-xs font-medium text-line";

const highlights: { text: string; icon: Icon3DName }[] = [
  { text: "Official tickets & hospitality", icon: "ticket" },
  { text: "International ticket sourcing", icon: "globe" },
  { text: "VIP, private boxes & group experiences", icon: "crown" },
];

export function Enquiry({
  event,
  service,
  onEvent,
  onService,
}: {
  event: string;
  service: Service;
  onEvent: (value: string) => void;
  onService: (value: Service) => void;
}) {
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  function prepare(form: HTMLFormElement) {
    const data = new FormData(form);
    setCopied("idle");
    setSummary(
      [
        "SeatsConnect enquiry",
        "",
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Event: ${event}`,
        `Service: ${service}`,
        `Guests: ${data.get("guests") || "To confirm"}`,
        `Preferences: ${data.get("details") || "To discuss"}`,
      ].join("\n"),
    );
  }

  async function copy() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  }

  return (
    <section id="request" className="scroll-mt-[100px] bg-ink py-[60px] text-white md:py-[84px]">
      <Wrap className="grid items-start gap-10 md:grid-cols-2 md:gap-[64px]">
        <Reveal>
          <span className="over text-gold-soft">Talk to a ticket specialist</span>
          <h2 className="mt-[15px] mb-5 font-tech text-[36px] leading-[1.08] font-bold tracking-[-1.5px] md:text-[46px]">
            Tell us where
            <br />
            you want to be.
          </h2>
          <p className="max-w-[460px] text-base leading-[1.7] text-[#d0c6bb]">
            One seat, a hospitality package or a private occasion for your guests. Share your plans
            and let us explore the possibilities.
          </p>
          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3.5 rounded-[18px] border border-white/10 bg-white/[0.04] p-3 pr-5 text-[15px] text-[#e8ddd1]"
              >
                <Icon3D name={item.icon} tone="light" className="size-10" />
                {item.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form
            id="enquiry"
            onSubmit={(formEvent) => {
              formEvent.preventDefault();
              prepare(formEvent.currentTarget);
            }}
            className="rounded-[30px] border border-white/10 bg-[#211a16] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8"
          >
            <div className="grid gap-5 min-[501px]:grid-cols-2">
              <label className={label}>
                Your name
                <input name="name" autoComplete="name" required className={field} />
              </label>
              <label className={label}>
                Email address
                <input name="email" type="email" autoComplete="email" required className={field} />
              </label>
              <label className={cn(label, "min-[501px]:col-span-2")}>
                Event or destination
                <input
                  id="event"
                  name="event"
                  value={event}
                  onChange={(change) => onEvent(change.target.value)}
                  placeholder="Event, team, artist or destination"
                  required
                  className={field}
                />
              </label>
              <label className={label}>
                Service
                <select
                  id="service"
                  name="service"
                  value={service}
                  onChange={(change) => onService(change.target.value as Service)}
                  className={cn(field, "cursor-pointer")}
                >
                  {services.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className={label}>
                Guests
                <input name="guests" type="number" min={1} placeholder="2" className={field} />
              </label>
              <label className={cn(label, "min-[501px]:col-span-2")}>
                Your preferences
                <textarea
                  name="details"
                  placeholder="Dates, seating, hospitality and any special requirements"
                  className={cn(field, "h-[110px] resize-y")}
                />
              </label>
              <button type="submit" className={cn(btnLightSoft, "w-full min-[501px]:col-span-2")}>
                Prepare my enquiry
                <ArrowUpRight className="size-4" />
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#bfb0a1]">
              Design preview: prepares an enquiry to copy. No booking or payment is taken and no
              information is sent or stored.
            </p>
          </form>

          {summary ? (
            <div aria-live="polite" className="mt-5 rounded-[24px] border border-[#51473e] bg-[#2e2620] p-6">
              <strong className="font-tech text-base">Your enquiry is ready to copy</strong>
              <pre className="mt-3 font-sans text-sm leading-[1.65] whitespace-pre-wrap text-[#e8d9cc]">{summary}</pre>
              <button type="button" onClick={copy} className={cn(btnLightSoft, "mt-5")}>
                {copied === "done" ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied === "done"
                  ? "Copied"
                  : copied === "failed"
                    ? "Select the enquiry text to copy"
                    : "Copy enquiry"}
              </button>
            </div>
          ) : null}
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night py-12 text-[13px] text-[#c9d6e3]">
      <Wrap>
        <div className="flex flex-col justify-between gap-[35px] md:flex-row">
          <div>
            <a href="#top" aria-label="SeatsConnect home">
              <Logo dark withMark={false} />
            </a>
            <p className="mt-4 max-w-[380px] leading-relaxed text-[#b6a99a]">
              Official tickets and hospitality. International event experiences, supported by a
              personal ticket specialist.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-9 flex flex-col justify-between gap-[15px] border-t border-[#40352d] pt-6 text-xs text-[#b6a99a] md:flex-row">
          <span>© 2026 SeatsConnect · Consumer website design</span>
          <span>All tickets and arrangements are subject to availability, quotation and confirmation.</span>
        </div>
      </Wrap>
    </footer>
  );
}
