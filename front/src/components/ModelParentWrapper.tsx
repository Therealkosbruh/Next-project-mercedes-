'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import ModelParent from './ModelParent';
import styles from '@/styles/page.module.scss';

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
}

interface ModelParentWrapperProps {
  title: string;
  annotations: readonly Annotation[];
}

export default function ModelParentWrapper({ title, annotations }: ModelParentWrapperProps) {
  const scrollProgress = useScrollProgress();
  const isActive = scrollProgress > 0.3;

  return (
    <div className={`${styles.modelParentWrapper} ${isActive ? styles.active : ''}`}>
      <ModelParent 
        title={title}
        annotations={annotations}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}