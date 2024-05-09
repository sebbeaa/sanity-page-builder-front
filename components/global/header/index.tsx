import { HeaderNav } from "./header";
import { NavHeader } from "../nav/nav";
export default async function Header() {
  const header = await NavHeader();
  return <HeaderNav headerContent={header} />;
}
