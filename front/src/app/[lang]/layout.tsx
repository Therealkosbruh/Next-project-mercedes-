import type { Metadata } from "next";
import { mbCorpo } from "@/lib/fonts";
import { i18n, type Locale } from "@/i18n/config";
import "../../styles/globals.scss";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang} className={mbCorpo.variable}>
      <body className={mbCorpo.className}>{children}</body>
    </html>
  );
}
