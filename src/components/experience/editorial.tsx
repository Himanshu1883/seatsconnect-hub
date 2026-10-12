import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  destinations,
  differences,
  editorials,
  inclusions,
  photos,
  specialistServices,
  type Service,
} from "@/lib/experiences";
import { Icon3D, type Icon3DName } from "./icons-3d";
import { Reveal } from "./reveal";
import { btnLightSoft, btnPrimarySoft, SectionHead, Wrap } from "./ui";
import { cn } from "cn";

const inclusionIcons: Icon3DName[] = ["seat", "glass", "suite", "group"];
const differenceIcons: Icon3DName[] = ["shield", "ticket", "headset"];
const serviceIcons: Icon3DName[] = ["ticket", "crown"];

export function Weekend({
  onService,
  onDestination,
}: {
  onService: (service: Service) => void;
  onDestination: (destination: string) => void;
}) {
  return (
    <section className="bg-sand py-[60px] md:py-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="The occasion, elevated"
          lines={["Make a weekend of it."]}
          body="Premium experiences for the moments that deserve more than an ordinary ticket."
        />
        <div className="grid gap-6 min-[701px]:grid-cols-[1.2fr_1fr]">
          {editorials.map((item, index) => (
            <Reveal key={item.eyebrow} delay={index * 120}>
              <article className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[30px] p-8 text-white shadow-[0_30px_60px_-34px_rgba(26,21,18,0.8)] sm:p-10 min-[701px]:min-h-[380px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 701px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(0deg,#1a1512f2,#1a151233_75%)]" />
                <div className="relative">
                  <span className="over text-gold-soft">{item.eyebrow}</span>
                  <h3 className="mt-3 mb-6 font-tech text-[32px] leading-[1.08] font-bold tracking-[-1px] sm:text-[38px]">
                    {item.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <a
                    href="#request"
                    onClick={() => onService(item.service)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-[13px] font-semibold backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-brand-cta"
                  >
                    {item.link}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 mb-7">
          <span className="over text-gold-deep">Explore by destination</span>
          <h2 className="mt-3 font-tech text-[30px] leading-[1.15] font-bold tracking-[-1.2px] text-ink">
            Where will your next event take you?
          </h2>
        </Reveal>
        <Reveal delay={80} className="flex flex-wrap gap-3">
          {destinations.map((item) => (
            <a
              key={item.label}
              href="#request"
              onClick={() => onDestination(item.value)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#d7c5b3] bg-paper py-2 pr-2 pl-5 text-sm font-medium text-ink shadow-[0_6px_16px_-12px_rgba(26,21,18,0.5)] transition-all hover:-translate-y-0.5 hover:border-brand-cta hover:text-brand-cta"
            >
              <MapPin className="size-4 text-gold-deep" />
              {item.label}
              <span className="flex size-8 items-center justify-center rounded-full bg-sand text-brand-cta transition-colors group-hover:bg-brand-cta group-hover:text-white">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Hospitality({ onService }: { onService: (service: Service) => void }) {
  return (
    <section id="hospitality" className="scroll-mt-[100px] bg-sand py-[60px] md:py-[84px]">
      <Wrap className="grid items-center gap-10 md:grid-cols-2 md:gap-[64px]">
        <Reveal className="relative h-[340px] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(26,21,18,0.7)] md:h-[520px]">
          <Image
            src={photos.stadium}
            alt="Football stadium and matchday atmosphere"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <span className="over text-gold-deep">Make more of the occasion</span>
          <h2 className="mt-[15px] mb-[22px] font-tech text-[36px] leading-[1.08] font-bold tracking-[-1.6px] text-ink md:text-[48px]">
            The seat is just
            <br />
            the beginning.
          </h2>
          <p className="text-base leading-[1.7] text-taupe">
            Turn a great event into an exceptional day. Explore official hospitality for personal
            celebrations, business entertaining and unforgettable time with your guests.
          </p>
          <div className="my-8 grid gap-3 sm:grid-cols-2">
            {inclusions.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-[20px] border border-line bg-paper p-4 transition-shadow hover:shadow-[0_16px_36px_-24px_rgba(26,21,18,0.5)]"
              >
                <Icon3D name={inclusionIcons[index]} className="size-11" />
                <div>
                  <b className="block font-tech text-[15px] text-ink">{item.title}</b>
                  <span className="mt-1 block text-[13px] leading-snug text-taupe">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
          <a href="#request" onClick={() => onService("Hospitality & private boxes")} className={btnPrimarySoft}>
            Explore hospitality
            <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function SpecialistServices({ onService }: { onService: (service: Service) => void }) {
  return (
    <section id="services" className="scroll-mt-[100px] py-[60px] md:py-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="Beyond the event listing"
          lines={["Your plans.", "Our specialist attention."]}
          body="For a particular ticket, an exceptional occasion or arrangements that need a more personal approach."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {specialistServices.map((item, index) => (
            <Reveal key={item.eyebrow} delay={index * 120} className="h-full">
              <article
                className={cn(
                  "relative h-full overflow-hidden rounded-[30px] p-8 sm:p-10",
                  item.dark
                    ? "bg-ink text-white shadow-[0_30px_60px_-34px_rgba(26,21,18,0.9)]"
                    : "border border-line bg-sand text-ink",
                )}
              >
                {item.dark ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,#063246_0%,transparent_70%)] opacity-70"
                  />
                ) : null}
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className={cn("over", item.dark ? "text-gold-soft" : "text-gold-deep")}>{item.eyebrow}</span>
                    <Icon3D name={serviceIcons[index]} tone={item.dark ? "light" : "blue"} className="size-14" />
                  </div>
                  <h3 className="mt-5 mb-4 font-tech text-[30px] leading-[1.12] font-bold tracking-[-1px]">
                    {item.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className={cn("max-w-[440px] text-[15px] leading-[1.65]", item.dark ? "text-[#d0c6bb]" : "text-taupe")}>
                    {item.body}
                  </p>
                  <ul className="my-7 space-y-2.5 text-sm">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center gap-3">
                        <Icon3D name="check" tone={item.dark ? "light" : "blue"} className="size-6" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#request"
                    onClick={() => onService(item.service)}
                    className={item.dark ? btnLightSoft : btnPrimarySoft}
                  >
                    {item.cta}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Difference() {
  return (
    <section id="why" className="scroll-mt-[100px] bg-sand py-[60px] md:py-[84px]">
      <Wrap>
        <SectionHead
          eyebrow="The SeatsConnect difference"
          lines={["Official supply.", "Human expertise."]}
          body="A ticket specialist who helps you understand what you are booking, how it is delivered and what is included."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {differences.map((item, index) => (
            <Reveal key={item.label} delay={index * 100} className="h-full">
              <div className="h-full rounded-[26px] border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(26,21,18,0.5)]">
                <div className="flex items-center justify-between">
                  <Icon3D name={differenceIcons[index]} className="size-[52px]" />
                  <span className="text-[13px] font-semibold text-gold-deep">{item.label}</span>
                </div>
                <h3 className="mt-6 mb-2.5 font-tech text-[21px] font-bold text-ink">{item.title}</h3>
                <p className="text-[15px] leading-[1.65] text-taupe">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
