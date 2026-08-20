import { DecodeResult } from "@/lib/profile/token";

interface Props {
    result: DecodeResult;
}

export default function RenderProfile({ result } : Props) {
    
    if (!result.ok) {
        return (<p className="mt-3 text-sm text-accent">{result.error}</p>);
    }
    
    return (
        <div>
            <pre className="mt-3 overflow-x-auto font-mono text-xs text-ink sm:text-sm">
              {JSON.stringify(result.data, null, 2)}
            </pre>
        </div>
    );
}