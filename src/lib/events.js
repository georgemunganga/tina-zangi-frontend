import { events } from "@/data/mock";

export function eventMatchesSlug(event, slug) {
  if (!event || !slug) {
    return false;
  }

  if (event.slug === slug) {
    return true;
  }

  return Array.isArray(event.legacySlugs) && event.legacySlugs.includes(slug);
}

export function findEventBySlug(slug) {
  return events.find((event) => eventMatchesSlug(event, slug)) || null;
}
