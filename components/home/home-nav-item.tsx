import NextLink from "next/link";

interface Props {
  href: string;
  label: string;
  description: string;
}

export default function HomeNavItem({ href, label, description }: Props) {
  return (
    <NextLink
      href={href}
      className="group relative flex flex-col gap-1.5 overflow-hidden rounded-card border border-border bg-canvas py-4 pl-5 pr-4 transition-colors hover:bg-surface-hover"
    >
      <span
        className="absolute inset-y-0 left-0 w-1.5 bg-accent-2 transition-colors group-hover:bg-accent"
        aria-hidden
      />

      <p className="font-display text-lg uppercase tracking-tight">{label}</p>
      <p className="text-sm text-ink-muted">{description}</p>
    </NextLink>
  );
}
