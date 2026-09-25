import type { PublicEventData } from "@/lib/happily/types";

type EventContent = PublicEventData["event"]["content"];
type EventStyles = PublicEventData["event"]["styles"];

export function text(value: string | null | undefined, fallback = "") {
  return value?.trim() || fallback;
}

export function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function styleValue(
  styles: EventStyles,
  key: keyof EventStyles,
  fallback: string,
) {
  const value = styles[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function heroImage(content: EventContent) {
  return content.heroImage || content.heroGraphic || null;
}

export function formatEventDate(
  date: string | null,
  timezone: string | null,
  options: Intl.DateTimeFormatOptions,
) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    timeZone: timezone || undefined,
    ...options,
  }).format(new Date(date));
}

export function eventDateRange(event: PublicEventData["event"]) {
  const start = formatEventDate(event.start_date, event.timezone, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const end = formatEventDate(event.end_date, event.timezone, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!start) {
    return null;
  }

  if (!end || end === start) {
    return start;
  }

  return `${start} - ${end}`;
}

export function eventTimeRange(event: PublicEventData["event"]) {
  const start = formatEventDate(event.start_date, event.timezone, {
    hour: "numeric",
    minute: "2-digit",
  });
  const end = formatEventDate(event.end_date, event.timezone, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!start || !end) {
    return start;
  }

  return `${start} - ${end}`;
}

export function ordered<T extends { order: number | null }>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

type SectionKey = "about" | "agenda" | "speakers" | "host" | "sponsors" | "faq";

// The API returns these display toggles, but the generated schema doesn't
// describe them yet, so they're typed here.
type DisplayToggles = {
  navLinks?: Partial<
    Record<SectionKey, { text?: string | null; display?: boolean | null }>
  >;
  sections?: Partial<Record<SectionKey, { display?: boolean | null }>>;
};

export function displayToggles(event: PublicEventData["event"]) {
  return event.display_settings as DisplayToggles;
}
