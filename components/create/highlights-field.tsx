import { HIGHLIGHT_MAX_ITEMS } from '@/lib/profile/highlight/highlight-schema';
import { labelClass } from "./form-styles";
import HighlightRow from "./highlight-row";

interface Props {
  highlights: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

export default function HighlightsField({ highlights, onAdd, onChange, onRemove }: Props) {
  const atMax = highlights.length >= HIGHLIGHT_MAX_ITEMS;

  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>Musical highlights</label>
      <p className="text-sm text-ink-muted">
        Optional. Anything worth calling out: tours, releases, standout gigs, up to {HIGHLIGHT_MAX_ITEMS}.
      </p>

      {highlights.map((highlight, index) => (
        <HighlightRow
          key={index}
          value={highlight}
          index={index}
          onChange={(value) => onChange(index, value)}
          onRemove={() => onRemove(index)}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        disabled={atMax}
        className="hover:cursor-pointer self-start rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {atMax ? `Highlights full (${HIGHLIGHT_MAX_ITEMS} max)` : "Add highlight"}
      </button>
    </div>
  );
}
