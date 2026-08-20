export default function Home() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl lg:text-6xl">
          Your musical profile, in one link.
        </h1>
        <p className="max-w-prose text-base text-ink-muted sm:text-lg">
          Instruments, grades, repertoire, and highlights. Captured as a
          shareable snapshot. Edit later, and the old link still tells the
          old story.
        </p>
      </section>

      <section className="panel-ridge relative overflow-hidden rounded-card border border-border bg-surface p-5 sm:p-6">
        <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden />
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          Status
        </p>
        <p className="mt-2 text-sm text-ink">
          We are working on this! The builder and profile view are coming
          next.
        </p>
      </section>
    </div>
  );
}
