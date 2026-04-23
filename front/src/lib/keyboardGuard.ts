type KeyPredicate = (e: React.KeyboardEvent<HTMLInputElement>) => boolean;

const ALLOWED_KEYS = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "Escape",
  "Enter",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
]);

const PHONE_ALLOW_GUARDS: KeyPredicate[] = [
  (e) => ALLOWED_KEYS.has(e.key),
  (e) => e.ctrlKey || e.metaKey,
  (e) => /^\d$/.test(e.key),
];

export function phoneKeyGuard(e: React.KeyboardEvent<HTMLInputElement>): void {
  if (!PHONE_ALLOW_GUARDS.some((guard) => guard(e))) e.preventDefault();
}
