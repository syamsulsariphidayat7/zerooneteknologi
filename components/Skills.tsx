"use client";

import { useLang } from "@/lib/i18n";

/**
 * Bidang Usaha (KBLI) — menggantikan blok Skills template asli.
 * Daftar bidang usaha terdaftar sesuai lampiran NIB PT Zero One
 * Teknologi; teks judul berasal dari kamus bahasa (versi Inggris =
 * terjemahan tidak resmi untuk pengunjung asing, kode KBLI tetap).
 * Nama file tetap Skills.tsx agar susunan About.tsx tidak berubah.
 */
export default function Skills() {
  const { t } = useLang();
  const kbli = t.about.kbli;

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
        <h2>{t.about.kbliTitle}</h2>
      </div>

      <div className="row skills-content">
        <div className="col-lg-6">{kbli.slice(0, 3).map(renderItem)}</div>
        <div className="col-lg-6">{kbli.slice(3).map(renderItem)}</div>
      </div>
    </div>
  );
}
