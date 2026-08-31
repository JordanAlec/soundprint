import { labelClass, inputClass } from "./form-styles";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ExternalLinkField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass} htmlFor="external-link">
        Link (optional)
      </label>
      <input
        id="external-link"
        type="url"
        placeholder="https://..."
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
