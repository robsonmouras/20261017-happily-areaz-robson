import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { Button } from "@/components/ui/button";

import { Container } from "./container";
import { heroImage, text } from "./helpers";
import { ScrollLink } from "./scroll-link";

type HeroSectionProps = {
  event: PublicEventData["event"];
  formActive?: boolean;
};

export function HeroSection({ event, formActive }: HeroSectionProps) {
  const content = event.content;
  const heroSectionType = content.heroSection ?? "image";
  const image = heroImage(content);
  const buttonLinks = event.display_settings.buttonLinks;
  const ds = event.display_settings;

  // Last word of the name picks up the accent colour ("AREA" + "Z").
  const words = text(event.name).split(" ");
  const lastWord = words.length > 1 ? words.pop() : null;

  const location =
    event.location && (ds.displayLocation ?? true) ? event.location : null;

  return (
    <section className="relative isolate overflow-hidden bg-(--event-base-bg)">
      <Container
        id="hero"
        className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8"
        wrapperClassName="pt-10 pb-16 md:pt-16 md:pb-24"
      >
        <div className="lg:col-span-7">
          <p className="inline-block bg-(--event-tertiary-bg) px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.22em] text-(--event-tertiary-text)">
            {text(event.type, "Event")} &middot; Est. 1967
          </p>
          <h1 className="mt-6 font-heading text-[clamp(4.5rem,17vw,12rem)] font-bold uppercase leading-[0.82] tracking-tighter">
            {words.join(" ")}
            {lastWord ? (
              <>
                {" "}
                <span className="text-(--event-primary-bg)">{lastWord}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            {text(content.heroText)}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {formActive &&
            buttonLinks?.heroCTA.display &&
            buttonLinks.heroCTA.text ? (
              <Button
                asChild
                size="lg"
                className="h-auto min-h-14 rounded-(--event-border-radius) bg-(--event-primary-bg) px-7 py-3 font-heading text-base font-bold uppercase tracking-wider text-(--event-primary-text) hover:bg-(--event-tertiary-bg)"
              >
                <ScrollLink href="#register">
                  {text(buttonLinks.heroCTA.text, "Register")}
                </ScrollLink>
              </Button>
            ) : null}
            {location ? (
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em]">
                <span className="mr-2 inline-block size-2.5 rounded-full bg-(--event-secondary-bg)" />
                {location}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {/* Geometric composition sitting behind the photo. */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-6 size-2/3 rounded-full bg-(--event-primary-bg) sm:-right-8"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-4 h-1/3 w-2/3 bg-(--event-secondary-bg) [clip-path:polygon(0_100%,100%_100%,0_0)] sm:-left-8"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-6 right-6 z-10 flex w-24 flex-col gap-2"
          >
            <span className="h-3 bg-(--event-tertiary-bg)" />
            <span className="h-3 bg-(--event-tertiary-bg)" />
            <span className="h-3 bg-(--event-tertiary-bg)" />
          </div>

          <div className="relative aspect-4/5 overflow-hidden rounded-t-full border-4 border-(--event-tertiary-bg) bg-(--event-accent-bg)">
            {heroSectionType === "video" && content.heroVideo ? (
              <video
                key={content.heroVideo}
                className="size-full object-cover"
                loop
                muted
                autoPlay
                playsInline
                aria-hidden="true"
              >
                <source src={content.heroVideo} type="video/mp4" />
              </video>
            ) : heroSectionType !== "none" && image ? (
              <Image
                src={image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
