import type { HappilyEnv, PublicEventData } from "@/lib/happily/types";

import { AgendaList } from "./agenda-list";
import { Container } from "./container";
import { ContentSection } from "./content-section";
import { FaqList } from "./faq-list";
import { GeoStrip } from "./geo";
import { displayToggles, hasText, text } from "./helpers";
import { HeroSection } from "./hero-section";
import { Markdown } from "./markdown";
import { RegistrationForm } from "./registration-form";
import { SectionHeading } from "./section-heading";
import { SpeakersGrid } from "./speakers-grid";
import { SponsorsGrid } from "./sponsors-grid";

type EventPageProps = {
  eventData: PublicEventData;
  eventId: string;
  env: HappilyEnv;
};

export function EventPage({ eventData, eventId, env }: EventPageProps) {
  const { event, form, sessions, speakers, sponsors, faqs, tracks } = eventData;
  const content = event.content;
  const { sections } = displayToggles(event);
  const shown = (key: "about" | "agenda" | "speakers" | "host" | "sponsors" | "faq") =>
    sections?.[key]?.display ?? true;

  const showAbout =
    shown("about") &&
    (hasText(content.aboutTitle) || hasText(content.aboutDescription));
  const showHost =
    shown("host") &&
    (hasText(content.companyAboutTitle) ||
      hasText(content.companyAboutDescription));

  return (
    <main>
      <HeroSection event={event} formActive={form?.is_active} />
      <GeoStrip />

      {showAbout ? (
        <ContentSection
          id="about"
          index="01"
          title={text(content.aboutTitle, "About")}
          description={content.aboutDescription}
          image={content.aboutImage}
        />
      ) : null}

      {shown("agenda") && sessions.length ? (
        <Container
          id="agenda"
          wrapperClassName="bg-(--event-accent-bg) text-(--event-accent-text) scroll-mt-20"
        >
          <SectionHeading
            index="02"
            title={text(content.agendaTitle, "Agenda")}
            description={content.agendaDescription}
          />
          <div className="mt-10">
            <AgendaList
              sessions={sessions}
              speakers={speakers}
              tracks={tracks}
              event={event}
            />
          </div>
        </Container>
      ) : null}

      {shown("speakers") && speakers.length ? (
        <Container id="speakers" wrapperClassName="scroll-mt-20">
          <SectionHeading
            index="03"
            title={text(content.speakersTitle, "Speakers")}
            description={content.speakersDescription}
          />
          <div className="mt-10">
            <SpeakersGrid speakers={speakers} />
          </div>
        </Container>
      ) : null}

      {form ? (
        <>
          <GeoStrip offset={3} />
          <Container
            id="register"
            className="flex flex-col items-center text-center"
            wrapperClassName="bg-(--event-secondary-bg) text-(--event-secondary-text) scroll-mt-20"
          >
            {form.form_title ? (
              <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
                {text(form.form_title, "Register")}
              </h2>
            ) : null}
            {form.form_description ? (
              <Markdown className="mt-5 max-w-2xl text-base md:text-lg">
                {form.form_description}
              </Markdown>
            ) : null}
            <div className="mt-12 flex w-full max-w-3xl items-center justify-center">
              <RegistrationForm
                eventId={eventId}
                env={env}
                form={form}
                redirectTo="/confirmation"
                buttonText={form.form_button_text}
              />
            </div>
          </Container>
          <GeoStrip offset={5} />
        </>
      ) : null}

      {showHost ? (
        <ContentSection
          id="host"
          index="04"
          title={text(content.companyAboutTitle, "About the Host")}
          description={content.companyAboutDescription}
          image={content.companyAboutImage}
          reverse
        />
      ) : null}

      {shown("sponsors") && sponsors.length ? (
        <Container
          id="sponsors"
          wrapperClassName="bg-(--event-tertiary-bg) text-(--event-tertiary-text) scroll-mt-20"
        >
          <SectionHeading
            index="05"
            title={text(content.sponsorsTitle, "Sponsors")}
            description={content.sponsorsDescription}
          />
          <div className="mt-10">
            <SponsorsGrid sponsors={sponsors} />
          </div>
        </Container>
      ) : null}

      {shown("faq") && faqs.length ? (
        <Container id="faqs" wrapperClassName="scroll-mt-20">
          <SectionHeading
            index="06"
            title={text(content.faqsTitle, "FAQs")}
            description={content.faqsDescription}
          />
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
        </Container>
      ) : null}
    </main>
  );
}
