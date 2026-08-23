import type { Repertoire } from "@/lib/profile/repertoire/repertoire-schema";

interface Props {
  repertoire: Repertoire[];
}

function countByGenre(repertoire: Repertoire[]) {
  const counts = new Map<string, number>();
  for (const item of repertoire) {
    counts.set(item.genre, (counts.get(item.genre) ?? 0) + 1);
  }
  return counts;
}

export default function RepertoireGenreSummary({ repertoire }: Props) {
  const counts = countByGenre(repertoire);

  return (
    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
      {Array.from(counts, ([genre, count]) => `${count} ${genre}`).join(" · ")}
    </p>
  );
}
