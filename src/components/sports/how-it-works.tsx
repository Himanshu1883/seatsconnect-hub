import { Icon3D, type Icon3DName } from "@/components/experience/icons-3d";
import { cn } from "cn";

const steps: { icon: Icon3DName; title: string; text: string }[] = [
  { icon: "ticket", title: "Choose your event", text: "Browse official fixtures by competition, club, date or price." },
  { icon: "suite", title: "Choose your package", text: "Compare ticket-plus, lounges, fine dining and private boxes side by side." },
  { icon: "globe", title: "Add a hotel (optional)", text: "Make a weekend of it with a hand-picked hotel near the stadium." },
  { icon: "headset", title: "Your specialist confirms", text: "Seats are confirmed before any payment, with mobile tickets delivered before matchday." },
];

export function HowItWorks({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn("rounded-[30px] p-7 md:p-8", dark ? "bg-ink text-white" : "border border-line bg-paper")}>
      <span className={cn("over", dark ? "text-gold-soft" : "text-gold-deep")}>How does it work?</span>
      <h3 className={cn("mt-2.5 font-tech text-[26px] leading-tight font-bold tracking-[-0.8px]", dark ? "text-cream" : "text-ink")}>
        From kick-off plans to the final whistle
      </h3>
      <ol className="mt-6 space-y-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="relative">
              <Icon3D name={step.icon} tone={dark ? "light" : "blue"} className="size-12" />
              <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-gold-deep text-[11px] font-bold text-white">
                {index + 1}
              </span>
            </span>
            <div>
              <strong className={cn("font-tech text-[16px]", dark ? "text-white" : "text-ink")}>{step.title}</strong>
              <p className={cn("mt-0.5 text-[14.5px] leading-[1.55]", dark ? "text-[#d0c6bb]" : "text-taupe")}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
