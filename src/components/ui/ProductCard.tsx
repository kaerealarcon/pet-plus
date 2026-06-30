import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../types";
import { useLocale } from "../../hooks/useLocale";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import { StarRating } from "./StarRating";

const TAG_STYLES: Record<string, string> = {
  sale:       "grad-accent text-white",
  bestseller: "grad-brand text-white",
  new:        "grad-pop   text-white",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t } = useTranslation();
  const { locale, t: tl } = useLocale();
  const { addItem } = useCart();

  const hasDiscount = typeof product.salePrice === "number" && product.salePrice < product.price;
  const finalPrice = product.salePrice ?? product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - finalPrice / product.price) * 100)
    : 0;
  const badge = product.tags?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 10) * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      {/* ── IMAGE ─────────────────────────────────────── */}
      <Link to={`/loja/${product.slug}`} className="relative block aspect-square overflow-hidden bg-brand-50">
        <img
          src={product.images[0]}
          alt={tl(product.name)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* ribbon badge */}
        {hasDiscount && (
          <span className="ribbon">-{discountPct}%</span>
        )}

        {/* corner tag */}
        {badge && !hasDiscount && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${TAG_STYLES[badge] ?? "grad-brand text-white"}`}>
            {t(`shop.badges.${badge}`)}
          </span>
        )}

        {/* hover overlay */}
        <div className="product-card-overlay">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); addItem(product.id, 1); }}
            aria-label={t("common.addToCart")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-black text-brand-700 shadow-lg transition hover:bg-brand-600 hover:text-white"
          >
            <ShoppingCart size={16} />
            {t("common.addToCart")}
          </button>
        </div>
      </Link>

      {/* ── INFO ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
          {product.brand}
        </span>

        <Link to={`/loja/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.4em] text-[13px] font-bold leading-snug text-brand-950 transition group-hover:text-brand-600">
            {tl(product.name)}
          </h3>
        </Link>

        <StarRating rating={product.rating} size={12} showValue />

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div>
            {hasDiscount && (
              <span className="block text-[11px] text-brand-300 line-through">
                {formatPrice(product.price, locale)}
              </span>
            )}
            <span className="font-display text-base font-black text-brand-700 leading-none sm:text-lg">
              {formatPrice(finalPrice, locale)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product.id, 1); }}
            aria-label={t("common.addToCart")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl grad-brand text-white shadow-brand transition active:scale-90 sm:hover:scale-110"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
