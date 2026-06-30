import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import petLogo from "../../assets/logo.svg";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCart } from "../../context/CartContext";

const navItems = [
  { to: "/",         key: "home",     end: true },
  { to: "/loja",     key: "shop",     end: false },
  { to: "/servicos", key: "services", end: false },
  { to: "/sobre",    key: "about",    end: false },
  { to: "/contato",  key: "contact",  end: false },
  { to: "/faq",      key: "faq",      end: false },
] as const;

export function Header() {
  const { t } = useTranslation();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-bold transition-colors after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:transition-all
     ${isActive
       ? "text-brand-600 after:bg-brand-500"
       : "text-brand-900/70 hover:text-brand-700 after:scale-x-0 hover:after:scale-x-100 after:bg-brand-400"}`;

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        {/* LOGO */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <img src={petLogo} alt="PET+ logo" className="h-10 w-10" />
          <span className="font-display text-2xl font-black tracking-tight text-brand-800 hidden sm:block">
            PET<span className="text-accent-500">+</span>
          </span>
        </NavLink>

        {/* SEARCH */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-300" />
          <input
            type="search"
            placeholder={t("common.searchPlaceholder")}
            className="w-full rounded-xl border border-brand-100 bg-brand-50 py-2.5 pl-9 pr-4 text-sm text-brand-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
          />
        </div>

        {/* NAV — desktop */}
        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <NavLink
            to="/conta"
            aria-label={t("nav.account")}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-brand-600 transition hover:bg-brand-50"
          >
            <User size={20} />
          </NavLink>
          <NavLink
            to="/carrinho"
            aria-label={t("nav.cart")}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-brand-600 transition hover:bg-brand-50"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="animate-scalePop absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full grad-accent px-1 text-[10px] font-black text-white shadow-accent">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-600 transition hover:bg-brand-50 xl:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-brand-100 bg-white"
          >
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      isActive ? "bg-brand-50 text-brand-700" : "text-brand-900/80 hover:bg-brand-50"
                    }`
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}
              <NavLink
                to="/conta"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-brand-900/80 hover:bg-brand-50"
              >
                {t("nav.account")}
              </NavLink>
              <div className="mt-2 px-4 pb-1">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
