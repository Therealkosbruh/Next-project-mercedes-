"use client";

import { useState, useCallback, useRef } from "react";
import { fetchCarsPage } from "@/lib/api";
import type { CarListItem, CarsPage } from "@/lib/types";

interface PaginationState {
  cars: CarListItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

export function usePagination(initialData: CarsPage | null) {
  const [state, setState] = useState<PaginationState>({
    cars: initialData?.items ?? [],
    total: initialData?.total ?? 0,
    loading: false,
    error: initialData === null ? "fetch_failed" : null,
  });

  const loadingRef = useRef(false);
  const cursorRef = useRef(initialData?.nextCursor ?? null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || cursorRef.current === null) return;
    loadingRef.current = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const page = await fetchCarsPage(cursorRef.current!);
      cursorRef.current = page.nextCursor;
      setState((s) => ({
        cars: [...s.cars, ...page.items],
        total: page.total,
        loading: false,
        error: null,
      }));
    } catch {
      setState((s) => ({ ...s, loading: false, error: "fetch_failed" }));
    } finally {
      loadingRef.current = false;
    }
  }, []);

  return {
    cars: state.cars,
    total: state.total,
    hasMore: cursorRef.current !== null,
    loading: state.loading,
    error: state.error,
    loadMore,
  };
}
