"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { demoCustomer } from "@/data/customers";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";
import type { DemoUser } from "@/types";

type AuthContextValue = {
  user: DemoUser | null;
  loginDemo: () => void;
  login: (user: DemoUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStorage<DemoUser | null>(STORAGE_KEYS.user, null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeStorage(STORAGE_KEYS.user, user);
  }, [user, ready]);

  const loginDemo = useCallback(() => setUser(demoCustomer), []);
  const login = useCallback((next: DemoUser) => setUser(next), []);
  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, loginDemo, login, logout }), [user, loginDemo, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
