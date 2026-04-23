import type { CarListItem, SortKey } from "@/lib/types";

type Comparator = (a: CarListItem, b: CarListItem) => number;

const SORTERS: Partial<Record<SortKey, Comparator>> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "power-desc": (a, b) => (b.powerHp ?? 0) - (a.powerHp ?? 0),
  az: (a, b) => a.modelNumber.localeCompare(b.modelNumber),
};

export function applySorting(
  cars: CarListItem[],
  sort: SortKey,
): CarListItem[] {
  const comparator = SORTERS[sort];
  if (!comparator) return cars;
  return [...cars].sort(comparator);
}
