import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Minus, Plus, ChevronRight, PackageCheck, PackageX } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { StarRating } from "../components/ui/StarRating";
import { ProductCard } from "../components/ui/ProductCard";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import { useLocale } from "../hooks/useLocale";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";
import { buildProductSchema } from "../utils/schema";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { locale, t: tl } = useLocale();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string | undefined>(undefined);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return <Navigate to="/loja" replace />;

  const hasDiscount = typeof product.salePrice === "number" && product.salePrice < product.price;
  const finalPrice = product.salePrice ?? product.price;
  const related = getRelatedProducts(product);
  const sampleReviews = t("product.sampleReviews", { returnObjects: true }) as {
    author: string;
    rating: number;
    text: string;
  }[];

  const handleAddToCart = () => {
    addItem(product.id, quantity, selectedVariation);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity, selectedVariation);
    navigate("/carrinho");
  };

  return (
    <>
      <Seo
        title={tl(product.name)}
        description={tl(product.shortDescription)}
        image={product.images[0]}
        schema={buildProductSchema(product, locale)}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-purple-500">
          <Link to="/loja" className="hover:text-purple-700">
            {t("product.breadcrumbShop")}
          </Link>
          <ChevronRight size={12} />
          <span className="text-purple-800">{tl(product.name)}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* GALLERY */}
          <div>
            <div className="group relative aspect-square overflow-hidden rounded-3xl bg-purple-50">
              <img
                src={product.images[activeImage]}
                alt={tl(product.name)}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-125"
              />
              {product.tags?.[0] && (
                <span className="absolute left-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold uppercase text-white">
                  {t(`shop.badges.${product.tags[0]}`)}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition ${
                      activeImage === i ? "border-purple-600" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-purple-400">{product.brand}</span>
            <h1 className="mt-1 font-display text-2xl font-extrabold text-purple-950 sm:text-3xl">
              {tl(product.name)}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} size={16} />
              <span className="text-sm text-purple-500">
                {t(product.reviewsCount === 1 ? "product.reviewsCount_one" : "product.reviewsCount_other", {
                  count: product.reviewsCount,
                })}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              {hasDiscount && (
                <span className="text-lg text-purple-400 line-through">{formatPrice(product.price, locale)}</span>
              )}
              <span className="font-display text-3xl font-extrabold text-purple-700">
                {formatPrice(finalPrice, locale)}
              </span>
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
              {product.stock > 0 ? (
                <>
                  <PackageCheck size={16} className="text-emerald-600" />
                  <span className="text-emerald-700">
                    {t(product.stock === 1 ? "product.inStock_one" : "product.inStock_other", { count: product.stock })}
                  </span>
                </>
              ) : (
                <>
                  <PackageX size={16} className="text-red-500" />
                  <span className="text-red-500">{t("product.outOfStock")}</span>
                </>
              )}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-purple-900/70">{tl(product.shortDescription)}</p>

            {product.variations?.map((variation) => (
              <div key={variation.label.pt} className="mt-6">
                <span className="mb-2 block text-sm font-bold text-purple-950">{tl(variation.label)}</span>
                <div className="flex flex-wrap gap-2">
                  {variation.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedVariation(opt)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selectedVariation === opt
                          ? "border-purple-600 bg-purple-600 text-white"
                          : "border-purple-200 text-purple-700 hover:border-purple-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-bold text-purple-950">{t("product.quantity")}</span>
              <div className="flex items-center rounded-full border border-purple-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center text-purple-700 hover:text-purple-900"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-bold text-purple-950">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="flex h-9 w-9 items-center justify-center text-purple-700 hover:text-purple-900"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-purple-600 px-6 py-3.5 text-sm font-bold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingCart size={18} />
                {justAdded ? t("product.addedToCart") : t("common.addToCart")}
              </button>
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={handleBuyNow}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-purple px-6 py-3.5 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Zap size={18} />
                {t("common.buyNow")}
              </button>
            </div>

            {/* SPECS */}
            <div className="mt-8 rounded-2xl border border-purple-100 p-5">
              <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-purple-950">
                {t("product.specs")}
              </h2>
              <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-2 border-b border-purple-50 py-1.5">
                  <dt className="text-purple-500">{t("product.specsBrand")}</dt>
                  <dd className="font-medium text-purple-900">{product.brand}</dd>
                </div>
                {product.weightKg && (
                  <div className="flex justify-between gap-2 border-b border-purple-50 py-1.5">
                    <dt className="text-purple-500">{t("product.specsWeight")}</dt>
                    <dd className="font-medium text-purple-900">{product.weightKg} kg</dd>
                  </div>
                )}
                <div className="flex justify-between gap-2 border-b border-purple-50 py-1.5">
                  <dt className="text-purple-500">{t("product.specsSku")}</dt>
                  <dd className="font-medium text-purple-900">{product.id.toUpperCase()}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-purple-500">{t("product.usageText")}</p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <section className="mt-14 max-w-3xl">
          <h2 className="mb-3 font-display text-xl font-bold text-purple-950">{t("product.description")}</h2>
          <p className="leading-relaxed text-purple-900/70">{tl(product.description)}</p>
        </section>

        {/* REVIEWS */}
        <section className="mt-14">
          <h2 className="mb-5 font-display text-xl font-bold text-purple-950">{t("product.reviews")}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {sampleReviews.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-2xl border border-purple-100 p-5"
              >
                <StarRating rating={review.rating} size={13} />
                <p className="mt-2 text-sm text-purple-900/70">{review.text}</p>
                <p className="mt-3 text-xs font-bold text-purple-500">{review.author}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 font-display text-xl font-bold text-purple-950">{t("product.related")}</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
