"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import type { CarListItem } from "@/lib/api";
import styles from "@/styles/components/catalog-card.module.scss";

interface Props {
  car: CarListItem;
  index: number;
  priceLabel: string;
  explore: string;
  wide: boolean;
}

function getBadge(car: CarListItem) {
  if (car.modelNumber.toLowerCase().includes("maybach"))
    return { label: "Maybach", cls: styles.maybach };
  if (car.isAmg) return { label: "AMG", cls: styles.amg };
  if (car.isElectric) return { label: "EQ", cls: styles.eq };
  return null;
}

export default function CatalogCard({
  car,
  index,
  priceLabel,
  explore,
  wide,
}: Props) {
  const [imgError, setImgError] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const ref = useRef<HTMLAnchorElement>(null);
  const badge = getBadge(car);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${index * 40}ms`;
          el.classList.add(styles.cardVisible);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const addTouched = useCallback(
    () => ref.current?.classList.add(styles.cardTouched),
    [],
  );
  const removeTouched = useCallback(
    () => ref.current?.classList.remove(styles.cardTouched),
    [],
  );

  const specs = [
    { lbl: "Fuel", val: car.fuelType },
    {
      lbl: "Trans",
      val: car.transmission === "Automatic" ? "Auto" : car.transmission,
    },
    { lbl: "Drive", val: car.driveType },
    { lbl: "Power", val: car.powerHp ? `${car.powerHp} HP` : null },
    { lbl: "Seats", val: car.seats },
  ].filter((s) => s.val != null);

  const href = `/${lang}${car.slug ? `/cars/${car.slug}` : "/cars"}`;

  return (
    <Link
      ref={ref}
      href={href}
      className={styles.card}
      onTouchStart={addTouched}
      onTouchEnd={removeTouched}
      onTouchCancel={removeTouched}
    >
      <div className={styles.metaRow}>
        <div className={styles.yearBody}>
          {car.year}
          {car.year && car.bodyType && <span className={styles.dot}>·</span>}
          {car.bodyType}
        </div>
        {badge && (
          <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>
        )}
      </div>

      <div className={styles.imageWrap}>
        {car.preview && !imgError ? (
          <>
            <Image
              src={car.preview}
              alt={car.modelNumber}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className={styles.imageDefault}
              onError={() => setImgError(true)}
            />
            {car.hoverPreview && (
              <Image
                src={car.hoverPreview}
                alt={car.modelNumber}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className={styles.imageHover}
              />
            )}
          </>
        ) : (
          <div className={styles.imagePlaceholder}>{car.modelType.name}</div>
        )}
      </div>

      <h3 className={styles.model}>{car.modelNumber}</h3>
      <p className={styles.desc}>{car.shortDescription}</p>

      <div className={`${styles.specs} ${wide ? styles.specsWide : ""}`}>
        {specs.map((s) => (
          <div className={styles.spec} key={s.lbl}>
            <span className={styles.specLabel}>{s.lbl}</span>
            <span className={styles.specVal}>{s.val}</span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.priceGroup}>
          <span className={styles.priceLabel}>{priceLabel}</span>
          <span className={styles.priceVal}>
            <span className={styles.priceCur}>$</span>
            {car.price.toLocaleString("en-US")}
          </span>
        </div>
        <span className={styles.detailLink}>
          {explore}
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M1 5h11m0 0L8 1m4 4L8 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
