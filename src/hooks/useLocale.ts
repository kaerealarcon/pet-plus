import { useTranslation } from "react-i18next";
import type { Locale, LocalizedText } from "../types";

const VALID: Locale[] = ["pt", "en", "fr"];

export function useLocale() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] ?? "en";
  const locale: Locale = (VALID as string[]).includes(lang) ? (lang as Locale) : "en";

  const t = (text: LocalizedText) => text[locale];

  return { locale, t };
}
