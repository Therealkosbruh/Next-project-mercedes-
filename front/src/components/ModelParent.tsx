"use client";

import { useState, forwardRef } from "react";
import ModelComponent from "./ModelComponent";
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
  annotations: readonly Annotation[];
  progress: number;
}

const ModelParent = forwardRef<HTMLDivElement, ModelParentProps>(
  ({ title, annotations, progress }, ref) => {
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
    const activeAnnotationData = annotations.find(
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
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.annotationsList}>
              {annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className={`${styles.annotationItem} ${
                    activeAnnotation === annotation.id ? styles.active : ""
                  }`}
                  onClick={() => setActiveAnnotation(annotation.id)}
                >
                  <h3 className={styles.annotationTitle}>{annotation.title}</h3>
                  <p className={styles.annotationDescription}>
                    {annotation.description}
                  </p>
                </div>
              ))}
            </div>

            {activeAnnotationData?.specs && (
              <div className={styles.mobileSpecs}>
                <p className={styles.mobileSpecsTitle}>
                  {activeAnnotationData.title}
                </p>
                {activeAnnotationData.specs.map((spec, i) => (
                  <p key={i} className={styles.mobileSpecsItem}>
                    · {spec}
                  </p>
                ))}
              </div>
            )}
          </div>

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
      </div>
    );
  },
);

ModelParent.displayName = "ModelParent";

export default ModelParent;
