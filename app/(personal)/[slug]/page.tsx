import { loadPageBySlug } from "@/actions/client/client";
import { generateStaticSlugs } from "@/actions/client/generateStaticSlugs";
import IndexPage from "@/components/pages/page";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const page = await loadPageBySlug(slug);

  return {
    title: page.title,
    description: page.overview,
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("pages");
}

export default async function PageSlugRotate({ params }: Props) {
  return <IndexPage slug={params.slug} />;
}
