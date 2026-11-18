"use client";

import { useLang } from "@/lib/i18n";

/**
 * Tombol WhatsApp mengambang — jalur kontak utama untuk calon klien.
 * Nomor = nomor resmi yang sama dengan yang tampil di section Kontak
 * (0857 2291 6809), format wa.me internasional tanpa "+" dan tanpa "0".
 * Sapaan awal mengikuti bahasa aktif pengunjung.
 */
const WA_NUMBER = "6285722916809";

export default function WhatsAppFloat() {
  const { t } = useLang();
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.floats.waText)}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floats.waAria}
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
}
