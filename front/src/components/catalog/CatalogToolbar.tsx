"use client";

import { useRef, useEffect } from "react";
import { useCatalogStore } from "@/store/catalogStore";
import { SORT_OPTIONS } from "@/lib/catalog/config";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import styles from "@/styles/components/catalog.module.scss";
import type en from "@/i18n/en";

type ToolbarDict = Pick<
  typeof en.catalog,
  "showing" | "of" | "vehicle" | "vehicles" | "sortBy" | "sort"
>;

interface Props {
  filteredCount: number;
  totalCount: number;
  dict: ToolbarDict;
}

export default function CatalogToolbar({
  filteredCount,
  totalCount,
  dict,
}: Props) {
  const sort = useCatalogStore((s) => s.sort);
  const sortOpen = useCatalogStore((s) => s.sortOpen);
  const { setSort, setSortOpen } = useCatalogStore();

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen, setSortOpen]);

  const activeSortLabel =
    SORT_OPTIONS.find((s) => s.id === sort)?.labelKey ?? "featured";

  return (
    <div className={styles.toolbar}>
      <div className={styles.resultsCount}>
        {dict.showing} <strong>{filteredCount}</strong> {dict.of} {totalCount}{" "}
        {filteredCount === 1 ? dict.vehicle : dict.vehicles}
      </div>
      <div className={styles.toolbarRight}>
        <div className={styles.sortDropdown} ref={sortRef}>
          <button
            className={styles.sortBtn}
            onClick={() => setSortOpen(!sortOpen)}
          >
            {dict.sortBy}{" "}
            <span className={styles.sortVal}>{dict.sort[activeSortLabel]}</span>
            <ChevronDownIcon size={10} />
          </button>
          {sortOpen && (
            <div className={styles.sortMenu}>
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  className={s.id === sort ? styles.sortMenuActive : ""}
                  onClick={() => {
                    setSort(s.id);
                    setSortOpen(false);
                  }}
                >
                  {dict.sort[s.labelKey]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
