import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import FaqList from "@/components/faq/faq-list";

export default function FaqPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="FAQs">
          <p className="max-w-prose text-base text-ink-muted sm:text-lg">
            Questions answered simply.
          </p>
      </SubHeaderSection>

      <PanelRidge>
        <FaqList />
      </PanelRidge>

    </div>
  );
}
