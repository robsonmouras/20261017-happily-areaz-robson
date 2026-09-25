import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "../globals.css";

import { EventShell } from "@/components/event-shell";
import { styleValue } from "@/components/helpers";
import { PreviewBanner } from "@/components/preview-banner";
import { isPreviewRequest, resolveEventEnv } from "@/lib/happily/config";
import { getPublicEvent } from "@/lib/happily/queries";

// First-party analytics proxy host.
const ANALYTICS_HOST = "https://hx.happily.events";

// Mirrors the event's fontPrimary / fontSecondary from the CMS.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { event } = await getPublicEvent();
  const { metadata } = event;

  return {
    title: metadata.title || event.name,
    description: metadata.description || "",
    ...(metadata.allow_search_engine_indexing === false && {
      robots: "noindex, nofollow",
    }),
    openGraph: {
      ...(metadata.image_url && { images: [metadata.image_url] }),
    },
  };
}

export default async function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preview = await isPreviewRequest();
  const env = await resolveEventEnv();
  const eventData = await getPublicEvent({ env });
  const styles = eventData.event.styles;

  // Only track published-site visits: no analytics in preview or when
  // the event has no analytics configured.
  const analyticsId = env === "prod" ? eventData.event.analytics_id : null;

  const eventVars = {
    "--event-primary-bg": styleValue(styles, "primaryBg", "#171717"),
    "--event-primary-text": styleValue(styles, "primaryText", "#ffffff"),
    "--event-secondary-bg": styleValue(styles, "secondaryBg", "#f4f4f5"),
    "--event-secondary-text": styleValue(styles, "secondaryText", "#171717"),
    "--event-tertiary-bg": styleValue(styles, "tertiaryBg", "#202020"),
    "--event-tertiary-text": styleValue(styles, "tertiaryText", "#ffffff"),
    "--event-accent-bg": styleValue(styles, "accentBg", "#171717"),
    "--event-accent-text": styleValue(styles, "accentText", "#ffffff"),
    "--event-base-bg": styleValue(styles, "baseBg", "#ffffff"),
    "--event-base-text": styleValue(styles, "baseText", "#171717"),
    "--event-border-radius": styleValue(styles, "borderRadius", "0.2rem"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body style={eventVars} className="min-h-full flex flex-col">
        {preview && <PreviewBanner />}
        {analyticsId && (
          <script
            defer
            src={`${ANALYTICS_HOST}/script.js`}
            data-host-url={ANALYTICS_HOST}
            data-website-id={analyticsId}
          />
        )}
        <EventShell eventData={eventData}>{children}</EventShell>
      </body>
    </html>
  );
}
