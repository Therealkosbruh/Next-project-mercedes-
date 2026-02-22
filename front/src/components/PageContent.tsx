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
}

interface PageContentProps {
  introMainTitle: string;
  introShortCast: string;
  modelTitle: string;
  annotations: readonly Annotation[];
}

export default function PageContent({
  introMainTitle,
  introShortCast,
  modelTitle,
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
        annotations={annotations}
        onProgressChange={setScrollProgress}
      />
    </div>
  );
}
