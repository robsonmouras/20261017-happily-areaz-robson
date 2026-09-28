import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { Footer } from "./footer";
import { Header } from "./header";
import { displayToggles, styleValue, text } from "./helpers";
import type { NavLinkItem } from "./navbar";

type EventShellProps = {
  eventData: PublicEventData;
  children: ReactNode;
};

export function EventShell({ eventData, children }: EventShellProps) {
  const { event } = eventData;
  const styles = event.styles;

  // A link only shows when its section renders and the CMS hasn't hidden it.
  const { navLinks, sections } = displayToggles(event);
  const candidates = [
    { key: "about", label: "About", present: true },
    { key: "agenda", label: "Agenda", present: eventData.sessions.length > 0 },
    {
      key: "speakers",
      label: "Speakers",
      present: eventData.speakers.length > 0,
    },
    { key: "host", label: "Host", present: true },
    {
      key: "sponsors",
      label: "Sponsors",
      present: eventData.sponsors.length > 0,
    },
    { key: "faq", label: "FAQ", present: eventData.faqs.length > 0 },
  ] as const;

  const nav: NavLinkItem[] = [
    ...candidates
      .filter(
        (c) =>
          c.present &&
          (navLinks?.[c.key]?.display ?? true) &&
          (sections?.[c.key]?.display ?? true),
      )
      .map((c) => ({
        label: text(navLinks?.[c.key]?.text, c.label),
        // The FAQ section's element id is "faqs".
        href: `/#${c.key === "faq" ? "faqs" : c.key}`,
      })),
    ...(event.photos_toggle ? [{ label: "Gallery", href: "/photos" }] : []),
  ];

  const buttonLinks = event.display_settings.buttonLinks;
  const showCta =
    eventData.form?.is_active &&
    buttonLinks?.navCTA.display &&
    buttonLinks.heroCTA.text;

  return (
    <div className="flex min-h-screen flex-col bg-(--event-base-bg) text-(--event-base-text)">
      <Header
        logo={event.logo_url}
        logoAlt={`${event.name} logo`}
        name={event.name}
        nav={nav}
        hideNavigation={event.display_settings.hideNavigation ?? false}
        ctaText={
          showCta ? text(buttonLinks!.heroCTA.text, "Register") : undefined
        }
        ctaHref={showCta ? "/#register" : undefined}
      />
      {children}
      <Footer baseBackgroundColor={styleValue(styles, "baseBg", "#ffffff")} />
    </div>
  );
}
