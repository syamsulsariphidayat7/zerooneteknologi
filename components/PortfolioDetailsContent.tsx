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
              <h2 className="portfolio-title">Aplikasi Stok & Penjualan Distributor</h2>

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
              <h3>Informasi Proyek</h3>
              <ul>
                <li><strong>Kategori</strong>: Aplikasi Web</li>
                <li><strong>Klien</strong>: Perusahaan Distributor, Garut</li>
                <li><strong>Tanggal Proyek</strong>: 8 September 2026</li>
                <li><strong>URL Proyek</strong>: <a href="#">app.contoh.id</a></li>
              </ul>

              <p>
                Aplikasi web untuk pencatatan stok dan penjualan distributor: barang masuk dan keluar tercatat secara real-time, nota penjualan tercetak otomatis, dan laporan harian dapat dipantau pemilik dari mana saja. Tampilannya dirancang sederhana agar staf gudang dan admin cepat beradaptasi tanpa pelatihan panjang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
