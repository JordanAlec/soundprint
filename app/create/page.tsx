import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import CreateProfile from "@/components/create/create-profile";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="Create">
          <p className="max-w-prose text-base text-ink-muted sm:text-lg">
            Create your profile. Save and share the link!
          </p>
      </SubHeaderSection>

      <PanelRidge>
        <CreateProfile />
      </PanelRidge>

    </div>
  );
}
