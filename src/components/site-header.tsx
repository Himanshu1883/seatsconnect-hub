"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { footballMenu, type Sport } from "@/lib/catalog";
import { cn } from "cn";

type BrowseTarget = {
  query?: string;
  competition?: string;
  sport?: Sport;
  hash?: string;
};

const links: { label: string; hash: string; sport?: Sport }[] = [
  { label: "Rugby", hash: "rugby", sport: "rugby" },
  { label: "Tennis", hash: "tennis", sport: "tennis" },
  { label: "Motorsport", hash: "motorsport", sport: "motorsport" },
  { label: "NFL London", hash: "nfl", sport: "nfl" },
];

export function SiteHeader({
  signedIn,
  onLogin,
  onSignOut,
  onBrowse,
}: {
  signedIn: string | null;
  onLogin: () => void;
  onSignOut: () => void;
  onBrowse: (target: BrowseTarget) => void;
}) {
  const [footballOpen, setFootballOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function go(target: BrowseTarget) {
    setFootballOpen(false);
    setMobileOpen(false);
    onBrowse(target);
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm">
      <div className="flex h-1 w-full" aria-hidden="true">
        <span className="h-full flex-1 bg-brand-gold" />
        <span className="h-full flex-1 bg-brand-orange" />
      </div>
      <nav className="h-16 border-b border-brand-cta/18 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex shrink-0 items-center" aria-label="SeatsConnect home">
            <Wordmark />
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-brand-gray xl:gap-8 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setFootballOpen(true)}
              onMouseLeave={() => setFootballOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-brand-orange"
                aria-expanded={footballOpen}
                onClick={() => setFootballOpen((open) => !open)}
              >
                Football
                <ChevronDown
                  className={cn("size-3.5 transition-transform", footballOpen && "rotate-180")}
                />
              </button>
            </div>
            {links.map((link) => (
              <button
                key={link.label}
                type="button"
                className="whitespace-nowrap transition-colors hover:text-brand-orange"
                onClick={() => go({ sport: link.sport, hash: link.hash })}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              className="whitespace-nowrap transition-colors hover:text-brand-orange"
              onClick={() => go({ hash: "gift" })}
            >
              Gift voucher
            </button>
            <button
              type="button"
              className="whitespace-nowrap transition-colors hover:text-brand-orange"
              onClick={() => go({ hash: "groups" })}
            >
              Group bookings
            </button>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {signedIn ? (
              <button
                type="button"
                onClick={onSignOut}
                className="max-w-40 truncate text-sm font-medium text-brand-gray hover:text-brand-orange"
              >
                {signedIn}
              </button>
            ) : (
              <Button
                variant="outline"
                className="h-auto rounded-full border-white bg-white px-5 py-2.5 font-tech text-sm font-semibold text-brand-cta shadow-[0_4px_16px_rgba(6,50,70,0.1)] hover:bg-slate-50 hover:text-brand-cta-hover"
                onClick={onLogin}
              >
                Login
              </Button>
            )}
            <Button
              className="h-auto rounded-full px-5 py-2.5 font-tech text-sm font-semibold shadow-sm hover:bg-brand-cta-hover"
              onClick={() => go({ hash: "fixtures" })}
            >
              Find tickets
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-brand-dark hover:bg-brand-orange-light lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {footballOpen ? (
        <div
          className="absolute top-full right-0 left-0 hidden border-b border-brand-cta/15 bg-white shadow-[0_18px_50px_rgba(40,30,20,0.07)] lg:block"
          onMouseEnter={() => setFootballOpen(true)}
          onMouseLeave={() => setFootballOpen(false)}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-8 py-8">
            {footballMenu.map((group) => (
              <div key={group.title}>
                <button
                  type="button"
                  className="font-tech text-sm font-bold text-brand-dark hover:text-brand-orange"
                  onClick={() => go({ competition: group.competition, hash: "fixtures" })}
                >
                  {group.title}
                </button>
                <ul className="mt-3 space-y-2">
                  {group.clubs.map((club) => (
                    <li key={club}>
                      <button
                        type="button"
                        className="text-sm text-brand-gray hover:text-brand-orange"
                        onClick={() =>
                          go({
                            query: club,
                            competition:
                              club === "Champions League" || club === "Europa League"
                                ? club
                                : undefined,
                            hash: "fixtures",
                          })
                        }
                      >
                        {club}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
          <div className="space-y-6 px-5 py-6">
            <p className="font-tech text-sm font-bold text-brand-dark">Football</p>
            <div className="grid gap-4">
              {footballMenu.map((group) => (
                <div key={group.title}>
                  <button
                    type="button"
                    className="text-sm font-semibold text-brand-cta"
                    onClick={() => go({ competition: group.competition, hash: "fixtures" })}
                  >
                    {group.title}
                  </button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.clubs.slice(0, 6).map((club) => (
                      <button
                        key={club}
                        type="button"
                        className="rounded-full border border-brand-cta/15 bg-cream px-3 py-1 text-xs text-brand-gray"
                        onClick={() => go({ query: club, hash: "fixtures" })}
                      >
                        {club}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-3 border-t border-brand-cta/15 pt-4">
              {links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="text-left font-tech text-sm font-semibold text-brand-dark"
                  onClick={() => go({ sport: link.sport, hash: link.hash })}
                >
                  {link.label}
                </button>
              ))}
              <button type="button" className="text-left font-tech text-sm font-semibold" onClick={() => go({ hash: "gift" })}>
                Gift voucher
              </button>
              <button type="button" className="text-left font-tech text-sm font-semibold" onClick={() => go({ hash: "groups" })}>
                Group bookings
              </button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-auto flex-1 rounded-full border-brand-cta/20 bg-white py-2.5 font-tech font-semibold text-brand-cta hover:bg-[#eef3f5] hover:text-brand-cta"
                onClick={onLogin}
              >
                {signedIn ? "Account" : "Login"}
              </Button>
              <Button
                className="h-auto flex-1 rounded-full py-2.5 font-tech font-semibold hover:bg-brand-cta-hover"
                onClick={() => go({ hash: "fixtures" })}
              >
                Find tickets
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
