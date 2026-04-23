"use client";

import { memo } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@/components/icons/CloseIcon";
import styles from "@/styles/components/consultation-form.module.scss";
import type en from "@/i18n/en";

type Dict = typeof en.carDetail.consultation;

interface Props {
  dict: Dict;
  onClose: () => void;
}

const AlreadyPopup = memo(function AlreadyPopup({ dict, onClose }: Props) {
  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.popup}>
        <button
          className={styles.popupClose}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon size={14} />
        </button>

        <div className={styles.popupIcon}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
        </div>

        <h3 className={styles.popupTitle}>{dict.alreadyTitle}</h3>
        <p className={styles.popupBody}>{dict.alreadyBody}</p>

        <button className={styles.popupBtn} onClick={onClose}>
          {dict.close}
        </button>
      </div>
    </div>,
    document.body,
  );
});

export default AlreadyPopup;
