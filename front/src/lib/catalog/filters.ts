import type { CarListItem, FilterState, StringArrayFilterKey, BooleanFilterKey } from "@/lib/types";
import { POWER_MIN, POWER_MAX } from "@/store/catalogStore";

type Predicate = (car: CarListItem) => boolean;

export const byQuery =
  (q: string): Predicate =>
  (car) => {
    if (!q.trim()) return true;
    const haystack = `${car.modelNumber} ${car.shortDescription ?? ""} ${car.bodyType ?? ""} ${car.fuelType ?? ""}`.toLowerCase();
    return haystack.includes(q.toLowerCase());
  };

export const byChip =
  (chip: string): Predicate =>
  (car) => {
    if (chip === "all") return true;
    if (chip === "AMG") return car.isAmg;
    if (chip === "EQ") return car.isElectric;
    return car.bodyType === chip;
  };

export const byStringArray =
  (values: string[], field: keyof Pick<CarListItem, "bodyType" | "fuelType" | "transmission" | "driveType">): Predicate =>
  (car) => {
    if (!values.length) return true;
    const val = car[field];
    return val !== null && values.includes(val);
  };

export const bySeats =
  (seats: number[]): Predicate =>
  (car) => {
    if (!seats.length) return true;
    return car.seats !== null && seats.includes(car.seats);
  };

export const byPowerRange =
  (range: [number, number]): Predicate =>
  (car) => {
    if (car.powerHp === null) return true;
    return car.powerHp >= range[0] && car.powerHp <= range[1];
  };

export const byFlag =
  (active: boolean, getter: (car: CarListItem) => boolean): Predicate =>
  (car) => {
    if (!active) return true;
    return getter(car);
  };

export function buildPredicates(filters: FilterState): Predicate[] {
  return [
    byQuery(filters.q),
    byChip(filters.quickChip),
    byStringArray(filters.body, "bodyType"),
    byStringArray(filters.fuel, "fuelType"),
    byStringArray(filters.trans, "transmission"),
    byStringArray(filters.drive, "driveType"),
    bySeats(filters.seats),
    byPowerRange(filters.powerRange),
    byFlag(filters.amgOnly, (c) => c.isAmg),
    byFlag(filters.eqOnly, (c) => c.isElectric),
  ];
}

export function applyFilters(cars: CarListItem[], filters: FilterState): CarListItem[] {
  const predicates = buildPredicates(filters);
  return cars.filter((car) => predicates.every((p) => p(car)));
}

interface AppliedChip {
  key: string;
  label: string;
  onRemove: () => void;
}

type FilterActions = {
  toggleStringFilter: (key: StringArrayFilterKey, val: string) => void;
  toggleSeat: (val: number) => void;
  setPowerRange: (range: FilterState["powerRange"]) => void;
  setFlag: (key: BooleanFilterKey, val: boolean) => void;
};

export function buildAppliedChips(filters: FilterState, actions: FilterActions): AppliedChip[] {
  const chips: AppliedChip[] = [];

  const strChipConfig: { key: StringArrayFilterKey; label: string }[] = [
    { key: "body", label: "Body" },
    { key: "fuel", label: "Fuel" },
    { key: "trans", label: "Trans" },
    { key: "drive", label: "Drive" },
  ];

  for (const { key, label } of strChipConfig) {
    for (const val of filters[key]) {
      chips.push({
        key: label,
        label: val,
        onRemove: () => actions.toggleStringFilter(key, val),
      });
    }
  }

  for (const val of filters.seats) {
    chips.push({
      key: "Seats",
      label: `${val} seats`,
      onRemove: () => actions.toggleSeat(val),
    });
  }

  if (filters.powerRange[0] !== POWER_MIN || filters.powerRange[1] !== POWER_MAX) {
    chips.push({
      key: "Power",
      label: `${filters.powerRange[0]}–${filters.powerRange[1]} HP`,
      onRemove: () => actions.setPowerRange([POWER_MIN, POWER_MAX]),
    });
  }

  if (filters.amgOnly) {
    chips.push({
      key: "Collection",
      label: "AMG only",
      onRemove: () => actions.setFlag("amgOnly", false),
    });
  }

  if (filters.eqOnly) {
    chips.push({
      key: "Collection",
      label: "Electric only",
      onRemove: () => actions.setFlag("eqOnly", false),
    });
  }

  return chips;
}

export function isFiltersActive(filters: FilterState): boolean {
  return (
    filters.q !== "" ||
    filters.quickChip !== "all" ||
    filters.body.length > 0 ||
    filters.fuel.length > 0 ||
    filters.trans.length > 0 ||
    filters.drive.length > 0 ||
    filters.seats.length > 0 ||
    filters.powerRange[0] !== POWER_MIN ||
    filters.powerRange[1] !== POWER_MAX ||
    filters.amgOnly ||
    filters.eqOnly
  );
}
