import { NextResponse } from "next/server";

/**
 * Pengganti forms/contact.php (PHP Email Form, versi Pro tidak disertakan
 * di template gratis). Handler ini memvalidasi field yang sama seperti
 * form aslinya dan mengembalikan JSON.
 *
 * CATATAN: belum mengirim email sungguhan — sambungkan provider email
 * (mis. Resend / Nodemailer + SMTP) di titik yang ditandai di bawah,
 * dan ganti alamat penerima lewat env CONTACT_TO_EMAIL.
 */
// Rate limiting sederhana in-memory: maks 5 request / 60 detik per IP.
// Cukup untuk form kontak single-instance; untuk deployment multi-instance
// (mis. banyak container) ganti dengan store bersama (Redis/Upstash).
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Name, email, subject and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL || "contact@example.com";

  // TODO: kirim email di sini (Resend / Nodemailer / SMTP).
  // Untuk sekarang pesan dicatat di log server agar alur UI tetap sama
  // seperti template asli (sent-message tampil setelah submit sukses).
  console.log("[contact] New message", { to, name, email, subject, message });

  return NextResponse.json({ ok: true });
}
