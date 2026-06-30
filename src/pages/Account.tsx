import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LogOut, Package, User as UserIcon } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../hooks/useLocale";
import { formatDate, formatPrice } from "../utils/format";

export default function Account() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { user, login, logout, orders } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(mode === "register" ? name : email.split("@")[0], email);
  };

  if (user) {
    return (
      <>
        <Seo title={t("account.title")} description={t("account.title")} noIndex />
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-purple-100 bg-white p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-purple text-white">
                <UserIcon size={24} />
              </span>
              <div>
                <p className="text-sm text-purple-500">{t("account.welcomeBack")}</p>
                <h1 className="font-display text-xl font-bold text-purple-950">{user.name}</h1>
                <p className="text-sm text-purple-500">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border border-purple-200 px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
            >
              <LogOut size={15} /> {t("account.logout")}
            </button>
          </div>

          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-purple-950">
              <Package size={18} /> {t("account.ordersTitle")}
            </h2>
            {orders.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-purple-200 p-8 text-center text-purple-500">
                {t("account.noOrders")}
              </p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-100 bg-white p-4"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-purple-950">{order.id}</p>
                      <p className="text-xs text-purple-500">{formatDate(order.date, locale)}</p>
                    </div>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                      {t(`account.orderStatus.${order.status}`)}
                    </span>
                    <span className="font-display text-sm font-extrabold text-purple-700">
                      {formatPrice(order.total, locale)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title={t("account.title")} description={t("account.title")} noIndex />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <h1 className="text-center font-display text-3xl font-extrabold text-purple-950">
          {mode === "login" ? t("account.loginTitle") : t("account.registerTitle")}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-3xl border border-purple-100 bg-white p-7">
          {mode === "register" && (
            <FormField label={t("account.name")} value={name} onChange={setName} type="text" />
          )}
          <FormField label={t("account.email")} value={email} onChange={setEmail} type="email" />
          <FormField label={t("account.password")} value={password} onChange={setPassword} type="password" />

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-purple py-3 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
          >
            {mode === "login" ? t("account.loginCta") : t("account.registerCta")}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-5 text-center text-sm font-semibold text-purple-600 hover:text-purple-800"
        >
          {mode === "login" ? t("account.switchToRegister") : t("account.switchToLogin")}
        </button>
      </div>
    </>
  );
}

function FormField({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-purple-500">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-purple-200 px-3.5 py-2.5 text-sm text-purple-950 focus:border-purple-500 focus:outline-none"
      />
    </label>
  );
}
