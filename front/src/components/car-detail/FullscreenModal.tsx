"use client";

import { memo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import type { FullscreenModalProps } from "@/lib/types";
import CloseIcon from "@/components/icons/CloseIcon";
import SliderNav from "./SliderNav";
import styles from "@/styles/components/car-detail.module.scss";

const FullscreenModal = memo(function FullscreenModal({
  images,
  alt,
  current,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: FullscreenModalProps) {
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? onNext() : onPrev();
    touchStartX.current = null;
  };

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.modalInner}>
        <div className={styles.modalImgWrap}>
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              sizes="min(90vw, 1200px)"
              priority={i === current}
              className={`${styles.modalImg} ${
                i === current ? styles.sliderImgVisible : styles.sliderImgHidden
              }`}
            />
          ))}
        </div>
      </div>

      <button
        className={styles.modalClose}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon size={18} />
      </button>

      <SliderNav
        count={images.length}
        current={current}
        onPrev={onPrev}
        onNext={onNext}
        onGoTo={onGoTo}
        arrowClass={styles.modalArrow}
        arrowLeftClass={styles.arrowLeft}
        arrowRightClass={styles.arrowRight}
        dotsClass={styles.modalDots}
        dotClass={styles.dot}
        dotActiveClass={styles.dotActive}
      />
    </div>,
    document.body,
  );
});

export default FullscreenModal;
