"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Tema terang/gelap bersama (dipakai Header hero + TopBar).
 * Pilihan tersimpan di localStorage "zo-theme" dan diterapkan ke
 * atribut data-theme <html>; script anti-kedip di layout memasang
 * nilai awal sebelum hidrasi, provider ini menyinkronkan state-nya.
 */
type Theme = "dark" | "light";

const ThemeCtx = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setTheme(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("zo-theme", next);
      } catch {
        // penyimpanan tidak tersedia: tema tetap berganti untuk sesi ini
      }
      return next;
    });
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
