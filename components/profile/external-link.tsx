interface Props {
  href?: string;
}

export default function ExternalLink({ href }: Props) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm underline decoration-border underline-offset-2 hover:text-accent hover:decoration-accent"
    >
      {href}
    </a>
  );
}
