type PhoneSegment = {
  condition: (d: string) => boolean;
  value: (d: string) => string;
};

const NORMALIZE_RULES: Array<(digits: string) => string> = [
  (d) => (d.startsWith("8") ? "7" + d.slice(1) : d),
  (d) => (d.startsWith("7") ? d : "7" + d),
];

const PHONE_SEGMENTS: PhoneSegment[] = [
  { condition: () => true, value: () => "+7" },
  { condition: (d) => d.length > 0, value: (d) => ` (${d.slice(0, 3)}` },
  { condition: (d) => d.length >= 3, value: () => ")" },
  { condition: (d) => d.length > 3, value: (d) => ` ${d.slice(3, 6)}` },
  { condition: (d) => d.length > 6, value: (d) => `-${d.slice(6, 8)}` },
  { condition: (d) => d.length > 8, value: (d) => `-${d.slice(8, 10)}` },
];

function normalizeDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return NORMALIZE_RULES.reduce((d, fn) => fn(d), digits);
}

export function formatPhoneNumber(raw: string): string {
  const d = normalizeDigits(raw).slice(1, 11);
  if (!d) return "";
  return PHONE_SEGMENTS.filter(({ condition }) => condition(d))
    .map(({ value }) => value(d))
    .join("");
}

export function handlePhoneChange(
  newRaw: string,
  prevFormatted: string,
): string {
  const newDigitCount = newRaw.replace(/\D/g, "").length;
  const oldDigitCount = prevFormatted.replace(/\D/g, "").length;

  if (newDigitCount === oldDigitCount && newRaw.length < prevFormatted.length) {
    // Format character was deleted — remove the last subscriber digit instead
    const sub = prevFormatted.replace(/\D/g, "").slice(1, -1);
    return formatPhoneNumber(sub);
  }
  return formatPhoneNumber(newRaw);
}
