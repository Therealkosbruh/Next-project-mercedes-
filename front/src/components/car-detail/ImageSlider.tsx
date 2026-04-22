"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import MaximizeIcon from "@/components/icons/MaximizeIcon";
import FullscreenModal from "./FullscreenModal";
import SliderNav from "./SliderNav";
import styles from "@/styles/components/car-detail.module.scss";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageSlider({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const prev = useCallback(() =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)),
  [images.length]);

  const next = useCallback(() =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
  [images.length]);

  const openFullscreen  = useCallback(() => setIsFullscreen(true),  []);
  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);

  useEffect(() => {
    const KEY_HANDLERS: Record<string, (e: KeyboardEvent) => void> = {
      ArrowLeft:  (e) => { e.preventDefault(); prev(); },
      ArrowRight: (e) => { e.preventDefault(); next(); },
      Escape:     ()  => { if (isFullscreen) closeFullscreen(); },
    };

    const handler = (e: KeyboardEvent) => KEY_HANDLERS[e.key]?.(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, isFullscreen, closeFullscreen]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={styles.sliderWrap}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} — photo ${i + 1}`}
            fill
            sizes="(max-width: 1100px) 100vw, 60vw"
            priority={i === 0}
            className={`${styles.sliderImg} ${
              i === current ? styles.sliderImgVisible : styles.sliderImgHidden
            }`}
          />
        ))}

        <button
          className={styles.maximizeBtn}
          onClick={openFullscreen}
          aria-label="View fullscreen"
        >
          <MaximizeIcon size={18} />
        </button>

        <SliderNav
          count={images.length}
          current={current}
          onPrev={prev}
          onNext={next}
          onGoTo={setCurrent}
          arrowClass={styles.sliderArrow}
          arrowLeftClass={styles.arrowLeft}
          arrowRightClass={styles.arrowRight}
          dotsClass={styles.sliderDots}
          dotClass={styles.dot}
          dotActiveClass={styles.dotActive}
        />
      </div>

      {mounted && isFullscreen && (
        <FullscreenModal
          images={images}
          alt={alt}
          current={current}
          onClose={closeFullscreen}
          onPrev={prev}
          onNext={next}
          onGoTo={setCurrent}
        />
      )}
    </>
  );
}
