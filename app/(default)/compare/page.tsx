import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import ComparePanels from "@/components/compare/compare-panels";

export default function ComparePage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="Compare">
          <p className="max-w-prose text-base text-ink-muted sm:text-lg">
            Paste two shareable links to see both profiles side by side.
          </p>
      </SubHeaderSection>

      <PanelRidge>
        <ComparePanels />
      </PanelRidge>

    </div>
  );
}
