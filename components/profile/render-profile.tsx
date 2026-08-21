import { DecodeResult } from "@/lib/profile/token";
import ProfileDisplay from "./profile-display";

interface Props {
    result: DecodeResult;
}

export default function RenderProfile({ result } : Props) {

    if (!result.ok) {
        return (<p className="mt-3 text-sm text-accent">{result.error}</p>);
    }

    return (
        <div className="mt-3">
            <ProfileDisplay profile={result.data} />
        </div>
    );
}