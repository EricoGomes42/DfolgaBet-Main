import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import React from "react";

interface DarkModeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue | null>(null);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa lendo do localStorage (persiste entre sessões)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  // Quando isDark muda: adiciona/remove classe "dark" no <html> e salva no localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((p) => !p), []);

  return React.createElement(DarkModeContext.Provider, { value: { isDark, toggle } }, children);
};

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error("useDarkMode must be used within DarkModeProvider");
  return ctx;
};
