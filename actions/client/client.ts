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
  useCdn: process.env.NODE_ENV === "development" ? true : false,
  perspective: "published",
  stega: {
    studioUrl: "https://visual-sanity-page-builder.vercel.app",

    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});

export default client;
