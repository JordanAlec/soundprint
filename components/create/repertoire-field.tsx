import {
  type Repertoire,
  REPERTOIRE_MAX_ITEMS
} from '@/lib/profile/repertoire/repertoire-schema';

import { labelClass } from "./form-styles";
import RepertoireRow from "./repertoire-row";

interface Props {
  repertoire: Repertoire[];
  idPrefix: string;
  onAdd: () => void;
  onChange: (index: number, patch: Partial<Repertoire>) => void;
  onRemove: (index: number) => void;
}

export default function RepertoireField({ repertoire, idPrefix, onAdd, onChange, onRemove }: Props) {
  const atMax = repertoire.length >= REPERTOIRE_MAX_ITEMS;

  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>Repertoire</label>
      <p className="text-sm text-ink-muted">
        A few songs you play on this instrument, up to {REPERTOIRE_MAX_ITEMS}.
      </p>

      {repertoire.map((item, index) => (
        <RepertoireRow
          key={index}
          repertoire={item}
          id={`${idPrefix}-${index}`}
          onChange={(patch) => onChange(index, patch)}
          onRemove={() => onRemove(index)}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        disabled={atMax}
        className="hover:cursor-pointer self-start rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {atMax ? `Repertoire full (${REPERTOIRE_MAX_ITEMS} max)` : "Add song"}
      </button>
    </div>
  );
}
