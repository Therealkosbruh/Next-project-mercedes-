export interface CarColor {
  name: string;
  hex: string;
}

export interface CarModelType {
  id: number;
  name: string;
}

export interface CarListItem {
  id: number;
  slug: string | null;
  modelNumber: string;
  price: number;
  shortDescription: string | null;
  preview: string | null;
  year: number | null;
  bodyType: string | null;
  fuelType: string | null;
  powerHp: number | null;
  driveType: string | null;
  transmission: string | null;
  isAmg: boolean;
  isElectric: boolean;
  seats: number | null;
  modelType: CarModelType;
  colors: CarColor[];
}

export interface CarsPage {
  items: CarListItem[];
  nextCursor: number | null;
  hasMore: boolean;
  total: number;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "power-desc" | "az";
export type ViewMode = "grid-3" | "grid-2";

export interface FilterState {
  q: string;
  body: string[];
  fuel: string[];
  trans: string[];
  drive: string[];
  seats: number[];
  powerRange: [number, number];
  amgOnly: boolean;
  eqOnly: boolean;
  quickChip: string;
}

export type StringArrayFilterKey = {
  [K in keyof FilterState]: FilterState[K] extends string[] ? K : never;
}[keyof FilterState];

export type BooleanFilterKey = {
  [K in keyof FilterState]: FilterState[K] extends boolean ? K : never;
}[keyof FilterState];
