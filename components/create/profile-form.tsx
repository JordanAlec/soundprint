"use client";

import { useState, type SubmitEvent } from "react";
import { EMPTY_INSTRUMENT, EMPTY_PROFILE, type Instrument, type MusicProfile } from "@/lib/profile/schema";
import ImportFromLink from "./import-from-link";
import NameField from "./name-field";
import InstrumentsField from "./instruments-field";

interface Props {
  onSubmit: (profile: MusicProfile) => void;
}

export default function ProfileForm({ onSubmit }: Props) {
  const [profile, setProfile] = useState<MusicProfile>(EMPTY_PROFILE);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(profile);
  }

  function addInstrument() {
    setProfile({
      ...profile,
      instruments: [...profile.instruments, { ...EMPTY_INSTRUMENT }],
    });
  }

  function removeInstrument(index: number) {
    setProfile({
      ...profile,
      instruments: profile.instruments.filter((_, i) => i !== index),
    });
  }

  function updateInstrument(index: number, patch: Partial<Instrument>) {
    setProfile({
      ...profile,
      instruments: profile.instruments.map((instrument, i) =>
        i === index ? { ...instrument, ...patch } : instrument
      ),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <ImportFromLink onImport={setProfile} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <NameField
          value={profile.name}
          onChange={(name) => setProfile({ ...profile, name })}
        />

        <InstrumentsField
          instruments={profile.instruments}
          onAdd={addInstrument}
          onChange={updateInstrument}
          onRemove={removeInstrument}
        />

        <button
          type="submit"
          className="hover:cursor-pointer self-start rounded-sm border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90"
        >
          Generate shareable link
        </button>
      </form>
    </div>
  );
}
