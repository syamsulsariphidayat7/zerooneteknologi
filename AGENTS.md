# AGENTS.md — zerooneteknologi

Dokumen proyek ini mengikuti pola `AGENTS.global.md` milik Syamsul.
Aturan global yang tidak tertulis di sini tetap berlaku dari dokumen global.

## Ringkasan Proyek

Website profil **PT Zero One Teknologi** di atas fondasi migrasi template
**Personal** (BootstrapMade) ke **Next.js 16.4.6 (App Router) + React 19 + TypeScript**.
Fork dari proyek `personal-nextjs` pada 2026-11-18 atas instruksi pemilik:
**tema asli template dipertahankan, konten default DIGANTI isi profil PT**
hasil filter dokumen perusahaan (profil, 2 proposal, NIB + lampiran KBLI).
Sumber & keputusan konten: `docs/pt-content.md`. Brief asal: `docs/project-brief.md`.

## Prinsip Umum

- Package manager: **pnpm** (versi dikunci lewat `packageManager` di `package.json`).
- Stack tidak diganti tanpa riset + izin pemilik (keputusan besar).
- Keputusan kecil-menengah dicatat di `PROGRESS.md`, bukan ditanyakan di tengah sesi.
- Hanya bekerja di direktori proyek ini.

## Alur Kerja Fitur/Perubahan Baru

1. Baca `PROGRESS.md` + file ini sebelum mulai.
2. Perubahan kecil terarah; konten PT mengikuti `docs/pt-content.md` — jangan kembalikan konten default template.
3. Setelah selesai: build + smoke test (`pnpm build && pnpm test`), update `PROGRESS.md`.
4. Keputusan arsitektur baru → catat sebagai ADR baru di `docs/adr/`.

## Fase Standar

Discovery → Design → Setup → Development → Integration & Testing → Deployment → Maintenance.
Fase aktif saat ini: **Maintenance** (lihat `PROGRESS.md`).
Situs SUDAH live via Vercel (https://zerooneteknologi.web.id, sejak 2026-11-18);
deploy terpicu oleh push ke GitHub dari laptop pemilik, bukan dari VM.

## Dokumentasi (tidak duplikat)

- Kontrak API: `docs/api.md` (satu-satunya sumber; jangan duplikat di README).
- Keputusan arsitektur: `docs/adr/`.
- Versi library: `docs/versions.md`.
- Design tokens: `docs/design-tokens.md`.
- Ringkasan progres: `PROGRESS.md` — update tiap akhir sesi.
- Tidak ada database/migration → tidak ada ERD.

## Recovery Sesi Terhenti

1. Cek `git status`/`git diff` + kondisi nyata kode.
2. Bandingkan dengan `PROGRESS.md` terakhir.
3. Jangan tulis kode baru sebelum langkah 1–2 selesai.
4. Update `PROGRESS.md` ke kondisi akurat.
5. Beri tahu pemilik eksplisit jika ada kode setengah jadi berisiko.

## Git Commit

- Commit utama: `feat`. Fix kecil boleh gabung commit fitur terkait; fix signifikan berdiri sendiri.
- Commit dan push **tidak otomatis** — wajib izin pemilik dulu.
- Status: repo GitHub `syamsulsariphidayat7/zerooneteknologi` aktif (main terverifikasi
  dari VM); push hanya dari laptop pemilik. Patch dari VM selalu dibangun di atas
  commit remote terakhir — cermin lokal di `~/workspace/zerooneteknologi-remote/` —
  bukan dari rekonstruksi keadaan laptop.

## Seed Data

Tidak berlaku: proyek ini tidak punya database, auth, atau tabel.
Aturan password seed `dev123` tidak terpakai di sini.

## Standar UI/UX

- Pengecualian atas instruksi pemilik: tampilan **sengaja 1:1 template asli**
  (bukan kustomisasi di atas template generik seperti standar global).
  Konten di dalamnya adalah profil PT (lihat `docs/pt-content.md`), bukan konten default.
- Design tokens template dicatat apa adanya di `docs/design-tokens.md` dan
  dipakai konsisten; jangan mengubah warna/font/layout tanpa instruksi.
- Gambar wajib lewat `next/image`; font wajib lewat `next/font` (jangan kembali ke `<link>` Google Fonts).

## Keamanan & Kualitas Pre-Deployment

- `.env` di-gitignore (semua pola `.env*` kecuali `.env.example`); `.env.example` diupdate tiap ada variabel baru.
- Endpoint publik wajib rate limiting — `/api/contact` saat ini in-memory 5 req/60 dtk per IP
  (ganti ke store bersama bila deployment multi-instance).
- Test dasar wajib sebelum deployment: `pnpm test` (smoke test endpoint + halaman).
- Tidak ada database → aturan backup DB sebelum migration tidak berlaku.
- Security headers: saat ini baru cache aset + `poweredByHeader: false`;
  CSP dan kawan-kawan belum dipasang (dicatat di PROGRESS sebagai pekerjaan terbuka).

## Interaksi dengan User

- Klarifikasi memakai opsi singkat/interaktif, bukan pertanyaan terbuka.
- Perintah deploy/push/install ditulis langsung di chat sebagai blok kode.

## Riwayat Stack & Keputusan

- Stack asal: HTML5 + CSS3 + Vanilla JS, Bootstrap 5.3.3, PHP stub untuk form kontak (BootstrapMade Personal, update 17 Mar 2024).
- 2026-11-15: Migrasi ke Next.js 16.4.6 (App Router) + React 19 + TypeScript atas instruksi pemilik;
  versi di atas minimum aman 16.4.5 menurut Riset Web Dev Stack (Nov 2026). Detail: `docs/adr/0001-migrasi-nextjs-pnpm-optimasi.md`.
- 2026-11-15: Package manager diganti npm → pnpm 12.21.0 atas instruksi pemilik.
- 2026-11-15: PureCounter & Waypoint diganti implementasi native `IntersectionObserver` (perilaku sama, tanpa script vendor lama).
- 2026-11-15: Form kontak PHP → Route Handler `/api/contact`; **belum mengirim email sungguhan**.
- 2026-11-18: Fork jadi `zerooneteknologi` — konten diganti profil PT Zero One Teknologi atas instruksi pemilik (tema tetap asli Personal). Detail: `docs/adr/0002-fork-zerooneteknologi-konten-pt.md`.
