"use client";

import { useCatalogStore, POWER_MIN, POWER_MAX } from "@/store/catalogStore";
import { isFiltersActive } from "@/lib/catalog/filters";
import ChecklistGroup from "./ChecklistGroup";
import FilterPillGroup from "./FilterPillGroup";
import styles from "@/styles/components/catalog-sidebar.module.scss";
import type en from "@/i18n/en";

type SidebarDict = typeof en.catalog.sidebar;

interface Props {
  counts: { body: Record<string, number>; fuel: Record<string, number> };
  dict: SidebarDict;
}

export default function CatalogSidebar({ counts, dict }: Props) {
  const filters = useCatalogStore((s) => s.filters);
  const { toggleStringFilter, toggleSeat, setPowerRange, setFlag, clearAll } = useCatalogStore();

  const [lo, hi] = filters.powerRange;
  const pct = (v: number) => ((v - POWER_MIN) / (POWER_MAX - POWER_MIN)) * 100;
  const hasActiveFilters = isFiltersActive(filters);

  return (
    <aside className={styles.sidebar}>
      <ChecklistGroup
        title={dict.bodyType}
        filterKey="body"
        options={["SUV", "Sedan", "Coupe", "Hatchback"]}
        selected={filters.body}
        counts={counts.body}
        onToggle={toggleStringFilter}
      />

      <ChecklistGroup
        title={dict.fuel}
        filterKey="fuel"
        options={["Petrol", "Diesel", "Electric", "Hybrid"]}
        selected={filters.fuel}
        counts={counts.fuel}
        onToggle={toggleStringFilter}
      />

      <FilterPillGroup
        title={dict.transmission}
        options={["Automatic", "Manual"]}
        selected={filters.trans}
        onToggle={(val) => toggleStringFilter("trans", val)}
      />

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>{dict.power}</h3>
        <div className={styles.rangeWrap}>
          <div className={styles.rangeValues}>
            <div className={styles.rangeVal}>
              <span className={styles.rangeValLabel}>Min</span>
              {lo} HP
            </div>
            <div className={styles.rangeVal} style={{ textAlign: "right" }}>
              <span className={styles.rangeValLabel}>Max</span>
              {hi} HP
            </div>
          </div>
          <div className={styles.rangeTrack}>
            <div
              className={styles.rangeFill}
              style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
            />
            <div className={styles.rangeThumb} style={{ left: `${pct(lo)}%` }} />
            <div className={styles.rangeThumb} style={{ left: `${pct(hi)}%` }} />
            <input
              type="range"
              min={POWER_MIN}
              max={POWER_MAX}
              step={10}
              value={lo}
              className={styles.rangeInput}
              onChange={(e) => {
                const v = Number(e.target.value);
                setPowerRange([Math.min(v, hi - 10), hi]);
              }}
            />
            <input
              type="range"
              min={POWER_MIN}
              max={POWER_MAX}
              step={10}
              value={hi}
              className={styles.rangeInput}
              onChange={(e) => {
                const v = Number(e.target.value);
                setPowerRange([lo, Math.max(v, lo + 10)]);
              }}
            />
          </div>
        </div>
      </div>

      <FilterPillGroup
        title={dict.drive}
        options={["AWD", "RWD", "FWD"]}
        selected={filters.drive}
        onToggle={(val) => toggleStringFilter("drive", val)}
      />

      <FilterPillGroup
        title={dict.seats}
        options={[5, 6, 7]}
        selected={filters.seats}
        onToggle={toggleSeat}
      />

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>{dict.collections}</h3>
        <div
          className={`${styles.toggleRow} ${styles.toggleAmg} ${filters.amgOnly ? styles.toggleOn : ""}`}
          onClick={() => setFlag("amgOnly", !filters.amgOnly)}
        >
          <div className={styles.toggleLabel}>
            {dict.amgOnly}
            <span className={styles.toggleDesc}>{dict.amgDesc}</span>
          </div>
          <div className={styles.toggle} />
        </div>
        <div
          className={`${styles.toggleRow} ${styles.toggleEq} ${filters.eqOnly ? styles.toggleOn : ""}`}
          onClick={() => setFlag("eqOnly", !filters.eqOnly)}
        >
          <div className={styles.toggleLabel}>
            {dict.eqOnly}
            <span className={styles.toggleDesc}>{dict.eqDesc}</span>
          </div>
          <div className={styles.toggle} />
        </div>
      </div>

      <div className={styles.sidebarFooter}>
        <button
          className={styles.sidebarReset}
          onClick={clearAll}
          disabled={!hasActiveFilters}
        >
          {dict.reset}
        </button>
      </div>
    </aside>
  );
}
