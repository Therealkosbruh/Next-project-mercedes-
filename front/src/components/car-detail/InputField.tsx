import { memo } from "react";
import FormField from "./FormField";
import styles from "@/styles/components/consultation-form.module.scss";

type FieldState = "default" | "valid" | "invalid" | "empty";

export type Registration = {
  onChange: (...args: any[]) => any;
  onBlur: (...args: any[]) => any;
  ref: React.Ref<any>;
  name: string;
  value?: string;
  disabled?: boolean;
};

interface Props {
  registration: Registration;
  state: FieldState;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
}

const InputField = memo(function InputField({
  registration,
  state,
  label,
  error,
  type = "text",
  autoComplete,
  multiline,
  rows = 4,
  onChange,
  onKeyDown,
  onPaste,
}: Props) {
  return (
    <FormField
      state={state}
      label={label}
      error={error}
      textarea={multiline}
      full={multiline}
    >
      {multiline ? (
        <textarea
          {...registration}
          className={styles.textarea}
          placeholder=" "
          rows={rows}
          {...(onChange && { onChange })}
        />
      ) : (
        <input
          {...registration}
          type={type}
          className={styles.input}
          placeholder=" "
          autoComplete={autoComplete}
          {...(onChange && { onChange })}
          {...(onKeyDown && { onKeyDown })}
          {...(onPaste && { onPaste })}
        />
      )}
    </FormField>
  );
});

export default InputField;
