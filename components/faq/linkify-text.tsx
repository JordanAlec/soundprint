import type { ReactNode } from "react";

// Excludes trailing sentence punctuation from the match, so a URL followed
// by a period or closing bracket doesn't pull it into the link.
const URL_PATTERN = /(https?:\/\/\S*[^\s.,;:!?'")\]}])/;

// Splits answer text on any bare URLs and turns them into external links,
// so faq-data.ts can keep pasting URLs straight into the answer string.
export function linkifyText(text: string): ReactNode[] {
  return text.split(URL_PATTERN).map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}
