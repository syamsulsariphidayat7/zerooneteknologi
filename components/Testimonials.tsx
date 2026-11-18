"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/** Slider testimoni — port dari inisialisasi Swiper di main.js asli. */
export default function Testimonials() {
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

  const items = [
    {
      quote:
        "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
      img: "/assets/img/testimonials/testimonials-1.jpg",
      name: "Saul Goodman",
      role: "Ceo & Founder",
    },
    {
      quote:
        "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
      img: "/assets/img/testimonials/testimonials-2.jpg",
      name: "Sara Wilsson",
      role: "Designer",
    },
    {
      quote:
        "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.",
      img: "/assets/img/testimonials/testimonials-3.jpg",
      name: "Jena Karlis",
      role: "Store Owner",
    },
    {
      quote:
        "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.",
      img: "/assets/img/testimonials/testimonials-4.jpg",
      name: "Matt Brandon",
      role: "Freelancer",
    },
    {
      quote:
        "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
      img: "/assets/img/testimonials/testimonials-5.jpg",
      name: "John Larson",
      role: "Entrepreneur",
    },
  ];

  return (
    <div className="testimonials container">
      <div className="section-title">
        <h2>Testimonials</h2>
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
                <Image src={item.img} className="testimonial-img" alt="" width={400} height={400} sizes="90px" />
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
