import {
  type Band,
  BAND_FIELD_MAX_LENGTH
} from '@/lib/profile/band/band-schema';

import { todayIsoDate } from '@/utils/date-utils'
import { labelClass, inputClass } from "./form-styles";

interface Props {
  band: Band;
  id: string;
  onChange: (patch: Partial<Band>) => void;
  onRemove: () => void;
}

export default function BandRow({ band, id, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-border p-3">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-name`}>
          Band name
        </label>
        <input
          id={`${id}-name`}
          required
          maxLength={BAND_FIELD_MAX_LENGTH}
          placeholder="The Midnight Set"
          className={inputClass}
          value={band.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-position`}>
          Position (optional)
        </label>
        <input
          id={`${id}-position`}
          maxLength={BAND_FIELD_MAX_LENGTH}
          placeholder="Lead guitar"
          className={inputClass}
          value={band.position ?? ""}
          onChange={(e) => onChange({ position: e.target.value || undefined })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-from`}>
          Joined
        </label>
        <input
          id={`${id}-from`}
          type="date"
          required
          max={todayIsoDate()}
          className={inputClass}
          value={band.from}
          onChange={(e) => onChange({ from: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-to`}>
          Left (optional)
        </label>
        <p className="text-sm text-ink-muted">
          Leave blank if you&apos;re still in this band.
        </p>
        <input
          id={`${id}-to`}
          type="date"
          min={band.from || undefined}
          max={todayIsoDate()}
          className={inputClass}
          value={band.to ?? ""}
          onChange={(e) => onChange({ to: e.target.value || undefined })}
        />
      </div>

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
