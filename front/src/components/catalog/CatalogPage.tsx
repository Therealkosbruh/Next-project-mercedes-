"use client";

import { useMemo, useEffect, useRef } from "react";
import type { CarsPage } from "@/lib/types";
import { usePagination } from "@/hooks/usePagination";
import { useCatalogStore } from "@/store/catalogStore";
import { applyFilters, buildAppliedChips } from "@/lib/catalog/filters";
import { applySorting } from "@/lib/catalog/sorting";
import CatalogCard from "./CatalogCard";
import CatalogSidebar from "./CatalogSidebar";
import CatalogToolbar from "./CatalogToolbar";
import QuickChips from "./QuickChips";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";
import CloseIcon from "@/components/icons/CloseIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import RemoveIcon from "@/components/icons/RemoveIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon";
import styles from "@/styles/components/catalog.module.scss";
import type en from "@/i18n/en";

type CatalogDict = typeof en.catalog;

interface Props {
  dict: CatalogDict;
  initialData: CarsPage | null;
}

export default function CatalogPage({ dict, initialData }: Props) {
  const { cars, hasMore, loading, error, loadMore } = usePagination(initialData);

  const filters = useCatalogStore((s) => s.filters);
  const view = useCatalogStore((s) => s.view);
  const mobileFiltersOpen = useCatalogStore((s) => s.mobileFiltersOpen);

  const {
    toggleStringFilter,
    toggleSeat,
    setPowerRange,
    setFlag,
    setMobileFiltersOpen,
    clearAll,
  } = useCatalogStore();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasMore, loadMore]);

  const sort = useCatalogStore((s) => s.sort);

  const filtered = useMemo(
    () => applySorting(applyFilters(cars, filters), sort),
    [cars, filters, sort]
  );

  const counts = useMemo(() => {
    const body: Record<string, number> = {};
    const fuel: Record<string, number> = {};
    cars.forEach((c) => {
      if (c.bodyType) body[c.bodyType] = (body[c.bodyType] ?? 0) + 1;
      if (c.fuelType) fuel[c.fuelType] = (fuel[c.fuelType] ?? 0) + 1;
    });
    return { body, fuel };
  }, [cars]);

  const appliedChips = useMemo(
    () => buildAppliedChips(filters, { toggleStringFilter, toggleSeat, setPowerRange, setFlag }),
    [filters, toggleStringFilter, toggleSeat, setPowerRange, setFlag]
  );

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{dict.heading}</h1>
        <p className={styles.subtitle}>{dict.subtitle}</p>
      </div>

      <div className={styles.searchBar}>
        <SearchBar placeholder={dict.searchPlaceholder} />
        <button
          className={styles.mobileFilterBtn}
          onClick={() => setMobileFiltersOpen(true)}
          aria-label={dict.filtersBtn}
        >
          <FilterIcon size={20} />
        </button>
      </div>

      <QuickChips cars={cars} dict={dict.chips} />

      {appliedChips.length > 0 && (
        <div className={styles.applied}>
          <span className={styles.appliedLabel}>{dict.applied}</span>
          {appliedChips.map((a, i) => (
            <div className={styles.appliedChip} key={i}>
              <span className={styles.appliedKey}>{a.key}</span>
              {a.label}
              <button onClick={a.onRemove} aria-label="Remove filter">
                <RemoveIcon size={10} />
              </button>
            </div>
          ))}
          <button className={styles.clearAll} onClick={clearAll}>
            {dict.clearAll}
          </button>
        </div>
      )}

      <div className={styles.layout}>
        <div className={`${styles.sidebarWrap} ${mobileFiltersOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.mobileSidebarHeader}>
            <h3>{dict.filtersBtn}</h3>
            <button
              className={styles.mobileSidebarClose}
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <CloseIcon size={16} />
            </button>
          </div>

          <CatalogSidebar counts={counts} dict={dict.sidebar} />
        </div>

        {mobileFiltersOpen && (
          <div className={styles.backdrop} onClick={() => setMobileFiltersOpen(false)} />
        )}

        <div>
          <CatalogToolbar
            filteredCount={filtered.length}
            totalCount={cars.length}
            dict={dict}
          />

          {error && cars.length === 0 ? (
            <EmptyState
              icon={<AlertCircleIcon size={28} />}
              title={dict.errorTitle}
              message={dict.errorBody}
              action={{ label: dict.errorRetry, onClick: () => window.location.reload() }}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<SearchIcon size={28} />}
              title={dict.emptyTitle}
              message={dict.emptyBody}
              action={{ label: dict.emptyReset, onClick: clearAll }}
            />
          ) : (
            <div className={`${styles.grid} ${view === "grid-2" ? styles.grid2 : ""}`}>
              {filtered.map((car, i) => (
                <CatalogCard
                  key={car.id}
                  car={car}
                  index={i}
                  priceLabel={dict.priceLabel}
                  explore={dict.explore}
                  wide={view === "grid-2"}
                />
              ))}
            </div>
          )}

          <div ref={sentinelRef} className={styles.sentinel}>
            {loading && <span className={styles.loadingSpinner} />}
          </div>
        </div>
      </div>
    </main>
  );
}
