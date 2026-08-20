"use client";

import { useState, type SubmitEvent } from "react";
import { EMPTY_PROFILE, type MusicProfile } from "@/lib/profile/schema";

const labelClass = "font-mono text-xs uppercase tracking-widest text-ink-muted";
const inputClass =
  "w-full rounded-sm border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent";

interface Props {
  onSubmit: (profile: MusicProfile) => void;
}

export default function ProfileForm({ onSubmit }: Props) {
  const [profile, setProfile] = useState<MusicProfile>(EMPTY_PROFILE);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(profile);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          required
          className={inputClass}
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="hover:cursor-pointer self-start rounded-sm border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90"
      >
        Generate shareable link
      </button>
    </form>
  );
}
