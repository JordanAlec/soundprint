import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import RenderProfile from "@/components/profile/render-profile";
import { decodeProfileToken } from "@/lib/profile/token";

export default async function ProfilePage(props: PageProps<"/profile/[token]">) {
  const { token } = await props.params;
  const result = decodeProfileToken(token);

  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="Profile">
          <p className="max-w-prose text-base text-ink-muted sm:text-lg">
            Decoded from the shareable link.
          </p>
      </SubHeaderSection>

      <PanelRidge>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            {result.ok ? "Decoded data" : "Decode failed"}
          </p>

          <RenderProfile result={result} />
        </div>
      </PanelRidge>

    </div>
  );
}
