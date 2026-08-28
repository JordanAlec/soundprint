import type { AchievementEntry } from "@/lib/profile/badge/badge-schema";
import { paletteForTier } from "@/lib/profile/badge/badge-palette";
import BadgeMedal from "@/components/profile/badge/badge-medal";

interface Props {
  entry: AchievementEntry;
}

export default function AchievementItem({ entry }: Props) {
  const palette = paletteForTier(entry.tier);

  return (
    <div className="flex items-start gap-3 border-t border-border py-3 first:border-t-0 first:pt-0">
      <span className="mt-0.5">
        <BadgeMedal palette={palette} ribbon={Boolean(entry.tier)} size={22} />
      </span>

      <div className="flex flex-1 flex-col gap-0.5">
        <p className="flex items-baseline gap-2 text-sm font-medium text-ink">
          {entry.name}
          {entry.tier && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              {entry.tier}
            </span>
          )}
        </p>
        <p className="text-xs text-ink-muted">{entry.description}</p>
      </div>
    </div>
  );
}
