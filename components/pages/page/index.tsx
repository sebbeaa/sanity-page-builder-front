"use server";

import { Page } from "./page";

export default async function IndexPage({
  slug,
  page,
}: {
  slug: string;
  page: any;
}) {
  return <Page slug={slug} data={page.data} />;
}
