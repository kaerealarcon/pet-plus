import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser, Order } from "../types";

const USER_KEY = "petplus-user";
const ORDERS_KEY = "petplus-orders";

interface AuthContextValue {
  user: AuthUser | null;
  orders: Order[];
  login: (name: string, email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readJSON(USER_KEY, null));
  const [orders, setOrders] = useState<Order[]>(() => readJSON(ORDERS_KEY, []));

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const login = (name: string, email: string) => setUser({ name, email });
  const logout = () => setUser(null);
  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);

  return (
    <AuthContext.Provider value={{ user, orders, login, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
