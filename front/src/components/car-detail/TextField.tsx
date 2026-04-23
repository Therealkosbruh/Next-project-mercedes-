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
  type?: string;
  autoComplete?: string;
}

const TextField = memo(function TextField({
  registration,
  state,
  label,
  error,
  type = "text",
  autoComplete,
}: Props) {
  return (
    <FormField state={state} label={label} error={error}>
      <input
        {...registration}
        type={type}
        className={styles.input}
        placeholder=" "
        autoComplete={autoComplete}
      />
    </FormField>
  );
});

export default TextField;
