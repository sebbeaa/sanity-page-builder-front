import { Page } from "./page";

export default async function IndexPage({ page }: { page: any }) {
  return <Page data={page.data} />;
}
