"use client";

import { useMemo, useState } from "react";
import { FixtureDialog, LoginDialog } from "@/components/fixture-dialog";
import { FixturesPanel } from "@/components/fixtures-panel";
import { Hero } from "@/components/hero";
import {
  Circle,
  Closing,
  Clubs,
  Competitions,
  GiftAndGroups,
  HowItWorks,
  Partnerships,
  PopularSports,
} from "@/components/page-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fixtures as catalog, type Currency, type Fixture, type Sport } from "@/lib/catalog";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [competition, setCompetition] = useState("");
  const [sport, setSport] = useState<Sport | "">("");
  const [currency, setCurrency] = useState<Currency>("usd");
  const [openFixture, setOpenFixture] = useState<Fixture | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signedIn, setSignedIn] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((fixture) => {
      if (sport && fixture.sport !== sport) return false;
      if (competition && !fixture.competition.toLowerCase().includes(competition.toLowerCase())) {
        return false;
      }
      if (!needle) return true;
      const haystack = [
        fixture.home,
        fixture.away,
        fixture.city,
        fixture.venue,
        fixture.competition,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [competition, query, sport]);

  function scrollTo(hash: string) {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function browse(target: {
    query?: string;
    competition?: string;
    sport?: Sport;
    hash?: string;
  }) {
    if (target.query != null) setQuery(target.query);
    else if (target.competition || target.sport) setQuery("");
    if (target.competition != null) setCompetition(target.competition);
    else if (target.query || target.sport) setCompetition("");
    if (target.sport) {
      setSport(target.sport);
    } else if (target.query || target.competition) {
      setSport("");
    }
    scrollTo(target.hash ?? "fixtures");
  }

  return (
    <div id="top" className="bg-sand">
      <SiteHeader
        signedIn={signedIn}
        onLogin={() => setLoginOpen(true)}
        onSignOut={() => setSignedIn(null)}
        onBrowse={browse}
      />
      <main className="pt-[4.25rem]">
        <Hero onFind={() => scrollTo("fixtures")} onGroups={() => scrollTo("groups")} />
        <FixturesPanel
          fixtures={visible}
          query={query}
          competition={competition}
          currency={currency}
          onQuery={(value) => {
            setQuery(value);
            setSport("");
          }}
          onCompetition={setCompetition}
          onCurrency={setCurrency}
          onOpen={setOpenFixture}
        />
        <HowItWorks />
        <Competitions
          onPick={(nextCompetition, nextSport) =>
            browse({ competition: nextCompetition, sport: nextSport, hash: "fixtures" })
          }
        />
        <Clubs onPick={(club) => browse({ query: club, hash: "fixtures" })} />
        <PopularSports onPick={(next) => browse({ sport: next, hash: "fixtures" })} />
        <Partnerships />
        <Circle onBrowse={() => scrollTo("fixtures")} />
        <GiftAndGroups />
        <Closing onFind={() => scrollTo("fixtures")} />
      </main>
      <SiteFooter />
      <FixtureDialog
        fixture={openFixture}
        currency={currency}
        onClose={() => setOpenFixture(null)}
      />
      <LoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(email) => {
          setSignedIn(email);
          setLoginOpen(false);
        }}
      />
    </div>
  );
}
