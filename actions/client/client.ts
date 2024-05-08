import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, token } from "./api";
// Your code here
const pId: string | any =
  projectId ||
  console.error("Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");
const client = createClient({
  projectId: pId,
  dataset,
  apiVersion,
  useCdn: false,
});

const homePageQuery = `*[_type == "homeDocument"][0]`;
const aboutPageQuery = `*[_type == "page" && title == "About"][0]`;
const pageBySlugQuery = `*[_type == "pages" && slug.current == $slug][0]`;

const loadHomePage = async () => {
  const page = await client.fetch(homePageQuery);
  return page;
};

const loadSettings = async () => {
  const settings = await client.fetch(`*[_type == "settings"][0]`);
  return settings;
};

const loadPageBySlug = async (slug: string) => {
  const page = await client.fetch(pageBySlugQuery, { slug });

  return page;
};

// Usage example:

export { loadHomePage, loadSettings, loadPageBySlug };

export default client;
