import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown, Check } from "lucide-react";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n";

const SHORT: Record<SupportedLanguage, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
};

// Full name of each language, translated into the current UI language
const NAMES: Record<SupportedLanguage, Record<SupportedLanguage, string>> = {
  pt: { pt: "Português", en: "Inglês",    fr: "Francês"   },
  en: { pt: "Portuguese", en: "English",  fr: "French"    },
  fr: { pt: "Portugais",  en: "Anglais",  fr: "Français"  },
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (i18n.language?.split("-")[0] ?? "en") as SupportedLanguage;

  // name getter: label of `lng` shown in the `current` language
  const label = (lng: SupportedLanguage) => NAMES[current]?.[lng] ?? SHORT[lng];

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border border-brand-200 px-3 py-1.5 text-sm font-bold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
      >
        <Globe size={15} />
        {SHORT[current]}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-brand-100 bg-white py-1.5 shadow-brand"
        >
          {SUPPORTED_LANGUAGES.map((lng) => {
            const active = current === lng;
            return (
              <li key={lng}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => { i18n.changeLanguage(lng); setOpen(false); }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition hover:bg-brand-50 ${
                    active ? "font-black text-brand-700" : "font-medium text-brand-900/80"
                  }`}
                >
                  <span>{label(lng)}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-brand-400">{SHORT[lng]}</span>
                    {active && <Check size={13} className="text-brand-600" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
