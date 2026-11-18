# ADR 0004 — Multi-bahasa ID/EN dengan Toggle

Tanggal: 2026-11-18 · Status: diterima (instruksi pemilik)

## Konteks
Setelah audit bahasa (konten tampil full Indonesia; Inggris hanya yang
memang dibutuhkan), pemilik meminta dukungan multi-bahasa: Inggris
sebagai bahasa kedua yang diganti lewat toggle, sejajar toggle tema.

## Keputusan
- Kamus statis dua bahasa di `lib/i18n.tsx` (React Context), TANPA
  library i18n dan tanpa routing per bahasa — situs tetap satu halaman.
- Bahasa bawaan & SSR selalu Indonesia; pilihan disimpan di
  localStorage `zo-lang`, diterapkan setelah mount (atribut `lang`
  dokumen + meta description ikut berganti).
- Tipe kamus Inggris mengikuti bentuk kamus Indonesia (`Dict`), jadi
  kunci terjemahan yang hilang gagal saat build (TypeScript).
- Toggle bahasa di header, tepat di samping toggle tema: pil berlabel
  bahasa tujuan di desktop; lingkaran "EN"/"ID" fixed di mobile.
- Judul KBLI versi Inggris adalah terjemahan TIDAK resmi (nama legal
  tetap yang berbahasa Indonesia); PDF profil tetap berbahasa
  Indonesia; pesan error API (Inggris) dipetakan ke bahasa aktif di
  klien.

## Konsekuensi
- Semua komponen konten menjadi client component (memakai useLang).
- Menambah bahasa ketiga = menambah satu objek kamus bertipe sama.
