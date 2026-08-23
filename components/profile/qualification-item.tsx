import type { Qualification } from "@/lib/profile/qualification/qualification-schema";

interface Props {
  qualification: Qualification;
}

export default function QualificationItem({ qualification }: Props) {
  return (
    <li className="flex items-baseline justify-between gap-3 border-t border-border py-2 first:border-t-0 first:pt-0">
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium text-ink">{qualification.title}</p>
        <p className="text-xs text-ink-muted">
          {qualification.institution}
          {qualification.year ? ` · ${qualification.year}` : ""}
        </p>
      </div>

      {qualification.grade && (
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-accent-2">
          {qualification.grade}
        </span>
      )}
    </li>
  );
}
