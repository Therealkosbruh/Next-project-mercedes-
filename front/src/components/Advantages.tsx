import AdvantageCard, { type AdvantageItem } from "./AdvantageCard";
import styles from "@/styles/components/advantages.module.scss";

interface AdvantagesProps {
  items: readonly AdvantageItem[];
  learnMore: string;
}

export default function Advantages({ items, learnMore }: AdvantagesProps) {
  return (
    <section className={styles.section} aria-label="More vehicles">
      <div className={styles.grid}>
        {items.map((item, i) => (
          <AdvantageCard key={i} {...item} index={i} learnMore={learnMore} />
        ))}
      </div>
    </section>
  );
}
