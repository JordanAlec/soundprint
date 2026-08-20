"use client";

import { useState } from "react";
import NextLink from "next/link";

const labelClass = "font-mono text-xs uppercase tracking-widest text-ink-muted";

interface Props {
  path: string;
  onReset: () => void;
}

export default function ShareableLink({ path, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className={labelClass}>Your shareable link</p>

      <p className="break-all rounded-sm border border-border bg-canvas px-3 py-2 font-mono text-sm text-ink">
        {url}
      </p>

      <p className="text-sm text-accent">
        Save this link now. Nothing is stored anywhere. If you lose it, this profile is gone for good.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="hover:cursor-pointer rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>

        <NextLink
          href={path}
          className="rounded-sm border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90"
        >
          View profile
        </NextLink>

        <button
          type="button"
          onClick={onReset}
          className="hover:cursor-pointer px-4 py-2 text-sm text-ink-muted underline underline-offset-2 hover:text-ink"
        >
          Back to form
        </button>
      </div>
    </div>
  );
}
