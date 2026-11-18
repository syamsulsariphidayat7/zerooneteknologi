const SERVICES = [
  { icon: "bx bx-laptop", title: "Desa Digital", text: "Sistem Informasi Desa, Sistem Layanan Desa, Sistem Laporan Desa, Sistem Laporan Keuangan Desa, dan Sistem Lapak Desa dalam satu platform digital terpadu.", cls: "" },
  { icon: "bx bx-wifi", title: "Internet Desa", text: "Pengadaan jaringan internet untuk desa lengkap dengan sistem voucher desa, agar perangkat desa dan warga terhubung dan pelayanan makin efektif.", cls: " mt-4 mt-md-0" },
  { icon: "bx bx-code-alt", title: "Software House", text: "Jasa pembuatan aplikasi web dan mobile (Android) sesuai kebutuhan — untuk instansi, perusahaan, dan pemerintahan desa.", cls: " mt-4 mt-lg-0" },
  { icon: "bx bx-world", title: "Pembuatan Website", text: "Website profil instansi dan perusahaan yang responsif dan SEO friendly, dengan desain dinamis dan kemudahan pembaruan konten.", cls: " mt-4" },
  { icon: "bx bx-chip", title: "Konsultasi & IoT", text: "Konsultasi dan perancangan Internet of Things (IoT) — solusi cerdas berbasis sensor dan data untuk desa dan instansi.", cls: " mt-4" },
  { icon: "bx bx-video", title: "CCTV & Keamanan", text: "Penyedia dan pemasangan CCTV indoor dan outdoor, termasuk sistem keamanan desa dengan pemantauan dari pusat kontrol desa.", cls: " mt-4" },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <h2>Layanan</h2>
          <p>Layanan Kami</p>
        </div>

        <div className="row">
          {SERVICES.map((service) => (
            <div key={service.title} className={`col-lg-4 col-md-6 d-flex align-items-stretch${service.cls}`}>
              <div className="icon-box">
                <div className="icon"><i className={service.icon}></i></div>
                <h4><a href="">{service.title}</a></h4>
                <p>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
