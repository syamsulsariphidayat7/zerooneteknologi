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
- 2026-11-18: Tagline hero digeneralisasi sesuai KBLI atas instruksi pemilik:
  'Mitra teknologi untuk software, aplikasi, dan solusi digital terpadu' +
  moto 'don't limit yourself' ditampilkan di hero. Build + test tetap 9/9.
- 2026-11-18: Fix gambar testimoni lonjong (laporan screenshot pemilik): CSS
  `.testimonial-img` kini `height: 90px; object-fit: cover` + atribut Image
  90×90 (sebelumnya cuma `width: 90px`, tinggi mengikuti atribut 400 &
  teregang di browser). Terverifikasi di CSS hasil build; menunggu konfirmasi
  visual pemilik.
- 2026-11-18: Atas instruksi pemilik dibuat 2 patch TANPA push (di `your_files/`):
  `zerooneteknologi-testi-fix.patch` (globals.css + Testimonials.tsx) &
  `zerooneteknologi-tagline-motto.patch` (Header.tsx), basis = keadaan zip
  13:16 (sebelum dua perubahan itu). Terverifikasi: apply bersih di basis,
  3 file hasil identik byte, build + test pohon ter-patch 9/9. Menunggu apply
  oleh pemilik di laptop.
- 2026-11-18: Fix dua cacat dari screenshot pemilik: (1) moto bocor ke bar
  header-top → moto diberi class `hero-motto` + aturan `display:none` saat
  header-top (CSS produksi terverifikasi memuatnya); (2) '+' counter jatuh
  baris → PureCounter dapat prop `suffix` dirender di dalam span yang sama
  ('99+'/'50+' sebaris). Build + test 9/9. Menunggu konfirmasi visual pemilik.
- 2026-11-18: Atas instruksi pemilik dibuat patch TANPA commit:
  `your_files/zerooneteknologi-header-counter-fix.patch` (4 file: Header,
  globals.css, PureCounter, About), basis = keadaan salinan laptop saat ini
  (patch testi + tagline sudah terpasang). Terverifikasi: apply bersih,
  file identik byte, build + test pohon ter-patch 9/9. Menunggu apply pemilik.
- 2026-11-18: Toggle tema terang/gelap DIBANGUN atas instruksi pemilik:
  tombol `.theme-toggle` di header (tetap tampil saat header-top), pilihan
  tersimpan di localStorage `zo-theme`, script inline anti-kedip di layout,
  override terang terpusat di akhir globals.css (75 aturan `data-theme=light`;
  token tercatat di docs/design-tokens.md). Build + test 9/9; HTML & CSS
  produksi terverifikasi memuat tombol + aturan terang. Menunggu konfirmasi
  visual pemilik; belum di-patch ke laptop.
- 2026-11-18: Patch toggle tema versi pertama GAGAL apply di laptop:
  basis rekonstruksi beda di ujung file (globals.css laptop tanpa newline
  penutup; design-tokens.md beda 1 baris kosong) — hunk penutup file sensitif
  soal itu. Patch DIBANGUN ULANG di atas file ASLI laptop yang diupload
  pemilik (basis persis): `your_files/zerooneteknologi-theme-toggle.patch`
  (layout.tsx, Header.tsx, globals.css, docs/design-tokens.md).
  Terverifikasi ulang: apply bersih, 4 file identik byte, build + test 9/9.
  Menunggu apply pemilik. Pelajaran: blok apply wajib dirantai `&&` agar
  `rm` tidak jalan saat apply gagal.
- 2026-11-18: Navigasi mobile DIBANGUN ulang atas instruksi pemilik:
  hamburger + overlay dibuang, diganti nav bawah fixed (6 tautan + ikon,
  hanya ≤991px); tombol tema di mobile jadi ikon fixed pojok kanan atas
  (bekas posisi hamburger), di desktop tetap pill berlabel. Credits naik
  58px & padding section ditambah agar tak tertutup nav bawah. Build +
  test 9/9, HTML produksi terverifikasi. Belum di-patch ke laptop.
- 2026-11-18: Patch nav mobile versi pertama GAGAL di Header.tsx:130 —
  rekonstruksi invers Header beda dari file laptop asli di daerah ujung
  file yang tak tersentuh patch toggle. Patch DIBANGUN ULANG di atas
  Header.tsx ASLI yang diupload pemilik (+ globals dari file asli + patch
  toggle): `your_files/zerooneteknologi-mobile-nav.patch`. Terverifikasi:
  apply bersih, 2 file identik byte, build + test pohon ter-patch 9/9.
  Menunggu apply pemilik. Pelajaran: untuk file yang sering berubah,
  basis patch = file asli tujuan, bukan rekonstruksi.
- 2026-11-18: REPO RESMI + DEPLOY: pemilik commit baseline di laptop &
  push ke GitHub `syamsulsariphidayat7/zerooneteknologi` — main = `f21f606`
  (di atas `eb93a88` fix testi/tagline/header/counter dan `d937e99` commit
  pertama), terverifikasi dari VM via ls-remote. Situs LIVE via Vercel di
  https://zerooneteknologi.web.id (200, HTML memuat toggle + nav bawah).
  Cermin remote untuk basis patch tersimpan di
  `~/workspace/zerooneteknologi-remote/`. PROSEDUR BARU: patch selalu
  dibangun di atas commit remote terakhir (fetch dulu), bukan rekonstruksi.
  Selisih pohon VM vs remote kini hanya PROGRESS.md + docs/pt-content.md
  (catatan VM lebih lengkap) dan next-env.d.ts (hasil generate).
- 2026-11-18: Kotak section scroll internal + bar progres scroll DIBANGUN
  atas instruksi pemilik: `.section-show .container` max-height + overflow
  auto (scrollbar tipis), komponen `ScrollProgress` (bar gradien 3px di
  tepi atas; sumber = scroll kotak, fallback scroll jendela). Patch dibuat
  dari cermin remote basis `f21f606` (prosedur baru):
  `your_files/zerooneteknologi-scroll-progress.patch`, terverifikasi apply
  bersih + identik + build/test pohon ter-patch 9/9. Menunggu apply pemilik.
- 2026-11-18: Section & hero melebar 90% (permintaan Syamsul,
  direvisi dua kali: "tetap sudut tumpul biar gak terlalu full",
  lalu "mungkin 90%"): container section + hero max-width 90%,
  radius 22px + border utuh.
  Patch: `your_files/zerooneteknologi-fullwidth.patch`, basis = pasca tentang-visimisi.
- 2026-11-18: Tentang dirombak (instruksi Syamsul): teks besar "Profil
  PT Zero One Teknologi" dihapus dari judul section; Visi & Misi
  DITULIS ULANG total (rasional, global, umum, menjual, relevan, full
  Indonesia — bukan teks proposal lagi); sisa Inggris di Tentang
  dibersihkan (Maintenance -> Pemeliharaan, label fokus: Perangkat
  Lunak, IoT & Sensor, E-Dagang). Patch:
  `your_files/zerooneteknologi-tentang-visimisi.patch`, basis = pasca layanan-hover.
- 2026-11-18: Fix hover Layanan mode terang: kartu tetap putih saat
  hover (aturan dasar terang menang atas hover template) sementara
  teks berubah putih -> teks hilang. Ditambah aturan hover terang
  eksplisit: kartu hijau #18d26e + teks putih, sama seperti gelap.
  Patch: `your_files/zerooneteknologi-layanan-hover.patch`, basis = pasca scroll-fix.
- 2026-11-18: Scrollbar kustom DICABUT (keputusan Syamsul dari
  screenshot: bar hijau terlalu dominan) — kembali ke scrollbar
  bawaan browser. Scroll hero diperbaiki: #header overflow-y: auto
  (warisan template, menelan roda mouse) -> visible; layar sangat
  pendek (<=500px) tetap auto. Patch:
  `your_files/zerooneteknologi-scroll-fix.patch`, basis = pasca ringankan.
- 2026-11-18: Ringankan animasi (keluhan Syamsul: "berasa berat"):
  ParallaxFX + SmoothScroll DIHAPUS total (komponen + aturan CSS
  parallax background/pola) — yang kontinu menggerakkan layer layar
  penuh tiap frame scroll. Tersisa animasi ringan sekali-jalan:
  orb hero, animasi masuk hero, kartu berjenjang, garis bawah nav.
  Patch: `your_files/zerooneteknologi-ringankan.patch`, basis = pasca bersih-animasi.
- 2026-11-18: Efek parallax + sentuhan animasi + smooth scroll
  (instruksi Syamsul): ParallaxFX (background bergeser pelan via
  --bg-shift, konten hero turun+memudar saat scroll menjauh — mati saat
  header-top, pola Tentang/Layanan bergeser via --pat-y), orb hijau
  melayang di hero (#header::after), animasi masuk hero berjenjang,
  kartu muncul berjenjang (RevealOnScroll + class .rv), garis bawah nav
  geser, SmoothScroll lerp roda mouse (pointer presisi saja).
  prefers-reduced-motion mematikan semuanya.
- 2026-11-18: Pembersihan konten (instruksi Syamsul): kredit "Designed by
  BootstrapMade" dihapus total (komponen Credits dibuang), blok Tim Kami
  dihapus, bahasa FULL Indonesia (judul Testimoni, filter/judul portfolio,
  halaman Detail Portfolio + contoh proyek diganti aplikasi stok
  distributor, "Loading" -> "Mengirim..."), testimoni ditulis ulang jadi
  5 placeholder realistis Indonesia + avatar inisial. Positioning global:
  kata "desa" di web HANYA pada produk Desa Digital — Internet Desa
  tampil sebagai "Jaringan Internet", visi/misi versi web dipersingkat,
  og-image diperbarui. Patch (digabung dengan animasi di bawah):
  `your_files/zerooneteknologi-bersih-animasi.patch`, basis = pasca pola-section.
- 2026-11-18: Pola per section (pilihan Syamsul dari lembar kumpulan
  pola; Blueprint & Kontur dihapus): Tentang=Circuit (tile SVG),
  Layanan=Jaringan (motif mesh SVG, fade radial), Portfolio=Dot Grid
  (CSS), Kontak=Glow + Aksen Garis (CSS, gaya Zerone). Varian terang
  untuk keempatnya. Ditambah instruksi Syamsul di menit yang sama:
  hero diberi gradien (#header::before — tint hijau 10% di atas,
  memudar 42%, dasar digelapkan 42%; terang lebih lembut).
  Patch: `your_files/zerooneteknologi-pola-section.patch`, basis = 204fffb.
- 2026-11-18: Mode terang dapat background SENDIRI (keluhan Syamsul: bg
  abu "berasa numpang"): bg-tech-light.jpg — kembaran terang bg-tech
  (komposisi sama, basis #f4f7f5); body::before terang menukar gambar +
  opacity penuh, warna dasar body terang disamakan #f4f7f5. Mode gelap
  tidak berubah. Patch: `your_files/zerooneteknologi-bg-terang.patch`,
  basis = pasca bg-tech.
- 2026-11-18: Background diganti (instruksi Syamsul): foto bawaan template
  (bg.jpg) -> gambar vibes teknologi & network (bg-tech.jpg, digenerate:
  circuit tipis hijau-cyan di kanan + globe jaringan redup, kiri kosong
  gelap). Referensi di body::before; tema terang tetap opacity 0,15.
  Patch: `your_files/zerooneteknologi-bg-tech.patch`, basis = pasca bar-spasi-top.
- 2026-11-18: Koreksi dari screenshot Syamsul: (1) "bar scroll" yang
  dimaksud = bar progres di ATAS — dibuat tegas (5px + rel samar + glow);
  (2) blok-blok di Tentang terlalu rapat sejak jadi kotak — diberi jarak
  antar container 30px; (3) tombol kembali ke atas (muncul setelah scroll
  600px, bertumpuk di atas tombol WA). Patch:
  `your_files/zerooneteknologi-bar-spasi-top.patch`, basis = pasca poles-ui.
- 2026-11-18: Poles UI modern (disetujui dari preview gambar): scrollbar
  halaman kustom gradien hijau, section radius 22px + border/bayangan,
  kartu 16px + hover naik, tombol pil, input 12px, header-top kaca blur +
  sudut bawah tumpul, nav bawah mobile MELAYANG (credits/WA/padding
  menyesuaikan). Token dicatat di docs/design-tokens.md. Patch:
  `your_files/zerooneteknologi-poles-ui.patch`, basis = pasca gabung-section.
- 2026-11-18: Section Tentang + Profil DIGABUNG jadi satu section (instruksi
  Syamsul): blok Visi & Misi + Cara Kerja dari Resume pindah ke About
  (paragraf visi-misi dobel di About dibuang; blok Visi & Misi membawa
  id="resume" sebagai jangkar link lama), Resume.tsx dihapus, menu Profil
  hilang (nav 5 item). Patch: `your_files/zerooneteknologi-gabung-section.patch`,
  basis remote `49f3c3a`.
- 2026-11-18: KOREKSI MODEL SCROLL atas klarifikasi Syamsul: tafsir "kotak
  section scroll internal" SALAH — yang dimaksud SATU HALAMAN PANJANG:
  semua section menumpuk, scroll halaman biasa, efek muncul tiap section
  DIPERTAHANKAN sebagai reveal-on-scroll. Dibangun ulang: CSS scroll
  internal dibuang, section jadi relatif bertumpuk, komponen baru
  RevealOnScroll, Header: navigasi scroll halus + scrollspy + header-top
  muncul setelah hero (dengan spacer anti-lompat), ScrollProgress kini
  membaca scroll jendela. Keputusan dicatat di docs/adr/0003. Patch
  koreksi: `your_files/zerooneteknologi-longpage.patch`, basis = keadaan
  laptop sesudah scroll-docs + wa-seo ter-apply (belum commit).
- 2026-11-18: Rekomendasi 1-3 disetujui Syamsul & DIBANGUN: (1) tombol
  WhatsApp mengambang (wa.me nomor resmi situs + teks sapa) — komponen
  WhatsAppFloat; (2) tombol "Unduh Profil Perusahaan (PDF)" di Tentang —
  PDF profil asli di public/profil-pt-zero-one-teknologi.pdf (480 KB);
  (3) paket SEO: og-image.png 1200x630 + metadata OpenGraph/Twitter,
  app/sitemap.ts, app/robots.ts, JSON-LD ProfessionalService (alamat NIB,
  telepon, email) di layout. Build + 9/9; output produksi terverifikasi
  (wa.me, JSON-LD, og, sitemap/robots/pdf/og-image 200). Patch:
  `your_files/zerooneteknologi-wa-seo.patch` — basis = keadaan SETELAH
  patch scroll-docs ter-apply (urutan: scroll-docs dulu, baru ini).
- 2026-11-18: Audit docs vs kode: api.md, versions.md, pt-content.md,
  design-tokens.md sinkron; yang basi DIPERBARUI — AGENTS.md (fase jadi
  Maintenance + status repo live), README.md (struktur + ScrollProgress),
  judul versions.md. Patch scroll DIGABUNG dengan sinkronisasi docs ini
  (termasuk PROGRESS.md & pt-content.md disamakan ke versi VM):
  `your_files/zerooneteknologi-scroll-docs.patch`, basis remote `f21f606`.
  Patch scroll terpisah sebelumnya DICABUT (digantikan patch gabungan).
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
