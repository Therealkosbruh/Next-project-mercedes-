"use client";

import { useState, forwardRef } from "react";
import ModelComponent from "./ModelComponent";
import TextContent from "./TextContent";
import Advantages from "./Advantages";
import type { AdvantageItem } from "./AdvantageCard";
import styles from "@/styles/components/model-parent.module.scss";

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
  readonly cameraPosition?: readonly [number, number, number];
  readonly specs?: readonly string[];
}

interface ModelParentProps {
  title: string;
  heroTitle: string;
  description: string;
  moreModels: string;
  annotations: readonly Annotation[];
  advantages: readonly AdvantageItem[];
  advantagesLearnMore: string;
  progress: number;
}

const ModelParent = forwardRef<HTMLDivElement, ModelParentProps>(
  ({ title, heroTitle, description, moreModels, annotations, advantages, advantagesLearnMore, progress }, ref) => {
    const [activeAnnotation, setActiveAnnotation] = useState<string | null>(
      annotations.length > 0 ? annotations[0].id : null,
    );

    const handlePrev = () => {
      const currentIndex = annotations.findIndex(
        (a) => a.id === activeAnnotation,
      );
      const prevIndex =
        currentIndex <= 0 ? annotations.length - 1 : currentIndex - 1;
      setActiveAnnotation(annotations[prevIndex].id);
    };

    const handleNext = () => {
      const currentIndex = annotations.findIndex(
        (a) => a.id === activeAnnotation,
      );
      const nextIndex =
        currentIndex >= annotations.length - 1 ? 0 : currentIndex + 1;
      setActiveAnnotation(annotations[nextIndex].id);
    };

    const currentIndex = annotations.findIndex(
      (a) => a.id === activeAnnotation,
    );

    return (
      <div
        ref={ref}
        className={styles.modelParent}
        style={{
          transform: `translateY(${Math.max(0, (1 - progress) * 100)}%)`,
        }}
      >
        <div className={styles.modelContainer}>
          <TextContent
            heroTitle={heroTitle}
            description={description}
            moreModels={moreModels}
          />

          <div className={styles.modelWrapper}>
            <ModelComponent
              activeAnnotation={activeAnnotation}
              onAnnotationClick={setActiveAnnotation}
              annotations={annotations}
            />
            <div className={styles.modelControls}>
              <button
                className={styles.controlBtn}
                onClick={handlePrev}
                aria-label="Previous view"
              >
                &#8249;
              </button>
              <span className={styles.controlCounter}>
                {currentIndex + 1} / {annotations.length}
              </span>
              <button
                className={styles.controlBtn}
                onClick={handleNext}
                aria-label="Next view"
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>

        <Advantages items={advantages} learnMore={advantagesLearnMore} />
      </div>
    );
  },
);

ModelParent.displayName = "ModelParent";

export default ModelParent;
