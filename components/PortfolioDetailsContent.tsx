"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/** Slider di halaman portfolio-details — port dari main.js asli. */
export default function PortfolioDetailsContent() {
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
              <h2 className="portfolio-title">This is an example of portfolio detail</h2>

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
              <h3>Project information</h3>
              <ul>
                <li><strong>Category</strong>: Web design</li>
                <li><strong>Client</strong>: ASU Company</li>
                <li><strong>Project date</strong>: 01 March, 2020</li>
                <li><strong>Project URL</strong>: <a href="#">www.example.com</a></li>
              </ul>

              <p>
                Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
