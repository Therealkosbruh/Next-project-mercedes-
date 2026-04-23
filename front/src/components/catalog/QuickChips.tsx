"use client";

import { useMemo } from "react";
import { useCatalogStore } from "@/store/catalogStore";
import { QUICK_CHIPS, CHIP_COUNTS_MAP } from "@/lib/catalog/config";
import type { CarListItem } from "@/lib/types";
import styles from "@/styles/components/catalog.module.scss";
import type en from "@/i18n/en";

interface Props {
  cars: CarListItem[];
  dict: typeof en.catalog.chips;
}

export default function QuickChips({ cars, dict }: Props) {
  const quickChip = useCatalogStore((s) => s.filters.quickChip);
  const setQuickChip = useCatalogStore((s) => s.setQuickChip);

  const chipCounts = useMemo<Record<string, number>>(
    () =>
      Object.fromEntries(
        QUICK_CHIPS.map((chip) => [
          chip.id,
          CHIP_COUNTS_MAP[chip.id]?.(cars) ?? 0,
        ]),
      ),
    [cars],
  );

  return (
    <div className={styles.chipsRow}>
      {QUICK_CHIPS.map((c) => {
        const active = quickChip === c.id;
        return (
          <button
            key={c.id}
            className={[
              styles.chip,
              c.cls ? styles[`chip_${c.cls}`] : "",
              active ? styles.chipActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setQuickChip(c.id)}
          >
            {dict[c.labelKey]}
            <span className={styles.chipCount}>{chipCounts[c.id] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
