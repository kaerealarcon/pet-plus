import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Seo } from "../components/seo/Seo";
import { services } from "../data/services";
import { SERVICE_ICONS } from "../data/serviceIcons";
import { useLocale } from "../hooks/useLocale";
import { formatPrice } from "../utils/format";

export default function ServicesOverview() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <>
      <Seo title={t("services.pageTitle")} description={t("services.pageSubtitle")} />

      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-purple-950">{t("services.pageTitle")}</h1>
          <p className="mx-auto mt-3 max-w-xl text-purple-900/60">{t("services.pageSubtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.key];
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm transition hover:shadow-glow-lg"
              >
                <Link to={`/servicos/${service.slug}`} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={service.images[0]}
                      alt={t(`services.${service.key}.name`)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-glow">
                      <Icon size={20} />
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold text-purple-950">
                      {t(`services.${service.key}.name`)}
                    </h2>
                    <p className="mt-2 text-sm text-purple-900/60">{t(`services.${service.key}.short`)}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-700">
                        {t("services.priceFromLabel")} {formatPrice(service.priceFrom, locale)}
                        {service.key === "hotel" && t("services.perDay")}
                      </span>
                      <span className="text-sm font-bold text-purple-600 group-hover:text-purple-800">
                        {t("common.seeMore")} →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
