import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fetchCarBySlug } from "@/lib/api";
import CarDetailPage from "@/components/car-detail/CarDetailPage";
import styles from "@/styles/components/car-detail.module.scss";
import Link from "next/link";

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const car = await fetchCarBySlug(slug);
    return {
      title: `${car.modelNumber} | Mercedes-Benz`,
      description: car.shortDescription ?? undefined,
    };
  } catch {
    return { title: "Mercedes-Benz" };
  }
}

export default async function CarSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  let car = null;
  try {
    car = await fetchCarBySlug(slug);
  } catch {
    // 
  }

  if (!car) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>{dict.carDetail.notFound}</h1>
          <p>{dict.carDetail.notFoundBody}</p>
          <Link href={`/${lang}/cars`} className={styles.backLink} style={{ padding: 0, marginTop: 16 }}>
            ← {dict.carDetail.backToAll}
          </Link>
        </div>
      </main>
    );
  }

  return <CarDetailPage car={car} dict={dict.carDetail} />;
}
