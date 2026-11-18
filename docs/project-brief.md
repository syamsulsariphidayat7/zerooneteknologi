# Project Brief — personal-nextjs

## Tujuan

Memindahkan template portofolio **Personal** dari BootstrapMade ke stack modern
(Next.js) tanpa mengubah isi maupun tampilannya, sebagai bahan dasar yang siap
dikembangkan lebih lanjut bila pemilik memutuskan.

## Keputusan yang sudah dikunci pemilik

- Konten default template **dipertahankan persis** (nama, teks, gambar contoh).
- Stack tujuan: Next.js (instruksi langsung pemilik, 2026-11-15).
- Package manager: pnpm (instruksi langsung pemilik, 2026-11-15).
- Single-page portofolio + 1 halaman detail + form kontak — **bukan** SaaS/multi-tenant,
  tidak ada auth, role, atau database.

## Ruang lingkup migrasi

| Termasuk | Tidak termasuk |
|---|---|
| Semua section halaman utama (Header, About, Counts, Skills, Interests, Testimonials, Resume, Services, Portfolio, Contact) | Pengiriman email sungguhan dari form kontak |
| Halaman portfolio-details | Kustomisasi konten/desain dari template asli |
| Form kontak → API route dengan validasi + rate limiting | Deployment (GitHub/Vercel) — tahap terpisah, dari laptop |
| Optimasi font, gambar, cache aset | CMS / panel admin |

## Target jalan

- Lokal: `pnpm install && pnpm dev` → http://localhost:3000
- Production: `pnpm build && pnpm start`; siap deploy ke Vercel/hosting Node bila diminta.
