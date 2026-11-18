"use client";

import { useLang } from "@/lib/i18n";

// Ikon + pola spasi tetap; judul + teks berasal dari kamus bahasa.
const SERVICES = [
  { icon: "bx bx-laptop", cls: "" },
  { icon: "bx bx-wifi", cls: " mt-4 mt-md-0" },
  { icon: "bx bx-code-alt", cls: " mt-4 mt-lg-0" },
  { icon: "bx bx-world", cls: " mt-4" },
  { icon: "bx bx-chip", cls: " mt-4" },
  { icon: "bx bx-video", cls: " mt-4" },
];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <h2>{t.services.title}</h2>
          <p>{t.services.big}</p>
        </div>

        <div className="row">
          {SERVICES.map((service, i) => (
            <div key={service.icon} className={`col-lg-4 col-md-6 d-flex align-items-stretch${service.cls}`}>
              <div className="icon-box">
                <div className="icon"><i className={service.icon}></i></div>
                <h4><a href="">{t.services.items[i].title}</a></h4>
                <p>{t.services.items[i].text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
