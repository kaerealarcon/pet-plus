import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsappLink } from "../../data/constants";

export function WhatsAppFloat() {
  const { t } = useTranslation();

  return (
    <motion.a
      href={buildWhatsappLink(t("whatsappFloat.defaultMessage"))}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsappFloat.tooltip")}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-glow-lg sm:bottom-6 sm:right-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={26} fill="currentColor" className="text-white" strokeWidth={0} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1">
        {t("whatsappFloat.tooltip")}
      </span>
    </motion.a>
  );
}
