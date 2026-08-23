import type { FaqGroup } from "@/lib/faq/faq-data";
import FaqItem from "./faq-item";

interface Props {
  group: FaqGroup;
}

export default function FaqSection({ group }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        {group.heading}
      </p>

      <div className="flex flex-col">
        {group.entries.map((entry, index) => (
          <FaqItem key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}
