"use client";

import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  { hash: "#header", label: "Beranda", icon: "bi-house" },
  { hash: "#about", label: "Tentang", icon: "bi-info-circle" },
  { hash: "#resume", label: "Profil", icon: "bi-person" },
  { hash: "#services", label: "Layanan", icon: "bi-grid" },
  { hash: "#portfolio", label: "Portfolio", icon: "bi-briefcase" },
  { hash: "#contact", label: "Kontak", icon: "bi-envelope" },
];

/**
 * Header + navigasi — port dari logika di assets/js/main.js asli:
 * klik nav-link menampilkan section terkait (class `section-show`),
 * header menyusut jadi `header-top`, dan hash awal saat load dihormati.
 */
export default function Header() {
  const [active, setActive] = useState("#header");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  const showSection = useCallback((hash: string) => {
    const header = document.querySelector("#header");
    const sections = document.querySelectorAll("section");
    const section = document.querySelector(hash);
    if (!header || !section) return;

    setActive(hash);

    if (hash === "#header") {
      header.classList.remove("header-top");
      sections.forEach((item) => item.classList.remove("section-show"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!header.classList.contains("header-top")) {
      header.classList.add("header-top");
      setTimeout(() => {
        sections.forEach((item) => item.classList.remove("section-show"));
        section.classList.add("section-show");
      }, 350);
    } else {
      sections.forEach((item) => item.classList.remove("section-show"));
      section.classList.add("section-show");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Activate/show sections on load with hash links (perilaku asli)
  useEffect(() => {
    if (window.location.hash) {
      const initial = document.querySelector(window.location.hash);
      if (initial && window.location.hash !== "#header") {
        showSection(window.location.hash);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header id="header">
      <div className="container">
        <h1>
          <a href="index.html" onClick={(e) => { e.preventDefault(); showSection("#header"); }}>
            PT Zero One Teknologi
          </a>
        </h1>
        <h2>
          Mitra teknologi untuk <span>software, aplikasi, dan solusi digital</span> terpadu
        </h2>
        <p className="hero-motto" style={{ fontStyle: "italic", marginTop: "12px", letterSpacing: "0.04em" }}>
          &ldquo;don&apos;t limit yourself&rdquo;
        </p>

        <nav id="navbar" className="navbar">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.hash}>
                <a
                  className={`nav-link${active === link.hash ? " active" : ""}`}
                  href={link.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    showSection(link.hash);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Ganti tema terang/gelap">
          <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`}></i>
          <span className="theme-toggle-label">{theme === "dark" ? "Mode Terang" : "Mode Gelap"}</span>
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
        {NAV_LINKS.map((link) => (
          <a
            key={link.hash}
            href={link.hash}
            className={active === link.hash ? "active" : undefined}
            onClick={(e) => {
              e.preventDefault();
              showSection(link.hash);
            }}
          >
            <i className={`bi ${link.icon}`}></i>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
