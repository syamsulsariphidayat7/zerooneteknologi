"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { NAV_LINKS, goToSection, useActiveSection } from "@/lib/useActiveSection";

/**
 * Bar atas ramping TERPISAH dari hero (ADR 0006, menggantikan pola
 * header yang menyusut jadi `header-top`). Hero tidak pernah berubah
 * bentuk dan tidak ada spacer, jadi kemunculan bar ini tidak
 * menggeser layout sama sekali — tidak ada lompatan.
 * Bar meluncur dengan transition transform/opacity; ia tidak punya
 * keturunan position:fixed, jadi transform aman di sini.
 */
export default function TopBar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { active, setActive } = useActiveSection();
  const [show, setShow] = useState(false);

  // Tampil begitu hero hampir terlewati; ambang diukur dari tinggi hero
  useEffect(() => {
    const onScrollOrResize = () => {
      const hero = document.getElementById("header");
      const heroH = hero ? hero.offsetHeight : window.innerHeight;
      setShow(window.scrollY > Math.max(0, heroH - 96));
    };
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const goTo = (hash: string) => {
    setActive(hash);
    goToSection(hash);
  };

  return (
    <div className={`topbar${show ? " show" : ""}`} aria-hidden={!show}>
      <button type="button" className="topbar-brand" onClick={() => goTo("#header")} tabIndex={show ? 0 : -1}>
        <Image src="/assets/img/logo-icon.png" alt="" width={30} height={30} />
        <span>PT Zero One Teknologi</span>
      </button>

      <nav className="topbar-nav" aria-label="Navigasi atas">
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li key={link.hash}>
              <a
                className={`nav-link${active === link.hash ? " active" : ""}`}
                href={link.hash}
                tabIndex={show ? 0 : -1}
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

      <div className="topbar-actions">
        <button
          type="button"
          className="topbar-btn"
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          aria-label={t.langToggle.aria}
          tabIndex={show ? 0 : -1}
        >
          <i className="bi bi-globe"></i>
          <span>{lang === "id" ? "EN" : "ID"}</span>
        </button>
        <button
          type="button"
          className="topbar-btn"
          onClick={toggleTheme}
          aria-label={t.theme.aria}
          tabIndex={show ? 0 : -1}
        >
          <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`}></i>
        </button>
      </div>
    </div>
  );
}
