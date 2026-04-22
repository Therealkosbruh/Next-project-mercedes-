"use client";

import { useState, useEffect } from "react";
import { useCatalogStore } from "@/store/catalogStore";
import { useDebounce } from "@/hooks/useDebounce";
import SearchIcon from "@/components/icons/SearchIcon";
import styles from "@/styles/components/catalog.module.scss";

interface Props {
  placeholder: string;
}

export default function SearchBar({ placeholder }: Props) {
  const setQ = useCatalogStore((s) => s.setQ);
  const storeQ = useCatalogStore((s) => s.filters.q);

  const [inputVal, setInputVal] = useState(storeQ);
  const debounced = useDebounce(inputVal, 300);

  useEffect(() => {
    setQ(debounced);
  }, [debounced, setQ]);

  useEffect(() => {
    setInputVal(storeQ);
  }, [storeQ]);

  return (
    <div className={styles.searchInputWrap}>
      <SearchIcon size={18} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder={placeholder}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
    </div>
  );
}
