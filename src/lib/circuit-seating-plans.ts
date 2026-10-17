import type { StandId } from "@/lib/sports/types";

type CircuitSeating = {
  overview: string;
  stands?: Partial<Record<StandId, string>>;
};

/** Local copies of Seat Unique circuit seating artwork (demo). */
export const circuitSeatingPlans: Record<string, CircuitSeating> = {
  "yas-marina": {
    overview: "/experiences/venues/yas-marina-seating-plan.svg",
    stands: {
      north: "/experiences/venues/yas-marina-north-seating-plan.svg",
      south: "/experiences/venues/yas-marina-south-seating-plan.svg",
      east: "/experiences/venues/yas-marina-marina-seating-plan.svg",
      west: "/experiences/venues/yas-marina-main-seating-plan.svg",
    },
  },
  "circuit-de-monaco": {
    overview: "/experiences/venues/circuit-de-monaco-seating-plan.svg",
  },
  "spa-francorchamps": {
    overview: "/experiences/venues/spa-francorchamps-seating-plan.svg",
  },
  "silverstone": {
    overview: "/experiences/venues/silverstone-seating-plan.jpg",
  },
  monza: {
    overview: "/experiences/venues/monza-seating-plan.jpg",
  },
};

export function circuitSeatingPlanImage(slug: string, stand?: StandId | null) {
  const plan = circuitSeatingPlans[slug];
  if (!plan) return `/experiences/venues/${slug}-seating-plan.svg`;
  if (stand && plan.stands?.[stand]) return plan.stands[stand]!;
  return plan.overview;
}
