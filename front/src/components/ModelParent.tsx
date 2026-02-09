'use client';

import { useState, forwardRef } from 'react';
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
  progress: number;
}

const ModelParent = forwardRef<HTMLDivElement, ModelParentProps>(
  ({ title, annotations, progress }, ref) => {
    const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

    return (
      <div 
        ref={ref}
        className={styles.modelParent}
        style={{
          transform: `translateY(${Math.max(0, (1 - progress) * 100)}%)`
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
);

ModelParent.displayName = 'ModelParent';

export default ModelParent;