"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "glightbox/dist/css/glightbox.min.css";
import { useLang } from "@/lib/i18n";

// Isotope & GLightbox menyentuh `window` saat import, jadi dimuat
// dinamis di useEffect (client-only), bukan import statis.

// Label/judul/kategori berasal dari kamus bahasa (urutan sejajar).
const FILTERS = ["*", ".filter-app", ".filter-card", ".filter-web"];

type CatKey = "app" | "card" | "web";
const ITEMS: { img: number; cat: CatKey; filterClass: string }[] = [
  { img: 1, cat: "app", filterClass: "filter-app" },
  { img: 2, cat: "web", filterClass: "filter-web" },
  { img: 3, cat: "app", filterClass: "filter-app" },
  { img: 4, cat: "card", filterClass: "filter-card" },
  { img: 5, cat: "web", filterClass: "filter-web" },
  { img: 6, cat: "app", filterClass: "filter-app" },
  { img: 7, cat: "card", filterClass: "filter-card" },
  { img: 8, cat: "card", filterClass: "filter-card" },
  { img: 9, cat: "web", filterClass: "filter-web" },
];

/**
 * Portfolio — port dari Isotope + GLightbox di main.js asli.
 * Link detail sekarang mengarah ke route Next.js /portfolio-details
 * (di template asli dibuka sebagai lightbox eksternal).
 */
export default function Portfolio() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isotopeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let iso: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lightbox: any = null;

    (async () => {
      const [{ default: Isotope }, { default: GLightbox }] = await Promise.all([
        import("isotope-layout"),
        import("glightbox"),
      ]);
      if (cancelled || !containerRef.current) return;

      iso = new Isotope(containerRef.current, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });
      isotopeRef.current = iso;

      // Layout ulang setelah gambar selesai dimuat
      const images = containerRef.current.querySelectorAll("img");
      let loaded = 0;
      const onLoad = () => {
        loaded += 1;
        if (loaded === images.length) iso?.layout();
      };
      images.forEach((img) => {
        if (img.complete) onLoad();
        else img.addEventListener("load", onLoad);
      });

      lightbox = GLightbox({ selector: ".portfolio-lightbox" });
    })();

    return () => {
      cancelled = true;
      lightbox?.destroy();
      iso?.destroy();
    };
  }, []);

  const handleFilter = (e: React.MouseEvent<HTMLLIElement>, filter: string) => {
    const list = e.currentTarget.parentElement;
    list?.querySelectorAll("li").forEach((el) => el.classList.remove("filter-active"));
    e.currentTarget.classList.add("filter-active");
    isotopeRef.current?.arrange({ filter });
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>{t.portfolio.big}</p>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              {FILTERS.map((f, i) => (
                <li
                  key={f}
                  data-filter={f}
                  className={i === 0 ? "filter-active" : ""}
                  onClick={(e) => handleFilter(e, f)}
                >
                  {t.portfolio.filters[i]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row portfolio-container" ref={containerRef}>
          {ITEMS.map((item, i) => (
            <div key={item.img} className={`col-lg-4 col-md-6 portfolio-item ${item.filterClass}`}>
              <div className="portfolio-wrap">
                <Image
                  src={`/assets/img/portfolio/portfolio-${item.img}.jpg`}
                  className="img-fluid"
                  alt=""
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                  style={{ height: "auto" }}
                />
                <div className="portfolio-info">
                  <h4>{t.portfolio.titles[i]}</h4>
                  <p>{t.portfolio.categories[item.cat]}</p>
                  <div className="portfolio-links">
                    <a
                      href={`/assets/img/portfolio/portfolio-${item.img}.jpg`}
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title={t.portfolio.titles[i]}
                    >
                      <i className="bx bx-plus"></i>
                    </a>
                    <Link href="/portfolio-details" title={t.portfolio.detailsLink}>
                      <i className="bx bx-link"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
