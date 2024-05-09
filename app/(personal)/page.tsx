"use server";

import { loadHomePage } from "@/actions/client/loadQuery";
import Home from "@/components/pages/home";

export async function generateMetadata() {
  const home: any = await loadHomePage();
  return {
    title: home.seoTitle,
    description: home.overview,
  };
}

export default async function IndexRoute() {
  return (
    <>
      <Home />
    </>
  );
}
