import { HIGHLIGHT_MAX_LENGTH } from '@/lib/profile/highlight/highlight-schema';
import { labelClass, textareaClass } from "./form-styles";

interface Props {
  value: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export default function HighlightRow({ value, index, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass} htmlFor={`highlight-${index}`}>
        Highlight {index + 1}
      </label>
      <textarea
        id={`highlight-${index}`}
        required
        rows={2}
        maxLength={HIGHLIGHT_MAX_LENGTH}
        placeholder="Supported a UK jazz festival headline set, 2023"
        className={textareaClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        type="button"
        onClick={onRemove}
        className="hover:cursor-pointer self-start text-sm text-ink-muted underline underline-offset-2 hover:text-ink"
      >
        Remove
      </button>
    </div>
  );
}
