import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, Tag, Truck, CheckCircle2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { useCart } from "../context/CartContext";
import { useLocale } from "../hooks/useLocale";
import { formatPrice } from "../utils/format";
import { products } from "../data/products";

export default function Cart() {
  const { t } = useTranslation();
  const { locale, t: tl } = useLocale();
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    coupon,
    discount,
    applyCoupon,
    removeCoupon,
    shipping,
    shippingFee,
    calculateShipping,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [cepInput, setCepInput] = useState(shipping?.cep ?? "");
  const [cepError, setCepError] = useState(false);

  const lines = items
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product);

  const handleApplyCoupon = () => {
    const ok = applyCoupon(couponInput);
    setCouponError(!ok);
    setCouponSuccess(ok);
  };

  const handleCalculateShipping = () => {
    const ok = calculateShipping(cepInput);
    setCepError(!ok);
  };

  if (items.length === 0) {
    return (
      <>
        <Seo title={t("cart.title")} description={t("cart.empty")} />
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
          <ShoppingBag size={56} className="mb-4 text-purple-200" />
          <h1 className="font-display text-2xl font-bold text-purple-950">{t("cart.title")}</h1>
          <p className="mt-2 max-w-sm text-purple-900/60">{t("cart.empty")}</p>
          <Link
            to="/loja"
            className="mt-6 rounded-full bg-gradient-purple px-7 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-105"
          >
            {t("cart.emptyCta")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title={t("cart.title")} description={t("cart.title")} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold text-purple-950">{t("cart.title")}</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {lines.map(({ item, product }) => {
                if (!product) return null;
                const price = product.salePrice ?? product.price;
                return (
                  <motion.div
                    key={`${item.productId}-${item.selectedVariation ?? ""}`}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-4 rounded-3xl border border-purple-100 bg-white p-4"
                  >
                    <Link to={`/loja/${product.slug}`} className="shrink-0">
                      <img
                        src={product.images[0]}
                        alt={tl(product.name)}
                        loading="lazy"
                        className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/loja/${product.slug}`} className="font-display text-sm font-bold text-purple-950 hover:text-purple-700 sm:text-base">
                            {tl(product.name)}
                          </Link>
                          {item.selectedVariation && (
                            <p className="text-xs text-purple-500">{item.selectedVariation}</p>
                          )}
                          <p className="mt-1 text-xs text-purple-400">
                            {t("cart.unitPrice")}: {formatPrice(price, locale)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.selectedVariation)}
                          aria-label={t("cart.remove")}
                          className="text-purple-300 transition hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-purple-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariation)}
                            className="flex h-8 w-8 items-center justify-center text-purple-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center text-sm font-bold text-purple-950">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, Math.min(product.stock, item.quantity + 1), item.selectedVariation)
                            }
                            className="flex h-8 w-8 items-center justify-center text-purple-700"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-display text-base font-extrabold text-purple-700">
                          {formatPrice(price * item.quantity, locale)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <Link to="/loja" className="inline-block text-sm font-bold text-purple-600 hover:text-purple-800">
              ← {t("cart.continueShopping")}
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="h-fit rounded-3xl border border-purple-100 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-purple-950">{t("cart.summary")}</h2>

            <div className="mt-4">
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-purple-500">
                <Tag size={13} /> {t("cart.couponPlaceholder")}
              </label>
              {coupon ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 size={14} /> {coupon}
                  </span>
                  <button type="button" onClick={removeCoupon} className="text-xs underline">
                    {t("cart.remove")}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(false);
                      setCouponSuccess(false);
                    }}
                    placeholder={t("cart.couponPlaceholder")}
                    className="w-full min-w-0 rounded-xl border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="shrink-0 rounded-xl bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-200"
                  >
                    {t("cart.couponApply")}
                  </button>
                </div>
              )}
              {couponError && <p className="mt-1.5 text-xs text-red-500">{t("cart.couponInvalid")}</p>}
              {couponSuccess && <p className="mt-1.5 text-xs text-emerald-600">{t("cart.couponApplied")}</p>}
            </div>

            <div className="mt-5">
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-purple-500">
                <Truck size={13} /> {t("cart.shippingTitle")}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cepInput}
                  onChange={(e) => {
                    setCepInput(e.target.value);
                    setCepError(false);
                  }}
                  placeholder={t("cart.cepPlaceholder")}
                  className="w-full min-w-0 rounded-xl border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCalculateShipping}
                  className="shrink-0 rounded-xl bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-200"
                >
                  {t("cart.cepCalculate")}
                </button>
              </div>
              {cepError && <p className="mt-1.5 text-xs text-red-500">{t("cart.cepInvalid")}</p>}
            </div>

            <div className="mt-6 space-y-2 border-t border-purple-100 pt-4 text-sm">
              <div className="flex justify-between text-purple-700">
                <span>{t("cart.subtotal")}</span>
                <span>{formatPrice(subtotal, locale)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>{t("cart.couponApplied")}</span>
                  <span>-{formatPrice(discount, locale)}</span>
                </div>
              )}
              {shipping && (
                <div className="flex justify-between text-purple-700">
                  <span>{t("cart.shipping")}</span>
                  <span>{shippingFee === 0 ? t("cart.shippingFree") : formatPrice(shippingFee, locale)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-purple-100 pt-2 font-display text-lg font-extrabold text-purple-950">
                <span>{t("cart.total")}</span>
                <span>{formatPrice(total, locale)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-full bg-gradient-purple py-3.5 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
            >
              {t("cart.checkoutCta")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

