"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLang } from "@/lib/i18n";

/** Slider di halaman portfolio-details — port dari main.js asli. */
export default function PortfolioDetailsContent() {
  const { t } = useLang();
  const d = t.details;
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const swiper = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      speed: 400,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
    });
    return () => swiper.destroy();
  }, []);

  return (
    <main id="main">
      <div id="portfolio-details" className="portfolio-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="portfolio-title">{d.title}</h2>

              <div className="portfolio-details-slider swiper" ref={sliderRef}>
                <div className="swiper-wrapper align-items-center">
                  {[1, 2, 3].map((n) => (
                    <div className="swiper-slide" key={n}>
                      <Image
                        src={`/assets/img/portfolio/portfolio-details-${n}.jpg`}
                        alt=""
                        width={800}
                        height={463}
                        sizes="(max-width: 992px) 100vw, 66vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>

            <div className="col-lg-4 portfolio-info">
              <h3>{d.infoTitle}</h3>
              <ul>
                <li><strong>{d.category}</strong>: {d.categoryValue}</li>
                <li><strong>{d.client}</strong>: {d.clientValue}</li>
                <li><strong>{d.date}</strong>: {d.dateValue}</li>
                <li><strong>{d.url}</strong>: <a href="#">app.contoh.id</a></li>
              </ul>

              <p>{d.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
