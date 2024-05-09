import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, revalidateSecret } from "./api";
// Your code here
const pId: string | any =
  projectId ||
  console.error("Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");
const client = createClient({
  projectId: pId,
  dataset,
  apiVersion,
  useCdn: revalidateSecret ? false : true,
  perspective: "published",
  stega: {
    studioUrl: "/",
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});

export default client;
