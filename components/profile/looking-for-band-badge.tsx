interface Props {
  lookingForBand?: boolean;
}

export default function LookingForBandBadge({ lookingForBand }: Props) {
  if (!lookingForBand) {
    return null;
  }

  return (
    <span className="inline-flex w-fit items-center rounded-sm border border-accent bg-accent px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-ink">
      Looking for a band
    </span>
  );
}
