# Design Tokens — personal-nextjs

Token di bawah ini adalah milik template asli BootstrapMade **Personal**,
dicatat apa adanya (keputusan pemilik: tampilan dipertahankan 1:1).
Sumber kebenarannya tetap `app/globals.css` — dokumen ini ringkasannya agar konsisten.

## Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| Background | `#040404` | Latar body + gambar `bg.jpg` |
| Aksen utama | `#2ba7ca` | Link, ikon, progress bar, tombol kirim, aksen section |
| Aksen hover | `#35e888` | Hover link |
| Turunan aksen | `#15bb62`, `#4ceb95`, `#63eda3` | Hover tombol, state sukses form |
| Teks utama | `#ffffff` | Teks di atas latar gelap |
| Teks redup | `#aaaaaa` | Teks sekunder |
| Error form | `#ed3c0d` | Pesan error form kontak |
| Overlay section | `rgba(0, 0, 0, 0.9)` | Latar `.container` di dalam section |
| Overlay kartu | `rgba(255, 255, 255, 0.08–0.12)` | Count box, icon box, info box |

Warna ikon Interests bersifat per-item (dicatat di `components/About.tsx`):
`#ffbb2c`, `#5578ff`, `#e80368`, `#e361ff`, `#47aeff`, `#ffa76e`,
`#11dbcf`, `#4233ff`, `#b2904f`, `#b20969`, `#ff5828`, `#29cc61`.

## Tipografi

Dimuat via `next/font/google` di `app/layout.tsx`, dirujuk lewat variabel CSS:

| Variabel | Font | Pemakaian |
|---|---|---|
| `--font-open-sans` | Open Sans 300/400/600/700 (+italic) | Teks body |
| `--font-raleway` | Raleway 300–700 (+italic) | Heading h1–h6, judul resume |
| `--font-poppins` | Poppins 300–700 (+italic) | Nama di header, judul section, angka hitung |

## Spasi & layout

- Grid: Bootstrap 5 (`.container`, `.row`, kolom `lg/md`) — tidak ada spacing scale kustom.
- Section tampil bergantian (class `section-show`), header menyusut jadi `header-top` (tinggi 80px desktop).
- Jarak bawah section aktif: `padding-bottom: 45px`.

## Radius & Poles UI Modern (2026-11-18)

- Full width (2026-11-18): section & hero melebar 90% — box terpusat
  dengan sisa 5% di tiap sisi, sudut tumpul (radius 22px) + border
  dipertahankan ("tetap sudut tumpul biar gak terlalu full").
- Section `.container`: radius 22px, border 1px rgba(255,255,255,.07)
  (terang: rgba(0,0,0,.06)), bayangan 0 24px 60px rgba(0,0,0,.45).
- Kartu (count-box, icon-box, info-box, portfolio-wrap): radius 16px;
  kartu counter/fokus/layanan naik 4px saat hover.
- Input form: radius 12px. Tombol (PDF, kirim form): pil 999px +
  bayangan hijau rgba(24,210,110,.25-.28).
- Header-top: kaca (blur 14px, bg rgba(0,0,0,.82); terang
  rgba(255,255,255,.85)) + sudut bawah 18px. Nav bawah mobile melayang:
  inset 12px, radius 20px, blur + bayangan.
- Scrollbar halaman: 10px, track #070807 (terang #e8ebee), thumb gradien
  #18d26e -> #0e9f5d radius 8px.

## Animasi & Parallax (2026-11-18)

- Parallax & smooth-scroll lerp: DICABUT 2026-11-18 (terasa berat
  saat scroll — layer layar penuh digerakkan tiap frame).
- Sentuhan yang dipertahankan (sekali-jalan / murah): orb hijau
  melayang di hero (11 dtk), animasi masuk hero berjenjang 0,12 dtk,
  kartu .rv muncul berjenjang 70 mdtk, garis bawah nav hijau saat
  hover/aktif. Scroll-behavior smooth CSS untuk lompatan anchor.
- `prefers-reduced-motion` mematikan seluruhnya.

## Pola per Section (2026-11-18)

Satu pola per section, menempel di kotak `.container` (gelap & terang):

- Tentang: **Circuit** — tile SVG seamless 220px (`pattern-circuit.svg`
  / `-light`), garis opacity ±0,07.
- Layanan: **Jaringan** — motif mesh SVG 880px di kanan atas, tepi
  memudar via mask radial (`pattern-mesh.svg` / `-light`), no-repeat.
- Portfolio: **Dot Grid** — radial-gradient CSS murni, titik 1,2px tiap
  26px.
- Kontak: **Glow + Aksen Garis** — dua radial hijau lembut + dua garis
  vertikal aksen 5px (kanan atas & kiri bawah), CSS murni.

Kandidat Grid Blueprint & Kontur dihapus atas pilihan Syamsul.

## Background per Tema (2026-11-18)

- Gelap: `bg-tech.jpg` (circuit tipis hijau-cyan + globe jaringan di
  kanan, basis #040404) opacity penuh di `body::before`.
- Terang: `bg-tech-light.jpg` — kembaran terang gambar yang sama
  (basis #f4f7f5, circuit abu-hijau pucat), opacity penuh; warna dasar
  body terang #f4f7f5 menyamai basis gambar. (Sebelumnya gambar gelap di
  opacity 0,15 — terasa "numpang", diganti gambar terang khusus.)

## Tema Terang (toggle, 2026-11-18)

- Bawaan tetap tema gelap asli; mode terang aktif bila `data-theme="light"` di `<html>`,
  dipilih lewat tombol `.theme-toggle` di header, disimpan di `localStorage` (`zo-theme`),
  dan dipasang sebelum render oleh script inline di `app/layout.tsx` (anti-kedip).
- Override terpusat di blok akhir `app/globals.css` — tidak ada perubahan pada aturan gelap.
- Token terang: latar halaman `#eef1f4`, permukaan kartu `#ffffff`, garis `#e6e9ee`,
  teks `#212529`, judul `#111418`, teks aksen `#0e9f5d` (kontras di atas putih),
  isian aksen tetap `#18d26e`; foto latar hero tampil samar (opacity 0.15).
