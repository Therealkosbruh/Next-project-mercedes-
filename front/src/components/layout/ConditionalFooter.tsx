"use client";

import { usePathname } from "next/navigation";
import { i18n } from "@/i18n/config";
import Footer from "../Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isHome = i18n.locales.some((locale) => pathname === `/${locale}`);
  return isHome ? null : <Footer />;
}
