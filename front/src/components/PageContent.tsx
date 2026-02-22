"use client";

import { useState } from "react";
import Intro from "./Intro";
import ModelParentWrapper from "./ModelParentWrapper";
import styles from "@/styles/page.module.scss";

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
}

export default function PageContent({
  introMainTitle,
  introShortCast,
  modelTitle,
  modelHeroTitle,
  modelDescription,
  moreModels,
  annotations,
}: PageContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const introOpacity = Math.max(0, 1 - (scrollProgress - 0.2) / 0.5);
  const introScale = 1 - scrollProgress * 0.05;

  return (
    <div className={styles.pageWrapper}>
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
        onProgressChange={setScrollProgress}
      />
    </div>
  );
}
