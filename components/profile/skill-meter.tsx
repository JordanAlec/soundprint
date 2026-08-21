import { skillLevels, type SkillLevel } from "@/lib/profile/schema";

interface Props {
  level: SkillLevel;
}

export default function SkillMeter({ level }: Props) {
  const filled = skillLevels.indexOf(level) + 1;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end gap-1" role="img" aria-label={`Skill level: ${level}`}>
        {skillLevels.map((option, index) => (
          <span
            key={option}
            aria-hidden
            className={`w-2 rounded-[1px] ${
              index < filled ? "bg-accent" : "bg-border"
            }`}
            style={{ height: `${8 + index * 3}px` }}
          />
        ))}
      </div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
        {level}
      </p>
    </div>
  );
}
