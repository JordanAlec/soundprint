import { labelClass } from "./form-styles";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function LookingForBandField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className={labelClass}>Availability</p>
      <label className="flex items-center gap-2 text-sm text-ink" htmlFor="looking-for-band">
        <input
          id="looking-for-band"
          type="checkbox"
          className="accent-accent"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        I&apos;m looking for a band
      </label>
    </div>
  );
}
