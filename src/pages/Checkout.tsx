import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, QrCode, Receipt, Store, Truck, User, MapPin } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../hooks/useLocale";
import { formatPrice } from "../utils/format";
import type { Order } from "../types";

type DeliveryMethod = "ship" | "pickup";
type PaymentMethod = "pix" | "card" | "boleto";

interface FormState {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  cpf: "",
  zip: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
};

export default function Checkout() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { items, subtotal, discount, shippingFee, total, clearCart } = useCart();
  const { addOrder } = useAuth();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("ship");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [error, setError] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  if (items.length === 0 && !orderNumber) return <Navigate to="/carrinho" replace />;

  const update = (key: keyof FormState, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const goNext = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.phone || !form.cpf) {
        setError(true);
        return;
      }
    }
    if (step === 2 && deliveryMethod === "ship") {
      if (!form.zip || !form.address || !form.number || !form.neighborhood || !form.city || !form.state) {
        setError(true);
        return;
      }
    }
    setError(false);
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setError(false);
    setStep((s) => Math.max(1, s - 1));
  };

  const placeOrder = () => {
    const number = `PET${Date.now().toString().slice(-8)}`;
    const order: Order = {
      id: number,
      date: new Date().toISOString(),
      items,
      total,
      status: "processing",
      customerEmail: form.email,
    };
    addOrder(order);
    clearCart();
    setOrderNumber(number);
  };

  if (orderNumber) {
    return (
      <>
        <Seo title={t("checkout.successTitle")} description={t("checkout.successMessage")} noIndex />
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h1 className="font-display text-3xl font-extrabold text-purple-950">{t("checkout.successTitle")}</h1>
          <p className="mt-3 text-purple-900/70">{t("checkout.successMessage")}</p>
          <div className="mt-6 rounded-2xl bg-purple-50 px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-wide text-purple-500">
              {t("checkout.orderNumber")}
            </span>
            <p className="font-display text-xl font-extrabold text-purple-700">{orderNumber}</p>
          </div>
          <Link
            to="/loja"
            className="mt-8 rounded-full bg-gradient-purple px-7 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-105"
          >
            {t("checkout.backToHome")}
          </Link>
        </div>
      </>
    );
  }

  const steps = [
    { n: 1, label: t("checkout.step1"), icon: User },
    { n: 2, label: t("checkout.step2"), icon: MapPin },
    { n: 3, label: t("checkout.step3"), icon: CreditCard },
  ];

  return (
    <>
      <Seo title={t("checkout.title")} description={t("checkout.title")} noIndex />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold text-purple-950">{t("checkout.title")}</h1>

        <div className="mt-8 flex items-center gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                    step >= s.n ? "bg-gradient-purple text-white" : "bg-purple-100 text-purple-400"
                  }`}
                >
                  {step > s.n ? <CheckCircle2 size={18} /> : s.n}
                </span>
                <span className={`hidden text-sm font-semibold sm:block ${step >= s.n ? "text-purple-900" : "text-purple-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span className={`h-0.5 flex-1 rounded-full ${step > s.n ? "bg-purple-600" : "bg-purple-100"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl border border-purple-100 bg-white p-6 sm:p-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <Field label={t("checkout.name")} value={form.name} onChange={(v) => update("name", v)} />
                <Field label={t("checkout.email")} type="email" value={form.email} onChange={(v) => update("email", v)} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={t("checkout.phone")} value={form.phone} onChange={(v) => update("phone", v)} />
                  <Field label={t("checkout.cpf")} value={form.cpf} onChange={(v) => update("cpf", v)} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("ship")}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                      deliveryMethod === "ship" ? "border-purple-600 bg-purple-50" : "border-purple-100"
                    }`}
                  >
                    <Truck size={20} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-950">{t("checkout.deliveryShip")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                      deliveryMethod === "pickup" ? "border-purple-600 bg-purple-50" : "border-purple-100"
                    }`}
                  >
                    <Store size={20} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-950">{t("checkout.deliveryPickup")}</span>
                  </button>
                </div>

                {deliveryMethod === "ship" && (
                  <div className="space-y-4">
                    <Field label={t("checkout.zip")} value={form.zip} onChange={(v) => update("zip", v)} />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
                      <Field label={t("checkout.address")} value={form.address} onChange={(v) => update("address", v)} />
                      <Field label={t("checkout.number")} value={form.number} onChange={(v) => update("number", v)} />
                    </div>
                    <Field label={t("checkout.complement")} value={form.complement} onChange={(v) => update("complement", v)} required={false} />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Field label={t("checkout.neighborhood")} value={form.neighborhood} onChange={(v) => update("neighborhood", v)} />
                      <Field label={t("checkout.city")} value={form.city} onChange={(v) => update("city", v)} />
                      <Field label={t("checkout.state")} value={form.state} onChange={(v) => update("state", v)} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                {[
                  { key: "pix" as const, icon: QrCode, label: t("checkout.paymentPix"), desc: t("checkout.paymentPixDesc") },
                  { key: "card" as const, icon: CreditCard, label: t("checkout.paymentCard"), desc: t("checkout.paymentCardDesc") },
                  { key: "boleto" as const, icon: Receipt, label: t("checkout.paymentBoleto"), desc: t("checkout.paymentBoletoDesc") },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setPaymentMethod(opt.key)}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                      paymentMethod === opt.key ? "border-purple-600 bg-purple-50" : "border-purple-100"
                    }`}
                  >
                    <opt.icon size={20} className="shrink-0 text-purple-600" />
                    <span>
                      <span className="block text-sm font-semibold text-purple-950">{opt.label}</span>
                      <span className="block text-xs text-purple-500">{opt.desc}</span>
                    </span>
                  </button>
                ))}
              </motion.div>
            )}

            {error && <p className="mt-4 text-sm font-medium text-red-500">{t("checkout.required")}</p>}

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button type="button" onClick={goBack} className="rounded-full border border-purple-200 px-6 py-2.5 text-sm font-bold text-purple-700">
                  {t("checkout.back")}
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-gradient-purple px-7 py-2.5 text-sm font-bold text-white shadow-glow transition hover:scale-105"
                >
                  {t("checkout.next")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={placeOrder}
                  className="rounded-full bg-gradient-purple px-7 py-2.5 text-sm font-bold text-white shadow-glow transition hover:scale-105"
                >
                  {t("checkout.placeOrder")}
                </button>
              )}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="h-fit rounded-3xl border border-purple-100 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-purple-950">{t("checkout.orderSummary")}</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-purple-700">
                <span>{t("checkout.subtotal")}</span>
                <span>{formatPrice(subtotal, locale)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>{t("cart.couponApplied")}</span>
                  <span>-{formatPrice(discount, locale)}</span>
                </div>
              )}
              <div className="flex justify-between text-purple-700">
                <span>{t("checkout.shipping")}</span>
                <span>{shippingFee === 0 ? t("cart.shippingFree") : formatPrice(shippingFee, locale)}</span>
              </div>
              <div className="flex justify-between border-t border-purple-100 pt-2 font-display text-lg font-extrabold text-purple-950">
                <span>{t("checkout.total")}</span>
                <span>{formatPrice(total, locale)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-purple-500">
        {label}
        {required && <span className="text-purple-300"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-purple-200 px-3.5 py-2.5 text-sm text-purple-950 focus:border-purple-500 focus:outline-none"
      />
    </label>
  );
}
