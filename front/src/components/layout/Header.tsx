import Link from "next/link";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";
import styles from "@/styles/components/header.module.scss";

interface Props {
  lang: string;
}

export default function Header({ lang }: Props) {
  return (
    <header className={styles.header}>
      <LocaleSwitcher lang={lang} />

      <Link href={`/${lang}`} className={styles.logoLink}>
        <Image
          src="/images/icons/140-years-38px-white.apng"
          alt="Mercedes-Benz"
          width={220}
          height={38}
          unoptimized
          priority
          style={{ width: "auto", height: 38 }}
        />
      </Link>

      <div className={styles.spacer} />
    </header>
  );
}
