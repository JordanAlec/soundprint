import { NAME_MAX_LENGTH } from "@/lib/profile/schema";
import { labelClass, inputClass } from "./form-styles";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function NameField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass} htmlFor="name">
        Name
      </label>
      <input
        id="name"
        required
        maxLength={NAME_MAX_LENGTH}
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
