import {
  type Qualification,
  QUALIFICATION_FIELD_MAX_LENGTH
} from '@/lib/profile/qualification/qualification-schema';

import { labelClass, inputClass } from "./form-styles";

interface Props {
  qualification: Qualification;
  id: string;
  onChange: (patch: Partial<Qualification>) => void;
  onRemove: () => void;
}

export default function QualificationRow({ qualification, id, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-border p-3">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-title`}>
          Title
        </label>
        <input
          id={`${id}-title`}
          required
          maxLength={QUALIFICATION_FIELD_MAX_LENGTH}
          placeholder="Grade 8 Piano"
          className={inputClass}
          value={qualification.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-institution`}>
          Institution
        </label>
        <input
          id={`${id}-institution`}
          required
          maxLength={QUALIFICATION_FIELD_MAX_LENGTH}
          placeholder="ABRSM"
          className={inputClass}
          value={qualification.institution}
          onChange={(e) => onChange({ institution: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-grade`}>
          Grade (optional)
        </label>
        <input
          id={`${id}-grade`}
          maxLength={QUALIFICATION_FIELD_MAX_LENGTH}
          placeholder="Distinction"
          className={inputClass}
          value={qualification.grade ?? ""}
          onChange={(e) => onChange({ grade: e.target.value || undefined })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor={`${id}-year`}>
          Year (optional)
        </label>
        <input
          id={`${id}-year`}
          inputMode="numeric"
          maxLength={4}
          placeholder="2024"
          className={inputClass}
          value={qualification.year ?? ""}
          onChange={(e) => onChange({ year: e.target.value || undefined })}
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
