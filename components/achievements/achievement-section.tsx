import type { AchievementGroup } from "@/lib/profile/badge/badge-schema";
import AchievementItem from "./achievement-item";

interface Props {
  group: AchievementGroup;
}

export default function AchievementSection({ group }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        {group.heading}
      </p>

      <div className="flex flex-col">
        {group.entries.map((entry, index) => (
          <AchievementItem key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}
