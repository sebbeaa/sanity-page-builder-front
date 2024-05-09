"use server";
import { loadPageBySlug } from "@/actions/client/loadQuery";
import { Page } from "./page";

export default async function IndexPage({ slug }: { slug: string }) {
  const page: any = await loadPageBySlug(slug);
  return <Page slug={slug} data={page.data} />;
}
