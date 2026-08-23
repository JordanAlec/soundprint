import type { Repertoire } from "@/lib/profile/repertoire/repertoire-schema";

interface Props {
  repertoire: Repertoire;
  trackNumber: number;
}

export default function RepertoireItem({ repertoire, trackNumber }: Props) {
  return (
    <li className="flex items-baseline gap-3 border-t border-border py-2 first:border-t-0 first:pt-0">
      <span className="shrink-0 font-mono text-xs tabular-nums text-accent" aria-hidden>
        {String(trackNumber).padStart(3, "0")}
      </span>

      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm text-ink">{repertoire.title}</p>
        <p className="text-xs text-ink-muted">{repertoire.artist}</p>
      </div>

      <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-accent-2">
        {repertoire.genre}
      </span>
    </li>
  );
}
