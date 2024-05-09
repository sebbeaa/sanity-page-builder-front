import { Page } from "../page/page";

export default function Home({ page }: { page: any }) {
  return <Page data={page.data} />;
}
