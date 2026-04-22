import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fetchCarsPage } from "@/lib/api";
import CatalogPage from "@/components/catalog/CatalogPage";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.catalog.metaTitle,
    description: dict.catalog.metaDescription,
  };
}

export default async function CarsPage({ params }: Props) {
  const { lang } = await params;

  let initialData = null;
  const dict = await getDictionary(lang);

  try {
    initialData = await fetchCarsPage(0);
  } catch {
    // backend unavailable — CatalogPage will show error state
  }

  return <CatalogPage dict={dict.catalog} initialData={initialData} />;
}
