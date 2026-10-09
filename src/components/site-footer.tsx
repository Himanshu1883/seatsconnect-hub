"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Wordmark } from "@/components/wordmark";

const columns = [
  {
    title: "Sports",
    links: [
      { label: "Football", hash: "football" },
      { label: "Rugby", hash: "rugby" },
      { label: "Tennis", hash: "tennis" },
      { label: "Motorsport", hash: "motorsport" },
      { label: "NFL London", hash: "nfl" },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Upcoming fixtures", hash: "fixtures" },
      { label: "Group bookings", hash: "groups" },
      { label: "Gift voucher", hash: "gift" },
      { label: "The Seats Circle", hash: "circle" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why fans book here", hash: "about" },
      { label: "Contact", hash: "groups" },
    ],
  },
];

export function SiteFooter() {
  const [emailSent, setEmailSent] = useState(false);
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);

  return (
    <footer className="footer-band bg-[#faf8f5] px-4 py-12 text-brand-gray sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-6">
            Official sports tickets and matchday hospitality. Football, rugby, tennis and Formula 1,
            arranged by SeatsConnect™.
          </p>
          <p className="mt-4 text-xs">
            SeatsConnect™ — a SeatsGroup company
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-tech text-sm font-bold text-brand-dark">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={`#${link.hash}`} className="text-sm hover:text-brand-orange">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <form
        className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 rounded-[1.35rem] border border-brand-cta/15 bg-white px-5 py-6 sm:flex-row sm:items-center sm:justify-between"
        onSubmit={(event) => {
          event.preventDefault();
          setEmailSent(true);
        }}
      >
        <div>
          <p className="font-tech text-lg font-bold text-brand-dark">Stay connected with SeatsConnect</p>
          <p className="text-sm">Fixture releases, hospitality openings and travel notes.</p>
        </div>
        {emailSent ? (
          <p className="font-tech text-sm font-semibold text-brand-cta">You are on the list.</p>
        ) : (
          <div className="flex w-full max-w-md gap-2">
            <Input
              required
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="h-11 rounded-full"
            />
            <Button type="submit" className="h-11 rounded-full px-5 font-tech">
              Subscribe
            </Button>
          </div>
        )}
      </form>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-brand-cta/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 SeatsConnect™. All rights reserved.</p>
        <div className="flex gap-4">
          <button type="button" className="hover:text-brand-orange" onClick={() => setLegal("terms")}>
            Terms & conditions
          </button>
          <button type="button" className="hover:text-brand-orange" onClick={() => setLegal("privacy")}>
            Privacy policy
          </button>
        </div>
      </div>

      <Dialog open={legal != null} onOpenChange={(open) => !open && setLegal(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-tech text-xl font-bold">
              {legal === "privacy" ? "Privacy policy" : "Terms & conditions"}
            </DialogTitle>
            <DialogDescription>
              {legal === "privacy"
                ? "We use the name and email on a request only to confirm that package. We do not sell the list."
                : "A request holds a quote for review. Seats are confirmed in writing before payment is taken. Sold-out fixtures can be waitlisted."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
