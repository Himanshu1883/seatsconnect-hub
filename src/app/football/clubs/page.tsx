import type { Metadata } from "next";
import { getHostClubs } from "@/lib/sports/api";
import { Wrap } from "@/components/experience/ui";
import { Breadcrumbs, SectionTitle, SportShell, TrustStrip } from "@/components/sports/primitives";
import { ClubDirectory } from "@/components/sports/club-directory";

export const metadata: Metadata = {
  title: "Football Clubs A–Z | Official Tickets & Hospitality | SeatsConnect",
  description: "Browse every club with official tickets and VIP hospitality — from the Premier League to La Liga, Serie A and the Bundesliga.",
};

export default async function ClubsPage() {
  const clubs = await getHostClubs();
  return (
    <SportShell>
      <section className="border-b border-line bg-paper py-12">
        <Wrap>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Football", href: "/football" },
              { label: "Clubs" },
            ]}
          />
          <h1 className="mt-6 font-tech text-[40px] leading-[1.05] font-bold tracking-[-1.8px] text-ink md:text-[56px]">
            Football clubs <span className="text-gold-deep">A–Z</span>
          </h1>
          <p className="mt-4 max-w-[620px] text-[17px] leading-[1.65] text-taupe">
            {clubs.length} clubs with official tickets and hospitality on sale. Choose a club to see every fixture, lounge,
            seat map and stadium guide.
          </p>
        </Wrap>
      </section>
      <section className="py-12">
        <Wrap>
          <SectionTitle eyebrow="Sport fixtures" title="Find your club" />
          <ClubDirectory clubs={clubs} />
        </Wrap>
      </section>
      <TrustStrip />
    </SportShell>
  );
}
