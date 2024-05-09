import { Page } from "../page/page";

export default async function Home({ page }: { page: any }) {
  return <Page data={page.data} />;
}
