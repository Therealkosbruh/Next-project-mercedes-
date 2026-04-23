"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Intro from "./Intro";
import type { AdvantageItem } from "./AdvantageCard";
import styles from "@/styles/page.module.scss";

const ModelParentWrapper = dynamic(() => import("./ModelParentWrapper"), {
  ssr: false,
  loading: () => null,
});

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
  readonly cameraPosition?: readonly [number, number, number];
  readonly specs?: readonly string[];
}

interface PageContentProps {
  introMainTitle: string;
  introShortCast: string;
  modelTitle: string;
  modelHeroTitle: string;
  modelDescription: string;
  moreModels: string;
  annotations: readonly Annotation[];
  advantages: readonly AdvantageItem[];
  advantagesLearnMore: string;
  faqTitle: string;
  faqItems: readonly { question: string; answer: string }[];
}

export default function PageContent({
  introMainTitle,
  introShortCast,
  modelTitle,
  modelHeroTitle,
  modelDescription,
  moreModels,
  annotations,
  advantages,
  advantagesLearnMore,
  faqTitle,
  faqItems,
}: PageContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const introOpacity = Math.max(0, 1 - (scrollProgress - 0.2) / 0.5);
  const introScale = 1 - scrollProgress * 0.05;

  return (
    <main className={styles.pageWrapper}>
      <div
        className={styles.section}
        style={{
          opacity: introOpacity,
          transform: `scale(${introScale})`,
          pointerEvents: scrollProgress > 0.5 ? "none" : "all",
        }}
      >
        <Intro mainTitle={introMainTitle} shortCast={introShortCast} />
      </div>

      <ModelParentWrapper
        title={modelTitle}
        heroTitle={modelHeroTitle}
        description={modelDescription}
        moreModels={moreModels}
        annotations={annotations}
        advantages={advantages}
        advantagesLearnMore={advantagesLearnMore}
        faqTitle={faqTitle}
        faqItems={faqItems}
        onProgressChange={setScrollProgress}
      />
    </main>
  );
}
