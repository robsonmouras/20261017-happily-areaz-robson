"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";
import type { NavLinkItem } from "./navbar";
import { Navbar } from "./navbar";

type HeaderProps = {
  logo?: string | null;
  logoAlt?: string;
  name: string;
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
  hideNavigation?: boolean;
};

export function Header({
  logo,
  logoAlt = "Logo",
  name,
  nav,
  ctaText,
  ctaHref,
  hideNavigation = false,
}: HeaderProps) {
  if (hideNavigation) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b-4 border-(--event-tertiary-bg) bg-(--event-base-bg)">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="relative z-60 flex items-center gap-3"
          aria-label={name}
        >
          {logo ? (
            <Image
              src={logo}
              alt={logoAlt}
              width={250}
              height={100}
              className="max-h-12 w-auto object-contain object-left"
              draggable={false}
            />
          ) : (
            <>
              {/* Wordmark stand-in until the event has a logo. */}
              <span
                aria-hidden="true"
                className="relative size-9 shrink-0 overflow-hidden rounded-full bg-(--event-primary-bg)"
              >
                <span className="absolute inset-y-0 left-1/2 w-1/2 bg-(--event-secondary-bg)" />
              </span>
              <span className="font-heading text-2xl font-bold uppercase tracking-tighter">
                {name}
              </span>
            </>
          )}
        </Link>

        <Navbar nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        <div className="md:hidden">
          <MobileMenu nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </header>
  );
}
