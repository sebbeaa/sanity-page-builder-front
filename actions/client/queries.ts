import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./api";
import { groq } from "next-sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const homePageQuery = groq`*[_type == "homeDocument"][0]`;
export const settingsQuery = groq`*[_type == "settings"][0]`;
export const pageBySlugQuery = groq`*[_type == "pages" && slug.current == $slug][0]`;

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}
