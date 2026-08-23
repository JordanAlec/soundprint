import {
  type Repertoire,
  REPERTOIRE_FIELD_MAX_LENGTH
} from '@/lib/profile/repertoire/repertoire-schema';

import { labelClass, inputClass } from "./form-styles";

interface Props {
  repertoire: Repertoire;
  id: string;
  onChange: (patch: Partial<Repertoire>) => void;
  onRemove: () => void;
}

export default function RepertoireRow({ repertoire, id, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-border p-3">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-title`}>
          Title
        </label>
        <input
          id={`${id}-title`}
          required
          maxLength={REPERTOIRE_FIELD_MAX_LENGTH}
          placeholder="Autumn Leaves"
          className={inputClass}
          value={repertoire.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-artist`}>
          Artist
        </label>
        <input
          id={`${id}-artist`}
          required
          maxLength={REPERTOIRE_FIELD_MAX_LENGTH}
          placeholder="Cannonball Adderley"
          className={inputClass}
          value={repertoire.artist}
          onChange={(e) => onChange({ artist: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-genre`}>
          Genre
        </label>
        <input
          id={`${id}-genre`}
          required
          maxLength={REPERTOIRE_FIELD_MAX_LENGTH}
          placeholder="Jazz"
          className={inputClass}
          value={repertoire.genre}
          onChange={(e) => onChange({ genre: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-link`}>
          Link (optional)
        </label>
        <input
          id={`${id}-link`}
          type="url"
          placeholder="https://..."
          className={inputClass}
          value={repertoire.link ?? ""}
          onChange={(e) => onChange({ link: e.target.value || undefined })}
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
