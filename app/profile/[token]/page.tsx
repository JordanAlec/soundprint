import PanelRidge from "@/components/layout/panel-ridge";
import SubHeaderSection from "@/components/layout/sub-header-section";
import RenderProfile from "@/components/profile/render-profile";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";

export default async function ProfilePage(props: PageProps<"/profile/[token]">) {
  const { token } = await props.params;
  const result = decodeProfileTokenCached(token);

  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <SubHeaderSection title="Profile">
          <p className="max-w-prose text-base text-ink-muted sm:text-lg">
            Decoded from the shareable link.
          </p>
      </SubHeaderSection>

      <PanelRidge>
        {!result.ok && (
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Decode failed
          </p>
        )}

        <RenderProfile result={result} />
      </PanelRidge>

    </div>
  );
}
