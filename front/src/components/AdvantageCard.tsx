"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "@/styles/components/advantages.module.scss";

export interface AdvantageItem {
  readonly category: string;
  readonly title: string;
  readonly href: string;
  readonly image: string;
}

interface AdvantageCardProps extends AdvantageItem {
  index: number;
  learnMore: string;
}

function findScrollParent(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node) {
    const { overflow, overflowY } = getComputedStyle(node);
    if (/auto|scroll/.test(overflow + overflowY)) return node;
    node = node.parentElement;
  }
  return null;
}

export default function AdvantageCard({
  category,
  title,
  href,
  image,
  index,
  learnMore,
}: AdvantageCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const root = findScrollParent(el);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${index * 0.12}s`;
          el.classList.add(styles.visible);
        } else {
          // Reset delay so the exit animation is instant
          el.style.transitionDelay = "0s";
          el.classList.remove(styles.visible);
        }
      },
      { root, threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const addTouched = useCallback(
    () => ref.current?.classList.add(styles.touched),
    [],
  );
  const removeTouched = useCallback(
    () => ref.current?.classList.remove(styles.touched),
    [],
  );

  return (
    <a
      ref={ref}
      href={href}
      className={styles.card}
      onTouchStart={addTouched}
      onTouchEnd={removeTouched}
      onTouchCancel={removeTouched}
    >
      <span className={styles.category}>{category}</span>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
        <div className={styles.imageOverlay}>
          <span className={styles.learnMoreBtn}>{learnMore}</span>
        </div>
      </div>
    </a>
  );
}
