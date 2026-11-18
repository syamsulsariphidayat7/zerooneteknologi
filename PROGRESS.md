# PROGRESS.md — zerooneteknologi

Diupdate tiap akhir sesi. Sumber kebenaran progres; cocokkan dengan `git status` saat recovery.

## Fase aktif

**Integration & Testing** — versi PT selesai dibangun & terverifikasi di VM;
disiapkan untuk push pertama oleh pemilik dari laptop (2026-11-18).

## Selesai

- 2026-11-15: Migrasi template Personal (BootstrapMade) → Next.js 16.4.6 App Router + React 19 + TypeScript.
  Konten default dipertahankan persis. Route: `/`, `/portfolio-details`, `/api/contact`.
- 2026-11-15: Konversi npm → pnpm 12.21.0 (`packageManager` dikunci, `pnpm-lock.yaml`).
  Install ulang dari store terukur 1,1 dtk (npm sebelumnya ±45 dtk).
- 2026-11-15: Optimasi — font `next/font` (self-hosted, 0 referensi googleapis di HTML),
  gambar `next/image` AVIF/WebP (portfolio-1: 29 KB → 11,6 KB WebP @640w),
  CSS Swiper/GLightbox per-komponen, cache immutable `/assets/*`.
- 2026-11-15: Rate limiting `/api/contact` (in-memory, 5 req/60 dtk per IP, 429 + Retry-After).
- 2026-11-15: Smoke test otomatis `pnpm test` (9 pemeriksaan: 2 halaman, validasi API, rate limit).
- 2026-11-15: Dokumentasi proyek dilengkapi mengikuti AGENTS.global.md —
  file ini, `AGENTS.md`, `docs/project-brief.md`, `docs/api.md`, `docs/adr/`, `docs/design-tokens.md`, `docs/versions.md`, `.env.example`.
- 2026-11-15: `.gitignore` diperbaiki (semua `.env*` kecuali `.env.example`); git lokal di-init.

## Selesai (lanjutan — fork PT)

- 2026-11-18: Fork dari `personal-nextjs` → `zerooneteknologi`; tema asli Personal
  dipertahankan, konten default diganti profil **PT Zero One Teknologi** hasil
  filter dokumen perusahaan (profil PT, proposal 2022 & 2024, NIB + lampiran KBLI).
  Keputusan & sumber konten: `docs/pt-content.md`; keputusan fork: `docs/adr/0002...`.
- 2026-11-18: Logo PT dipasang (`logo.png` di Tentang, ikon → favicon `app/icon.png`);
  blok Skills diganti daftar KBLI; Resume menjadi Profil (visi/misi) & Cara Kerja;
  Tim 2 orang di Tentang; kontak memakai alamat NIB Cisurupan, domain
  zerooneteknologi.web.id, email zeroone212117@gmail.com.
- 2026-11-18: Nama proyek/repo disesuaikan dengan domain atas instruksi pemilik:
  `zeroone-nextjs` → **`zerooneteknologi`** (folder, package.json, dokumen, zip).
  Build + test ulang setelah rename: tetap 9/9 lulus.
- 2026-11-18: Smoke test disesuaikan (konten PT) — `pnpm build` sukses,
  `pnpm test` **9 lulus, 0 gagal**; cek manual server produksi: semua string kunci
  PT tampil, logo & favicon 200, tidak ada sisa "Emily Jones".

## Sedang dikerjakan

- Tidak ada. Menunggu push pertama dari laptop pemilik.

## Blocker / pekerjaan terbuka

- **Belum push** — proyek disiapkan sebagai zip tanpa `.git`; pemilik membuat repo
  GitHub `zerooneteknologi`, lalu init + commit + push pertama dari laptop (2026-11-18).
- **Portfolio & testimoni masih placeholder template** — bahan asli menyusul
  (keputusan pemilik: "biarkan sesuai template").
- **Belum deploy** — GitHub/Vercel belum disiapkan; eksekusi dari laptop pemilik bila diminta.
- **Form kontak belum mengirim email** — route handler baru memvalidasi + mencatat ke log server.
  Sambungkan Resend/Nodemailer di TODO di `app/api/contact/route.ts`, atur `CONTACT_TO_EMAIL` (lihat `.env.example`).
- **Security headers lanjutan belum ada** — CSP, X-Frame-Options, dll. belum dipasang di `next.config.mjs`.
- **Rate limit in-memory** — tidak berbagi antar-instance; ganti ke Redis/Upstash bila deployment multi-instance.

## Verifikasi terakhir

- 2026-11-18 (fork PT): `pnpm build` sukses; `pnpm test` **9 lulus, 0 gagal**
  (halaman `/` berisi konten PT, `/portfolio-details`, validasi API kontak, rate limit).
- 2026-11-15 (sesi pelengkapan dokumen, di personal-nextjs): `pnpm build` sukses; `pnpm test` **9 lulus, 0 gagal**
  (halaman `/` + `/portfolio-details`, validasi API kontak, rate limit 429 di request ke-6).
- `git check-ignore` terverifikasi: `.env` + `.env.local` ter-ignore, `.env.example` tidak.
