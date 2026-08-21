import { cache } from "react";
import { decodeProfileToken } from "./token";

export const decodeProfileTokenCached = cache(decodeProfileToken);
