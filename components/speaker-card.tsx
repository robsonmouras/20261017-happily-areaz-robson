"use client";

import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { SocialIcon } from "react-social-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/markdown";

type SpeakerCardProps = {
  speaker: PublicEventData["speakers"][number];
};

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const links = [...(speaker.website_url ?? ""), ...speaker.social_urls].filter(
    Boolean,
  );

  return (
    <Dialog>
      <article className="border-4 border-(--event-tertiary-bg) bg-(--event-accent-bg) p-5 text-(--event-accent-text)">
        {speaker.image_url ? (
          <Image
            src={speaker.image_url}
            alt=""
            width={400}
            height={400}
            className="mb-5 aspect-square w-full rounded-t-full border-b-4 border-(--event-tertiary-bg) object-cover"
          />
        ) : null}
        <h3 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight">{speaker.name}</h3>
        <p className="mt-1 text-sm font-medium">
          {[speaker.title, speaker.company].filter(Boolean).join(", ")}
        </p>
        <div className="flex items-center justify-between gap-3 mt-3 ">
          <div className="flex flex-wrap gap-3 items-center">
            {links.map((url) => (
              <SocialIcon
                key={url}
                url={url}
                style={{ width: 40, height: 40 }}
                className="hover:text-event-secondary-bg-alt"
                bgColor="transparent"
                fgColor={"var(--event-secondary-bg)"}
                target="_blank"
                rel="noreferrer"
              />
            ))}
          </div>
          {speaker.bio && (
            <DialogTrigger className="cursor-pointer bg-(--event-secondary-bg) px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-(--event-secondary-text) transition-colors hover:bg-(--event-tertiary-bg)">Bio</DialogTrigger>
          )}
        </div>
      </article>

      <DialogContent className="max-h-162.5 overflow-y-auto border-none shadow-sm sm:border sm:border-(--event-accent-bg)">
        <DialogDescription className="sr-only">
          Speaker details
        </DialogDescription>
        <div className="space-y-3 text-center sm:space-y-4">
          {speaker.image_url ? (
            <div className="mx-auto max-w-62.5">
              <Image
                src={speaker.image_url}
                alt=""
                width={400}
                height={400}
                className="aspect-square rounded-(--event-border-radius) object-cover"
              />
            </div>
          ) : null}

          <DialogTitle className="text-lg font-semibold sm:text-xl">
            {speaker.name}
          </DialogTitle>

          {speaker.title || speaker.company ? (
            <p className="text-lg sm:text-xl">
              {speaker.title && <span>{speaker.title}</span>}
              {speaker.title && speaker.company && <span>, </span>}
              {speaker.company && <span>{speaker.company}</span>}
            </p>
          ) : null}

          {speaker.website_url ? (
            <p>
              <a
                href={speaker.website_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:underline sm:text-base"
              >
                {speaker.website_url.replace(/^https?:\/\//, "")}
              </a>
            </p>
          ) : null}

          {speaker.bio ? (
            <Markdown className="text-sm sm:text-base">{speaker.bio}</Markdown>
          ) : null}

          {speaker.social_urls.length > 0 ? (
            <ul className="flex flex-row justify-center">
              {speaker.social_urls.map((url, i) => (
                <li key={url} className={i === 0 ? "-ml-2" : ""}>
                  <SocialIcon
                    style={{ width: 40, height: 40 }}
                    url={url}
                    bgColor="transparent"
                    fgColor={"var(--event-secondary-bg)"}
                    target="_blank"
                    rel="noreferrer"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
