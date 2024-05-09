//@ts-ignore
"use server";

import * as queryStore from "@sanity/react-loader";

import client from "@/actions/client/client";

import { token } from "@/actions/client/api";

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === "preview",
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {} as any) => {
  const {
    perspective = process.env.VERCEL_ENV === "preview"
      ? "previewDrafts"
      : "published",
  } = options;
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
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: process.env.VERCEL_ENV === "preview",
  } as any);
}) satisfies typeof queryStore.loadQuery;

const homePageQuery = `*[_type == "homeDocument"][0]`;
const settingsQuery = `*[_type == "settings"][0]`;
const pageBySlugQuery = `*[_type == "pages" && slug.current == $slug][0]`;

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
