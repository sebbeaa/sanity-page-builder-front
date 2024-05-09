"use server";

import { NavFooter } from "../nav/nav";
import { FooterNav } from "./footer";
export default async function Footer() {
  const header = await NavFooter();
  return <FooterNav footerContent={header} />;
}
