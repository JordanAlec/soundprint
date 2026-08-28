"use client";

import { useState, type SubmitEvent } from "react";
import { decodeProfileToken, extractProfileToken, type DecodeResult } from "@/lib/profile/token";
import { labelClass, inputClass } from "@/components/create/form-styles";

interface Props {
  id: string;
  label: string;
  onDecoded: (result: DecodeResult, token: string) => void;
}

export default function ProfilePasteField({ id, label, onDecoded }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = extractProfileToken(value);
    if (!token) {
      setError("Paste a shareable link or token first.");
      return;
    }

    const result = await decodeProfileToken(token);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    onDecoded(result, token);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          className={inputClass}
          placeholder="https://.../profile/..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
        />

        <button
          type="submit"
          className="hover:cursor-pointer whitespace-nowrap rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover"
        >
          Load
        </button>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}
    </form>
  );
}
