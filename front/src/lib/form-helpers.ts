import type en from "@/i18n/en";

type FieldState = "default" | "valid" | "invalid" | "empty";
type ErrorsDict = typeof en.carDetail.consultation.errors;

type StateRule = {
  state: FieldState;
  matches: (
    touched: boolean,
    error: string | undefined,
    value: string,
  ) => boolean;
};

const FIELD_STATE_RULES: StateRule[] = [
  { state: "default", matches: (touched) => !touched },
  { state: "invalid", matches: (_, error) => !!error },
  { state: "empty", matches: (_, __, value) => !value },
];

export function getFieldState(
  touched: boolean,
  error: string | undefined,
  value: string,
): FieldState {
  return (
    FIELD_STATE_RULES.find(({ matches }) => matches(touched, error, value))
      ?.state ?? "valid"
  );
}

export function errMsg(key: string, errors: ErrorsDict): string {
  return errors[key as keyof ErrorsDict] ?? key;
}
