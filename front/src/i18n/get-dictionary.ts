import "server-only";
import type { Locale } from "./config";
import { i18n } from "./config";
import en from "./en";
import de from "./de";

const dictionaries = { en, de } as unknown as Record<Locale, typeof en>;

export const getDictionary = async (locale: string) => {
  const key = locale as Locale;
  return key in dictionaries
    ? dictionaries[key]
    : dictionaries[i18n.defaultLocale];
};
