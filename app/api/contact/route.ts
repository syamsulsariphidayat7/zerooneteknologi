import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Pengganti forms/contact.php (PHP Email Form, versi Pro tidak disertakan
 * di template gratis). Handler ini memvalidasi field yang sama seperti
 * form aslinya dan mengembalikan JSON.
 *
 * Pengiriman email (ADR 0005): bila env SMTP_USER + SMTP_PASS terisi,
 * pesan dikirim sungguhan via SMTP (default Gmail) ke CONTACT_TO_EMAIL.
 * Bila env belum terisi (dev lokal / test), pesan hanya dicatat di log
 * server — alur UI tetap sama.
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

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** Kirim email via SMTP. Melempar error bila SMTP menolak/gagal. */
async function sendContactEmail(to: string, msg: ContactMessage) {
  const user = process.env.SMTP_USER as string;
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass: process.env.SMTP_PASS as string },
  });
  await transporter.sendMail({
    from: `"Website PT Zero One Teknologi" <${user}>`,
    to,
    replyTo: msg.email,
    subject: `[Website] ${msg.subject}`,
    text: [
      `Nama: ${msg.name}`,
      `Email: ${msg.email}`,
      `Subjek: ${msg.subject}`,
      "",
      msg.message,
    ].join("\n"),
  });
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

  const to =
    process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || "zeroone212117@gmail.com";

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await sendContactEmail(to, { name, email, subject, message });
    } catch (err) {
      console.error("[contact] SMTP gagal:", err);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }
  } else {
    // Env SMTP belum diisi: mode log (dev lokal / test otomatis).
    console.log("[contact] New message (mode log, SMTP belum diatur)", {
      to,
      name,
      email,
      subject,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
