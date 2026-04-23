import { memo } from "react";
import styles from "@/styles/components/consultation-form.module.scss";

type FieldState = "default" | "valid" | "invalid" | "empty";

interface Props {
  state: FieldState;
  label: string;
  error?: string;
  textarea?: boolean;
  full?: boolean;
  children: React.ReactNode;
}

const FormField = memo(function FormField({
  state,
  label,
  error,
  textarea,
  full,
  children,
}: Props) {
  const cls = [
    styles.field,
    textarea ? styles.fieldTextarea : "",
    full ? styles.full : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} data-state={state}>
      <div className={styles.inputWrap}>
        {children}
        <label className={styles.label}>{label}</label>
      </div>
      <span className={styles.error}>{error}</span>
    </div>
  );
});

export default FormField;
