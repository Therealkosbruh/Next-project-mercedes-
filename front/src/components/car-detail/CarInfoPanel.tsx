import { memo } from "react";
import Link from "next/link";
import type { CarDetail } from "@/lib/types";
import type { BadgeInfo } from "@/lib/car-detail-helpers";
import styles from "@/styles/components/car-detail.module.scss";
import type en from "@/i18n/en";

type Dict = typeof en.carDetail;

interface Props {
  car: CarDetail;
  dict: Dict;
  badge: BadgeInfo | null;
  lang: string;
}

const BADGE_CLS: Record<BadgeInfo["variant"], string> = {
  amg:     styles.amg,
  eq:      styles.eq,
  maybach: styles.maybach,
};

const CarInfoPanel = memo(function CarInfoPanel({ car, dict, badge, lang }: Props) {
  const metaParts = [car.year, car.bodyType].filter(Boolean).join(" · ");

  return (
    <div className={styles.info}>
      {badge && (
        <span className={`${styles.badge} ${BADGE_CLS[badge.variant]}`}>
          {badge.label}
        </span>
      )}

      {metaParts && <p className={styles.metaRow}>{metaParts}</p>}

      <h1 className={styles.modelName}>{car.modelNumber}</h1>

      <div className={styles.priceBlock}>
        <span className={styles.priceLabel}>{dict.from}</span>
        <div className={styles.price}>
          <span className={styles.priceCur}>$</span>
          {car.price.toLocaleString("en-US")}
        </div>
      </div>

      {car.shortDescription && (
        <p className={styles.shortDesc}>{car.shortDescription}</p>
      )}

      {car.colors.length > 0 && (
        <div className={styles.colorsBlock}>
          <span className={styles.colorsLabel}>{dict.colors}</span>
          <div className={styles.colorSwatches}>
            {car.colors.map((c) => (
              <span
                key={c.hex}
                className={styles.swatch}
                style={{ background: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      <Link href={`/${lang}/cars`} className={styles.ctaBtn}>
        {dict.requestConsultation}
      </Link>
    </div>
  );
});

export default CarInfoPanel;
