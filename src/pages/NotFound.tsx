import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PawPrint } from "lucide-react";
import { Seo } from "../components/seo/Seo";

const links = [
  { to: "/loja",    key: "nav.shop" },
  { to: "/servicos",key: "nav.services" },
] as const;

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title="404" description="Page not found" noIndex />
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
        <PawPrint size={56} className="mb-5 text-purple-200" />
        <h1 className="font-display text-5xl font-extrabold text-purple-950">404</h1>
        <p className="mt-3 text-sm text-purple-900/50">{t("notFound.subtitle", "Página não encontrada")}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {links.map(({ to, key }) => (
            <Link
              key={to}
              to={to}
              className="rounded-full border border-brand-200 px-5 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 hover:text-brand-900"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="mt-7 grad-brand rounded-full px-7 py-3 text-sm font-bold text-white shadow-brand transition hover:scale-105"
        >
          {t("nav.home")}
        </Link>
      </div>
    </>
  );
}
