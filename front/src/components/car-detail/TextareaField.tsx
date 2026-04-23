import { memo } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import FormField from "./FormField";
import styles from "@/styles/components/consultation-form.module.scss";

type FieldState = "default" | "valid" | "invalid" | "empty";

interface Props {
  registration: UseFormRegisterReturn;
  state: FieldState;
  label: string;
  error?: string;
  rows?: number;
}

const TextareaField = memo(function TextareaField({
  registration,
  state,
  label,
  error,
  rows = 4,
}: Props) {
  return (
    <FormField state={state} label={label} error={error} textarea full>
      <textarea
        {...registration}
        className={styles.textarea}
        placeholder=" "
        rows={rows}
      />
    </FormField>
  );
});

export default TextareaField;
