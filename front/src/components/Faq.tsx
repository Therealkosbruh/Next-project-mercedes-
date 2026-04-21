"use client";

import { useState } from "react";
import styles from "@/styles/components/faq.module.scss";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

interface FaqProps {
  title: string;
  items: readonly FaqItem[];
}

export default function Faq({ title, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      className={styles.section}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className={styles.heading}>{title}</h2>
      <dl className={styles.list}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${openIndex === i ? styles.open : ""}`}
            itemProp="mainEntity"
            itemScope
            itemType="https://schema.org/Question"
          >
            <dt>
              <button
                className={styles.questionBtn}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={styles.questionText} itemProp="name">
                  {item.question}
                </span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </dt>
            <dd
              id={`faq-answer-${i}`}
              className={styles.answerWrap}
              itemProp="acceptedAnswer"
              itemScope
              itemType="https://schema.org/Answer"
            >
              <div className={styles.answerInner}>
                <p className={styles.answerText} itemProp="text">
                  {item.answer}
                </p>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
