"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Check, Copy, X } from "lucide-react";
import { btnPrimarySoft } from "@/components/experience/ui";
import { cn } from "cn";

export function Modal({
  open,
  onClose,
  eyebrow,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? null : onClose())}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#0e1d30bb] backdrop-blur-sm duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[92%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[30px] bg-paper p-6 text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 sm:p-9",
            wide ? "max-w-[980px]" : "max-w-[580px]",
          )}
        >
          <Dialog.Close
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex size-9 items-center justify-center rounded-full bg-sand text-brand-cta transition-colors hover:bg-brand-cta hover:text-white"
          >
            <X className="size-4" />
          </Dialog.Close>
          {eyebrow ? <span className="over text-gold-deep">{eyebrow}</span> : null}
          <Dialog.Title className="mt-3 mb-5 pr-10 font-tech text-[26px] leading-[1.15] font-bold tracking-[-0.6px] sm:text-[30px]">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const field =
  "mt-1.5 block w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-taupe/70 focus:border-brand-cta";

export type RequestIntent = "reserve" | "notify" | "preregister";

const intentCopy: Record<RequestIntent, { eyebrow: string; button: string; done: string }> = {
  reserve: { eyebrow: "Reserve your seats", button: "Prepare my reservation", done: "Your reservation request is ready" },
  notify: { eyebrow: "Sold out — join the waitlist", button: "Notify me when available", done: "Your waitlist request is ready" },
  preregister: { eyebrow: "Tickets available soon", button: "Pre-register my interest", done: "Your pre-registration is ready" },
};

export function RequestDialog({
  open,
  onClose,
  intent,
  title,
  lines,
}: {
  open: boolean;
  onClose: () => void;
  intent: RequestIntent;
  title: string;
  lines: string[];
}) {
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copy = intentCopy[intent];

  function close() {
    setSummary(null);
    setCopied(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={close} eyebrow={copy.eyebrow} title={title}>
      <ul className="mb-5 space-y-1.5 rounded-[20px] bg-sand p-4 text-[14px] text-ink">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-cta" />
            {line}
          </li>
        ))}
      </ul>
      {summary ? (
        <div aria-live="polite">
          <strong className="font-tech text-[16px]">{copy.done}</strong>
          <pre className="mt-3 rounded-[18px] border border-line bg-white p-4 font-sans text-[13.5px] leading-[1.6] whitespace-pre-wrap text-ink">
            {summary}
          </pre>
          <button
            type="button"
            className={cn(btnPrimarySoft, "mt-4 w-full")}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy request"}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setSummary(
              [
                `SeatsConnect — ${copy.eyebrow}`,
                "",
                ...lines,
                "",
                `Name: ${data.get("name")}`,
                `Email: ${data.get("email")}`,
                `Phone: ${data.get("phone") || "Not provided"}`,
                `Notes: ${data.get("notes") || "None"}`,
              ].join("\n"),
            );
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <label className="text-[13px] font-semibold text-taupe">
            Full name
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="text-[13px] font-semibold text-taupe">
            Email address
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className="text-[13px] font-semibold text-taupe sm:col-span-2">
            Phone (optional)
            <input name="phone" type="tel" autoComplete="tel" className={field} />
          </label>
          <label className="text-[13px] font-semibold text-taupe sm:col-span-2">
            Special requests
            <textarea name="notes" placeholder="Celebrations, dietary needs, accessibility or hotel requests" className={cn(field, "h-[90px] resize-y")} />
          </label>
          <button type="submit" className={cn(btnPrimarySoft, "w-full sm:col-span-2")}>
            {copy.button}
          </button>
          <p className="text-[12.5px] leading-relaxed text-taupe sm:col-span-2">
            Design preview: prepares a request to copy. Nothing is charged, sent or stored until a specialist confirms
            your seats.
          </p>
        </form>
      )}
    </Modal>
  );
}
