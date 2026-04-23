"use client";

import { memo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  consultationSchema,
  CONSULTATION_REASONS,
  type ConsultationValues,
} from "@/schemas/consultationSchema";
import { useConsultationStore } from "@/store/consultationStore";
import { formatPhoneNumber, handlePhoneChange } from "@/lib/phoneMask";
import { phoneKeyGuard } from "@/lib/keyboardGuard";
import { getFieldState, errMsg } from "@/lib/form-helpers";
import AlreadyPopup from "./AlreadyPopup";
import InputField, { type Registration } from "./InputField";
import SelectField from "./SelectField";
import styles from "@/styles/components/consultation-form.module.scss";
import type en from "@/i18n/en";

type Dict = typeof en.carDetail.consultation;

export const CONSULTATION_SECTION_ID = "consultation-form";

interface Props {
  slug: string;
  dict: Dict;
}

const ConsultationForm = memo(function ConsultationForm({ slug, dict }: Props) {
  const { submit, getSubmission } = useConsultationStore();
  const [showAlready, setShowAlready] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", reason: "", message: "" },
  });

  const values = watch();
  const isOther = values.reason === "other";

  const stateFor = (
    key: keyof typeof touchedFields,
    err: string | undefined,
    val: string,
  ) => getFieldState(!!touchedFields[key], err, val);

  const onSubmit = (data: ConsultationValues) => {
    if (getSubmission(slug)) {
      setShowAlready(true);
      return;
    }
    submit(slug, data);
    setSuccess(true);
  };

  const reasonOptions = CONSULTATION_REASONS.map((r) => ({
    value: r,
    label: dict.reasons[r],
  }));

  return (
    <section id={CONSULTATION_SECTION_ID} className={styles.section}>
      <p className={styles.sectionTitle}>{dict.title}</p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>{dict.title}</h2>
          <p className={styles.formSubtitle}>{dict.subtitle}</p>
        </div>

        <div className={styles.row}>
          <InputField
            registration={register("name", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\d/g, "");
              },
            })}
            state={stateFor("name", errors.name?.message, values.name)}
            label={dict.name}
            error={
              errors.name && errMsg(errors.name.message ?? "", dict.errors)
            }
            autoComplete="name"
          />

          <InputField
            registration={register("email")}
            state={stateFor("email", errors.email?.message, values.email)}
            label={dict.email}
            error={
              errors.email && errMsg(errors.email.message ?? "", dict.errors)
            }
            type="email"
            autoComplete="email"
          />
        </div>

        <div className={styles.row}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputField
                registration={field as unknown as Registration}
                type="tel"
                state={stateFor("phone", errors.phone?.message, values.phone)}
                label={dict.phone}
                error={
                  errors.phone &&
                  errMsg(errors.phone.message ?? "", dict.errors)
                }
                autoComplete="tel"
                onKeyDown={phoneKeyGuard}
                onChange={(e) =>
                  field.onChange(handlePhoneChange(e.target.value, field.value))
                }
                onPaste={(e) => {
                  e.preventDefault();
                  field.onChange(
                    formatPhoneNumber(e.clipboardData.getData("text")),
                  );
                }}
              />
            )}
          />

          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <SelectField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                state={stateFor(
                  "reason",
                  errors.reason?.message,
                  values.reason,
                )}
                error={errors.reason ? dict.errors.reasonRequired : undefined}
                placeholder={dict.selectPlaceholder}
                options={reasonOptions}
              />
            )}
          />
        </div>

        {isOther && (
          <div className={styles.row}>
            <InputField
              registration={register("message")}
              state={stateFor(
                "message",
                errors.message?.message,
                values.message ?? "",
              )}
              label={dict.message}
              error={
                errors.message &&
                errMsg(errors.message.message ?? "", dict.errors)
              }
              multiline
            />
          </div>
        )}

        <button
          type="submit"
          className={`${styles.submitBtn} ${success ? styles.success : ""}`}
          disabled={!isValid || success}
        >
          {success ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8l3.5 3.5L13 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {dict.successTitle}
            </>
          ) : (
            dict.submit
          )}
        </button>
      </form>

      {showAlready && (
        <AlreadyPopup dict={dict} onClose={() => setShowAlready(false)} />
      )}
    </section>
  );
});

export default ConsultationForm;
