/** Homepage collection event cards (non-football). Files under public/experiences/events/. */
export function collectionEventImage(id: string) {
  return `/experiences/events/${id}.jpg`;
}

/** Vertical fixture / hero cards (slug matches extraFixtures). */
export function fixtureHeroImage(slug: string) {
  return `/experiences/events/${slug}.jpg`;
}

/** Venue hero (venue section, package gallery). */
export function venueImage(slug: string) {
  return `/experiences/venues/${slug}.jpg`;
}

/** Track / stadium overview for package “view from seat” (optional per venue). */
export function venueMapImage(slug: string) {
  return `/experiences/venues/${slug}-map.jpg`;
}
