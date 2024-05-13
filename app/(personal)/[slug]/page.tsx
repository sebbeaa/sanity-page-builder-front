import { generateStaticSlugs } from "@/actions/client/generateStaticSlugs";
import { loadPageBySlug } from "@/actions/client/loadQuery";
import IndexPage from "@/components/pages/page";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return generateStaticSlugs("pages");
}

export default async function PageSlugRotate({ params }: Props) {
  const page: any = await loadPageBySlug(params.slug);

  if (!page) {
    return notFound();
  }

  if (page?.data?.hidePage?.private) {
    return notFound();
  }

  return <IndexPage page={page} />;
}
