"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Tombol kembali ke atas — muncul setelah halaman digulir cukup jauh,
 * bertumpuk di atas tombol WhatsApp (kanan bawah).
 */
export default function BackToTop() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${show ? " show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.floats.backTop}
    >
      <i className="bi bi-chevron-up"></i>
    </button>
  );
}
