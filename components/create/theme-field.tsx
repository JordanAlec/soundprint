import { profileThemes, type ProfileTheme } from "@/lib/profile/theme/theme-schema";
import { labelClass } from "./form-styles";

const themeLabels: Record<ProfileTheme, string> = {
  studio: "Studio",
  sunburst: "Sunburst",
  neon: "Neon Mixtape",
};

interface Props {
  value: ProfileTheme;
  onChange: (value: ProfileTheme) => void;
}

export default function ThemeField({ value, onChange }: Props) {
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-1.5 border-0 p-0">
      <legend className={labelClass}>Profile theme</legend>
      <p className="text-sm text-ink-muted">
        How your profile looks to anyone who opens the link.
      </p>

      <div className="flex flex-wrap gap-1.5">
        {profileThemes.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`hover:cursor-pointer rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              value === option
                ? "border-accent bg-accent text-accent-ink"
                : "border-border bg-canvas text-ink-muted hover:bg-surface-hover hover:text-ink"
            }`}
          >
            {themeLabels[option]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
