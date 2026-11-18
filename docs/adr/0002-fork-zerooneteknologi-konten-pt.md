# ADR 0002 — Fork zerooneteknologi & penggantian konten ke profil PT

Tanggal: 2026-11-18. Status: diterima (instruksi pemilik).

## Konteks

Proyek `personal-nextjs` adalah migrasi template Personal dengan keputusan
2026-11-15 bahwa konten default dipertahankan persis. Pemilik kemudian
memutuskan membuat website profil **PT Zero One Teknologi** memakai tema asli
template yang sama, dengan isi dari dokumen perusahaan (profil, proposal,
NIB + lampiran KBLI) yang disaring dulu.

## Keputusan

1. Fork proyek menjadi `zerooneteknologi`; `personal-nextjs` tidak diubah dan
   tetap menjadi arsip migrasi berkonten default.
2. Tema & layout 1:1 template Personal dipertahankan; yang diganti hanya
   konten (Header, About, Resume→Profil & Cara Kerja, Services, Contact,
   metadata). Portfolio & testimoni tetap bawaan template sebagai placeholder
   sampai bahan asli menyusul (keputusan pemilik 2026-11-18).
3. Blok Skills (bar persen) diganti daftar Bidang Usaha Terdaftar (KBLI) —
   persen keahlian tidak punya dasar dokumen. Komponen tetap bernama
   `Skills.tsx` agar susunan `About.tsx` tidak berubah.
4. Keputusan konten rinci (tim 2 orang, alamat NIB Cisurupan, domain & email
   resmi, data yang ditahan) dicatat di `docs/pt-content.md`.

## Konsekuensi

- Smoke test disesuaikan: pemeriksaan konten halaman utama kini mencari
  "PT Zero One Teknologi" (bukan "Emily Jones").
- Repo baru mulai tanpa riwayat git; push pertama dilakukan pemilik dari
  laptop.
