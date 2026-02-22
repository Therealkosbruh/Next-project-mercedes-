'use client';

import { useState, useEffect, useRef } from 'react';
import ModelParent from './ModelParent';
import styles from '@/styles/page.module.scss';

interface Annotation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly position: readonly [number, number, number];
  readonly cameraPosition?: readonly [number, number, number];
  readonly specs?: readonly string[];
}

interface ModelParentWrapperProps {
  title: string;
  annotations: readonly Annotation[];
  onProgressChange: (progress: number) => void;
}

export default function ModelParentWrapper({ title, annotations, onProgressChange }: ModelParentWrapperProps) {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const modelParentRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const lastTouchY = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      setProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.001) {
          return targetProgress;
        }
        return prev + diff * 0.15;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetProgress]);

  useEffect(() => {
    onProgressChange(progress);
  }, [progress, onProgressChange]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY;
      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;

      const speedMultiplier = Math.min(Math.abs(delta) / 50, 5);
      const step = 0.09 * speedMultiplier;

      if (targetProgress >= 1) {
        const modelElement = modelParentRef.current;
        if (modelElement) {
          const isAtTop = modelElement.scrollTop <= 0;
          const isAtBottom = modelElement.scrollTop + modelElement.clientHeight >= modelElement.scrollHeight - 1;

          if (scrollingDown && !isAtBottom) {
            modelElement.scrollTop += delta;
            return;
          }

          if (scrollingUp) {
            if (!isAtTop) {
              modelElement.scrollTop += delta;
              return;
            } else {
              const newProgress = Math.max(0, targetProgress - step);
              setTargetProgress(newProgress);
              return;
            }
          }
        }
      }

      if (targetProgress < 1) {
        if (scrollingDown) {
          const newProgress = Math.min(1, targetProgress + step);
          setTargetProgress(newProgress);
        } else if (scrollingUp && targetProgress > 0) {
          const newProgress = Math.max(0, targetProgress - step);
          setTargetProgress(newProgress);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY.current - currentY;
      lastTouchY.current = currentY;

      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;

      const step = Math.abs(deltaY) * 0.003;

      if (targetProgress >= 1) {
        const modelElement = modelParentRef.current;
        if (modelElement) {
          const isAtTop = modelElement.scrollTop <= 0;
          const isAtBottom = modelElement.scrollTop + modelElement.clientHeight >= modelElement.scrollHeight - 1;

          if (scrollingDown && !isAtBottom) {
            modelElement.scrollTop += deltaY;
            if (e.cancelable) e.preventDefault();
            return;
          }

          if (scrollingUp) {
            if (!isAtTop) {
              modelElement.scrollTop += deltaY;
              if (e.cancelable) e.preventDefault();
              return;
            } else {
              if (e.cancelable) e.preventDefault();
              const newProgress = Math.max(0, targetProgress - step);
              setTargetProgress(newProgress);
              return;
            }
          }
        }
      }

      if (targetProgress < 1) {
        if (e.cancelable) e.preventDefault();
        if (scrollingDown) {
          const newProgress = Math.min(1, targetProgress + step);
          setTargetProgress(newProgress);
        } else if (scrollingUp && targetProgress > 0) {
          const newProgress = Math.max(0, targetProgress - step);
          setTargetProgress(newProgress);
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = 0;
      lastTouchY.current = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [targetProgress]);

  const isActive = progress > 0.3;

  return (
    <div className={`${styles.modelParentWrapper} ${isActive ? styles.active : ''}`}>
      <ModelParent 
        ref={modelParentRef}
        title={title}
        annotations={annotations}
        progress={progress}
      />
    </div>
  );
}