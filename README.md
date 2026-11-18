# PT Zero One Teknologi — Website Profil (Next.js)

Website profil **PT Zero One Teknologi** (Desa Digital, Internet Desa, Software House,
Pembuatan Website, CCTV & IoT — Garut, Jawa Barat). Berbasis template **Personal**
dari BootstrapMade (Bootstrap 5.3.3) yang dimigrasikan ke
**Next.js 16.4.6 (App Router) + React 19 + TypeScript** (fork dari proyek personal-nextjs).
Tema asli template dipertahankan; kontennya isi profil PT hasil filter dokumen
perusahaan — lihat `docs/pt-content.md`.

## Cara jalan (pnpm)

Proyek ini memakai **pnpm** (dijaga lewat field `packageManager` di `package.json`,
jadi Corepack akan memakai versi pnpm yang sama persis).

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Build production:

```bash
pnpm build
pnpm start
```

Test dasar (smoke test server production — halaman, API kontak, rate limit):

```bash
pnpm test
```

Dokumen proyek (mengikuti `AGENTS.global.md`): `AGENTS.md` (aturan proyek),
`PROGRESS.md` (status terakhir), `docs/project-brief.md`, `docs/api.md` (kontrak API),
`docs/adr/` (keputusan arsitektur), `docs/design-tokens.md`, `docs/versions.md`,
`.env.example` (variabel env).

## Optimasi

- **pnpm** — install ulang dari store lokal ±1 detik (vs ±45 detik npm, terukur di VM);
  `node_modules` memakai hard-link ke store global, hemat disk antar-proyek.
- **Font** — Google Fonts `<link>` diganti `next/font/google`: font di-self-host
  saat build, tanpa request ke `fonts.googleapis.com` saat runtime, tanpa layout shift.
  Nama font di `globals.css` kini lewat variabel `--font-open-sans` / `--font-raleway` / `--font-poppins`.
- **Gambar** — semua `<img>` diganti `next/image` (ukuran asli diketahui dari file):
  dilayani sebagai AVIF/WebP sesuai browser + `srcset` responsif + lazy load.
  Terukur: portfolio-1.jpg 29 KB → 11,6 KB (WebP @640w) / 3,7 KB (AVIF @384w).
- **CSS per komponen** — CSS Swiper hanya dimuat di komponen slider, CSS GLightbox
  hanya di komponen Portfolio; layout global hanya memuat Bootstrap + font ikon.
- **Cache aset statis** — `/assets/*` diberi `Cache-Control: public, max-age=31536000, immutable`
  di `next.config.mjs`; `poweredByHeader` dimatikan, kompresi bawaan Next aktif.

## Peta migrasi

| Asli (static) | Next.js |
|---|---|
| `index.html` | `app/page.tsx` + komponen di `components/` |
| `portfolio-details.html` | `app/portfolio-details/page.tsx` |
| `<head>` (title, favicon, fonts) | `app/layout.tsx` (`metadata` + `next/font/google`) |
| Vendor CSS (`assets/vendor/...`) | Package pnpm: CSS global (`bootstrap`, `bootstrap-icons`, `boxicons`, `remixicon`) di `app/layout.tsx`; CSS `swiper` & `glightbox` di komponen pemakainya |
| `assets/css/style.css` | `app/globals.css` (isi sama, hanya path `bg.jpg` → `/assets/img/bg.jpg`) |
| `assets/img/...` | `public/assets/img/...` |
| `assets/js/main.js` — nav & section show/hide | `components/Header.tsx` (`useState`/`useEffect`) |
| `main.js` — Swiper testimoni & detail | `components/Testimonials.tsx`, `components/PortfolioDetailsContent.tsx` (package `swiper`) |
| `main.js` — Isotope filter + GLightbox | `components/Portfolio.tsx` (package `isotope-layout` + `glightbox`, dimuat dinamis karena menyentuh `window`) |
| PureCounter (`purecounter_vanilla.js`) | `components/PureCounter.tsx` — implementasi native `IntersectionObserver`, perilaku sama |
| Waypoint (animasi skills) | `components/Skills.tsx` — implementasi native `IntersectionObserver`, perilaku sama |
| `forms/contact.php` (PHP Email Form, library Pro tidak disertakan) | `app/api/contact/route.ts` — Route Handler dengan validasi yang sama; UI loading/error/sent sama seperti aslinya |

## Catatan

- **Form kontak belum mengirim email sungguhan.** Route handler memvalidasi lalu
  mencatat pesan ke log server. Sambungkan provider email (Resend / Nodemailer + SMTP)
  di `app/api/contact/route.ts` (titiknya ditandai `TODO`), dan atur alamat penerima
  lewat env `CONTACT_TO_EMAIL` (default `contact@example.com`, sama seperti aslinya).
- Link detail portfolio sekarang mengarah ke route `/portfolio-details`
  (di template asli dibuka sebagai lightbox eksternal berisi halaman yang sama).
- Bootstrap tetap versi **5.3.3** sesuai versi template aslinya.

## Struktur

```
app/
  layout.tsx               # root layout, metadata, vendor CSS, fonts
  page.tsx                 # halaman utama (gabungan semua section)
  globals.css              # style.css asli
  portfolio-details/page.tsx
  api/contact/route.ts     # pengganti contact.php
components/
  Header.tsx  About.tsx  Skills.tsx  Testimonials.tsx  PureCounter.tsx
  Resume.tsx  Services.tsx  Portfolio.tsx  Contact.tsx  Credits.tsx
  PortfolioDetailsContent.tsx
public/assets/img/         # semua gambar template asli
```

Template asli: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
Lisensi template tetap mengikuti BootstrapMade.
