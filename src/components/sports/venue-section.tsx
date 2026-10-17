import Image from "next/image";
import { ArrowUpRight, Building2, BusFront, CarFront, Footprints, Hotel, MapPin, Plane, TrainFront, Users } from "lucide-react";
import type { TravelTip, Venue } from "@/lib/sports/types";
import { Reveal } from "@/components/experience/reveal";

const modeIcon: Record<TravelTip["mode"], typeof Plane> = {
  air: Plane,
  train: TrainFront,
  car: CarFront,
  bus: BusFront,
  walk: Footprints,
};

export function VenueSection({ venue }: { venue: Venue }) {
  const query = encodeURIComponent(`${venue.name}, ${venue.address}`);
  const standEntries = Object.entries(venue.stands);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <Reveal className="overflow-hidden rounded-[30px] border border-line bg-paper">
          <div className="relative h-[220px] bg-[#283f51]">
            <Image src={venue.image} alt={`${venue.name} — illustrative photography`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(transparent_30%,#1a1512e6)]" />
            <div className="absolute bottom-5 left-6 text-white">
              <span className="over text-gold-soft">The venue</span>
              <h3 className="mt-1.5 font-tech text-[28px] leading-tight font-bold tracking-[-0.8px]">{venue.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-[14px] text-white/80">
                <MapPin className="size-4" /> {venue.city}, {venue.country}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-line border-b border-line text-center">
            {[
              { icon: Users, label: "Capacity", value: venue.capacity.toLocaleString("en-GB") },
              { icon: Building2, label: "Opened", value: String(venue.opened) },
              { icon: MapPin, label: "City", value: venue.city },
            ].map((item) => (
              <div key={item.label} className="px-3 py-4">
                <item.icon className="mx-auto size-4 text-gold-deep" />
                <dd className="mt-1.5 font-tech text-[18px] font-bold text-ink">{item.value}</dd>
                <dt className="text-[11px] font-bold tracking-[.12em] text-taupe uppercase">{item.label}</dt>
              </div>
            ))}
          </dl>
          <div className="p-6">
            <p className="text-[14px] text-taupe">
              <strong className="text-ink">Address:</strong> {venue.address}
            </p>
            <ul className="mt-4 space-y-3">
              {venue.guide.map((item) => (
                <li key={item.label} className="flex gap-3 text-[14px] leading-[1.5]">
                  <span className="w-[104px] shrink-0 text-[11px] font-bold tracking-[.12em] text-gold-deep uppercase">{item.label}</span>
                  <span className="text-ink">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <h4 className="font-tech text-[17px] font-bold text-ink">Around the venue</h4>
              <p className="mt-2 text-[14px] leading-[1.65] text-taupe">
                Hospitality and ticket blocks are named by area. Your specialist confirms the exact stand or suite when you enquire.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {standEntries.map(([key, label]) => (
                  <li key={key} className="rounded-[14px] bg-cream px-3.5 py-2.5 text-[13.5px] leading-snug">
                    <span className="font-semibold text-ink capitalize">{key}</span>
                    <span className="text-taupe"> · {label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="overflow-hidden rounded-[30px] border border-line bg-paper">
          <iframe
            title={`Map of ${venue.name}`}
            src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[280px] w-full border-0 grayscale-[35%] lg:h-[320px]"
          />
          <div className="flex items-center justify-between gap-3 px-5 py-3.5">
            <span className="truncate text-[13.5px] text-taupe">{venue.address}</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noreferrer"
              className="flex shrink-0 items-center gap-1 text-[13px] font-bold text-brand-cta hover:underline"
            >
              Open in Maps <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </Reveal>
      </div>

      <aside className="w-full shrink-0 lg:sticky lg:top-[140px] lg:w-[min(100%,22rem)] lg:self-start xl:w-[min(100%,24rem)]">
        <Reveal delay={120} className="rounded-[30px] border border-line bg-paper p-6">
          <h3 className="font-tech text-[19px] font-bold text-ink">Getting there</h3>
          <ul className="mt-4 grid gap-4">
            {venue.travel.map((tip) => {
              const Icon = modeIcon[tip.mode];
              return (
                <li key={tip.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-[#eef3f5] text-brand-cta">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <strong className="font-tech text-[14.5px] text-ink">{tip.title}</strong>
                    <p className="mt-0.5 text-[13.5px] leading-[1.55] text-taupe">{tip.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          {venue.hotels.length ? (
            <div className="mt-6 border-t border-line pt-5">
              <h4 className="flex items-center gap-2 font-tech text-[15px] font-bold text-ink">
                <Hotel className="size-4 text-gold-deep" /> Hotels near {venue.name}
              </h4>
              <ul className="mt-3 grid gap-2">
                {venue.hotels.map((hotel) => (
                  <li key={hotel.name} className="flex items-center justify-between gap-3 rounded-[14px] bg-cream px-3.5 py-2.5 text-[13.5px]">
                    <span className="text-ink">{hotel.name}</span>
                    <span className="shrink-0 text-[12px] font-semibold text-taupe">{hotel.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>
      </aside>
    </div>
  );
}
