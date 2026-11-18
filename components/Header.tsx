"use client";

import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  { hash: "#header", label: "Beranda" },
  { hash: "#about", label: "Tentang" },
  { hash: "#resume", label: "Profil" },
  { hash: "#services", label: "Layanan" },
  { hash: "#portfolio", label: "Portfolio" },
  { hash: "#contact", label: "Kontak" },
];

/**
 * Header + navigasi — port dari logika di assets/js/main.js asli:
 * klik nav-link menampilkan section terkait (class `section-show`),
 * header menyusut jadi `header-top`, dan hash awal saat load dihormati.
 */
export default function Header() {
  const [active, setActive] = useState("#header");
  const [mobileOpen, setMobileOpen] = useState(false);

  const showSection = useCallback((hash: string) => {
    const header = document.querySelector("#header");
    const sections = document.querySelectorAll("section");
    const section = document.querySelector(hash);
    if (!header || !section) return;

    setActive(hash);
    setMobileOpen(false);

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
          Mitra teknologi untuk <span>Desa Digital</span> dan Internet Desa
        </h2>

        <nav id="navbar" className={`navbar${mobileOpen ? " navbar-mobile" : ""}`}>
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
          <i
            className={`bi mobile-nav-toggle ${mobileOpen ? "bi-x" : "bi-list"}`}
            onClick={() => setMobileOpen((v) => !v)}
          ></i>
        </nav>

        <div className="social-links">
          <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
          <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
          <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
        </div>
      </div>
    </header>
  );
}
