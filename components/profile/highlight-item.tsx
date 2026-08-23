interface Props {
  highlight: string;
}

export default function HighlightItem({ highlight }: Props) {
  return (
    <li className="border-t border-border py-2 text-sm text-ink first:border-t-0 first:pt-0">
      {highlight}
    </li>
  );
}
