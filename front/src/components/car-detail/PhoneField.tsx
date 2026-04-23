import { memo } from "react";
import { Controller, type Control } from "react-hook-form";
import type { ConsultationValues } from "@/schemas/consultationSchema";
import { formatPhoneNumber } from "@/lib/phoneMask";
import { phoneKeyGuard } from "@/lib/keyboardGuard";
import FormField from "./FormField";
import styles from "@/styles/components/consultation-form.module.scss";

type FieldState = "default" | "valid" | "invalid" | "empty";

interface Props {
  control: Control<ConsultationValues>;
  state: FieldState;
  label: string;
  error?: string;
}

const PhoneField = memo(function PhoneField({
  control,
  state,
  label,
  error,
}: Props) {
  return (
    <FormField state={state} label={label} error={error}>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="tel"
            className={styles.input}
            placeholder=" "
            autoComplete="tel"
            onKeyDown={phoneKeyGuard}
            onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
            onPaste={(e) => {
              e.preventDefault();
              field.onChange(
                formatPhoneNumber(e.clipboardData.getData("text")),
              );
            }}
          />
        )}
      />
    </FormField>
  );
});

export default PhoneField;
