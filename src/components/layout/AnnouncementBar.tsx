import { useTranslation } from "react-i18next";
import { Truck, Tag, Zap, PawPrint } from "lucide-react";

const ITEMS = [
  { icon: Truck, key: "freeShipping" as const },
  { icon: Tag,   label: "CUPOM PET10 → 10% OFF" },
  { icon: PawPrint, label: "Banho & Tosa agora disponível" },
  { icon: Zap,   label: "Entrega expressa em SP" },
  { icon: Truck, key: "freeShipping" as const },
  { icon: Tag,   label: "CUPOM PET10 → 10% OFF" },
  { icon: PawPrint, label: "Banho & Tosa agora disponível" },
  { icon: Zap,   label: "Entrega expressa em SP" },
];

export function AnnouncementBar() {
  const { t } = useTranslation();

  return (
    <div className="grad-dark overflow-hidden py-2.5 text-white">
      <div className="flex animate-ticker whitespace-nowrap">
        {ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-[13px] font-bold">
            <item.icon size={14} className="shrink-0 text-accent-400" />
            {"key" in item ? t(`common.${item.key}`) : item.label}
            <span className="mx-4 text-brand-400">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
