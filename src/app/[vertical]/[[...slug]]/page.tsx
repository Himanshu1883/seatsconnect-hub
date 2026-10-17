import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { VerticalEvent } from "@/components/sports/vertical-event";
import { VerticalHub } from "@/components/sports/vertical-hub";
import { VerticalHost, VerticalHostsIndex } from "@/components/sports/vertical-hosts";
import { VerticalSeries } from "@/components/sports/vertical-series";
import { SportShell } from "@/components/sports/primitives";
import {
  getVerticalCompetition,
  getVerticalCompetitions,
  getVerticalFixture,
  getVerticalHost,
  getVerticalHosts,
  listVerticalFixtures,
} from "@/lib/sports/catalog";
import { getVertical, verticalIds, type VerticalId } from "@/lib/sports/verticals";

type Params = { vertical: string; slug?: string[] };

export const instant = false;

export async function generateStaticParams() {
  const params: { vertical: string; slug?: string[] }[] = [];
  for (const id of verticalIds) {
    params.push({ vertical: id, slug: [] });
    const vertical = getVertical(id)!;
    params.push({ vertical: id, slug: [vertical.hostKey] });
    const [competitions, fixtures, hosts] = await Promise.all([
      getVerticalCompetitions(id),
      listVerticalFixtures(id),
      getVerticalHosts(id),
    ]);
    for (const competition of competitions) {
      params.push({ vertical: id, slug: [competition.slug] });
    }
    for (const fixture of fixtures) {
      params.push({ vertical: id, slug: [fixture.competition, fixture.slug] });
    }
    for (const host of hosts) {
      params.push({ vertical: id, slug: [vertical.hostKey, host.slug] });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { vertical: id, slug = [] } = await params;
  const vertical = getVertical(id);
  if (!vertical) return {};

  if (slug.length === 0) {
    return {
      title: `${vertical.name} Tickets & Hospitality | Official | SeatsConnect`,
      description: vertical.heroBody,
    };
  }
  if (slug[0] === vertical.hostKey && slug.length === 1) {
    return {
      title: `${vertical.name} ${vertical.hostPlural} A–Z | Official Tickets | SeatsConnect`,
      description: vertical.hostsBody,
    };
  }
  if (slug[0] === vertical.hostKey && slug[1]) {
    const host = await getVerticalHost(id as VerticalId, slug[1]);
    if (!host) return {};
    return {
      title: `${host.name} Tickets & Hospitality | SeatsConnect`,
      description: host.about?.[0] ?? `Official ${host.name} tickets and hospitality.`,
    };
  }
  if (slug.length === 1) {
    const info = await getVerticalCompetition(id as VerticalId, slug[0]);
    if (!info) return {};
    return {
      title: `${info.name} Tickets & Hospitality ${info.season} | SeatsConnect`,
      description: info.tagline,
    };
  }
  if (slug.length === 2) {
    const fixture = await getVerticalFixture(id as VerticalId, slug[0], slug[1]);
    if (!fixture) return {};
    return {
      title: `${fixture.title} Tickets & Hospitality | SeatsConnect`,
      description: `Official ${fixture.title} tickets and VIP hospitality at ${fixture.venue.name}.`,
    };
  }
  return {};
}

export default function VerticalPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense
      fallback={
        <SportShell>
          <section className="min-h-[50vh] bg-night" />
        </SportShell>
      }
    >
      <VerticalRoute params={params} />
    </Suspense>
  );
}

async function VerticalRoute({ params }: { params: Promise<Params> }) {
  const { vertical: id, slug = [] } = await params;
  const vertical = getVertical(id);
  if (!vertical) notFound();

  if (slug.length === 0) return <VerticalHub vertical={vertical} />;
  if (slug[0] === vertical.hostKey && slug.length === 1) return <VerticalHostsIndex vertical={vertical} />;
  if (slug[0] === vertical.hostKey && slug[1]) return <VerticalHost vertical={vertical} slug={slug[1]} />;
  if (slug.length === 1) return <VerticalSeries vertical={vertical} slug={slug[0]} />;
  if (slug.length === 2) return <VerticalEvent vertical={vertical} competition={slug[0]} match={slug[1]} />;
  notFound();
}
