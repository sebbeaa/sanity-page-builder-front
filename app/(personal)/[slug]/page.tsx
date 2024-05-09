import { generateStaticSlugs } from "@/actions/client/generateStaticSlugs";
import { loadPageBySlug } from "@/actions/client/loadQuery";
import IndexPage from "@/components/pages/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const page: any = await loadPageBySlug(slug);

  return {
    title: page.data.title,
    description: page.data.overview,
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("pages");
}

export default async function PageSlugRotate({ params }: Props) {
  const page: any = await loadPageBySlug(params.slug);
  if (!page) {
    return notFound();
  }
  return <IndexPage page={page} slug={params.slug} />;
}
