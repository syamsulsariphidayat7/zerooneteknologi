# Kontrak API — personal-nextjs

Satu-satunya endpoint API proyek ini. Diimplementasikan di `app/api/contact/route.ts`
(pengganti `forms/contact.php` dari template asli).

## POST /api/contact

Mengirim pesan dari form kontak di halaman utama.

### Request

- Header: `Content-Type: application/json`
- Body (semua field wajib, string):

```json
{
  "name": "Nama Pengirim",
  "email": "pengirim@example.com",
  "subject": "Subjek pesan",
  "message": "Isi pesan"
}
```

### Response

| Kondisi | Status | Body |
|---|---|---|
| Sukses | 200 | `{ "ok": true }` |
| Field kosong/hilang | 400 | `{ "error": "Name, email, subject and message are required." }` |
| Format email salah | 400 | `{ "error": "Invalid email address." }` |
| Body bukan JSON valid | 400 | `{ "error": "Invalid request body." }` |
| Rate limit terlampaui | 429 | `{ "error": "Too many requests. Please try again later." }` + header `Retry-After: 60` |

### Rate limiting

Maksimal **5 request per 60 detik per IP** (dari header `x-forwarded-for`, nilai pertama).
Implementasi in-memory per instance server — lihat catatan di `AGENTS.md`.

### Perilaku saat ini

Pesan yang valid **belum dikirim sebagai email**: handler memvalidasi lalu mencatatnya
ke log server (`[contact] New message`). Alamat tujuan diambil dari env
`CONTACT_TO_EMAIL` (default `contact@example.com`, sama seperti template asli).
Titik sambung provider email ditandai `TODO` di file route.
