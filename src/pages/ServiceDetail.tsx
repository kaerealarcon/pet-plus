import { Navigate, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { getServiceBySlug, services } from "../data/services";
import { SERVICE_ICONS } from "../data/serviceIcons";
import { useLocale } from "../hooks/useLocale";
import { formatPrice } from "../utils/format";
import { buildWhatsappLink } from "../data/constants";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { locale } = useLocale();

  const service = slug ? getServiceBySlug(slug) : undefined;
  if (!service) return <Navigate to="/servicos" replace />;

  const Icon = SERVICE_ICONS[service.key];
  const otherServices = services.filter((s) => s.key !== service.key);
  const whatsappMsg = t("services.whatsappMessage", { service: t(`services.${service.key}.name`) });

  return (
    <>
      <Seo title={t(`services.${service.key}.name`)} description={t(`services.${service.key}.short`)} image={service.images[0]} />

      <section className="relative overflow-hidden bg-gradient-hero py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-purple text-white shadow-glow">
              <Icon size={22} />
            </span>
            <h1 className="font-display text-4xl font-extrabold text-purple-950">
              {t(`services.${service.key}.name`)}
            </h1>
            <p className="mt-4 max-w-md text-purple-900/70">{t(`services.${service.key}.description`)}</p>
            <p className="mt-5 font-display text-2xl font-extrabold text-purple-700">
              {t("services.priceFromLabel")} {formatPrice(service.priceFrom, locale)}
              {service.key === "hotel" && (
                <span className="text-base font-semibold text-purple-500">{t("services.perDay")}</span>
              )}
            </p>
            <a
              href={buildWhatsappLink(whatsappMsg)}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-purple px-7 py-3.5 text-sm font-bold text-white shadow-glow transition hover:scale-105"
            >
              <MessageCircle size={18} />
              {t("services.bookWhatsapp")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-square overflow-hidden rounded-[2.5rem] shadow-glow-lg ring-8 ring-white"
          >
            <img src={service.images[0]} alt={t(`services.${service.key}.name`)} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-display text-2xl font-bold text-purple-950">{t("services.gallery")}</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {service.images.map((img) => (
            <div key={img} className="aspect-video overflow-hidden rounded-3xl">
              <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-purple-50/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-purple-950">{t("services.otherServices")}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherServices.map((s) => {
              const OtherIcon = SERVICE_ICONS[s.key];
              return (
                <Link
                  key={s.key}
                  to={`/servicos/${s.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white p-4 transition hover:border-purple-300 hover:shadow-glow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <OtherIcon size={18} />
                  </span>
                  <span className="text-sm font-bold text-purple-950">{t(`services.${s.key}.name`)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
