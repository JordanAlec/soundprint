import HighlightItem from "./highlight-item";

interface Props {
  highlights: string[];
}

export default function HighlightsList({ highlights }: Props) {
  if (highlights.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        Musical highlights
      </p>

      <ul className="flex flex-col">
        {highlights.map((highlight, index) => (
          <HighlightItem key={index} highlight={highlight} />
        ))}
      </ul>
    </div>
  );
}
