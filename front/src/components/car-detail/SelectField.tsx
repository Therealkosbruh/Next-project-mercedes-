"use client";

import { memo, useState, useRef, useEffect, useCallback } from "react";
import FormField from "./FormField";
import styles from "@/styles/components/consultation-form.module.scss";

type FieldState = "default" | "valid" | "invalid" | "empty";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  state: FieldState;
  error?: string;
  placeholder: string;
  options: Option[];
}

const SelectField = memo(function SelectField({
  value,
  onChange,
  onBlur,
  state,
  error,
  placeholder,
  options,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;
  const hasValue = !!value;

  const close = useCallback(() => {
    setIsOpen(false);
    onBlur();
  }, [onBlur]);

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  const select = (val: string) => {
    onChange(val);
    setIsOpen(false);
    onBlur();
  };

  return (
    <FormField state={state} label="" error={error}>
      <div ref={containerRef} className={styles.customSelect}>
        <button
          type="button"
          className={`${styles.customSelectTrigger}${isOpen ? ` ${styles.open}` : ""}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={`${styles.customSelectLabel}${isOpen || hasValue ? ` ${styles.customSelectLabelFloated}` : ""}`}
          >
            {placeholder}
          </span>
          {hasValue && (
            <span className={styles.customSelectValue}>{selectedLabel}</span>
          )}
          <span
            className={`${styles.customSelectIcon}${isOpen ? ` ${styles.open}` : ""}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul className={styles.customSelectDropdown} role="listbox">
            {options.map((o) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                className={`${styles.customSelectOption}${o.value === value ? ` ${styles.selected}` : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(o.value);
                }}
              >
                {o.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormField>
  );
});

export default SelectField;
