# ADR 0003 — Model Satu Halaman Panjang (Scroll Biasa)

Tanggal: 2026-11-18
Status: diterima (instruksi pemilik, mengoreksi tafsir fitur scroll sebelumnya)

## Konteks

Template Personal asli memakai model tampil-satu-section: klik navigasi
menyembunyikan semua section dan menampilkan satu section (`section-show`),
halaman sendiri tidak bisa di-scroll. Pemilik meminta halaman bisa
di-scroll dari Beranda dengan bar progres di atas. Tafsir pertama (kotak
section scroll internal, header diam) DITOLAK pemilik: yang dimaksud
adalah halaman panjang biasa.

## Keputusan

- Semua section menumpuk vertikal; halaman di-scroll seperti web biasa.
- Efek muncul khas template PERTAHANKAN dalam bentuk reveal-on-scroll:
  tiap section pudar + geser masuk saat pertama kali masuk viewport
  (komponen `RevealOnScroll`, class `reveal`/`is-visible`).
- Navigasi (desktop + nav bawah mobile) = scroll halus ke section;
  link aktif mengikuti posisi scroll (scrollspy di `Header.tsx`).
- Header menyusut jadi bar `header-top` fixed setelah hero terlewati;
  spacer setinggi hero mencegah halaman melompat.
- Bar progres di atas membaca scroll jendela (bukan scroll kotak lagi).

## Konsekuensi

- URL hash tetap bermakna (lompat ke section), SEO & tombol WA tidak berubah.
- Class `section-show` tidak lagi dipakai di halaman utama.
