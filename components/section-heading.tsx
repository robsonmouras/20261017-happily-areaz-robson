import { Markdown } from "./markdown";

type SectionHeadingProps = {
  title: string;
  description?: string | null;
  // Small index label above the title, e.g. "01".
  index?: string;
};

export function SectionHeading({
  title,
  description,
  index,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl text-left">
      <div className="flex items-center gap-3" aria-hidden={index ? undefined : true}>
        {index ? (
          <span className="font-heading text-sm font-bold tracking-[0.2em]">
            {index}
          </span>
        ) : null}
        <span className="size-3 rounded-full bg-(--event-primary-bg)" />
        <span className="h-1 w-16 bg-current" />
      </div>
      <h2 className="mt-5 font-heading text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-5 text-base leading-relaxed md:text-lg">
          <Markdown>{description}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
