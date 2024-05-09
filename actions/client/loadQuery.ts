//@ts-ignore
"use server";

import * as queryStore from "@sanity/react-loader";

import client from "@/actions/client/client";

import { token } from "@/actions/client/api";
import { groq } from "next-sanity";
import { homePageQuery, pageBySlugQuery, settingsQuery } from "./queries";

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config();
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {} as any) => {
  // Don't cache by default
  let revalidate: NextFetchRequestConfig["revalidate"] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },

    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
  } as any);
}) satisfies typeof queryStore.loadQuery;

export const loadHomePage = async () => {
  return loadQuery<any | null>(homePageQuery, {}, {
    next: { tags: [`homeDocument`] },
  } as any);
};

export const loadSettings = async () => {
  return loadQuery<any>(settingsQuery, {}, {
    next: { tags: ["settings", "homeDocument", "pages"] },
  } as any);
};

export const loadPageBySlug = async (slug: string) => {
  return loadQuery<any | null>(pageBySlugQuery, { slug }, {
    next: { tags: [`pages:${slug}`] },
  } as any);
};

// Usage example:
