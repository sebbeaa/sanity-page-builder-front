import { loadSettings } from "@/actions/client/loadQuery";

export async function NavHeader() {
  const settings: any = await loadSettings();
  const html = settings?.data?.content?.html.split("<footer")[0];

  // Replace <a> tags with <Link> components
  const modifiedHtml = html.replace(/<a\b/g, "<Link");

  return modifiedHtml;
}

export async function NavFooter() {
  const settings: any = await loadSettings();
  const html = settings?.data.content?.html.split("<footer")[1];
  const css = settings?.data.content?.css;

  // Replace <a> tags with <Link> components
  const modifiedHtml = html.replace(/<a\b/g, "<Link");

  return "<footer" + modifiedHtml + "<style>" + css + "</style>";
}
