# ADR 0005 — Form kontak mengirim email via SMTP Gmail

Tanggal: 2026-11-18
Status: diterima (instruksi Syamsul: "aktifkan kirim email")

## Konteks
Sejak migrasi, `POST /api/contact` hanya memvalidasi + mencatat log —
pesan pengunjung tidak pernah sampai ke PT.

## Keputusan
- Pengiriman via **SMTP Gmail** memakai **Nodemailer**, dari mailbox
  resmi `zeroone212117@gmail.com` ke mailbox yang sama
  (`CONTACT_TO_EMAIL`), `replyTo` = email pengunjung.
- Kredensial = **App Password** Google (bukan sandi akun), disimpan
  sebagai env Vercel: `SMTP_USER`, `SMTP_PASS` (+ opsional
  `SMTP_HOST`/`SMTP_PORT`). Tidak ada kredensial di repo.
- Bila env SMTP tidak terisi, handler jatuh ke mode log (dev lokal
  dan test otomatis tetap lulus tanpa kredensial).
- Kegagalan SMTP -> HTTP 500 dengan pesan generik; detail error hanya
  di log server.

## Alternatif yang tidak dipilih
- Resend/penyedia API lain: perlu akun + verifikasi domain tambahan;
  SMTP Gmail memakai mailbox yang sudah resmi dipakai PT.
