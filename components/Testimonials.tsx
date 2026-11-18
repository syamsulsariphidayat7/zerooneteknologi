"use client";

import { useEffect, useRef } from "react";
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
        "Saya minta dibuatkan website katalog supaya pelanggan bisa lihat koleksi tanpa harus datang ke toko. Hasilnya sesuai yang dibayangkan, dan pesanan lewat WhatsApp dari website lumayan rutin masuk. CCTV tokonya juga sekalian dipasang, jadi malam hari tetap bisa saya pantau dari rumah.",
      initials: "RW",
      name: "Ratna Wijaya",
      role: "Pemilik Butik, Garut Kota",
    },
    {
      quote:
        "Kami butuh website profil sekolah yang bisa dikelola sendiri oleh staf TU. Tim Zero One buatkan sekalian latih cara memperbarui beritanya. Sampai sekarang kalau ada kendala kecil tinggal chat, dibantu sampai beres.",
      initials: "AP",
      name: "Andi Pratama",
      role: "Pengelola Lembaga Pendidikan, Tarogong Kidul",
    },
    {
      quote:
        "Dulu pencatatan servis masih di buku, sering selisih stok sparepart. Dibuatkan aplikasi pencatatan sederhana, sekarang stok dan riwayat servis pelanggan bisa dicek dalam hitungan detik. Anak-anak di bengkel juga cepat bisa pakainya karena memang dibuat simpel.",
      initials: "BS",
      name: "Budi Santoso",
      role: "Pemilik Bengkel, Garut Kota",
    },
    {
      quote:
        "Penginapan kami sebelumnya hanya mengandalkan promosi dari mulut ke mulut. Setelah punya website dan WiFi tamu dipisah jaringannya, tamu lebih sering pesan langsung lewat WhatsApp dan tidak komplain soal internet lagi.",
      initials: "SM",
      name: "Siti Maryam",
      role: "Pengelola Penginapan, Cipanas, Garut",
    },
    {
      quote:
        "Kedai kami dibuatkan halaman menu online dan tombol reservasi WhatsApp. Pelanggan tinggal buka dari HP, tidak perlu antre tanya menu di kasir. Selama pengerjaan komunikasinya enak, revisi kecil cepat dikerjakan.",
      initials: "HW",
      name: "Hendra Wijaya",
      role: "Pemilik Kedai Kopi, Garut Kota",
    },
  ];

  return (
    <div className="testimonials container">
      <div className="section-title">
        <h2>Testimoni</h2>
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
                <div className="testimonial-img testimonial-initials" aria-hidden="true">{item.initials}</div>
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
