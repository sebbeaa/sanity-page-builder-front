import { loadSettings } from "@/actions/client/loadQuery";
import { NavHeader } from "./header";

export default async function Header() {
  const settings = await loadSettings();
  return <NavHeader settings={settings} />;
}
