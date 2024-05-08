import { Page } from "./page";

export default function IndexPage({ slug }: { slug: string }) {
  return <Page slug={slug} />;
}
