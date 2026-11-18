# Design Tokens — personal-nextjs

Token di bawah ini adalah milik template asli BootstrapMade **Personal**,
dicatat apa adanya (keputusan pemilik: tampilan dipertahankan 1:1).
Sumber kebenarannya tetap `app/globals.css` — dokumen ini ringkasannya agar konsisten.

## Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| Background | `#040404` | Latar body + gambar `bg.jpg` |
| Aksen utama | `#18d26e` | Link, ikon, progress bar, tombol kirim, aksen section |
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
