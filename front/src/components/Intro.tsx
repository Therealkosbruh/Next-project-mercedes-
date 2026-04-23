import styles from "@/styles/components/intro.module.scss";

interface IntroProps {
  mainTitle: string;
  shortCast: string;
}

export default function Intro({ mainTitle, shortCast }: IntroProps) {
  return (
    <div className={styles.intro}>
      <div className={styles.logoWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/mercedes-benz-logo.svg"
          alt="Mercedes Benz Logo"
          width={200}
          height={200}
          fetchPriority="high"
          decoding="sync"
          className={styles.logo}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
        <p className={styles.shortCast}>{shortCast}</p>
      </div>
    </div>
  );
}
