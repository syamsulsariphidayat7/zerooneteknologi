import Image from "next/image";
import PureCounter from "./PureCounter";
import Skills from "./Skills";
import Testimonials from "./Testimonials";

const INTERESTS = [
  { icon: "ri-community-line", color: "#ffbb2c", label: "Desa Digital", first: true },
  { icon: "ri-wifi-line", color: "#5578ff", label: "Internet Desa" },
  { icon: "ri-code-s-slash-line", color: "#e80368", label: "Software House" },
  { icon: "ri-global-line", color: "#e361ff", label: "Website & Portal", lgFirst: true },
  { icon: "ri-smartphone-line", color: "#47aeff", label: "Aplikasi Mobile", spaced: true },
  { icon: "ri-cpu-line", color: "#ffa76e", label: "Internet of Things", spaced: true },
  { icon: "ri-video-line", color: "#11dbcf", label: "CCTV & Keamanan", spaced: true },
  { icon: "ri-shopping-cart-2-line", color: "#4233ff", label: "Lapak Desa & E-Commerce", spaced: true },
];

const TEAM = [
  { name: "Sasa Nurjaman", role: "Teknik Informatika · Programmer · Jaringan" },
  { name: "Syamsul Sarip Hidayat", role: "Teknik Informatika · Programmer · Jaringan" },
];

export default function About() {
  return (
    <section id="about" className="about">
      {/* ======= About Me ======= */}
      <div className="about-me container">
        <div className="section-title">
          <h2>Tentang</h2>
          <p>Profil PT Zero One Teknologi</p>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <Image
              src="/assets/img/logo.png"
              className="img-fluid"
              alt="Logo PT Zero One Teknologi"
              width={600}
              height={650}
              sizes="(max-width: 992px) 100vw, 33vw"
              style={{ height: "auto" }}
            />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content">
            <h3>PT Zero One Teknologi — don&apos;t limit yourself</h3>
            <p className="fst-italic">
              Perusahaan teknologi informasi yang berfokus pada pengembangan sistem informasi, teknologi internet, dan
              telekomunikasi — dengan spesialisasi pada program Desa Digital dan Internet Desa.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Alamat:</strong> <span>Kp. Cibojong, Balewangi, Cisurupan, Garut</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>zerooneteknologi.web.id</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Telepon:</strong> <span>0857 2291 6809</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>zeroone212117@gmail.com</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Status Modal:</strong> <span>PMDN</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Skala Usaha:</strong> <span>Usaha Kecil</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Bidang:</strong> <span>Teknologi Informasi</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Wilayah:</strong> <span>Garut, Jawa Barat</span></li>
                </ul>
              </div>
            </div>
            <p>
              Visi kami adalah menjadi perusahaan software house, pengadaan jaringan Internet Desa, dan penyedia
              Aplikasi Desa nomor satu di Indonesia dalam rangka mendukung program pemerintah untuk mewujudkan desa
              yang maju dan mandiri. Misi kami: membentuk tim strategi, manajemen, dan operasional yang solid;
              membuat brand Desa Digital berdaya guna; memberikan solusi untuk pelayanan publik yang responsif,
              transparan, efektif, dan efisien; meningkatkan kemampuan Iptek dan inovasi sebagai pendamping kemajuan
              desa; serta memberikan layanan internet desa untuk meningkatkan efektivitas dan efisiensi pelayanan desa.
            </p>
          </div>
        </div>
      </div>

      {/* ======= Counts ======= */}
      <div className="counts container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-emoji-smile"></i>
              <PureCounter end={99} duration={1} suffix="+" />
              <p>Klien</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="bi bi-journal-richtext"></i>
              <PureCounter end={50} duration={1} suffix="+" />
              <p>Proyek Selesai</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="bi bi-briefcase"></i>
              <PureCounter end={6} duration={1} />
              <p>Bidang Usaha (KBLI)</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="bi bi-gear"></i>
              <PureCounter end={6} duration={1} />
              <p>Layanan Utama</p>
            </div>
          </div>
        </div>
      </div>

      <Skills />

      {/* ======= Interests / Fokus Bidang ======= */}
      <div className="interests container">
        <div className="section-title">
          <h2>Fokus Bidang</h2>
        </div>
        <div className="row">
          {INTERESTS.map((item) => (
            <div
              key={item.label}
              className={`col-lg-3 col-md-4${item.spaced ? " mt-4" : item.first ? "" : item.lgFirst ? " mt-4 mt-lg-0" : " mt-4 mt-md-0"}`}
            >
              <div className="icon-box">
                <i className={item.icon} style={{ color: item.color }}></i>
                <h3>{item.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======= Tim ======= */}
      <div className="interests container">
        <div className="section-title">
          <h2>Tim Kami</h2>
        </div>
        <div className="row">
          {TEAM.map((person, idx) => (
            <div key={person.name} className={`col-md-6${idx > 0 ? " mt-4 mt-md-0" : ""}`}>
              <div className="icon-box">
                <i className="ri-user-3-line" style={{ color: "#18d26e" }}></i>
                <h3>{person.name}</h3>
                <p style={{ margin: 0 }}>{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Testimonials />
    </section>
  );
}
