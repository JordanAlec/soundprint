import type { Overlap } from "@/lib/profile/compare/profile-overlap";

interface Props {
  title: string;
  overlap: Overlap;
  nameA: string;
  nameB: string;
}

function ChipRow({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{label}</p>
      <ul className="flex flex-wrap gap-1.5">
        {values.map((value) => (
          <li
            key={value}
            className="rounded-sm border border-border bg-canvas px-2.5 py-1 text-sm text-ink"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OverlapGroup({ title, overlap, nameA, nameB }: Props) {
  const isEmpty = overlap.shared.length === 0 && overlap.onlyA.length === 0 && overlap.onlyB.length === 0;

  if (isEmpty) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">{title}</p>
      <ChipRow label="Shared" values={overlap.shared} />
      <ChipRow label={`Only ${nameA}`} values={overlap.onlyA} />
      <ChipRow label={`Only ${nameB}`} values={overlap.onlyB} />
    </div>
  );
}
