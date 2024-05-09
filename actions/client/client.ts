import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./api";
// Your code here
const pId: string | any =
  projectId ||
  console.error("Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");
const client = createClient({
  projectId: pId,
  dataset,
  apiVersion,
  useCdn: true,
});

export default client;
