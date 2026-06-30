import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { ProductCard } from "../components/ui/ProductCard";
import { products, brands } from "../data/products";
import type { AnimalType, ProductCategory, ProductSize } from "../types";

const CATEGORIES: ProductCategory[] = ["food", "toys", "accessories", "hygiene", "medicine"];
const ANIMALS: AnimalType[] = ["dog", "cat", "other"];
const SIZES: ProductSize[] = ["small", "medium", "large"];
const PAGE_SIZE = 8;

type SortKey = "bestsellers" | "priceAsc" | "priceDesc" | "newest";

export default function Shop() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const category = params.get("categoria") as ProductCategory | null;
  const animal = params.get("animal") as AnimalType | null;
  const size = params.get("porte") as ProductSize | null;
  const brand = params.get("marca");
  const priceMax = Number(params.get("precoMax")) || 0;
  const sort = (params.get("ordenar") as SortKey) || "bestsellers";

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setVisibleCount(PAGE_SIZE);
  };

  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map((p) => p.salePrice ?? p.price))), []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (animal && !p.animalType.includes(animal)) return false;
      if (size && !(p.size ?? []).includes(size)) return false;
      if (brand && p.brand !== brand) return false;
      if (priceMax > 0 && (p.salePrice ?? p.price) > priceMax) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
        case "priceDesc":
          return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return b.soldCount - a.soldCount;
      }
    });

    return list;
  }, [category, animal, size, brand, priceMax, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const clearFilters = () => {
    setParams({}, { replace: true });
    setVisibleCount(PAGE_SIZE);
  };

  const activeFilterCount = [category, animal, size, brand, priceMax > 0 ? "p" : null].filter(Boolean).length;

  const FiltersPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-950">
          {t("shop.filters.category")}
        </h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 text-sm text-purple-900/80">
              <input
                type="radio"
                name="categoria"
                checked={category === c}
                onChange={() => updateParam("categoria", c)}
                className="h-4 w-4 accent-purple-600"
              />
              {t(`shop.categories.${c}`)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-950">
          {t("shop.filters.animal")}
        </h3>
        <div className="flex flex-col gap-2">
          {ANIMALS.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-2 text-sm text-purple-900/80">
              <input
                type="radio"
                name="animal"
                checked={animal === a}
                onChange={() => updateParam("animal", a)}
                className="h-4 w-4 accent-purple-600"
              />
              {t(`shop.animalTypes.${a}`)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-950">{t("shop.filters.size")}</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => updateParam("porte", size === s ? null : s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                size === s
                  ? "border-purple-600 bg-purple-600 text-white"
                  : "border-purple-200 text-purple-700 hover:border-purple-400"
              }`}
            >
              {t(`shop.sizes.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-950">{t("shop.filters.brand")}</h3>
        <select
          value={brand ?? ""}
          onChange={(e) => updateParam("marca", e.target.value || null)}
          className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-sm text-purple-900 focus:border-purple-500 focus:outline-none"
        >
          <option value="">{t("common.seeAll")}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-950">{t("shop.filters.price")}</h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={10}
          value={priceMax || maxPrice}
          onChange={(e) => updateParam("precoMax", e.target.value)}
          className="w-full accent-purple-600"
        />
        <div className="mt-1 flex justify-between text-xs text-purple-500">
          <span>R$ 0</span>
          <span>R$ {priceMax || maxPrice}</span>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full rounded-full border border-purple-300 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          {t("shop.filters.clear")}
        </button>
      )}
    </div>
  );

  return (
    <>
      <Seo title={t("shop.title")} description={t("shop.subtitle")} />

      <section className="bg-gradient-hero py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold text-purple-950 sm:text-4xl">{t("shop.title")}</h1>
          <p className="mt-1 text-purple-900/60">{t("shop.subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-purple-100 bg-white p-5">
              <h2 className="mb-5 flex items-center gap-2 font-display text-base font-bold text-purple-950">
                <SlidersHorizontal size={16} /> {t("shop.filters.title")}
              </h2>
              {FiltersPanel}
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-purple-900/60">
                {t(filtered.length === 1 ? "shop.results_one" : "shop.results_other", { count: filtered.length })}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-1.5 rounded-full border border-purple-200 px-3.5 py-2 text-sm font-semibold text-purple-700 lg:hidden"
                >
                  <SlidersHorizontal size={15} />
                  {t("shop.filters.title")}
                  {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-purple-600 px-1.5 text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <select
                  value={sort}
                  onChange={(e) => updateParam("ordenar", e.target.value)}
                  className="rounded-full border border-purple-200 bg-white px-3.5 py-2 text-sm font-medium text-purple-700 focus:border-purple-500 focus:outline-none"
                  aria-label={t("shop.sort.label")}
                >
                  <option value="bestsellers">{t("shop.sort.bestsellers")}</option>
                  <option value="priceAsc">{t("shop.sort.priceAsc")}</option>
                  <option value="priceDesc">{t("shop.sort.priceDesc")}</option>
                  <option value="newest">{t("shop.sort.newest")}</option>
                </select>
              </div>
            </div>

            {visible.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-purple-200 py-20 text-center text-purple-500">
                {t("shop.empty")}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                {visible.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-full bg-gradient-purple px-8 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-105"
                >
                  {t("shop.loadMore")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-purple-950/40 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-purple-950">{t("shop.filters.title")}</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              {FiltersPanel}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full rounded-full bg-gradient-purple py-3 text-sm font-bold text-white"
              >
                {t("shop.filters.apply")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
