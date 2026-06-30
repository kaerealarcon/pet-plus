import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

export interface PromoSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  to: string;
  image: string;
}

export function PromoCarousel({ slides }: { slides: PromoSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-brand-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.42, ease: [0.32, 0, 0.67, 0] }}
          className="relative grid min-h-70 grid-cols-1 items-center sm:min-h-85 md:grid-cols-[1fr_45%]"
        >
          {/* text side */}
          <div className="relative z-10 flex flex-col gap-3.5 bg-brand-950 px-8 py-10 sm:px-12 md:py-14">
            {/* decorative blob */}
            <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-800/50 blur-2xl" />

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-accent-400">
              <Tag size={11} />
              {slide.eyebrow}
            </span>

            <h3 className="font-display text-2xl font-black text-white sm:text-3xl md:text-4xl leading-tight">
              {slide.title}
            </h3>
            <p className="max-w-sm text-sm text-brand-300">{slide.subtitle}</p>

            <Link
              to={slide.to}
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-2xl grad-accent px-6 py-3 text-sm font-black text-white shadow-accent transition hover:scale-105 active:scale-95"
            >
              {slide.cta}
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* image side */}
          <div className="relative hidden h-full md:block">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full min-h-85 w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-brand-950 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* arrows */}
      <button
        type="button"
        aria-label="Slide anterior"
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Próximo slide"
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
      >
        <ChevronRight size={18} />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-8 z-20 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-accent-400" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
