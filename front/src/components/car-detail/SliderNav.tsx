"use client";

import { memo } from "react";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

interface Props {
  count: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  arrowClass: string;
  arrowLeftClass: string;
  arrowRightClass: string;
  dotsClass: string;
  dotClass: string;
  dotActiveClass: string;
}

const SliderNav = memo(function SliderNav({
  count,
  current,
  onPrev,
  onNext,
  onGoTo,
  arrowClass,
  arrowLeftClass,
  arrowRightClass,
  dotsClass,
  dotClass,
  dotActiveClass,
}: Props) {
  if (count <= 1) return null;

  return (
    <>
      <div className={dotsClass}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            className={`${dotClass} ${i === current ? dotActiveClass : ""}`}
            onClick={() => onGoTo(i)}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>

      <button
        className={`${arrowClass} ${arrowLeftClass}`}
        onClick={onPrev}
        aria-label="Previous"
      >
        <ArrowLeftIcon size={16} />
      </button>

      <button
        className={`${arrowClass} ${arrowRightClass}`}
        onClick={onNext}
        aria-label="Next"
      >
        <ArrowRightIcon size={16} />
      </button>
    </>
  );
});

export default SliderNav;
