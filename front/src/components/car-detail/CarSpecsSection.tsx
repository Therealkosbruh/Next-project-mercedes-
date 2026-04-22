import { memo } from "react";
import type { SpecItem } from "@/lib/car-detail-helpers";
import styles from "@/styles/components/car-detail.module.scss";

interface Props {
  title: string;
  specs: SpecItem[];
}

const CarSpecsSection = memo(function CarSpecsSection({ title, specs }: Props) {
  return (
    <section className={styles.specsSection}>
      <p className={styles.specsSectionTitle}>{title}</p>
      <div className={styles.specsGrid}>
        {specs.map((s) => (
          <div key={s.label} className={styles.specCell}>
            <span className={styles.specCellLabel}>{s.label}</span>
            <span className={styles.specCellVal}>{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

export default CarSpecsSection;
