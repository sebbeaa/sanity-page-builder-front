import { HomePage } from "./homePage";

export default async function Home({ page }: { page: any }) {
  return <HomePage data={page.data} />;
}
