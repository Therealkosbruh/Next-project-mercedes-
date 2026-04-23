import "server-only";
import type { Locale } from "./config";
import { i18n } from "./config";
import en from "./en";
import de from "./de";

const dictionaries: Record<Locale, typeof en> = { en, de };

export const getDictionary = async (locale: string) => {
  const key = locale as Locale;
  return key in dictionaries
    ? dictionaries[key]
    : dictionaries[i18n.defaultLocale];
};
