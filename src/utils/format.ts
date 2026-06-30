import type { Locale } from "../types";

const INTL_LOCALE: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  fr: "fr-FR",
};

export function formatPrice(value: number, locale: Locale = "pt") {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(value: string | Date, locale: Locale = "pt") {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { dateStyle: "long" }).format(date);
}
