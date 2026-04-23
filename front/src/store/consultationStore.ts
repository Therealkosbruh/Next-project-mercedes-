import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ConsultationValues } from "@/schemas/consultationSchema";

interface SubmissionRecord extends ConsultationValues {
  submittedAt: string;
}

interface ConsultationStore {
  submissions: Record<string, SubmissionRecord>;
  submit: (slug: string, data: ConsultationValues) => void;
  getSubmission: (slug: string) => SubmissionRecord | null;
}

export const useConsultationStore = create<ConsultationStore>()(
  persist(
    (set, get) => ({
      submissions: {},

      submit: (slug, data) =>
        set((s) => ({
          submissions: {
            ...s.submissions,
            [slug]: { ...data, submittedAt: new Date().toISOString() },
          },
        })),

      getSubmission: (slug) => get().submissions[slug] ?? null,
    }),
    {
      name: "consultation-submissions",
    },
  ),
);
