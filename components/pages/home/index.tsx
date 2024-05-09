"use server";
import { loadHomePage } from "@/actions/client/loadQuery";
import { HomePage } from "./homePage";

export default async function Home() {
  const page = await loadHomePage();
  return <HomePage data={page.data} />;
}
