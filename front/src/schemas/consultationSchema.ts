import { z } from "zod";

const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

export const CONSULTATION_REASONS = [
  "test_drive",
  "consultation",
  "price",
  "other",
] as const;

export type ConsultationReason = (typeof CONSULTATION_REASONS)[number];

export const consultationSchema = z
  .object({
    name: z
      .string()
      .min(2, "nameMin")
      .max(40, "nameMax")
      .regex(NAME_REGEX, "nameLetters"),
    email: z
      .string()
      .min(1, "emailRequired")
      .max(50, "emailMax")
      .regex(EMAIL_REGEX, "emailInvalid")
      .trim(),
    phone: z.string().min(1, "phoneRequired").regex(PHONE_REGEX, "phoneFormat"),
    reason: z.string().superRefine((val, ctx) => {
      if (!(CONSULTATION_REASONS as readonly string[]).includes(val)) {
        ctx.addIssue({ code: "custom", message: "reasonRequired" });
      }
    }),
    message: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.reason === "other") {
      const trimmed = data.message.trim();
      if (trimmed.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["message"],
          message: "messageRequired",
        });
      } else if (trimmed.length < 10) {
        ctx.addIssue({
          code: "custom",
          path: ["message"],
          message: "messageMin",
        });
      }
    }
  });

export type ConsultationValues = z.infer<typeof consultationSchema>;
