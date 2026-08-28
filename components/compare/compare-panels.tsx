"use client";

import { useState } from "react";
import type { DecodeResult } from "@/lib/profile/token";
import ProfilePasteField from "./profile-paste-field";
import ProfileDisplay from "@/components/profile/profile-display";
import ComparisonSummary from "./comparison-summary";

interface Slot {
  result: DecodeResult;
  token: string;
}

function ProfilePanel({ slot, placeholder }: { slot: Slot | null; placeholder: string }) {
  if (!slot) {
    return <p className="mt-3 text-sm text-ink-muted">{placeholder}</p>;
  }

  if (!slot.result.ok) {
    return <p className="mt-3 text-sm text-accent">{slot.result.error}</p>;
  }

  return (
    <div className="mt-3">
      <ProfileDisplay profile={slot.result.data} />
    </div>
  );
}

export default function ComparePanels() {
  const [slotA, setSlotA] = useState<Slot | null>(null);
  const [slotB, setSlotB] = useState<Slot | null>(null);

  const sameToken = Boolean(slotA && slotB && slotA.token === slotB.token);
  const bothOk = slotA?.result.ok && slotB?.result.ok;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfilePasteField id="compare-a" label="Profile A" onDecoded={(result, token) => setSlotA({ result, token })} />
        <ProfilePasteField id="compare-b" label="Profile B" onDecoded={(result, token) => setSlotB({ result, token })} />
      </div>

      {sameToken && (
        <p className="text-sm text-ink-muted">
          That&apos;s the same profile pasted twice - paste a different link into Profile B to compare.
        </p>
      )}

      {!sameToken && bothOk && slotA?.result.ok && slotB?.result.ok && (
        <div className="rounded-card border border-border bg-canvas p-5">
          <ComparisonSummary profileA={slotA.result.data} profileB={slotB.result.data} />
        </div>
      )}

      {!sameToken && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <ProfilePanel slot={slotA} placeholder="Paste a link above to load Profile A." />
          </div>
          <div>
            <ProfilePanel slot={slotB} placeholder="Paste a link above to load Profile B." />
          </div>
        </div>
      )}
    </div>
  );
}
