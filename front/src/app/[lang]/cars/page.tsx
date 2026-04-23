import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fetchCarsPage } from "@/lib/api";
import CatalogPage from "@/components/catalog/CatalogPage";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  return {
    title: dict.catalog.metaTitle,
    description: dict.catalog.metaDescription,
  };
}

export default async function CarsPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;

  let initialData = null;
  const dict = await getDictionary(lang);

  try {
    initialData = await fetchCarsPage(0);
  } catch {
    // backend unavailable — CatalogPage will show error state
  }

  return <CatalogPage dict={dict.catalog} initialData={initialData} />;
}
