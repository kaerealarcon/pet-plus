import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { CONTACT, buildWhatsappLink } from "../data/constants";

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Seo title={t("contact.title")} description={t("contact.subtitle")} />

      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-purple-950">{t("contact.title")}</h1>
          <p className="mx-auto mt-3 max-w-xl text-purple-900/60">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-100 bg-white p-7">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 size={44} className="mb-3 text-emerald-500" />
                <p className="font-semibold text-purple-950">{t("contact.formSuccess")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-purple-500">
                    {t("contact.formName")}
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl border border-purple-200 px-3.5 py-2.5 text-sm focus:border-purple-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-purple-500">
                    {t("contact.formEmail")}
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-purple-200 px-3.5 py-2.5 text-sm focus:border-purple-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-purple-500">
                    {t("contact.formMessage")}
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full rounded-xl border border-purple-200 px-3.5 py-2.5 text-sm focus:border-purple-500 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-purple py-3 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
                >
                  <Send size={16} />
                  {t("contact.formSend")}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-purple-100">
              <iframe
                title="Google Maps"
                src={CONTACT.mapsEmbedSrc}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-3xl border border-purple-100 bg-white p-6">
              <h2 className="mb-4 font-display text-base font-bold text-purple-950">{t("contact.addressTitle")}</h2>
              <p className="flex items-start gap-2 text-sm text-purple-900/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-purple-500" />
                {CONTACT.address}
              </p>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-white p-6">
              <h2 className="mb-4 font-display text-base font-bold text-purple-950">{t("contact.hoursTitle")}</h2>
              <ul className="space-y-1.5 text-sm text-purple-900/70">
                <li className="flex items-center gap-2">
                  <Clock size={15} className="text-purple-500" /> {t("contact.hours.weekdays")}
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={15} className="text-purple-500" /> {t("contact.hours.saturday")}
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={15} className="text-purple-500" /> {t("contact.hours.sunday")}
                </li>
              </ul>
            </div>

            <a
              href={buildWhatsappLink(t("whatsappFloat.defaultMessage"))}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-3xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              {t("contact.whatsappTitle")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
