"use server";

import { loadSettings } from "@/actions/client/loadQuery";

export async function NavHeader() {
  const settings: any = await loadSettings();
  return settings?.data?.content?.html.split("<footer")[0];
}
export async function NavFooter() {
  const settings: any = await loadSettings();

  return (
    "<footer" +
    settings?.data.content?.html.split("<footer")[1] +
    "<style>" +
    settings?.data.content?.css +
    "</style>"
  );
}
