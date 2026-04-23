"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { CarDetail } from "@/lib/types";
import { getBadge, getCarSpecs, getCarImages } from "@/lib/car-detail-helpers";
import ImageSlider from "./ImageSlider";
import CarInfoPanel from "./CarInfoPanel";
import CarSpecsSection from "./CarSpecsSection";
import ConsultationForm from "./ConsultationForm";
import styles from "@/styles/components/car-detail.module.scss";
import type en from "@/i18n/en";

type Dict = typeof en.carDetail;

interface Props {
  car: CarDetail;
  dict: Dict;
}

export default function CarDetailPage({ car, dict }: Props) {
  const { lang } = useParams<{ lang: string }>();

  const badge = getBadge(car);
  const specs = getCarSpecs(car, dict.specs, dict.electric);
  const images = getCarImages(car);

  return (
    <main className={styles.page}>
      <Link href={`/${lang}/cars`} className={styles.backLink}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M6 1L1 6l5 5M1 6h14"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {dict.backToAll}
      </Link>

      <div className={styles.hero}>
        <ImageSlider images={images} alt={car.modelNumber} />
        <CarInfoPanel car={car} dict={dict} badge={badge} lang={lang} />
      </div>

      <CarSpecsSection title={dict.specsTitle} specs={specs} />

      {car.description && (
        <section className={styles.descSection}>
          <p className={styles.descText}>{car.description}</p>
        </section>
      )}

      <ConsultationForm
        slug={car.slug ?? car.modelNumber}
        dict={dict.consultation}
      />
    </main>
  );
}
