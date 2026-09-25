import type { PublicEventData } from "@/lib/happily/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ordered } from "./helpers";
import { Markdown } from "./markdown";

type FaqListProps = {
  faqs: PublicEventData["faqs"];
};

export function FaqList({ faqs }: FaqListProps) {
  return (
    <Accordion type="multiple" className="grid gap-3">
      {ordered(faqs).map((faq) => (
        <AccordionItem
          key={faq.id}
          value={String(faq.id)}
          className="border-x-0 border-t-0 border-b-4 border-(--event-tertiary-bg) bg-(--event-base-bg) px-0 pb-3 text-(--event-base-text)"
        >
          <AccordionTrigger className="font-heading text-lg font-bold uppercase tracking-tight hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-(--event-base-text)/90">
            <Markdown>{faq.answer}</Markdown>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
