"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/components/text-content.module.scss";

interface TextContentProps {
  heroTitle: string;
  description: string;
  moreModels: string;
}

function findScrollParent(el: HTMLElement): HTMLElement | Window {
  let node = el.parentElement;
  while (node) {
    const { overflow, overflowY } = getComputedStyle(node);
    if (/auto|scroll/.test(overflow + overflowY)) return node;
    node = node.parentElement;
  }
  return window;
}

function FillWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wordEls = Array.from(
      el.querySelectorAll<HTMLSpanElement>(`.${styles.fillWord}`),
    );
    if (!wordEls.length) return;

    const total = wordEls.length;
    const scrollParent = findScrollParent(el);

    const update = () => {
      const containerRect = el.getBoundingClientRect();
      const isWindow = scrollParent instanceof Window;
      const viewHeight = isWindow
        ? window.innerHeight
        : (scrollParent as HTMLElement).getBoundingClientRect().height;
      const offsetTop = isWindow
        ? containerRect.top
        : containerRect.top -
          (scrollParent as HTMLElement).getBoundingClientRect().top;

      const start = viewHeight * 0.85;
      const end = viewHeight * 0.15;
      const progress = Math.max(0, Math.min(1, (start - offsetTop) / (start - end)));

      wordEls.forEach((word, i) => {
        const local = Math.max(
          0,
          Math.min(1, (progress - i / total) / (1 / total)),
        );
        word.style.backgroundPosition = `${(1 - local) * 100}% 0`;
      });
    };

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    scrollParent.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      scrollParent.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [text]);

  return (
    <p ref={ref} className={styles.description}>
      {text.trim().split(/\s+/).map((word, i) => (
        <span key={i} className={styles.fillWord}>
          {word}
        </span>
      ))}
    </p>
  );
}

export default function TextContent({
  heroTitle,
  description,
  moreModels,
}: TextContentProps) {
  return (
    <div className={styles.textContent}>
      <div className={styles.introBlock}>
        <div className={styles.introText}>
          <h2 className={styles.title}>{heroTitle}</h2>
          <FillWords text={description} />
        </div>
        <button className={styles.moreModelsBtn}>
          <Image
            src="/images/icons/mercedes-benz-2.svg"
            alt=""
            width={20}
            height={20}
            unoptimized
            className={styles.moreModelsBtnIcon}
          />
          {moreModels}
        </button>
      </div>

    </div>
  );
}
