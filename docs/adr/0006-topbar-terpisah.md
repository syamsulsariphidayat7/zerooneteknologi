# ADR 0006 — Bar atas terpisah menggantikan header yang menyusut

Tanggal: 2026-11-18
Status: diterima (instruksi Syamsul: rombak kemunculan nav yang
masih terasa loncat, pendekatan diserahkan ke agent)

## Konteks
Pola lama (dari template + ADR 0003): hero berubah jadi bar
`header-top` (fixed) setelah terlewati, dengan spacer setinggi hero.
Di perangkat nyata kemunculannya terasa loncat: ukuran konten hero
berubah seketika dan spacer tidak selalu presisi. Animasi transform
pada header juga menggeser elemen `position: fixed` di dalamnya
(nav bawah mobile sempat "pindah ke atas").

## Keputusan
- Hero statis selamanya; tidak ada kelas `header-top`, tidak ada spacer.
- Komponen baru `TopBar`: bar fixed ramping (60px, kaca blur) yang
  meluncur masuk/keluar via transition transform+opacity begitu
  scroll melewati hero. Isi: merek + logo, nav (scrollspy), tombol
  bahasa + tema (desktop); di mobile cukup merek (nav bawah dan
  tombol melayang hero tetap bertugas).
- Karena bar terpisah dan fixed, kemunculannya NOL pergeseran layout.
- State tema diangkat ke `lib/theme.tsx` (ThemeProvider) agar dipakai
  bersama Header + TopBar; scrollspy + daftar nav dipindah ke
  `lib/useActiveSection.ts` untuk dipakai keduanya.
- Aturan CSS `.header-top` bawaan template menjadi tidak terpakai
  (dibiarkan; tidak pernah aktif lagi).

## Akibat
- Tidak ada lagi lompatan saat bar muncul, di desktop maupun mobile.
- Toggle tema/bahasa tetap terjangkau setelah scroll (dari TopBar).
