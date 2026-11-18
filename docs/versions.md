# Versi Library — personal-nextjs

Versi yang terpasang dan terverifikasi build pada 2026-11-15.
Angka persisnya dikunci di `pnpm-lock.yaml`; dokumen ini ringkasan kompatibilitasnya.

| Package | Versi | Catatan |
|---|---|---|
| next | 16.4.6 | Di atas minimum aman 16.4.5 (rilis keamanan Nov 2026). App Router + Turbopack build. |
| react / react-dom | 19.3.1 | Pasangan yang didukung Next 16.4. |
| typescript | 5.9.3 | `strict: true`. |
| bootstrap | 5.3.3 | Sengaja disamakan dengan versi template asli. |
| bootstrap-icons | 1.13.2 | Ikon `bi-*`. |
| boxicons | 2.1.4 | Ikon `bx-*`. |
| remixicon | 4.9.1 | Ikon `ri-*` (Interests). |
| swiper | 11.2.10 | Slider testimoni & detail; API `swiper` + `swiper/modules`. Versi 14 tersedia tapi API-nya belum diverifikasi di proyek ini — jangan naikkan tanpa tes. |
| glightbox | 3.3.1 | Lightbox portfolio; dimuat dinamis (client-only). |
| isotope-layout | 3.0.6 | Filter portfolio; dimuat dinamis (menyentuh `window` saat import). |
| pnpm | 12.21.0 | Dikunci via `packageManager` di `package.json`. |
| node | 24.22.1 | Runtime saat build terverifikasi di VM. |

Library template asli yang **sengaja tidak** dipakai lagi:

| Asli | Pengganti |
|---|---|
| purecounter_vanilla.js | `components/PureCounter.tsx` (IntersectionObserver) |
| waypoints (noframework) | `components/Skills.tsx` (IntersectionObserver) |
| php-email-form validate.js + contact.php | `app/api/contact/route.ts` + state form di `components/Contact.tsx` |
