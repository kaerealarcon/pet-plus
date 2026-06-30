import { useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bone, Gamepad2, Droplets, ShoppingBag, PawPrint,
  Star, Truck, ShieldCheck, Headphones, ArrowRight,
  MessageCircle, Scissors,
} from "lucide-react";

/* ── Decorative paw SVGs for 3 animal types ─────────── */
type PawProps = { size?: number; className?: string; style?: CSSProperties };

function CatPaw({ size = 32, className = "", style }: PawProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" aria-hidden className={className} style={style}>
      <ellipse cx="25" cy="34" rx="13" ry="11" fill="currentColor" />
      <ellipse cx="10" cy="21" rx="6"  ry="7"  fill="currentColor" />
      <ellipse cx="22" cy="14" rx="6"  ry="7"  fill="currentColor" />
      <ellipse cx="34" cy="14" rx="6"  ry="7"  fill="currentColor" />
      <ellipse cx="43" cy="21" rx="5.5" ry="6.5" fill="currentColor" />
    </svg>
  );
}

function BirdFoot({ size = 30, className = "", style }: PawProps) {
  return (
    <svg width={size} height={Math.round(size * 1.25)} viewBox="0 0 50 62" aria-hidden className={className} style={style}>
      <g stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" fill="none">
        <line x1="25" y1="36" x2="4"  y2="9"  />
        <line x1="25" y1="36" x2="25" y2="4"  />
        <line x1="25" y1="36" x2="46" y2="9"  />
        <line x1="25" y1="36" x2="22" y2="58" />
      </g>
      <circle cx="25" cy="36" r="4" fill="currentColor" />
    </svg>
  );
}
import { Seo } from "../components/seo/Seo";
import { ProductCard } from "../components/ui/ProductCard";
import { StarRating } from "../components/ui/StarRating";
import { services } from "../data/services";
import { products } from "../data/products";
import { testimonialAvatars } from "../data/testimonials";
import { buildLocalBusinessSchema } from "../utils/schema";
import { buildWhatsappLink } from "../data/constants";
import { SERVICE_ICONS } from "../data/serviceIcons";

// dog + cat close-up together
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80&auto=format&fit=crop";

const PET_PANELS = [
  {
    cat: "dog",
    labelKey: "dog" as const,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80&auto=format&fit=crop",
    tint: "from-brand-900/80",
  },
  {
    cat: "cat",
    labelKey: "cat" as const,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&q=80&auto=format&fit=crop",
    tint: "from-brand-800/80",
  },
  {
    cat: "other",
    labelKey: "other" as const,
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=700&q=80&auto=format&fit=crop",
    tint: "from-brand-950/80",
  },
] as const;

const CATEGORY_CONFIG = [
  { key: "food",        Icon: Bone,      cls: "grad-accent",  delay: 0    },
  { key: "toys",        Icon: Gamepad2,  cls: "grad-pop",     delay: 0.08 },
  { key: "accessories", Icon: ShoppingBag, cls: "grad-brand", delay: 0.16 },
  { key: "hygiene",     Icon: Droplets,  cls: "grad-fresh",   delay: 0.24 },
] as const;

const TRUST = [
  { icon: Truck,        key: "freeShipping"   },
  { icon: ShieldCheck,  key: "about.vetRole"  },
  { icon: Star,         key: "home.hero.statPets" },
  { icon: Headphones,   key: "contact.whatsappTitle" },
] as const;

export default function Home() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const featured = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 8);
  const newProducts = products.filter((p) => p.tags?.includes("new")).slice(0, 4);

  const testimonials = t("testimonials.items", { returnObjects: true }) as {
    name: string; pet: string; text: string;
  }[];


  return (
    <>
      <Seo
        title={t("nav.home")}
        description={t("home.hero.subtitle")}
        image={HERO_IMAGE}
        schema={buildLocalBusinessSchema()}
      />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden grad-hero pb-14 pt-10 sm:pt-14 md:pb-20">
        {/* blobs */}
        <div aria-hidden className="animate-blob pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
        <div aria-hidden className="animate-blob pointer-events-none absolute -right-16 top-32 h-72 w-72 rounded-full bg-pop-400/20 blur-3xl" style={{ animationDelay: "4s" }} />
        <div aria-hidden className="animate-blob pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent-400/15 blur-3xl" style={{ animationDelay: "2s" }} />

        {/* ── decorative paws: 3 animal types — scattered all over the hero ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none">

          {/* 🐕 Dog paws (PawPrint) — 8 pcs */}
          <PawPrint size={72}  className="absolute -left-4   top-6      rotate-[18deg]   text-brand-500 opacity-[0.09] animate-float"  />
          <PawPrint size={44}  className="absolute left-8    top-[42%]  rotate-[-14deg]  text-brand-400 opacity-[0.07] animate-floatB" style={{ animationDelay: "1.2s" }} />
          <PawPrint size={56}  className="absolute left-[18%] bottom-4  rotate-[10deg]   text-brand-500 opacity-[0.08] animate-float"  style={{ animationDelay: "2.1s" }} />
          <PawPrint size={36}  className="absolute left-[42%] top-3     rotate-[45deg]   text-brand-400 opacity-[0.07] animate-floatB" style={{ animationDelay: "0.7s" }} />
          <PawPrint size={62}  className="absolute right-[38%] bottom-6  rotate-[-22deg] text-brand-400 opacity-[0.08] animate-float"  style={{ animationDelay: "1.8s" }} />
          <PawPrint size={40}  className="absolute right-8    top-[10%] rotate-[28deg]   text-brand-500 opacity-[0.07]" />
          <PawPrint size={52}  className="absolute right-2    bottom-16  rotate-[-10deg] text-brand-400 opacity-[0.08] animate-floatB" style={{ animationDelay: "0.4s" }} />
          <PawPrint size={30}  className="absolute left-[60%] top-[55%] rotate-[35deg]   text-brand-300 opacity-[0.07] animate-float"  style={{ animationDelay: "3s" }} />

          {/* 🐈 Cat paws (CatPaw) — 7 pcs */}
          <CatPaw   size={68}  className="absolute left-2    bottom-[30%] rotate-[20deg]  text-pop-500 opacity-[0.09] animate-floatB" style={{ animationDelay: "0.9s" }} />
          <CatPaw   size={46}  className="absolute left-[32%] top-5      rotate-[-25deg] text-pop-400 opacity-[0.08] animate-float"  style={{ animationDelay: "1.5s" }} />
          <CatPaw   size={58}  className="absolute right-4    top-[35%]  rotate-[12deg]   text-pop-400 opacity-[0.09] animate-floatB" style={{ animationDelay: "2s" }} />
          <CatPaw   size={38}  className="absolute left-[52%] bottom-8   rotate-[-32deg] text-pop-500 opacity-[0.08] animate-float"  style={{ animationDelay: "1.1s" }} />
          <CatPaw   size={50}  className="absolute left-[8%]  top-[18%]  rotate-[8deg]    text-pop-400 opacity-[0.07] animate-floatB" style={{ animationDelay: "2.5s" }} />
          <CatPaw   size={34}  className="absolute right-[18%] top-[68%] rotate-[-18deg] text-pop-500 opacity-[0.08]" />
          <CatPaw   size={44}  className="absolute right-[50%] top-[82%] rotate-[22deg]  text-pop-400 opacity-[0.07] animate-float"  style={{ animationDelay: "0.6s" }} />

          {/* 🐦 Bird feet (BirdFoot) — 7 pcs */}
          <BirdFoot size={42}  className="absolute left-[22%] top-10     rotate-[38deg]  text-accent-500 opacity-[0.10] animate-floatB" style={{ animationDelay: "0.4s" }} />
          <BirdFoot size={52}  className="absolute right-16   bottom-6   rotate-[-28deg] text-accent-400 opacity-[0.10] animate-float"  style={{ animationDelay: "1.5s" }} />
          <BirdFoot size={34}  className="absolute left-4     top-[65%]  rotate-[15deg]  text-accent-500 opacity-[0.09] animate-floatB" style={{ animationDelay: "2.2s" }} />
          <BirdFoot size={46}  className="absolute right-[28%] bottom-14 rotate-[-42deg] text-accent-400 opacity-[0.09] animate-float"  style={{ animationDelay: "0.8s" }} />
          <BirdFoot size={36}  className="absolute left-[70%] top-[15%]  rotate-[20deg]  text-accent-500 opacity-[0.08]" />
          <BirdFoot size={40}  className="absolute left-[12%] top-[82%]  rotate-[-15deg] text-accent-400 opacity-[0.08] animate-floatB" style={{ animationDelay: "1.7s" }} />
          <BirdFoot size={30}  className="absolute right-[42%] top-[38%] rotate-[50deg]  text-accent-500 opacity-[0.07] animate-float"  style={{ animationDelay: "2.8s" }} />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full grad-brand px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white shadow-brand"
            >
              <PawPrint size={13} />
              {t("home.hero.eyebrow")}
            </motion.span>

            <h1 className="mt-5 font-display text-4xl font-black leading-[1.1] text-brand-950 sm:text-5xl xl:text-6xl">
              {t("home.hero.title").split("roxo").length > 1 ? (
                <>
                  {t("home.hero.title").split("roxo")[0]}
                  <span className="grad-text">roxo</span>
                  {t("home.hero.title").split("roxo")[1]}
                </>
              ) : (
                <><span className="grad-text">{t("home.hero.title").split(" ").slice(0, 3).join(" ")}</span>{" "}{t("home.hero.title").split(" ").slice(3).join(" ")}</>
              )}
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-900/65">
              {t("home.hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsappLink(t("services.whatsappMessage", { service: t("services.bath.name") }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl grad-accent px-7 py-3.5 text-sm font-black text-white shadow-accent transition hover:scale-105 active:scale-95 sm:w-auto"
              >
                <MessageCircle size={18} />
                {t("home.hero.ctaBook")}
              </a>
              <Link
                to="/loja"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-white px-7 py-3.5 text-sm font-black text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 active:scale-95 sm:w-auto"
              >
                {t("home.hero.ctaShop")}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-start">
              {[
                { val: "3.200+", label: "pets atendidos" },
                { val: "8",      label: "anos de cuidado" },
                { val: "4.9★",   label: "avaliação média" },
              ].map((s) => (
                <div key={s.val} className="text-center">
                  <p className="font-display text-2xl font-black text-brand-700">{s.val}</p>
                  <p className="text-xs text-brand-900/50">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y: heroY }}
            className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none"
          >
            {/* main blob image */}
            <div className="animate-blob relative aspect-square overflow-hidden rounded-[40%_60%_55%_45%/45%_55%_40%_60%] bg-brand-100 shadow-brand-lg ring-8 ring-white">
              <img src={HERO_IMAGE} alt={t("home.hero.title")} className="h-full w-full object-cover" />
            </div>

            {/* floating vet badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 bottom-16 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-brand sm:-left-8"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl grad-fresh text-white">
                <ShieldCheck size={18} />
              </span>
              <div>
                <p className="text-xs font-black text-brand-950">Vet. responsável</p>
                <p className="text-[10px] text-brand-400">Dra. Camila Rocha</p>
              </div>
            </motion.div>

            {/* floating rating badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-3 top-12 flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 shadow-brand sm:-right-6"
            >
              <Star size={14} fill="currentColor" className="text-sunny-400" />
              <span className="text-sm font-black text-brand-950">4.9</span>
              <span className="text-[10px] text-brand-400">/ 5.0</span>
            </motion.div>

            {/* paw decoration */}
            <div aria-hidden className="animate-spin-slow absolute -bottom-6 -right-6 h-24 w-24 text-brand-100">
              <PawPrint size={96} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PET TYPE PANELS — 3 full-width rectangles
      ══════════════════════════════════════════════════ */}
      <section className="flex h-64 w-full sm:h-80">
        {PET_PANELS.map((panel, i) => (
          <motion.div
            key={panel.cat}
            className="group relative flex-1 overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link to={`/loja?animal=${panel.cat}`} className="block h-full w-full">
              {/* photo */}
              <img
                src={panel.image}
                alt={t(`shop.animalTypes.${panel.labelKey}`)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* dark gradient overlay */}
              <div className={`absolute inset-0 bg-linear-to-t ${panel.tint} via-transparent to-transparent`} />

              {/* label */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4 sm:p-5">
                <p className="font-display text-base font-black text-white text-center drop-shadow-lg sm:text-xl">
                  {t(`home.petPanels.${panel.labelKey}`)}
                </p>
              </div>

              {/* hover tint */}
              <div className="absolute inset-0 bg-brand-600/0 transition-all duration-300 group-hover:bg-brand-600/15" />
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES — moved up, right after pet panels
      ══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-2 block text-xs font-black uppercase tracking-widest text-brand-500">
              {t("services.pageTitle")}
            </span>
            <h2 className="font-display text-2xl font-black text-brand-950 sm:text-3xl">
              {t("home.services.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-brand-900/55">{t("home.services.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[service.key];
              const COLORS = ["grad-brand", "grad-pop", "grad-fresh", "grad-accent"] as const;
              const cls = COLORS[i % COLORS.length];
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-card-hover"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.images[0]}
                      alt={t(`services.${service.key}.name`)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <span className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl ${cls} text-white shadow-md`}>
                      <Icon size={18} />
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-black text-brand-950">
                      {t(`services.${service.key}.name`)}
                    </h3>
                    <p className="mt-1 text-xs text-brand-900/55">{t(`services.${service.key}.short`)}</p>
                    <a
                      href={buildWhatsappLink(t("services.whatsappMessage", { service: t(`services.${service.key}.name`) }))}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-brand-600 transition hover:text-brand-800"
                    >
                      <Scissors size={13} />
                      {t("services.bookWhatsapp")}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-black text-brand-950 sm:text-3xl">
              {t("home.categories.title")}
            </h2>
            <Link to="/loja" className="flex items-center gap-1 text-sm font-black text-brand-600 hover:text-brand-800">
              {t("common.seeAll")} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {CATEGORY_CONFIG.map(({ key, Icon, cls, delay }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={`/loja?categoria=${key}`}
                  className={`group flex flex-col items-center gap-3 rounded-3xl ${cls} px-4 py-8 text-center text-white shadow-card transition`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 transition group-hover:bg-white/30 group-hover:scale-110">
                    <Icon size={26} />
                  </span>
                  <span className="font-display text-sm font-black tracking-wide sm:text-base">
                    {t(`shop.categories.${key}`)}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURED PRODUCTS — grid
      ══════════════════════════════════════════════════ */}
      <section className="bg-brand-50/60 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="mb-1 block text-xs font-black uppercase tracking-widest text-accent-500">
                {t("shop.badges.bestseller")}
              </span>
              <h2 className="font-display text-2xl font-black text-brand-950 sm:text-3xl">
                {t("shop.sort.bestsellers")}
              </h2>
            </div>
            <Link
              to="/loja"
              className="flex items-center gap-1 text-sm font-black text-brand-600 hover:text-brand-800"
            >
              {t("common.seeAll")} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          NEW ARRIVALS
      ══════════════════════════════════════════════════ */}
      {newProducts.length > 0 && (
        <section className="bg-brand-950 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="mb-1 block text-xs font-black uppercase tracking-widest text-pop-400">
                  {t("shop.badges.new")}
                </span>
                <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
                  {t("shop.sort.newest")}
                </h2>
              </div>
              <Link to="/loja?ordenar=newest" className="flex items-center gap-1 text-sm font-black text-brand-300 hover:text-white">
                {t("common.seeAll")} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
              {newProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-brand-100 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {TRUST.map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl grad-brand text-white shadow-brand">
                <Icon size={18} />
              </span>
              <span className="text-xs font-bold text-brand-800">{t(key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section className="bg-brand-50/60 wave-top py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-black text-brand-950 sm:text-3xl">
              {t("home.testimonials.title")}
            </h2>
            <p className="mt-2 text-brand-900/55">{t("home.testimonials.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.1 }}
                className="relative flex flex-col rounded-3xl border border-brand-100 bg-white p-6 shadow-card"
              >
                {/* corner paw */}
                <PawPrint
                  size={40}
                  className="absolute right-4 top-4 text-brand-100"
                  aria-hidden
                />
                <StarRating rating={5} size={15} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brand-900/70">
                  "{item.text}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-50 pt-4">
                  <img
                    src={testimonialAvatars[i % testimonialAvatars.length]}
                    alt={item.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-200"
                  />
                  <div>
                    <p className="text-sm font-black text-brand-950">{item.name}</p>
                    <p className="text-xs text-brand-400">{item.pet}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════════ */}
      <section className="grad-dark py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <PawPrint size={36} className="mx-auto mb-4 text-brand-300 animate-float" />
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            {t("home.newsletter.title")}
          </h2>
          <p className="mt-2 text-brand-300">{t("home.newsletter.subtitle")}</p>
          {emailSent ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 font-bold text-fresh-400"
            >
              🎉 {t("contact.formSuccess")}
            </motion.p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}
              className="mx-auto mt-6 flex max-w-md gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("home.newsletter.placeholder")}
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-300 focus:border-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-2xl grad-accent px-5 py-3 text-sm font-black text-white shadow-accent transition hover:scale-105"
              >
                {t("home.newsletter.cta")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
