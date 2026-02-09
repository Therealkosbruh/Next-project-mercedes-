import 'server-only';
import type { Locale } from './config';
import en from './en';
import de from './de';

const dictionaries = {
  en: en,
  de: de,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale];
};