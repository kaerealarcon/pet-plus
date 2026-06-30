import type { ServiceInfo } from "../types";

export const services: ServiceInfo[] = [
  {
    key: "bath",
    slug: "banho",
    priceFrom: 45,
    images: [
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607923432780-844f54368ddb?w=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    key: "grooming",
    slug: "tosa",
    priceFrom: 60,
    images: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601758125946-6ac8e85b16f9?w=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    key: "vet",
    slug: "veterinaria",
    priceFrom: 120,
    images: [
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    key: "hotel",
    slug: "hotel-creche",
    priceFrom: 80,
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&q=80&auto=format&fit=crop",
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
