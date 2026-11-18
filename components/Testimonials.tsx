"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLang } from "@/lib/i18n";

/** Slider testimoni — port dari inisialisasi Swiper di main.js asli. */
export default function Testimonials() {
  const { t } = useLang();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const swiper = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: "auto",
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 },
      },
    });
    return () => swiper.destroy();
  }, []);

  const items = t.testimonials.items;

  return (
    <div className="testimonials container">
      <div className="section-title">
        <h2>{t.testimonials.title}</h2>
      </div>

      <div className="testimonials-slider swiper" ref={sliderRef}>
        <div className="swiper-wrapper">
          {items.map((item) => (
            <div className="swiper-slide" key={item.name}>
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  {item.quote}
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <div className="testimonial-img testimonial-initials" aria-hidden="true">{item.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                <h3>{item.name}</h3>
                <h4>{item.role}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}
