"use client";

import styles from "@/styles/components/model-parent.module.scss";

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly specs?: readonly string[];
}

interface TextContentProps {
  heroTitle: string;
  description: string;
  moreModels: string;
  activeAnnotationData?: Annotation;
}

export default function TextContent({
  heroTitle,
  description,
  moreModels,
  activeAnnotationData,
}: TextContentProps) {
  return (
    <div className={styles.textContent}>
      <div className={styles.introBlock}>
        <div className={styles.introText}>
          <h2 className={styles.title}>{heroTitle}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <button className={styles.moreModelsBtn}>
          <img
            src="/images/icons/mercedes-benz-2.svg"
            alt=""
            className={styles.moreModelsBtnIcon}
          />
          {moreModels}
        </button>
      </div>

      {activeAnnotationData?.specs && (
        <div className={styles.mobileSpecs}>
          <p className={styles.mobileSpecsTitle} style={{ animationDelay: "0s" }}>
            {activeAnnotationData.title}
          </p>
          {activeAnnotationData.specs.map((spec, i) => (
            <p
              key={i}
              className={styles.mobileSpecsItem}
              style={{ animationDelay: `${(i + 1) * 0.08}s` }}
            >
              · {spec}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
