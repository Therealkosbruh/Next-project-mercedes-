import ky from "ky";
import type { CarsPage, CarDetail } from "@/lib/types";

export type {
  CarColor,
  CarModelType,
  CarListItem,
  CarDetail,
  CarsPage,
  SortKey,
  ViewMode,
  FilterState,
} from "@/lib/types";

const api = ky.extend({
  prefix: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  hooks: {
    beforeRequest: [
      ({ request }) => {
        request.headers.set("Cache-Control", "no-store");
      },
    ],
  },
});

export async function fetchCarsPage(afterId = 0): Promise<CarsPage> {
  const searchParams = afterId > 0 ? { afterId: String(afterId) } : undefined;
  return api.get("cars", { searchParams }).json<CarsPage>();
}

export async function fetchCarBySlug(slug: string): Promise<CarDetail> {
  return api.get(`cars/${slug}`).json<CarDetail>();
}
