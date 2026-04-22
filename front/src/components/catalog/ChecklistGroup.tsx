"use client";

import styles from "@/styles/components/catalog-sidebar.module.scss";
import type { StringArrayFilterKey } from "@/lib/types";

interface Props {
  title: string;
  filterKey: StringArrayFilterKey;
  options: string[];
  selected: string[];
  counts?: Record<string, number>;
  onToggle: (key: StringArrayFilterKey, val: string) => void;
}

export default function ChecklistGroup({ title, filterKey, options, selected, counts, onToggle }: Props) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.checkList}>
        {options.map((opt) => (
          <div
            key={opt}
            className={`${styles.checkItem} ${selected.includes(opt) ? styles.checked : ""}`}
            onClick={() => onToggle(filterKey, opt)}
          >
            <div className={styles.checkLeft}>
              <div className={styles.checkBox}>
                <svg className={styles.checkMark} width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {opt}
            </div>
            {counts && <span className={styles.checkCount}>{counts[opt] ?? 0}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
