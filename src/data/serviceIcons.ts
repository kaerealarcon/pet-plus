import { Droplets, Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";
import type { ServiceKey } from "../types";

export const SERVICE_ICONS: Record<ServiceKey, typeof Droplets> = {
  bath: Droplets,
  grooming: Sparkles,
  vet: ShieldCheck,
  hotel: ShoppingBag,
};
