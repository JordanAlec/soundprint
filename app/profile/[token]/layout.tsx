import PageShell from "@/components/theme/page-shell";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";

export default async function ProfileLayout({ children, params }: LayoutProps<"/profile/[token]">) {
  const { token } = await params;
  const result = await decodeProfileTokenCached(token);

  return <PageShell theme={result.ok ? result.data.theme : undefined}>{children}</PageShell>;
}
