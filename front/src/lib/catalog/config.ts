import type { SortKey } from "@/lib/types";
import type en from "@/i18n/en";

type ChipLabelKey = keyof typeof en.catalog.chips;
type SortLabelKey = keyof typeof en.catalog.sort;

export interface QuickChip {
  id: string;
  labelKey: ChipLabelKey;
  cls?: "amg" | "eq";
}

export interface SortOption {
  id: SortKey;
  labelKey: SortLabelKey;
}

export const QUICK_CHIPS: QuickChip[] = [
  { id: "all", labelKey: "all" },
  { id: "AMG", labelKey: "amg", cls: "amg" },
  { id: "EQ", labelKey: "eq", cls: "eq" },
  { id: "SUV", labelKey: "suv" },
  { id: "Sedan", labelKey: "sedan" },
  { id: "Coupe", labelKey: "coupe" },
  { id: "Hatchback", labelKey: "hatchback" },
];

export const SORT_OPTIONS: SortOption[] = [
  { id: "featured", labelKey: "featured" },
  { id: "price-asc", labelKey: "priceAsc" },
  { id: "price-desc", labelKey: "priceDesc" },
  { id: "power-desc", labelKey: "powerDesc" },
  { id: "az", labelKey: "az" },
];

export const CHIP_COUNTS_MAP: Record<
  string,
  (
    cars: { isAmg: boolean; isElectric: boolean; bodyType: string | null }[],
  ) => number
> = {
  all: (cars) => cars.length,
  AMG: (cars) => cars.filter((c) => c.isAmg).length,
  EQ: (cars) => cars.filter((c) => c.isElectric).length,
  SUV: (cars) => cars.filter((c) => c.bodyType === "SUV").length,
  Sedan: (cars) => cars.filter((c) => c.bodyType === "Sedan").length,
  Coupe: (cars) => cars.filter((c) => c.bodyType === "Coupe").length,
  Hatchback: (cars) => cars.filter((c) => c.bodyType === "Hatchback").length,
};
