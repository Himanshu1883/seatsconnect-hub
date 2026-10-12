"use client";

import { useMemo, useState } from "react";
import { Faqs, Reviews, SocialEdit } from "@/components/experience/community";
import { CollectionDialog, SocialDialog } from "@/components/experience/dialogs";
import {
  CategoryRow,
  Collections,
  EventFinder,
  filterCollections,
  type Filter,
} from "@/components/experience/discover";
import { Difference, Hospitality, SpecialistServices, Weekend } from "@/components/experience/editorial";
import { CollectionEvents } from "@/components/experience/events";
import { Enquiry, Footer } from "@/components/experience/enquiry";
import { HeroCarousel } from "@/components/experience/hero-carousel";
import { SiteNav } from "@/components/experience/site-nav";
import type { Collection, ExperienceType, Service } from "@/lib/experiences";
import { useDebouncedValue } from "@/lib/use-debounced-value";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HomePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openCollection, setOpenCollection] = useState<Collection | null>(null);
  const [socialCaption, setSocialCaption] = useState<string | null>(null);
  const [event, setEvent] = useState("");
  const [service, setService] = useState<Service>("Official tickets");

  const debouncedQuery = useDebouncedValue(query, 200);
  const items = useMemo(() => filterCollections(filter, debouncedQuery), [filter, debouncedQuery]);

  function selectCategory(type: ExperienceType) {
    setQuery("");
    setFilter(type);
  }

  return (
    <div id="top" className="bg-cream text-[15px] leading-[1.6] text-ink">
      <SiteNav onCategory={selectCategory} />
      <main>
        <HeroCarousel onCategory={selectCategory} />
        <EventFinder
          query={query}
          filter={filter}
          onQuery={setQuery}
          onFilter={setFilter}
          onSubmit={() => scrollToId("discover")}
        />
        <CategoryRow
          onPick={(type) => {
            selectCategory(type);
            scrollToId("discover");
          }}
        />
        <Collections filter={filter} items={items} onFilter={setFilter} onOpen={setOpenCollection} />
        <CollectionEvents
          onEnquire={(title) => {
            setEvent(title);
            setService("Official tickets");
            scrollToId("request");
          }}
        />
        <Weekend onService={setService} onDestination={(place) => setEvent(`${place} — event request`)} />
        <Hospitality onService={setService} />
        <SpecialistServices onService={setService} />
        <Difference />
        <SocialEdit onOpen={setSocialCaption} />
        <Reviews />
        <Faqs />
        <Enquiry event={event} service={service} onEvent={setEvent} onService={setService} />
      </main>
      <Footer />

      <CollectionDialog
        item={openCollection}
        onClose={() => setOpenCollection(null)}
        onEnquire={(item) => {
          setEvent(item.title);
          setOpenCollection(null);
          window.setTimeout(() => scrollToId("request"), 200);
        }}
      />
      <SocialDialog caption={socialCaption} onClose={() => setSocialCaption(null)} />
    </div>
  );
}
