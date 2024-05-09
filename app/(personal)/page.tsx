"use server";

import { loadHomePage } from "@/actions/client/loadQuery";
import Home from "@/components/pages/home";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const home: any = await loadHomePage();
  return {
    title: home.seoTitle,
    description: home.overview,
  };
}

export default async function IndexRoute() {
  const home: any = await loadHomePage();
  if (!home) {
    return notFound();
  }
  return (
    <>
      <Home page={home} />
    </>
  );
}
