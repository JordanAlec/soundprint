"use client";

import { useState } from "react";

const labelClass = "font-mono text-xs uppercase tracking-widest text-ink-muted";

interface Props {
  token: string;
}

type SnippetFormat = "bbcode" | "html";

export default function ForumSignaturePanel({ token }: Props) {
  const [open, setOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<SnippetFormat | null>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const profileUrl = `${siteUrl}/profile/${token}`;
  const imageUrl = `${siteUrl}/profile/${token}/signature-image`;

  const bbcode = `[url=${profileUrl}][img]${imageUrl}[/img][/url]`;
  const html = `<a href="${profileUrl}"><img src="${imageUrl}" alt="SoundPrint profile" /></a>`;

  async function handleCopy(format: SnippetFormat, snippet: string) {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedFormat(format);
    } catch {
      setCopiedFormat(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className={labelClass}>Forum signature</p>

      <p className="text-sm text-ink-muted">
        Drop this banner in a forum signature. It links back to this profile.
      </p>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="hover:cursor-pointer self-start rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover"
      >
        {open ? "Hide forum signature" : "Show forum signature"}
      </button>

      {open && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- external, dynamically generated image, not an optimizable local asset */}
          <img
            src={imageUrl}
            alt={`${profileUrl} forum signature`}
            width={600}
            height={150}
            className="max-w-full rounded-sm border border-border"
          />

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <span className={labelClass}>BBCode</span>
              <div className="flex flex-wrap items-start gap-3">
                <p className="break-all rounded-sm border border-border bg-canvas px-3 py-2 font-mono text-xs text-ink">
                  {bbcode}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy("bbcode", bbcode)}
                  className="hover:cursor-pointer whitespace-nowrap rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover"
                >
                  {copiedFormat === "bbcode" ? "Copied!" : "Copy BBCode"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className={labelClass}>HTML</span>
              <div className="flex flex-wrap items-start gap-3">
                <p className="break-all rounded-sm border border-border bg-canvas px-3 py-2 font-mono text-xs text-ink">
                  {html}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy("html", html)}
                  className="hover:cursor-pointer whitespace-nowrap rounded-sm border border-border bg-canvas px-4 py-2 text-sm text-ink hover:bg-surface-hover"
                >
                  {copiedFormat === "html" ? "Copied!" : "Copy HTML"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
