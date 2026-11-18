/**
 * Tombol WhatsApp mengambang — jalur kontak utama untuk calon klien.
 * Nomor = nomor resmi yang sama dengan yang tampil di section Kontak
 * (0857 2291 6809), format wa.me internasional tanpa "+" dan tanpa "0".
 */
const WA_NUMBER = "6285722916809";
const WA_TEXT = encodeURIComponent(
  "Halo PT Zero One Teknologi, saya ingin bertanya tentang layanan Anda."
);

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp PT Zero One Teknologi"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
}
