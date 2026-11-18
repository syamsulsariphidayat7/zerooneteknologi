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

    // Sentuhan animasi: kartu-kartu di dalam section muncul berjenjang.
    const items = document.querySelectorAll<HTMLElement>(
      "section .icon-box, section .count-box, section .portfolio-item, section .info-box"
    );
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-in");
            io2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el, i) => {
      el.classList.add("rv");
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io2.observe(el);
    });
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  return null;
}
