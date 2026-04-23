"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n/config";
import styles from "@/styles/components/header.module.scss";

interface Props {
  lang: string;
}

export default function LocaleSwitcher({ lang }: Props) {
  const pathname = usePathname();

  const getLocalePath = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return (
    <nav className={styles.localeSwitcher}>
      {i18n.locales.map((locale, i) => (
        <span key={locale} className={styles.localeItem}>
          <Link
            href={getLocalePath(locale)}
            className={`${styles.localeLink}${lang === locale ? ` ${styles.active}` : ""}`}
          >
            {locale.toUpperCase()}
          </Link>
          {i < i18n.locales.length - 1 && (
            <span className={styles.localeDivider}>/</span>
          )}
        </span>
      ))}
    </nav>
  );
}
