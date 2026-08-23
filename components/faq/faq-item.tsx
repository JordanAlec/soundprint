import type { FaqEntry } from "@/lib/faq/faq-data";
import { linkifyText } from "./linkify-text";

interface Props {
  entry: FaqEntry;
}

export default function FaqItem({ entry }: Props) {
  return (
    <details className="group border-t border-border py-3 first:border-t-0 first:pt-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-ink marker:content-none">
        {entry.question}
        <span className="shrink-0 font-mono text-accent group-open:hidden" aria-hidden>+</span>
        <span className="hidden shrink-0 font-mono text-accent group-open:inline" aria-hidden>−</span>
      </summary>

      <p className="mt-2 text-sm text-ink-muted">{linkifyText(entry.answer)}</p>
    </details>
  );
}
