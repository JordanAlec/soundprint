import PanelRidge from "@/components/layout/panel-ridge";
import RenderProfile from "@/components/profile/render-profile";
import ForumSignaturePanel from "@/components/profile/forum-signature-panel";
import { decodeProfileTokenCached } from "@/lib/profile/decode-cached";

export { generateMetadata } from "@/lib/web/profile-metadata";

export default async function ProfilePage(props: PageProps<"/profile/[token]">) {
  const { token } = await props.params;
  const result = await decodeProfileTokenCached(token);

  return (
    <div className="flex flex-col gap-8 sm:gap-10">

      <PanelRidge>
        {!result.ok && (
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Decode failed
          </p>
        )}

        <RenderProfile result={result} />
      </PanelRidge>

      {result.ok && (
        <PanelRidge>
          <ForumSignaturePanel token={token} />
        </PanelRidge>
      )}

    </div>
  );
}
