"use client";

import styles from "@/styles/components/catalog-sidebar.module.scss";

interface Props<T extends string | number> {
  title: string;
  options: T[];
  selected: T[];
  onToggle: (val: T) => void;
}

export default function FilterPillGroup<T extends string | number>({
  title,
  options,
  selected,
  onToggle,
}: Props<T>) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.pillGroup}>
        {options.map((opt) => (
          <button
            key={String(opt)}
            className={`${styles.pill} ${selected.includes(opt) ? styles.pillActive : ""}`}
            onClick={() => onToggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
