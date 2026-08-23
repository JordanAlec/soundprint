import SubHeaderSection from "@/components/layout/sub-header-section";
import HomeNav from "@/components/home/home-nav";

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

      <HomeNav />

    </div>
  );
}
