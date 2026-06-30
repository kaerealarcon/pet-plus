import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "../types";
import { products } from "../data/products";

const STORAGE_KEY = "petplus-cart";
const COUPON_KEY = "petplus-coupon";
const SHIPPING_KEY = "petplus-shipping";

const VALID_COUPON = "PET10";
const FREE_SHIPPING_THRESHOLD = 199;
const FLAT_SHIPPING_FEE = 19.9;

interface ShippingInfo {
  cep: string;
  fee: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, selectedVariation?: string) => void;
  removeItem: (productId: string, selectedVariation?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariation?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shipping: ShippingInfo | null;
  shippingFee: number;
  calculateShipping: (cep: string) => boolean;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const sameLine = (a: CartItem, productId: string, selectedVariation?: string) =>
  a.productId === productId && a.selectedVariation === selectedVariation;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readJSON(STORAGE_KEY, []));
  const [coupon, setCoupon] = useState<string | null>(() => readJSON(COUPON_KEY, null));
  const [shipping, setShipping] = useState<ShippingInfo | null>(() => readJSON(SHIPPING_KEY, null));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (coupon) localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    else localStorage.removeItem(COUPON_KEY);
  }, [coupon]);

  useEffect(() => {
    if (shipping) localStorage.setItem(SHIPPING_KEY, JSON.stringify(shipping));
    else localStorage.removeItem(SHIPPING_KEY);
  }, [shipping]);

  const addItem: CartContextValue["addItem"] = (productId, quantity = 1, selectedVariation) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, productId, selectedVariation));
      if (existing) {
        return prev.map((i) =>
          sameLine(i, productId, selectedVariation) ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { productId, quantity, selectedVariation }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (productId, selectedVariation) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, productId, selectedVariation)));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (productId, quantity, selectedVariation) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => !sameLine(i, productId, selectedVariation));
      return prev.map((i) => (sameLine(i, productId, selectedVariation) ? { ...i, quantity } : i));
    });
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setShipping(null);
  };

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const product = products.find((p) => p.id === i.productId);
        if (!product) return sum;
        const price = product.salePrice ?? product.price;
        return sum + price * i.quantity;
      }, 0),
    [items],
  );

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === VALID_COUPON) {
      setCoupon(normalized);
      return true;
    }
    return false;
  };

  const removeCoupon = () => setCoupon(null);

  const discount = coupon === VALID_COUPON ? subtotal * 0.1 : 0;

  const calculateShipping = (cep: string) => {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return false;
    const fee = subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
    setShipping({ cep: digits, fee });
    return true;
  };

  const shippingFee = shipping?.fee ?? 0;

  const total = Math.max(0, subtotal - discount + shippingFee);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    coupon,
    discount,
    applyCoupon,
    removeCoupon,
    shipping,
    shippingFee,
    calculateShipping,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
