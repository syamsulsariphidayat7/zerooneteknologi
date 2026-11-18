"use client";

import { useEffect, useState } from "react";

// Daftar navigasi situs (urutan sama dengan kamus t.nav di lib/i18n).
export const NAV_LINKS = [
  { hash: "#header", icon: "bi-house" },
  { hash: "#about", icon: "bi-info-circle" },
  { hash: "#services", icon: "bi-grid" },
  { hash: "#portfolio", icon: "bi-briefcase" },
  { hash: "#contact", icon: "bi-envelope" },
];

/** Scroll halus ke section tujuan + perbarui hash URL (tanpa lompat). */
export function goToSection(hash: string) {
  if (hash === "#header") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
  try {
    history.replaceState(null, "", hash);
  } catch {
    // abaikan: navigasi tetap berjalan tanpa mengubah URL
  }
}

/** Scrollspy: hash section yang sedang berada di tengah layar. */
export function useActiveSection() {
  const [active, setActive] = useState("#header");

  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.querySelector(l.hash)).filter(
      (el): el is Element => !!el
    );
    if (!("IntersectionObserver" in window) || targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return { active, setActive };
}
