import type { ReactNode } from "react";
import PageShell from "@/components/theme/page-shell";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
