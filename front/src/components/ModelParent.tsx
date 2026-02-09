'use client';

import { useState, useEffect } from 'react';
import ModelComponent from './ModelComponent';
import styles from '@/styles/components/model-parent.module.scss';

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
}

interface ModelParentProps {
  title: string;
  annotations: readonly Annotation[];
  scrollProgress: number;
}

export default function ModelParent({ title, annotations, scrollProgress }: ModelParentProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const isVisible = scrollProgress > 0.3;
  const slideProgress = Math.min(Math.max((scrollProgress - 0.3) / 0.4, 0), 1);

  return (
    <div 
      className={`${styles.modelParent} ${isVisible ? styles.visible : ''}`}
      style={{
        transform: `translateY(${(1 - slideProgress) * 100}%)`
      }}
    >
      <div className={styles.modelContainer}>
        <div className={styles.modelWrapper}>
          <ModelComponent 
            activeAnnotation={activeAnnotation}
            onAnnotationClick={setActiveAnnotation}
            annotations={annotations}
          />
        </div>
        
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          
          <div className={styles.annotationsList}>
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`${styles.annotationItem} ${
                  activeAnnotation === annotation.id ? styles.active : ''
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
        </div>
      </div>
    </div>
  );
}