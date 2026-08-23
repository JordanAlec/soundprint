import type { Band } from "@/lib/profile/band/band-schema";
import { formatMonthYear } from "@/utils/date-utils";

interface Props {
  band: Band;
}

export default function BandItem({ band }: Props) {
  return (
    <li className="flex items-baseline justify-between gap-3 border-t border-border py-2 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm text-ink">{band.name}</p>
        {band.position && <p className="text-xs text-ink-muted">{band.position}</p>}
      </div>

      <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-accent-2">
        {formatMonthYear(band.from)} – {band.to ? formatMonthYear(band.to) : "Present"}
      </span>
    </li>
  );
}
