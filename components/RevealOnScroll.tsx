"use client";

import { useEffect } from "react";

/**
 * Efek muncul per section (pengganti transisi section-show template):
 * tiap section diberi class `reveal` (tersembunyi + geser ke bawah),
 * lalu `is-visible` saat masuk viewport — sekali saja per section.
 * Class dipasang dari JS agar halaman tanpa JS tetap tampil normal.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach((s) => {
      s.classList.add("reveal");
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
