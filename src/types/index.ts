export type Locale = "pt" | "en" | "fr";

export type LocalizedText = Record<Locale, string>;

export type ProductCategory =
  | "food"
  | "toys"
  | "accessories"
  | "hygiene"
  | "medicine";

export type AnimalType = "dog" | "cat" | "other";

export type ProductSize = "small" | "medium" | "large";

export type ProductTag = "bestseller" | "new" | "sale";

export interface ProductVariation {
  label: LocalizedText;
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  price: number;
  salePrice?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  category: ProductCategory;
  animalType: AnimalType[];
  size?: ProductSize[];
  brand: string;
  weightKg?: number;
  variations?: ProductVariation[];
  tags?: ProductTag[];
  soldCount: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariation?: string;
}

export type ServiceKey = "bath" | "grooming" | "vet" | "hotel";

export interface ServiceInfo {
  key: ServiceKey;
  slug: string;
  priceFrom: number;
  images: string[];
}

export type OrderStatus = "processing" | "shipped" | "delivered";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerEmail: string;
}

export interface AuthUser {
  name: string;
  email: string;
}
