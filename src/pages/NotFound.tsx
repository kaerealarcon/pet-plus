import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PawPrint } from "lucide-react";
import { Seo } from "../components/seo/Seo";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title="404" description="Page not found" noIndex />
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
        <PawPrint size={56} className="mb-5 text-purple-200" />
        <h1 className="font-display text-5xl font-extrabold text-purple-950">404</h1>
        <p className="mt-3 text-purple-900/60">
          {t("nav.home")} · {t("nav.shop")} · {t("nav.services")}
        </p>
        <Link
          to="/"
          className="mt-7 rounded-full bg-gradient-purple px-7 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-105"
        >
          {t("nav.home")}
        </Link>
      </div>
    </>
  );
}
