import {
  type Band,
  BAND_MAX_ITEMS
} from '@/lib/profile/band/band-schema';

import { labelClass } from "./form-styles";
import BandRow from "./band-row";

interface Props {
  bands: Band[];
  onAdd: () => void;
  onChange: (index: number, patch: Partial<Band>) => void;
  onRemove: (index: number) => void;
}

export default function BandsField({ bands, onAdd, onChange, onRemove }: Props) {
  const atMax = bands.length >= BAND_MAX_ITEMS;

  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>Bands</label>
      <p className="text-sm text-ink-muted">
        Optional. Bands you&apos;ve played in, past or present, up to {BAND_MAX_ITEMS}.
      </p>

      {bands.map((band, index) => (
        <BandRow
          key={index}
          band={band}
          id={`band-${index}`}
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
        {atMax ? `Bands full (${BAND_MAX_ITEMS} max)` : "Add band"}
      </button>
    </div>
  );
}
