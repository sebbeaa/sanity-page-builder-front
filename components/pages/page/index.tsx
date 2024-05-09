import { Page } from "./page";

export default function IndexPage({ page }: { page: any }) {
  return <Page data={page.data} />;
}
