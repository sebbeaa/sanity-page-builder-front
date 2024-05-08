import "server-only";

import { groq } from "next-sanity";

import client from "./client";
import { token } from "./api";

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({ token })
    .fetch<
      string[]
    >(groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`, { type });
}
