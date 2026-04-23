import { create } from "zustand";
import type {
  FilterState,
  SortKey,
  ViewMode,
  StringArrayFilterKey,
  BooleanFilterKey,
} from "@/lib/types";

const POWER_MIN = 0;
const POWER_MAX = 900;

const DEFAULT_FILTERS: FilterState = {
  q: "",
  body: [],
  fuel: [],
  trans: [],
  drive: [],
  seats: [],
  powerRange: [POWER_MIN, POWER_MAX],
  amgOnly: false,
  eqOnly: false,
  quickChip: "all",
};

interface CatalogStore {
  filters: FilterState;
  sort: SortKey;
  view: ViewMode;
  sortOpen: boolean;
  mobileFiltersOpen: boolean;

  setQ: (q: string) => void;
  setQuickChip: (id: string) => void;
  toggleStringFilter: (key: StringArrayFilterKey, val: string) => void;
  toggleSeat: (val: number) => void;
  setPowerRange: (range: FilterState["powerRange"]) => void;
  setFlag: (key: BooleanFilterKey, val: boolean) => void;
  setSort: (sort: SortKey) => void;
  setView: (view: ViewMode) => void;
  setSortOpen: (open: boolean) => void;
  setMobileFiltersOpen: (open: boolean) => void;
  clearAll: () => void;
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  filters: DEFAULT_FILTERS,
  sort: "featured",
  view: "grid-3",
  sortOpen: false,
  mobileFiltersOpen: false,

  setQ: (q) => set((s) => ({ filters: { ...s.filters, q } })),
  setQuickChip: (id) =>
    set((s) => ({
      filters: {
        ...s.filters,
        quickChip: id === s.filters.quickChip ? "all" : id,
      },
    })),
  toggleStringFilter: (key, val) =>
    set((s) => ({
      filters: { ...s.filters, [key]: toggle(s.filters[key] as string[], val) },
    })),
  toggleSeat: (val) =>
    set((s) => ({
      filters: { ...s.filters, seats: toggle(s.filters.seats, val) },
    })),
  setPowerRange: (range) =>
    set((s) => ({ filters: { ...s.filters, powerRange: range } })),
  setFlag: (key, val) =>
    set((s) => ({ filters: { ...s.filters, [key]: val } })),
  setSort: (sort) => set({ sort }),
  setView: (view) => set({ view }),
  setSortOpen: (sortOpen) => set({ sortOpen }),
  setMobileFiltersOpen: (mobileFiltersOpen) => set({ mobileFiltersOpen }),
  clearAll: () => set({ filters: DEFAULT_FILTERS }),
}));

export { POWER_MIN, POWER_MAX, DEFAULT_FILTERS };
