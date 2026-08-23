"use client";

import { useState, type SubmitEvent } from "react";
import { decodeProfileToken, extractProfileToken } from "@/lib/profile/token";
import type { MusicProfile } from "@/lib/profile/profile-schema";
import { labelClass, inputClass } from "./form-styles";

interface Props {
  onImport: (profile: MusicProfile) => void;
}

export default function ImportFromLink({ onImport }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = extractProfileToken(value);
    if (!token) {
      setError("Paste a shareable link or token first.");
      return;
    }

    const result = decodeProfileToken(token);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    setValue("");
    onImport(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-sm border border-dashed border-border p-4"
    >
      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="import-link">
          Import from existing link
        </label>
        <p className="text-sm text-ink-muted">
          Paste a previous shareable link to overwrite the form below with its data.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="import-link"
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
          Import
        </button>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}
    </form>
  );
}
