"use client";

import { ScrollLink } from "./scroll-link";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

export function Navbar({ nav, ctaText, ctaHref }: NavbarProps) {
  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-6 font-heading text-sm font-bold uppercase tracking-[0.14em] md:flex"
    >
      {nav.map((link) => (
        <ScrollLink
          key={link.href}
          href={link.href}
          className="border-b-2 border-transparent py-1 transition-colors hover:border-(--event-primary-bg)"
        >
          {link.label}
        </ScrollLink>
      ))}

      {ctaHref && ctaText ? (
        <ScrollLink
          href={ctaHref}
          className="rounded-(--event-border-radius) bg-(--event-primary-bg) px-4 py-2.5 text-(--event-primary-text) transition-colors hover:bg-(--event-tertiary-bg)"
        >
          {ctaText}
        </ScrollLink>
      ) : null}
    </nav>
  );
}
