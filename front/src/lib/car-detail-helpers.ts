import type { CarDetail } from "@/lib/types";
import type en from "@/i18n/en";

type SpecsDict = typeof en.carDetail.specs;

export interface SpecItem {
  label: string;
  value: string;
}

export interface BadgeInfo {
  label: string;
  variant: "amg" | "eq" | "maybach";
}

export function getBadge(car: CarDetail): BadgeInfo | null {
  if (car.modelNumber.toLowerCase().includes("maybach"))
    return { label: "Maybach", variant: "maybach" };
  if (car.isAmg) return { label: "AMG", variant: "amg" };
  if (car.isElectric) return { label: "EQ", variant: "eq" };
  return null;
}

export function getCarSpecs(
  car: CarDetail,
  dict: SpecsDict,
  electricLabel: string,
): SpecItem[] {
  const engine = car.isElectric
    ? electricLabel
    : car.engineVolume
      ? `${car.engineVolume}L`
      : "—";

  return [
    { label: dict.power, value: car.powerHp ? `${car.powerHp} HP` : "—" },
    { label: dict.engine, value: engine },
    { label: dict.transmission, value: car.transmission ?? "—" },
    { label: dict.drive, value: car.driveType ?? "—" },
    { label: dict.fuel, value: car.fuelType ?? "—" },
    { label: dict.bodyType, value: car.bodyType ?? "—" },
    { label: dict.seats, value: car.seats != null ? String(car.seats) : "—" },
    { label: dict.year, value: car.year != null ? String(car.year) : "—" },
  ];
}

export function getCarImages(car: CarDetail): string[] {
  if (car.detailImages.length > 0) return car.detailImages;
  if (car.preview) return [car.preview];
  return [];
}
