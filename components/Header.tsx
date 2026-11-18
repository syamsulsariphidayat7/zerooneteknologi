"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

// Label teks berasal dari kamus bahasa (urutan sama dengan t.nav).
const NAV_LINKS = [
  { hash: "#header", icon: "bi-house" },
  { hash: "#about", icon: "bi-info-circle" },
  { hash: "#services", icon: "bi-grid" },
  { hash: "#portfolio", icon: "bi-briefcase" },
  { hash: "#contact", icon: "bi-envelope" },
];

/**
 * Header + navigasi — model SATU HALAMAN PANJANG (ADR 0003):
 * semua section menumpuk; klik nav = scroll halus ke section tujuan,
 * link aktif mengikuti posisi scroll (scrollspy), dan header menyusut
 * jadi bar `header-top` (fixed) begitu hero terlewati — spacer setinggi
 * hero menjaga halaman tidak melompat saat header keluar dari alur.
 */
export default function Header() {
  const { lang, setLang, t } = useLang();
  const [active, setActive] = useState("#header");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [topBar, setTopBar] = useState(false);
  const [heroH, setHeroH] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const heroHRef = useRef(0);

  // Sinkron dengan atribut data-theme yang dipasang script di layout
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setTheme(t);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("zo-theme", next);
    } catch {
      // penyimpanan tidak tersedia: tema tetap berganti untuk sesi ini
    }
  }, [theme]);

  const goTo = useCallback((hash: string) => {
    setActive(hash);
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
  }, []);

  // Header menyusut jadi bar atas setelah hero terlewati
  useEffect(() => {
    const onScrollOrResize = () => {
      const header = headerRef.current;
      if (!header) return;
      if (!header.classList.contains("header-top")) {
        heroHRef.current = header.offsetHeight;
        setHeroH(header.offsetHeight);
      }
      const threshold = Math.max(0, heroHRef.current - 96);
      setTopBar(window.scrollY > threshold);
    };
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // Scrollspy: link aktif mengikuti section yang sedang di tengah layar
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

  // Buka langsung di section tujuan bila URL membawa hash
  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#header") {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setActive(window.location.hash);
        setTimeout(() => target.scrollIntoView(), 80);
      }
    }
  }, []);

  return (
    <>
      {topBar && <div aria-hidden="true" style={{ height: heroH }} />}
      <header id="header" ref={headerRef} className={topBar ? "header-top" : undefined}>
        <div className="container">
          <h1>
            <a href="index.html" onClick={(e) => { e.preventDefault(); goTo("#header"); }}>
              PT Zero One Teknologi
            </a>
          </h1>
          <h2>
            {t.hero.pre}<span>{t.hero.span}</span>{t.hero.post}
          </h2>
          <p className="hero-motto" style={{ fontStyle: "italic", marginTop: "12px", letterSpacing: "0.04em" }}>
            &ldquo;don&apos;t limit yourself&rdquo;
          </p>

          <nav id="navbar" className="navbar">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.hash}>
                  <a
                    className={`nav-link${active === link.hash ? " active" : ""}`}
                    href={link.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.hash);
                    }}
                  >
                    {t.nav[i]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={t.theme.aria}>
            <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`}></i>
            <span className="theme-toggle-label">{theme === "dark" ? t.theme.toLight : t.theme.toDark}</span>
          </button>

          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            aria-label={t.langToggle.aria}
          >
            <i className="bi bi-globe"></i>
            <span className="lang-toggle-label">{t.langToggle.label}</span>
            <span className="lang-toggle-code">{lang === "id" ? "EN" : "ID"}</span>
          </button>

          <div className="social-links">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>

        {/* Navigasi bawah khusus mobile (pengganti hamburger) */}
        <nav className="mobile-bottom-nav" aria-label="Navigasi mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.hash}
              href={link.hash}
              className={active === link.hash ? "active" : undefined}
              onClick={(e) => {
                e.preventDefault();
                goTo(link.hash);
              }}
            >
              <i className={`bi ${link.icon}`}></i>
              <span>{t.nav[i]}</span>
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
