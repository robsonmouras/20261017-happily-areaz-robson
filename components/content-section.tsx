import Image from "next/image";

import { cn } from "@/lib/utils";

import { Container } from "./container";
import { SectionHeading } from "./section-heading";

type ContentSectionProps = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  index?: string;
  // Puts the image on the left on large screens.
  reverse?: boolean;
};

export function ContentSection({
  id,
  title,
  description,
  image,
  index,
  reverse,
}: ContentSectionProps) {
  return (
    <Container
      id={id}
      wrapperClassName="scroll-mt-20"
      className={cn(
        "grid gap-12",
        image && "lg:grid-cols-2 lg:items-center lg:gap-16",
      )}
    >
      <div className={cn(reverse && "lg:order-2")}>
        <SectionHeading index={index} title={title} description={description} />
      </div>
      {image ? (
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden="true"
            className={cn(
              "absolute -bottom-5 size-1/2 rounded-full bg-(--event-primary-bg)",
              reverse ? "-left-5" : "-right-5",
            )}
          />
          <Image
            src={image}
            alt=""
            width={800}
            height={600}
            className="relative aspect-4/3 w-full border-4 border-(--event-tertiary-bg) object-cover"
          />
        </div>
      ) : null}
    </Container>
  );
}
