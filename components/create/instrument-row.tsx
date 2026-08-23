import {
  type Instrument,
  INSTRUMENT_MAX_LENGTH
} from '@/lib/profile/instrument/instrument-schema';

import { skillLevels } from '@/lib/profile/skill/skill-schema';

import { todayIsoDate } from '@/utils/date-utils'
import { labelClass, inputClass } from "./form-styles";

interface Props {
  instrument: Instrument;
  index: number;
  onChange: (patch: Partial<Instrument>) => void;
  onRemove: () => void;
}

export default function InstrumentRow({ instrument, index, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-border p-4">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`instrument-${index}`}>
          Instrument
        </label>
        <input
          id={`instrument-${index}`}
          required
          maxLength={INSTRUMENT_MAX_LENGTH}
          placeholder="Guitar, Bass, Piano..."
          className={inputClass}
          value={instrument.instrument}
          onChange={(e) => onChange({ instrument: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`played-since-${index}`}>
          Played since
        </label>
        <p className="text-sm text-ink-muted">
          An estimate is fine. This is shown as months and years, not an exact date.
        </p>
        <input
          id={`played-since-${index}`}
          type="date"
          required
          max={todayIsoDate()}
          className={inputClass}
          value={instrument.playedSince}
          onChange={(e) => onChange({ playedSince: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`skill-level-${index}`}>
          Skill level
        </label>
        <select
          id={`skill-level-${index}`}
          required
          className={inputClass}
          value={instrument.skillLevel}
          onChange={(e) =>
            onChange({ skillLevel: e.target.value as Instrument["skillLevel"] })
          }
        >
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
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
