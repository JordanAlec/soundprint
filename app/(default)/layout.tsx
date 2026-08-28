import type { ReactNode } from "react";
import ThemedPageShell from "@/components/theme/themed-page-shell";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return <ThemedPageShell>{children}</ThemedPageShell>;
}
