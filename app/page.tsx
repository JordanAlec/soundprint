import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="Your musical profile, in one link.">
        <p className="max-w-prose text-base text-ink-muted sm:text-lg">
          Instruments, grades, repertoire, and highlights. Captured as a
          shareable snapshot. Edit later, and the old link still tells the
          old story.
        </p>
      </SubHeaderSection>

      <PanelRidge>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Status
          </p>

          <Link href="/profile/WyJKb3JkYW5BbGVjIixbXV0" className="text-accent underline underline-offset-2">
              See a decoded sample profile
          </Link>

          <br />

          <Link href="/create" className="text-accent underline underline-offset-2">
              Or create a new one!
          </Link>
        </div>
      </PanelRidge>

    </div>
  );
}
