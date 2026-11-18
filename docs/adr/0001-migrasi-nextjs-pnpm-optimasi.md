# ADR 0001 — Migrasi ke Next.js, pnpm, dan optimasi bawaan

Tanggal: 2026-11-15 · Status: diterima (instruksi langsung pemilik)

## Konteks

Template Personal (BootstrapMade) berbentuk static HTML + Bootstrap 5.3.3 +
Vanilla JS, dengan form kontak PHP yang library-nya berbayar (tidak disertakan).
Pemilik meminta stack dimigrasikan ke Next.js dengan konten default utuh,
lalu meminta package manager diganti ke pnpm "biar cepat" plus optimasi lain yang ada.

## Keputusan

1. **Next.js 16.4.6 (App Router) + React 19 + TypeScript.**
   Versi di atas minimum aman 16.4.5 menurut Riset Web Dev Stack (Nov 2026).
   Halaman dipecah per section menjadi komponen; logika `main.js` diport ke React.
2. **pnpm 12.21.0**, dikunci lewat field `packageManager` di `package.json`.
   Terukur: install ulang dari store 1,1 detik vs ±45 detik npm.
3. **Form kontak → Route Handler** `/api/contact` dengan validasi setara form asli
   + rate limiting in-memory. Pengiriman email ditunda (belum ada provider dipilih).
4. **PureCounter & Waypoints diganti implementasi native** `IntersectionObserver`
   (perilaku sama, menghilangkan script vendor lama). Isotope & GLightbox tetap
   memakai package aslinya, dimuat dinamis karena menyentuh `window` saat import.
5. **Font via `next/font/google`** (self-hosted) menggantikan `<link>` Google Fonts;
   **gambar via `next/image`** (AVIF/WebP + srcset) menggantikan `<img>`.
   Bootstrap tetap 5.3.3 sesuai template asli.

## Konsekuensi

- Hasil visual 1:1 template asli; tidak ada perubahan konten.
- Build wajib hijau + smoke test (`pnpm test`) sebelum deployment.
- Rate limit in-memory tidak cocok untuk deployment multi-instance (utang teknis tercatat di PROGRESS.md).
