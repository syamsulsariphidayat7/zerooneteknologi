"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { NAV_LINKS, goToSection, useActiveSection } from "@/lib/useActiveSection";

/**
 * Header hero + navigasi — model SATU HALAMAN PANJANG (ADR 0003):
 * semua section menumpuk; klik nav = scroll halus ke section tujuan,
 * link aktif mengikuti posisi scroll (scrollspy). Hero TIDAK pernah
 * menyusut: bar atas saat scroll adalah komponen terpisah (TopBar,
 * ADR 0006) agar kemunculannya tidak menggeser layout.
 */
export default function Header() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { active, setActive } = useActiveSection();

  const goTo = (hash: string) => {
    setActive(hash);
    goToSection(hash);
  };

  // Buka langsung di section tujuan bila URL membawa hash
  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#header") {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setActive(window.location.hash);
        setTimeout(() => target.scrollIntoView(), 80);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header id="header">
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
  );
}
