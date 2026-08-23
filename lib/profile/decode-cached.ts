import { cache } from "react";
import { decodeProfileToken } from "./token";

// react's cache() memoizes the pending promise too, so concurrent callers
// within one request share a single decode instead of racing.
export const decodeProfileTokenCached = cache(decodeProfileToken);
