import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Camera, Users, Music2, MapPin, Phone, Clock, PawPrint } from "lucide-react";
import { CONTACT } from "../../data/constants";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-purple-950 text-purple-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-purple text-white">
              <PawPrint size={18} />
            </span>
            <span className="font-display text-xl font-extrabold text-white">
              PET<span className="text-purple-300">+</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-purple-300">{t("footer.aboutText")}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={CONTACT.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Camera size={16} />
            </a>
            <a
              href={CONTACT.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Users size={16} />
            </a>
            <a
              href={CONTACT.social.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Music2 size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.linksTitle")}
          </h3>
          <ul className="space-y-2 text-sm text-purple-300">
            <li><Link to="/loja" className="transition hover:text-white">{t("nav.shop")}</Link></li>
            <li><Link to="/servicos" className="transition hover:text-white">{t("nav.services")}</Link></li>
            <li><Link to="/sobre" className="transition hover:text-white">{t("nav.about")}</Link></li>
            <li><Link to="/conta" className="transition hover:text-white">{t("nav.account")}</Link></li>
            <li><Link to="/faq" className="transition hover:text-white">{t("nav.faq")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.legalTitle")}
          </h3>
          <ul className="space-y-2 text-sm text-purple-300">
            <li><Link to="/politicas/troca" className="transition hover:text-white">{t("footer.policiesExchange")}</Link></li>
            <li><Link to="/politicas/privacidade" className="transition hover:text-white">{t("footer.policiesPrivacy")}</Link></li>
            <li><Link to="/politicas/termos" className="transition hover:text-white">{t("footer.policiesTerms")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white">
            {t("footer.contactTitle")}
          </h3>
          <ul className="space-y-2.5 text-sm text-purple-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-purple-400" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-purple-400" />
              <span>{CONTACT.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-purple-400" />
              <span>
                {t("contact.hours.weekdays")}
                <br />
                {t("contact.hours.saturday")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-purple-400 sm:px-6 lg:px-8">
        {t("footer.rights", { year })}
      </div>
    </footer>
  );
}
