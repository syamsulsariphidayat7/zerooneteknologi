const SERVICES = [
  { icon: "bx bx-laptop", title: "Desa Digital", text: "Platform digital terpadu untuk pemerintahan desa: sistem informasi, layanan, laporan, keuangan, dan lapak desa.", cls: "" },
  { icon: "bx bx-wifi", title: "Jaringan Internet", text: "Pengadaan jaringan internet lengkap dengan sistem voucher untuk kantor, tempat usaha, dan area publik.", cls: " mt-4 mt-md-0" },
  { icon: "bx bx-code-alt", title: "Software House", text: "Jasa pembuatan aplikasi web dan mobile (Android) sesuai kebutuhan — untuk instansi, perusahaan, dan UMKM.", cls: " mt-4 mt-lg-0" },
  { icon: "bx bx-world", title: "Pembuatan Website", text: "Website profil instansi dan perusahaan yang responsif dan SEO friendly, dengan desain dinamis dan kemudahan pembaruan konten.", cls: " mt-4" },
  { icon: "bx bx-chip", title: "Konsultasi & IoT", text: "Konsultasi dan perancangan Internet of Things (IoT) — solusi cerdas berbasis sensor dan data untuk instansi dan industri.", cls: " mt-4" },
  { icon: "bx bx-video", title: "CCTV & Keamanan", text: "Penyedia dan pemasangan CCTV indoor dan outdoor, termasuk sistem keamanan area dengan pemantauan dari pusat kontrol.", cls: " mt-4" },
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
