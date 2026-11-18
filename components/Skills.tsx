/**
 * Bidang Usaha (KBLI) — menggantikan blok Skills template asli.
 * Template Personal memakai bar persen keahlian; untuk profil PT ini
 * slot yang sama diisi daftar bidang usaha terdaftar sesuai lampiran
 * NIB PT Zero One Teknologi (tanpa angka persen karangan).
 * Nama file tetap Skills.tsx agar susunan About.tsx tidak berubah.
 */
const KBLI_LEFT = [
  { code: "58200", title: "Penerbitan Piranti Lunak (Software)" },
  { code: "62012", title: "Pengembangan Aplikasi Perdagangan Melalui Internet (E-Commerce)" },
  { code: "63121", title: "Portal Web dan/atau Platform Digital" },
];

const KBLI_RIGHT = [
  { code: "62024", title: "Konsultasi dan Perancangan Internet of Things (IoT)" },
  { code: "61913", title: "Jasa Internet Teleponi untuk Keperluan Publik (ITKP)" },
  { code: "61924", title: "Jasa Interkoneksi Internet (NAP)" },
];

export default function Skills() {
  const renderItem = (item: { code: string; title: string }) => (
    <div className="progress" key={item.code}>
      <span className="skill">
        {item.code} — {item.title}
      </span>
    </div>
  );

  return (
    <div className="skills container">
      <div className="section-title">
        <h2>Bidang Usaha Terdaftar (KBLI)</h2>
      </div>

      <div className="row skills-content">
        <div className="col-lg-6">{KBLI_LEFT.map(renderItem)}</div>
        <div className="col-lg-6">{KBLI_RIGHT.map(renderItem)}</div>
      </div>
    </div>
  );
}
