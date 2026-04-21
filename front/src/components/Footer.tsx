import Link from "next/link";
import styles from "@/styles/components/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        built by{" "}
        <Link
          href="https://github.com/Therealkosbruh"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Therealkosbruh
        </Link>
      </p>
    </footer>
  );
}
